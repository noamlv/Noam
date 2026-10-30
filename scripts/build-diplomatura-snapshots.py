"""Build public aggregates only; private inputs remain outside the repository."""

import argparse
import csv
import hashlib
import json
from collections import defaultdict
from decimal import Decimal
from pathlib import Path


def load(root, relative, encoding, delimiter):
    source = root / relative
    with source.open(encoding=encoding, newline="") as stream:
        rows = list(csv.DictReader(stream, delimiter=delimiter))
    return rows, hashlib.sha256(source.read_bytes()).hexdigest()


def number(value):
    text = value.strip().replace(",", "")
    if not text:
        return None
    result = Decimal(text)
    assert result.is_finite() and result >= 0, "Invalid nonnegative metric"
    return result


def group_rows(rows, category, metric):
    totals, counts, missing = defaultdict(Decimal), defaultdict(int), 0
    for row in rows:
        value = metric(row)
        if value is None:
            missing += 1
            continue
        label = category(row).strip() or "Sin dato"
        totals[label] += value
        counts[label] += 1
    return [{"label": label, "value": float(value), "records": counts[label]}
            for label, value in sorted(totals.items(), key=lambda item: (-item[1], item[0]))], missing


def build(root):
    snapshots = []
    rows, digest = load(root, "CONADIS/4.1.1 BdD_Conadis_4.csv", "latin1", ";")
    keys = list(rows[0])
    assert len(rows) == 15248 and len(keys) == 47
    slices = []
    for year in sorted({r[keys[0]] for r in rows}):
        selected = [r for r in rows if r[keys[0]] == year]
        assert len({(r[keys[9]], r[keys[1]]) for r in selected}) == len(selected)
        groups, missing = group_rows(selected, lambda r: r[keys[10]], lambda r: number(r[keys[13]]))
        # Publish department totals only, never small disability-related cells.
        hidden = [g for g in groups if g["value"] < 10]
        groups = [g for g in groups if g["value"] >= 10]
        assert not hidden, "Small cells require disclosure review"
        slices.append({"period": year, "label": year + (" · enero–septiembre" if year == "2025" else " · enero–diciembre"), "groups": groups, "missing": missing})
    snapshots.append({"slug": "registro-discapacidad", "sourceRows": len(rows), "sha256": digest, "unit": "inscripciones reportadas", "slices": slices})

    rows, digest = load(root, "PAD/Data_DeportistasBeneficiadosPAD_3.csv", "latin1", ";")
    assert len(rows) == 68938
    slices = []
    for year in sorted({r["ANIO"] for r in rows}):
        selected = [r for r in rows if r["ANIO"] == year]
        groups, missing = group_rows(selected, lambda r: r["PAD"], lambda r: number(r["MONTO"]))
        assert missing == 0
        assert all(g["records"] >= 10 for g in groups)
        slices.append({"period": year, "label": year + (" · enero–septiembre" if year == "2025" else " · enero–diciembre"), "groups": groups, "missing": missing})
    snapshots.append({"slug": "apoyo-deportista", "sourceRows": len(rows), "sha256": digest, "unit": "soles reportados", "slices": slices})

    rows, digest = load(root, "Planes de acondicionamiento territorial/Landing_PAT/data/pat_clean.csv", "utf-8-sig", ",")
    assert len(rows) == 196 and len({r["IDPROV_CODIGO"] for r in rows}) == 196
    slices = []
    for department in ["Perú"] + sorted({r["NOMB_DEP"] for r in rows}):
        selected = rows if department == "Perú" else [r for r in rows if r["NOMB_DEP"] == department]
        groups, missing = group_rows(selected, lambda r: r["ESTADO"], lambda _: Decimal(1))
        slices.append({"period": department, "label": department, "groups": groups, "missing": missing})
    snapshots.append({"slug": "planes-territoriales", "sourceRows": len(rows), "sha256": digest, "unit": "provincias en la copia", "slices": slices})

    rows, digest = load(root, "Dashboard_ONPE_final/PR-ESP_Presidencial_2026-04-15_11-58-AM_91.322 (1).csv", "utf-8-sig", ",")
    keys = list(rows[0])
    parties = keys[10:-2]
    assert len(rows) == 84720 and len(parties) == 36
    assert len({r["NÚMERO DE MESA"] for r in rows}) == len(rows)
    assert all(r["ESTADO DEL ACTA"] == "Contabilizada" for r in rows)
    slices = []
    scopes = ["Todo el archivo", "PERÚ", "EXTRANJERO"]
    for scope in scopes:
        selected = rows if scope == "Todo el archivo" else [r for r in rows if r["ÁMBITO"] == scope]
        groups = []
        for party in parties:
            values = [number(r[party]) for r in selected]
            assert all(v is not None for v in values), "Missing votes must not become zero"
            groups.append({"label": party, "value": int(sum(values)), "records": len(selected)})
        groups.sort(key=lambda g: (-g["value"], g["label"]))
        slices.append({"period": scope, "label": scope, "groups": groups, "missing": 0})
    snapshots.append({"slug": "conteo-presidencial-2026", "sourceRows": len(rows), "sha256": digest, "unit": "votos válidos del corte", "slices": slices})
    return snapshots


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path, help="Private 08 Dashboards directory")
    args = parser.parse_args()
    snapshots = build(args.source)
    output = Path("data/processed/diplomatura-analysis-snapshots.json")
    output.write_text(json.dumps(snapshots, ensure_ascii=False, separators=(",", ":")) + "\n")
    print("Public aggregates built:", [(s["slug"], s["sourceRows"], len(s["slices"])) for s in snapshots])

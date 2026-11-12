"""Export two independent PAD summaries without publishing athlete-level data."""

import argparse
import csv
import hashlib
import json
import unicodedata
from collections import defaultdict
from decimal import Decimal
from pathlib import Path

MIN_LABELS = 10
DEPARTMENTS = {name.upper(): name for name in (
    "Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca", "Callao",
    "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad", "Lambayeque",
    "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno",
    "San Martín", "Tacna", "Tumbes", "Ucayali"
)}


def key(value):
    return "".join(c for c in unicodedata.normalize("NFD", value.upper()) if not unicodedata.combining(c)).strip()


DEPARTMENTS = {key(label): name for label, name in DEPARTMENTS.items()}


def aggregate(rows, category, other):
    groups = defaultdict(list)
    for row in rows:
        groups[category(row)].append(row)

    def labels(group):
        # Name strings are used only for conservative pooling, not as person identifiers in outputs.
        return {tuple(" ".join(key(row[k]).split()) for k in ("PATERNO", "MATERNO", "NOMBRES"))
                for row in group if row["NOMBRES"].strip() and row["PATERNO"].strip()}

    pooled = []
    for label in list(groups):
        if len(labels(groups[label])) < MIN_LABELS:
            pooled.extend(groups.pop(label))
    if pooled:
        if len(labels(pooled)) < MIN_LABELS:
            raise ValueError("Combined small groups require disclosure review")
        groups[other] = pooled
    result = [{"label": label, "value": float(sum(Decimal(row["MONTO"]) for row in group)),
               "records": len(group)} for label, group in groups.items()]
    return sorted(result, key=lambda group: (-group["value"], group["label"]))


def birthplace(row):
    if key(row["PAIS"]) != "PERU":
        return "Exterior"
    return DEPARTMENTS[key(row["DEPARTAMENTO"])]


def build(source):
    data_dir = Path(__file__).resolve().parents[1] / "data" / "processed"
    snapshots = json.loads((data_dir / "diplomatura-analysis-snapshots.json").read_text(encoding="utf-8"))
    pad = next(snapshot for snapshot in snapshots if snapshot["slug"] == "apoyo-deportista")
    digest = hashlib.sha256(source.read_bytes()).hexdigest()
    if digest != pad["sha256"]:
        raise ValueError("PAD source differs from the published annual summary")
    with source.open(encoding="cp850", newline="") as stream:
        rows = list(csv.DictReader(stream, delimiter=";"))
    assert len(rows) == pad["sourceRows"]
    federation = aggregate(rows, lambda row: row["FEDERACION"].strip(), "Otras federaciones")
    department = aggregate(rows, birthplace, "Otros departamentos")
    total = sum(Decimal(str(group["value"])) for year in pad["slices"] for group in year["groups"])
    for groups in (federation, department):
        assert sum(group["records"] for group in groups) == len(rows)
        assert sum(Decimal(str(group["value"])) for group in groups) == total
    output = {"sha256": digest, "federation": federation, "birthplace": department}
    (data_dir / "pad-breakdowns.json").write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"PAD: {len(rows)} records; {len(federation)} federation groups; {len(department)} birthplace groups; S/ {total}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    build(parser.parse_args().source)

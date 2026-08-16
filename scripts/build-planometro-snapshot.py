from __future__ import annotations

import csv
import hashlib
import json
import os
import unicodedata
from collections import Counter, defaultdict
from datetime import date, datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = Path(os.environ.get("PLANOMETRO_SOURCE_DIR", ROOT.parent / "Planes_gobierno"))
OUTPUTS = SOURCE_ROOT / "outputs"
PROCESSED_PATH = ROOT / "data" / "processed" / "planometro-2026.json"
PARTY_DOWNLOAD = ROOT / "public" / "downloads" / "planometro-2026-partidos.csv"
AXIS_DOWNLOAD = ROOT / "public" / "downloads" / "planometro-2026-ejes.csv"
QUALITY_REPORT = ROOT / "docs" / "data-quality-planometro-2026.md"

PARTY_LABELS = {
    "Ahora Nación": "Ahora Nación",
    "Alianza para el Progreso": "Alianza para el Progreso",
    "Avanza Pais": "Avanza País",
    "Buen gobierno": "Partido del Buen Gobierno",
    "Cooperacion popular": "Cooperación Popular",
    "Demócrata verde": "Partido Demócrata Verde",
    "Fe en el Peru": "Fe en el Perú",
    "Frente de la Esperanza": "Frente de la Esperanza",
    "Fuerza Popular": "Fuerza Popular",
    "Fuerza y Libertad": "Fuerza y Libertad",
    "Integridad democrática": "Integridad Democrática",
    "Juntos por el Peru": "Juntos por el Perú",
    "Libertad Popular": "Libertad Popular",
    "Obras": "Partido Cívico Obras",
    "PRIN": "PRIN",
    "Pais para todos": "País para Todos",
    "Partido Aprista": "Partido Aprista Peruano",
    "Partido Demócrata Federal": "Partido Democrático Federal",
    "Partido Morado": "Partido Morado",
    "Partido Patriótico del Perú": "Partido Patriótico del Perú",
    "Partido Unido Peru": "Partido Demócrata Unido Perú",
    "Partido de los Trabajadores y emprendedores": "Partido de los Trabajadores y Emprendedores",
    "Peru Accion": "Perú Acción",
    "Peru Moderno": "Perú Moderno",
    "Peru Primero": "Perú Primero",
    "Perú Libre": "Perú Libre",
    "Podemos Perú": "Podemos Perú",
    "Primero La Gente": "Primero la Gente",
    "Progresemos": "Progresemos",
    "Renovación Popular": "Renovación Popular",
    "Salvemos al Perú": "Salvemos al Perú",
    "Sí creo": "Sí Creo",
    "Somos Peru": "Somos Perú",
    "Un camino diferente": "Un Camino Diferente",
    "Unidad Nacional": "Unidad Nacional",
    "Venceremos": "Alianza Electoral Venceremos",
}

AXIS_LABELS = {
    "ambiente": "Ambiente",
    "economia": "Economía",
    "educacion": "Educación",
    "empleo": "Empleo",
    "energia": "Energía",
    "infraestructura": "Infraestructura",
    "institucionalidad": "Institucionalidad",
    "otros": "Otros / sin eje específico",
    "salud": "Salud",
    "seguridad": "Seguridad",
    "social": "Política social",
}

INSTRUMENT_LABELS = {
    "enforcement/punitive": "Fiscalización o sanción",
    "institutional change": "Cambio institucional",
    "law/reform": "Ley o reforma",
    "program": "Programa",
    "spending/investment": "Gasto o inversión",
    "technology/data": "Tecnología o datos",
    "unspecified": "Sin instrumento explícito",
}


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8-sig", newline="") as file:
        return list(csv.DictReader(file))


def as_bool(value: str | None) -> bool:
    return str(value).strip().lower() in {"true", "1", "yes"}


def as_float(value: str | None) -> float:
    try:
        return float(value or 0)
    except ValueError:
        return 0.0


def round1(value: float) -> float:
    return round(value + 1e-10, 1)


def percent(rows: list[dict[str, str]], predicate) -> float:
    return round1(100 * sum(1 for row in rows if predicate(row)) / len(rows)) if rows else 0.0


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFD", value)
    ascii_value = "".join(character for character in normalized if unicodedata.category(character) != "Mn")
    return "-".join("".join(character.lower() if character.isalnum() else " " for character in ascii_value).split())


def hash_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def file_date(path: Path) -> str:
    return datetime.fromtimestamp(path.stat().st_mtime).date().isoformat()


def classification_metrics(predictions: list[int], gold: list[int]) -> dict[str, float | int]:
    true_positive = sum(predicted == 1 and actual == 1 for predicted, actual in zip(predictions, gold))
    false_positive = sum(predicted == 1 and actual == 0 for predicted, actual in zip(predictions, gold))
    false_negative = sum(predicted == 0 and actual == 1 for predicted, actual in zip(predictions, gold))
    true_negative = sum(predicted == 0 and actual == 0 for predicted, actual in zip(predictions, gold))
    precision = true_positive / (true_positive + false_positive) if true_positive + false_positive else 0
    recall = true_positive / (true_positive + false_negative) if true_positive + false_negative else 0
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0
    return {
        "tp": true_positive,
        "fp": false_positive,
        "fn": false_negative,
        "tn": true_negative,
        "precisionPercent": round1(precision * 100),
        "recallPercent": round1(recall * 100),
        "f1Percent": round1(f1 * 100),
        "accuracyPercent": round1((true_positive + true_negative) * 100 / len(gold)),
    }


def write_csv(path: Path, fieldnames: list[str], rows: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    broad_path = OUTPUTS / "propuestas.csv"
    strict_path = OUTPUTS / "propuestas_strict.csv"
    annotation_path = OUTPUTS / "annotation" / "annotation_gold_v1.csv"
    required = [broad_path, strict_path, annotation_path]
    missing_files = [str(path) for path in required if not path.exists()]
    if missing_files:
        raise FileNotFoundError(f"Missing Planómetro inputs: {', '.join(missing_files)}")

    broad = read_csv(broad_path)
    strict = read_csv(strict_path)
    annotations = read_csv(annotation_path)
    broad_ids = {row["proposal_id"] for row in broad}
    strict_ids = {row["proposal_id"] for row in strict}
    broad_parties = {row["party"] for row in broad}
    strict_parties = {row["party"] for row in strict}
    missing_trace = [row for row in strict if not row.get("doc_id") or not row.get("source_snippet")]
    invalid_strict = [
        row
        for row in strict
        if as_float(row.get("tokens_n")) < 10
        or not (
            row.get("instrument_type") != "unspecified"
            or as_bool(row.get("has_quant_target"))
            or as_bool(row.get("has_time_horizon"))
        )
    ]

    if len(broad) != 4084 or len(strict) != 2742 or len(broad_parties) != 36:
        raise ValueError(f"Unexpected snapshot size: broad={len(broad)}, strict={len(strict)}, parties={len(broad_parties)}")
    if strict_ids - broad_ids or len(strict_ids) != len(strict) or broad_parties != strict_parties or missing_trace or invalid_strict:
        raise ValueError(
            f"Snapshot integrity failed: outside={len(strict_ids - broad_ids)}, duplicates={len(strict) - len(strict_ids)}, "
            f"party_difference={len(broad_parties ^ strict_parties)}, missing_trace={len(missing_trace)}, invalid_strict={len(invalid_strict)}"
        )

    party_broad = Counter(row["party"] for row in broad)
    party_strict: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in strict:
        party_strict[row["party"]].append(row)

    party_rows = []
    for raw_party, rows in party_strict.items():
        axis_counts = Counter(row["axis"] for row in rows)
        party_axes = [
            {"key": axis, "label": AXIS_LABELS[axis], "proposals": count, "sharePercent": round1(100 * count / len(rows))}
            for axis, count in axis_counts.most_common()
        ]
        top_axes = [
            {"key": axis, "label": AXIS_LABELS[axis], "proposals": count, "sharePercent": round1(100 * count / len(rows))}
            for axis, count in axis_counts.most_common(3)
        ]
        name = PARTY_LABELS.get(raw_party, raw_party)
        party_rows.append({
            "slug": slugify(name),
            "name": name,
            "detectedStatements": party_broad[raw_party],
            "operationalProposals": len(rows),
            "operationalSharePercent": round1(100 * len(rows) / party_broad[raw_party]),
            "averageConcreteness": round1(sum(as_float(row["concreteness_score"]) for row in rows) / len(rows)),
            "quantTargetPercent": percent(rows, lambda row: as_bool(row["has_quant_target"])),
            "timeHorizonPercent": percent(rows, lambda row: as_bool(row["has_time_horizon"])),
            "costOrFundingPercent": percent(rows, lambda row: as_bool(row["mentions_cost"]) or as_bool(row["mentions_funding_source"])),
            "fundingSourcePercent": percent(rows, lambda row: as_bool(row["mentions_funding_source"])),
            "axes": party_axes,
            "topAxes": top_axes,
        })
    party_rows.sort(key=lambda row: row["name"])

    axis_counts = Counter(row["axis"] for row in strict)
    axis_rows = []
    for axis, count in axis_counts.most_common():
        rows = [row for row in strict if row["axis"] == axis]
        axis_rows.append({
            "key": axis,
            "label": AXIS_LABELS[axis],
            "proposals": count,
            "sharePercent": round1(100 * count / len(strict)),
            "averageConcreteness": round1(sum(as_float(row["concreteness_score"]) for row in rows) / count),
            "quantTargetPercent": percent(rows, lambda row: as_bool(row["has_quant_target"])),
            "timeHorizonPercent": percent(rows, lambda row: as_bool(row["has_time_horizon"])),
        })

    instrument_counts = Counter(row["instrument_type"] for row in strict)
    instruments = [
        {"key": instrument, "label": INSTRUMENT_LABELS[instrument], "proposals": count, "sharePercent": round1(100 * count / len(strict))}
        for instrument, count in instrument_counts.most_common()
    ]
    score_bands = [
        {"label": "15–24", "minimum": 15, "maximum": 25},
        {"label": "25–49", "minimum": 25, "maximum": 50},
        {"label": "50–74", "minimum": 50, "maximum": 75},
        {"label": "75–100", "minimum": 75, "maximum": 101},
    ]
    for band in score_bands:
        band["proposals"] = sum(band["minimum"] <= as_float(row["concreteness_score"]) < band["maximum"] for row in strict)
        band["sharePercent"] = round1(100 * band["proposals"] / len(strict))

    gold = [int(as_float(row["is_proposal_gold"])) for row in annotations]
    broad_predictions = [int(as_float(row["is_proposal_pred"])) for row in annotations]
    strict_predictions = [int(bool(row.get("proposal_id") and row["proposal_id"] in strict_ids)) for row in annotations]
    broad_validation = classification_metrics(broad_predictions, gold)
    strict_validation = classification_metrics(strict_predictions, gold)

    payload = {
        "source": {
            "name": "Planómetro 2026",
            "externalUrl": "https://noamlv.github.io/PlanesPeru26/",
            "pipeline": "R + Quarto; snapshot agregado por NOAM con Python",
            "broadSnapshotDate": file_date(broad_path),
            "strictSnapshotDate": file_date(strict_path),
            "broadSha256": hash_file(broad_path),
            "strictSha256": hash_file(strict_path),
        },
        "summary": {
            "plans": len(broad_parties),
            "detectedStatements": len(broad),
            "operationalProposals": len(strict),
            "operationalSharePercent": round1(100 * len(strict) / len(broad)),
            "annotatedCases": len(annotations),
            "axes": len(axis_counts),
            "averageConcreteness": round1(sum(as_float(row["concreteness_score"]) for row in strict) / len(strict)),
            "quantTargetPercent": percent(strict, lambda row: as_bool(row["has_quant_target"])),
            "timeHorizonPercent": percent(strict, lambda row: as_bool(row["has_time_horizon"])),
            "fundingSourcePercent": percent(strict, lambda row: as_bool(row["mentions_funding_source"])),
        },
        "validation": {
            "sample": len(annotations),
            "broad": broad_validation,
            "strict": strict_validation,
            "annotationLabel": "manual_gold",
            "annotationMode": sorted({row.get("annotator", "") for row in annotations if row.get("annotator")}),
            "note": "La muestra documenta anotación asistida. Las métricas describen esta muestra y no garantizan igual desempeño fuera de ella.",
        },
        "components": [
            {"label": "Meta cuantitativa", "sharePercent": percent(strict, lambda row: as_bool(row["has_quant_target"]))},
            {"label": "Horizonte temporal", "sharePercent": percent(strict, lambda row: as_bool(row["has_time_horizon"]))},
            {"label": "Costo o financiamiento", "sharePercent": percent(strict, lambda row: as_bool(row["mentions_cost"]) or as_bool(row["mentions_funding_source"]))},
            {"label": "Fuente de financiamiento", "sharePercent": percent(strict, lambda row: as_bool(row["mentions_funding_source"]))},
            {"label": "Evidencia citada", "sharePercent": percent(strict, lambda row: bool(row.get("evidence_citation_guess")))},
        ],
        "scoreBands": score_bands,
        "instruments": instruments,
        "axes": axis_rows,
        "parties": party_rows,
    }

    PROCESSED_PATH.parent.mkdir(parents=True, exist_ok=True)
    PROCESSED_PATH.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    write_csv(
        PARTY_DOWNLOAD,
        ["partido", "enunciados_detectados", "propuestas_criterio_operativo", "porcentaje_operativo", "concrecion_promedio", "porcentaje_meta_cuantitativa", "porcentaje_horizonte_temporal", "porcentaje_costo_o_financiamiento", "ejes_principales"],
        [{
            "partido": row["name"],
            "enunciados_detectados": row["detectedStatements"],
            "propuestas_criterio_operativo": row["operationalProposals"],
            "porcentaje_operativo": row["operationalSharePercent"],
            "concrecion_promedio": row["averageConcreteness"],
            "porcentaje_meta_cuantitativa": row["quantTargetPercent"],
            "porcentaje_horizonte_temporal": row["timeHorizonPercent"],
            "porcentaje_costo_o_financiamiento": row["costOrFundingPercent"],
            "ejes_principales": " | ".join(axis["label"] for axis in row["topAxes"]),
        } for row in party_rows],
    )
    write_csv(
        AXIS_DOWNLOAD,
        ["eje", "propuestas", "participacion_porcentaje", "concrecion_promedio", "meta_cuantitativa_porcentaje", "horizonte_temporal_porcentaje"],
        [{
            "eje": row["label"],
            "propuestas": row["proposals"],
            "participacion_porcentaje": row["sharePercent"],
            "concrecion_promedio": row["averageConcreteness"],
            "meta_cuantitativa_porcentaje": row["quantTargetPercent"],
            "horizonte_temporal_porcentaje": row["timeHorizonPercent"],
        } for row in axis_rows],
    )

    QUALITY_REPORT.write_text(
        f"""# Calidad de datos: Planómetro 2026

Fecha de revisión: {date.today().isoformat()}

## Snapshot

- Planes/organizaciones en el corpus: {len(broad_parties)}.
- Enunciados detectados: {len(broad):,}.
- Propuestas bajo criterio operativo: {len(strict):,} ({round1(100 * len(strict) / len(broad))}%).
- Ejes: {len(axis_counts)}.
- Casos en muestra anotada: {len(annotations)}.
- Fecha del universo amplio: {file_date(broad_path)}.
- Fecha del universo estricto: {file_date(strict_path)}.

## Controles

- Identificadores únicos en universo estricto: sí.
- Universo estricto contenido en universo amplio: sí.
- Trazabilidad completa con `doc_id` y `source_snippet`: sí.
- Regla estricta satisfecha por todas las filas: sí.
- Cobertura de organizaciones preservada: sí.

## Validación recomputada

| Universo | Precisión | Recall | F1 | Exactitud |
| --- | ---: | ---: | ---: | ---: |
| Amplio | {broad_validation['precisionPercent']}% | {broad_validation['recallPercent']}% | {broad_validation['f1Percent']}% | {broad_validation['accuracyPercent']}% |
| Criterio operativo | {strict_validation['precisionPercent']}% | {strict_validation['recallPercent']}% | {strict_validation['f1Percent']}% | {strict_validation['accuracyPercent']}% |

Las métricas se recalculan directamente desde `annotation_gold_v1.csv`. El archivo fuente `extraction_metrics_v1.csv` no coincide con la versión actual de anotaciones y no se usa para la publicación NOAM. La columna `annotator` documenta apoyo de Codex; por tanto, se presenta como muestra anotada y no como validación humana independiente.

## Regla operativa

Una fila permanece en el universo estricto cuando tiene al menos 10 tokens y presenta un instrumento explícito, una meta cuantitativa o un horizonte temporal. La regla mejora precisión en la muestra, pero todavía conserva falsos positivos.

## Límites

- Los conteos dependen de extracción automatizada y no equivalen a promesas oficiales certificadas.
- El score de concreción resume rasgos textuales; no mide calidad normativa, conveniencia, viabilidad política ni resultado futuro.
- Comparar volúmenes entre planes requiere considerar extensión documental y estilo de redacción.
- La clasificación temática, los instrumentos y las métricas deben leerse como señales auditables, no como ranking electoral.
""",
        encoding="utf-8",
    )
    print(
        f"Generated Planómetro snapshot: {len(broad):,} detected statements, {len(strict):,} operational proposals, "
        f"{len(party_rows)} organizations."
    )


if __name__ == "__main__":
    main()

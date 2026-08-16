# Calidad de datos: Planómetro 2026

Fecha de revisión: 2026-07-17

## Snapshot

- Planes/organizaciones en el corpus: 36.
- Enunciados detectados: 4,084.
- Propuestas bajo criterio operativo: 2,742 (67.1%).
- Ejes: 11.
- Casos en muestra anotada: 404.
- Fecha del universo amplio: 2026-03-01.
- Fecha del universo estricto: 2026-03-18.

## Controles

- Identificadores únicos en universo estricto: sí.
- Universo estricto contenido en universo amplio: sí.
- Trazabilidad completa con `doc_id` y `source_snippet`: sí.
- Regla estricta satisfecha por todas las filas: sí.
- Cobertura de organizaciones preservada: sí.

## Validación recomputada

| Universo | Precisión | Recall | F1 | Exactitud |
| --- | ---: | ---: | ---: | ---: |
| Amplio | 47.3% | 99.0% | 64.0% | 73.5% |
| Criterio operativo | 70.5% | 96.9% | 81.6% | 89.6% |

Las métricas se recalculan directamente desde `annotation_gold_v1.csv`. El archivo fuente `extraction_metrics_v1.csv` no coincide con la versión actual de anotaciones y no se usa para la publicación NOAM. La columna `annotator` documenta apoyo de Codex; por tanto, se presenta como muestra anotada y no como validación humana independiente.

## Regla operativa

Una fila permanece en el universo estricto cuando tiene al menos 10 tokens y presenta un instrumento explícito, una meta cuantitativa o un horizonte temporal. La regla mejora precisión en la muestra, pero todavía conserva falsos positivos.

## Límites

- Los conteos dependen de extracción automatizada y no equivalen a promesas oficiales certificadas.
- El score de concreción resume rasgos textuales; no mide calidad normativa, conveniencia, viabilidad política ni resultado futuro.
- Comparar volúmenes entre planes requiere considerar extensión documental y estilo de redacción.
- La clasificación temática, los instrumentos y las métricas deben leerse como señales auditables, no como ranking electoral.

# Calidad de datos: RENAMU 2025

Fecha de revisión: 2026-07-16

## Grano y cobertura

- Unidad: una municipalidad provincial o distrital por fila.
- Registros: 1,891.
- Columnas en el archivo fuente: 1,388.
- Ubigeos únicos: 1,891.
- Duplicados de ubigeo: 0.
- Ubigeos con formato inválido: 0.

## Faltantes relevantes

| Variable publicada | Registros sin valor | Interpretación |
|---|---:|---|
| Página web reportada | 597 | Campo vacío; no prueba que la entidad carezca de presencia digital. |
| Computadoras con internet | 45 | Coincide principalmente con municipios que declararon no tener internet. |
| Personal, marzo 2025 | 78 | Se publica como dato no informado. |
| Locación/orden de servicios, marzo 2025 | 74 | Se publica como dato no informado. |
| Operación del COEL | 890 | No aplica cuando el COEL no fue conformado. |
| Personal de serenazgo | 626 | No aplica cuando no se brinda serenazgo. |

## Decisiones de publicación

- No se publican teléfonos, correos, direcciones ni nombres de autoridades presentes en el archivo fuente.
- No se calcula un índice compuesto ni un ranking de capacidad.
- Los porcentajes nacionales describen respuestas declaradas, no desempeño verificado.
- Las comparaciones usan medianas entre municipalidades del mismo tipo y no controlan por población o presupuesto.

## Riesgos conocidos

- **Medio:** la fuente es autodeclarada y puede contener errores de registro.
- **Medio:** las fechas de referencia cambian según la pregunta.
- **Bajo:** las categorías nulas se preservan como no informadas o no aplicables, evitando convertirlas en cero.

## Pruebas automatizables

El script detiene la generación si cambia el número esperado de filas, aparecen ubigeos duplicados, ubigeos inválidos o faltan columnas requeridas.

# Fuentes de contexto municipal DataPerú

## Población proyectada

- Fuente: Instituto Nacional de Estadística e Informática (INEI).
- Publicación: Población total proyectada al 30 de junio de cada año, según departamento, provincia y distrito, 2018-2026.
- Página: https://www.gob.pe/institucion/inei/informes-publicaciones/6894980-peru-poblacion-total-proyectada-al-30-de-junio-de-cada-ano-segun-departamento-provincia-y-distrito-2018-2026
- Archivo esperado: `data/raw/inei-population/population-2018-2026.csv`.

El XLSX oficial se convierte a CSV sin modificar sus valores. Para indicadores per cápita de 2025 se utiliza la proyección al 30 de junio de 2025.

## Presupuesto y ejecución

- Fuente: Ministerio de Economía y Finanzas (MEF), Consulta Amigable.
- Dataset: https://datosabiertos.mef.gob.pe/dataset/presupuesto-y-ejecucion-de-gasto
- Recurso diario 2025: `35bdc5b5-017c-42c1-ba20-8820bf1248b7`.
- API SQL: https://api.datosabiertos.mef.gob.pe/DatosAbiertos/v1/datastore_search_sql
- Archivo agregado esperado: `data/raw/mef-2025/municipal-aggregate.json`.

La consulta agrega únicamente gobiernos locales por código de entidad. PIA y PIM se suman desde el periodo 0; el devengado se acumula de enero a diciembre. La inversión se identifica con `TIPO_ACT_PROY = 2`.

## Generación

1. Ejecutar `npm run data:renamu`.
2. Ejecutar `npm run data:sectors` para generar las cinco lecturas sectoriales desde el CSV completo de RENAMU.
3. Actualizar las dos fuentes crudas descritas arriba.
4. Ejecutar `npm run data:context`.
5. Ejecutar `npm run data:projects` para consultar el recurso mensual del MEF por departamento.
6. Revisar `docs/data-quality-renamu-sectors-2025.md`, `docs/data-quality-dataperu-context-2025.md` y `docs/data-quality-mef-projects-2025.md`.

El pipeline de proyectos conserva en caché las respuestas departamentales dentro de `data/raw/mef-2025/projects-by-department/`. Publica hasta cinco proyectos con mayor PIM positivo por municipalidad. El orden no representa prioridad, calidad ni impacto.

Los archivos crudos permanecen fuera de Git. Se versionan el pipeline, el extracto público y los reportes de calidad.

## Lecturas sectoriales RENAMU

El extracto `data/processed/renamu-2025-sectors.json` se genera con `scripts/build-renamu-sectors.mjs` y cubre cinco módulos:

- Residuos sólidos: frecuencia, cobertura declarada, instrumentos y destino reportado.
- Seguridad ciudadana: serenazgo, planes, mapas y coordinación operativa.
- Gestión del riesgo: oficina responsable, COEL, almacén, simulacros y zonas identificadas.
- Desarrollo económico local: licencias emitidas y acciones municipales de apoyo.
- Gestión ambiental: organización, fuentes de contaminación e instrumentos locales.

Las tasas conservan el denominador de respuestas informadas. La ausencia de una respuesta no se transforma en “No” y la presencia declarada de una capacidad no se interpreta como calidad o resultado.

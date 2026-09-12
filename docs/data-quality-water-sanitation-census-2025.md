# Calidad de datos: agua y saneamiento, Censos Nacionales 2025

## Alcance

- Fuente: Instituto Nacional de Estadística e Informática (INEI), plataforma de resultados de los Censos Nacionales 2025.
- Grano: distrito censal.
- Cobertura: 1,892 distritos, 196 provincias y 25 departamentos mostrados.
- Universo: viviendas particulares ocupadas con personas presentes que viven permanentemente.
- Variables: universo de viviendas, abastecimiento de agua por red pública y servicio higiénico conectado a red pública.

## Fuentes oficiales

- Plataforma: <https://censos2025.inei.gob.pe/>
- API pública consultada: <https://censos2025.inei.gob.pe/api/v1>
- Indicadores: 550 como denominador, 175 para agua y 176 para saneamiento.

## Controles aplicados

- Unicidad y formato de ubigeo de seis dígitos.
- Cobertura completa de los tres indicadores para 1,892 distritos.
- Numeradores no negativos y no mayores que su denominador.
- Reconciliación de porcentajes publicados con numerador y denominador, tolerancia máxima de 0.11 puntos porcentuales.
- Reconciliación nacional por suma de valores distritales, sin promediar porcentajes.
- Empalme con los perfiles municipales RENAMU: 1,891 coincidencias exactas.

## Resultados agregados

- Viviendas del universo: 10,167,523.
- Agua por red pública: 8,062,953 viviendas, 79.3%.
- Saneamiento por red pública: 6,990,117 viviendas, 68.7%.

Lima Metropolitana y Región Lima son dos regiones en la fuente del Censo. La capa las conserva como procedencias distintas y las muestra bajo el departamento Lima para obtener los 25 departamentos del país.

El distrito censal `160405`, Santa Rosa de Loreto, no aparece en el archivo municipal RENAMU utilizado. Se publica en el explorador nacional, pero no se fuerza un enlace a una ficha municipal inexistente.

## Límites de interpretación

- Agua por red pública no demuestra continuidad, potabilidad, presión, calidad ni asequibilidad.
- Saneamiento por red pública no demuestra tratamiento ni disposición final segura de aguas residuales.
- La unidad es la vivienda, no la persona, el sistema, la JASS, la EPS o la municipalidad.
- Las brechas calculadas son descriptivas dentro del universo censal y no sustituyen diagnóstico operativo o trabajo de campo.
- DATASS fue evaluado como fuente complementaria rural. Sus exportaciones públicas detalladas observadas contienen fechas de modificación entre 2015 y 2019; por ello no se mezclan con esta capa ni se presentan como situación operativa actual.

## Reproducción

```bash
SOURCE_RETRIEVED_AT="2026-09-10T21:45:00-07:00" npm run data:water-sanitation
npm run test:water-sanitation
```

El timestamp fijo conserva la fecha real de adquisición del snapshot versionado. Una actualización futura debe usar una nueva fecha y revisar cualquier cambio de estructura o definición antes de reemplazar el archivo.

El archivo público derivado está disponible en `/dataperu/agua-saneamiento/data.csv`. Incluye el ubigeo, las tres variables, el periodo y la URL de la fuente oficial.

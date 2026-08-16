# Fuente de DataPerú: RENAMU 2025

## Fuente oficial

- Dataset: Registro Nacional de Municipalidades 2025.
- Editor: Instituto Nacional de Estadística e Informática (INEI).
- Portal: https://www.datosabiertos.gob.pe/dataset/registro-nacional-de-municipalidades-renamu-2025-instituto-nacional-de-estad%C3%ADstica-e
- Archivo CSV: https://proyectos.inei.gob.pe/iinei/srienaho/descarga/CSV/984-Modulo1963.zip
- Ficha técnica: https://proyectos.inei.gob.pe/iinei/srienaho/Descarga/DocumentosMetodologicos/2025-62/Ficha_Tecnica_2025.pdf
- Licencia declarada: Open Database License (ODbL).

## Reproducción

1. Descargar y descomprimir el CSV oficial.
2. Guardarlo como `data/raw/renamu-2025/full.csv`.
3. Ejecutar `npm run data:renamu`.
4. Revisar `docs/data-quality-renamu-2025.md`.

El archivo fuente se mantiene fuera de Git. El repositorio conserva el script, el extracto procesado y el reporte de calidad.

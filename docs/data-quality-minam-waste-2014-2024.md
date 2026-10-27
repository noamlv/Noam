# Generacion anual de residuos municipales: control de calidad

## Fuente y corte

- Publicador: Ministerio del Ambiente (MINAM), datos reportados por municipalidades a SIGERSOL.
- Ficha oficial: https://www.datosabiertos.gob.pe/dataset/residuos-municipales-generados-anualmente
- Recurso CSV: https://www.datosabiertos.gob.pe/sites/default/files/1%20DataSet%20Residuos%20municipales%20generados%20anualmente.csv
- Licencia declarada: Open Data Commons Attribution License.
- Anos de observacion: 2014-2024; ultimo `FECHA_CORTE` del archivo: 18-12-2025.
- Recurso consultado y cotejado con la copia local el 26-10-2026. SHA-256 de ambos: `4f2cb77a3e94364dd0e5e6e21014438d64255b81953cb52f323d8006a492ccc3`.

## Publicacion

La pagina `/dataperu/temas/residuos` usa solo `QRESIDUOS_MUN`, en toneladas anuales estimadas, agregado por ano y departamento. No publica el CSV fuente ni datos personales. El extractor `scripts/build-minam-waste-generation.mjs` rechaza un archivo con otro hash hasta que se revise el cambio.

Los agregados muestran 20.650 filas, 11 anos, 25 departamentos y entre 1.851 distritos (2014) y 1.891 (2024). En 2024 los 1.891 ubigeos son unicos y coinciden con el universo municipal de RENAMU 2025. El total nacional de 2024 es 8.994.762,83 toneladas estimadas.

## Limites

- Las columnas `QRESIDUOS_DOM` y `QRESIDUOS_NO_DOM` no suman `QRESIDUOS_MUN` en las 1.891 filas de 2023. Por ello se excluyen de los agregados y de la interfaz, y se muestra una advertencia visible.
- La cobertura territorial cambia entre anos. El crecimiento del total no equivale a un cambio comparable por distrito ni demuestra mejoras o deterioro de gestion.
- Generacion estimada no equivale a recoleccion, valorizacion ni disposicion final. La seccion RENAMU 2025 trata variables de gestion diferentes y con otro periodo.
- Los datos provienen de reportes y estimaciones administrativas. No se ha auditado independientemente la calidad de cada observacion distrital.

## Reproduccion

Ejecutar `npm run data:waste` para descargar el recurso oficial y regenerar el extracto. Luego `npm run test:waste`. Si cambia el hash, comparar esquema, periodos, coberturas y agregados antes de modificar la constante del extractor o publicar una version nueva.

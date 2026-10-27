# Inventario de dashboards de la diplomatura

Estado: inventario inicial; residuos municipales integrado como primer piloto con datos agregados.

## Ubicacion

La ruta recibida `2026/15 Diplomatura/Coordinacion` contiene dos propuestas DOCX, no dashboards. Los proyectos estan en la carpeta hermana `2026/15 Diplomatura/08 Dashboards` de Google Drive. No copiar esta carpeta completa al repositorio: incluye trabajos de estudiantes, bases, archivos generados y entornos virtuales.

## Candidatos

| Proyecto | Implementacion local | Datos y alcance observados | Uso propuesto en NOAM | Condicion antes de publicar |
| --- | --- | --- | --- | --- |
| Residuos municipales | Quarto/R; `index.qmd` e `index.html` | Serie distrital MINAM 2014-2024; el archivo local tiene 1.891 ubigeos distintos en 2024. | `/dataperu/temas/residuos` incorpora la serie nacional/departamental; no confunde generacion con recoleccion y gestion RENAMU. | Mantener la revision anual y no usar los componentes inconsistentes de 2023. |
| Estado de planes de acondicionamiento territorial | Landing HTML generada con Python desde XLSX/DOCX; CSV derivado con 196 filas. | Fuente MVCS/RENAMU; nivel provincial en el CSV derivado. | Nuevo analisis de ordenamiento territorial en DataPeru, enlazado a servicios de diagnostico y planeamiento. | Verificar version oficial, licencia no especificada en el portal y semantica de vigencia antes de etiquetar planes como actuales. |
| CONADIS | Dash/Plotly/Pandas con filtros por periodo y departamento. | Datos abiertos agregados sobre atenciones/registro de personas con discapacidad. | Modulo de inclusion y servicios, con agregados y limites metodologicos. | Verificar grano de la base, posibles celdas pequenas y no exponer informacion individual o ubicaciones sensibles. |
| PAD/IPD | Streamlit/Python con filtros, trayectorias y mapas. | Archivo local con apellidos y nombres de deportistas, ademas de montos. | Analisis agregado de apoyo al deporte, sin microdatos personales descargables. | Revisar base y derechos de reutilizacion; publicar solo agregados seguros. No subir el CSV crudo ni copiar el proyecto completo. |
| ONPE presidencial 2026 | Quarto + Shiny/R; landing HTML y base CSV local fechada 15-04-2026. | Resultados electorales por mesa/territorio en un corte historico. | Observatorio electoral con snapshot claramente fechado y enlace a fuente oficial. | Contrastar con resultados oficiales vigentes, definir estado del conteo y evitar presentar el archivo como dato en vivo. Shiny exige un servicio de ejecucion aparte. |

Fuentes oficiales identificadas:

- MINAM: https://www.datosabiertos.gob.pe/dataset/residuos-municipales-generados-anualmente (acceso publico, licencia Open Data Commons Attribution; el archivo actual del portal y la copia local tienen el mismo SHA-256).
- MVCS: https://www.datosabiertos.gob.pe/dataset/estado-de-planes-de-acondicionamiento-territorial (acceso publico, licencia no especificada en la ficha).
- CONADIS: https://www.datosabiertos.gob.pe/dataset/mimp-n%C3%BAmero-de-personas-con-discapacidad-inscritas-en-el-registro-nacional-de-la-persona-con
- IPD/PAD: https://www.datosabiertos.gob.pe/dataset/programa-apoyo-al-deportista-deportistas-beneficiados-instituto-peruano-del-deporte-ipd

## Estrategia de integracion

1. Reutilizar metodo, preguntas, graficos y pipelines; no copiar automaticamente HTML, bases o dependencias de clase.
2. Crear una pagina editorial NOAM por analisis: pregunta de gestion, tres hallazgos verificables, fuente/periodo, limites, explorador y CTA hacia un servicio.
3. Preferir un modulo nativo Next.js para agregados y filtros ligeros. Reservar un servicio Python/R separado para interacciones que realmente lo necesiten; un iframe no debe ser la unica experiencia.
4. Generar extractos publicos minimos con scripts reproducibles, hashes y pruebas de cobertura. Mantener insumos originales fuera de `public/` y fuera de Git si contienen datos personales o licencias inciertas.
5. Revisar en movil, accesibilidad, rendimiento y coherencia con las rutas existentes antes de desplegar.

## Primera entrega propuesta

**Residuos municipales.** El CSV oficial fue cotejado byte a byte con la copia local y se validaron el periodo, la unidad, 25 departamentos y los 1.891 ubigeos de 2024 contra RENAMU. La pagina sectorial ahora ofrece serie anual y selector departamental con corte y metodo visibles. El cierre comercial sigue siendo un diagnostico de generacion, recoleccion y capacidad de gestion para la municipalidad interesada. Ver `docs/data-quality-minam-waste-2014-2024.md`.

No se publicaron los CSV ni el HTML originales de la carpeta. Los proyectos de estudiantes y las propuestas de coordinacion quedan fuera del alcance de publicacion.

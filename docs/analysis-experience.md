# Analisis, exploradores y dashboards originales

## Recorrido publico

DataPeru -> Analisis por tema -> Pagina con lectura continua, graficos y tablas.

- `/dataperu/analisis` agrupa residuos, planes territoriales, registro de discapacidad y apoyo al deporte.
- `/analisis/[slug]` conserva las URLs editoriales existentes. Cada pagina incluye explicacion, fuente, periodo, graficos, preguntas pendientes y apoyo opcional de NOAM.
- Las cuatro landings de DataPeru muestran sus comparaciones, interpretaciones y tablas sin desplegar filtros. Cada una ofrece un CSV de los agregados publicados. `/analisis/[slug]/dashboard` conserva el explorador nativo anterior para no romper enlaces, pero no se promociona como un dashboard original.
- `/analisis` conserva la biblioteca general y distingue DataPeru del archivo electoral.
- El conteo presidencial parcial mantiene sus advertencias historicas y su pertenencia a Electoral. No se convierte en un resultado actual por cambiar el diseno.
- Sectores explica problemas y servicios por tipo de entidad o actividad. No duplica la biblioteca de datos ni presenta servicios propuestos como consultorias realizadas.

## Graficos y privacidad

Las figuras de las landings reutilizan los agregados validados. No se incorporan microdatos, dimensiones personales ni bases nuevas. Los periodos parciales y faltantes se indican junto al grafico; la tabla anual conserva los valores exactos. Las vistas geograficas superpuestas no se suman como si fueran una serie temporal. La ordenacion no modifica los datos fuente.

Las portadas de DataPeru son recursos editoriales, no fotografias de los estudios. Apoyo al deportista usa una ilustracion original de atletas en pista. Los anos incompletos se dibujan con puntos abiertos y no se conectan a las series. En el CSV de planes territoriales se excluye el total nacional para evitar sumar dos veces las provincias.

Apoyo al deportista incluye dispersion de monto total frente a numero de registros y un mapa de calor de monto medio por registro. Comparten seleccion de ano y modalidad. El promedio divide la suma por el numero de registros del mismo grupo, no por personas unicas. 2025 se excluye por defecto; al incluirlo se identifica como corte parcial. Se usan unicamente los agregados de ano y modalidad ya disponibles; no se exportan las trayectorias individuales del original de Streamlit.

## Originales

La ficha de presentacion admite `originalDashboardUrl` solo para enlaces publicos revisados. No se inventan URLs de GitHub Pages. Si no hay original publicado, la landing funciona por si sola.

Se revisaron los 45 repositorios devueltos por GitHub para noamlv. Se encontro GitHub Pages activo en `dashboard-deportistas-pad`. Su generador usa conteos de filas como "Deportistas" y agrupa montos por departamento sin advertir que el campo es lugar de nacimiento; el repositorio tambien contiene el CSV original. No se enlaza ni se copia esa version en esta entrega. Corregir esas interpretaciones y revisar privacidad antes de promocionarla. Los otros proyectos del curso no se identificaron como publicaciones independientes en este inventario. Planometro ya conserva su enlace original revisado en Electoral.

El inventario previo distingue Quarto/HTML de Dash, Streamlit y Shiny. Estos ultimos no funcionan como HTML estatico solo cambiando colores; necesitan un servidor o una exportacion especifica. No copiar la carpeta privada completa.

## Proximos analisis (sin publicar fichas vacias)

- El Nino: revisar datos aportados, cobertura temporal y geografica, eventos, poblacion expuesta y fuentes.
- Incendios forestales: distinguir alertas, eventos confirmados, superficie afectada y capacidad de respuesta; no sumar detecciones como incendios sin validar.
- Criminalidad: distinguir denuncias, victimizacion y percepcion; revisar denominadores, cobertura y riesgo de divulgar ubicaciones sensibles.

Estos temas pertenecen a DataPeru. Antes de construir cada pagina, acordar la pregunta, inventariar archivos y revisar calidad y permisos. No se han incorporado datos nuevos en esta entrega.

## Siguiente revision de contenido

Preparar el mapa del sitio con tres estados separados: publicado, requiere mejora y propuesto. Identificar para cada tema la pagina de lectura, el explorador, las fuentes y el servicio relacionado. No usar el numero de URLs municipales como equivalente al numero de analisis originales.

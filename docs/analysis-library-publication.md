# Biblioteca de analisis: publicacion

## Alcance

Cinco landings en `/analisis/[slug]` y cinco exploradores nativos en `/analisis/[slug]/dashboard`, abiertos en otra pestana del mismo dominio. Se reutilizan las preguntas y los datos de los cinco proyectos principales de `08 Dashboards`; no los trabajos de alumnos, las presentaciones ni los entornos virtuales. No se ejecuta codigo original Shiny, Dash o Streamlit en Vercel.

Las vistas nativas incluyen composicion, periodos disponibles, tabla accesible y exportacion de agregados. No se afirma que reproduzcan todos los filtros, mapas y modelos de los originales. Una futura aplicacion Python/R puede incorporarse sin cambiar la URL editorial.

## Datos publicados

- Residuos: agregados MINAM previamente validados. Ver `data-quality-minam-waste-2014-2024.md`.
- PAT: 196 provincias de la copia de trabajo, agregadas por departamento y etiqueta original de estado. No se certifica vigencia actual. La licencia no esta especificada en la ficha oficial; no se redistribuye la base original.
- CONADIS: totales departamentales por periodo. Los periodos 2012, 2013, 2015 y 2016 contienen valores faltantes; el explorador conserva ese conteo. No se publican celdas departamentales menores a diez ni dimensiones de diagnostico o detalle distrital. No se calcula prevalencia ni acumulado de personas unicas. 2025 comprende enero-septiembre.
- PAD: sumas de MONTO por ANIO y PAD y numero de filas contribuyentes. No hay nombres, apellidos, federaciones ni territorio de nacimiento. 2025 es parcial hasta septiembre; no se interpreta como gasto ejecutado ni efecto del programa.
- ONPE: votos validos por organizacion y ambito en la copia del 15-04-2026 11:58. Las 84.720 filas tienen mesa unica y estado Contabilizada. No se calcula avance, resultados finales ni ganadores. Blancos y nulos se excluyen del denominador de votos validos; no se usa el 91.322 del nombre del archivo como indicador certificado.

## Procedencia y reproduccion

El script `scripts/build-diplomatura-snapshots.py` recibe la carpeta privada como unico argumento y produce solo los agregados publicos. Los SHA-256 de las copias se conservan en el JSON y en cada dashboard; los originales no se copian al repo. Las cifras describen esas copias, no una actualizacion oficial al dia de publicacion.

`npm run test:analysis-library` comprueba reconciliacion de ambitos, estados PAT, periodos parciales, totales de control, campos permitidos y categorias. La incorporacion al catalogo hace que las landings entren en la busqueda. Sitemap, DataPeru y Electoral enlazan la biblioteca.

Antes de ampliar datos o agregar dimensiones personales, revisar licencia, grano y riesgo de divulgacion nuevamente. Que una base sea publica no obliga a republicar identificadores.

# Criterio editorial: problema antes que contratacion

## Recorrido publico

1. Comprender el problema y a quienes afecta.
2. Revisar evidencia, limites y preguntas pendientes.
3. Explorar alternativas, capacidades existentes y criterios de mejora.
4. Ofrecer acompanamiento de NOAM solo si el visitante lo necesita.

Las paginas no ofrecen documentos listos para contratar ni presuponen que el visitante ya eligio una solucion o proveedor. Las guias y matrices ayudan a pensar con el equipo, no sustituyen decisiones de la entidad ni documentacion contractual.

## Aplicacion

Se revisaron llamadas a la accion, FAQs, metadata, busqueda, catalogo de recursos, servicios, muestras y 19 guias. Las referencias a obligaciones de confidencialidad en casos reales mantienen su sentido contractual. El analisis del mercado de compras publicas sigue siendo un tema valido: no se elimina el contenido sobre contrataciones por el mero uso de esa palabra.

Las URLs y los identificadores historicos que contienen `tdr-` se conservan por estabilidad. No aparecen como titulos ni promesas comerciales. No cambiar las rutas sin preparar redirecciones, enlaces internos y sitemap.

## Control

`npm run test:problem-first` revisa la ausencia de ese encuadre en el texto publico, la orientacion de las guias y la preservacion de la nota contractual de confidencialidad. Al ampliar contenidos, usar etiquetas que expliquen el destino del enlace; ver el criterio de lenguaje claro mas abajo.

## Lenguaje claro: revision del 30 de octubre de 2026

- Titulos que nombren el tema o formulen una pregunta concreta. Evitar esloganes basados en negar algo: "X no demuestra Y". Las limitaciones siguen siendo obligatorias junto a los datos.
- Explicar que encontrara el lector antes de ofrecer un servicio. Mostrar enlaces a datos existentes; no prometer evidencia local donde solo hay una guia.
- Botones que describan el destino: "Ver datos de residuos", "Leer la guia", "Describir mi consulta" o "Consultar con NOAM".
- Usar frases completas en vez de cadenas de sustantivos. Explicar siglas cuando aparezcan por primera vez.
- Distinguir resultados observados de preguntas, recomendaciones y ejemplos. El componente Findings admite un titulo especifico para las guias.
- Mantener cifras, fechas, fuentes, cautelas de interpretacion, privacidad y condiciones de confidencialidad.
- Presentar a NOAM como organizacion: "escribirnos" en lugar de "escribirme" en las guias.
- Sincronizar titulos y descripciones de guias con el catalogo de recursos.

### Cobertura de esta revision

Portada, DataPeru, biblioteca de analisis y sus cinco fichas, 13 paginas sectoriales, paginas de metodos, servicios, 19 guias, directorio compartido, pie de pagina y Orientador. Se conservan rutas, identificadores y calculos. La guia de residuos se redujo de veinte bloques a diez preguntas practicas; la matriz descargable conserva su detalle tecnico.

### Revision posterior por lotes

Las sintesis departamentales, articulos historicos, matrices CSV y textos largos de productos deben leerse por separado. No se consideran revisados completamente por cambiar sus enlaces o los encabezados compartidos. Al revisar evidencia nueva, contrastar las afirmaciones con la fuente antes de publicar.

### Pruebas

`npm run test:plain-language` detecta regresiones concretas en etiquetas, destinos y titulos del catalogo. No mide automaticamente la naturalidad de un texto ni sustituye la lectura editorial.

### Portada y contacto

- Presentacion: "Consultoria para gobiernos y empresas"; titulo principal sin punto final.
- Imagen sin lemas ni etiquetas territoriales superpuestas; se conserva la indicacion de imagen ilustrativa.
- Las cifras internas se sustituyen por accesos a problemas departamentales, presupuesto, inversion y analisis. No se inventan indicadores de impacto.
- La agenda destaca necesidades de gestion. Planometro sigue disponible en Electoral, sin promocionarlo desde la portada.
- Los tres casos explican el problema y el trabajo realizado, con atribucion a Noam Lopez. Las condiciones de confidencialidad se mantienen en las fichas completas.
- Barometro ciudadano agrupa encuestas. El primer analisis conserva su fuente IMASEN, fecha de enero de 2026 y limites de interpretacion; no se presenta como opinion actual.
- Contacto explica como escribir, no la infraestructura del sitio. Se mantienen los controles existentes para habilitar formularios y evitar confirmaciones de guardado cuando falla la base de datos.

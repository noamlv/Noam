# NOAM: ruta a produccion, posicionamiento y demanda

Fecha de auditoria: 2026-07-17

## Diagnostico ejecutivo

NOAM ya tiene una base tecnica valida para convertirse en plataforma: Next.js, contenido MDX, catalogo de productos, demos, formulario, Postgres, panel comercial y portal de cliente. Todavia no debe recibir datos sensibles en produccion sin completar el bloque de seguridad y operacion.

La principal brecha de mercado no es tecnologica. Es demostrar utilidad y autoridad con productos publicos verificables, metodologia visible, casos reales y una cadencia editorial. Hoy hay mas arquitectura que evidencia publica.

## Estado por frente

### Listo como base

- Arquitectura Next.js App Router con TypeScript y Tailwind.
- Design system sobrio, responsive y con bajo uso de JavaScript cliente.
- Rutas publicas, metadata, sitemap, robots, RSS y JSON-LD inicial.
- Contenido MDX y componentes editoriales reutilizables.
- Catalogo de productos y servicios.
- Modelo Postgres para leads, clientes, propuestas, pagos, proyectos y entregables.
- Panel operativo y portal de cliente en etapa funcional inicial.

### Publicable despues de ajustes

- Home y navegacion: dirección visual propietaria y jerarquía comercial implementadas; falta QA móvil automatizado y medición con usuarios.
- DataPeru: módulo real con RENAMU 2025, 1,891 perfiles, población INEI, presupuesto, inversión y proyectos MEF, lecturas sectoriales, fuentes y controles de calidad.
- Visor DataPerú: primera capa georreferenciada departamental con cinco indicadores, geometrías referenciales oficiales y GeoJSON abierto. **Implementado.**
- Distribución orgánica: previews Open Graph dinámicos, acciones de compartir, interlinking temático y descargas CSV municipales con fuente y periodo. **Implementado.**
- Biblioteca de recursos: ocho datasets, guías, plantillas y exploradores trazables, filtrables y medidos con analítica propia. **Implementado.**
- Brief NOAM: archivo público, primera edición basada en evidencia, RSS, OG, buscador, captación por preferencias, consentimiento, confirmación de un solo uso, baja, panel agregado y medición de solicitudes. **Implementado en código; pendiente dominio de correo verificado y envío real.**
- Planómetro ya publica una experiencia nativa con metodología, validación, agregados y descargas. Barómetro ya tiene URL canónica, ficha técnica, fuente, límites y experiencia integrada; trasladar nuevos resultados requiere confirmar derechos de publicación.
- Planómetro conecta además 36 perfiles de organizaciones y 11 lecturas temáticas indexables, con referencias descriptivas, advertencias por bases pequeñas e interlinking. **Implementado.**
- Contacto: captura oportunidades calificadas, origen y consentimiento; incorpora rate limiting por proceso y analítica propia de conversión sin cookies. Falta protección distribuida en Cloudflare para producción.
- Diseñador de alcance: convierte cuatro selecciones en recomendación, fases, entregables, brief Markdown y contacto prellenado sin almacenar respuestas. **Implementado.**
- Biblioteca de muestras: seis arquitecturas comerciales muestran preguntas, módulos, artefactos, cronogramas, insumos y controles sin presentarse como casos de cliente. **Implementado.**
- Estudio insignia: panorama municipal 2025 convierte el universo DataPerú en una lectura ejecutiva con rangos, método, tabla y datos descargables. **Implementado.**
- SEO tecnico: la estructura existe, pero falta volumen de contenido, enlaces entrantes y herramientas indexables.

### No listo para produccion sensible

- Identidad administrativa individual, roles, MFA, sesiones revocables y auditoría implementados; falta crear y probar las identidades reales de producción.
- Tokens del portal hasheados, con expiración obligatoria, último uso y revocación; identidad individual y auditoría por operador implementadas. Falta ensayar la rotación y respuesta a incidentes con el equipo real.
- Roles, MFA, suspensión, revocación de sesiones y límite de intentos por proceso implementados. Falta protección distribuida, identidades reales de producción y ensayo operativo de recuperación.
- Backup y restauración local verificados. Faltan automatización cifrada, copia externa y simulacro sobre Postgres de producción.
- Auditoría administrativa implementada. Faltan monitoreo, alertas y un procedimiento formal de incidentes.
- Pruebas automatizadas de rutas públicas, cabeceras, acceso administrativo, APIs, artefactos SEO y analítica ya implementadas; falta ampliar integración con Postgres real.
- Aviso de privacidad, términos, estándar de transparencia y regla interna de retención publicados; faltan revisión legal profesional y configuración definitiva del banco de datos.

## Norte de producto

NOAM debe operar con esta secuencia:

1. La persona llega por una pregunta concreta.
2. Obtiene una respuesta util mediante datos, mapas, comparadores o briefs.
3. Entiende la metodologia y confia en la capacidad de NOAM.
4. Solicita un diagnostico, dashboard, estudio o implementacion.
5. Recibe propuesta, proyecto y entregables dentro de la plataforma.

La portada no debe intentar explicarlo todo. Debe conducir a tres puertas principales:

- Gestion publica y territorio.
- Analisis electoral.
- Datos e IA aplicada.

## Productos publicos prioritarios

### 1. DataPeru: perfil territorial

Primera version util:

- Búsqueda por departamento, provincia, distrito y ubigeo. **Implementado con RENAMU 2025.**
- Ficha ejecutiva de capacidad municipal. **Implementado.**
- Poblacion, presupuesto, ejecucion, brechas y riesgos con fuente y fecha. **Implementado.**
- Comparación descriptiva por tipo municipal. **Implementado.**
- Ficha ejecutiva imprimible o guardable como PDF. **Implementado.**
- CTA para solicitar diagnóstico o dashboard institucional. **Implementado.**

### 2. Planometro ERM 2026

Primera version util:

- Landing ERM 2026 que conecta territorio, transición y primeros 100 días. **Implementado.**
- Brief territorial dinámico e imprimible para cualquier municipalidad de DataPerú. **Implementado.**
- Comparador de planes de gobierno regionales y municipales.
- Ejes, propuestas, concrecion, viabilidad y vacios.
- Metodologia transparente y limitaciones.
- Paginas indexables por territorio, organizacion y tema.
- Perfiles indexables por organización y eje temático. **Implementado para el corpus presidencial 2026.**
- Briefs para prensa, academia, ciudadania y equipos tecnicos.

### 3. Observatorio de gestion publica

Primera version util:

- Radar nacional de recursos, ejecución y capacidades municipales. **Implementado.**
- Distribuciones y comparación por tipo municipal sin ranking compuesto. **Implementado.**
- Explorador filtrable conectado a perfiles y briefs territoriales. **Implementado.**
- Seguimiento temporal y alertas de cambios relevantes. **Pendiente de nuevas series.**
- Casos de uso para alcaldías, gerencias y gobiernos regionales. **Implementado como capa comercial inicial.**

## Estrategia de trafico y posicionamiento

### Adquisicion organica

- Crear paginas que respondan busquedas concretas, no articulos institucionales genericos.
- Publicar perfiles territoriales indexables y actualizables.
- Construir clusters de contenido conectados a productos.
- Ofrecer datasets, diccionarios y metodologia que otros puedan citar.
- Generar Open Graph propio por producto y publicacion. **Implementado para contenido, temas, soluciones, servicios y municipios.**
- Activar Google Search Console y Bing Webmaster Tools al publicar.

### Clusters editoriales

- ERM 2026: planes, candidatos, propuestas, brechas y agendas territoriales.
- Gestion municipal y regional: presupuesto, inversion, servicios, riesgos y seguimiento.
- DataPeru: perfiles y comparaciones territoriales.
- IA para el Estado: casos de uso, gobernanza, compras, riesgos y productividad.
- Estudios y evaluacion: diagnosticos, indicadores, metodologias y resultados.

### Distribucion

- LinkedIn personal del fundador como canal editorial principal.
- Brief semanal por email y WhatsApp, con enlace al analisis completo.
- Webinars cortos alrededor de un dato o herramienta.
- Colaboraciones con medios, universidades, asociaciones y especialistas.
- Versiones embebibles de graficos con credito y enlace a NOAM.

### Conversion

- CTA distinto por audiencia y producto.
- Formulario corto en primera interaccion y briefing completo despues.
- Recurso descargable con suscripcion voluntaria.
- Casos con problema, metodo, entregable e impacto.
- Calendario o solicitud de reunion solo despues de demostrar valor.
- Medicion de vistas de producto, uso de demo, descarga, formulario y lead calificado.

## Contenido que debe entregar Noam

### Prioridad critica

- Tres proyectos o experiencias reales que puedan convertirse en casos, aunque sean anonimos.
- Para cada caso: contexto, problema, rol, metodo, entregables, resultado y evidencia permitida.
- Definicion de los tres servicios que se desean vender primero.
- Audiencia decisora de cada servicio y problema presupuestable que resuelve.
- Fuentes y archivos reales de DataPeru, Planometro y Barometro.
- Foto profesional horizontal y vertical, y permiso de uso de otras imagenes.
- Bio corta, bio larga y propuesta personal como fundador.
- Enlaces sociales verificados y datos de contacto publicos.
- Testimonios reales con autorizacion o decision de mantenerlos anonimos.

### Antes de produccion

- Nombre o razon social que actuara como responsable de datos.
- RUC y domicilio legal solo si corresponde publicarlos.
- Correo de privacidad y plazo deseado de conservacion de leads.
- Condiciones comerciales: monedas, impuestos, vigencia de propuestas y medios de pago.
- Politica sobre informacion confidencial de clientes.

### Puede producirse con ChatGPT y revision humana

- Borradores de paginas de servicio a partir de entrevistas o notas.
- Briefs, outlines y metadatos para contenidos SEO.
- Conversion de proyectos reales en casos anonimizados.
- FAQs, glosarios, diccionarios de datos y notas metodologicas.
- Guiones para videos, webinars, LinkedIn y newsletter.
- Resumen ejecutivo y version ciudadana de estudios tecnicos.
- Matrices comparativas y calendarios editoriales.

ChatGPT no debe inventar cifras, fuentes, clientes, testimonios, resultados ni metodologia aplicada. Todo claim cuantitativo debe tener una fuente o eliminarse.

## Seguridad: condiciones minimas de salida

### Aplicacion

- Dependencias sin vulnerabilidades altas o criticas conocidas.
- Admin cerrado por defecto en produccion.
- Autenticacion individual con MFA antes de operar clientes reales.
- Endpoint de leads privado para lectura.
- Rate limiting y Turnstile en formularios publicos.
- Tokens del portal almacenados como hash, con expiracion y revocacion.
- Validacion de archivos, URLs y entradas.
- CSP, HSTS, no-sniff, referrer policy y permisos restrictivos.

### Datos e infraestructura

- Postgres sin exposicion publica directa.
- Usuario de aplicacion con privilegios minimos.
- Backups diarios cifrados y copia fuera del servidor.
- Prueba mensual de restauracion.
- Cifrado TLS y secretos fuera de Git.
- Logs de acceso administrativo y cambios comerciales.
- Monitoreo de disponibilidad, errores y capacidad.

### Legal y operacion

- Aviso de privacidad y términos publicados; pendiente revisión legal profesional.
- Consentimiento claro en formularios. **Implementado.**
- Regla de retención publicada; pendiente automatizar eliminación.
- Procedimiento de incidente y responsable definido.
- Inventario de datos personales y de terceros.

## Milestones

### M0. Cierre tecnico local

- Corregir riesgos de autenticacion y endpoints.
- Actualizar dependencias.
- Levantar Postgres local y ejecutar migraciones desde cero.
- Agregar pruebas de humo, integracion y seguridad basica.
- Crear CI en GitHub.

Salida: build limpio, pruebas verdes y checklist de seguridad reproducible.

### M1. Lanzamiento institucional

- Mejorar home con direccion visual propietaria.
- Resolver navegacion movil.
- Publicar privacidad, términos y estándar editorial/de datos. **Implementado en código.**
- Activar formulario, email y analitica.
- Conectar la analítica propia y el panel de conversión a Postgres de producción. **Implementado en código; pendiente infraestructura.**
- Conectar noam.pe, Cloudflare y Vercel.

Salida: sitio institucional confiable y capaz de captar demanda.

### M2. Producto semilla y autoridad electoral

- Publicar Planómetro presidencial, metodología y biblioteca programática indexable. **Implementado con experiencia nativa, snapshot auditable, 36 organizaciones y 11 ejes.**
- Publicar Barómetro con ficha metodológica y atribución. **Implementado; resultados nativos pendientes de autorización.**
- Crear perfiles territoriales iniciales en DataPeru.
- Publicar briefs de preparación de gestión por municipalidad. **Implementado.**
- Publicar seis contenidos de alta utilidad conectados a productos.
- Publicar el archivo del Brief NOAM, una primera edición verificable y RSS. **Implementado.**
- Configurar distribución por email y una cadencia editorial sostenible. **Código implementado; pendiente infraestructura de envío.**

Salida: trafico por utilidad, primeras menciones y leads atribuibles.

### M3. Operacion comercial

- Auth individual, roles, MFA y auditoría. **Implementado en código; pendiente configuración operativa real.**
- CRM ligero, propuestas, cotizaciones, pagos y proyectos.
- Portal seguro por cliente.
- Plantillas PDF y trazabilidad.

Salida: NOAM opera una consultoria desde su propia plataforma.

### M4. Plataforma de datos

- Pipelines Python reproducibles.
- PostGIS, mapas, indicadores y cache.
- Actualizacion programada y observabilidad de datos.
- API interna y descargas versionadas.

Salida: DataPeru y los productos de analisis funcionan con datos reales y actualizables.

## Indicadores de los primeros 90 dias

- Paginas utiles publicadas y actualizadas.
- Visitas organicas no marcarias.
- Usuarios que usan una demo o perfil territorial.
- Descargas y suscripciones voluntarias.
- Leads calificados por producto.
- Reuniones, propuestas y contratos atribuibles al sitio.
- Enlaces y menciones desde sitios externos relevantes.
- Tiempo de carga, errores y disponibilidad.

Las metas numericas se fijaran despues de tener una linea base de 30 dias. Antes de eso, cualquier porcentaje seria inventado.

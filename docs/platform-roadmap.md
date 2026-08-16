# NOAM Platform Roadmap

## Vision

NOAM debe operar como plataforma de posicionamiento, demanda y productos de datos:

- Sitio publico institucional.
- Landings por servicios y productos.
- Captura y gestion de leads.
- Demos comerciales.
- Dashboards e indicadores.
- Visores georreferenciados.
- Backoffice para operar contenidos, recursos y oportunidades.

## Stack

- Web: Next.js App Router, React, TypeScript, Tailwind.
- Base de datos: Postgres estandar via `DATABASE_URL`.
- Auth: identidades propias en Postgres, contraseñas `scrypt`, sesiones revocables, roles, MFA TOTP y auditoría.
- Storage: local/S3/R2 segun etapa para PDFs, datasets e imagenes.
- Email: Resend.
- Datos/Python: pipelines ETL, notebooks, modelado, scraping y generacion de indicadores.
- Mapas: MapLibre GL o Leaflet en el milestone geoespacial.

## Milestone 1: Dynamic Core

Estado: funcional en local.

- `/contact` crea leads reales.
- `/api/leads` permite crear/listar leads.
- `/admin` muestra leads y estado de datos.
- Fallback local en `.data/leads.json` si `DATABASE_URL` no esta configurado.
- Notificaciones de leads con Resend si las variables estan configuradas.
- `/products` lista productos/servicios/demos.
- `/products/[slug]` crea landings dinamicas iniciales.
- `/demos` lista prototipos, dashboards y visores navegables.
- `/verticals/electoral` agrupa Planometro y Barometro como primera vertical comercial.
- `/dataperu/municipios` publica un buscador y perfiles para 1,891 municipalidades con RENAMU, población INEI, presupuesto y proyectos MEF 2025.
- `/dataperu/departamentos` agrega un atlas interactivo y 25 perfiles departamentales indexables con señales, referencias nacionales y cartera municipal enlazada.
- `/dataperu/inversiones` publica un observatorio sobre 9,429 proyectos municipales visibles, con composición funcional, tramos de ejecución y exploración departamental bajo demanda.
- `/dataperu/mapa` publica el primer visor georreferenciado real con cinco capas departamentales, límites referenciales oficiales y GeoJSON descargable.
- `/dataperu/temas` publica cinco lecturas sectoriales trazables: residuos, seguridad ciudadana, gestión del riesgo, desarrollo económico local y gestión ambiental.
- Los pipelines `data:renamu`, `data:context`, `data:projects` y `data:boundaries` validan esquema, ubigeos, cobertura, geometrías y consistencia antes de generar los extractos.
- La primera capa de lectura accionable incluye hasta cinco proyectos principales y señales descriptivas que conducen a preguntas de gestión.
- Cada perfil incluye una ficha ejecutiva imprimible para guardar como PDF.
- `/demos/observatorio` redirige al módulo municipal real.
- `/electoral/planometro-2026` publica Planómetro como producto nativo, con explorador, metodología, validación y datos agregados descargables.
- `/demos/planometro` queda como redirección histórica a la ruta canónica.
- `/electoral/barometro-enero-2026` publica una landing canónica con ficha técnica, límites, atribución y producto interactivo integrado.
- `/demos/barometro-electoral` queda como redirección histórica.

## Milestone 2: Postgres

- Postgres local en Docker sobre `localhost:5433`. **Completado.**
- Quince migraciones aplicadas y verificadas. **Completado.**
- Persistencia real de leads y analítica de conversión. **Completado.**
- Backup y restauración local verificada. **Completado.**
- Elegir y preparar Postgres de producción en VPS propio. **Pendiente.**
- Configurar Resend para notificaciones.
- Proteger `/admin` con auth real. **Completado en código y validado localmente.**
- `platform_products` ampliado, sincronizado y gestionable desde el panel. **Completado.**
- Sembrar `verticals`, `demos`, `datasets`, `dashboard_metrics`, `map_layers`, `survey_projects` y `electoral_projects`.

## Milestone 3: Commercial Core

Estado: funcional en local.

- La capa pública ya organiza seis soluciones comprables para gobiernos y empresas, conectadas con capacidades, evidencia y formularios contextuales.
- Se publicaron contenidos editoriales sobre seguimiento municipal, inversión territorial e IA pública.
- Tres toolkits incluyen plantillas CSV descargables para priorización, decisión territorial y diseño de encuestas.
- Modelo base para `clients`, `proposals`, `quotes`, `invoices`, `payments`, `projects` y `deliverables`.
- `/admin/commercial` permite crear clientes y propuestas.
- El panel `/admin` muestra pipeline comercial inicial.
- Propuestas, cotizaciones, documentos de cobro, pagos parciales, reembolsos, proyectos y entregables operan sobre Postgres.
- `/portal/[token]` publica recursos y seguimiento privado por cliente.
- Tokens de portal almacenados únicamente como hash SHA-256, con vencimiento máximo de 90 días, último uso y revocación. **Completado.**
- Identidades individuales, sesiones revocables, roles, contraseña inicial obligatoria, MFA TOTP, códigos de recuperación y auditoría por operador. **Completado en código.**
- Siguiente: probar el procedimiento con la identidad real, rotación operativa y documentos comerciales PDF con datos contractuales reales.

## Milestone 4: Product Engine

- Alta, lectura, edición, publicación y retiro interno de productos sin borrado destructivo. **Completado.**
- Catálogo, landings genéricas y búsqueda alimentados por Postgres con fallback versionado. **Completado.**
- Recursos públicos administrables y asociados a productos. **Completado.**
- Biblioteca `/resources` con datasets, metodologías, guías, plantillas y exploradores verificables. **Completado.**
- Tracking propio de apertura y descarga por recurso. **Completado.**
- El Laboratorio de casos de uso de IA ya permite evaluar oportunidad, exposición y controles, comparar configuraciones y exportar resultados sin almacenar las respuestas.

## Milestone 5: Dashboards & Maps

- Estado: iniciado con DataPerú municipal.
- Modelo `dashboard_metrics`.
- Modelo `map_layers`.
- Demo georreferenciada con MapLibre.
- Carga de datos desde CSV/GeoJSON/Postgres.
- Pipelines Python en `data-pipelines/`.
- La primera capa sectorial de DataPerú está disponible y conserva denominadores, valores faltantes y advertencias sobre información declarada.
- La capa regional de DataPerú reconcilia población, PIM, devengado e inversión con el universo municipal y evita índices o rankings compuestos.
- Siguiente: incorporar fuentes sectoriales de resultados y cobertura para agua, salud, educación, empleo y conectividad, con normalización territorial.

## Producto Semilla: Planometro Electoral

Origen local: `/Users/noam/Library/CloudStorage/GoogleDrive-lopeznoam@gmail.com/Mi unidad/Proyectos con IA/Planes_gobierno`

Estrategia:

- Fase 1: integrarlo como producto NOAM con landing y demo wrapper. **Completada.**
- Fase 2: publicar/embeber el sitio Quarto renderizado. **Completada.**
- Fase 3: extraer indicadores, iframes y datos principales hacia componentes Next. **Completada para agregados, explorador y metodología.**
- Fase 4: llevar outputs a Postgres/Storage.
- Fase 5: crear pipeline R/Python reproducible para actualizar datasets.

## Producto Semilla: Barometro Electoral Enero 2026

Origen local: `/Users/noam/Library/CloudStorage/GoogleDrive-lopeznoam@gmail.com/Mi unidad/Proyectos con IA/Imasen_enero`

URL publica actual: `https://noamlv.github.io/peru-malestar-riesgo-electoral/`

Estrategia:

- Fase 1: integrar landing canónica, ficha técnica, atribución y demo publicada. **Completada.**
- Fase 1.5: confirmar autorización para reproducir agregados y visualizaciones derivadas. **Pendiente.**
- Fase 2: extraer tracker, segmentacion, visualizaciones y brief como modulos.
- Fase 3: modelar encuesta, indicadores y outputs como tablas.
- Fase 4: publicar datasets anonimizados/derivados en Storage.
- Fase 5: crear dashboard vivo para futuras mediciones.

## Milestone 6: Editorial & Growth

- Portada internacional en inglés. **Completada.**
- Auditoría editorial automatizada de MDX, metadata e identidad pública. **Completada.**
- Búsqueda global y filtros editoriales server-first. **Completado.**
- Captación del Brief NOAM con preferencias, consentimiento, doble confirmación, baja y panel agregado. **Completado en código.**
- Archivo público `/brief`, primera edición trazable, RSS, OG dinámico, búsqueda e interlinking con Evidencia y newsletter. **Completado.**
- Entrega real de confirmaciones y futuras ediciones: requiere Resend, dominio remitente verificado y prueba en producción. **Pendiente externo.**
- Editor, segmentación, previsualización, programación, envío, reintento selectivo y baja individual por edición. **Completado en código.**
- Despacho programado mediante comando auditable para cron. **Completado en código; pendiente configurar cron y remitente en producción.**
- OG dinamico.
- Analytics.
- Tests end-to-end.

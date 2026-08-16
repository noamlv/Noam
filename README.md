# NOAM Web (V1)

Plataforma institucional de NOAM construida con Next.js App Router + TypeScript + Tailwind + MDX.

## Stack

- Next.js (App Router)
- React + TypeScript
- TailwindCSS
- MDX (filesystem + `next-mdx-remote`)
- Postgres estandar via `DATABASE_URL`
- Preview temporal: Vercel
- Produccion soberana: Docker + Caddy + Postgres en VPS

## Ejecutar en local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Comandos

```bash
npm run dev
npm run dev:open
npm run dev:fresh
npm run lint
npm run typecheck
npm run test:planometro
npm run test:analytics
npm run test:scope
npm run test:editorial
npm run test:search
npm run test:db
npm run test:products:db
npm run test:resources
npm run test:resources:db
npm run test:newsletter:db
npm run test:admin:db
npm run test:contact
npm run build
npm run check
npm run test:smoke:ci
npm run start
npm run data:renamu
npm run data:sectors
npm run data:context
npm run data:projects
npm run data:boundaries
npm run data:planometro
npm run data:dataperu
npm run db:local
npm run db:migrate
npm run db:seed:catalog
npm run db:seed:resources
npm run db:seed
npm run db:backup:local
npm run db:restore:check
npm run admin:create -- --email tu@email.com --name "Tu nombre" --role owner
```

`npm run check` ejecuta lint y TypeScript una sola vez, corre las pruebas deterministas y genera el build verificado sin duplicar esos dos procesos. `npm run build` conserva la validación integrada completa para despliegues. Después de un build correcto, `npm run test:smoke:ci` levanta temporalmente el servidor de producción y comprueba rutas críticas, cabeceras de seguridad, acceso administrativo, APIs, OpenGraph, CSV, sitemap, RSS, manifest y 404.

GitHub Actions repite esta validación en cada pull request y en los cambios enviados a `main` o ramas `codex/**`. La configuración está en `.github/workflows/quality.yml`.

## Plataforma dinamica

La primera capa dinamica ya esta preparada:

- `/contact`: crea oportunidades calificadas con solución, organización, territorio, plazo, rango referencial, origen y consentimiento.
- `/diagnostico`: diseñador de alcance privado por defecto, con 400 combinaciones, brief Markdown y contacto prellenado.
- `/muestras`: biblioteca de seis entregables demostrativos, imprimibles y conectados con las soluciones comerciales.
- `/privacy`: aviso sobre tratamiento de datos del formulario público.
- `/terms`: condiciones de uso, propiedad intelectual y límites de responsabilidad.
- `/transparency`: estándar editorial, de fuentes, métodos, IA y correcciones.
- `/api/leads`: API para crear/listar leads.
- `/admin`: panel interno inicial.
- `/admin/commercial`: operación de clientes, propuestas, cotizaciones, documentos de cobro, pagos, proyectos y entregables.
- `/portal/[token]`: espacio privado por cliente para publicar recursos y seguir propuestas, proyectos y entregables.
- `/services`: tres lineas comerciales de NOAM.
- `/solutions`: seis puntos de partida comerciales para gobiernos y empresas, con alcance, entregables, proceso y evidencia relacionada.
- `/sectors`: soluciones para sector publico y empresas.
- `/dataperu`: plataforma territorial de NOAM.
- `/dataperu/panorama-municipal-2025`: estudio insignia con hallazgos, rangos, comparación institucional, tabla departamental y CSV.
- `/dataperu/municipios`: buscador y 1,891 perfiles con población, presupuesto, proyectos, señales y capacidades municipales.
- `/dataperu/temas`: lecturas de residuos, seguridad, riesgos, desarrollo económico y gestión ambiental para 1,891 municipalidades.
- `/dataperu/municipios/[ubigeo]/brief`: ficha ejecutiva lista para imprimir o guardar como PDF.
- `/electoral`: vertical de elecciones, transicion y gobierno.
- `/electoral/planometro-2026`: producto nativo para explorar 36 planes, metodología, validación y agregados descargables.
- `/electoral/planometro-2026/organizaciones`: directorio y 36 perfiles programáticos indexables.
- `/electoral/planometro-2026/ejes`: directorio y 11 lecturas temáticas con cobertura y preguntas de análisis.
- `/electoral/barometro-enero-2026`: ficha metodológica y experiencia integrada del Barómetro Electoral.
- `/evidence`: biblioteca de estudios, indicadores, guias y casos.
- `/newsletter`: Brief NOAM con preferencias temáticas, consentimiento y doble confirmación.
- `/buscar`: índice global server-first de evidencia, soluciones, productos y prácticas sectoriales, con filtros por tipo y tema.
- `/downloads`: plantillas editables vinculadas a toolkits editoriales.
- `/products`: catalogo secundario de herramientas y prototipos.
- `/demos`: hub de prototipos, dashboards y visores.
- `/demos/observatorio`: redirección histórica al módulo municipal real de DataPerú.
- `/about`: tesis de la firma, principios y fundador.

En desarrollo, si no hay `DATABASE_URL` o Postgres no responde, los leads se guardan en `.data/leads.json`. En producción los errores de Postgres no se ocultan con fallback local.

Para activar Postgres local:

1. Crea `.env.local` usando `.env.example`.
2. Ejecuta `npm run db:local`.
3. Ejecuta `npm run db:migrate`.
4. Ejecuta `npm run db:seed` para incorporar catálogo y recursos base sin sobrescribir ediciones existentes.
5. Ejecuta `npm run test:db`, `npm run test:products:db`, `npm run test:resources:db`, `npm run test:newsletter:db` y `npm run test:campaigns:db` para validar los flujos sin dejar registros.
6. Reinicia `npm run dev:open`.

El Postgres de Docker se publica en `localhost:5433` para no interferir con instalaciones nativas en `5432`. Mientras Docker esté cerrado, la web pública funciona, pero contacto, admin, portal y analítica persistente no tendrán base local disponible.

Para usar un VPS o proveedor administrado, cambia `DATABASE_URL` y ejecuta las mismas migraciones. Ver `docs/postgres-setup.md`.

Para activar emails de leads y confirmaciones del Brief NOAM:

1. Crea una API key en Resend.
2. Agrega `RESEND_API_KEY`, `LEAD_NOTIFY_TO` y `LEAD_NOTIFY_FROM`.
3. Reinicia el servidor local o redeploya en Vercel.

Sin correo configurado, una solicitud del Brief puede quedar guardada como `pending`, pero nunca se activa ni se utiliza. El editor de campañas está disponible en `/admin/audience/campaigns`: permite guardar, segmentar, previsualizar, programar, enviar y reintentar fallos; cada destinatario recibe una baja individual almacenada únicamente como hash.

Para despachar ediciones programadas desde un cron del VPS:

1. Configura `NOAM_CAMPAIGN_ACTOR_EMAIL` con una identidad `owner` o `editor` activa, con contraseña definitiva y MFA.
2. Ejecuta periódicamente `npm run campaigns:dispatch`.
3. Revisa entregas y fallos en la edición correspondiente antes de reintentar.

El despacho no se ejecuta durante un build ni al guardar contenido. En producción todavía se debe verificar el dominio remitente de `noam.pe` y probar una edición controlada con direcciones reales.

## Acceso administrativo

El panel utiliza identidades individuales en Postgres, contraseñas `scrypt`, sesiones hasheadas de ocho horas, roles `owner` / `editor` / `analyst`, cambio obligatorio de contraseña inicial, TOTP MFA, códigos de recuperación y bitácora de acciones.

1. Define `NOAM_AUTH_ENCRYPTION_KEY` con 32 bytes aleatorios y conserva la clave fuera de Git.
2. Ejecuta `npm run db:migrate`.
3. Crea la primera identidad con `npm run admin:create -- --email tu@email.com --name "Tu nombre" --role owner`.
4. Guarda la contraseña inicial que aparece una sola vez.
5. Ingresa en `/admin/login`, cambia la contraseña y activa MFA desde `/admin/security`.
6. Mantén `NOAM_ALLOW_LEGACY_ADMIN=false` en producción.

Un `owner` puede crear otros operadores, cambiar roles, suspender identidades y revocar sus sesiones desde `/admin/security/users`. El modo de desarrollo sin login sólo existe cuando no hay ninguna identidad creada y `NODE_ENV` no es producción.

## Datos de DataPerú

El primer módulo cruza RENAMU 2025, población proyectada del INEI y presupuesto y proyectos 2025 del MEF. También publica cinco lecturas sectoriales construidas desde módulos específicos de RENAMU. Los archivos fuente no se versionan; el repositorio conserva los extractos procesados, las transformaciones y los reportes de calidad.

Para regenerarlo, consulta `docs/data-sources-renamu-2025.md`, `docs/data-sources-dataperu-context.md` y los reportes de calidad. Instala `requirements-data.txt` para el pipeline geoespacial y ejecuta `npm run data:dataperu` cuando las fuentes crudas estén disponibles.

## Estructura

- `app/`: rutas y paginas
- `components/ui/`: design system base
- `components/mdx/`: bloques MDX reutilizables
- `content/`: colecciones MDX (`insights`, `indicators`, `toolkits`, `services`, `cases`)
- `data/processed/`: extractos públicos listos para la aplicación
- `scripts/`: pipelines reproducibles y utilidades de generación
- `lib/`: utilidades de contenido y SEO

## Modelo de frontmatter (MDX)

Campos soportados:

- `title`
- `description`
- `date`
- `tags`
- `topic` (`gobierno`, `inversion`, `ia`)
- `featured`
- `readingTime`
- `ogImage`
- `outcome` (opcional)
- `draft` (opcional)

## SEO implementado

- Metadata API con template de titulos
- Canonical y alternates `es` / `en`
- OpenGraph y Twitter cards
- JSON-LD: `Organization`, `Person`, `Article`, `Dataset`, `Service`, `BreadcrumbList`
- `app/sitemap.ts`
- `app/robots.ts`
- RSS Insights: `/insights/rss.xml`
- OpenGraph dinámico para contenidos, soluciones, servicios, temas y perfiles municipales
- Manifest y favicon propios de NOAM
- CSV documentado por municipalidad: `/dataperu/municipios/[ubigeo]/data.csv`
- `app/not-found.tsx`
- Redirect base en `next.config.mjs`

## Deploy en Vercel

1. Crear repo Git y subir el codigo.
2. Importar el proyecto en [Vercel](https://vercel.com/new).
3. Framework detectado: `Next.js`.
4. Build command: `npm run build`.
5. Output: default de Next.js.
6. Configurar las variables descritas en `.env.example` para producción.
7. Ejecutar `npm run production:check` con esas variables antes de promover el despliegue.
8. Conectar `noam.pe`; el canonical ya está definido en `siteConfig.url`.

Mientras no exista Postgres de producción, Vercel sirve para revisar interfaz, contenido, SEO y responsive. El formulario, admin, portal y analítica persistente permanecen cerrados de forma segura: no confirman operaciones que no pudieron guardarse.

## Deploy en VPS propio

La misma aplicación se empaqueta en `Dockerfile`. `compose.production.yml` levanta Next.js, Postgres privado, backups diarios y Caddy como proxy HTTPS. La guía completa de instalación, migración, seguridad, rollback y paso desde Vercel está en `docs/deployment-runbook.md`.

```bash
cp .env.production.example .env.production
chmod 600 .env.production
NOAM_ENV_FILE=.env.production docker compose -f compose.production.yml config
docker compose -f compose.production.yml up -d postgres
docker compose -f compose.production.yml run --rm tools npm run db:migrate
docker compose -f compose.production.yml run --rm tools npm run db:seed
docker compose -f compose.production.yml up -d app backup caddy
```

El formulario no usa almacenamiento local en producción. Si Postgres falta o no responde, devuelve indisponibilidad temporal y nunca muestra una confirmación falsa.

## Calidad esperada

- Lighthouse objetivo > 90 en Performance / A11y / Best Practices / SEO.
- CI obligatorio: lint, tipos, auditoría de dependencias, build y smoke tests.
- Analítica propia y respetuosa de privacidad para páginas, CTA, descargas y leads, con origen de consultas, intereses y referencias externas agregadas.
- Revisar peso de imagenes antes de agregar assets reales.
- Mantener componentes server-first para minimizar JS cliente.

Ver backlog en `docs/backlog-v2-v3.md`.
Ver roadmap de plataforma en `docs/platform-roadmap.md`.

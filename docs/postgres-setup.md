# NOAM Postgres Setup

La plataforma usa Postgres estandar via `DATABASE_URL`. Puede correr en local, VPS propio o proveedor administrado sin cambiar el codigo.

## Local con Docker

```bash
npm run db:local
```

Docker Desktop debe estar iniciado. Confirma el contenedor con `docker compose ps` antes de ejecutar migraciones.

Crea `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=postgres://noam:noam@localhost:5433/noam
NOAM_DB_SSL=false
NOAM_ADMIN_TOKEN=una_clave_privada_larga
```

Ejecuta migraciones:

```bash
npm run db:migrate
```

Valida el ciclo comercial reversible:

```bash
npm run test:db
```

Corre la web:

```bash
npm run dev
```

Prueba `http://localhost:3000/contact` y revisa el panel en `http://localhost:3000/admin`. Con la web local levantada, `npm run test:contact` comprueba API, persistencia, consentimiento y analítica sin dejar registros.

La migración `004_lead_qualification.sql` agrega contexto comercial y consentimiento a los leads existentes sin eliminar columnas ni registros.

El contenedor usa el puerto local `5433` para no competir con una instalación nativa de Postgres que pueda ocupar `5432`. Puedes cambiarlo con `NOAM_DB_PORT`, manteniendo alineado el puerto de `DATABASE_URL`.

En desarrollo, la aplicación usa `.data/leads.json` si Postgres no está disponible. Este fallback evita bloquear el trabajo local, pero no sustituye una base de producción. Docker Desktop puede cerrarse al terminar; debe estar abierto para usar contacto persistente, admin, portal, migraciones o backups locales.

## Backup local verificado

```bash
npm run db:backup:local
npm run db:restore:check
```

El primer comando genera un dump comprimido en `backups/local/`, excluido de Git. El segundo lo restaura en una base temporal, valida tablas y migraciones, y elimina esa base al terminar. Un archivo no se considera backup válido hasta superar esta restauración.

## Produccion

Usa una URL Postgres con SSL:

```bash
DATABASE_URL=postgres://user:password@host:5432/noam
NOAM_DB_SSL=true
```

Luego ejecuta:

```bash
npm run db:migrate
```

## Backups VPS

Comando base en el VPS:

```bash
pg_dump "$DATABASE_URL" --format=custom --file="backups/noam-$(date +%Y%m%d-%H%M).dump"
```

La política recomendada es:

- Backup diario automatico.
- Retencion de 7 diarios, 4 semanales y 12 mensuales.
- Restauración probada periódicamente.
- Firewall cerrado salvo SSH, HTTP/HTTPS y acceso Postgres estrictamente necesario.

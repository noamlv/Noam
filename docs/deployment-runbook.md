# Despliegue de NOAM

## Decisión de arquitectura

NOAM mantiene una sola aplicación Next.js y una sola base Postgres estándar. Vercel es un entorno temporal de preview; el objetivo de producción soberana es un VPS con Docker, Caddy y Postgres. No se utiliza una API propietaria de base de datos ni se acopla el código a Supabase.

## Etapa 1: preview temporal en Vercel

1. Subir la rama validada a GitHub.
2. Importar el repositorio en Vercel con el preset `Next.js`.
3. Mantener `npm run build` como comando de build y el output predeterminado.
4. Definir `NEXT_PUBLIC_SITE_URL=https://noam.pe`.
5. No agregar secretos ficticios ni habilitar el admin sin Postgres.
6. Probar Home, casos, servicios, sectores, DataPerú, Electoral, búsqueda, OG, sitemap, RSS y responsive desde la URL de preview.

Sin `DATABASE_URL`, el preview sirve para validación pública. Contacto cambia a email y WhatsApp, newsletter muestra el archivo sin captar direcciones y la analítica propia no se carga. Admin, portal y los flujos persistentes permanecen inactivos hasta conectar Postgres; no deben considerarse operativos.

## Etapa 2: preparar el VPS

Base recomendada: Ubuntu LTS actualizado, acceso SSH por llave y Docker Engine con el plugin Compose. El servidor sólo debe publicar `80/tcp`, `443/tcp` y `443/udp`. Postgres usa la red interna de Compose y no publica el puerto `5432` al host.

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl git ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 443/udp
sudo ufw enable
```

La instalación oficial de Docker debe realizarse desde su repositorio para Ubuntu. Después se crea un usuario operativo sin contraseña SSH, se deshabilita el acceso remoto de `root` y se limita SSH a llaves.

## Secretos y entorno

```bash
cp .env.production.example .env.production
chmod 600 .env.production
openssl rand -hex 24 # contraseña Postgres, segura también dentro de una URL
openssl rand -hex 32 # NOAM_AUTH_ENCRYPTION_KEY
```

Actualizar `POSTGRES_PASSWORD` y la contraseña dentro de `DATABASE_URL` con el mismo valor. No versionar `.env.production`, no enviarlo por chat y no incluirlo en backups del código.

Antes de iniciar:

```bash
NOAM_ENV_FILE=.env.production docker compose -f compose.production.yml config
npm run production:check
```

## Primera puesta en marcha

```bash
docker compose -f compose.production.yml up -d postgres
docker compose -f compose.production.yml run --rm tools npm run db:migrate
docker compose -f compose.production.yml run --rm tools npm run db:seed
docker compose -f compose.production.yml run --rm tools npm run admin:create -- --email TU_EMAIL --name "Noam López" --role owner
docker compose -f compose.production.yml up -d app backup caddy
docker compose -f compose.production.yml ps
docker compose -f compose.production.yml logs --tail=200 app caddy postgres
```

Al primer ingreso se cambia la contraseña temporal y se activa MFA antes de cargar información de clientes.

## Cloudflare y dominio

1. Crear registros `A` para `noam.pe` y `www` apuntando a la IP del VPS.
2. Mantener el proxy de Cloudflare activo después de comprobar el origen.
3. Configurar SSL/TLS en `Full (strict)`; nunca `Flexible`.
4. Activar redirección HTTPS, protección de bots y reglas WAF para `/contact`, `/newsletter`, `/admin` y `/api`.
5. No crear ningún registro DNS que exponga Postgres.

Caddy obtiene y renueva el certificado del origen, comprime respuestas y redirige `www.noam.pe` a `noam.pe`. Cloudflare queda delante como DNS, CDN y firewall.

## Backups

El servicio `backup` genera cada 24 horas un dump Postgres en formato custom y conserva catorce días. Esa copia vive en un volumen distinto, pero en el mismo VPS: protege de errores lógicos, no de la pérdida total del servidor.

Para producción se requieren dos capas:

- backup diario local automatizado;
- copia cifrada externa, por ejemplo descarga programada a otra máquina o almacenamiento compatible con S3.

Una vez al mes se restaura el último dump en una base temporal y se registra fecha, responsable, cantidad de tablas y migraciones. Un backup que nunca se restauró no se considera verificado.

## Actualización y rollback

```bash
git pull --ff-only
docker compose -f compose.production.yml build app tools
docker compose -f compose.production.yml run --rm tools npm run db:migrate
docker compose -f compose.production.yml up -d app
docker compose -f compose.production.yml logs --tail=200 app
```

Etiquetar cada imagen con `NOAM_IMAGE_TAG` y conservar al menos la versión anterior. El rollback de aplicación cambia la etiqueta y vuelve a levantar `app`; una migración destructiva exige un procedimiento específico y una restauración probada.

## Paso de Vercel al VPS

1. Levantar el VPS y probarlo usando una entrada temporal en `/etc/hosts` o un subdominio de staging.
2. Ejecutar migraciones, crear el owner, activar MFA y probar contacto, correo, portal y backups.
3. Reducir temporalmente el TTL DNS.
4. Cambiar los registros de Cloudflare a la IP del VPS.
5. Vigilar errores, formularios y logs durante 24 horas.
6. Mantener Vercel como rollback corto y retirarlo cuando el VPS sea estable.

## Accesos que se solicitarán al ejecutar el despliegue

- invitación o sesión guiada en Vercel para importar GitHub;
- acceso de Cloudflare a la zona `noam.pe`, sin compartir la contraseña personal;
- IP del VPS y acceso SSH por llave pública;
- correo que será owner del admin;
- valores reales de correo saliente cuando se active Resend u otro SMTP;
- decisión sobre destino externo de backups.

No se necesitan estas credenciales para seguir desarrollando y validando el repositorio local.

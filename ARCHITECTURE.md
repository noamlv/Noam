# ARCHITECTURE.md

## Estándar de arquitectura para todos los proyectos de Noam

> Este documento define los principios técnicos y organizativos que
> deberán seguir todos los proyectos desarrollados con Codex.

# 1. Objetivos

-   Código limpio y mantenible.
-   Infraestructura reproducible.
-   Automatización por defecto.
-   Seguridad desde el diseño.
-   Escalabilidad.
-   Bajo costo operativo.
-   Independencia del proveedor.

# 2. Stack base

-   Dominio: Porkbun (Cloudflare Registrar como alternativa).
-   DNS/CDN/SSL: Cloudflare.
-   Repositorios: GitHub privados.
-   Desarrollo: Codex + Git + Docker.
-   CI/CD: GitHub Actions.
-   Hosting:
    -   Cloudflare Pages (sitios estáticos).
    -   Hetzner VPS (backend).
-   Base de datos: PostgreSQL.
-   Proxy: Caddy (preferido) o Nginx.
-   Red privada: Tailscale.
-   Monitoreo: Uptime Kuma.
-   Secretos: GitHub Secrets.
-   Backups automáticos.

# 3. Convención de nombres

Repositorios:

-   noamlv-website
-   noamlv-api
-   noamlv-dashboard
-   noamlv-research
-   noamlv-teaching
-   noamlv-quarto
-   noamlv-ai
-   noamlv-utils

Dominios:

-   noamlv.com
-   api.noamlv.com
-   docs.noamlv.com
-   blog.noamlv.com
-   lab.noamlv.com

# 4. Estructura estándar

``` text
project/
├── app/
├── tests/
├── docs/
├── scripts/
├── docker/
├── .github/workflows/
├── requirements.txt
├── pyproject.toml
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── README.md
├── CHANGELOG.md
├── LICENSE
└── ARCHITECTURE.md
```

# 5. Git

Ramas:

-   main
-   develop
-   feature/\*
-   hotfix/\*
-   release/\*

Nunca desarrollar directamente sobre main.

# 6. Calidad

Antes de cada merge:

-   pruebas automáticas
-   lint
-   formateo
-   revisión de dependencias

Python:

-   Ruff
-   Black
-   Pytest
-   mypy (cuando sea útil)

# 7. Docker

Todos los servicios deberán poder ejecutarse mediante Docker.

Mantener imágenes pequeñas y reproducibles.

# 8. Variables de entorno

Nunca subir credenciales.

Siempre incluir:

-   .env.example

Gestionar secretos mediante GitHub Secrets y variables del servidor.

# 9. CI/CD

Cada push a main deberá:

1.  Ejecutar pruebas.
2.  Validar estilo.
3.  Construir la imagen.
4.  Desplegar automáticamente.

# 10. Seguridad

-   MFA en todas las cuentas.
-   HTTPS obligatorio.
-   DNSSEC habilitado.
-   Firewall Cloudflare.
-   Acceso administrativo mediante Tailscale.
-   Actualizaciones periódicas del servidor.

# 11. Base de datos

PostgreSQL.

Buenas prácticas:

-   migraciones versionadas
-   índices
-   backups diarios
-   restauraciones verificadas

# 12. Observabilidad

Implementar:

-   Uptime Kuma
-   logs estructurados
-   métricas cuando sea necesario

# 13. Documentación

Todo proyecto debe contener:

-   README.md
-   CHANGELOG.md
-   ARCHITECTURE.md
-   documentación técnica en docs/

# 14. Checklist para un proyecto nuevo

-   Crear repositorio privado.
-   Inicializar Git.
-   Configurar Docker.
-   Crear .env.example.
-   Configurar GitHub Actions.
-   Configurar Cloudflare.
-   Configurar dominio/subdominio.
-   Desplegar entorno de pruebas.
-   Configurar monitoreo.
-   Configurar backups.
-   Documentar.

# 15. Filosofía

Cada proyecto debe ser:

-   reproducible;
-   portable;
-   seguro;
-   automatizado;
-   documentado;
-   fácil de mantener.

La prioridad es construir un ecosistema que pueda crecer durante años
sin depender de plataformas propietarias ni requerir rediseños
frecuentes.

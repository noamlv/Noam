# NOAM.PE: preparación para lanzamiento

Última revisión: 18 de julio de 2026.

Este documento separa lo verificable en el repositorio de aquello que depende de infraestructura, credenciales o decisiones legales. Un build correcto no equivale por sí solo a una operación segura con información de clientes.

## Resuelto en código

- Aplicación Next.js dinámica, server-first, con TypeScript, Tailwind y contenido MDX.
- Navegación, diseño responsive, páginas comerciales, productos, datos y biblioteca editorial.
- Metadata, canonical, Open Graph, Twitter cards, JSON-LD, sitemap, robots, RSS, manifest y 404.
- Aviso de privacidad, términos de uso y estándar de transparencia editorial y de datos.
- Formulario con consentimiento, validación y rate limiting por proceso.
- Analítica propia sin cookies para vistas, intenciones, descargas y consultas.
- Panel agregado con páginas, intereses, orígenes de consulta y referencias externas.
- Cabeceras CSP, HSTS en producción, no-sniff, restricción de framing y política de referencia.
- Pruebas de lint, tipos, datos, productos, analítica, build y humo de rutas críticas.
- Verificador automatizado de ocho condiciones de entorno mediante `npm run production:check`.
- Persistencia de consultas fail-closed: producción no escribe en disco efímero ni confirma leads que no fueron guardados.
- Notificaciones desacopladas de la persistencia: un fallo de correo no genera reenvíos ni leads duplicados.
- Postgres local aislado en Docker, quince migraciones idempotentes y flujos comercial, de productos, recursos, portal, identidad, audiencia y campañas editoriales reversibles verificados.
- Biblioteca pública de recursos conectada a productos, búsqueda, sitemap y analítica propia.
- Brief NOAM con consentimiento explícito, estados pendiente/activo/baja, tokens hasheados, confirmación de un solo uso y respuesta pública anti-enumeración.
- Archivo público del Brief con primera edición verificable, límites visibles, RSS, schema Article, OG dinámico, sitemap y búsqueda interna.
- Campañas editoriales con borrador, segmentos, previsualización, programación, resultados por destinatario, reintento selectivo, baja individual hasheada y auditoría por operador.
- Conciliación de pagos por saldo neto: pagos parciales no cierran facturas y los reembolsos pueden reabrirlas.
- Backup local comprimido y restauración automática contra una base temporal.
- Portada internacional en inglés con metadata, alternantes y contenido propio.
- Línea base visual y de rendimiento validada sobre el build de producción: portada `97/100/100/100` y edición del Brief `98/100/100/100` en rendimiento, accesibilidad, buenas prácticas y SEO.

## Requiere configuración externa

- Importar el repositorio en Vercel y definir variables de entorno de producción.
- Conectar `noam.pe` mediante Cloudflare DNS y verificar HTTPS y redirección canónica.
- Proveer Postgres de producción, ejecutar migraciones y restringir acceso de red y privilegios.
- Configurar Resend para notificaciones y confirmar dominio remitente.
- Probar la confirmación y la baja del Brief NOAM con una dirección real antes de abrir el formulario en producción.
- Configurar el cron de `npm run campaigns:dispatch`, su identidad responsable y una edición controlada antes de programar envíos públicos.
- Activar protección distribuida del formulario, por ejemplo Cloudflare Turnstile y reglas WAF.
- Verificar propiedad en Google Search Console y Bing Webmaster Tools y enviar el sitemap.
- Configurar monitoreo, alertas, backups cifrados y una restauración de prueba.

## Antes de operar información de clientes

- Crear la primera identidad `owner` real, reemplazar su contraseña temporal y activar MFA antes de abrir el panel en producción.
- Mantener `NOAM_ALLOW_LEGACY_ADMIN=false` y custodiar `NOAM_AUTH_ENCRYPTION_KEY` fuera del repositorio y de los backups de aplicación.
- Identidades, sesiones hasheadas, roles, MFA TOTP, recuperación, suspensión y bitácora ya están implementados; falta revisar el procedimiento humano de altas, bajas y recuperación.
- Los tokens de portal se almacenan como hash, vencen en un máximo de 90 días, registran último uso y pueden revocarse. Las identidades individuales y la auditoría por operador ya están implementadas; falta formalizar y ensayar el procedimiento humano de rotación y respuesta a incidentes.
- Definir responsable del banco de datos, razón social o persona contractual, RUC y canales formales.
- Revisar privacidad y términos con asesoría legal sobre la operación efectiva y sus proveedores.
- Documentar incidentes, retención, eliminación, confidencialidad y acceso a entregables.
- Probar migraciones, backups, recuperación y controles con Postgres de producción.

## Decisión de salida

El sitio público institucional puede lanzarse para publicar información abierta y captar consultas cuando Vercel, dominio, email, Postgres, protección del formulario y monitoreo estén configurados y probados. El admin y el portal no deben utilizarse con datos sensibles o entregables confidenciales hasta crear la identidad real con MFA, probar la recuperación y cerrar monitoreo, incidentes y backups de producción.

## Evidencia de validación

Ejecutar antes de cada despliegue:

```bash
npm run check
npm run test:db
npm run test:contact
npm run test:newsletter:db
npm run test:campaigns:db
npm run test:admin:db
npm run db:backup:local
npm run db:restore:check
npm run test:smoke:ci
npm audit --omit=dev --audit-level=moderate
npm run production:check
```

Registrar además la fecha y resultado de la última restauración de backup, revisión de accesos, revisión de dependencias y prueba del formulario en producción.

## Línea base local: 18 de julio de 2026

- `npm run check`: correcto, incluidos lint, TypeScript, 17 suites funcionales y build de 213 rutas.
- `npm run db:restore:check`: correcto sobre `backups/local/noam-20260718T123908Z.dump`; 28 tablas y 15 migraciones recuperadas.
- `npm run test:smoke:ci`: 86 controles HTTP correctos.
- `npm audit --omit=dev --audit-level=moderate`: 0 vulnerabilidades conocidas.
- Lighthouse, portada: rendimiento 97, accesibilidad 100, buenas prácticas 100 y SEO 100; FCP 1,1 s, LCP 2,5 s y TBT 90 ms.
- Lighthouse, primera edición del Brief: rendimiento 98, accesibilidad 100, buenas prácticas 100 y SEO 100; sin fallos binarios.

Las cifras de Lighthouse son una línea base reproducible en la máquina local y pueden variar según red, hardware y plataforma de despliegue. Deben repetirse contra `https://noam.pe` después de configurar infraestructura y datos reales.

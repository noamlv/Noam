# Plan de medición NOAM

Fecha: 2026-07-17

## Objetivo

Medir si el contenido público ayuda a una persona pertinente a comprender una decisión, evaluar la capacidad de NOAM y solicitar una conversación.

## Eventos

- `page_view`: ruta visitada, sin query string.
- `cta_click`: llamada a la acción y página de origen.
- `resource_download`: recurso descargado y página de origen.
- `lead_submit`: solución declarada y página desde la que comenzó la consulta.
- `newsletter_signup`: solicitud editorial y preferencias seleccionadas. Cuenta intención, no una dirección activa; la activación requiere confirmación posterior.

## Privacidad

- No se crean identificadores de usuario o sesión.
- No se instalan cookies.
- No se conservan IP, user agent ni huella del dispositivo.
- El referrer se reduce al dominio.
- Se respetan Do Not Track y Global Privacy Control.
- Los datos sirven para agregados operativos, no para publicidad conductual.
- La analítica registra la solicitud editorial por temas, pero no copia el email ni el nombre del suscriptor.

## Lectura inicial

Durante los primeros 30 días se construirá una línea base. Después se revisarán:

1. Páginas que atraen visitas pertinentes.
2. Contenidos que producen descargas o clics de intención.
3. Soluciones que terminan en consultas.
4. Puntos con tráfico pero sin siguiente acción.
5. Solicitudes editoriales, confirmaciones y bajas como métricas distintas; nunca se presentará una solicitud pendiente como suscriptor activo.

No se fijan metas porcentuales antes de contar con esa línea base.

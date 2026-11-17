# Auditoría de uso de Vercel y reducción de tráfico de origen

**Fecha:** 17 de noviembre de 2026. **Proyecto:** `noam-pe` (`noam.pe`). **Estado:** cambios locales compilados y verificados; todavía no desplegados.

## Qué muestran las métricas

En la cuenta de Vercel, para los últimos 30 días observados el 17/11/2026:

| Métrica | Valor visto | Lectura |
|---|---:|---|
| Fast Origin Transfer | 10,16 GB / 10 GB Hobby | Límite superado; la cuenta aparece pausada |
| Tráfico de origen saliente | 9,99 GB (98,3 %) | El peso está en respuestas desde cómputo/caché hacia el CDN |
| `noam-pe` | 9,7 GB (95,5 %) | Responsable principal de la transferencia de origen |
| `villanes-dental-group` | 449,21 MB (4,4 %) | Contribución secundaria |
| Aplicativos CRECE visibles | Megabytes o menos cada uno | No explican el límite |
| Fast Data Transfer | 7,01 GB / 100 GB | Transferencia del CDN a visitantes, distinta de Fast Origin |
| ISR Writes | Aproximadamente 129.000 / 200.000 | Señal de mucha regeneración de páginas o recursos |

**Distinción clave:** Fast Origin Transfer mide datos entre el CDN y funciones, middleware o caché de datos; Fast Data Transfer mide datos entre el CDN y visitantes. El exceso actual es de **transferencia de origen**, no de CPU. [Definiciones de Vercel](https://vercel.com/docs/manage-cdn-usage).

El panel Hobby permitió atribuir el volumen por proyecto, pero el historial de rutas individuales no estaba disponible en Observability después de la pausa. Por eso la ruta exacta que consumió más bytes es una **inferencia basada en código y tamaños**, no una atribución medida por Vercel.

## Hallazgos en el código

1. La portada leía una cookie en el servidor para cambiar la foto. Eso convertía `/` en una respuesta dinámica por visita.
2. `/dataperu/educacion` y `/dataperu/agua-saneamiento` leían `q` en el servidor aunque el filtro se aplica en componentes del navegador. Después de compilar, sus HTML miden aproximadamente **1,11 MB** y **630 KB** respectivamente; antes, cada solicitud podía volver a generar y transferir esas respuestas desde origen.
3. Los perfiles municipales y varias páginas de cortes 2025/2026 tenían `revalidate = 86400`. Aunque las fuentes ya están procesadas en el repositorio, una visita tras cada vencimiento podía regenerar la página. Hay **1.891 perfiles** en el índice y una ficha probada ocupa unos **179 KB**. Si todos se vuelven a visitar diariamente, solo su HTML representa aproximadamente **10 GB por 30 días**, antes de contar RSC y otras rutas. Este cálculo muestra que el patrón es compatible con la métrica, pero no demuestra que todos esos accesos ocurrieron.
4. Los datos principales ya se preparan durante desarrollo y se versionan en `data/processed`. El coste evitable está en **cómo se sirven**, no en volver a ejecutar los cálculos estadísticos originales en cada visita.
5. Hay un PDF completo de CV de **71 MB** en `public/docs/noam-cv.pdf`. No aparece enlazado desde las páginas públicas actuales, que usan la versión de 22 KB. Ese archivo afectaría **Fast Data Transfer** si se descarga repetidamente; no explica Fast Origin Transfer. Antes de retirarlo hay que comprobar si existe un enlace externo que dependa de esa URL.

## Cambios realizados localmente

- La portada ahora se puede generar como archivo estático. La rotación de la imagen se conserva en el navegador mediante `localStorage`.
- Los filtros `q` de educación y agua se aplican en el navegador; ambas páginas se precompilan como estáticas.
- Los cortes versionados de educación, agua, inversiones, mapa, Planómetro, Barómetro y temas dejan de regenerarse cada 24 horas. Se actualizan al desplegar una nueva versión con datos nuevos.
- Los perfiles municipales y los briefs ERM se generan como páginas estáticas al primer acceso si no fueron precompilados. Después se sirven de caché durante la vida del despliegue.
- Los CSV de datos cerrados se configuran como recursos estáticos.
- Next.js se actualiza de **16.4.2 a 16.4.6** porque la versión fijada inicialmente falló la comprobación de seguridad del build y `npm audit` indicó 16.4.6 como corrección.
- Permanecen dinámicos los formularios, la búsqueda con consulta libre, el área administrativa y los recursos que requieren datos actuales o por usuario.

## Verificación

- En una instalación limpia con la versión fijada de **Next.js 16.4.6**: `npm run typecheck`, `npm run lint` y `npm run build:verified`, correctos. `npm audit --omit=dev` informó **0 vulnerabilidades** después de actualizar Next.
- La base Postgres local no estaba disponible durante el primer build; el sitio tiene un catálogo versionado de respaldo.
- El manifiesto de Next marca `/`, `/dataperu/educacion`, `/dataperu/agua-saneamiento`, `/dataperu/inversiones` y los CSV comprobados como `static`, con `revalidate=false`.
- En servidor local de producción, `/dataperu/municipios/020101` (no precompilado) respondió primero `x-nextjs-cache: MISS` y luego `HIT`; el encabezado de caché indicó `s-maxage=31536000`.
- La carpeta `node_modules` sincronizada en Google Drive está desactualizada y tiene enlaces rotos. La verificación limpia se hizo en `/tmp/noam-vercel-check` con `npm ci`, sin modificar las dependencias instaladas de la carpeta de Drive.

## Qué hacer para publicar y medir

1. Revisar el diff y desplegar esta versión antes de volver a medir. **El cambio local todavía no reduce el consumo del despliegue vigente.**
2. Como la cuenta Hobby ya está pausada, la corrección del código por sí sola no reactiva los sitios. Vercel indica que una actualización a Pro levanta la pausa; si se permanece en Hobby, normalmente hay que esperar al reinicio del periodo de 30 días. [Hobby](https://vercel.com/docs/plans/hobby), [prueba y reactivación](https://vercel.com/docs/plans/pro-plan/trials).
3. Para un sitio comercial de NOAM, Pro es el plan pertinente según la [página de precios de Vercel](https://vercel.com/pricing): **USD 20 al mes** por el primer asiento que despliega, con crédito mensual de infraestructura de USD 20; impuestos y consumos adicionales dependen de la cuenta y del uso. Confirmar el cargo en pantalla antes de aceptarlo.
4. Tras reactivar y desplegar, comparar 48–72 horas de Fast Origin Transfer e ISR Writes con el patrón anterior. Mirar por proyecto y, si el plan lo permite, por ruta; revisar especialmente `/`, `/dataperu/educacion`, `/dataperu/agua-saneamiento` y `/dataperu/municipios/[ubigeo]`.
5. Configurar alertas y un presupuesto de gasto adicional en Vercel Pro para evitar cargos imprevistos. La configuración de límites y pausa es una decisión operativa separada. [Spend Management](https://vercel.com/docs/spend-management).

## Siguiente mejora si crece el tráfico

Las páginas de educación y agua ahora evitan el origen, pero siguen entregando tablas completas de 1.892 distritos al navegador. Si Fast Data Transfer empieza a crecer, generar **JSON estático por departamento** durante el build y cargar solo el departamento consultado. Esto reduciría el HTML inicial y mantendría los datos fuera de funciones. Otra posibilidad es precompilar todas las fichas municipales, pero aumentaría de forma importante el tiempo y tamaño del despliegue; conviene decidirlo con mediciones después de este cambio.

**No se ha realizado ningún pago ni desplegado la versión nueva.**

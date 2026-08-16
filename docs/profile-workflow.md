# Profile & CV Workflow

## Fuentes

- Bio publica del sitio: `lib/profile.ts`
- CV publico editable: `content/profile/noam-cv-public.md`
- CV publico generado: `public/docs/noam-cv-public.pdf`
- CV documentado histórico: `public/docs/noam-cv.pdf` (no se enlaza desde páginas públicas)
- CV fuente extendido local: `cv.md`

## Actualizar CV publico

1. Editar `content/profile/noam-cv-public.md`.
2. Ejecutar:

```bash
npm run cv:build
```

3. Revisar:

- `/about`
- `/cv`
- `/docs/noam-cv-public.pdf`

El generador se detiene si detecta identificadores o datos personales reservados. El PDF histórico no se modifica ni se publica como parte del recorrido normal del sitio.

## Foto

Colocar la foto publica en:

```text
public/images/noam-profile.jpg
```

La página `/about` la detecta durante el build. Si no existe, muestra un monograma sobrio sin inventar un retrato.

## Como pasar nuevas actualizaciones

La forma mas limpia es enviar cambios en uno de estos formatos:

- Texto breve para bio o titulares.
- Lista de nuevas experiencias/publicaciones.
- Archivo Word/PDF fuente.
- Imagen de perfil.
- Enlaces sociales nuevos.

Regla de seguridad: datos como DNI, pasaporte, dirección personal y códigos internos no deben entrar en el CV público. El contacto público institucional es `hola@noam.pe`.

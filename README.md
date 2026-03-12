# NOAM Web (V1)

Plataforma institucional de NOAM construida con Next.js App Router + TypeScript + Tailwind + MDX.

## Stack

- Next.js (App Router)
- React + TypeScript
- TailwindCSS
- MDX (filesystem + `next-mdx-remote`)
- Deploy target: Vercel

## Ejecutar en local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Comandos

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

## Estructura

- `app/`: rutas y paginas
- `components/ui/`: design system base
- `components/mdx/`: bloques MDX reutilizables
- `content/`: colecciones MDX (`insights`, `indicators`, `toolkits`, `services`, `cases`)
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
- `app/not-found.tsx`
- Redirect base en `next.config.mjs`

## Deploy en Vercel

1. Crear repo Git y subir el codigo.
2. Importar el proyecto en [Vercel](https://vercel.com/new).
3. Framework detectado: `Next.js`.
4. Build command: `npm run build`.
5. Output: default de Next.js.
6. Definir dominio final (`www.noam.global`) y actualizar `siteConfig.url`.

## Calidad esperada

- Lighthouse objetivo > 90 en Performance / A11y / Best Practices / SEO.
- Revisar peso de imagenes antes de agregar assets reales.
- Mantener componentes server-first para minimizar JS cliente.

Ver backlog en `docs/backlog-v2-v3.md`.

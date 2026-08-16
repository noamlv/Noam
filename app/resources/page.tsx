import type { Metadata } from "next";
import NextLink from "next/link";
import { PlatformResourceList } from "@/components/content/platform-resource-list";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { getManagedPlatformCatalog } from "@/lib/platform-products";
import { getManagedPlatformResources } from "@/lib/platform-resources";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import type { PlatformResourceKind } from "@/types/platform";

export const metadata: Metadata = buildMetadata({
  title: "Recursos y datos abiertos",
  description: "Datasets, metodologías, guías, plantillas y exploradores publicados por NOAM con fuente, periodo y producto asociado.",
  path: "/resources"
});

type PageProps = { searchParams: Promise<{ type?: string; product?: string }> };

const kinds: Array<{ value: PlatformResourceKind | "all"; label: string }> = [
  { value: "all", label: "Todos" }, { value: "dataset", label: "Datasets" },
  { value: "methodology", label: "Metodologías" }, { value: "toolkit", label: "Guías" },
  { value: "template", label: "Plantillas" }, { value: "explorer", label: "Exploradores" },
  { value: "report", label: "Informes" }
];

export default async function ResourcesPage({ searchParams }: PageProps) {
  const [query, products, allResources] = await Promise.all([searchParams, getManagedPlatformCatalog(), getManagedPlatformResources()]);
  const kind = kinds.some((item) => item.value === query.type) ? query.type as PlatformResourceKind | "all" : "all";
  const product = products.some((item) => item.slug === query.product) ? query.product : "all";
  const resources = allResources.filter((item) => kind === "all" || item.kind === kind).filter((item) => product === "all" || item.productSlug === product);

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Recursos y datos abiertos de NOAM",
        url: `${siteConfig.url}/resources`,
        hasPart: resources.map((resource) => ({
          "@type": resource.kind === "dataset" ? "Dataset" : "CreativeWork",
          name: resource.title,
          description: resource.description,
          url: resource.url.startsWith("https://") ? resource.url : `${siteConfig.url}${resource.url}`,
          ...(resource.period ? { temporalCoverage: resource.period } : {}),
          ...(resource.format ? { encodingFormat: resource.format } : {})
        }))
      }} />
      <Section className="pb-14 pt-14 md:pb-20 md:pt-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1.25fr_0.75fr] md:items-end">
            <div><Eyebrow className="text-rust">Bienes públicos digitales</Eyebrow><Heading as="h1" size="display" className="max-w-[13ch]">Datos, métodos y herramientas para trabajar mejor.</Heading></div>
            <p className="max-w-md text-base leading-8 text-ink/68">Cada recurso declara formato, periodo y procedencia. Publicamos sólo materiales que pueden revisarse, reutilizarse o llevar a una conversación concreta.</p>
          </div>
        </Container>
      </Section>

      <section className="border-y border-border bg-panel/35 py-6">
        <Container>
          <form action="/resources" className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Tipo
              <select name="type" defaultValue={kind} className="mt-2 min-h-11 w-full rounded-sm border border-border bg-canvas px-3 text-sm text-ink">
                {kinds.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
            </label>
            <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Producto
              <select name="product" defaultValue={product} className="mt-2 min-h-11 w-full rounded-sm border border-border bg-canvas px-3 text-sm text-ink">
                <option value="all">Todos los productos</option>
                {products.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
            </label>
            <Button type="submit">Aplicar filtros</Button>
          </form>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><Eyebrow>Biblioteca</Eyebrow><Heading size="lg">{resources.length} {resources.length === 1 ? "recurso" : "recursos"}</Heading></div>{kind !== "all" || product !== "all" ? <NextLink href="/resources" className="text-sm font-medium text-rust">Limpiar filtros</NextLink> : null}</div>
          {resources.length ? <PlatformResourceList resources={resources} products={products} /> : <div className="rounded-md border border-dashed border-border p-10"><Heading size="md">No hay recursos con estos filtros.</Heading><p className="mt-3 text-sm text-muted">Prueba otra combinación o explora la biblioteca completa.</p></div>}
        </Container>
      </Section>

      <Section className="bg-[#15211d] text-white">
        <Container><div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow className="text-white/55">Aplicación institucional</Eyebrow><Heading size="lg" className="max-w-3xl text-white">Un recurso abierto puede ser el punto de partida para un sistema hecho a la medida.</Heading></div><Button href="/contact?from=/resources" analyticsEvent="cta_click" analyticsTarget="resources:contact" variant="secondary" className="rounded-full border-white bg-white text-ink">Plantear una necesidad</Button></div></Container>
      </Section>
    </>
  );
}

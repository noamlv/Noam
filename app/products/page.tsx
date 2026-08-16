import { ArrowRight } from "lucide-react";
import NextLink from "next/link";
import { Badge, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { getManagedPlatformCatalog } from "@/lib/platform-products";
import { getManagedPlatformResources } from "@/lib/platform-resources";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Herramientas y prototipos",
  description: "Plataformas, observatorios, visores y productos experimentales desarrollados por NOAM.",
  path: "/products"
});

const statusLabels = { live: "Disponible", prototype: "Prototipo", planned: "En desarrollo" } as const;
const categoryLabels = { product: "Producto", dashboard: "Dashboard", viewer: "Visor", demo: "Laboratorio", service: "Servicio" } as const;

export default async function ProductsPage() {
  const [products, resources] = await Promise.all([getManagedPlatformCatalog(), getManagedPlatformResources()]);
  const resourceCounts = new Map<string, number>();
  for (const resource of resources) if (resource.productSlug) resourceCounts.set(resource.productSlug, (resourceCounts.get(resource.productSlug) ?? 0) + 1);
  const territorialSlugs = ["dataperu", "observatorio-territorial", "observatorio-inversiones", "mapa-gestion-territorial", "visor-riesgo-georreferenciado"];
  const aiSlugs = ["ai-governance-lab"];
  const electoralSlugs = ["planometro-electoral", "barometro-electoral-enero-2026"];
  const assigned = new Set([...territorialSlugs, ...aiSlugs, ...electoralSlugs]);
  const territorial = products.filter((product) => territorialSlugs.includes(product.slug));
  const artificialIntelligence = products.filter((product) => aiSlugs.includes(product.slug));
  const electoral = products.filter((product) => electoralSlugs.includes(product.slug));
  const additional = products.filter((product) => !assigned.has(product.slug));

  return (
    <>
      <Section className="pb-14 pt-14 md:pb-20 md:pt-20">
        <Container>
          <Eyebrow className="text-rust">Laboratorio de producto</Eyebrow>
          <Heading as="h1" size="display" className="max-w-[14ch]">Herramientas para ver, comparar y decidir.</Heading>
          <p className="mt-7 max-w-2xl text-base leading-8 text-ink/68">Productos públicos y prototipos que demuestran capacidades de datos, territorio e inteligencia artificial. Su estado se identifica de forma explícita.</p>
        </Container>
      </Section>

      <section className="border-y border-border">
        <Container>
          {[
            { title: "DataPerú y gestión territorial", description: "Infraestructura, observatorios y visores para decisiones públicas y organizacionales.", items: territorial },
            { title: "IA responsable", description: "Herramientas para evaluar casos, gobernar riesgos y medir pilotos antes de escalar inteligencia artificial.", items: artificialIntelligence },
            { title: "Electoral", description: "Herramientas para comprender planes, opinión pública, territorio y transición de gobierno.", items: electoral },
            { title: "Otros productos", description: "Nuevas fichas publicadas desde el catálogo operativo de NOAM.", items: additional }
          ].filter((group) => group.items.length).map((group, groupIndex) => (
            <div key={group.title} className={`py-14 md:py-20 ${groupIndex ? "border-t border-border" : ""}`}>
              <div className="grid gap-4 md:grid-cols-[0.55fr_1fr]"><Heading size="lg">{group.title}</Heading><p className="text-sm leading-7 text-ink/65">{group.description}</p></div>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {group.items.map((product) => (
                  <NextLink key={product.slug} href={product.href} className="group rounded-md border border-border bg-panel p-6 transition-all hover:-translate-y-0.5 hover:border-border-strong">
                    <div className="flex flex-wrap gap-2"><Badge>{categoryLabels[product.category]}</Badge><Badge>{statusLabels[product.status]}</Badge></div>
                    <h2 className="mt-8 text-2xl font-medium tracking-[-0.03em] text-ink">{product.name}</h2>
                    <p className="mt-3 text-sm leading-6 text-ink/65">{product.description}</p>
                    {(resourceCounts.get(product.slug) ?? 0) > 0 ? <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-rust">{resourceCounts.get(product.slug)} recursos abiertos</p> : null}
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">Explorar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </NextLink>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}

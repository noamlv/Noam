import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge, Button, Card, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { PlatformResourceList } from "@/components/content/platform-resource-list";
import { buildMetadata } from "@/lib/seo";
import { platformCatalog } from "@/lib/platform-catalog";
import { getManagedPlatformProduct } from "@/lib/platform-products";
import { getManagedPlatformResources } from "@/lib/platform-resources";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return platformCatalog
    .filter((product) => product.href.startsWith("/products/") && product.slug !== "ai-governance-lab")
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getManagedPlatformProduct(slug);

  if (!product) {
    return {};
  }

  return buildMetadata({
    title: product.name,
    description: product.description,
    path: product.href
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, resources] = await Promise.all([getManagedPlatformProduct(slug), getManagedPlatformResources({ productSlug: slug })]);

  if (!product) {
    notFound();
  }

  return (
    <Section className="pt-16 md:pt-20">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <Eyebrow>{product.category}</Eyebrow>
            <Heading as="h1" size="xl" className="max-w-3xl">
              {product.name}
            </Heading>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/75">{product.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={`/contact?interest=${product.slug}`}>Solicitar demo</Button>
              {product.demoHref ? (
                <Button href={product.demoHref} variant="secondary">
                  Ver demo
                </Button>
              ) : null}
              <Button href="/products" variant="secondary">
                Ver catalogo
              </Button>
            </div>
          </div>

          <Card>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge>{product.status}</Badge>
              <Badge>{product.category}</Badge>
            </div>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Outcome</p>
            <p className="mt-3 text-lg font-medium leading-snug text-ink">{product.outcome}</p>
            {product.timeline ? (
              <>
                <p className="mt-6 text-xs uppercase tracking-[0.12em] text-muted">Timeline</p>
                <p className="mt-2 text-sm font-medium text-ink">{product.timeline}</p>
              </>
            ) : null}
          </Card>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            { title: "Audiencia", items: product.audience },
            { title: "Capacidades", items: product.features },
            { title: "Entregables", items: product.deliverables }
          ].map((group, index) => (
            <Card key={group.title}>
              <p className="text-xs uppercase tracking-[0.12em] text-muted">0{index + 1}</p>
              <h2 className="mt-4 text-xl font-medium text-ink">{group.title}</h2>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-ink/75">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {resources.length ? <div className="mt-16"><Eyebrow>Recursos abiertos</Eyebrow><Heading size="lg" className="mb-8 max-w-2xl">Revisa los datos y métodos detrás del producto.</Heading><PlatformResourceList resources={resources} products={[product]} /></div> : null}

        <div className="mt-16 grid gap-8 rounded-md border border-border bg-panel p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8">
          <div>
            <Eyebrow>Uso comercial</Eyebrow>
            <Heading size="lg" className="max-w-xl">
              De demo a sistema operativo para decisiones.
            </Heading>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Landing publica para explicar valor y capturar demanda.",
              "Demo navegable para reuniones comerciales y validacion.",
              "Recursos privados asignables a clientes en el portal.",
              "Pipeline de datos para convertir prototipos en producto vivo."
            ].map((item) => (
              <div key={item} className="rounded-sm border border-border bg-canvas p-4">
                <p className="text-sm leading-relaxed text-ink/75">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

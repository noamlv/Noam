import type { Metadata } from "next";
import { Check } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { InstitutionalCaseCard } from "@/components/brand/institutional-case-card";
import { RenderMdx } from "@/components/mdx/render-mdx";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge, Button, Container, Eyebrow, Heading, Prose, Section } from "@/components/ui";
import { serviceLines } from "@/lib/brand-content";
import { getContentBySlug } from "@/lib/content";
import { getInstitutionalCasesForService } from "@/lib/institutional-cases";
import { breadcrumbJsonLd, buildMetadata, ogImagePath, serviceJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return serviceLines.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceLines.find((item) => item.slug === slug);
  if (!service) return {};

  return buildMetadata({ title: service.title, description: service.description, path: `/services/${slug}`, image: ogImagePath("services", slug) });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = serviceLines.find((item) => item.slug === slug);
  const content = await getContentBySlug("services", slug).catch(() => null);
  if (!service || !content) notFound();
  const relatedCases = await getInstitutionalCasesForService(slug);

  const url = new URL(`/services/${slug}`, siteConfig.url).toString();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/services" }, { name: service.title, path: `/services/${slug}` }])} />
      <JsonLd data={serviceJsonLd({ name: service.title, description: service.description, url })} />

      <Section className="pb-14 pt-14 md:pb-20 md:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.38fr] lg:items-end">
            <div>
              <Eyebrow className="text-rust">Servicio {service.number}</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[15ch]">{service.title}</Heading>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-ink/68">{service.promise}</p>
            </div>
            <div className="border-l border-border pl-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">Punto de partida</p>
              <p className="mt-3 text-sm leading-6 text-ink/68">{service.timeline}. El alcance final depende de fuentes, cobertura territorial y trabajo de campo.</p>
              <Button href={`/contact?interest=${slug}`} className="mt-6 rounded-full">Solicitar alcance</Button>
            </div>
          </div>
          <figure className="group relative mt-12 overflow-hidden rounded-[1.25rem] border border-ink/10 shadow-visual md:mt-16">
            <Image src={service.image} alt={service.imageAlt} width={1672} height={941} sizes="(max-width: 768px) 100vw, 1160px" className="aspect-[1.2/1] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.018] sm:aspect-[2/1] lg:aspect-[2.45/1]" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/82 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-[10px] leading-5 text-white/62 md:p-7">{service.imageCaption}</figcaption>
          </figure>
        </Container>
      </Section>

      <section className="border-y border-border bg-panel/45 py-10">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">Resultados buscados</p>
              <ul className="mt-5 grid gap-3">
                {service.outcomes.map((item) => <li key={item} className="flex gap-3 text-sm text-ink/72"><Check className="h-4 w-4 shrink-0 text-rust" />{item}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">Entregables configurables</p>
              <div className="mt-5 flex flex-wrap gap-2">{service.deliverables.map((item) => <Badge key={item}>{item}</Badge>)}</div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container size="narrow">
          <Prose className="prose-headings:font-sans">
            <RenderMdx source={content.body} />
          </Prose>
        </Container>
      </Section>

      {relatedCases.length ? (
        <Section className="border-y border-border bg-panel/45">
          <Container>
            <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
              <div><Eyebrow>Experiencia relacionada</Eyebrow><Heading size="xl">Este enfoque ya se aplicó en encargos institucionales.</Heading></div>
              <p className="max-w-2xl text-sm leading-7 text-ink/68 md:justify-self-end">Casos públicos de alcance limitado: explican la arquitectura del trabajo sin divulgar entregables ni información reservada del cliente.</p>
            </div>
            <div className={`mt-12 grid gap-4 ${relatedCases.length > 1 ? "lg:grid-cols-2" : "lg:max-w-[760px]"}`}>
              {relatedCases.map((item, index) => <InstitutionalCaseCard key={item.slug} item={item} index={index} />)}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}

import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Database, ExternalLink } from "lucide-react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { SectorExplorer } from "@/components/dataperu/sector-explorer";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import {
  buildSectorSearchItems,
  getNationalSectorMetrics,
  getSectorTopic,
  sectorSlugs,
  sectorSource
} from "@/lib/dataperu-sectors";
import { breadcrumbJsonLd, buildMetadata, datasetJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

interface SectorPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86400;

export function generateStaticParams() {
  return sectorSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getSectorTopic(slug);
  if (!topic) return {};

  return buildMetadata({
    title: `${topic.title} municipal`,
    description: `${topic.description} Explora información declarada por 1,891 municipalidades del Perú.`,
    path: `/dataperu/temas/${topic.slug}`
  });
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const topic = getSectorTopic(slug);
  if (!topic) notFound();

  const nationalMetrics = getNationalSectorMetrics(topic.slug);
  const searchItems = buildSectorSearchItems(topic.slug);
  const pagePath = `/dataperu/temas/${topic.slug}`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "DataPerú", path: "/dataperu" },
        { name: "Temas de gestión", path: "/dataperu/temas" },
        { name: topic.title, path: pagePath }
      ])} />
      <JsonLd data={datasetJsonLd({
        name: `${topic.title} municipal — DataPerú 2025`,
        description: topic.description,
        url: `${siteConfig.url}${pagePath}`,
        datePublished: sectorSource.releaseDate
      })} />

      <section className="relative overflow-hidden bg-[#15211d] pb-20 pt-10 text-white md:pb-28 md:pt-14">
        <span className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: topic.accent }} />
        <Container>
          <NextLink href="/dataperu/temas" className="inline-flex items-center gap-2 text-xs text-white/55 hover:text-white"><ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Todos los temas</NextLink>
          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.52fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="text-[#d9a48f]">{topic.kicker}</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[13ch] text-white">{topic.title}</Heading>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/66">{topic.description}</p>
            </div>
            <div className="border-l border-white/15 pl-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#d9a48f]">Pregunta de decisión</p>
              <p className="mt-4 text-xl font-medium leading-8 tracking-[-0.025em] text-white/88">{topic.question}</p>
            </div>
          </div>
        </Container>
      </section>

      <Section className="pb-14 md:pb-16">
        <Container>
          <div className="grid overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {nationalMetrics.map((metric) => (
              <article key={metric.label} className="bg-panel p-6 md:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">{metric.label}</p>
                <p className="mt-5 text-3xl font-medium tracking-[-0.045em] text-ink">{metric.value}</p>
                <p className="mt-3 text-xs leading-5 text-muted">{metric.note}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-[11px] leading-5 text-muted">Porcentajes calculados sobre respuestas informadas en RENAMU 2025. Los denominadores varían según la pregunta y no se imputan valores faltantes.</p>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Para decidir mejor</Eyebrow><Heading size="xl">Tres preguntas antes de intervenir.</Heading></div>
            <ol className="divide-y divide-border border-y border-border">
              {topic.decisionQuestions.map((question, index) => (
                <li key={question} className="grid gap-4 py-6 sm:grid-cols-[44px_1fr] sm:items-start">
                  <span className="font-mono text-xs text-rust">0{index + 1}</span>
                  <p className="max-w-2xl text-lg font-medium leading-7 tracking-[-0.02em] text-ink">{question}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.55fr_1fr] lg:gap-20">
            <div><Eyebrow>Exploración municipal</Eyebrow><Heading size="xl">Busca una gestión local.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65">Consulta las variables seleccionadas para cada municipalidad. Abre el perfil completo para cruzarlas con población, presupuesto, inversión y capacidad institucional.</p>
          </div>
          <SectorExplorer items={searchItems} />
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/55">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Database className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Fuente y límites</Eyebrow><Heading size="lg">La declaración abre preguntas; no las cierra.</Heading></div>
            <div className="space-y-5 text-sm leading-7 text-ink/68">
              <p><strong className="font-medium text-ink">Fuente:</strong> {sectorSource.name}, {sectorSource.publisher}. Periodo de referencia: {sectorSource.referencePeriod}.</p>
              <p>{sectorSource.notes} La presencia de un instrumento o una acción no demuestra vigencia, calidad, cobertura efectiva ni resultados.</p>
              <a href={sectorSource.datasetUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-rust hover:text-ink">Consultar fuente oficial <ExternalLink className="h-3.5 w-3.5" aria-hidden /></a>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 rounded-lg bg-accent px-7 py-10 text-accent-ink md:grid-cols-[1fr_auto] md:items-end md:px-12 md:py-14">
            <div><Eyebrow className="text-[#d9a48f]">Aplicación institucional</Eyebrow><Heading size="xl" className="max-w-[19ch] text-white">Pasemos de una ficha abierta a evidencia para actuar.</Heading><p className="mt-4 max-w-xl text-sm leading-7 text-white/58">NOAM puede ampliar esta lectura con datos locales, trabajo de campo, análisis territorial y un sistema de seguimiento.</p></div>
            <div className="flex flex-wrap items-center gap-5"><Button href={`${topic.serviceHref}?from=${topic.slug}`} variant="secondary" className="rounded-full border-white bg-white text-ink">{topic.serviceLabel}</Button><NextLink href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-white/65 hover:text-white">Conversar <ArrowRight className="h-3.5 w-3.5" /></NextLink></div>
          </div>
        </Container>
      </Section>
    </>
  );
}

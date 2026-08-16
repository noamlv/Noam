import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, BarChart3, CircleHelp, Database, Scale } from "lucide-react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import {
  formatPlanometroNumber,
  formatPlanometroPercent,
  formatPlanometroScore,
  getPlanometroAxis,
  getPlanometroAxisEditorial,
  getPlanometroAxisParties,
  planometroAxes,
  planometroData,
  planometroSummary
} from "@/lib/planometro";
import { breadcrumbJsonLd, buildMetadata, datasetJsonLd, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

interface AxisPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;
export const revalidate = 86_400;

export function generateStaticParams() {
  return planometroAxes.map((axis) => ({ slug: axis.key }));
}

export async function generateMetadata({ params }: AxisPageProps): Promise<Metadata> {
  const { slug } = await params;
  const axis = getPlanometroAxis(slug);
  if (!axis) return {};
  return buildMetadata({
    title: `${axis.label} en los planes de gobierno 2026`,
    description: `${formatPlanometroNumber(axis.proposals)} propuestas clasificadas en ${axis.label.toLocaleLowerCase("es-PE")}: cobertura, señales textuales y organizaciones dentro de Planómetro 2026.`,
    path: `/electoral/planometro-2026/ejes/${axis.key}`,
    image: ogImagePath("planometro-ejes", axis.key)
  });
}

export default async function PlanometroAxisPage({ params }: AxisPageProps) {
  const { slug } = await params;
  const axis = getPlanometroAxis(slug);
  const editorial = getPlanometroAxisEditorial(slug);
  if (!axis || !editorial) notFound();
  const path = `/electoral/planometro-2026/ejes/${axis.key}`;
  const organizations = getPlanometroAxisParties(axis.key);
  const coveragePercent = (organizations.length / planometroSummary.plans) * 100;
  const maximum = Math.max(...organizations.map((item) => item.proposals), 1);
  const contactHref = `/contact?interest=planometro&axis=${encodeURIComponent(axis.label)}&from=${path}`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Electoral", path: "/electoral" }, { name: "Planómetro 2026", path: "/electoral/planometro-2026" }, { name: "Ejes", path: "/electoral/planometro-2026/ejes" }, { name: axis.label, path }])} />
      <JsonLd data={datasetJsonLd({ name: `${axis.label}: eje temático de Planómetro 2026`, description: editorial.description, url: `${siteConfig.url}${path}`, datePublished: planometroData.source.strictSnapshotDate })} />

      <section className="border-b border-border pb-16 pt-14 md:pb-24 md:pt-20"><Container><NextLink href="/electoral/planometro-2026/ejes" className="inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-ink"><ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Todos los ejes</NextLink><div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.48fr] lg:items-end"><div><Eyebrow className="text-rust">Planómetro 2026 · Eje temático</Eyebrow><Heading as="h1" size="display" className="max-w-[13ch]">{axis.label}</Heading><p className="mt-7 max-w-2xl text-base leading-8 text-ink/66">{editorial.description}</p></div><div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border">{[
        [formatPlanometroNumber(axis.proposals), "propuestas clasificadas"],
        [formatPlanometroPercent(axis.sharePercent), "del corpus operativo"],
        [formatPlanometroNumber(organizations.length), "organizaciones con casos"],
        [formatPlanometroScore(axis.averageConcreteness), "concreción textual"]
      ].map(([value, label]) => <div key={label} className="min-h-[130px] bg-panel p-5"><p className="text-2xl font-medium tracking-[-0.045em] text-ink">{value}</p><p className="mt-2 text-[9px] leading-4 text-muted">{label}</p></div>)}</div></div></Container></section>

      <section className="border-b border-border bg-[#15211d] py-12 text-white md:py-16"><Container><div className="grid gap-px overflow-hidden rounded-md bg-white/14 md:grid-cols-3">{editorial.questions.map((question, index) => <article key={question} className="min-h-[230px] bg-[#15211d] p-6"><div className="flex items-center justify-between"><CircleHelp className="h-4 w-4 text-[#d9a48f]" aria-hidden /><span className="font-mono text-[9px] text-white/30">0{index + 1}</span></div><h2 className="mt-12 text-xl font-medium leading-7 tracking-[-0.025em] text-white">{question}</h2></article>)}</div></Container></section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.38fr_1fr] lg:gap-20"><div><BarChart3 className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Cobertura en el corpus</Eyebrow><Heading size="xl">Dónde aparece el eje en la extracción.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Se muestran conteos y participación dentro de cada documento. El orden por volumen facilita navegación; no es un ranking de prioridad, calidad ni compromiso.</p><div className="mt-7 rounded-sm border border-border bg-panel p-5"><p className="text-3xl font-medium tracking-[-0.045em] text-ink">{formatPlanometroPercent(coveragePercent)}</p><p className="mt-2 text-[9px] text-muted">de organizaciones con al menos un caso clasificado</p></div></div><div className="overflow-hidden rounded-md border border-border bg-panel"><div className="hidden grid-cols-[1fr_110px_90px_90px] gap-4 border-b border-border bg-canvas px-5 py-3 text-[9px] uppercase tracking-[0.12em] text-muted sm:grid"><span>Organización</span><span>Volumen</span><span>Dentro del plan</span><span>Perfil</span></div><div className="divide-y divide-border">{organizations.map((item) => <article key={item.party.slug} className="grid gap-4 px-5 py-4 sm:grid-cols-[1fr_110px_90px_90px] sm:items-center"><div><p className="text-sm font-medium text-ink">{item.party.name}</p><div className="mt-2 h-1.5 max-w-sm overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-[#5f796e]" style={{ width: `${(item.proposals / maximum) * 100}%` }} /></div></div><p className="text-xs text-ink/65">{formatPlanometroNumber(item.proposals)} casos</p><p className="text-xs text-ink/65">{formatPlanometroPercent(item.sharePercent)}</p><NextLink href={`/electoral/planometro-2026/organizaciones/${item.party.slug}`} className="inline-flex items-center gap-1.5 text-xs font-medium text-rust">Abrir <ArrowRight className="h-3 w-3" aria-hidden /></NextLink></article>)}</div></div></div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45"><Container><div className="grid gap-10 lg:grid-cols-[0.38fr_1fr] lg:gap-20"><div><Scale className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Señales de operación</Eyebrow><Heading size="xl">Lo que el texto hace explícito.</Heading></div><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">{[
        [formatPlanometroPercent(axis.quantTargetPercent), "Meta cuantitativa", "Presencia de una cantidad o magnitud reconocida por las reglas."],
        [formatPlanometroPercent(axis.timeHorizonPercent), "Horizonte temporal", "Presencia de un plazo, fecha o periodo de implementación."],
        [formatPlanometroScore(axis.averageConcreteness), "Concreción textual", "Score agregado de rasgos observables; no mide factibilidad."]
      ].map(([value, label, note]) => <article key={label} className="min-h-[245px] bg-panel p-6"><Database className="h-4 w-4 text-rust" aria-hidden /><p className="mt-10 text-3xl font-medium tracking-[-0.045em] text-ink">{value}</p><h2 className="mt-3 text-lg font-medium text-ink">{label}</h2><p className="mt-2 text-xs leading-5 text-ink/58">{note}</p></article>)}</div></div><div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-7"><p className="max-w-2xl text-xs leading-5 text-muted">Categoría generada por reglas temáticas. Snapshot {planometroData.source.strictSnapshotDate}; consulta la validación y los límites antes de reutilizar.</p><div className="flex flex-wrap gap-3"><Button href="/electoral/planometro-2026" variant="secondary" className="rounded-full">Ver metodología</Button><Button href={contactHref} className="rounded-full px-6">Analizar esta agenda</Button></div></div></Container></Section>
    </>
  );
}

import type { Metadata } from "next";
import { AlertTriangle, ArrowLeft, ArrowRight, BarChart3, FileSearch, Scale, Target } from "lucide-react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import {
  describePlanometroDifference,
  formatPlanometroNumber,
  formatPlanometroPercent,
  formatPlanometroScore,
  getPartyAxisMix,
  getPlanometroParty,
  planometroAxes,
  planometroData,
  planometroParties,
  planometroSummary
} from "@/lib/planometro";
import { breadcrumbJsonLd, buildMetadata, datasetJsonLd, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

interface OrganizationPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;
export const revalidate = 86_400;

export function generateStaticParams() {
  return planometroParties.map((party) => ({ slug: party.slug }));
}

export async function generateMetadata({ params }: OrganizationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const party = getPlanometroParty(slug);
  if (!party) return {};
  return buildMetadata({
    title: `${party.name}: plan de gobierno 2026 en Planómetro`,
    description: `${formatPlanometroNumber(party.operationalProposals)} propuestas bajo criterio operativo, composición temática y señales textuales del plan de ${party.name}.`,
    path: `/electoral/planometro-2026/organizaciones/${party.slug}`,
    image: ogImagePath("planometro-organizaciones", party.slug)
  });
}

function signedDifference(value: number) {
  const formatted = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 1, signDisplay: "always" }).format(value);
  return `${formatted} pp`;
}

export default async function PlanometroOrganizationPage({ params }: OrganizationPageProps) {
  const { slug } = await params;
  const party = getPlanometroParty(slug);
  if (!party) notFound();
  const path = `/electoral/planometro-2026/organizaciones/${party.slug}`;
  const smallBase = party.operationalProposals < 20;
  const axisRows = planometroAxes.map((axis) => ({ corpus: axis, party: getPartyAxisMix(party, axis.key) }));
  const axisMaximum = Math.max(...axisRows.flatMap((item) => [item.corpus.sharePercent, item.party.sharePercent]), 1);
  const signals = [
    { label: "Filtro operativo", value: party.operationalSharePercent, reference: planometroSummary.operationalSharePercent, note: "proporción de enunciados detectados" },
    { label: "Concreción textual", value: party.averageConcreteness, reference: planometroSummary.averageConcreteness, note: "score descriptivo sobre 100" },
    { label: "Meta cuantitativa", value: party.quantTargetPercent, reference: planometroSummary.quantTargetPercent, note: "presencia textual en propuestas" },
    { label: "Horizonte temporal", value: party.timeHorizonPercent, reference: planometroSummary.timeHorizonPercent, note: "presencia textual en propuestas" }
  ].map((signal) => ({ ...signal, comparison: describePlanometroDifference(signal.value, signal.reference) }));
  const contactHref = `/contact?interest=planometro&organization=${encodeURIComponent(party.name)}&from=${path}`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Electoral", path: "/electoral" }, { name: "Planómetro 2026", path: "/electoral/planometro-2026" }, { name: "Organizaciones", path: "/electoral/planometro-2026/organizaciones" }, { name: party.name, path }])} />
      <JsonLd data={datasetJsonLd({ name: `${party.name}: perfil programático en Planómetro 2026`, description: `Agregados temáticos y señales textuales del documento procesado para ${party.name}.`, url: `${siteConfig.url}${path}`, datePublished: planometroData.source.strictSnapshotDate })} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <NextLink href="/electoral/planometro-2026/organizaciones" className="inline-flex items-center gap-2 text-xs text-white/55 transition-colors hover:text-white"><ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Todas las organizaciones</NextLink>
          <div className="mt-12 grid gap-14 lg:grid-cols-[0.88fr_1fr] lg:items-end lg:gap-20">
            <div><Eyebrow className="text-[#d9a48f]">Planómetro 2026 · Perfil programático</Eyebrow><Heading as="h1" size="display" className="max-w-[12ch] text-white">{party.name}</Heading><p className="mt-7 max-w-xl text-base leading-8 text-white/65">Lectura automatizada del plan procesado: volumen, composición temática y señales explícitas de operación. No es una evaluación de calidad, factibilidad ni desempeño político.</p></div>
            <div className="overflow-hidden rounded-[1.25rem] border border-white/14 bg-[#1a2b25]"><div className="flex items-center justify-between border-b border-white/14 px-6 py-4"><span className="font-mono text-[9px] text-[#d9a48f]">SNAPSHOT · {planometroData.source.strictSnapshotDate}</span><Badge className="border-white/15 bg-white/5 text-white/60">Documento procesado</Badge></div><div className="grid grid-cols-2 gap-px bg-white/12">{[
              [formatPlanometroNumber(party.detectedStatements), "enunciados detectados"],
              [formatPlanometroNumber(party.operationalProposals), "bajo criterio operativo"],
              [formatPlanometroPercent(party.operationalSharePercent), "del universo detectado"],
              [formatPlanometroScore(party.averageConcreteness), "concreción textual"]
            ].map(([value, label]) => <div key={label} className="min-h-[140px] bg-[#1a2b25] p-5"><p className="text-3xl font-medium tracking-[-0.05em]">{value}</p><p className="mt-2 text-[9px] leading-4 text-white/55">{label}</p></div>)}</div></div>
          </div>
        </Container>
      </section>

      {smallBase && <section className="border-b border-[#c8795b]/35 bg-[#f2dfd5]"><Container><div className="grid gap-4 py-6 sm:grid-cols-[auto_1fr] sm:items-start"><AlertTriangle className="h-5 w-5 text-rust" aria-hidden /><div><p className="text-sm font-medium text-ink">Base extraída pequeña: {party.operationalProposals} propuestas bajo criterio.</p><p className="mt-1 text-xs leading-5 text-ink/62">Los porcentajes pueden cambiar mucho con pocos casos. Úsalos para localizar y revisar texto, no para comparar posiciones entre organizaciones.</p></div></div></Container></section>}

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.38fr_1fr] lg:gap-20"><div><Scale className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Referencia descriptiva</Eyebrow><Heading size="xl">Cuatro señales frente al corpus.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">La diferencia se expresa en puntos porcentuales. No controla por longitud, formato, estilo del documento ni complejidad de cada materia.</p></div><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">{signals.map((signal) => <article key={signal.label} className="min-h-[250px] bg-panel p-6"><div className="flex items-center justify-between gap-4"><Badge>{signal.comparison.label}</Badge><span className="font-mono text-[9px] text-rust">{signedDifference(signal.comparison.difference)}</span></div><p className="mt-10 text-4xl font-medium tracking-[-0.05em] text-ink">{formatPlanometroPercent(signal.value)}</p><h2 className="mt-3 text-lg font-medium text-ink">{signal.label}</h2><p className="mt-1 text-[9px] text-muted">Corpus: {formatPlanometroPercent(signal.reference)} · {signal.note}</p></article>)}</div></div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.45fr_1fr] md:items-end"><div><BarChart3 className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Composición temática</Eyebrow><Heading size="xl">La mezcla del documento y la referencia nacional.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65">Cada barra muestra participación dentro del subconjunto operativo. Un eje ausente equivale a cero casos clasificados, no necesariamente a ausencia total del tema en el PDF.</p></div>
          <div className="mt-10 overflow-hidden rounded-md border border-border bg-panel p-6 md:p-8"><div className="grid grid-cols-[132px_1fr_52px] gap-3 border-b border-border pb-4 text-[9px] uppercase tracking-[0.12em] text-muted sm:grid-cols-[180px_1fr_64px]"><span>Eje</span><span>Organización / corpus</span><span className="text-right">%</span></div><div className="divide-y divide-border">{axisRows.map(({ corpus, party: mix }) => <NextLink key={corpus.key} href={`/electoral/planometro-2026/ejes/${corpus.key}`} className="group grid grid-cols-[132px_1fr_52px] items-center gap-3 py-4 sm:grid-cols-[180px_1fr_64px]"><span className="truncate text-xs font-medium text-ink group-hover:text-rust" title={corpus.label}>{corpus.label}</span><span className="space-y-1.5"><span className="block h-2 overflow-hidden rounded-full bg-border"><span className="block h-full rounded-full bg-rust" style={{ width: `${(mix.sharePercent / axisMaximum) * 100}%` }} /></span><span className="block h-1 overflow-hidden rounded-full bg-border"><span className="block h-full rounded-full bg-[#5f796e]" style={{ width: `${(corpus.sharePercent / axisMaximum) * 100}%` }} /></span></span><span className="text-right font-mono text-[9px] text-ink/60">{formatPlanometroPercent(mix.sharePercent)}</span></NextLink>)}</div><div className="mt-6 flex flex-wrap gap-5 border-t border-border pt-5 text-[9px] text-muted"><span className="inline-flex items-center gap-2"><i className="h-2 w-5 rounded-full bg-rust" />{party.name}</span><span className="inline-flex items-center gap-2"><i className="h-1 w-5 rounded-full bg-[#5f796e]" />Corpus completo</span></div></div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.38fr_1fr] lg:gap-20"><div><FileSearch className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Claves de lectura</Eyebrow><Heading size="xl">Qué revisar después del agregado.</Heading></div><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">{[
            ["01", "Cobertura del documento", `${formatPlanometroNumber(party.operationalProposals)} de ${formatPlanometroNumber(party.detectedStatements)} enunciados cumplen el criterio operativo. Conviene inspeccionar qué quedó fuera y qué ruido permanece.`],
            ["02", "Agenda visible", `${party.topAxes.map((axis) => axis.label).join(", ")} concentran la mayor participación clasificada. Esto describe la extracción, no una jerarquía oficial del plan.`],
            ["03", "Condiciones de ejecución", `${formatPlanometroPercent(party.quantTargetPercent)} contiene meta cuantitativa, ${formatPlanometroPercent(party.timeHorizonPercent)} horizonte y ${formatPlanometroPercent(party.fundingSourcePercent)} fuente de financiamiento explícita.`]
          ].map(([number, title, text]) => <article key={number} className="min-h-[285px] bg-panel p-6"><span className="font-mono text-[9px] text-rust">{number}</span><Target className="mt-10 h-4 w-4 text-rust" aria-hidden /><h2 className="mt-5 text-xl font-medium tracking-[-0.025em] text-ink">{title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{text}</p></article>)}</div></div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-7"><p className="max-w-2xl text-xs leading-5 text-muted">Fuente: {planometroData.source.name}. Extracción automatizada; snapshot {planometroData.source.strictSnapshotDate}. Revisa metodología y validación antes de citar.</p><div className="flex flex-wrap gap-3"><Button href="/electoral/planometro-2026#explorar" variant="secondary" className="rounded-full">Metodología</Button><Button href={contactHref} className="rounded-full px-6">Solicitar análisis</Button></div></div>
        </Container>
      </Section>

      <section className="border-y border-border bg-[#ded9cc]"><Container><div className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between"><div><Eyebrow>Siguiente lectura</Eyebrow><p className="mt-2 text-xl font-medium tracking-[-0.025em] text-ink">Explora la agenda por tema, no solo por organización.</p></div><Button href="/electoral/planometro-2026/ejes" variant="ghost" className="gap-2">Ver los 11 ejes <ArrowRight className="h-4 w-4" aria-hidden /></Button></div></Container></section>
    </>
  );
}

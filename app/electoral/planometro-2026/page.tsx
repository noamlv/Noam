import { ArrowRight, Database, Download, ExternalLink, Layers3, UsersRound } from "lucide-react";
import NextLink from "next/link";
import { PlanometroNativeVisual } from "@/components/brand/planometro-native-visual";
import { PlanometroExplorer } from "@/components/electoral/planometro-explorer";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import {
  formatPlanometroNumber,
  formatPlanometroPercent,
  formatPlanometroScore,
  planometroAxes,
  planometroData,
  planometroParties,
  planometroSummary
} from "@/lib/planometro";
import { breadcrumbJsonLd, buildMetadata, datasetJsonLd, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 86_400;

export const metadata = buildMetadata({
  title: "Planómetro 2026: compara planes de gobierno",
  description: "Consulta las propuestas identificadas en 36 planes de gobierno y compáralas por tema y organización.",
  path: "/electoral/planometro-2026",
  image: ogImagePath("electoral", "planometro-2026")
});

function AxisLandscape() {
  const maximum = Math.max(...planometroAxes.map((axis) => axis.sharePercent), 1);
  return <article className="rounded-md border border-border bg-panel p-6 md:p-7"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Agenda agregada</p><h2 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-ink">Distribución de las propuestas seleccionadas</h2><p className="mt-3 text-xs leading-5 text-ink/58">Participación de cada eje dentro de las 2.742 propuestas filtradas. “Otros” también refleja límites de clasificación.</p><div className="mt-7 space-y-3">{planometroAxes.map((axis) => <div key={axis.key} className="grid grid-cols-[132px_1fr_48px] items-center gap-3"><p className="truncate text-[10px] text-muted" title={axis.label}>{axis.label}</p><div className="h-5 overflow-hidden rounded-sm bg-border/70"><div className="h-full rounded-sm bg-[#5f796e]" style={{ width: `${(axis.sharePercent / maximum) * 100}%` }} /></div><p className="text-right font-mono text-[9px] text-ink/65">{formatPlanometroPercent(axis.sharePercent)}</p></div>)}</div></article>;
}

function OperationalSignals() {
  const maximum = Math.max(...planometroData.components.map((item) => item.sharePercent), 1);
  return <article className="rounded-md border border-border bg-panel p-6 md:p-7"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Señales operativas</p><h2 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-ink">Qué información se identificó en las propuestas</h2><p className="mt-3 text-xs leading-5 text-ink/58">Las reglas detectan presencia textual; no verifican suficiencia, consistencia ni factibilidad material.</p><div className="mt-7 space-y-5">{planometroData.components.map((item) => <div key={item.label}><div className="flex items-center justify-between gap-4"><p className="text-[10px] text-muted">{item.label}</p><p className="font-mono text-[10px] text-ink/65">{formatPlanometroPercent(item.sharePercent)}</p></div><div className="mt-2 h-5 overflow-hidden rounded-sm bg-border/70"><div className="h-full rounded-sm bg-rust" style={{ width: `${(item.sharePercent / maximum) * 100}%` }} /></div></div>)}</div><p className="mt-6 border-t border-border pt-4 text-[10px] leading-4 text-muted">Score medio de concreción textual: {formatPlanometroScore(planometroSummary.averageConcreteness)}.</p></article>;
}

export default function Planometro2026Page() {
  const contactHref = "/contact?interest=planometro&from=/electoral/planometro-2026";
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Electoral", path: "/electoral" }, { name: "Planómetro 2026", path: "/electoral/planometro-2026" }])} />
      <JsonLd data={datasetJsonLd({ name: "Planómetro 2026: propuestas de los planes de gobierno", description: "Propuestas identificadas en 36 planes de gobierno, agrupadas por tema y organización.", url: `${siteConfig.url}/electoral/planometro-2026`, datePublished: planometroData.source.strictSnapshotDate })} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20"><Container><div className="grid gap-14 lg:grid-cols-[0.9fr_1fr] lg:items-center lg:gap-20"><div><Eyebrow className="reveal text-[#d9a48f]">Planes de gobierno · Perú 2026</Eyebrow><Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[11ch] text-white">Compara propuestas de los planes de gobierno</Heading><p className="reveal reveal-delay-2 mt-7 max-w-xl text-base leading-8 text-white/68">Consulta las propuestas identificadas en los planes de gobierno y compáralas por tema y organización. La selección es automática; puedes consultar los planes originales.</p><div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3"><Button href="#explorar" variant="secondary" className="rounded-full border-white bg-white text-ink">Ver propuestas</Button><Button href={planometroData.source.externalUrl} target="_blank" rel="noreferrer" variant="ghost" className="gap-2 !text-white/70 hover:!text-white">Abrir producto original <ExternalLink className="h-4 w-4" aria-hidden /></Button></div></div><PlanometroNativeVisual className="reveal reveal-delay-2" /></div></Container></section>

      <section className="border-b border-border"><Container><div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">{[
        [formatPlanometroNumber(planometroSummary.plans), "planes completos", "documentos analizados"],
        [formatPlanometroNumber(planometroSummary.detectedStatements), "enunciados detectados", "fragmentos identificados"],
        [formatPlanometroNumber(planometroSummary.operationalProposals), "propuestas seleccionadas", `${formatPlanometroPercent(planometroSummary.operationalSharePercent)} del universo`],
        [formatPlanometroNumber(planometroSummary.annotatedCases), "fragmentos revisados a mano", "muestra de validación"]
      ].map(([value, label, note]) => <div key={label} className="min-w-0 py-7 sm:px-6 sm:first:pl-0 md:py-9"><p className="text-3xl font-medium tracking-[-0.05em] text-ink">{value}</p><p className="mt-2 text-xs font-medium text-ink/72">{label}</p><p className="mt-1 text-[9px] leading-4 text-muted">{note}</p></div>)}</div></Container></section>



      <Section className="border-y border-border bg-panel/45"><Container><div className="grid gap-8 md:grid-cols-[0.6fr_1fr] md:items-end"><div><Eyebrow>Panorama nacional</Eyebrow><Heading size="xl">Temas e información de las propuestas seleccionadas</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Compara los temas que aparecen en las propuestas y cuántas mencionan una meta, un plazo o financiamiento.</p></div><div className="mt-10 grid gap-4 lg:grid-cols-2"><AxisLandscape /><OperationalSignals /></div></Container></Section>

      <Section><Container><div className="grid gap-8 md:grid-cols-[0.42fr_1fr] md:items-end"><div><Eyebrow>Biblioteca programática</Eyebrow><Heading size="xl">Busca propuestas por tema y organización</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65">Elige una organización para revisar su plan o un tema para comparar cómo lo abordan varias organizaciones.</p></div><div className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2">{[
        { icon: UsersRound, eyebrow: "36 perfiles", title: "Organizaciones políticas", text: "Propuestas por tema y acceso al plan original.", href: "/electoral/planometro-2026/organizaciones" },
        { icon: Layers3, eyebrow: "11 lecturas", title: "Ejes temáticos", text: "Cobertura por organización, preguntas de análisis y señales explícitas para cada agenda.", href: "/electoral/planometro-2026/ejes" }
      ].map((item) => { const Icon = item.icon; return <NextLink key={item.href} href={item.href} className="group min-h-[310px] bg-panel p-6 transition-colors hover:bg-canvas md:p-8"><div className="flex items-center justify-between"><Icon className="h-5 w-5 text-rust" aria-hidden /><span className="font-mono text-[9px] text-muted">{item.eyebrow}</span></div><h2 className="mt-16 text-3xl font-medium tracking-[-0.04em] text-ink">{item.title}</h2><p className="mt-3 max-w-xl text-sm leading-6 text-ink/62">{item.text}</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink">Explorar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span></NextLink>; })}</div></Container></Section>

      <Section id="explorar" className="border-t border-border"><Container><div className="mb-10 grid gap-8 md:grid-cols-[0.58fr_1fr] md:items-end"><div><Eyebrow>Explorador programático</Eyebrow><Heading size="xl">Consulta el análisis de cada organización</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Selecciona una organización para consultar las propuestas identificadas y su distribución por tema. </p></div><PlanometroExplorer parties={planometroParties} /></Container></Section>





      <Section><Container>
        <details className="border-y border-border py-5">
          <summary className="cursor-pointer text-sm font-semibold text-ink">Cómo se eligieron y revisaron las propuestas</summary>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">El análisis busca pasajes que describan acciones. La selección considera si incluyen una medida, una meta o un plazo. Los resultados se pueden contrastar con los planes originales.</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">En la muestra de revisión, {formatPlanometroPercent(planometroData.validation.strict.precisionPercent)} de las propuestas seleccionadas cumplían el criterio y se encontró {formatPlanometroPercent(planometroData.validation.strict.recallPercent)} de las propuestas que lo cumplían. La revisión fue asistida, no una evaluación independiente.</p>
          <div className="mt-5 flex flex-wrap gap-4"><Button href="/downloads/planometro-2026-partidos.csv" variant="secondary" analyticsEvent="resource_download" analyticsTarget="planometro-partidos" className="gap-2"><Download className="h-4 w-4" aria-hidden /> Datos por organización</Button><Button href="/downloads/planometro-2026-ejes.csv" variant="secondary" analyticsEvent="resource_download" analyticsTarget="planometro-ejes" className="gap-2"><Download className="h-4 w-4" aria-hidden /> Datos por tema</Button></div>
        </details>
      </Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container><div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><Eyebrow>Producto original</Eyebrow><Heading size="xl">Herramientas de consulta y fuentes originales</Heading><p className="mt-4 max-w-2xl text-sm leading-7 text-ink/65">Consulta las propuestas, compara los planes y revisa los documentos originales.</p></div><Button href={planometroData.source.externalUrl} target="_blank" rel="noreferrer" variant="ghost" className="gap-2">Abrir aparte <ExternalLink className="h-4 w-4" aria-hidden /></Button></div><div className="mt-10 overflow-hidden rounded-[1.25rem] border border-border bg-panel shadow-visual"><div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4"><span className="text-sm font-medium text-ink">Planómetro 2026 · Quarto</span><span className="text-[10px] uppercase tracking-[0.14em] text-muted">Vista integrada</span></div><iframe src={planometroData.source.externalUrl} title="Planómetro 2026, producto interactivo original" className="h-[720px] w-full bg-white" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /></div></Container></Section>

      <Section className="bg-[#15211d] text-white"><Container><div className="grid gap-12 lg:grid-cols-[0.62fr_1fr] lg:items-end lg:gap-20"><div><Database className="h-5 w-5 text-[#d9a48f]" aria-hidden /><Eyebrow className="mt-6 text-[#d9a48f]">Aplicación institucional</Eyebrow><Heading size="xl" className="max-w-[13ch] text-white">¿Necesitas analizar planes o preparar la gestión?</Heading></div><div><p className="max-w-2xl text-base leading-8 text-white/58">Adaptamos el enfoque para análisis programático, agendas territoriales, transferencia, matrices de compromisos y sistemas de seguimiento regional o municipal.</p><Button href={contactHref} variant="secondary" className="mt-7 rounded-full border-white bg-white px-6 text-ink">Solicitar un análisis</Button></div></div></Container></Section>
    </>
  );
}

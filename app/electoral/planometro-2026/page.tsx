import { ArrowRight, Database, Download, ExternalLink, FileCheck2, Gauge, Layers3, Search, ShieldCheck, UsersRound, Workflow } from "lucide-react";
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
  title: "Planómetro 2026: planes, propuestas y trazabilidad",
  description: "Explora un snapshot reproducible de 36 planes, 4.084 enunciados detectados y 2.742 propuestas bajo criterio operativo.",
  path: "/electoral/planometro-2026",
  image: ogImagePath("electoral", "planometro-2026")
});

function AxisLandscape() {
  const maximum = Math.max(...planometroAxes.map((axis) => axis.sharePercent), 1);
  return <article className="rounded-md border border-border bg-panel p-6 md:p-7"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Agenda agregada</p><h2 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-ink">Cómo se distribuye el universo operativo.</h2><p className="mt-3 text-xs leading-5 text-ink/58">Participación de cada eje dentro de las 2.742 propuestas filtradas. “Otros” también refleja límites de clasificación.</p><div className="mt-7 space-y-3">{planometroAxes.map((axis) => <div key={axis.key} className="grid grid-cols-[132px_1fr_48px] items-center gap-3"><p className="truncate text-[10px] text-muted" title={axis.label}>{axis.label}</p><div className="h-5 overflow-hidden rounded-sm bg-border/70"><div className="h-full rounded-sm bg-[#5f796e]" style={{ width: `${(axis.sharePercent / maximum) * 100}%` }} /></div><p className="text-right font-mono text-[9px] text-ink/65">{formatPlanometroPercent(axis.sharePercent)}</p></div>)}</div></article>;
}

function OperationalSignals() {
  const maximum = Math.max(...planometroData.components.map((item) => item.sharePercent), 1);
  return <article className="rounded-md border border-border bg-panel p-6 md:p-7"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Señales operativas</p><h2 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-ink">Qué aparece explícitamente en el texto.</h2><p className="mt-3 text-xs leading-5 text-ink/58">Las reglas detectan presencia textual; no verifican suficiencia, consistencia ni factibilidad material.</p><div className="mt-7 space-y-5">{planometroData.components.map((item) => <div key={item.label}><div className="flex items-center justify-between gap-4"><p className="text-[10px] text-muted">{item.label}</p><p className="font-mono text-[10px] text-ink/65">{formatPlanometroPercent(item.sharePercent)}</p></div><div className="mt-2 h-5 overflow-hidden rounded-sm bg-border/70"><div className="h-full rounded-sm bg-rust" style={{ width: `${(item.sharePercent / maximum) * 100}%` }} /></div></div>)}</div><p className="mt-6 border-t border-border pt-4 text-[10px] leading-4 text-muted">Score medio de concreción textual: {formatPlanometroScore(planometroSummary.averageConcreteness)}.</p></article>;
}

export default function Planometro2026Page() {
  const contactHref = "/contact?interest=planometro&from=/electoral/planometro-2026";
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Electoral", path: "/electoral" }, { name: "Planómetro 2026", path: "/electoral/planometro-2026" }])} />
      <JsonLd data={datasetJsonLd({ name: "Planómetro 2026: snapshot agregado de planes de gobierno", description: "Agregados de 36 planes, un universo amplio de enunciados y un subconjunto con criterio operativo y trazabilidad documental.", url: `${siteConfig.url}/electoral/planometro-2026`, datePublished: planometroData.source.strictSnapshotDate })} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20"><Container><div className="grid gap-14 lg:grid-cols-[0.9fr_1fr] lg:items-center lg:gap-20"><div><Eyebrow className="reveal text-[#d9a48f]">Planes de gobierno · Perú 2026</Eyebrow><Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[11ch] text-white">Leer miles de propuestas sin perder la fuente.</Heading><p className="reveal reveal-delay-2 mt-7 max-w-xl text-base leading-8 text-white/68">Planómetro convierte documentos extensos en un corpus explorable de temas y señales operativas. Esta versión nativa muestra agregados auditables y deja explícito dónde el método todavía se equivoca.</p><div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3"><Button href="#explorar" variant="secondary" className="rounded-full border-white bg-white text-ink">Explorar el corpus</Button><Button href={planometroData.source.externalUrl} target="_blank" rel="noreferrer" variant="ghost" className="gap-2 !text-white/70 hover:!text-white">Abrir producto original <ExternalLink className="h-4 w-4" aria-hidden /></Button></div></div><PlanometroNativeVisual className="reveal reveal-delay-2" /></div></Container></section>

      <section className="border-b border-border"><Container><div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">{[
        [formatPlanometroNumber(planometroSummary.plans), "planes completos", "corpus procesado"],
        [formatPlanometroNumber(planometroSummary.detectedStatements), "enunciados detectados", "universo de cobertura"],
        [formatPlanometroNumber(planometroSummary.operationalProposals), "bajo criterio operativo", `${formatPlanometroPercent(planometroSummary.operationalSharePercent)} del universo`],
        [formatPlanometroNumber(planometroSummary.annotatedCases), "casos anotados", "muestra de validación"]
      ].map(([value, label, note]) => <div key={label} className="min-w-0 py-7 sm:px-6 sm:first:pl-0 md:py-9"><p className="text-3xl font-medium tracking-[-0.05em] text-ink">{value}</p><p className="mt-2 text-xs font-medium text-ink/72">{label}</p><p className="mt-1 text-[9px] leading-4 text-muted">{note}</p></div>)}</div></Container></section>

      <Section><Container><div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><ShieldCheck className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Antes de comparar</Eyebrow><Heading size="xl">Dos universos. Dos propósitos distintos.</Heading></div><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">{[
        [Search, "Cobertura amplia", "4.084 enunciados buscan no perder contenido relevante, pero incluyen ruido y no equivalen a promesas certificadas."],
        [FileCheck2, "Criterio operativo", "2.742 filas tienen longitud mínima y al menos instrumento, meta cuantitativa o plazo. El filtro todavía conserva falsos positivos."],
        [Gauge, "Score textual", "La concreción resume rasgos observables del texto. No mide calidad normativa, conveniencia, costo real ni probabilidad de cumplimiento."]
      ].map(([Icon, title, text]) => { const Component = Icon as typeof Search; return <article key={String(title)} className="min-h-[270px] bg-panel p-6"><Component className="h-4 w-4 text-rust" aria-hidden /><h2 className="mt-12 text-xl font-medium tracking-[-0.025em] text-ink">{String(title)}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{String(text)}</p></article>; })}</div></div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container><div className="grid gap-8 md:grid-cols-[0.6fr_1fr] md:items-end"><div><Eyebrow>Panorama nacional</Eyebrow><Heading size="xl">Temas y señales del corpus filtrado.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Una vista descriptiva del conjunto. El volumen depende también de extensión documental, estructura y estilo de redacción de cada plan.</p></div><div className="mt-10 grid gap-4 lg:grid-cols-2"><AxisLandscape /><OperationalSignals /></div></Container></Section>

      <Section><Container><div className="grid gap-8 md:grid-cols-[0.42fr_1fr] md:items-end"><div><Eyebrow>Biblioteca programática</Eyebrow><Heading size="xl">Del agregado a una pregunta específica.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65">Cuarenta y siete páginas conectan organizaciones y temas con referencias, límites y rutas de análisis. Son perfiles del corpus, no propaganda ni calificación electoral.</p></div><div className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2">{[
        { icon: UsersRound, eyebrow: "36 perfiles", title: "Organizaciones políticas", text: "Volumen extraído, mezcla temática, señales operativas y comparación descriptiva con el corpus.", href: "/electoral/planometro-2026/organizaciones" },
        { icon: Layers3, eyebrow: "11 lecturas", title: "Ejes temáticos", text: "Cobertura por organización, preguntas de análisis y señales explícitas para cada agenda.", href: "/electoral/planometro-2026/ejes" }
      ].map((item) => { const Icon = item.icon; return <NextLink key={item.href} href={item.href} className="group min-h-[310px] bg-panel p-6 transition-colors hover:bg-canvas md:p-8"><div className="flex items-center justify-between"><Icon className="h-5 w-5 text-rust" aria-hidden /><span className="font-mono text-[9px] text-muted">{item.eyebrow}</span></div><h2 className="mt-16 text-3xl font-medium tracking-[-0.04em] text-ink">{item.title}</h2><p className="mt-3 max-w-xl text-sm leading-6 text-ink/62">{item.text}</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink">Explorar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span></NextLink>; })}</div></Container></Section>

      <Section id="explorar" className="border-t border-border"><Container><div className="mb-10 grid gap-8 md:grid-cols-[0.58fr_1fr] md:items-end"><div><Eyebrow>Explorador programático</Eyebrow><Heading size="xl">Abrir una organización. Revisar su mezcla.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Selecciona una organización del corpus para ver volumen filtrado, señales operativas y composición temática. No se presentan posiciones como pronóstico electoral.</p></div><PlanometroExplorer parties={planometroParties} /></Container></Section>

      <Section className="border-y border-border bg-[#ded9cc]"><Container><div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><FileCheck2 className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Validación recomputada</Eyebrow><Heading size="xl">Mostrar el error también es parte del producto.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Las métricas se recalculan desde el archivo actual de 404 anotaciones. Describen esa muestra; no garantizan igual desempeño fuera de ella.</p></div><div><div className="grid gap-px overflow-hidden rounded-md border border-ink/15 bg-ink/15 sm:grid-cols-2">{[
        ["Universo amplio", planometroData.validation.broad, "Prioriza recall para explorar"],
        ["Criterio operativo", planometroData.validation.strict, "Mejora precisión sin eliminar todo el ruido"]
      ].map(([label, metrics, note]) => { const values = metrics as typeof planometroData.validation.strict; return <article key={String(label)} className="bg-[#ded9cc] p-6"><p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted">{String(label)}</p><div className="mt-7 grid grid-cols-2 gap-5"><div><p className="text-4xl font-medium tracking-[-0.05em] text-ink">{formatPlanometroPercent(values.precisionPercent)}</p><p className="mt-1 text-[9px] text-muted">precisión</p></div><div><p className="text-4xl font-medium tracking-[-0.05em] text-ink">{formatPlanometroPercent(values.recallPercent)}</p><p className="mt-1 text-[9px] text-muted">recall</p></div></div><p className="mt-6 border-t border-ink/15 pt-4 text-xs leading-5 text-ink/60">{String(note)} · F1: {formatPlanometroPercent(values.f1Percent)}</p></article>; })}</div><p className="mt-5 text-[10px] leading-5 text-muted">La fuente documenta anotación asistida. NOAM no presenta esta muestra como validación humana independiente.</p></div></div></Container></Section>

      <Section><Container><div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><Workflow className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Arquitectura reproducible</Eyebrow><Heading size="xl">Del PDF al seguimiento.</Heading></div><div className="divide-y divide-border border-y border-border">{[
        ["01", "Preparar el corpus", "Planes completos, exclusión de resúmenes, conversión a texto y trazabilidad por documento."],
        ["02", "Extraer y clasificar", "Reglas de acción, ejes temáticos, instrumentos y señales explícitas de meta, plazo o financiamiento."],
        ["03", "Auditar y comparar", "Muestra anotada, filtro operativo, similitud, cobertura y diagnósticos con límites documentados."],
        ["04", "Convertir en sistema", "Indicadores, plantillas 2026–2031 y arquitectura para seguimiento posterior a la elección."]
      ].map(([number, title, text]) => <article key={number} className="grid gap-4 py-6 sm:grid-cols-[48px_0.42fr_1fr]"><span className="font-mono text-[10px] text-rust">{number}</span><h2 className="text-lg font-medium text-ink">{title}</h2><p className="text-sm leading-6 text-ink/65">{text}</p></article>)}</div></div><div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-7"><p className="max-w-2xl text-xs leading-5 text-muted">Snapshot estricto: {planometroData.source.strictSnapshotDate}. Pipeline original en R + Quarto; agregados NOAM generados con Python y hashes SHA-256.</p><div className="flex flex-wrap gap-3"><Button href="/downloads/planometro-2026-partidos.csv" variant="secondary" analyticsEvent="resource_download" analyticsTarget="planometro-partidos" className="gap-2 rounded-full"><Download className="h-4 w-4" aria-hidden /> Partidos CSV</Button><Button href="/downloads/planometro-2026-ejes.csv" variant="secondary" analyticsEvent="resource_download" analyticsTarget="planometro-ejes" className="gap-2 rounded-full"><Download className="h-4 w-4" aria-hidden /> Ejes CSV</Button></div></div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container><div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><Eyebrow>Producto original</Eyebrow><Heading size="xl">Más módulos, trazabilidad y visualizaciones.</Heading><p className="mt-4 max-w-2xl text-sm leading-7 text-ink/65">La aplicación Quarto conserva panorama, agenda, similitud, concreción, cobertura, benchmark, KPIs y documentación metodológica.</p></div><Button href={planometroData.source.externalUrl} target="_blank" rel="noreferrer" variant="ghost" className="gap-2">Abrir aparte <ExternalLink className="h-4 w-4" aria-hidden /></Button></div><div className="mt-10 overflow-hidden rounded-[1.25rem] border border-border bg-panel shadow-visual"><div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4"><span className="text-sm font-medium text-ink">Planómetro 2026 · Quarto</span><span className="text-[10px] uppercase tracking-[0.14em] text-muted">Vista integrada</span></div><iframe src={planometroData.source.externalUrl} title="Planómetro 2026, producto interactivo original" className="h-[720px] w-full bg-white" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /></div></Container></Section>

      <Section className="bg-[#15211d] text-white"><Container><div className="grid gap-12 lg:grid-cols-[0.62fr_1fr] lg:items-end lg:gap-20"><div><Database className="h-5 w-5 text-[#d9a48f]" aria-hidden /><Eyebrow className="mt-6 text-[#d9a48f]">Aplicación institucional</Eyebrow><Heading size="xl" className="max-w-[13ch] text-white">De comparar planes a preparar decisiones de gobierno.</Heading></div><div><p className="max-w-2xl text-base leading-8 text-white/58">Adaptamos el enfoque para análisis programático, agendas territoriales, transferencia, matrices de compromisos y sistemas de seguimiento regional o municipal.</p><Button href={contactHref} variant="secondary" className="mt-7 rounded-full border-white bg-white px-6 text-ink">Solicitar un análisis</Button></div></div></Container></Section>
    </>
  );
}

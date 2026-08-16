import { ArrowRight, Database, Eye, Gauge, Scale, TriangleAlert } from "lucide-react";
import { InvestmentObservatoryVisual } from "@/components/brand/investment-observatory-visual";
import { InvestmentExplorer } from "@/components/dataperu/investment-explorer";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { formatCurrency, formatMetric, formatPercent, projectSource } from "@/lib/dataperu";
import {
  departmentInvestments,
  investmentExecutionBands,
  investmentFunctions,
  investmentSummary
} from "@/lib/dataperu-investments";
import { breadcrumbJsonLd, buildMetadata, datasetJsonLd, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 86_400;

export const metadata = buildMetadata({
  title: "Observatorio de inversiones municipales",
  description: "Explora 9,429 proyectos municipales visibles por departamento, función, PIM y ejecución financiera durante 2025.",
  path: "/dataperu/inversiones",
  image: ogImagePath("dataperu", "inversiones")
});

function FunctionMix() {
  const visible = investmentFunctions.slice(0, 9);
  const maxShare = Math.max(...visible.map((item) => item.shareOfPimPercent), 1);
  return <article className="rounded-md border border-border bg-panel p-6 md:p-7"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Composición por función</p><h2 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-ink">Dónde se concentra el PIM visible.</h2><p className="mt-3 text-xs leading-5 text-ink/58">Participación dentro del extracto de proyectos visibles, no dentro de la cartera completa.</p><div className="mt-7 space-y-4">{visible.map((item) => <div key={item.label} className="grid grid-cols-[112px_1fr_48px] items-center gap-3"><p className="truncate text-[10px] text-muted" title={item.label}>{item.label}</p><div className="h-5 overflow-hidden rounded-sm bg-border/70"><div className="h-full rounded-sm bg-[#5f796e]" style={{ width: `${(item.shareOfPimPercent / maxShare) * 100}%` }} /></div><p className="text-right font-mono text-[10px] text-ink/65">{formatPercent(item.shareOfPimPercent)}</p></div>)}</div><p className="mt-6 border-t border-border pt-4 text-[10px] leading-4 text-muted">{investmentFunctions.length} funciones presentes en el extracto MEF.</p></article>;
}

function ExecutionMix() {
  const maxShare = Math.max(...investmentExecutionBands.map((item) => item.projectSharePercent), 1);
  return <article className="rounded-md border border-border bg-panel p-6 md:p-7"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Distribución financiera</p><h2 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-ink">Proyectos por tramo de ejecución.</h2><p className="mt-3 text-xs leading-5 text-ink/58">El porcentaje se calcula con devengado sobre PIM 2025. No acredita avance físico ni culminación.</p><div className="mt-7 space-y-5">{investmentExecutionBands.map((item) => <div key={item.key}><div className="flex items-center justify-between gap-4"><p className="text-[10px] text-muted">{item.label}</p><p className="font-mono text-[10px] text-ink/65">{formatMetric(item.projects)} · {formatPercent(item.projectSharePercent)}</p></div><div className="mt-2 h-5 overflow-hidden rounded-sm bg-border/70"><div className="h-full rounded-sm bg-rust" style={{ width: `${(item.projectSharePercent / maxShare) * 100}%` }} /></div><p className="mt-1 text-[8px] text-muted">{formatPercent(item.pimSharePercent)} del PIM visible</p></div>)}</div></article>;
}

export default function InvestmentObservatoryPage() {
  const initialDepartmentCode = "15";
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "DataPerú", path: "/dataperu" }, { name: "Observatorio de inversiones", path: "/dataperu/inversiones" }])} />
      <JsonLd data={datasetJsonLd({ name: "Cartera visible de inversiones municipales DataPerú 2025", description: "Extracto de hasta cinco proyectos con mayor PIM positivo por municipalidad, con función y ejecución financiera 2025.", url: `${siteConfig.url}/dataperu/inversiones`, datePublished: "2026-07-17" })} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20"><Container><div className="grid gap-14 lg:grid-cols-[0.88fr_1fr] lg:items-center lg:gap-20"><div><Eyebrow className="text-[#d9a48f]">DataPerú · Inversión municipal</Eyebrow><Heading as="h1" size="display" className="max-w-[12ch] text-white">La cartera se entiende proyecto por proyecto.</Heading><p className="mt-7 max-w-xl text-base leading-8 text-white/66">Explora los principales proyectos municipales visibles por territorio, función, monto y ejecución financiera. Una herramienta para encontrar dónde preguntar antes de concluir.</p><div className="mt-8 flex flex-wrap gap-3"><Button href="#explorar" variant="secondary" className="rounded-full border-white bg-white text-ink">Explorar la cartera</Button><Button href="/contact?interest=observatorio-gestion-inversiones&from=/dataperu/inversiones" variant="ghost" className="gap-2 !text-white/68 hover:!text-white">Diseñar un observatorio <ArrowRight className="h-4 w-4" aria-hidden /></Button></div></div><InvestmentObservatoryVisual /></div></Container></section>

      <section className="border-b border-border"><Container><div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">{[
        [formatMetric(investmentSummary.projects), "proyectos visibles", "hasta cinco por municipalidad"],
        [formatCurrency(investmentSummary.visiblePim, true), "PIM visible", `${formatPercent(investmentSummary.coveragePercent)} del PIM de inversión`],
        [formatPercent(investmentSummary.visibleExecutionPercent), "ejecución financiera", "devengado visible / PIM visible"],
        [formatMetric(investmentSummary.noAccrualProjects), "sin devengado", "registro financiero 2025"]
      ].map(([value, label, note]) => <div key={label} className="min-w-0 py-7 sm:px-6 sm:first:pl-0 md:py-9"><p className="break-words text-3xl font-medium tracking-[-0.05em] text-ink">{value}</p><p className="mt-2 text-xs font-medium text-ink/72">{label}</p><p className="mt-1 text-[9px] leading-4 text-muted">{note}</p></div>)}</div></Container></section>

      <Section><Container><div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><Scale className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Antes de leer</Eyebrow><Heading size="xl">Una ventana útil, no la cartera completa.</Heading></div><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">{[
        [Eye, "Cobertura explícita", `Se muestran hasta cinco proyectos con mayor PIM positivo por municipalidad. La cobertura nacional visible es ${formatPercent(investmentSummary.coveragePercent)} del PIM municipal de inversión.`],
        [Gauge, "Ejecución financiera", "Devengado sobre PIM permite observar registro financiero. No informa avance físico, calidad, entrega ni impacto."],
        [TriangleAlert, "Señal, no alerta causal", "Un porcentaje bajo o nulo orienta una revisión del proyecto y su contexto; no prueba retraso, problema contractual o responsabilidad."]
      ].map(([Icon, title, text]) => { const Component = Icon as typeof Eye; return <article key={String(title)} className="min-h-[260px] bg-panel p-6"><Component className="h-4 w-4 text-rust" aria-hidden /><h2 className="mt-12 text-xl font-medium tracking-[-0.025em] text-ink">{String(title)}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{String(text)}</p></article>; })}</div></div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container><div className="grid gap-8 md:grid-cols-[0.6fr_1fr] md:items-end"><div><Eyebrow>Vista nacional</Eyebrow><Heading size="xl">Composición y avance del extracto.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Dos lecturas compatibles: función presupuestal y tramo de ejecución financiera. Los montos y porcentajes comparten el mismo universo visible.</p></div><div className="mt-10 grid gap-4 lg:grid-cols-2"><FunctionMix /><ExecutionMix /></div></Container></Section>

      <Section id="explorar"><Container><div className="mb-10 grid gap-8 md:grid-cols-[0.58fr_1fr] md:items-end"><div><Eyebrow>Explorador territorial</Eyebrow><Heading size="xl">De la señal nacional al proyecto concreto.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Selecciona un departamento y filtra la cartera visible. Cada proyecto conduce al perfil de la municipalidad responsable del registro.</p></div><InvestmentExplorer departments={departmentInvestments} initialDepartmentCode={initialDepartmentCode} initialProjects={[]} /></Container></Section>

      <Section className="bg-[#15211d] text-white"><Container><div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><Database className="h-5 w-5 text-[#d9a48f]" aria-hidden /><Eyebrow className="mt-6 text-[#d9a48f]">De herramienta a sistema</Eyebrow><Heading size="xl" className="text-white">Un observatorio institucional necesita más que una tabla.</Heading></div><div className="grid gap-px overflow-hidden rounded-md border border-white/14 bg-white/14 sm:grid-cols-2">{[
        ["Integración", "Cartera completa, hitos, contratos, avance físico, riesgos y responsables desde fuentes de la entidad."],
        ["Operación", "Alertas acordadas, rutinas de actualización, responsables de respuesta y trazabilidad de decisiones."],
        ["Dirección", "Vistas ejecutivas por objetivo, territorio, unidad y restricción para priorizar conversaciones."],
        ["Transparencia", "Definiciones, fuentes, fechas y límites visibles para comunicar sin sobreinterpretar."]
      ].map(([title, text]) => <article key={title} className="min-h-[190px] bg-[#15211d] p-6"><h2 className="text-xl font-medium tracking-[-0.025em]">{title}</h2><p className="mt-3 text-sm leading-6 text-white/55">{text}</p></article>)}</div></div><div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/14 pt-7"><p className="max-w-2xl text-xs leading-5 text-white/55">Fuente: {projectSource.publisher}, {projectSource.name}. Referencia: {projectSource.referencePeriod}. El extracto conserva hasta cinco proyectos por municipalidad y no representa la cartera completa.</p><Button href="/contact?interest=observatorio-gestion-inversiones&from=/dataperu/inversiones" variant="secondary" className="rounded-full border-white bg-white px-6 text-ink">Plantear el observatorio</Button></div></Container></Section>
    </>
  );
}

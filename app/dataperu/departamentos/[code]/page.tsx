import type { Metadata } from "next";
import { ArrowRight, BarChart3, Building2, Database, Landmark, Scale } from "lucide-react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { DepartmentResearchBrief } from "@/components/dataperu/department-research-brief";
import { Badge, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { dataperuSources, formatCurrency, formatMetric, formatPercent, renamuSource, titleCase } from "@/lib/dataperu";
import { departmentProfiles, departmentSummary, getDepartmentProfile, getDepartmentSignals } from "@/lib/dataperu-departments";
import { getDepartmentResearch } from "@/lib/department-research";
import { radarMunicipalities } from "@/lib/dataperu-radar";
import { breadcrumbJsonLd, buildMetadata, datasetJsonLd, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

interface DepartmentPageProps {
  params: Promise<{ code: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return departmentProfiles.map((department) => ({ code: department.code }));
}

export async function generateMetadata({ params }: DepartmentPageProps): Promise<Metadata> {
  const { code } = await params;
  const department = getDepartmentProfile(code);
  if (!department) return {};
  const research = getDepartmentResearch(code);
  const name = research?.department ?? titleCase(department.name);
  return buildMetadata({
    title: `${name}: perfil departamental 2025`,
    description: `Población, presupuesto, inversión y capacidades declaradas de ${department.municipalities} municipalidades de ${name}.`,
    path: `/dataperu/departamentos/${code}`,
    image: ogImagePath("departamentos", code)
  });
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { code } = await params;
  const department = getDepartmentProfile(code);
  if (!department) notFound();
  const path = `/dataperu/departamentos/${code}`;
  const research = getDepartmentResearch(code);
  const name = research?.department ?? titleCase(department.name);
  const signals = getDepartmentSignals(department);
  const topMunicipalities = radarMunicipalities.filter((item) => item.department === department.name).sort((left, right) => right.pim - left.pim).slice(0, 8);
  const contactHref = `/contact?interest=dataperu&territory=${encodeURIComponent(name)}&from=${path}`;

  const metrics = [
    { label: "Población proyectada", value: formatMetric(department.population2025), note: "INEI · 2025" },
    { label: "PIM municipal", value: formatCurrency(department.pim, true), note: `${formatCurrency(department.pimPerCapita)} por habitante` },
    { label: "Ejecución total", value: formatPercent(department.budgetExecutionPercent), note: `Perú: ${formatPercent(departmentSummary.budgetExecutionPercent)}` },
    { label: "Ejecución de inversión", value: formatPercent(department.investmentExecutionPercent), note: `Perú: ${formatPercent(departmentSummary.investmentExecutionPercent)}` }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "DataPerú", path: "/dataperu" }, { name: "Departamentos", path: "/dataperu/departamentos" }, { name, path }])} />
      <JsonLd data={datasetJsonLd({ name: `Perfil departamental de ${name} — DataPerú 2025`, description: `Agregados de población, presupuesto, inversión y capacidades declaradas de ${department.municipalities} municipalidades.`, url: `${siteConfig.url}${path}`, datePublished: renamuSource.releaseDate })} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.88fr_1fr] lg:items-end lg:gap-20">
            <div><Eyebrow className="text-[#d9a48f]">DataPerú · Perfil departamental · {code}</Eyebrow><Heading as="h1" size="display" className="max-w-[11ch] text-white">{name} en contexto.</Heading><p className="mt-7 max-w-xl text-base leading-8 text-white/66">Una lectura inicial de recursos y capacidades municipales agregadas para formular preguntas regionales. No es una evaluación de desempeño ni reemplaza el análisis institucional.</p><div className="mt-8 flex flex-wrap gap-3"><Button href={research ? "#agenda-territorial" : "#lectura"} variant="secondary" className="rounded-full border-white bg-white text-ink">{research ? "Revisar agenda" : "Revisar señales"}</Button><Button href={contactHref} variant="ghost" className="gap-2 !text-white/68 hover:!text-white">Analizar {name} <ArrowRight className="h-4 w-4" aria-hidden /></Button></div></div>
            <div className="relative overflow-hidden rounded-[1.25rem] border border-white/14 bg-[#1a2b25] p-6 md:p-8"><div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:44px_44px]" /><div className="relative flex items-center justify-between border-b border-white/14 pb-5"><span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#d9a48f]">Ficha ejecutiva</span><span className="font-mono text-[9px] text-white/55">{code} · 2025</span></div><div className="relative mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/12">{metrics.map((metric) => <div key={metric.label} className="min-h-[135px] bg-[#1a2b25] p-5"><p className="text-3xl font-medium tracking-[-0.05em]">{metric.value}</p><p className="mt-2 text-[10px] font-medium text-white/65">{metric.label}</p><p className="mt-1 text-[8px] text-white/36">{metric.note}</p></div>)}</div></div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border"><Container><div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">{[
        [formatMetric(department.municipalities), "municipalidades", `${department.provincialMunicipalities} provinciales y ${department.districtMunicipalities} distritales`],
        [formatPercent(department.internetPercent), "con internet", "respuesta declarada en RENAMU"],
        [formatPercent(department.updatedTransparencyPercent), "transparencia actualizada", `Perú: ${formatPercent(departmentSummary.updatedTransparencyPercent)}`],
        [formatPercent(department.concertedPlanPercent), "con plan concertado", `Perú: ${formatPercent(departmentSummary.concertedPlanPercent)}`]
      ].map(([value, label, note]) => <div key={label} className="min-w-0 py-7 sm:px-6 sm:first:pl-0 md:py-9"><p className="break-words text-3xl font-medium tracking-[-0.05em] text-ink">{value}</p><p className="mt-2 text-xs font-medium text-ink/72">{label}</p><p className="mt-1 text-[9px] leading-4 text-muted">{note}</p></div>)}</div></Container></section>

      {research ? <DepartmentResearchBrief research={research} contactHref={contactHref} /> : null}

      <Section id="lectura"><Container><div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><Scale className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Señales para investigar</Eyebrow><Heading size="xl">Cuatro diferencias. Cuatro preguntas.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">La comparación usa el agregado nacional como referencia descriptiva. No controla por geografía, funciones, fuentes de financiamiento ni estructura poblacional.</p></div><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">{signals.map((signal, index) => <article key={signal.title} className="min-h-[280px] bg-panel p-6"><div className="flex items-center justify-between"><Badge>{signal.label}</Badge><span className="font-mono text-[9px] text-muted">0{index + 1}</span></div><h2 className="mt-9 text-xl font-medium tracking-[-0.025em] text-ink">{signal.title}</h2><p className="mt-3 text-xs leading-5 text-ink/62">{signal.observation}</p><p className="mt-5 border-l border-rust pl-4 text-xs font-medium leading-5 text-ink/78">{signal.question}</p></article>)}</div></div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container><div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><BarChart3 className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Cartera visible</Eyebrow><Heading size="xl">Municipalidades con mayor PIM 2025.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Orden por monto presupuestal para facilitar exploración. No representa prioridad, desempeño, calidad del gasto ni necesidad relativa.</p><Button href={`/dataperu/inversiones?departamento=${code}`} variant="ghost" className="mt-6 gap-2 px-0">Explorar proyectos de {name} <ArrowRight className="h-4 w-4" aria-hidden /></Button></div><div className="overflow-hidden rounded-md border border-border bg-canvas"><div className="hidden grid-cols-[1fr_0.38fr_0.28fr_auto] gap-4 border-b border-border bg-panel px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.13em] text-muted sm:grid"><span>Municipalidad</span><span>PIM</span><span>Ejecución</span><span>Perfil</span></div><div className="divide-y divide-border">{topMunicipalities.map((municipality) => <article key={municipality.ubigeo} className="grid gap-4 px-5 py-4 sm:grid-cols-[1fr_0.38fr_0.28fr_auto] sm:items-center"><div><p className="text-sm font-medium text-ink">{titleCase(municipality.district)}</p><p className="mt-1 text-[9px] text-muted">{titleCase(municipality.province)} · {municipality.municipalityType}</p></div><p className="text-xs font-medium text-ink">{formatCurrency(municipality.pim, true)}</p><p className="text-xs text-ink/68">{formatPercent(municipality.budgetExecutionPercent)}</p><NextLink href={`/dataperu/municipios/${municipality.ubigeo}`} className="inline-flex items-center gap-1.5 text-xs font-medium text-rust">Abrir <ArrowRight className="h-3 w-3" aria-hidden /></NextLink></article>)}</div></div></div></Container></Section>

      <Section><Container><div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><Eyebrow>Qué puede construir NOAM</Eyebrow><Heading size="xl">Del perfil abierto a un sistema regional.</Heading></div><div className="grid gap-4 sm:grid-cols-3">{[
        [Landmark, "Diagnóstico regional", "Brechas, prioridades, actores, servicios y cartera para orientar una agenda verificable."],
        [Building2, "Observatorio de gestión", "Indicadores propios, responsables, alertas y seguimiento de inversiones o compromisos."],
        [Database, "Infraestructura de datos", "Fuentes integradas, definiciones, procesos de actualización y productos reutilizables."]
      ].map(([Icon, title, text]) => { const Component = Icon as typeof Landmark; return <article key={String(title)} className="rounded-md border border-border bg-panel p-6"><Component className="h-5 w-5 text-rust" aria-hidden /><h2 className="mt-10 text-xl font-medium tracking-[-0.025em] text-ink">{String(title)}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{String(text)}</p></article>; })}</div></div><div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-7"><p className="max-w-2xl text-xs leading-5 text-muted">Fuentes: {dataperuSources.population.publisher}, {dataperuSources.budget.publisher} y {renamuSource.publisher}. Los datos publicados corresponden a referencias 2025 y conservan sus límites de cobertura y declaración.</p><Button href={contactHref} className="rounded-full px-6">Plantear un análisis de {name}</Button></div></Container></Section>
    </>
  );
}

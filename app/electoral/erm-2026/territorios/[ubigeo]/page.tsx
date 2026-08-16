import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Database, FileCheck2, MapPinned } from "lucide-react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/dataperu/print-button";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container } from "@/components/ui";
import {
  dataperuSources,
  formatCurrency,
  formatMetric,
  formatPercent,
  getMunicipality,
  getMunicipalityContext,
  getMunicipalityProjects,
  getMunicipalitySignals,
  projectSource,
  renamuSource,
  sentenceCase,
  titleCase
} from "@/lib/dataperu";
import { buildErmWorkstreams, ermTransitionPhases } from "@/lib/erm-brief";
import { breadcrumbJsonLd, buildMetadata, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

interface ErmTerritoryBriefPageProps {
  params: Promise<{ ubigeo: string }>;
}

export const revalidate = 86400;

export async function generateMetadata({ params }: ErmTerritoryBriefPageProps): Promise<Metadata> {
  const { ubigeo } = await params;
  const municipality = getMunicipality(ubigeo);
  if (!municipality) return {};
  const district = titleCase(municipality.district);
  return {
    ...buildMetadata({
      title: `Brief ERM 2026 de ${district}`,
      description: `Lectura territorial inicial y secuencia de preparación de gestión para la Municipalidad ${municipality.municipalityType} de ${district}.`,
      path: `/electoral/erm-2026/territorios/${ubigeo}`,
      image: ogImagePath("municipios", ubigeo)
    }),
    robots: { index: false, follow: true }
  };
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="min-w-0 border-l border-neutral-300 pl-4">
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-500">{label}</p>
      <p className="mt-2 break-words text-2xl font-medium tracking-[-0.04em] text-neutral-950">{value}</p>
      <p className="mt-1 text-[10px] leading-4 text-neutral-500">{note}</p>
    </div>
  );
}

export default async function ErmTerritoryBriefPage({ params }: ErmTerritoryBriefPageProps) {
  const { ubigeo } = await params;
  const municipality = getMunicipality(ubigeo);
  const context = getMunicipalityContext(ubigeo);
  if (!municipality || !context) notFound();

  const projects = getMunicipalityProjects(ubigeo);
  const signals = getMunicipalitySignals(municipality, context, projects);
  const workstreams = buildErmWorkstreams(municipality, context, projects, signals);
  const district = titleCase(municipality.district);
  const province = titleCase(municipality.province);
  const department = titleCase(municipality.department);
  const path = `/electoral/erm-2026/territorios/${ubigeo}`;
  const contactHref = `/contact?interest=electoral&territory=${encodeURIComponent(`${district}, ${department}`)}&from=${encodeURIComponent(path)}`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "Electoral", path: "/electoral" },
        { name: "ERM 2026", path: "/electoral/erm-2026" },
        { name: district, path }
      ])} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Report",
        name: `Brief territorial ERM 2026 de ${district}`,
        description: "Documento de trabajo que organiza datos públicos, preguntas de decisión y una secuencia inicial de preparación de gestión.",
        url: `${siteConfig.url}${path}`,
        creator: { "@type": "Organization", name: siteConfig.legalName },
        isBasedOn: [renamuSource.datasetUrl, dataperuSources.population.pageUrl, dataperuSources.budget.datasetUrl, projectSource.resourceUrl],
        spatialCoverage: `${district}, ${department}, Perú`
      }} />

      <div className="bg-[#e5e1d6] py-8 text-neutral-950 print:bg-white print:py-0">
        <Container className="max-w-[980px] print:max-w-none print:px-0">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
            <NextLink href={`/dataperu/municipios/${ubigeo}`} className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"><ArrowLeft className="h-4 w-4" aria-hidden /> Volver al perfil territorial</NextLink>
            <div className="flex flex-wrap gap-3"><Button href={contactHref} analyticsEvent="cta_click" analyticsTarget={`erm-brief:${ubigeo}:contact`} variant="secondary">Preparar un diagnóstico</Button><PrintButton /></div>
          </div>

          <article className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-visual print:overflow-visible print:rounded-none print:border-0 print:shadow-none">
            <header className="bg-[#15211d] px-7 py-8 text-white print-color-exact md:px-12 md:py-10">
              <div className="flex flex-wrap items-start justify-between gap-6 border-b border-white/20 pb-7">
                <div><p className="text-xs font-semibold tracking-[0.2em]">NOAM · ERM 2026</p><p className="mt-2 text-[9px] uppercase tracking-[0.14em] text-white/48">Territorio · Transición · Primeros 100 días</p></div>
                <p className="font-mono text-right text-[9px] leading-4 text-white/48">DOCUMENTO DE TRABAJO 01<br />UBIGEO {ubigeo}</p>
              </div>
              <div className="grid gap-8 pt-10 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#d9a48f]">Brief territorial de preparación de gestión</p>
                  <h1 className="mt-4 text-5xl font-medium leading-none tracking-[-0.06em] md:text-7xl">{district}</h1>
                  <p className="mt-4 text-sm text-white/58">{province}, {department} · Municipalidad {municipality.municipalityType.toLocaleLowerCase("es-PE")}</p>
                </div>
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border border-white/25">
                  <span className="text-2xl font-medium tracking-[-0.04em]">04</span><span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#d9a48f]">Oct 2026</span>
                </div>
              </div>
              <p className="mt-9 max-w-3xl border-l border-[#d9a48f] pl-4 text-xs leading-5 text-white/62">Esta lectura organiza evidencia pública y preguntas de transición. No es un plan de gobierno, una auditoría ni una evaluación de desempeño. Las prioridades deben validarse con ciudadanía, equipos responsables y fuentes institucionales.</p>
            </header>

            <div className="px-7 py-8 md:px-12 md:py-10">
              <section className="grid grid-cols-2 gap-x-7 gap-y-7 border-b border-neutral-200 pb-9 md:grid-cols-4">
                <Metric label="Población 2025" value={formatMetric(context.population.projected2025)} note={`${formatPercent(context.population.change2018To2025Percent)} frente a 2018`} />
                <Metric label="PIM 2025" value={formatCurrency(context.budget.pim, true)} note={`${formatCurrency(context.budget.pimPerCapita)} por habitante`} />
                <Metric label="Ejecución total" value={formatPercent(context.budget.executionPercent)} note={`${formatCurrency(context.budget.accrued, true)} devengados`} />
                <Metric label="Inversión" value={formatPercent(context.investment.executionPercent)} note={`${formatMetric(context.investment.projectsWithBudget)} proyectos con PIM`} />
              </section>

              <section className="py-10">
                <div className="grid gap-5 md:grid-cols-[0.42fr_1fr] md:gap-12">
                  <div><p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#a44631]">01 · Lectura inicial</p><h2 className="mt-3 text-2xl font-medium tracking-[-0.035em]">Tres frentes para verificar.</h2><p className="mt-4 text-xs leading-5 text-neutral-500">Se ordenan por reglas descriptivas. No constituyen un ranking ni una conclusión cerrada.</p></div>
                  <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                    {workstreams.map((item, index) => (
                      <article key={item.id} className="break-inside-avoid py-6">
                        <div className="flex items-center justify-between gap-4"><p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#a44631]">{item.theme}</p><span className="font-mono text-[9px] text-neutral-400">0{index + 1}</span></div>
                        <p className="mt-3 text-sm leading-6 text-neutral-700">{item.observation}</p>
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          <div className="border-l border-neutral-300 pl-4"><p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-neutral-400">Pregunta de decisión</p><p className="mt-2 text-xs font-medium leading-5 text-neutral-900">{item.decisionQuestion}</p></div>
                          <div className="border-l border-neutral-300 pl-4"><p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-neutral-400">Evidencia por validar</p><p className="mt-2 text-xs leading-5 text-neutral-600">{item.evidenceToValidate}</p></div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              <section className="break-before-page border-y border-neutral-200 py-10 print:break-before-page">
                <div className="flex items-end justify-between gap-6">
                  <div><p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#a44631]">02 · Secuencia</p><h2 className="mt-3 text-2xl font-medium tracking-[-0.035em]">Del inventario a una rutina de gestión.</h2></div>
                  <MapPinned className="hidden h-5 w-5 text-[#a44631] sm:block" aria-hidden />
                </div>
                <div className="mt-7 grid gap-px overflow-hidden rounded-sm border border-neutral-200 bg-neutral-200 md:grid-cols-3">
                  {ermTransitionPhases.map((phase) => (
                    <article key={phase.range} className="break-inside-avoid bg-white p-5">
                      <p className="font-mono text-[9px] text-[#a44631]">DÍAS {phase.range}</p>
                      <h3 className="mt-7 text-lg font-medium tracking-[-0.025em]">{phase.title}</h3>
                      <p className="mt-3 text-[11px] leading-5 text-neutral-600">{phase.description}</p>
                      <p className="mt-5 border-t border-neutral-200 pt-4 text-[10px] font-medium leading-4 text-neutral-900">Salida: {phase.output}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="py-10">
                <div className="grid gap-5 md:grid-cols-[0.42fr_1fr] md:gap-12">
                  <div><p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#a44631]">03 · Hoja de ruta</p><h2 className="mt-3 text-2xl font-medium tracking-[-0.035em]">Primer hito por frente.</h2><p className="mt-4 text-xs leading-5 text-neutral-500">Una agenda operable asigna evidencia, decisión, responsable, fecha e indicador.</p></div>
                  <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                    {workstreams.map((item) => (
                      <article key={item.id} className="break-inside-avoid py-5">
                        <div className="grid gap-4 md:grid-cols-[0.34fr_1fr]">
                          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#a44631]">{item.theme}</p>
                          <div>
                            <p className="text-xs font-medium leading-5 text-neutral-900">Día 30 · {item.day30}</p>
                            <p className="mt-2 text-[10px] leading-4 text-neutral-500">Día 60 · {item.day60}</p>
                            <p className="mt-1 text-[10px] leading-4 text-neutral-500">Día 100 · {item.day100}</p>
                            <p className="mt-3 flex items-start gap-2 text-[10px] font-medium leading-4 text-neutral-700"><FileCheck2 className="mt-0.5 h-3 w-3 shrink-0 text-[#a44631]" aria-hidden /> Indicador inicial: {item.firstIndicator}</p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              {projects.length > 0 ? (
                <section className="break-inside-avoid border-t border-neutral-200 pt-9">
                  <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#a44631]">04 · Cartera visible</p><h2 className="mt-3 text-2xl font-medium tracking-[-0.035em]">Proyectos con mayor PIM.</h2></div><p className="text-[8px] uppercase tracking-[0.12em] text-neutral-400">Selección financiera · No es prioridad</p></div>
                  <div className="mt-6 grid gap-x-7 md:grid-cols-2">
                    {projects.slice(0, 4).map((project) => (
                      <div key={project.code} className="grid grid-cols-[1fr_auto] gap-4 border-t border-neutral-200 py-4">
                        <div><p className="line-clamp-2 text-[10px] font-medium leading-4 text-neutral-900">{sentenceCase(project.name)}</p><p className="mt-1 text-[8px] uppercase tracking-[0.08em] text-neutral-400">{project.code} · {sentenceCase(project.function)}</p></div>
                        <div className="text-right"><p className="text-[10px] font-medium">{formatCurrency(project.pim, true)}</p><p className="mt-1 text-[8px] text-neutral-400">{formatPercent(project.executionPercent)}</p></div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="mt-10 border-t border-neutral-950 pt-6">
                <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-start">
                  <div><div className="flex items-center gap-2"><Database className="h-3.5 w-3.5 text-[#a44631]" aria-hidden /><p className="text-[9px] font-semibold uppercase tracking-[0.14em]">Fuentes y límites</p></div><p className="mt-3 max-w-3xl text-[8px] leading-4 text-neutral-500">INEI: población proyectada al 30/06/2025. MEF: presupuesto y ejecución del año fiscal 2025. RENAMU 2025: capacidades declaradas por municipalidades. Ejecución = devengado / PIM; no mide calidad, avance físico ni impacto. La ausencia o presencia declarada de un instrumento no acredita su vigencia o uso.</p></div>
                  <p className="font-mono text-[8px] leading-4 text-neutral-400">NOAM.PE<br />GOBIERNO · DATOS · IA</p>
                </div>
              </section>
            </div>
          </article>

          <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-md border border-neutral-300 bg-white p-6 print:hidden sm:flex-row sm:items-center">
            <div><p className="text-sm font-medium text-neutral-950">¿Necesitas validar la agenda con datos internos y trabajo territorial?</p><p className="mt-1 text-xs leading-5 text-neutral-500">Podemos convertir este punto de partida en diagnóstico, transferencia o sistema de seguimiento.</p></div>
            <NextLink href={contactHref} className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[#a44631]">Plantear el contexto <ArrowRight className="h-4 w-4" aria-hidden /></NextLink>
          </div>
        </Container>
      </div>
    </>
  );
}

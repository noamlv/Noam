import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/dataperu/print-button";
import { Container } from "@/components/ui";
import {
  dataperuSources,
  formatCurrency,
  formatMetric,
  formatPercent,
  getMunicipality,
  getMunicipalityContext,
  getMunicipalityProjects,
  getMunicipalitySignals,
  renamuSource,
  sentenceCase,
  titleCase,
  yesNoLabel
} from "@/lib/dataperu";

interface MunicipalityBriefPageProps {
  params: Promise<{ ubigeo: string }>;
}

export async function generateMetadata({ params }: MunicipalityBriefPageProps): Promise<Metadata> {
  const { ubigeo } = await params;
  const municipality = getMunicipality(ubigeo);
  const district = municipality ? titleCase(municipality.district) : "Municipalidad";
  return {
    title: `Ficha ejecutiva de ${district}`,
    robots: { index: false, follow: false }
  };
}

function BriefMetric({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="border-l border-neutral-300 pl-4">
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-500">{label}</p>
      <p className="mt-2 text-2xl font-medium tracking-[-0.035em] text-neutral-950">{value}</p>
      {note ? <p className="mt-1 text-[10px] leading-4 text-neutral-500">{note}</p> : null}
    </div>
  );
}

function BriefRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-5 border-b border-neutral-200 py-2.5 last:border-0">
      <span className="text-[11px] leading-4 text-neutral-600">{label}</span>
      <strong className="text-right text-[11px] font-medium text-neutral-950">{value}</strong>
    </div>
  );
}

export default async function MunicipalityBriefPage({ params }: MunicipalityBriefPageProps) {
  const { ubigeo } = await params;
  const municipality = getMunicipality(ubigeo);
  const context = getMunicipalityContext(ubigeo);
  if (!municipality || !context) notFound();
  const projects = getMunicipalityProjects(ubigeo);
  const signals = getMunicipalitySignals(municipality, context, projects);

  const district = titleCase(municipality.district);
  const province = titleCase(municipality.province);
  const department = titleCase(municipality.department);

  return (
    <div className="bg-neutral-100 py-10 text-neutral-950 print:bg-white print:py-0">
      <Container className="max-w-[900px] print:max-w-none print:px-0">
        <div className="mb-6 flex items-center justify-between gap-4 print:hidden">
          <NextLink href={`/dataperu/municipios/${ubigeo}`} className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-950"><ArrowLeft className="h-4 w-4" /> Volver al perfil</NextLink>
          <PrintButton />
        </div>

        <article className="min-h-[1120px] rounded-md border border-neutral-200 bg-white p-8 shadow-subtle print:min-h-0 print:rounded-none print:border-0 print:p-0 print:shadow-none md:p-12">
          <header className="flex items-start justify-between gap-8 border-b border-neutral-950 pb-7">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em]">NOAM · DATAPERÚ</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-neutral-500">Ficha ejecutiva municipal · 2025</p>
            </div>
            <p className="text-right text-[10px] leading-4 text-neutral-500">Ubigeo {ubigeo}<br />Municipalidad {municipality.municipalityType.toLocaleLowerCase("es-PE")}</p>
          </header>

          <section className="py-8">
            <h1 className="text-5xl font-medium tracking-[-0.055em] text-neutral-950">{district}</h1>
            <p className="mt-3 text-base text-neutral-600">{province}, {department}</p>
            <p className="mt-5 max-w-2xl text-xs leading-5 text-neutral-600">Lectura inicial basada en fuentes públicas oficiales. Organiza señales para formular preguntas; no constituye una auditoría ni una evaluación de desempeño.</p>
          </section>

          <section className="grid grid-cols-2 gap-x-7 gap-y-7 border-y border-neutral-200 py-7 md:grid-cols-4">
            <BriefMetric label="Población proyectada" value={formatMetric(context.population.projected2025)} note={`${formatPercent(context.population.change2018To2025Percent)} frente a 2018`} />
            <BriefMetric label="PIM 2025" value={formatCurrency(context.budget.pim, true)} note={`${formatCurrency(context.budget.pimPerCapita)} por habitante`} />
            <BriefMetric label="Ejecución total" value={formatPercent(context.budget.executionPercent)} note={`${formatCurrency(context.budget.accrued, true)} devengados`} />
            <BriefMetric label="Ejecución de inversión" value={formatPercent(context.investment.executionPercent)} note={`${formatMetric(context.investment.projectsWithBudget)} proyectos con PIM`} />
          </section>

          <section className="grid gap-10 py-8 md:grid-cols-2">
            <div>
              <h2 className="text-lg font-medium tracking-[-0.025em]">Recursos e inversión</h2>
              <div className="mt-4 border-y border-neutral-200">
                <BriefRow label="Presupuesto inicial (PIA)" value={formatCurrency(context.budget.pia)} />
                <BriefRow label="Presupuesto modificado (PIM)" value={formatCurrency(context.budget.pim)} />
                <BriefRow label="Devengado total" value={formatCurrency(context.budget.accrued)} />
                <BriefRow label="PIM de inversión" value={formatCurrency(context.investment.pim)} />
                <BriefRow label="Devengado de inversión" value={formatCurrency(context.investment.accrued)} />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium tracking-[-0.025em]">Capacidades seleccionadas</h2>
              <div className="mt-4 border-y border-neutral-200">
                <BriefRow label="Servicio de internet" value={yesNoLabel(municipality.digital.hasInternet)} />
                <BriefRow label="Computadoras operativas" value={formatMetric(municipality.digital.operationalComputers)} />
                <BriefRow label="Personal reportado" value={formatMetric(municipality.workforce.reportedWorkforceTotal)} />
                <BriefRow label="Plan de desarrollo concertado" value={yesNoLabel(municipality.management.concertedDevelopmentPlan)} />
                <BriefRow label="Servicio de serenazgo" value={yesNoLabel(municipality.operations.providesSerenazgo)} />
              </div>
            </div>
          </section>

          <section className="border-t border-neutral-200 py-7">
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="text-lg font-medium tracking-[-0.025em]">Principales proyectos por PIM</h2>
              <p className="text-[9px] uppercase tracking-[0.12em] text-neutral-500">Selección financiera, no ranking</p>
            </div>
            <div className="mt-4 grid gap-x-8 md:grid-cols-2">
              {projects.slice(0, 4).map((project) => (
                <div key={project.code} className="flex items-start justify-between gap-4 border-t border-neutral-200 py-3">
                  <div><p className="line-clamp-2 text-[10px] font-medium leading-4 text-neutral-900">{sentenceCase(project.name)}</p><p className="mt-1 text-[8px] uppercase tracking-[0.08em] text-neutral-500">{project.code} · {sentenceCase(project.function)}</p></div>
                  <p className="shrink-0 text-[10px] font-medium">{formatCurrency(project.pim, true)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 border-t border-neutral-200 pt-7 md:grid-cols-[0.55fr_1fr]">
            <h2 className="text-lg font-medium tracking-[-0.025em]">Preguntas para profundizar</h2>
            <div className="grid gap-3">
              {signals.slice(0, 2).map((signal) => <p key={signal.id} className="text-[10px] leading-4 text-neutral-600"><strong className="font-medium text-neutral-900">{signal.title}:</strong> {signal.question}</p>)}
            </div>
          </section>

          <footer className="mt-9 border-t border-neutral-200 pt-5 text-[8px] leading-4 text-neutral-500">
            <p><strong>Fuentes:</strong> {dataperuSources.population.publisher}; {dataperuSources.budget.publisher}; {renamuSource.publisher}. Población proyectada al 30/06/2025. Presupuesto del año fiscal 2025. Ejecución = devengado / PIM; no mide calidad, avance físico ni impacto.</p>
            <p className="mt-2">noam.pe · Gobierno · Datos · IA</p>
          </footer>
        </article>
      </Container>
    </div>
  );
}

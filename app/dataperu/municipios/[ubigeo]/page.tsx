import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CalendarRange, Check, Database, Droplets, ExternalLink, FileDown, GraduationCap, Landmark, Minus, Monitor, ShieldCheck, TrendingUp, Users, X } from "lucide-react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { ShareActions } from "@/components/content/share-actions";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import {
  dataperuSources,
  formatCurrency,
  formatMetric,
  formatPercent,
  getContextBenchmark,
  getMunicipality,
  getMunicipalityContext,
  getMunicipalityProjects,
  getMunicipalitySignals,
  municipalities,
  projectSource,
  renamuSource,
  sentenceCase,
  titleCase,
  yesNoLabel
} from "@/lib/dataperu";
import { getMunicipalitySectorMetrics, getSectorMunicipality, sectorTopics } from "@/lib/dataperu-sectors";
import { educationRate, educationSource, getEducationDistrict } from "@/lib/dataperu-education";
import { getCoverageGap, getWaterSanitationDistrict, waterSanitationSource } from "@/lib/dataperu-water-sanitation";
import { breadcrumbJsonLd, buildMetadata, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

interface MunicipalityPageProps {
  params: Promise<{ ubigeo: string }>;
}

export const revalidate = 86400;

const featuredUbigeos = ["010101", "040101", "050101", "080101", "130101", "150101", "150122", "150132", "160101", "200101"];

export function generateStaticParams() {
  return featuredUbigeos.map((ubigeo) => ({ ubigeo }));
}

export async function generateMetadata({ params }: MunicipalityPageProps): Promise<Metadata> {
  const { ubigeo } = await params;
  const municipality = getMunicipality(ubigeo);
  if (!municipality) return {};

  const district = titleCase(municipality.district);
  const province = titleCase(municipality.province);
  const department = titleCase(municipality.department);
  return buildMetadata({
    title: `Perfil municipal de ${district}, ${province}`,
    description: `Datos oficiales 2025 de población, educación, servicios, presupuesto, inversión y capacidades de la Municipalidad ${municipality.municipalityType} de ${district}, ${province}, ${department}.`,
    path: `/dataperu/municipios/${ubigeo}`,
    image: ogImagePath("municipios", ubigeo)
  });
}

function Status({ value }: { value: boolean | null }) {
  const Icon = value === null ? Minus : value ? Check : X;
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
      <span className={`flex h-6 w-6 items-center justify-center rounded-full ${value === true ? "bg-accent text-white" : value === false ? "bg-rust/10 text-rust" : "bg-border text-muted"}`}>
        <Icon className="h-3.5 w-3.5" aria-hidden />
      </span>
      {yesNoLabel(value)}
    </span>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 border-b border-border py-4 last:border-0 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
      <p className="text-sm leading-6 text-ink/66">{label}</p>
      {children}
    </div>
  );
}

export default async function MunicipalityPage({ params }: MunicipalityPageProps) {
  const { ubigeo } = await params;
  const municipality = getMunicipality(ubigeo);
  const context = getMunicipalityContext(ubigeo);
  if (!municipality || !context) notFound();

  const contextBenchmark = getContextBenchmark(municipality.municipalityType);
  const projects = getMunicipalityProjects(municipality.ubigeo);
  const signals = getMunicipalitySignals(municipality, context, projects);
  const sectorMunicipality = getSectorMunicipality(municipality.ubigeo);
  const waterSanitation = getWaterSanitationDistrict(municipality.ubigeo);
  const education = getEducationDistrict(municipality.ubigeo);
  const sectorReadings = sectorMunicipality
    ? sectorTopics.map((topic) => ({
        ...topic,
        metrics: getMunicipalitySectorMetrics(topic.slug, sectorMunicipality).slice(0, 2)
      }))
    : [];
  const district = titleCase(municipality.district);
  const province = titleCase(municipality.province);
  const department = titleCase(municipality.department);
  const profilePath = `/dataperu/municipios/${municipality.ubigeo}`;
  const profileUrl = `${siteConfig.url}${profilePath}`;
  const contactHref = `/contact?interest=dataperu&territory=${encodeURIComponent(`${district}, ${province}, ${department}`)}&from=${encodeURIComponent(profilePath)}`;
  const relatedMunicipalities = municipalities
    .filter((item) => item.ubigeo !== municipality.ubigeo && item.department === municipality.department)
    .sort((left, right) => Number(left.province !== municipality.province) - Number(right.province !== municipality.province))
    .slice(0, 4);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "DataPerú", path: "/dataperu" },
        { name: "Perfiles municipales", path: "/dataperu/municipios" },
        { name: district, path: `/dataperu/municipios/${municipality.ubigeo}` }
      ])} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: `Perfil municipal de ${district}, ${province}, ${department} — DataPerú 2025`,
        description: "Población, educación, agua y saneamiento, presupuesto, inversión y capacidades institucionales de una municipalidad del Perú.",
        url: profileUrl,
        datePublished: renamuSource.releaseDate,
        creator: { "@type": "Organization", name: siteConfig.legalName },
        isBasedOn: [renamuSource.datasetUrl, dataperuSources.population.pageUrl, dataperuSources.budget.datasetUrl, projectSource.resourceUrl, waterSanitationSource.datasetUrl, educationSource.datasetUrl],
        license: renamuSource.license,
        spatialCoverage: `${district}, ${province}, ${department}, Perú`,
        distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${profileUrl}/data.csv` }]
      }} />

      <section className="bg-[#15211d] pb-16 pt-10 text-white md:pb-24 md:pt-14">
        <Container>
          <NextLink href="/dataperu/municipios" className="inline-flex items-center gap-2 text-xs text-white/55 hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /> Todos los perfiles</NextLink>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.5fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="border-white/20 text-white/60">Municipalidad {municipality.municipalityType}</Badge>
                <span className="text-xs text-white/55">Ubigeo {municipality.ubigeo}</span>
              </div>
              <Heading as="h1" size="display" className="mt-5 max-w-[13ch] text-white">{district}</Heading>
              <p className="mt-5 text-lg text-white/62">{province}, {department}</p>
            </div>
            <div className="border-l border-white/15 pl-6">
              <Eyebrow className="text-[#d9a48f]">Lectura responsable</Eyebrow>
              <p className="mt-3 text-sm leading-7 text-white/62">Cruce de fuentes oficiales para una lectura inicial. La ejecución financiera no equivale a calidad del gasto ni a resultados para la población.</p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                <NextLink href={`/dataperu/municipios/${municipality.ubigeo}/brief`} data-analytics-event="resource_download" data-analytics-target={`municipal-brief:${municipality.ubigeo}`} className="inline-flex items-center gap-2 text-sm font-medium text-white/72 transition-colors hover:text-white"><FileDown className="h-4 w-4" /> Ver ficha imprimible</NextLink>
                <NextLink href={`/electoral/erm-2026/territorios/${municipality.ubigeo}`} data-analytics-event="cta_click" data-analytics-target={`municipal-erm-brief:${municipality.ubigeo}`} className="inline-flex items-center gap-2 text-sm font-medium text-white/72 transition-colors hover:text-white"><CalendarRange className="h-4 w-4" /> Abrir brief ERM 2026</NextLink>
                <a href={`/dataperu/municipios/${municipality.ubigeo}/data.csv`} data-analytics-event="resource_download" data-analytics-target={`municipal-csv:${municipality.ubigeo}`} className="inline-flex items-center gap-2 text-sm font-medium text-white/72 transition-colors hover:text-white"><Database className="h-4 w-4" /> Descargar datos CSV</a>
              </div>
              <ShareActions title={`Perfil municipal de ${district}`} path={`/dataperu/municipios/${municipality.ubigeo}`} theme="dark" className="mt-5" />
            </div>
          </div>
        </Container>
      </section>

      <Section className="pb-12 md:pb-16">
        <Container>
          <div className="grid overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Población proyectada 2025", value: formatMetric(context.population.projected2025), note: `${formatPercent(context.population.change2018To2025Percent)} frente a 2018` },
              { label: "Presupuesto modificado", value: formatCurrency(context.budget.pim, true), note: `${formatCurrency(context.budget.pimPerCapita)} por habitante` },
              { label: "Ejecución presupuestal", value: formatPercent(context.budget.executionPercent), note: `Mediana ${municipality.municipalityType.toLocaleLowerCase("es-PE")}: ${formatPercent(contextBenchmark.medianBudgetExecutionPercent)}` },
              { label: "Ejecución de inversión", value: formatPercent(context.investment.executionPercent), note: `${formatMetric(context.investment.projectsWithBudget)} proyectos con PIM` }
            ].map((metric) => (
              <div key={metric.label} className="bg-panel p-6 md:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">{metric.label}</p>
                <p className="mt-5 text-3xl font-medium tracking-[-0.04em] text-ink">{metric.value}</p>
                <p className="mt-3 text-xs leading-5 text-muted">{metric.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-muted">Población proyectada al 30 de junio de 2025 y presupuesto ejecutado durante el año fiscal 2025. Los montos del MEF se redondean al sol.</p>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <article>
              <Landmark className="h-5 w-5 text-rust" aria-hidden />
              <Heading size="lg" className="mt-6">Territorio y recursos</Heading>
              <div className="mt-6 border-y border-border">
                <DetailRow label="Población proyectada al 30 de junio de 2025"><strong className="text-sm font-medium text-ink">{formatMetric(context.population.projected2025)}</strong></DetailRow>
                <DetailRow label="Variación poblacional proyectada 2018–2025"><strong className="text-sm font-medium text-ink">{formatPercent(context.population.change2018To2025Percent)}</strong></DetailRow>
                <DetailRow label="Presupuesto institucional de apertura (PIA)"><strong className="text-sm font-medium text-ink">{formatCurrency(context.budget.pia)}</strong></DetailRow>
                <DetailRow label="Presupuesto institucional modificado (PIM)"><strong className="text-sm font-medium text-ink">{formatCurrency(context.budget.pim)}</strong></DetailRow>
                <DetailRow label="Devengado"><strong className="text-sm font-medium text-ink">{formatCurrency(context.budget.accrued)}</strong></DetailRow>
                <DetailRow label="PIM por habitante"><strong className="text-sm font-medium text-ink">{formatCurrency(context.budget.pimPerCapita)}</strong></DetailRow>
              </div>
              <p className="mt-5 text-xs leading-5 text-muted">La cifra de población es una proyección oficial, no el conteo final del Censo 2025.</p>
            </article>

            <article>
              <TrendingUp className="h-5 w-5 text-rust" aria-hidden />
              <Heading size="lg" className="mt-6">Ejecución e inversión</Heading>
              <div className="mt-8 space-y-8">
                {[
                  { label: "Ejecución total", value: context.budget.executionPercent, amount: `${formatCurrency(context.budget.accrued)} devengados de ${formatCurrency(context.budget.pim)}` },
                  { label: "Ejecución de inversión", value: context.investment.executionPercent, amount: `${formatCurrency(context.investment.accrued)} devengados de ${formatCurrency(context.investment.pim)}` }
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-end justify-between gap-4"><p className="text-sm font-medium text-ink">{item.label}</p><p className="text-3xl font-medium tracking-[-0.04em] text-ink">{formatPercent(item.value)}</p></div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-border" role="img" aria-label={`${item.label}: ${formatPercent(item.value)}`}><div className="h-full rounded-full bg-rust" style={{ width: `${Math.min(item.value ?? 0, 100)}%` }} /></div>
                    <p className="mt-3 text-xs leading-5 text-muted">{item.amount}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border">
                <div className="bg-canvas p-5"><p className="text-2xl font-medium text-ink">{formatMetric(context.investment.projectsWithBudget)}</p><p className="mt-2 text-xs text-muted">proyectos con presupuesto</p></div>
                <div className="bg-canvas p-5"><p className="text-2xl font-medium text-ink">{formatPercent(contextBenchmark.medianInvestmentExecutionPercent)}</p><p className="mt-2 text-xs text-muted">mediana de inversión para municipalidades {municipality.municipalityType === "Distrital" ? "distritales" : "provinciales"}</p></div>
              </div>
            </article>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.46fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Inversión pública</Eyebrow>
              <Heading size="xl">Proyectos con mayor presupuesto.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">Hasta cinco proyectos ordenados por PIM. Esta selección muestra escala financiera; no establece prioridad, calidad ni avance físico.</p>
              <a href={projectSource.resourceUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-rust hover:text-ink">Consultar recurso MEF <ExternalLink className="h-3.5 w-3.5" /></a>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {projects.map((project) => (
                <article key={project.code} className="grid gap-5 py-6 md:grid-cols-[1fr_150px] md:items-start md:gap-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge>{titleCase(project.function)}</Badge>
                      <span className="text-[10px] uppercase tracking-[0.12em] text-muted">Proyecto {project.code}</span>
                    </div>
                    <h2 className="mt-4 text-base font-medium leading-6 text-ink">{sentenceCase(project.name)}</h2>
                  </div>
                  <div className="md:text-right">
                    <p className="text-xl font-medium tracking-[-0.03em] text-ink">{formatCurrency(project.pim, true)}</p>
                    <p className="mt-1 text-xs text-muted">PIM · {formatPercent(project.executionPercent)} ejecutado</p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border" role="img" aria-label={`Ejecución financiera: ${formatPercent(project.executionPercent)}`}><div className="h-full rounded-full bg-rust" style={{ width: `${Math.min(project.executionPercent ?? 0, 100)}%` }} /></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <article>
              <Monitor className="h-5 w-5 text-rust" aria-hidden />
              <Heading size="lg" className="mt-6">Capacidad digital</Heading>
              <div className="mt-6 border-y border-border">
                <DetailRow label="Servicio de internet"><Status value={municipality.digital.hasInternet} /></DetailRow>
                <DetailRow label="Computadoras con acceso a internet"><strong className="text-sm font-medium text-ink">{formatMetric(municipality.digital.computersWithInternet)}</strong></DetailRow>
                <DetailRow label="Cobertura sobre computadoras operativas"><strong className="text-sm font-medium text-ink">{municipality.digital.internetCoveragePercent === null ? "No informada" : `${municipality.digital.internetCoveragePercent}%`}</strong></DetailRow>
                <DetailRow label="Página web reportada"><Status value={municipality.digital.hasReportedWebsite} /></DetailRow>
                <DetailRow label="Portal de Transparencia Estándar"><strong className="max-w-xs text-left text-sm font-medium text-ink sm:text-right">{municipality.digital.transparencyPortal}</strong></DetailRow>
              </div>
            </article>

            <article>
              <Users className="h-5 w-5 text-rust" aria-hidden />
              <Heading size="lg" className="mt-6">Equipo municipal</Heading>
              <div className="mt-6 border-y border-border">
                <DetailRow label="Personal al 31 de marzo de 2025"><strong className="text-sm font-medium text-ink">{formatMetric(municipality.workforce.staffMarch2025)}</strong></DetailRow>
                <DetailRow label="Locación u orden de servicios"><strong className="text-sm font-medium text-ink">{formatMetric(municipality.workforce.serviceContractorsMarch2025)}</strong></DetailRow>
                <DetailRow label="Total de ambas categorías"><strong className="text-sm font-medium text-ink">{formatMetric(municipality.workforce.reportedWorkforceTotal)}</strong></DetailRow>
              </div>
              <p className="mt-5 text-xs leading-5 text-muted">El total es una suma descriptiva de las dos categorías publicadas y no representa necesariamente la totalidad de vínculos laborales.</p>
            </article>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <article>
              <Eyebrow>Gestión</Eyebrow>
              <Heading size="lg">Instrumentos reportados</Heading>
              <div className="mt-6 border-y border-border">
                <DetailRow label="Plan de Desarrollo Municipal Concertado"><Status value={municipality.management.concertedDevelopmentPlan} /></DetailRow>
                <DetailRow label="Plan Estratégico Institucional"><Status value={municipality.management.institutionalStrategicPlan} /></DetailRow>
                <DetailRow label="Plan de Desarrollo Económico Local"><Status value={municipality.management.localEconomicDevelopmentPlan} /></DetailRow>
                <DetailRow label="Reglamento de Organización y Funciones"><Status value={municipality.management.organizationFunctionsRegulation} /></DetailRow>
                <DetailRow label="Manual de Organización y Funciones / Perfiles"><Status value={municipality.management.organizationFunctionsManual} /></DetailRow>
                <DetailRow label="Cuadro de Asignación de Personal"><Status value={municipality.management.personnelAssignmentTable} /></DetailRow>
              </div>
              <p className="mt-5 text-xs leading-5 text-muted">RENAMU pregunta si el instrumento existe. Esta ficha no verifica su vigencia, calidad ni uso efectivo.</p>
            </article>

            <article>
              <ShieldCheck className="h-5 w-5 text-rust" aria-hidden />
              <Heading size="lg" className="mt-6">Operación y respuesta</Heading>
              <div className="mt-6 border-y border-border">
                <DetailRow label="Brinda servicio de serenazgo"><Status value={municipality.operations.providesSerenazgo} /></DetailRow>
                <DetailRow label="Centro de Operaciones de Emergencia Local"><strong className="max-w-xs text-left text-sm font-medium text-ink sm:text-right">{municipality.operations.coelStatus}</strong></DetailRow>
                <DetailRow label="Funcionamiento del COEL"><strong className="max-w-xs text-left text-sm font-medium text-ink sm:text-right">{municipality.operations.coelOperation ?? "No aplica o no informado"}</strong></DetailRow>
                <DetailRow label="Almacén local de ayuda humanitaria"><Status value={municipality.operations.hasHumanitarianWarehouse} /></DetailRow>
              </div>
            </article>
          </div>
        </Container>
      </Section>

      {waterSanitation ? (
        <Section className="border-y border-border bg-panel/45">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
              <div>
                <Droplets className="h-5 w-5 text-rust" aria-hidden />
                <Eyebrow className="mt-6">Agua y saneamiento</Eyebrow>
                <Heading size="xl">Conexión a red pública en viviendas.</Heading>
                <p className="mt-5 text-sm leading-7 text-ink/65">Resultados de los Censos Nacionales 2025. No demuestran continuidad, potabilidad, presión ni tratamiento de aguas residuales.</p>
              </div>
              <div>
                <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
                  {[
                    { label: "Agua por red pública", value: formatPercent(waterSanitation.waterNetwork.percent), note: `${formatMetric(waterSanitation.waterNetwork.value)} viviendas` },
                    { label: "Saneamiento por red pública", value: formatPercent(waterSanitation.sanitationNetwork.percent), note: `${formatMetric(waterSanitation.sanitationNetwork.value)} viviendas` },
                    { label: "Viviendas del universo", value: formatMetric(waterSanitation.occupiedHousing), note: "ocupadas con personas presentes" }
                  ].map((metric) => (
                    <div key={metric.label} className="bg-panel p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{metric.label}</p>
                      <p className="mt-3 text-2xl font-medium tracking-[-0.035em] text-ink">{metric.value}</p>
                      <p className="mt-1 text-xs leading-5 text-muted">{metric.note}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-5 text-muted">Brecha descriptiva: {formatMetric(getCoverageGap(waterSanitation, "waterNetwork"))} viviendas sin agua por red y {formatMetric(getCoverageGap(waterSanitation, "sanitationNetwork"))} sin saneamiento por red dentro del universo censal.</p>
                <NextLink href={`/dataperu/agua-saneamiento?q=${municipality.ubigeo}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-rust hover:text-ink">Comparar con otros distritos <ArrowRight className="h-3.5 w-3.5" aria-hidden /></NextLink>
                <p className="mt-3 text-[11px] leading-5 text-muted">Fuente: {waterSanitationSource.publisher}.</p>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {education ? (
        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
              <div>
                <GraduationCap className="h-5 w-5 text-rust" aria-hidden />
                <Eyebrow className="mt-6">Educación</Eyebrow>
                <Heading size="xl">Matrícula de Educación Básica Regular.</Heading>
                <p className="mt-5 text-sm leading-7 text-ink/65">Censo Educativo 2025. La matrícula registrada no demuestra asistencia, permanencia, aprendizaje ni calidad del servicio.</p>
              </div>
              <div>
                <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-4">
                  {[
                    { label: "Matrícula EBR", value: formatMetric(education.enrollment.total), note: `${formatMetric(education.servicePrograms.total)} servicios o programas` },
                    { label: "Ámbito rural", value: formatPercent(educationRate(education.enrollment.rural, education.enrollment.total)), note: `${formatMetric(education.enrollment.rural)} estudiantes` },
                    { label: "Gestión pública", value: formatPercent(educationRate(education.enrollment.publicManagement, education.enrollment.total)), note: `${formatMetric(education.enrollment.publicManagement)} estudiantes` },
                    { label: "Datos de informante", value: formatPercent(educationRate(education.provenance.informantRecords, education.servicePrograms.total)), note: `${formatMetric(education.provenance.informantRecords)} registros` }
                  ].map((metric) => (
                    <div key={metric.label} className="bg-panel p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{metric.label}</p>
                      <p className="mt-3 text-2xl font-medium tracking-[-0.035em] text-ink">{metric.value}</p>
                      <p className="mt-1 text-xs leading-5 text-muted">{metric.note}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-4 border-y border-border py-4 text-xs sm:grid-cols-3">
                  <p><span className="text-muted">Inicial</span><strong className="mt-1 block font-medium text-ink">{formatMetric(education.enrollment.initial)}</strong></p>
                  <p><span className="text-muted">Primaria</span><strong className="mt-1 block font-medium text-ink">{formatMetric(education.enrollment.primary)}</strong></p>
                  <p><span className="text-muted">Secundaria</span><strong className="mt-1 block font-medium text-ink">{formatMetric(education.enrollment.secondary)}</strong></p>
                </div>
                <NextLink href={`/dataperu/educacion?q=${municipality.ubigeo}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-rust hover:text-ink">Comparar con otros distritos <ArrowRight className="h-3.5 w-3.5" aria-hidden /></NextLink>
                <p className="mt-3 text-[11px] leading-5 text-muted">Fuente: {educationSource.publisher}. Los registros con imputación parcial o total se identifican en el explorador nacional.</p>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {sectorReadings.length > 0 ? (
        <Section id="gestion-sectorial" className="border-y border-border bg-panel/45">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
              <div>
                <Eyebrow>Lecturas sectoriales</Eyebrow>
                <Heading size="xl">Cinco entradas a la gestión local.</Heading>
                <p className="mt-5 text-sm leading-7 text-ink/65">Variables declaradas que ayudan a formular preguntas. No califican desempeño ni reemplazan evidencia territorial.</p>
              </div>
              <div className="divide-y divide-border border-y border-border">
                {sectorReadings.map((reading) => (
                  <NextLink key={reading.slug} href={`/dataperu/temas/${reading.slug}`} className="group grid gap-5 py-5 sm:grid-cols-[1fr_1.2fr_auto] sm:items-center">
                    <span>
                      <span className="block text-base font-medium text-ink group-hover:text-rust">{reading.shortTitle}</span>
                      <span className="mt-1 block text-xs text-muted">{reading.kicker}</span>
                    </span>
                    <span className="grid grid-cols-2 gap-4">
                      {reading.metrics.map((metric) => (
                        <span key={metric.label}><span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{metric.label}</span><span className="mt-1 block text-sm text-ink/72">{metric.value}</span></span>
                      ))}
                    </span>
                    <ArrowRight className="h-4 w-4 text-rust transition-transform group-hover:translate-x-1" aria-hidden />
                  </NextLink>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      <Section className="border-y border-border bg-[#15211d] text-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.46fr_1fr] lg:gap-20">
            <div>
              <Eyebrow className="text-[#d9a48f]">Lectura inicial</Eyebrow>
              <Heading size="xl" className="text-white">Señales para profundizar.</Heading>
              <p className="mt-5 text-sm leading-7 text-white/60">Reglas descriptivas convierten datos públicos en preguntas de gestión. No son hallazgos concluyentes ni sustituyen el análisis institucional.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-2">
              {signals.map((signal) => (
                <article key={signal.id} className="flex min-h-[280px] flex-col bg-[#192822] p-6 md:p-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d9a48f]">{signal.label}</p>
                  <h2 className="mt-4 text-xl font-medium leading-tight tracking-[-0.025em] text-white">{signal.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-white/60">{signal.observation}</p>
                  <p className="mt-4 border-l border-white/15 pl-4 text-sm leading-6 text-white/78">{signal.question}</p>
                  <NextLink href={signal.serviceHref} className="group mt-auto inline-flex items-center gap-2 pt-6 text-xs font-medium text-white/72 hover:text-white">{signal.serviceLabel}<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></NextLink>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/55">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.62fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>De la ficha a la decisión</Eyebrow>
              <Heading size="xl">Los datos abren preguntas. El trabajo empieza al responderlas.</Heading>
            </div>
            <div>
              <p className="text-base leading-8 text-ink/68">NOAM puede ampliar esta línea de base con servicios, encuestas, trabajo territorial, cartera de inversiones y datos internos para construir un diagnóstico o sistema de seguimiento útil para la gestión.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={contactHref} analyticsEvent="cta_click" analyticsTarget={`municipality:${municipality.ubigeo}:contact`}>Solicitar diagnóstico</Button>
                <Button href="/services/observatorios-sistemas-decision" variant="secondary">Explorar observatorios</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.38fr_1fr] lg:gap-20">
            <div><Eyebrow>Explorar el entorno</Eyebrow><Heading size="lg">Otros perfiles de {department}.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Continúa la lectura dentro de la provincia y el departamento. Cada ficha utiliza la misma arquitectura de fuentes y límites.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {relatedMunicipalities.map((item) => <NextLink key={item.ubigeo} href={`/dataperu/municipios/${item.ubigeo}`} className="group min-h-[180px] bg-canvas p-6 transition-colors hover:bg-panel"><span className="font-mono text-[10px] text-rust">{item.ubigeo}</span><h2 className="mt-8 text-xl font-medium tracking-[-0.03em] text-ink group-hover:text-rust">{titleCase(item.district)}</h2><p className="mt-2 text-xs text-muted">{titleCase(item.province)} · Municipalidad {item.municipalityType.toLocaleLowerCase("es-PE")}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-rust">Abrir perfil <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span></NextLink>)}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="grid gap-8 border-t border-border pt-10 md:grid-cols-[0.65fr_1fr] md:gap-16">
            <Heading size="md">Fuente y metodología</Heading>
            <div className="space-y-4 text-sm leading-7 text-ink/65">
              <p><strong className="font-medium text-ink">Población:</strong> {dataperuSources.population.name}, {dataperuSources.population.publisher}.</p>
              <p><strong className="font-medium text-ink">Presupuesto:</strong> {dataperuSources.budget.name}, {dataperuSources.budget.publisher}.</p>
              <p><strong className="font-medium text-ink">Proyectos:</strong> {projectSource.name}, {projectSource.publisher}. {projectSource.notes}</p>
              <p><strong className="font-medium text-ink">Capacidades:</strong> {renamuSource.name}, {renamuSource.publisher}. {renamuSource.notes}</p>
              <p><strong className="font-medium text-ink">Educación:</strong> {educationSource.name}, {educationSource.publisher}. Matrícula no equivale a asistencia ni aprendizaje.</p>
              <p>La ejecución financiera describe avance del gasto, no su calidad, pertinencia, avance físico ni impacto.</p>
              <div className="flex flex-wrap gap-5">
                <a href={dataperuSources.population.pageUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-rust hover:text-ink">Fuente INEI <ExternalLink className="h-3.5 w-3.5" /></a>
                <a href={dataperuSources.budget.pageUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-rust hover:text-ink">Fuente MEF <ExternalLink className="h-3.5 w-3.5" /></a>
                <a href={renamuSource.datasetUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-rust hover:text-ink">Fuente RENAMU <ExternalLink className="h-3.5 w-3.5" /></a>
                <a href={educationSource.datasetUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-rust hover:text-ink">Fuente Minedu <ExternalLink className="h-3.5 w-3.5" /></a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

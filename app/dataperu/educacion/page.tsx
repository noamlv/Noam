import { ArrowRight, BookOpenCheck, Database, FileDown, GraduationCap, ShieldCheck } from "lucide-react";
import NextLink from "next/link";
import { EducationExplorer, type EducationSearchItem } from "@/components/dataperu/education-explorer";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { formatMetric, municipalities } from "@/lib/dataperu";
import { educationDefinitions, educationDistricts, educationSource, educationSummary } from "@/lib/dataperu-education";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: "Matrícula escolar por distrito en Perú",
  description: "Explora matrícula de Educación Básica Regular, nivel, área, gestión y procedencia del dato en 1,892 distritos del Perú con información oficial del Minedu 2025.",
  path: "/dataperu/educacion"
});

const percent = (value: number | null) => value == null ? "No disponible" : `${value.toLocaleString("es-PE", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

export default async function EducationPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const municipalProfiles = new Set(municipalities.map((municipality) => municipality.ubigeo));
  const items: EducationSearchItem[] = educationDistricts.map((district) => ({
    ...district,
    hasMunicipalProfile: municipalProfiles.has(district.ubigeo)
  }));
  const pageUrl = `${siteConfig.url}/dataperu/educacion`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "DataPerú", path: "/dataperu" },
        { name: "Educación", path: "/dataperu/educacion" }
      ])} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: "Matrícula de Educación Básica Regular por distrito en Perú 2025",
        description: "Matrícula EBR por distrito, sexo, área, gestión y nivel para los 1,892 distritos del Perú.",
        url: pageUrl,
        datePublished: educationSource.resourcePublishedAt,
        creator: { "@type": "Organization", name: siteConfig.legalName },
        publisher: { "@type": "Organization", name: educationSource.publisher },
        isBasedOn: educationSource.datasetUrl,
        license: educationSource.license,
        spatialCoverage: { "@type": "Country", name: "Perú" },
        temporalCoverage: educationSource.referencePeriod,
        variableMeasured: [educationDefinitions.enrollment, educationDefinitions.rural, educationDefinitions.publicManagement, educationDefinitions.provenance],
        distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${pageUrl}/data.csv` }]
      }} />

      <section className="overflow-hidden bg-[#15211d] pb-20 pt-14 text-white md:pb-28 md:pt-20">
        <Container>
          <NextLink href="/dataperu/temas" className="text-xs text-white/55 transition-colors hover:text-white">DataPerú / Temas de gestión</NextLink>
          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.52fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="text-[#d9a48f]">Censo Educativo 2025 · Minedu</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[13ch] text-white">Matrícula escolar, distrito por distrito.</Heading>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/66">Una lectura nacional de Educación Básica Regular para comparar escala, composición territorial y procedencia de los registros antes de diseñar una intervención.</p>
              <a href="/dataperu/educacion/data.csv" data-analytics-event="resource_download" data-analytics-target="education:minedu-ebr-2025-csv" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-white/72 transition-colors hover:text-white"><FileDown className="h-4 w-4" aria-hidden /> Descargar datos CSV</a>
            </div>
            <div className="border-l border-white/15 pl-6">
              <GraduationCap className="h-5 w-5 text-[#d9a48f]" aria-hidden />
              <p className="mt-5 text-4xl font-medium tracking-[-0.05em]">{formatMetric(educationSummary.enrollment.total)}</p>
              <p className="mt-2 max-w-xs text-xs leading-5 text-white/52">estudiantes matriculados en servicios y programas de EBR durante 2025</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-panel/55 py-8">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: formatMetric(educationSummary.servicePrograms.total), label: "servicios o programas con matrícula" },
              { value: percent(educationSummary.rates.ruralEnrollmentPercent), label: "de la matrícula en ámbito rural" },
              { value: percent(educationSummary.rates.publicManagementEnrollmentPercent), label: "de la matrícula en gestión pública" },
              { value: percent(educationSummary.rates.informantRecordsPercent), label: "de registros con datos de informante" }
            ].map((metric) => (
              <div key={metric.label} className="border-l border-border pl-5">
                <p className="text-2xl font-medium tracking-[-0.035em] text-ink">{metric.value}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{metric.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[11px] leading-5 text-muted">Los totales agregan registros distritales. Gestión pública incluye gestión directa y pública de gestión privada.</p>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Explorador nacional</Eyebrow>
              <Heading size="xl">Busca un territorio y compara su matrícula.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">Filtra por departamento, peso rural, gestión o procedencia del dato. Las proporciones se recalculan con sus denominadores reales.</p>
            </div>
            <EducationExplorer items={items} initialQuery={q?.slice(0, 100)} />
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/55">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <ShieldCheck className="h-5 w-5 text-rust" aria-hidden />
              <Eyebrow className="mt-6">Cómo interpretar</Eyebrow>
              <Heading size="lg">Matrícula no equivale a aprendizaje.</Heading>
            </div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {[
                { title: "Qué sí responde", text: "Cuántos estudiantes están matriculados en EBR y cómo se distribuyen por sexo, nivel, ámbito y tipo de gestión en cada distrito." },
                { title: "Qué no responde", text: "No mide asistencia, permanencia, aprendizaje, calidad docente, suficiencia de infraestructura ni causalidad de una intervención." },
                { title: "Unidad de análisis", text: "Cada registro corresponde a un código modular de servicio o programa. No debe interpretarse automáticamente como un local físico distinto." },
                { title: "Uso recomendado", text: "Dimensionar una población educativa, localizar preguntas y luego integrar trayectorias, condiciones del servicio, ENLA y evidencia de campo." }
              ].map((item) => (
                <article key={item.title} className="bg-panel p-6 md:p-7">
                  <h2 className="text-base font-medium text-ink">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-ink/64">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <Database className="h-5 w-5 text-rust" aria-hidden />
              <Eyebrow className="mt-6">Fuente y método</Eyebrow>
              <Heading size="lg">Una línea de base con límites visibles.</Heading>
            </div>
            <div className="divide-y divide-border border-y border-border">
              <div className="grid gap-3 py-5 sm:grid-cols-[150px_1fr]"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Fuente</p><p className="text-sm leading-7 text-ink/68">{educationSource.publisher}. {educationSource.name}.</p></div>
              <div className="grid gap-3 py-5 sm:grid-cols-[150px_1fr]"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Periodo</p><p className="text-sm leading-7 text-ink/68">Matrícula {educationSource.referencePeriod}; recurso publicado el {new Date(`${educationSource.resourcePublishedAt}T12:00:00Z`).toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric", timeZone: "America/Lima" })} y consultado el {new Date(educationSource.retrievedAt).toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric", timeZone: "America/Lima" })}.</p></div>
              <div className="grid gap-3 py-5 sm:grid-cols-[150px_1fr]"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Cobertura</p><p className="text-sm leading-7 text-ink/68">1,892 distritos. 1,891 enlazan con perfiles municipales RENAMU; Santa Rosa de Loreto todavía no tiene una ficha municipal equivalente.</p></div>
              <div className="grid gap-3 py-5 sm:grid-cols-[150px_1fr]"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Procedencia</p><p className="text-sm leading-7 text-ink/68">La fuente identifica {formatMetric(educationSummary.provenance.partialImputationRecords)} registros con imputación parcial y {formatMetric(educationSummary.provenance.totalImputationRecords)} con imputación total. El explorador permite localizarlos.</p></div>
              <div className="grid gap-3 py-5 sm:grid-cols-[150px_1fr]"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Consulta oficial</p><p className="text-sm leading-7 text-ink/68"><a href={educationSource.datasetUrl} target="_blank" rel="noreferrer" className="font-medium text-rust hover:text-ink">Abrir Datos Abiertos Perú</a>. El archivo procesado conserva un hash SHA-256 para verificar la versión utilizada.</p></div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="grid gap-8 rounded-lg bg-accent px-7 py-10 text-accent-ink md:grid-cols-[1fr_auto] md:items-end md:px-12 md:py-14">
            <div>
              <BookOpenCheck className="h-5 w-5 text-[#d9a48f]" aria-hidden />
              <Eyebrow className="mt-6 text-[#d9a48f]">De matrícula a decisión</Eyebrow>
              <Heading size="xl" className="max-w-[18ch] text-white">Diseñemos un diagnóstico educativo para tu territorio.</Heading>
              <div className="mt-6 flex flex-wrap gap-5 text-xs text-white/62">
                <NextLink href="/analisis-datos-educacion-territorial" className="inline-flex items-center gap-2 hover:text-white">Ver capacidad NOAM <ArrowRight className="h-3.5 w-3.5" /></NextLink>
                <NextLink href="/toolkits/tdr-analisis-educacion-territorial" className="inline-flex items-center gap-2 hover:text-white">Preparar TDR <ArrowRight className="h-3.5 w-3.5" /></NextLink>
              </div>
            </div>
            <Button href="/contact?interest=educacion-territorial&from=/dataperu/educacion" variant="secondary" className="rounded-full border-white bg-white text-ink">Plantear una necesidad</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

import { ArrowRight, Database, Droplets, FileDown, ShieldCheck } from "lucide-react";
import NextLink from "next/link";
import { WaterSanitationExplorer, type WaterSanitationSearchItem } from "@/components/dataperu/water-sanitation-explorer";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { formatMetric, municipalities } from "@/lib/dataperu";
import { waterSanitationDefinitions, waterSanitationDistricts, waterSanitationSource, waterSanitationSummary } from "@/lib/dataperu-water-sanitation";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: "Agua y saneamiento por distrito en Perú",
  description: "Explora la cobertura de agua y saneamiento por red pública en 1,892 distritos del Perú con resultados oficiales de los Censos Nacionales 2025 del INEI.",
  path: "/dataperu/agua-saneamiento"
});

const percent = (value: number | null) => value == null ? "No disponible" : `${value.toLocaleString("es-PE", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

export default async function WaterSanitationPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const municipalProfiles = new Set(municipalities.map((municipality) => municipality.ubigeo));
  const items: WaterSanitationSearchItem[] = waterSanitationDistricts.map((district) => ({
    ubigeo: district.ubigeo,
    department: district.department,
    province: district.province,
    district: district.district,
    occupiedHousing: district.occupiedHousing,
    waterNetwork: district.waterNetwork,
    sanitationNetwork: district.sanitationNetwork,
    hasMunicipalProfile: municipalProfiles.has(district.ubigeo)
  }));
  const pageUrl = `${siteConfig.url}/dataperu/agua-saneamiento`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "DataPerú", path: "/dataperu" },
        { name: "Agua y saneamiento", path: "/dataperu/agua-saneamiento" }
      ])} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: "Agua y saneamiento por distrito en Perú — Censos Nacionales 2025",
        description: "Viviendas particulares ocupadas con personas presentes, abastecimiento de agua por red pública y servicio higiénico conectado a red pública para 1,892 distritos del Perú.",
        url: pageUrl,
        datePublished: waterSanitationSource.referencePeriod,
        creator: { "@type": "Organization", name: siteConfig.legalName },
        publisher: { "@type": "Organization", name: waterSanitationSource.publisher },
        isBasedOn: waterSanitationSource.datasetUrl,
        spatialCoverage: { "@type": "Country", name: "Perú" },
        temporalCoverage: waterSanitationSource.referencePeriod,
        variableMeasured: [waterSanitationDefinitions.occupiedHousing, waterSanitationDefinitions.waterNetwork, waterSanitationDefinitions.sanitationNetwork],
        distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${pageUrl}/data.csv` }]
      }} />

      <section className="overflow-hidden bg-[#15211d] pb-20 pt-14 text-white md:pb-28 md:pt-20">
        <Container>
          <NextLink href="/dataperu/temas" className="text-xs text-white/55 transition-colors hover:text-white">DataPerú / Temas de gestión</NextLink>
          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.52fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="text-[#d9a48f]">Censos Nacionales 2025 · INEI</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[13ch] text-white">Agua y saneamiento, distrito por distrito.</Heading>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/66">Una lectura nacional para localizar brechas de conexión a red pública, comparar territorios y formular mejores preguntas antes de diseñar una intervención.</p>
              <a href="/dataperu/agua-saneamiento/data.csv" data-analytics-event="resource_download" data-analytics-target="water-sanitation:census-2025-csv" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-white/72 transition-colors hover:text-white"><FileDown className="h-4 w-4" aria-hidden /> Descargar datos CSV</a>
            </div>
            <div className="border-l border-white/15 pl-6">
              <Droplets className="h-5 w-5 text-[#d9a48f]" aria-hidden />
              <p className="mt-5 text-4xl font-medium tracking-[-0.05em]">{formatMetric(waterSanitationSummary.districts)}</p>
              <p className="mt-2 max-w-xs text-xs leading-5 text-white/52">distritos con valores completos para el universo de viviendas y ambos indicadores</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-panel/55 py-8">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: percent(waterSanitationSummary.waterNetwork.percent), label: "viviendas con agua por red pública" },
              { value: percent(waterSanitationSummary.sanitationNetwork.percent), label: "viviendas con saneamiento por red pública" },
              { value: formatMetric(waterSanitationSummary.occupiedHousing), label: "viviendas del universo censal" },
              { value: formatMetric(waterSanitationSummary.departments), label: "departamentos comparables" }
            ].map((metric) => (
              <div key={metric.label} className="border-l border-border pl-5">
                <p className="text-2xl font-medium tracking-[-0.035em] text-ink">{metric.value}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{metric.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[11px] leading-5 text-muted">Resultados agregados desde los valores distritales. El denominador es viviendas particulares ocupadas con personas presentes que viven permanentemente.</p>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Explorador nacional</Eyebrow>
              <Heading size="xl">Busca un territorio y dimensiona su brecha.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">Filtra por departamento, cobertura o magnitud absoluta. Las tasas de cada selección se recalculan con viviendas, no con promedios simples de distritos.</p>
            </div>
            <WaterSanitationExplorer items={items} initialQuery={q?.slice(0, 100)} />
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/55">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <ShieldCheck className="h-5 w-5 text-rust" aria-hidden />
              <Eyebrow className="mt-6">Cómo interpretar</Eyebrow>
              <Heading size="lg">Una conexión no describe todo el servicio.</Heading>
            </div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {[
                { title: "Qué sí responde", text: "Cuántas viviendas del universo censal tienen abastecimiento de agua o servicio higiénico conectado a red pública." },
                { title: "Qué no responde", text: "No acredita continuidad, presión, potabilidad, calidad del agua, tratamiento de aguas residuales ni sostenibilidad del prestador." },
                { title: "Unidad de análisis", text: "La unidad es la vivienda, no la persona, el sistema de agua, la JASS, la EPS ni la municipalidad." },
                { title: "Uso recomendado", text: "Priorizar territorios para contraste de campo, integrar registros operativos y diseñar diagnósticos, inversiones o sistemas de seguimiento." }
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
              <Heading size="lg">Trazabilidad antes que apariencia.</Heading>
            </div>
            <div className="divide-y divide-border border-y border-border">
              <div className="grid gap-3 py-5 sm:grid-cols-[150px_1fr]"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Fuente</p><p className="text-sm leading-7 text-ink/68">{waterSanitationSource.publisher}. {waterSanitationSource.name}.</p></div>
              <div className="grid gap-3 py-5 sm:grid-cols-[150px_1fr]"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Periodo</p><p className="text-sm leading-7 text-ink/68">Resultados censales {waterSanitationSource.referencePeriod}; datos consultados el {new Date(waterSanitationSource.retrievedAt).toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric", timeZone: "America/Lima" })}.</p></div>
              <div className="grid gap-3 py-5 sm:grid-cols-[150px_1fr]"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Cobertura</p><p className="text-sm leading-7 text-ink/68">1,892 distritos censales. 1,891 enlazan con perfiles municipales RENAMU; Santa Rosa de Loreto aparece en el Censo 2025 y todavía no tiene ficha RENAMU equivalente.</p></div>
              <div className="grid gap-3 py-5 sm:grid-cols-[150px_1fr]"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Consulta oficial</p><p className="text-sm leading-7 text-ink/68"><a href={waterSanitationSource.datasetUrl} target="_blank" rel="noreferrer" className="font-medium text-rust hover:text-ink">Abrir plataforma del INEI</a>. Los indicadores y denominadores se conservan por ubigeo para auditoría y actualización.</p></div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="grid gap-8 rounded-lg bg-accent px-7 py-10 text-accent-ink md:grid-cols-[1fr_auto] md:items-end md:px-12 md:py-14">
            <div>
              <Eyebrow className="text-[#d9a48f]">De cobertura a gestión</Eyebrow>
              <Heading size="xl" className="max-w-[18ch] text-white">Convierte esta señal en un diagnóstico de servicio.</Heading>
              <div className="mt-6 flex flex-wrap gap-5 text-xs text-white/62">
                <NextLink href="/analisis-datos-agua-saneamiento" className="inline-flex items-center gap-2 hover:text-white">Ver capacidad NOAM <ArrowRight className="h-3.5 w-3.5" /></NextLink>
                <NextLink href="/toolkits/tdr-analisis-agua-saneamiento" className="inline-flex items-center gap-2 hover:text-white">Preparar TDR <ArrowRight className="h-3.5 w-3.5" /></NextLink>
              </div>
            </div>
            <Button href="/contact?interest=agua-saneamiento&from=/dataperu/agua-saneamiento" variant="secondary" className="rounded-full border-white bg-white text-ink">Plantear una necesidad</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

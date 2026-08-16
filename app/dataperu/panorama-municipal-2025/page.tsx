import { ArrowRight, Database, Download, Scale, ShieldCheck } from "lucide-react";
import NextLink from "next/link";
import { DepartmentEvidenceTable, MunicipalityTypeComparison, PanoramaHeroVisual, PanoramaRangeChart } from "@/components/dataperu/panorama-visuals";
import { ShareActions } from "@/components/content/share-actions";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { dataperuSources, renamuSource } from "@/lib/dataperu";
import { panoramaFindings, panoramaNationalMetrics, panoramaPublicationDate } from "@/lib/dataperu-panorama";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata, datasetJsonLd, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/dataperu/panorama-municipal-2025";

export const metadata = buildMetadata({
  title: "Panorama municipal del Perú 2025",
  description: "Una lectura ejecutiva de recursos, inversión y capacidades declaradas en 1,891 municipalidades y 25 departamentos.",
  path,
  image: ogImagePath("dataperu", "panorama-municipal-2025"),
  type: "article"
});

export default function MunicipalPanoramaPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "DataPerú", path: "/dataperu" }, { name: "Panorama municipal 2025", path }])} />
      <JsonLd data={articleJsonLd({ title: "Panorama municipal del Perú 2025", description: "Una lectura ejecutiva de recursos, inversión y capacidades declaradas en 1,891 municipalidades y 25 departamentos.", datePublished: panoramaPublicationDate, url: `${siteConfig.url}${path}`, image: `${siteConfig.url}${ogImagePath("dataperu", "panorama-municipal-2025")}` })} />
      <JsonLd data={datasetJsonLd({ name: "Panorama municipal del Perú 2025 · Agregados departamentales", description: "Indicadores agregados de población, presupuesto, inversión y capacidades declaradas por municipalidades.", url: `${siteConfig.url}${path}`, datePublished: panoramaPublicationDate })} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.92fr_1fr] lg:items-center lg:gap-20">
            <div>
              <Eyebrow className="reveal text-[#d9a48f]">Estudio insignia · DataPerú</Eyebrow>
              <Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[11ch] text-white">El Perú municipal no cabe en un promedio.</Heading>
              <p className="reveal reveal-delay-2 mt-7 max-w-xl text-base leading-8 text-white/66">Una lectura ejecutiva de recursos, inversión y capacidades declaradas en 1,891 gobiernos locales. Las diferencias no entregan un veredicto: ayudan a formular mejores preguntas.</p>
              <div className="reveal reveal-delay-3 mt-8 flex flex-wrap items-center gap-3"><Button href="#hallazgos" variant="secondary" className="rounded-full border-white bg-white text-ink">Leer hallazgos</Button><ShareActions title="Panorama municipal del Perú 2025" path={path} theme="dark" /></div>
            </div>
            <PanoramaHeroVisual />
          </div>
        </Container>
      </section>

      <section className="border-b border-border"><Container><div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">{panoramaNationalMetrics.map((metric) => <div key={metric.label} className="min-w-0 py-7 sm:px-6 sm:first:pl-0 md:py-9"><p className="break-words text-3xl font-medium tracking-[-0.05em] text-ink">{metric.value}</p><p className="mt-2 text-xs font-medium text-ink/72">{metric.label}</p><p className="mt-1 text-[9px] leading-4 text-muted">{metric.note}</p></div>)}</div></Container></section>

      <Section id="hallazgos">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.58fr_1fr] md:items-end"><div><Eyebrow>Cuatro lecturas</Eyebrow><Heading size="xl">Diferencias que cambian el diseño de una intervención.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Cada cifra conserva su unidad de análisis. Una asociación descriptiva no se presenta como causa y una declaración institucional no se trata como resultado verificado.</p></div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border lg:grid-cols-2">{panoramaFindings.map((finding) => <article key={finding.number} className="min-h-[330px] bg-canvas p-6 md:p-8"><div className="flex items-center justify-between"><span className="font-mono text-[10px] text-rust">{finding.number}</span><span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">{finding.label}</span></div><p className="mt-12 text-4xl font-medium tracking-[-0.055em] text-ink md:text-5xl">{finding.value}</p><h2 className="mt-6 max-w-xl text-xl font-medium leading-7 tracking-[-0.025em] text-ink">{finding.title}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-ink/62">{finding.description}</p></article>)}</div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.38fr_1fr] lg:gap-20">
            <div><Eyebrow>Rangos departamentales</Eyebrow><Heading size="xl">El agregado nacional es solo un punto dentro de la distribución.</Heading><p className="mt-6 text-sm leading-7 text-ink/65">Los extremos muestran dónde comienza una pregunta comparativa. No constituyen un ranking de desempeño general.</p></div>
            <PanoramaRangeChart />
          </div>
        </Container>
      </Section>

      <Section className="bg-[#ded9cc]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:items-center lg:gap-20">
            <div><Eyebrow>Escala institucional</Eyebrow><Heading size="xl">Provinciales y distritales operan con magnitudes distintas.</Heading><p className="mt-6 text-sm leading-7 text-ink/65">Las medianas reducen la influencia de valores extremos y describen una municipalidad central dentro de cada tipo. No representan a una institución específica.</p></div>
            <MunicipalityTypeComparison />
          </div>
        </Container>
      </Section>

      <Section className="overflow-hidden">
        <Container>
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between"><div><Eyebrow>Veinticinco contextos</Eyebrow><Heading size="xl">La tabla detrás de la lectura.</Heading><p className="mt-5 max-w-2xl text-sm leading-7 text-ink/65">Ordenada por ejecución de inversión para facilitar lectura, no para asignar una posición general. Abre cada perfil para revisar contexto y denominadores.</p></div><a href={`${path}/data.csv`} download data-analytics-event="resource_download" data-analytics-target="panorama-municipal:departments-csv" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-sm border border-border bg-panel px-5 text-sm font-medium text-ink transition-colors hover:border-border-strong hover:bg-canvas"><Download className="h-4 w-4" aria-hidden /> Descargar CSV</a></div>
          <div className="mt-10 min-w-0 max-w-full"><DepartmentEvidenceTable /></div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#15211d] text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.38fr_1fr] lg:gap-20">
            <div><Eyebrow className="text-[#d9a48f]">Método y límites</Eyebrow><Heading size="xl" className="text-white">Rigor visible antes de la conclusión.</Heading><p className="mt-6 text-sm leading-7 text-white/58">Referencia 2025. Publicación analítica: 17 de julio de 2026.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md bg-white/14 md:grid-cols-3">{[
              [Database, "Fuentes reconciliadas", "RENAMU, proyecciones de población y ejecución presupuestal se integran por ubigeo; los agregados preservan el universo común de 1,891 municipalidades."],
              [Scale, "Montos antes que promedios", "PIM y devengado se suman antes de calcular ejecución nacional o departamental. Las comparaciones por tipo utilizan medianas municipales."],
              [ShieldCheck, "Lectura prudente", "Capacidades RENAMU son declaraciones institucionales. La página no construye causalidad, calidad de gestión ni un índice compuesto."]
            ].map(([Icon, title, text]) => { const Component = Icon as typeof Database; return <article key={String(title)} className="min-h-[285px] bg-[#15211d] p-6"><Component className="h-4 w-4 text-[#d9a48f]" aria-hidden /><h2 className="mt-14 text-xl font-medium tracking-[-0.025em] text-white">{String(title)}</h2><p className="mt-4 text-sm leading-6 text-white/55">{String(text)}</p></article>; })}</div>
          </div>
          <div className="mt-10 border-t border-white/14 pt-6 text-[10px] leading-5 text-white/55">Fuentes: {renamuSource.publisher}, {renamuSource.name}; {dataperuSources.population.publisher}, proyecciones de población; {dataperuSources.budget.publisher}, ejecución presupuestal 2025. Revisa URLs, fechas y notas en <NextLink href="/transparency" className="text-[#d9a48f] hover:text-white">Transparencia</NextLink> y en cada módulo DataPerú.</div>
        </Container>
      </Section>

      <Section className="pb-0">
        <Container><div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-7 py-12 text-white md:px-12 md:py-16"><div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" /><div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow className="text-white/55">De la lectura a la decisión</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Construyamos el diagnóstico, observatorio o agenda que tu territorio necesita.</h2></div><div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/dataperu/panorama-municipal-2025" analyticsEvent="cta_click" analyticsTarget="panorama-municipal:scope" variant="secondary" className="rounded-full border-white bg-white text-ink">Diseñar un alcance</Button><Button href="/contact?interest=dataperu&from=/dataperu/panorama-municipal-2025" analyticsEvent="cta_click" analyticsTarget="panorama-municipal:contact" variant="ghost" className="gap-2 !text-white/70 hover:!text-white">Conversar <ArrowRight className="h-4 w-4" aria-hidden /></Button></div></div></div></Container>
      </Section>
    </>
  );
}

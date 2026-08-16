import { ArrowRight, Database, ExternalLink, Info, Scale, SlidersHorizontal } from "lucide-react";
import { RadarVisual } from "@/components/brand/radar-visual";
import { RadarExplorer } from "@/components/dataperu/radar-explorer";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import {
  dataperuSources,
  formatCurrency,
  formatMetric,
  formatPercent,
  projectSource,
  renamuSource
} from "@/lib/dataperu";
import { radarDistributions, radarMunicipalities, radarSummary, type DistributionBand } from "@/lib/dataperu-radar";
import { breadcrumbJsonLd, buildMetadata, datasetJsonLd, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Radar de gestión municipal",
  description: "Explora recursos, ejecución financiera y capacidades declaradas de 1,891 municipalidades del Perú con comparaciones responsables.",
  path: "/dataperu/radar",
  image: ogImagePath("dataperu", "radar")
});

function Distribution({ title, description, bands, known, color }: { title: string; description: string; bands: DistributionBand[]; known: number; color: string }) {
  const max = Math.max(...bands.map((band) => band.percent), 1);
  return (
    <article className="min-w-0 rounded-md border border-border bg-panel p-6 md:p-7">
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Distribución nacional</p>
      <h3 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-ink">{title}</h3>
      <p className="mt-3 text-xs leading-5 text-ink/58">{description}</p>
      <div className="mt-7 space-y-4">
        {bands.map((band) => (
          <div key={band.label} className="grid grid-cols-[82px_1fr_48px] items-center gap-3">
            <p className="text-[10px] text-muted">{band.label}</p>
            <div className="h-5 overflow-hidden rounded-sm bg-border/70"><div className="h-full rounded-sm" style={{ width: `${(band.percent / max) * 100}%`, backgroundColor: color }} /></div>
            <p className="text-right font-mono text-[10px] text-ink/65">{formatPercent(band.percent)}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 border-t border-border pt-4 text-[10px] leading-4 text-muted">Base: {formatMetric(known)} municipalidades con valor disponible.</p>
    </article>
  );
}

export default function DataPeruRadarPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "DataPerú", path: "/dataperu" }, { name: "Radar municipal", path: "/dataperu/radar" }])} />
      <JsonLd data={datasetJsonLd({
        name: "Radar de gestión municipal DataPerú 2025",
        description: "Vista comparativa de población, presupuesto, ejecución financiera y capacidades declaradas para 1,891 municipalidades provinciales y distritales.",
        url: `${siteConfig.url}/dataperu/radar`,
        datePublished: renamuSource.releaseDate
      })} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.88fr_1fr] lg:items-center lg:gap-20">
            <div>
              <Eyebrow className="text-[#d9a48f]">DataPerú · Radar municipal</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[12ch] text-white">La gestión municipal, vista en contexto.</Heading>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/66">Explora recursos, ejecución financiera y capacidades declaradas de gobiernos locales de todo el país. Compara territorios similares antes de formular una explicación.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#explorar" variant="secondary" className="rounded-full border-white bg-white text-ink">Explorar el radar</Button>
                <Button href="/contact?interest=dataperu&from=/dataperu/radar" variant="ghost" className="gap-2 !text-white/68 hover:!text-white">Diseñar un observatorio <ArrowRight className="h-4 w-4" aria-hidden /></Button>
              </div>
            </div>
            <RadarVisual />
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container>
          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {[
              { value: formatMetric(radarSummary.municipalities), label: "municipalidades", note: "cobertura completa del universo publicado" },
              { value: formatCurrency(radarSummary.totalPim, true), label: "PIM municipal 2025", note: "suma de montos, no promedio" },
              { value: formatPercent(radarSummary.totalExecutionPercent), label: "ejecución total", note: "devengado agregado / PIM agregado" },
              { value: formatPercent(radarSummary.totalInvestmentExecutionPercent), label: "ejecución de inversión", note: "avance financiero agregado" }
            ].map((metric) => (
              <div key={metric.label} className="min-w-0 py-7 sm:px-6 sm:first:pl-0 md:py-9">
                <p className="break-words text-3xl font-medium tracking-[-0.05em] text-ink">{metric.value}</p>
                <p className="mt-2 text-xs font-medium text-ink/72">{metric.label}</p>
                <p className="mt-1 text-[9px] leading-4 text-muted">{metric.note}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <Scale className="h-5 w-5 text-rust" aria-hidden />
              <Eyebrow className="mt-6">Cómo leer</Eyebrow>
              <Heading size="xl">Comparar sin confundir contexto con desempeño.</Heading>
            </div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
              {[
                ["01", "Mismo tipo municipal", "Las medianas separan municipalidades provinciales y distritales; aun así, no controlan todas las diferencias de escala y territorio."],
                ["02", "Montos y porcentajes", "Los agregados nacionales ponderan montos. Las medianas describen a una municipalidad típica dentro de cada grupo."],
                ["03", "Señal, no veredicto", "Una diferencia ayuda a formular preguntas. No acredita capacidad, calidad del gasto, avance físico ni impacto en la población."]
              ].map(([number, title, text]) => (
                <article key={number} className="min-h-[260px] bg-panel p-6">
                  <span className="font-mono text-[10px] text-rust">{number}</span>
                  <h2 className="mt-12 text-xl font-medium tracking-[-0.025em] text-ink">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/62">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.58fr_1fr] md:items-end">
            <div><Eyebrow>Distribuciones</Eyebrow><Heading size="xl">Dónde se concentra el avance financiero.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Las barras muestran la proporción de municipalidades en cada intervalo. No miden calidad, oportunidad, avance físico ni resultados.</p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Distribution title="Ejecución presupuestal total" description="Devengado total dividido entre PIM para cada municipalidad durante 2025." {...radarDistributions.budgetExecution} color="#5f796e" />
            <Distribution title="Ejecución de inversión" description="Devengado de proyectos dividido entre su PIM para cada municipalidad durante 2025." {...radarDistributions.investmentExecution} color="#b95337" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Comparación entre pares</Eyebrow><Heading size="xl">Dos universos municipales distintos.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Las medianas reducen el efecto de valores extremos. No representan metas y no reemplazan una comparación territorial más específica.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {radarSummary.peerMedians.map((peer) => (
                <article key={peer.type} className="bg-canvas p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-rust">Municipalidades {peer.type.toLocaleLowerCase("es-PE")}es</p><span className="font-mono text-[10px] text-muted">n={formatMetric(peer.municipalities)}</span></div>
                  <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-7">
                    {[
                      ["Población", formatMetric(peer.population2025)],
                      ["PIM", formatCurrency(peer.pim, true)],
                      ["PIM por habitante", formatCurrency(peer.pimPerCapita)],
                      ["Ejecución total", formatPercent(peer.budgetExecutionPercent)],
                      ["Ejecución inversión", formatPercent(peer.investmentExecutionPercent)]
                    ].map(([label, value]) => <div key={label}><p className="text-[9px] uppercase tracking-[0.11em] text-muted">{label}</p><p className="mt-2 text-lg font-medium tracking-[-0.025em] text-ink">{value}</p></div>)}
                  </div>
                  <p className="mt-8 border-t border-border pt-4 text-[10px] text-muted">Mediana nacional dentro del tipo municipal.</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#15211d] text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Info className="h-5 w-5 text-[#d9a48f]" aria-hidden /><Eyebrow className="mt-6 text-[#d9a48f]">Capacidades declaradas</Eyebrow><Heading size="xl" className="text-white">La infraestructura institucional también importa.</Heading><p className="mt-5 text-sm leading-7 text-white/58">RENAMU registra declaraciones municipales. La presencia reportada de un recurso o instrumento no acredita su calidad, vigencia o uso efectivo.</p></div>
            <div className="divide-y divide-white/14 border-y border-white/14">
              {radarSummary.declaredCapacity.map((item) => (
                <div key={item.label} className="grid grid-cols-[1fr_72px] items-center gap-5 py-5 sm:grid-cols-[220px_1fr_72px]">
                  <div><p className="text-sm font-medium text-white/78">{item.label}</p><p className="mt-1 text-[9px] text-white/36">{item.note}</p></div>
                  <div className="hidden h-1.5 overflow-hidden rounded-full bg-white/10 sm:block"><div className="h-full rounded-full bg-[#d9a48f]" style={{ width: `${item.value}%` }} /></div>
                  <p className="text-right text-lg font-medium tracking-[-0.03em] text-white">{formatPercent(item.value)}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="explorar">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.58fr_1fr] md:items-end">
            <div><SlidersHorizontal className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Explorador</Eyebrow><Heading size="xl">Encuentra y compara un territorio.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Filtra por departamento y tipo municipal. Después abre la ficha para revisar proyectos, capacidades, fuentes y preguntas de gestión.</p>
          </div>
          <div className="mt-10"><RadarExplorer items={radarMunicipalities} /></div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/55">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Database className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Fuentes y control</Eyebrow><Heading size="lg">Cobertura completa; interpretación limitada.</Heading></div>
            <div className="space-y-5 text-sm leading-7 text-ink/66">
              <p>Los 1,891 perfiles RENAMU tienen correspondencia con población INEI y presupuesto MEF. No existen ubigeos duplicados ni ejecuciones por encima del PIM dentro de la tolerancia validada.</p>
              <p><strong className="font-medium text-ink">Riesgos de lectura:</strong> la población es proyectada; RENAMU es autodeclarado; la ejecución financiera no mide calidad, avance físico o impacto; la cartera publicada conserva hasta cinco proyectos por municipalidad.</p>
              <div className="flex flex-wrap gap-5 pt-2">
                <a href={dataperuSources.population.pageUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-medium text-rust hover:text-ink">Fuente INEI <ExternalLink className="h-3.5 w-3.5" aria-hidden /></a>
                <a href={dataperuSources.budget.datasetUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-medium text-rust hover:text-ink">Fuente MEF <ExternalLink className="h-3.5 w-3.5" aria-hidden /></a>
                <a href={renamuSource.technicalSheetUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-medium text-rust hover:text-ink">Ficha técnica RENAMU <ExternalLink className="h-3.5 w-3.5" aria-hidden /></a>
                <a href={projectSource.resourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-medium text-rust hover:text-ink">Proyectos MEF <ExternalLink className="h-3.5 w-3.5" aria-hidden /></a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-7 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><Eyebrow className="text-white/55">Observatorios por encargo</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Convierte datos dispersos en una rutina de decisión para tu institución.</h2></div>
              <Button href="/contact?interest=dataperu&from=/dataperu/radar" analyticsEvent="cta_click" analyticsTarget="dataperu-radar:final-contact" variant="secondary" className="rounded-full border-white bg-white px-6 text-ink">Plantear el observatorio</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

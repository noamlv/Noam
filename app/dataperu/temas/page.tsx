import { ArrowRight, Building2, Database, Droplets, Leaf, Recycle, ShieldCheck, Siren, Store } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { getNationalSectorMetrics, sectorSource, sectorTopics } from "@/lib/dataperu-sectors";
import { waterSanitationSource, waterSanitationSummary } from "@/lib/dataperu-water-sanitation";
import { breadcrumbJsonLd, buildMetadata, datasetJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Temas de gestión municipal",
  description: "Explora agua y saneamiento por distrito y lecturas de residuos, seguridad, riesgos, economía local y ambiente en municipalidades del Perú.",
  path: "/dataperu/temas"
});

const icons = {
  residuos: Recycle,
  "seguridad-ciudadana": ShieldCheck,
  "gestion-del-riesgo": Siren,
  "desarrollo-economico": Store,
  "gestion-ambiental": Leaf
};

export default function SectorTopicsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "DataPerú", path: "/dataperu" },
        { name: "Temas de gestión", path: "/dataperu/temas" }
      ])} />
      <JsonLd data={datasetJsonLd({
        name: "Temas de gestión municipal DataPerú 2025",
        description: "Lecturas sectoriales de información declarada por 1,891 municipalidades provinciales y distritales del Perú.",
        url: `${siteConfig.url}/dataperu/temas`,
        datePublished: sectorSource.releaseDate
      })} />

      <section className="overflow-hidden bg-[#15211d] pb-20 pt-14 text-white md:pb-28 md:pt-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="text-[#d9a48f]">DataPerú · Lecturas sectoriales</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[13ch] text-white">Temas que una gestión necesita ver.</Heading>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/66">Una entrada abierta para identificar preguntas, explorar capacidades declaradas y decidir dónde hace falta un diagnóstico más profundo.</p>
            </div>
            <div className="border-l border-white/15 pl-6">
              <Building2 className="h-5 w-5 text-[#d9a48f]" aria-hidden />
              <p className="mt-5 text-4xl font-medium tracking-[-0.05em]">1,891</p>
              <p className="mt-2 text-xs leading-5 text-white/52">municipalidades provinciales y distritales con información RENAMU 2025</p>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Explorar por tema</Eyebrow>
              <Heading size="xl">Del dato a una pregunta de gestión.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">Estas vistas no califican municipalidades ni sustituyen un estudio. Organizan señales comparables para orientar una conversación.</p>
            </div>
            <div>
              <NextLink
                href="/dataperu/agua-saneamiento"
                className="group relative block overflow-hidden rounded-md border border-border bg-[#15211d] p-7 text-white transition-all duration-220 hover:-translate-y-0.5 hover:border-border-strong"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-[#6d9f91]" />
                <div className="flex items-start justify-between gap-5">
                  <Droplets className="h-5 w-5 text-[#d9a48f]" aria-hidden />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/48">Censos Nacionales 2025</span>
                </div>
                <h2 className="mt-10 text-2xl font-medium tracking-[-0.035em]">Agua y saneamiento</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">Cobertura de agua y servicio higiénico por red pública para los 1,892 distritos censales del Perú.</p>
                <div className="mt-8 grid gap-5 border-t border-white/14 pt-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                  <span><span className="block text-2xl font-medium tracking-[-0.04em]">{waterSanitationSummary.waterNetwork.percent}%</span><span className="mt-1 block text-[11px] text-white/48">agua por red pública</span></span>
                  <span><span className="block text-2xl font-medium tracking-[-0.04em]">{waterSanitationSummary.sanitationNetwork.percent}%</span><span className="mt-1 block text-[11px] text-white/48">saneamiento por red pública</span></span>
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-[#d9a48f]">Explorar distritos <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span>
                </div>
              </NextLink>
              <p className="mt-3 text-[11px] leading-5 text-muted">Fuente: {waterSanitationSource.publisher}. Las conexiones no acreditan continuidad, potabilidad ni tratamiento.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {sectorTopics.map((topic, index) => {
                const Icon = icons[topic.slug];
                const metrics = getNationalSectorMetrics(topic.slug);
                return (
                  <NextLink
                    key={topic.slug}
                    href={`/dataperu/temas/${topic.slug}`}
                    className={`group relative overflow-hidden rounded-md border border-border bg-panel p-7 transition-all duration-220 hover:-translate-y-0.5 hover:border-border-strong ${index === 0 ? "sm:col-span-2" : ""}`}
                  >
                    <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: topic.accent }} />
                    <div className="flex items-start justify-between gap-5">
                      <Icon className="h-5 w-5 text-rust" aria-hidden />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">{topic.kicker}</span>
                    </div>
                    <h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{topic.title}</h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/64">{topic.description}</p>
                    <div className="mt-8 flex items-end justify-between gap-6 border-t border-border pt-5">
                      <span><span className="block text-2xl font-medium tracking-[-0.04em] text-ink">{metrics[0].value}</span><span className="mt-1 block text-[11px] text-muted">{metrics[0].label.toLocaleLowerCase("es-PE")}</span></span>
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-rust">Abrir lectura <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span>
                    </div>
                  </NextLink>
                );
              })}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/55">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.45fr_1fr] lg:gap-20">
            <div>
              <Database className="h-5 w-5 text-rust" aria-hidden />
              <Eyebrow className="mt-6">Cómo leerlo</Eyebrow>
              <Heading size="lg">Una línea de base, no un veredicto.</Heading>
            </div>
            <div className="grid gap-8 text-sm leading-7 text-ink/68 sm:grid-cols-2">
              <div><p className="font-medium text-ink">Qué muestra</p><p className="mt-2">Presencia de instrumentos, capacidades y acciones declaradas por cada municipalidad, según la pregunta y periodo de RENAMU.</p></div>
              <div><p className="font-medium text-ink">Qué no demuestra</p><p className="mt-2">Calidad del servicio, cumplimiento efectivo, resultados para la población ni causalidad entre una capacidad y un resultado.</p></div>
              <div><p className="font-medium text-ink">Cómo usarlo</p><p className="mt-2">Como punto de partida para contrastar evidencia, formular hipótesis y diseñar un diagnóstico o sistema de seguimiento.</p></div>
              <div><p className="font-medium text-ink">Fuente</p><p className="mt-2">{sectorSource.publisher}. {sectorSource.referencePeriod}.</p></div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 rounded-lg bg-accent px-7 py-10 text-accent-ink md:grid-cols-[1fr_auto] md:items-end md:px-12 md:py-14">
            <div><Eyebrow className="text-[#d9a48f]">De lectura a decisión</Eyebrow><Heading size="xl" className="max-w-[18ch] text-white">Convirtamos una señal en una agenda de trabajo.</Heading></div>
            <Button href="/contact?interest=diagnostico-territorial" variant="secondary" className="rounded-full border-white bg-white text-ink">Conversar sobre una institución</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

import { ArrowRight, Check } from "lucide-react";
import NextLink from "next/link";
import { SolutionCard } from "@/components/content/solution-card";
import { AnalysisServiceDirectory } from "@/components/content/analysis-service-directory";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { analysisNeedPaths, sectorAnalysisPaths } from "@/lib/analysis-service-catalog";
import { deliverySteps, serviceLines } from "@/lib/brand-content";
import { solutions } from "@/lib/solutions";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Servicios de análisis de datos para gobiernos y empresas",
  description: "Diagnósticos, líneas de base, evaluaciones, encuestas, observatorios, dashboards, estudios de mercado e IA aplicada en todo el Perú.",
  path: "/services"
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/services" }])} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Servicios de análisis de datos para gobiernos y empresas",
        description: "Directorio de diagnósticos, evaluaciones, encuestas, sistemas de decisión, inteligencia de mercado e IA aplicada.",
        url: `${siteConfig.url}/services`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: [...analysisNeedPaths, ...sectorAnalysisPaths].map((entry, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: entry.title,
            url: `${siteConfig.url}${entry.href}`
          }))
        }
      }} />

      <Section className="pb-16 pt-14 md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div>
              <Eyebrow className="text-rust">Servicios</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[14ch]">De la evidencia a una capacidad que funciona.</Heading>
            </div>
            <div><p className="text-sm leading-7 text-ink/68 md:text-base">Combinamos investigación, estrategia, datos y producto digital. Cada proyecto comienza por la decisión que debe mejorar y termina con un entregable que el equipo puede usar.</p><NextLink href="/contratar-analisis-datos" className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-rust">Guía para elegir y contratar un análisis <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></NextLink></div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-8 pb-12 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Encuentra el punto de partida</Eyebrow><Heading size="xl">Busca por decisión o por problema.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">No necesitas llegar con la metodología resuelta. Revisa una ruta, examina evidencia y utiliza su TDR; si tu tema no aparece, podemos delimitarlo desde cero.</p>
          </div>
          <AnalysisServiceDirectory />
          <div className="mt-12 flex flex-col gap-5 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-6 text-ink/62">¿Tu sector o problema no está listado? La ausencia de una etiqueta no limita el alcance de un estudio.</p>
            <Button href="/contact?interest=other&from=/services" analyticsEvent="cta_click" analyticsTarget="services:unlisted-need" variant="ghost" className="justify-start gap-2">Plantear otro tema <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </Container>
      </Section>

      <section className="border-y border-border">
        <Container>
          {serviceLines.map((service, index) => (
            <article key={service.slug} className={`grid gap-8 py-12 md:grid-cols-[0.4fr_1fr] md:gap-14 md:py-16 ${index ? "border-t border-border" : ""}`}>
              <div>
                <span className="text-xs font-semibold text-rust">{service.number}</span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-muted">{service.timeline}</p>
              </div>
              <div>
                <h2 className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.04em] text-ink md:text-5xl">{service.title}</h2>
                <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-ink/78">{service.promise}</p>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/65 md:text-base">{service.description}</p>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">Resultados</p>
                    <ul className="mt-4 space-y-3">
                      {service.outcomes.slice(0, 3).map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-ink/72"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-rust" />{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">Entregables posibles</p>
                    <ul className="mt-4 space-y-3">
                      {service.deliverables.slice(0, 3).map((item) => (
                        <li key={item} className="text-sm leading-6 text-ink/72">— {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <NextLink href={`/services/${service.slug}`} className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink">
                  Explorar el servicio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </NextLink>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Cómo empezar</Eyebrow><Heading size="xl">Soluciones que vuelven concreto el primer encargo.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Las capacidades describen cómo trabajamos. Estas soluciones muestran dónde puede comenzar una institución.</p><Button href="/solutions" variant="ghost" className="mt-6 gap-2">Explorar las soluciones <ArrowRight className="h-4 w-4" /></Button></div>
            <div className="grid gap-4 sm:grid-cols-2">{solutions.slice(0, 4).map((solution) => <SolutionCard key={solution.slug} solution={solution} />)}</div>
          </div>
        </Container>
      </Section>

      <Section className="bg-panel/45">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Modelo de trabajo</Eyebrow>
              <Heading size="xl">Rigor sin burocracia innecesaria.</Heading>
            </div>
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {deliverySteps.map((step) => (
                <article key={step.number}>
                  <span className="text-xs font-semibold text-rust">{step.number}</span>
                  <h2 className="mt-4 text-xl font-medium tracking-[-0.025em] text-ink">{step.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/65">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="rounded-[1.5rem] bg-accent p-8 text-accent-ink md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <Eyebrow className="text-white/55">Alcance inicial</Eyebrow>
                <Heading size="lg" className="max-w-3xl text-white">Si el problema todavía no está bien definido, ese puede ser el primer entregable.</Heading>
              </div>
              <div className="flex flex-wrap gap-3"><Button href="/diagnostico" analyticsEvent="cta_click" analyticsTarget="services:scope-builder" variant="secondary" className="rounded-full border-white bg-white text-ink">Diseñar un alcance</Button><Button href="/contact" analyticsEvent="cta_click" analyticsTarget="services:direct-contact" variant="ghost" className="!text-white/70 hover:!text-white">Solicitar conversación</Button></div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

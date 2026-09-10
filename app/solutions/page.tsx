import { ArrowRight, ChartNoAxesCombined, Search, Sparkles } from "lucide-react";
import NextLink from "next/link";
import { SolutionCard } from "@/components/content/solution-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { engagementScales, serviceLines } from "@/lib/brand-content";
import { solutions } from "@/lib/solutions";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Soluciones",
  description: "Estudios, sistemas de decisión e inteligencia artificial para gobiernos y empresas en todo el Perú.",
  path: "/solutions"
});

const serviceIcons = [Search, ChartNoAxesCombined, Sparkles];
const serviceAccents = ["#b95337", "#2f5c52", "#8a623d"];

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Soluciones", path: "/solutions" }])} />

      <section className="overflow-hidden bg-[#15211d] pb-20 pt-14 text-white md:pb-28 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.48fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="reveal text-[#d9a48f]">Soluciones NOAM</Eyebrow>
              <Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[13ch] text-white">
                Una decisión concreta. La evidencia para llevarla adelante.
              </Heading>
            </div>
            <div className="reveal reveal-delay-2">
              <p className="text-base leading-8 text-white/68">
                Organizamos cada encargo en tres capacidades: comprender, conducir y transformar. El alcance cambia según la institución; el rigor no.
              </p>
              <Button href="/diagnostico?from=/solutions" analyticsEvent="cta_click" analyticsTarget="solutions:scope" variant="secondary" className="mt-7 rounded-full border-white bg-white text-ink">
                Plantear un desafío
              </Button>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-white/15 bg-white/15 md:grid-cols-3">
            {serviceLines.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <NextLink key={service.slug} href={`#${service.slug}`} className="group bg-[#15211d] p-6 transition-colors duration-200 hover:bg-white/[0.045] md:p-8">
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-[#d9a48f]" aria-hidden />
                    <span className="font-mono text-[10px] text-white/35">{service.number}</span>
                  </div>
                  <h2 className="mt-14 text-xl font-medium leading-tight tracking-[-0.03em] text-white">{service.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/55">{service.promise}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-xs text-white/65 transition-colors group-hover:text-white">Explorar <ArrowRight className="h-3.5 w-3.5" /></span>
                </NextLink>
              );
            })}
          </div>
        </Container>
      </section>

      {serviceLines.map((service, index) => {
        const Icon = serviceIcons[index];
        const packages = solutions.filter((solution) => solution.serviceSlug === service.slug);
        return (
          <Section key={service.slug} id={service.slug} className={index % 2 === 1 ? "border-y border-border bg-panel/45" : undefined}>
            <Container>
              <div className="grid gap-12 lg:grid-cols-[0.43fr_1fr] lg:gap-20">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-panel" style={{ color: serviceAccents[index] }}>
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </div>
                  <p className="mt-7 font-mono text-[10px] text-rust">{service.number}</p>
                  <Heading as="h2" size="xl" className="mt-3">{service.title}</Heading>
                  <p className="mt-5 text-base font-medium leading-7 text-ink/82">{service.promise}</p>
                  <p className="mt-4 text-sm leading-7 text-ink/65">{service.description}</p>
                  <NextLink href={`/services/${service.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-rust transition-colors hover:text-ink">
                    Ver capacidad completa <ArrowRight className="h-4 w-4" />
                  </NextLink>
                </div>

                <div>
                  <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
                    {service.outcomes.map((outcome, outcomeIndex) => (
                      <div key={outcome} className="bg-canvas p-5 md:p-6">
                        <span className="font-mono text-[10px] text-rust">0{outcomeIndex + 1}</span>
                        <p className="mt-5 text-sm font-medium leading-6 text-ink">{outcome}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 flex items-end justify-between gap-5 border-b border-border pb-5">
                    <div>
                      <Eyebrow>Puntos de partida</Eyebrow>
                      <h3 className="mt-2 text-2xl font-medium tracking-[-0.035em] text-ink">Encargos configurables, resultados definidos.</h3>
                    </div>
                    <span className="hidden text-xs text-muted sm:block">{packages.length} {packages.length === 1 ? "solución" : "soluciones"}</span>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {packages.map((solution) => <SolutionCard key={solution.slug} solution={solution} />)}
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      <Section className="bg-[#ded9cc]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.45fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Cómo empezar</Eyebrow>
              <Heading size="xl">Una escala adecuada a la decisión.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">Podemos validar una necesidad con rapidez, ejecutar un proyecto completo o dejar una capacidad funcionando por ciclos.</p>
            </div>
            <div className="divide-y divide-ink/15 border-y border-ink/15">
              {engagementScales.map((scale) => (
                <article key={scale.number} className="grid gap-4 py-6 sm:grid-cols-[48px_0.55fr_1fr] sm:items-start">
                  <span className="font-mono text-[10px] text-rust">{scale.number}</span>
                  <div><h2 className="text-lg font-medium text-ink">{scale.title}</h2><p className="mt-1 text-xs font-medium text-muted">{scale.duration}</p></div>
                  <p className="text-sm leading-6 text-ink/68">{scale.description}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <NextLink href="/muestras" className="group grid gap-8 rounded-md border border-border bg-panel p-6 transition-all hover:border-border-strong hover:shadow-subtle md:grid-cols-[0.48fr_1fr] md:p-10">
            <div><Eyebrow>Antes de contratar</Eyebrow><Heading size="xl">Seis entregables que puedes examinar.</Heading></div>
            <div className="flex flex-col justify-between gap-8"><p className="max-w-2xl text-sm leading-7 text-ink/65">Mira la arquitectura, los insumos, los controles y el cronograma de cada solución sin confundir una demostración con un caso real.</p><span className="inline-flex items-center gap-2 text-sm font-medium text-rust">Abrir biblioteca de muestras <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span></div>
          </NextLink>
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-6 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <Eyebrow className="text-white/55">Primer paso</Eyebrow>
                <h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">No necesitas llegar con la solución. Empieza por la decisión.</h2>
              </div>
              <Button href="/diagnostico?from=/solutions" analyticsEvent="cta_click" analyticsTarget="solutions:scope-final" variant="secondary" className="rounded-full border-white bg-white px-6 text-ink">Diseñar un alcance</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

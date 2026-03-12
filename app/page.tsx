import { JsonLd } from "@/components/seo/json-ld";
import {
  Accordion,
  Button,
  Card,
  Container,
  Eyebrow,
  Heading,
  ResourceList,
  Section
} from "@/components/ui";
import { getFeaturedContent } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Plataforma Global de Gobierno, Inversion e IA",
  description:
    "NOAM integra estrategia, evidencia y ejecucion para decisiones de alto impacto en gobierno, inversion e IA.",
  path: "/"
});

const audience = [
  "Equipos de direccion que necesitan decidir con mejor evidencia",
  "Lideres de inversion que requieren senales claras para asignar capital",
  "Unidades de transformacion que buscan implementar IA sin friccion",
  "Instituciones publicas que operan bajo alta exigencia y escrutinio"
];

const testimonials = [
  {
    quote: "NOAM nos ayudo a pasar de debate disperso a decisiones concretas en semanas.",
    author: "Director de Estrategia",
    org: "Entidad regional"
  },
  {
    quote: "El trabajo combino profundidad analitica y foco ejecutivo desde el primer entregable.",
    author: "Managing Partner",
    org: "Firma de inversion"
  },
  {
    quote: "Logramos priorizar iniciativas de IA con criterios compartidos por negocio, legal y tecnologia.",
    author: "Chief Transformation Officer",
    org: "Grupo multi-pais"
  }
];

const faqItems = [
  {
    title: "Que tipo de proyectos toma NOAM?",
    content: "Sprints de decision, diseno de estrategia aplicada, monitoreo de senales y ejecucion de hojas de ruta en gobierno, inversion e IA."
  },
  {
    title: "En cuanto tiempo se ven resultados?",
    content: "Un primer entregable ejecutivo suele liberarse entre la segunda y tercera semana, con acciones priorizadas y supuestos explicitados."
  },
  {
    title: "Trabajan con equipos internos?",
    content: "Si. El modelo esta disenado para co-ejecutar con equipos de direccion y transferir capacidades durante el proceso."
  },
  {
    title: "Solo trabajan en Peru?",
    content: "No. El enfoque es regional y global, con adaptacion a contexto regulatorio y operativo por mercado."
  }
];

export default async function HomePage() {
  const [insights, indicators, toolkits] = await Promise.all([
    getFeaturedContent("insights", 2),
    getFeaturedContent("indicators", 2),
    getFeaturedContent("toolkits", 2)
  ]);

  const resources = [...insights, ...indicators, ...toolkits]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 5);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }])} />

      <Section className="pb-20 pt-14 md:pb-24 md:pt-20">
        <Container>
          <Eyebrow>NOAM | Gobierno - Inversion - IA</Eyebrow>
          <Heading as="h1" size="display" className="max-w-4xl">
            Inteligencia aplicada para decidir mejor, antes y con menor riesgo.
          </Heading>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/78 md:text-lg">
            Plataforma institucional para convertir evidencia en decisiones ejecutables. Enfoque sobrio, rigor tecnico y orientacion a negocio.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact">Hablar con NOAM</Button>
            <Button href="/services" variant="secondary">
              Ver servicios
            </Button>
          </div>

          <div className="mt-12 overflow-hidden rounded-lg border border-border bg-panel p-5 shadow-subtle md:mt-14 md:p-8">
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-muted">Signal Canvas</p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/76">
                  Un espacio unico para alinear contexto, hipotesis, riesgo y decisiones de ejecucion.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-sm border border-border bg-canvas p-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-muted">Cobertura</p>
                  <p className="mt-2 text-xl font-medium tracking-[-0.02em] text-ink">Global</p>
                </div>
                <div className="rounded-sm border border-border bg-canvas p-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-muted">Decision cycles</p>
                  <p className="mt-2 text-xl font-medium tracking-[-0.02em] text-ink">2-4 sem</p>
                </div>
              </div>
            </div>
            <div className="mt-7 h-28 rounded-md border border-border bg-[repeating-linear-gradient(90deg,rgba(16,20,24,0.06),rgba(16,20,24,0.06)_1px,transparent_1px,transparent_64px),linear-gradient(180deg,rgba(16,20,24,0.03),rgba(16,20,24,0.01))] md:h-36" />
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/35">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div>
              <Eyebrow>Acerca de NOAM</Eyebrow>
              <Heading size="xl" className="max-w-xl">
                Think tank operativo para decisiones complejas.
              </Heading>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-ink/78 md:text-base">
              <p>
                Integramos analisis, producto y estrategia para convertir incertidumbre en criterio de ejecucion.
              </p>
              <p>
                El trabajo se estructura en sprints, con trazabilidad de fuentes y entregables listos para comites de decision.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div>
              <Eyebrow>Para quien es</Eyebrow>
              <Heading size="xl" className="max-w-xl">
                Equipos que no pueden darse el lujo de decidir a ciegas.
              </Heading>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/76 md:text-base">
                Trabajamos con lideres que necesitan velocidad, criterio y consistencia para sostener decisiones bajo presion.
              </p>
            </div>

            <div className="rounded-md border border-border bg-panel p-6 md:p-8">
              <ul className="space-y-3">
                {audience.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/82 md:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/70" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow>Testimonios</Eyebrow>
          <Heading size="xl" className="max-w-2xl">
            Senales de confianza de trabajo real.
          </Heading>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
            {testimonials.map((item) => (
              <Card key={item.quote} className="p-5 md:p-6">
                <p className="text-sm leading-relaxed text-ink/82">&quot;{item.quote}&quot;</p>
                <p className="mt-6 text-sm font-medium text-ink">{item.author}</p>
                <p className="text-xs text-muted">{item.org}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/35">
        <Container size="narrow">
          <Eyebrow>FAQ</Eyebrow>
          <Heading size="xl" className="max-w-2xl">
            Preguntas frecuentes
          </Heading>
          <Accordion items={faqItems} className="mt-8" />
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow>Publicaciones y recursos</Eyebrow>
          <Heading size="xl" className="max-w-2xl">
            Lecturas recientes para equipos de decision.
          </Heading>

          <ResourceList items={resources} variant="rows" className="mt-8" />
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="rounded-lg border border-border bg-panel px-6 py-10 text-center md:px-10 md:py-14">
            <Heading size="lg" className="mx-auto max-w-2xl">
              La ventaja competitiva empieza con mejores decisiones.
            </Heading>
            <div className="mt-6">
              <Button href="/contact">Iniciar conversacion</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

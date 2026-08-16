import { ArrowRight, BarChart3, BellRing, Building2, FileSearch, Map, Newspaper, Route, UsersRound } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Electoral",
  description: "Datos, propuestas, territorio y transición para comprender las ERM 2026 y preparar mejores decisiones públicas.",
  path: "/electoral"
});

const audiences = [
  {
    icon: UsersRound,
    label: "Ciudadanía",
    question: "¿Quién compite y qué propone en mi territorio?",
    answer: "Planes comparables, contexto territorial y acceso directo a las fuentes oficiales."
  },
  {
    icon: Newspaper,
    label: "Medios y análisis",
    question: "¿Qué cambió y dónde está la historia relevante?",
    answer: "Evidencia trazable para investigar candidaturas, propuestas, opinión pública y gestión."
  },
  {
    icon: Building2,
    label: "Empresas y organizaciones",
    question: "¿Qué implica el cambio político para un territorio o sector?",
    answer: "Briefings territoriales, escenarios y seguimiento institucional bajo alcance definido."
  },
  {
    icon: Route,
    label: "Gobiernos y equipos",
    question: "¿Cómo convertir compromisos en una gestión operable?",
    answer: "Diagnóstico, transferencia, prioridades de 100 días e indicadores de seguimiento."
  }
];

const cycle = [
  { number: "01", title: "Antes de elegir", text: "Planes de gobierno, perfiles territoriales, opinión pública y comparación de agendas." },
  { number: "02", title: "Durante la campaña", text: "Lectura de segmentos, territorio, conversación y riesgos con criterios transparentes." },
  { number: "03", title: "Durante la transición", text: "Diagnóstico de transferencia, cartera priorizada y agenda de los primeros 100 días." },
  { number: "04", title: "Durante la gestión", text: "Tableros de compromisos, observatorios e indicadores para seguir resultados." }
];

const products = [
  { icon: FileSearch, title: "Planómetro", label: "Planes de gobierno", status: "Publicado", description: "Extracción y comparación de propuestas por temas, territorios y nivel de concreción.", href: "/electoral/planometro-2026", metrics: ["36 planes", "2,742 propuestas operativas"] },
  { icon: BarChart3, title: "Barómetro electoral", label: "Opinión pública", status: "Publicado", description: "Lectura analítica de encuestas, segmentos, escenarios y señales de cambio.", href: "/electoral/barometro-enero-2026", metrics: ["1,300 entrevistas", "184 variables"] },
  { icon: Map, title: "Perfiles territoriales", label: "DataPerú", status: "Publicado", description: "Contexto demográfico, institucional, presupuestal y de inversión para cada municipalidad.", href: "/dataperu/municipios", metrics: ["1,891 municipalidades", "9,429 proyectos visibles"] },
  { icon: Route, title: "Gobierno desde el día uno", label: "Transición", status: "Servicio", description: "Diagnóstico, prioridades, plan de 100 días y sistema de seguimiento para nuevas gestiones.", href: "/electoral/erm-2026", metrics: ["Agenda priorizada", "Sistema de seguimiento"] }
];

const developmentAgenda = [
  {
    icon: BellRing,
    status: "Diseño de datos",
    title: "Candidaturas y expedientes",
    description: "Modelo versionado para seguir listas, resoluciones y cambios de estado sin confundir información provisional con decisiones firmes."
  },
  {
    icon: Map,
    status: "Base disponible",
    title: "Contexto electoral territorial",
    description: "Integración progresiva de historia electoral con población, presupuesto, inversión y capacidades públicas por ubigeo."
  },
  {
    icon: FileSearch,
    status: "Método en evolución",
    title: "Propuestas frente a brechas",
    description: "Cruce responsable entre documentos programáticos, problemas territoriales y restricciones de gestión."
  },
  {
    icon: BarChart3,
    status: "Servicio disponible",
    title: "Transición y seguimiento",
    description: "Reportes, agendas y tableros para pasar del resultado electoral a decisiones con responsables y plazos."
  }
];

export default function ElectoralPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Electoral", path: "/electoral" }])} />
      <Section className="pb-16 pt-14 md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div>
              <Eyebrow className="text-rust">Elecciones · Territorio · Gobierno</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[15ch]">Entender la elección. Preparar la gestión.</Heading>
            </div>
            <div>
              <p className="text-sm leading-7 text-ink/68 md:text-base">Una plataforma para responder preguntas concretas sobre candidaturas, propuestas y territorios, y conectar la elección con la capacidad de gobernar.</p>
              <div className="mt-7 flex flex-wrap gap-3"><Button href="/electoral/erm-2026" className="rounded-full">Ver ERM 2026</Button><Button href="/electoral/planometro-2026" variant="ghost">Explorar Planómetro</Button></div>
            </div>
          </div>
        </Container>
      </Section>

      <section className="border-y border-border bg-[#ded9cc]">
        <Container>
          <NextLink href="/electoral/erm-2026" className="group grid gap-8 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-center md:py-10">
            <div className="flex h-20 w-20 flex-col justify-center rounded-full border border-ink/20 text-center">
              <span className="text-xl font-medium tracking-[-0.04em] text-ink">04</span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-rust">Oct 2026</span>
            </div>
            <div>
              <Eyebrow>Especial ERM 2026</Eyebrow>
              <h2 className="mt-2 text-2xl font-medium tracking-[-0.035em] text-ink md:text-3xl">Territorio, transferencia y primeros 100 días.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/62">Una ruta para transformar evidencia territorial y compromisos en prioridades, responsables y seguimiento.</p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">Conocer la propuesta <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
          </NextLink>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.48fr_1fr] md:items-end">
            <div><Eyebrow>Cuatro puertas de entrada</Eyebrow><Heading size="xl">La misma elección. Distintas decisiones.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">NOAM no busca concentrar información electoral sin propósito. Cada producto parte de una pregunta, conserva la fuente y conduce a una acción pública, editorial o institucional.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2">
            {audiences.map((audience) => {
              const Icon = audience.icon;
              return (
                <article key={audience.label} className="bg-panel p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4"><Icon className="h-5 w-5 text-rust" aria-hidden /><span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted">{audience.label}</span></div>
                  <h2 className="mt-10 max-w-lg text-2xl font-medium leading-tight tracking-[-0.035em] text-ink">{audience.question}</h2>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-ink/62">{audience.answer}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <section className="bg-[#15211d] py-12 text-white md:py-16">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-md bg-white/15 md:grid-cols-4">
            {cycle.map((stage) => (
              <article key={stage.number} className="bg-[#15211d] p-6 md:min-h-[270px]">
                <span className="text-xs font-semibold text-[#d9a48f]">{stage.number}</span>
                <h2 className="mt-14 text-xl font-medium tracking-[-0.025em] text-white">{stage.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/55">{stage.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Productos y servicios</Eyebrow><Heading size="xl">Una agenda que no termina el día de la elección.</Heading></div>
            <p className="text-sm leading-7 text-ink/65">Los productos públicos informan a ciudadanía, medios y equipos técnicos. Los encargos privados o institucionales tienen reglas de independencia, confidencialidad y uso responsable de datos.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <NextLink key={product.title} href={product.href} className="group rounded-md border border-border bg-panel p-6 transition-all hover:-translate-y-0.5 hover:border-border-strong">
                  <div className="flex items-start justify-between"><Icon className="h-5 w-5 text-rust" /><div className="flex gap-2"><Badge>{product.label}</Badge><Badge>{product.status}</Badge></div></div>
                  <h2 className="mt-10 text-2xl font-medium tracking-[-0.03em] text-ink">{product.title}</h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-ink/65">{product.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">{product.metrics.map((metric) => <span key={metric} className="rounded-full border border-border bg-canvas px-3 py-1.5 text-[10px] font-medium text-ink/65">{metric}</span>)}</div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">Explorar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </NextLink>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Agenda de producto</Eyebrow>
              <Heading size="xl">Construir primero la capa confiable.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">Las alertas y comparaciones electorales solo son útiles si cada registro conserva territorio, fuente, fecha de captura y estado de consolidación.</p>
              <Button href="/insights/arquitectura-datos-electorales-subnacionales" variant="ghost" className="mt-7 gap-2">Leer el enfoque <ArrowRight className="h-4 w-4" aria-hidden /></Button>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {developmentAgenda.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="grid gap-5 py-6 sm:grid-cols-[44px_1fr_auto] sm:items-start">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-canvas"><Icon className="h-4 w-4 text-rust" aria-hidden /></span>
                    <div><h2 className="text-lg font-medium tracking-[-0.02em] text-ink">{item.title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-ink/60">{item.description}</p></div>
                    <Badge className="w-fit">{item.status}</Badge>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="rounded-[1.5rem] bg-rust px-7 py-12 text-white md:px-12 md:py-16">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><Eyebrow className="text-white/58">Análisis a medida</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Dinos qué territorio, decisión o proceso necesitas comprender.</h2></div>
              <Button href="/contact?interest=electoral&from=/electoral" analyticsEvent="cta_click" analyticsTarget="electoral:final-contact" variant="secondary" className="rounded-full border-white bg-white px-6 text-ink">Plantear una necesidad</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

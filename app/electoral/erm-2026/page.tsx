import { ArrowRight, BarChart3, Check, ExternalLink, FileStack, Landmark, MapPinned, Route, ShieldCheck } from "lucide-react";
import NextLink from "next/link";
import { ErmVisual } from "@/components/brand/erm-visual";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, ogImagePath, serviceJsonLd } from "@/lib/seo";

const contactHref = "/contact?interest=electoral&from=/electoral/erm-2026";

const modules = [
  {
    icon: MapPinned,
    number: "01",
    title: "Agenda territorial y primeros 100 días",
    promise: "Convertir problemas, compromisos y evidencia en una cartera priorizada.",
    deliverables: ["Perfil territorial", "Matriz de prioridades", "Hitos de 30, 60 y 100 días"],
    href: "/solutions/diagnostico-agenda-territorial"
  },
  {
    icon: FileStack,
    number: "02",
    title: "Transferencia orientada a decisiones",
    promise: "Separar continuidad, riesgos críticos, pendientes y decisiones que no pueden esperar.",
    deliverables: ["Inventario trazable", "Mapa de riesgos", "Brief para la nueva autoridad"],
    href: "/insights/transferencia-gestion-municipal-capacidad"
  },
  {
    icon: BarChart3,
    number: "03",
    title: "Encuestas y escucha territorial",
    promise: "Comprender prioridades, experiencia de servicios y diferencias entre territorios.",
    deliverables: ["Diseño metodológico", "Análisis por segmentos", "Lectura ejecutiva"],
    href: "/solutions/encuestas-escucha-ciudadana"
  },
  {
    icon: Route,
    number: "04",
    title: "Tablero de compromisos y gestión",
    promise: "Conectar prioridades, responsables, presupuesto, proyectos e indicadores desde el inicio.",
    deliverables: ["Catálogo de indicadores", "Dashboard ejecutivo", "Rutina de seguimiento"],
    href: "/solutions/observatorio-gestion-inversiones"
  }
];

const openResources = [
  { type: "Brief dinámico", title: "Preparación de gestión por territorio", description: "Datos, preguntas de transición y una secuencia 30–60–100 para cualquier municipalidad.", href: "/electoral/erm-2026/territorios/150122" },
  { type: "Plataforma", title: "Perfiles de 1,891 municipalidades", description: "Población, presupuesto, inversión, proyectos y capacidades declaradas.", href: "/dataperu/municipios" },
  { type: "Guía", title: "Protocolo mínimo de transferencia", description: "Una estructura para ordenar evidencia, riesgos, responsables y plazos.", href: "/toolkits/protocolo-transferencia-gestion" },
  { type: "Plantilla", title: "Matriz de prioridades de 100 días", description: "Seis criterios para pasar de una lista política a una agenda operable.", href: "/toolkits/matriz-prioridades-100-dias" },
  { type: "Demostración", title: "Planómetro 2026", description: "Arquitectura reproducible para comparar planes y conservar trazabilidad documental.", href: "/electoral/planometro-2026" }
];

const operatingPrinciples = [
  "No garantizamos resultados electorales ni presentamos asociaciones como predicciones.",
  "Separamos producto ciudadano, análisis público y encargo confidencial.",
  "Cada dato debe conservar fuente, fecha, definición y límite de lectura.",
  "La transición complementa, pero no reemplaza, obligaciones formales, legales o de control."
];

const faqItems = [
  { title: "¿Trabajan con municipalidades pequeñas?", content: "Sí. El alcance puede comenzar con un perfil territorial, una agenda breve o un tablero acotado construido sobre información pública. La propuesta se ajusta a la decisión, al plazo y a la capacidad real de la entidad." },
  { title: "¿Es necesario esperar al resultado electoral?", content: "No para ordenar información pública, definir criterios o preparar herramientas. La transferencia formal y cualquier uso institucional deben respetar las competencias, reglas y tiempos aplicables a cada entidad." },
  { title: "¿Pueden trabajar con equipos políticos?", content: "Podemos realizar análisis programático, territorial o de opinión bajo reglas explícitas de independencia, confidencialidad y uso responsable. No ofrecemos manipulación, desinformación ni garantías de resultado electoral." },
  { title: "¿La entidad debe entregar una base de datos?", content: "No necesariamente. Podemos iniciar con DataPerú y otras fuentes oficiales. Si existen datos internos, primero acordamos acceso, finalidad, seguridad, calidad y responsables." },
  { title: "¿El resultado es un informe o un sistema?", content: "Puede ser una agenda ejecutiva, un diagnóstico, una encuesta, un tablero, un visor o una combinación. La forma se elige según quién debe usarla y qué decisión debe mejorar." }
];

export const metadata = buildMetadata({
  title: "ERM 2026: territorio, transición y gestión",
  description: "Datos, diagnósticos, encuestas, transferencia y sistemas de seguimiento para convertir las ERM 2026 en capacidad de gobierno regional y local.",
  path: "/electoral/erm-2026",
  image: ogImagePath("electoral", "erm-2026")
});

export default function Erm2026Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Electoral", path: "/electoral" }, { name: "ERM 2026", path: "/electoral/erm-2026" }])} />
      <JsonLd data={serviceJsonLd({ name: "Inteligencia territorial y transición ERM 2026", description: "Diagnósticos, encuestas, transferencia, agendas de 100 días y sistemas de seguimiento para gobiernos regionales y locales.", url: "https://noam.pe/electoral/erm-2026" })} />
      <JsonLd data={faqJsonLd(faqItems)} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.92fr_1fr] lg:items-center lg:gap-20">
            <div>
              <Eyebrow className="reveal text-[#d9a48f]">ERM 2026 · Región · Provincia · Distrito</Eyebrow>
              <Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[12ch] text-white">De la elección a una gestión que pueda comenzar.</Heading>
              <p className="reveal reveal-delay-2 mt-7 max-w-xl text-base leading-8 text-white/68">Datos territoriales, transferencia, prioridades y sistemas de seguimiento para equipos que necesitan llegar al primer día con mejores preguntas y una ruta operable.</p>
              <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3">
                <Button href={contactHref} analyticsEvent="cta_click" analyticsTarget="erm:hero-contact" variant="secondary" className="rounded-full border-white bg-white text-ink">Preparar una gestión</Button>
                <Button href="/dataperu/municipios" variant="ghost" className="gap-2 !text-white/70 hover:!text-white">Explorar un territorio <ArrowRight className="h-4 w-4" aria-hidden /></Button>
              </div>
            </div>
            <ErmVisual className="reveal reveal-delay-2" />
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container>
          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {[
              ["1,891", "perfiles municipales", "DataPerú 2025"],
              ["25", "departamentos", "Cobertura nacional"],
              ["04 OCT", "jornada electoral", "JNE · 2026"],
              ["4", "momentos de decisión", "Elección → gestión"]
            ].map(([value, label, note]) => (
              <div key={label} className="py-7 sm:px-6 sm:first:pl-0 md:py-9">
                <p className="text-3xl font-medium tracking-[-0.055em] text-ink md:text-4xl">{value}</p>
                <p className="mt-2 text-xs font-medium text-ink/72">{label}</p>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">{note}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.62fr_1fr] md:items-end">
            <div><Eyebrow>Oferta para gobiernos y equipos</Eyebrow><Heading size="xl">Cuatro módulos. Una secuencia de gestión.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/68 md:justify-self-end">Cada módulo puede contratarse por separado o integrarse en una ruta que comienza con el territorio y termina en una capacidad de seguimiento.</p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <article key={module.number} className="flex min-h-[360px] flex-col bg-panel p-6 md:p-8">
                  <div className="flex items-center justify-between"><Icon className="h-5 w-5 text-rust" aria-hidden /><span className="font-mono text-[10px] text-muted">{module.number}</span></div>
                  <h2 className="mt-12 max-w-md text-2xl font-medium leading-tight tracking-[-0.035em] text-ink md:text-3xl">{module.title}</h2>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-ink/65">{module.promise}</p>
                  <ul className="mt-6 space-y-2 text-xs leading-5 text-ink/62">
                    {module.deliverables.map((item) => <li key={item} className="flex items-start gap-2"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rust" aria-hidden />{item}</li>)}
                  </ul>
                  <NextLink href={module.href} className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-ink transition-colors hover:text-rust">Ver enfoque <ArrowRight className="h-4 w-4" aria-hidden /></NextLink>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#ded9cc]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Disponible ahora</Eyebrow><Heading size="xl">Valor antes de una contratación.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">La capa abierta permite conocer el enfoque, probar herramientas y formular mejor una necesidad institucional.</p></div>
            <div className="divide-y divide-ink/15 border-y border-ink/15">
              {openResources.map((resource, index) => (
                <NextLink key={resource.href} href={resource.href} className="group grid grid-cols-[38px_1fr_auto] items-center gap-4 py-6">
                  <span className="font-mono text-[10px] text-rust">{String(index + 1).padStart(2, "0")}</span>
                  <span><span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">{resource.type}</span><span className="mt-2 block text-base font-medium text-ink">{resource.title}</span><span className="mt-2 hidden max-w-2xl text-xs leading-5 text-ink/58 sm:block">{resource.description}</span></span>
                  <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-rust" aria-hidden />
                </NextLink>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#15211d] text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><ShieldCheck className="h-5 w-5 text-[#d9a48f]" aria-hidden /><Eyebrow className="mt-6 text-[#d9a48f]">Independencia y rigor</Eyebrow><Heading size="xl" className="text-white">Análisis electoral sin atajos.</Heading><p className="mt-5 text-sm leading-7 text-white/58">La utilidad pública y la confianza importan más que una afirmación llamativa.</p></div>
            <ul className="divide-y divide-white/14 border-y border-white/14">
              {operatingPrinciples.map((principle, index) => <li key={principle} className="grid grid-cols-[36px_1fr] gap-4 py-5"><span className="font-mono text-[10px] text-[#d9a48f]">0{index + 1}</span><p className="text-sm leading-6 text-white/68">{principle}</p></li>)}
            </ul>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <Landmark className="h-5 w-5 text-rust" aria-hidden />
              <Eyebrow className="mt-6">Proceso oficial</Eyebrow>
              <Heading size="lg">Una fuente única para el calendario electoral.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">Las fechas y disposiciones pueden actualizarse. Para hitos legales consulta siempre el JNE y la normativa vigente.</p>
            </div>
            <div className="grid gap-3">
              <a href="https://portal.jne.gob.pe/portal/Pagina/Ver/1229/page/Elecciones-Regionales-y-Municipales-2026" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-5 rounded-md border border-border bg-panel p-5 text-sm font-medium text-ink transition-colors hover:border-rust/45">Portal oficial ERM 2026 del JNE <ExternalLink className="h-4 w-4 text-muted group-hover:text-rust" aria-hidden /></a>
              <a href="https://www.gob.pe/institucion/jne/informes-publicaciones/8055863-cronograma-electoral-de-las-elecciones-regionales-y-municipales-2026" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-5 rounded-md border border-border bg-panel p-5 text-sm font-medium text-ink transition-colors hover:border-rust/45">Cronograma electoral publicado por el JNE <ExternalLink className="h-4 w-4 text-muted group-hover:text-rust" aria-hidden /></a>
              <a href="https://www.gob.pe/institucion/pcm/normas-legales/7634472-001-2026-pcm" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-5 rounded-md border border-border bg-panel p-5 text-sm font-medium text-ink transition-colors hover:border-rust/45">Decreto Supremo de convocatoria <ExternalLink className="h-4 w-4 text-muted group-hover:text-rust" aria-hidden /></a>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container size="narrow">
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <Heading size="xl">Antes de preparar el alcance.</Heading>
          <Accordion items={faqItems} className="mt-8" />
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-7 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><Eyebrow className="text-white/55">ERM 2026</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Llega al primer día con una lectura del territorio y una agenda que pueda ejecutarse.</h2></div>
              <Button href={contactHref} analyticsEvent="cta_click" analyticsTarget="erm:final-contact" variant="secondary" className="rounded-full border-white bg-white px-6 text-ink">Plantear el contexto</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

import {
  ArrowRight,
  BarChart3,
  Check,
  ClipboardCheck,
  MapPinned,
  MessageSquareText,
  Sparkles
} from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Contratar estudios y servicios de análisis de datos",
  description: "Guía para gobiernos y empresas que necesitan contratar diagnósticos, líneas de base, evaluaciones, encuestas, observatorios, dashboards o IA aplicada en el Perú.",
  path: "/contratar-analisis-datos"
});

const decisionPaths = [
  {
    number: "01",
    icon: MapPinned,
    title: "Comprender un problema o territorio",
    question: "¿Qué ocurre, a quién afecta, por qué y qué debería priorizarse?",
    suitableFor: "Diagnósticos, agendas territoriales, caracterización y línea de base.",
    expected: "Perfil de situación, brechas, causas, prioridades y agenda de decisión.",
    guide: { label: "TDR para estudios y análisis", href: "/toolkits/tdr-estudio-analisis-datos" },
    sample: { label: "Ver muestra de diagnóstico", href: "/muestras/diagnostico-agenda-territorial" },
    solution: { label: "Diagnóstico y agenda territorial", href: "/solutions/diagnostico-agenda-territorial" }
  },
  {
    number: "02",
    icon: MessageSquareText,
    title: "Escuchar a población, usuarios o clientes",
    question: "¿Qué perciben, necesitan, experimentan o prefieren distintos grupos?",
    suitableFor: "Encuestas, estudios de satisfacción, escucha territorial y segmentación.",
    expected: "Diseño, muestra, instrumento, base trazable, análisis e implicancias.",
    guide: { label: "TDR para encuestas", href: "/toolkits/tdr-encuesta-estudio-territorial" },
    sample: { label: "Ver muestra de encuesta", href: "/muestras/encuesta-escucha-territorial" },
    solution: { label: "Encuestas y escucha territorial", href: "/solutions/encuestas-escucha-ciudadana" }
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Medir un programa, proyecto o política",
    question: "¿Cuál era el punto de partida, cómo se implementó y qué cambió?",
    suitableFor: "Líneas de base, evaluaciones de diseño, proceso, resultados o impacto.",
    expected: "Teoría de cambio, indicadores, diseño evaluativo, evidencia y aprendizaje.",
    guide: { label: "Elegir línea de base o evaluación", href: "/linea-base-evaluacion-impacto" },
    sample: { label: "Ver muestra de evaluación", href: "/muestras/linea-base-evaluacion-programa" },
    solution: { label: "Línea de base y evaluación", href: "/solutions/linea-base-evaluacion-programas" }
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Monitorear gestión, inversión o servicios",
    question: "¿Qué requiere atención, quién responde y qué evidencia confirma el avance?",
    suitableFor: "Observatorios, dashboards, visores, alertas y salas de seguimiento.",
    expected: "Indicadores, fuentes, vistas, responsables y rutina de actualización.",
    guide: { label: "TDR para observatorios", href: "/toolkits/tdr-observatorio-dashboard-visor" },
    sample: { label: "Ver muestra de observatorio", href: "/muestras/observatorio-gestion-inversiones" },
    solution: { label: "Observatorio de gestión", href: "/solutions/observatorio-gestion-inversiones" }
  },
  {
    number: "05",
    icon: Sparkles,
    title: "Mejorar un proceso con automatización o IA",
    question: "¿Qué tarea consume tiempo y puede probarse sin perder control humano?",
    suitableFor: "Búsqueda documental, clasificación, atención, alertas y apoyo analítico.",
    expected: "Caso priorizado, línea de base, piloto, controles y decisión de escala.",
    guide: { label: "Priorizar un caso de uso", href: "/toolkits/ficha-priorizacion-caso-uso-ia" },
    sample: { label: "Ver muestra de piloto", href: "/muestras/piloto-ia-documental" },
    solution: { label: "IA para procesos públicos", href: "/solutions/ia-procesos-publicos" }
  }
];

const commonControls = [
  { title: "Decisión y usuarios", text: "Qué debe poder decidirse, quién utilizará el resultado y en qué momento." },
  { title: "Fuentes y accesos", text: "Qué información existe, qué falta, quién la autoriza y qué límites tiene." },
  { title: "Productos y conformidad", text: "Qué archivos, sistemas o sesiones se entregan y cómo se comprobará su calidad." },
  { title: "Transferencia y continuidad", text: "Qué debe quedar documentado, quién actualizará y cómo se recuperan los activos." }
];

const proofLinks = [
  { label: "Consultoría institucional", title: "GORE Cusco", text: "Evaluación regional para decisiones de prevención.", href: "/cases/gore-cusco-evaluacion-prevencion-trata" },
  { label: "Consultoría institucional", title: "IPD", text: "Arquitectura estadística e investigación deportiva.", href: "/cases/ipd-sistema-estadistico-investigacion-deportiva" },
  { label: "Consultoría institucional", title: "CONCYTEC", text: "Evidencia y priorización de CTI para seguridad.", href: "/cases/concytec-prioridades-cti-seguridad" },
  { label: "Producto propio", title: "DataPerú", text: "Infraestructura territorial para 1,891 municipalidades.", href: "/cases/dataperu-platform-case" },
  { label: "Producto propio", title: "Planómetro 2026", text: "Comparación trazable de 36 planes de gobierno.", href: "/cases/planometro-electoral-product" },
  { label: "Análisis aplicado", title: "Barómetro Electoral", text: "De 1,300 entrevistas a una lectura pública integrada.", href: "/cases/barometro-electoral-enero-2026" }
];

const faq = [
  { title: "¿NOAM puede responder a TDR ya publicados?", content: "Sí. Revisamos objetivos, alcance, productos, fuentes, plazo y criterios de aceptación para confirmar el encaje y preparar una propuesta técnica coherente." },
  { title: "¿Qué pasa si la entidad todavía no tiene datos ordenados?", content: "El primer encargo puede ser un inventario, diagnóstico de calidad o diseño de alcance. No conviene prometer un análisis o dashboard antes de confirmar acceso, cobertura y responsabilidad sobre las fuentes." },
  { title: "¿Trabajan con municipalidades y gobiernos fuera de Lima?", content: "Sí. El alcance puede ser distrital, provincial, regional o nacional. La combinación de trabajo remoto, fuentes administrativas y presencia territorial se define según el problema y el método." },
  { title: "¿Pueden encargarse del diseño y también de la ejecución?", content: "Sí. Un encargo puede cubrir solo el diseño metodológico, la producción completa o el acompañamiento posterior. Los límites y responsables se acuerdan antes de cotizar." },
  { title: "¿Toda evaluación debe medir impacto causal?", content: "No. Primero se revisan teoría de cambio, implementación, datos y comparación posible. Según la decisión pueden ser más útiles una evaluación de diseño, proceso, resultados o evaluabilidad." },
  { title: "¿Se puede comenzar con un presupuesto acotado?", content: "Sí. Se puede priorizar una pregunta, un territorio o un producto mínimo útil. Reducir alcance no debe eliminar trazabilidad, protección de datos ni criterios de aceptación." }
];

export default function ContractDataAnalysisPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Contratar análisis de datos", path: "/contratar-analisis-datos" }])} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Contratar estudios y servicios de análisis de datos",
        description: "Rutas para definir y contratar estudios, encuestas, evaluaciones, observatorios y soluciones de IA aplicada.",
        url: `${siteConfig.url}/contratar-analisis-datos`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: decisionPaths.map((path, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: path.title,
            url: `${siteConfig.url}${path.solution.href}`
          }))
        }
      }} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.48fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="text-[#d9a48f]">Guía para contratar</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[14ch] text-white">El análisis correcto empieza por la decisión, no por la herramienta.</Heading>
            </div>
            <div>
              <p className="text-base leading-8 text-white/68">Para gobiernos y empresas que necesitan comprender un problema, formular un proyecto, medir un programa, escuchar un territorio o instalar un sistema de decisión.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#decisiones" variant="secondary" className="rounded-full border-white bg-white text-ink">Encontrar un punto de partida</Button>
                <Button href="/resources?type=template" variant="ghost" className="!text-white/70 hover:!text-white">Ver TDR y plantillas</Button>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">
            {["Distrital, provincial, regional o nacional", "Proyecto, programa, política o inversión", "Guías, muestras y casos antes del contacto"].map((item, index) => (
              <div key={item} className="bg-[#192823] p-6 md:p-8">
                <span className="font-mono text-[10px] text-[#d9a48f]">0{index + 1}</span>
                <p className="mt-9 max-w-[22ch] text-lg font-medium leading-6 tracking-[-0.02em] text-white/86">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section id="decisiones">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Qué necesitas decidir</Eyebrow><Heading size="xl">Cinco rutas para no contratar a ciegas.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Una misma institución puede necesitar varias rutas, pero el primer alcance debe resolver una decisión concreta. Cada opción enlaza una guía, una muestra y una solución.</p>
          </div>

          <div className="mt-12 divide-y divide-border border-y border-border">
            {decisionPaths.map(({ number, icon: Icon, title, question, suitableFor, expected, guide, sample, solution }) => (
              <article key={number} className="grid gap-7 py-9 lg:grid-cols-[72px_0.85fr_1.15fr] lg:gap-12 lg:py-12">
                <div className="flex items-center gap-4 lg:block"><span className="font-mono text-[10px] text-rust">{number}</span><Icon className="h-5 w-5 text-rust lg:mt-9" aria-hidden /></div>
                <div><h2 className="text-2xl font-medium leading-tight tracking-[-0.035em] text-ink md:text-3xl">{title}</h2><p className="mt-4 text-base leading-7 text-ink/76">{question}</p></div>
                <div>
                  <dl className="grid gap-5 sm:grid-cols-2">
                    <div><dt className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Sirve para</dt><dd className="mt-2 text-sm leading-6 text-ink/65">{suitableFor}</dd></div>
                    <div><dt className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Producto esperado</dt><dd className="mt-2 text-sm leading-6 text-ink/65">{expected}</dd></div>
                  </dl>
                  <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium">
                    <NextLink href={guide.href} className="text-rust transition-colors hover:text-ink">{guide.label}</NextLink>
                    <NextLink href={sample.href} className="text-rust transition-colors hover:text-ink">{sample.label}</NextLink>
                    <NextLink href={solution.href} className="inline-flex items-center gap-1.5 text-ink">{solution.label}<ArrowRight className="h-3.5 w-3.5" aria-hidden /></NextLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Antes de cotizar</Eyebrow><Heading size="xl">Cuatro definiciones que protegen el encargo.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">No importa si el producto final es un informe, una base, un tablero o un piloto: estos controles deben poder verificarse.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {commonControls.map((control, index) => (
                <article key={control.title} className="min-h-[220px] bg-canvas p-6 md:p-8">
                  <div className="flex items-center justify-between"><Check className="h-4 w-4 text-rust" aria-hidden /><span className="font-mono text-[10px] text-muted">0{index + 1}</span></div>
                  <h2 className="mt-12 text-xl font-medium tracking-[-0.025em] text-ink">{control.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/62">{control.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Antes de confiar</Eyebrow><Heading size="xl">Experiencia y productos que puedes examinar.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Separamos consultorías institucionales, productos propios y análisis aplicados. Cada ficha declara alcance, método y límites de divulgación.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {proofLinks.map((proof) => (
              <NextLink key={proof.href} href={proof.href} className="group min-h-[230px] bg-canvas p-6 transition-colors hover:bg-panel md:p-8">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-rust">{proof.label}</span>
                <h2 className="mt-12 text-2xl font-medium tracking-[-0.035em] text-ink">{proof.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/62">{proof.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-ink">Examinar evidencia <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </NextLink>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#ded9cc]">
        <Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Antes de solicitar una propuesta.</Heading><Accordion items={faq} className="mt-8 bg-[#e6e1d5]" /></Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-7 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><Eyebrow className="text-white/55">Primer alcance</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Describe la decisión, el territorio y el plazo. El método viene después.</h2></div>
              <div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/contratar-analisis-datos" analyticsEvent="cta_click" analyticsTarget="contract-hub:scope" variant="secondary" className="rounded-full border-white bg-white text-ink">Diseñar un alcance</Button><Button href="/contact?from=/contratar-analisis-datos" analyticsEvent="cta_click" analyticsTarget="contract-hub:contact" variant="ghost" className="!text-white/70 hover:!text-white">Plantear un encargo</Button></div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

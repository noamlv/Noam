import {
  ArrowRight,
  BadgeCheck,
  ChartNoAxesCombined,
  MapPinned,
  Radar,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/analisis-datos-seguridad-ciudadana";

export const metadata = buildMetadata({
  title: "Análisis de datos para seguridad ciudadana municipal y regional",
  description: "Diagnósticos, encuestas, mapas y observatorios para priorizar intervenciones, seguir compromisos y evaluar resultados de seguridad ciudadana en Perú.",
  path
});

const decisions = [
  { icon: Radar, title: "Diagnóstico de seguridad", question: "¿Qué hechos, percepciones y capacidades requieren atención?", use: "Identificar prioridades territoriales y una situación inicial para orientar los planes de seguridad." },
  { icon: MapPinned, title: "Zonas de intervención", question: "¿Dónde coinciden incidentes, población expuesta y capacidad de respuesta?", use: "Preparar mapas para orientar el patrullaje, la prevención y la recuperación de espacios." },
  { icon: UsersRound, title: "Experiencias de la población", question: "¿Qué vive y evita la población, incluso cuando no denuncia?", use: "Estudiar victimización, percepción y confianza mediante encuestas que distingan cada experiencia." },
  { icon: ChartNoAxesCombined, title: "Seguimiento de compromisos", question: "¿Qué acuerdos avanzan y qué señales requieren una respuesta?", use: "Organizar indicadores y alertas para las reuniones de los comités de seguridad ciudadana." },
  { icon: BadgeCheck, title: "Evaluación de intervenciones", question: "¿La intervención se ejecutó y produjo el cambio esperado?", use: "Evaluar la ejecución, los resultados o el impacto según los datos y el diseño disponibles." }
];

const evidenceChain = [
  { number: "01", title: "Pregunta de análisis", text: "Definir qué problema se busca resolver, quién puede actuar y qué decisión necesita información." },
  { number: "02", title: "Territorio y periodo", text: "Delimitar zonas, población y horarios que puedan compararse durante un periodo definido." },
  { number: "03", title: "Fuentes", text: "Revisar denuncias, encuestas y llamadas junto con registros de capacidad de respuesta y contexto." },
  { number: "04", title: "Calidad de los registros", text: "Comprobar duplicados, hechos no registrados y cambios de cobertura, además de las poblaciones de referencia y la vigencia." },
  { number: "05", title: "Protección de datos", text: "Limitar accesos según responsabilidades, publicar datos agregados y registrar cómo se usa la información sensible." },
  { number: "06", title: "Respuesta y seguimiento", text: "Definir qué señal activa una respuesta, quién la ejecuta y cómo se comprobará su cierre y resultado." }
];

const evidence = [
  { label: "Datos municipales", title: "Seguridad en DataPerú", text: "Serenazgo, planes, mapas y patrullaje declarados en RENAMU 2025.", href: "/dataperu/temas/seguridad-ciudadana" },
  { label: "Guía de trabajo", title: "Guía de análisis", text: "Preguntas para elegir fuentes, proteger datos y definir qué debe entregar el análisis.", href: "/toolkits/tdr-analisis-seguridad-ciudadana" },
  { label: "Capacidad", title: "Diagnóstico territorial", text: "Cómo estudiar población, servicios y capacidades para identificar prioridades.", href: "/diagnostico-territorial" },
  { label: "Capacidad", title: "Encuestas y opinión", text: "Cómo medir victimización, percepción y confianza, explicando los límites de la encuesta.", href: "/encuestas-estudios-opinion" },
  { label: "Capacidad", title: "Observatorios y visores", text: "Cómo organizar indicadores, mapas y alertas con responsables de darles seguimiento.", href: "/observatorios-dashboards-visores" },
  { label: "Producto", title: "Visor georreferenciado", text: "Prototipo para explorar mapas y prioridades territoriales.", href: "/products/visor-riesgo-georreferenciado" }
];

const faq = [
  { title: "¿Pueden elaborar un diagnóstico para una municipalidad pequeña?", content: "Sí. El alcance se ajusta a la decisión, las competencias y los datos disponibles. Puede comenzar con fuentes abiertas y registros locales, identificar vacíos y definir una agenda de medición gradual." },
  { title: "¿Un mapa del delito muestra dónde existe más delincuencia?", content: "No necesariamente. Depende de qué hechos se registran, quién denuncia, cómo se geocodifican y durante qué periodo. Debe leerse junto con cobertura, subregistro, población expuesta y cambios operativos." },
  { title: "¿Pueden diseñar una encuesta de victimización o percepción?", content: "Sí. Definimos población, muestra, cuestionario, campo, supervisión, ponderación y precisión. Victimización, percepción de inseguridad y confianza son conceptos diferentes y deben reportarse por separado." },
  { title: "¿El observatorio reemplaza al equipo de seguridad ciudadana?", content: "No. Organiza datos y responsabilidades para apoyar reuniones y decisiones. La entidad conserva conducción, validación, atención operativa y custodia de la información." },
  { title: "¿Pueden evaluar patrullaje, videovigilancia u otra intervención?", content: "Sí, pero el tipo de conclusión depende del diseño. El seguimiento describe ejecución; una evaluación de resultados requiere una línea de base y comparación adecuada; atribuir impacto exige condiciones más rigurosas." },
  { title: "¿Cómo protegen información sensible?", content: "El alcance debe clasificar datos, reducir el detalle al mínimo necesario, establecer perfiles de acceso, registrar actividad y evitar publicar ubicaciones o conteos que expongan víctimas, denunciantes u operaciones." }
];

export default function CitizenSecurityDataPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Análisis de datos para seguridad ciudadana", path }])} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Análisis de datos para seguridad ciudadana municipal y regional",
        description: "Diagnósticos, encuestas, mapas, observatorios y evaluaciones para la gestión territorial de la seguridad ciudadana.",
        url: `${siteConfig.url}${path}`,
        provider: { "@type": "Organization", name: "NOAM", url: siteConfig.url },
        areaServed: { "@type": "Country", name: "Perú" }
      }} />

      <section className="overflow-hidden bg-[#18221f] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.46fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="text-[#a7c8b9]">Seguridad ciudadana y territorio</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[15ch] text-white">¿Dónde y cómo priorizar la seguridad ciudadana?</Heading>
            </div>
            <div>
              <p className="text-base leading-8 text-white/68">Aquí encontrarás preguntas y fuentes para estudiar hechos delictivos, experiencias de la población y capacidad de respuesta municipal. Se explica qué puede aportar un diagnóstico, un mapa, una encuesta o una evaluación.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/dataperu/temas/seguridad-ciudadana" variant="secondary" className="rounded-full border-white bg-white text-ink">Ver datos municipales de seguridad</Button>
                <Button href="/toolkits/tdr-analisis-seguridad-ciudadana" variant="ghost" className="!text-white/70 hover:!text-white">Leer la guía</Button>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">
            {["Gobiernos regionales y locales", "Prevención, operación y seguimiento", "Datos públicos, registros y trabajo de campo"].map((item, index) => (
              <div key={item} className="bg-[#222d29] p-6 md:p-8">
                <span className="font-mono text-[10px] text-[#a7c8b9]">0{index + 1}</span>
                <p className="mt-9 max-w-[26ch] text-lg font-medium leading-6 tracking-[-0.02em] text-white/86">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section id="decisiones">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Qué podemos analizar</Eyebrow><Heading size="xl">Diagnósticos, mapas, encuestas y evaluación</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Cada herramienta responde una pregunta: dónde actuar, qué vive la población, qué compromisos avanzan o qué cambió con una intervención.</p>
          </div>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {decisions.map(({ icon: Icon, title, question, use }, index) => (
              <article key={title} className="grid gap-6 py-9 md:grid-cols-[64px_0.75fr_1fr] md:gap-10 md:py-11">
                <div className="flex items-center gap-4 md:block"><span className="font-mono text-[10px] text-[#2f5c52]">0{index + 1}</span><Icon className="h-5 w-5 text-[#2f5c52] md:mt-8" aria-hidden /></div>
                <div><h2 className="text-2xl font-medium tracking-[-0.035em] text-ink">{title}</h2><p className="mt-4 text-sm leading-7 text-ink/72">{question}</p></div>
                <div><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Aplicaciones</span><p className="mt-3 text-sm leading-7 text-ink/62">{use}</p></div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><ShieldCheck className="h-5 w-5 text-[#2f5c52]" aria-hidden /><Eyebrow className="mt-6">Qué información revisar</Eyebrow><Heading size="xl">Cómo preparar un análisis de seguridad ciudadana</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Para usar los resultados hay que comparar datos equivalentes, proteger la información sensible y definir quién actuará.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {evidenceChain.map((item) => (
                <article key={item.number} className="min-h-[190px] bg-canvas p-6 md:p-8">
                  <span className="font-mono text-[10px] text-[#2f5c52]">{item.number}</span>
                  <h2 className="mt-9 text-xl font-medium tracking-[-0.025em] text-ink">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-b border-border bg-[#e0ebe5]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.46fr_1fr] lg:gap-20">
            <div><Eyebrow>Marco y fuentes</Eyebrow><Heading size="xl">Fuentes sobre delitos, percepción y gestión municipal</Heading></div>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-ink/72">
              <p>El Plan Nacional de Seguridad Ciudadana y Lucha contra la Criminalidad 2026–2028 orienta la acción articulada y su seguimiento. El Observatorio Nacional reúne bases sobre hechos delictivos, victimización, percepción, factores de riesgo y capacidades; el INEI produce estimaciones mediante ENAPRES.</p>
              <p>DataPerú añade una lectura de capacidades municipales declaradas en RENAMU 2025. No mide incidencia delictiva, victimización ni efectividad; tampoco produce un ranking de seguridad.</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#285348]">
                <a href="https://www.gob.pe/institucion/mininter/normas-legales/7839580-001-2026-in" target="_blank" rel="noreferrer">Plan Nacional 2026–2028</a>
                <a href="https://observatorio.mininter.gob.pe/basededatos" target="_blank" rel="noreferrer">Bases del Observatorio</a>
                <a href="https://www.inei.gob.pe/media/MenuRecursivo/boletines/seguridad_ciudadana_jul_dic_2025.pdf" target="_blank" rel="noreferrer">Estadísticas del INEI</a>
                <NextLink href="/dataperu/temas/seguridad-ciudadana">Capacidades en DataPerú</NextLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Evidencia y servicios</Eyebrow><Heading size="xl">Datos municipales, guía y herramientas de análisis</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Consulta las capacidades municipales declaradas o revisa métodos para estudiar experiencias y seguir intervenciones.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {evidence.map((item) => (
              <NextLink key={item.href} href={item.href} className="group min-h-[225px] bg-canvas p-6 transition-colors hover:bg-panel md:p-8">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2f5c52]">{item.label}</span>
                <h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-ink">{item.href.startsWith("/toolkits/") ? "Leer la guía" : `Ver ${item.title}`} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </NextLink>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Preguntas sobre registros, mapas y privacidad</Heading><Accordion items={faq} className="mt-8" /></Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-[#2f5c52] px-7 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><Eyebrow className="text-white/55">Apoyo opcional</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">¿Necesitas apoyo con un análisis de seguridad ciudadana?</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/75">Puedes describir tu consulta en el formulario para orientar una primera conversación.</p></div>
              <div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/analisis-datos-seguridad-ciudadana" analyticsEvent="cta_click" analyticsTarget="security-hub:scope" variant="secondary" className="rounded-full border-white bg-white text-ink">Describir mi consulta</Button><Button href="/contact?interest=seguridad-ciudadana&from=/analisis-datos-seguridad-ciudadana" analyticsEvent="cta_click" analyticsTarget="security-hub:contact" variant="ghost" className="!text-white/70 hover:!text-white">Conversar con NOAM</Button></div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

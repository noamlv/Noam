import { ArrowRight, Check, ClipboardCheck, GitCompare, LineChart, SearchCheck, Target, Waypoints } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/linea-base-evaluacion-impacto";

export const metadata = buildMetadata({
  title: "Línea de base y evaluación de programas",
  description: "Guía para decidir si un programa, proyecto o política necesita revisión de evaluabilidad, línea de base, seguimiento o evaluación de diseño, proceso, resultados o impacto.",
  path
});

const moments = [
  { number: "01", title: "Antes de implementar", text: "Aclarar la teoría de cambio, establecer el punto de partida y dejar indicadores medibles." },
  { number: "02", title: "Durante la ejecución", text: "Comprobar cobertura, calidad, implementación y señales tempranas para corregir a tiempo." },
  { number: "03", title: "Antes de continuar o escalar", text: "Distinguir productos, resultados y cambios atribuibles para sustentar la siguiente decisión." }
];

const evaluationOptions = [
  { icon: SearchCheck, title: "Revisión de evaluabilidad", question: "¿La intervención está suficientemente definida y documentada para evaluarla?", result: "Mapa de vacíos, riesgos y opciones metodológicas viables." },
  { icon: Target, title: "Línea de base", question: "¿Cuál es la situación inicial de la población, territorio o unidad antes de intervenir?", result: "Indicadores iniciales, instrumentos, base documentada y protocolo de medición." },
  { icon: LineChart, title: "Seguimiento", question: "¿La intervención avanza según lo previsto y qué señales requieren atención?", result: "Indicadores periódicos, alertas, responsables y rutina de uso." },
  { icon: ClipboardCheck, title: "Evaluación de diseño o proceso", question: "¿La lógica es coherente y la implementación ocurre como fue prevista?", result: "Hallazgos sobre diseño, operación, cuellos de botella y mejora." },
  { icon: Waypoints, title: "Evaluación de resultados", question: "¿Qué productos y cambios se observan y cómo varían entre grupos o territorios?", result: "Resultados medidos, diferencias, explicación e implicancias." },
  { icon: GitCompare, title: "Evaluación de impacto", question: "¿Qué cambios pueden atribuirse causalmente a la intervención?", result: "Estimación causal solo cuando existe una comparación válida y condiciones suficientes." }
];

const readinessChecks = [
  "Decisión y usuarios claramente identificados",
  "Intervención, población y elegibilidad documentadas",
  "Teoría de cambio y preguntas evaluables",
  "Indicadores con definiciones, fuentes y periodicidad",
  "Acceso, calidad, privacidad y trazabilidad de datos",
  "Calendario y comparación compatibles con el método"
];

const evidence = [
  { label: "Guía", title: "Diseñar una línea de base", text: "Decisiones, indicadores y controles antes de medir.", href: "/insights/como-disenar-linea-base-programa-publico" },
  { label: "Nota metodológica", title: "Cuándo evaluar impacto", text: "Condiciones que permiten o impiden una inferencia causal defendible.", href: "/insights/cuando-evaluacion-impacto-es-viable" },
  { label: "TDR + plantilla", title: "Contratar línea de base o evaluación", text: "Bloques, preguntas y criterios de aceptación editables.", href: "/toolkits/tdr-linea-base-evaluacion-programa" },
  { label: "Muestra", title: "Arquitectura de un entregable", text: "Forma de trabajo para una línea de base y evaluación.", href: "/muestras/linea-base-evaluacion-programa" },
  { label: "Caso real", title: "Evaluación de resultados en Cusco", text: "Consultoría regional con alcance y límites declarados.", href: "/cases/gore-cusco-evaluacion-prevencion-trata" },
  { label: "Solución", title: "Línea de base y evaluación", text: "Alcance profesional para gobiernos, empresas y organizaciones.", href: "/solutions/linea-base-evaluacion-programas" }
];

const faq = [
  { title: "¿Una línea de base es lo mismo que un diagnóstico?", content: "No necesariamente. Un diagnóstico explica una situación y orienta prioridades. Una línea de base fija mediciones iniciales comparables para seguir cambios de una intervención definida." },
  { title: "¿Toda evaluación debe medir impacto?", content: "No. Según la decisión y la madurez de la intervención, puede ser más útil revisar evaluabilidad, diseño, proceso o resultados. La evaluación de impacto exige condiciones adicionales." },
  { title: "¿Se puede evaluar un programa que ya comenzó?", content: "Sí, pero primero debe revisarse qué registros, mediciones previas y comparaciones existen. La ausencia de una línea de base limita algunas preguntas, aunque no impide todo aprendizaje." },
  { title: "¿Cuándo existe una comparación válida?", content: "Depende del diseño. Puede surgir de asignación aleatoria, reglas de elegibilidad, implementación gradual u otros métodos cuasiexperimentales. Debe definirse antes de prometer atribución causal." },
  { title: "¿NOAM realiza trabajo de campo y análisis?", content: "El alcance puede incluir diseño metodológico, instrumentos, campo, procesamiento, análisis, visualización y transferencia. Cada componente se confirma según territorio, población y riesgos." },
  { title: "¿La guía reemplaza los TDR o la revisión legal de la entidad?", content: "No. Es una orientación técnica para estructurar el requerimiento. La entidad debe confirmar la normativa, documentos estándar y reglas aplicables con sus áreas competentes." }
];

export default function BaselineEvaluationPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Línea de base y evaluación", path }])} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Línea de base y evaluación de programas",
        description: "Rutas para elegir una estrategia de medición y evaluación proporcionada a la decisión.",
        url: `${siteConfig.url}${path}`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: evaluationOptions.map((option, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: option.title
          }))
        }
      }} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.46fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="text-[#d9a48f]">Medición y aprendizaje</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[15ch] text-white">Línea de base, resultados o impacto: primero define qué necesitas demostrar.</Heading>
            </div>
            <div>
              <p className="text-base leading-8 text-white/68">Una ruta práctica para programas, proyectos y políticas que necesitan medir su punto de partida, mejorar su ejecución o sustentar decisiones de continuidad y escala.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#opciones" variant="secondary" className="rounded-full border-white bg-white text-ink">Elegir una evaluación</Button>
                <Button href="/toolkits/tdr-linea-base-evaluacion-programa" variant="ghost" className="!text-white/70 hover:!text-white">Ver TDR y plantilla</Button>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">
            {moments.map((moment) => (
              <article key={moment.number} className="min-h-[220px] bg-[#192823] p-6 md:p-8">
                <span className="font-mono text-[10px] text-[#d9a48f]">{moment.number}</span>
                <h2 className="mt-10 text-xl font-medium tracking-[-0.025em] text-white/90">{moment.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/58">{moment.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Section id="opciones">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Elegir bien</Eyebrow><Heading size="xl">Seis preguntas, seis alcances distintos.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">No son etapas obligatorias ni etiquetas intercambiables. La opción adecuada depende de la decisión, el momento de la intervención y la evidencia disponible.</p>
          </div>

          <div className="mt-12 divide-y divide-border border-y border-border">
            {evaluationOptions.map(({ icon: Icon, title, question, result }, index) => (
              <article key={title} className="grid gap-6 py-9 md:grid-cols-[64px_0.75fr_1fr] md:gap-10 md:py-11">
                <div className="flex items-center gap-4 md:block"><span className="font-mono text-[10px] text-rust">0{index + 1}</span><Icon className="h-5 w-5 text-rust md:mt-8" aria-hidden /></div>
                <div><h2 className="text-2xl font-medium tracking-[-0.035em] text-ink">{title}</h2><p className="mt-4 text-sm leading-7 text-ink/72">{question}</p></div>
                <div><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Producto útil</span><p className="mt-3 text-sm leading-7 text-ink/62">{result}</p></div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.46fr_1fr] lg:gap-20">
            <div><Eyebrow>Evaluabilidad</Eyebrow><Heading size="xl">Antes del método, comprueba las condiciones.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Si faltan definiciones o datos, el primer producto responsable es cerrar esos vacíos, no prometer una estimación causal.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {readinessChecks.map((check, index) => (
                <div key={check} className="min-h-[150px] bg-canvas p-6 md:p-8">
                  <div className="flex items-center justify-between"><Check className="h-4 w-4 text-rust" aria-hidden /><span className="font-mono text-[10px] text-muted">0{index + 1}</span></div>
                  <p className="mt-8 max-w-[28ch] text-base font-medium leading-6 tracking-[-0.02em] text-ink">{check}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.46fr_1fr] lg:gap-20">
            <div><Eyebrow>Marco público</Eyebrow><Heading size="xl">Método conectado con decisiones y reglas vigentes.</Heading></div>
            <div className="max-w-3xl text-base leading-8 text-ink/72">
              <p>CEPLAN ofrece guías para seguimiento, evaluación e indicadores de políticas y planes. El MEF distingue evaluaciones de diseño, proceso e impacto dentro del presupuesto público. Para una contratación concreta, el área usuaria debe confirmar además la normativa y documentación vigente con sus órganos competentes.</p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-rust">
                <a href="https://www.gob.pe/institucion/ceplan/informes-publicaciones/5678657-guia-para-el-seguimiento-y-evaluacion-de-politicas-nacionales-y-planes-del-sinaplan-actualizada-2024" target="_blank" rel="noreferrer">Guía de seguimiento y evaluación de CEPLAN</a>
                <a href="https://www.gob.pe/institucion/ceplan/informes-publicaciones/5614517-guia-para-la-elaboracion-de-indicadores-de-politicas-nacionales-y-planes-estrategicos-actualizada-2024" target="_blank" rel="noreferrer">Guía de indicadores de CEPLAN</a>
                <a href="https://www.mef.gob.pe/es/presupuesto-publico-sp-18162/5357-evaluaciones-de-impacto" target="_blank" rel="noreferrer">Evaluaciones de impacto del MEF</a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#ded9cc]">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Evidencia abierta</Eyebrow><Heading size="xl">Comprueba el enfoque antes de conversar.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Guías, una plantilla editable, una muestra y un caso real. Cada pieza cumple una función distinta y declara sus límites.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-3">
            {evidence.map((item) => (
              <NextLink key={item.href} href={item.href} className="group min-h-[225px] bg-[#e6e1d5] p-6 transition-colors hover:bg-[#eeeae1] md:p-8">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-rust">{item.label}</span>
                <h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-ink">Abrir <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </NextLink>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Antes de definir el alcance.</Heading><Accordion items={faq} className="mt-8" /></Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-7 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><Eyebrow className="text-white/55">Primer alcance</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Empieza por la decisión que necesitas sostener, no por la técnica que suena más sofisticada.</h2></div>
              <div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/linea-base-evaluacion-impacto" analyticsEvent="cta_click" analyticsTarget="baseline-hub:scope" variant="secondary" className="rounded-full border-white bg-white text-ink">Diseñar un alcance</Button><Button href="/contact?interest=linea-base-evaluacion-programas&from=/linea-base-evaluacion-impacto" analyticsEvent="cta_click" analyticsTarget="baseline-hub:contact" variant="ghost" className="!text-white/70 hover:!text-white">Plantear un encargo</Button></div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

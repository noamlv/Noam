import { Activity, ArrowRight, Building2, HeartPulse, MapPinned, ShieldCheck, Users } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/analisis-datos-salud-territorial";

export const metadata = buildMetadata({
  title: "Análisis de datos para salud territorial",
  description: "Diagnósticos, salas de situación, acceso, capacidad, experiencia y evaluación de intervenciones y servicios de salud en el Perú.",
  path
});

const decisions = [
  { icon: MapPinned, title: "Comprender necesidades y riesgos", question: "¿Qué problema afecta a quién, dónde, cuándo y con qué desigualdad?", use: "Análisis de situación, vigilancia, determinantes, carga, población vulnerable y priorización territorial." },
  { icon: Users, title: "Cerrar barreras de acceso", question: "¿Quién necesita atención, quién llega, cuánto espera y quién abandona?", use: "Afiliación, accesibilidad, referencia, oportunidad, gasto, demanda no atendida y continuidad." },
  { icon: Building2, title: "Gestionar capacidad y red", question: "¿Qué establecimiento, personal, insumo o flujo limita la respuesta?", use: "IPRESS, cartera de servicios, producción, turnos, stock, derivaciones, capacidad y contingencia." },
  { icon: ShieldCheck, title: "Mejorar calidad y experiencia", question: "¿La atención fue segura, efectiva, oportuna, pertinente y centrada en la persona?", use: "Calidad, seguridad, reclamos, satisfacción, adherencia, resultados y variación entre establecimientos." },
  { icon: Activity, title: "Evaluar intervenciones", question: "¿Qué cambió, para qué población y qué decisión se tomará con la evidencia?", use: "Campañas, programas, pilotos, salud comunitaria, proceso, resultados, impacto y costo-efectividad." }
];

const evidenceChain = [
  { number: "01", title: "Población", text: "Personas, territorio, etapa de vida, exposición, vulnerabilidad y protección." },
  { number: "02", title: "Necesidad", text: "Riesgo, condición, demanda, severidad, tendencia y desigualdad." },
  { number: "03", title: "Acceso", text: "Afiliación, distancia, espera, referencia, costo, abandono y exclusión." },
  { number: "04", title: "Atención", text: "Prestación, oportunidad, intensidad, profesional, insumo y calidad." },
  { number: "05", title: "Continuidad", text: "Seguimiento, adherencia, contrarreferencia, resolución y experiencia." },
  { number: "06", title: "Resultado", text: "Salud, función, bienestar, equidad, seguridad y eficiencia." }
];

const evidence = [
  { label: "Información nacional", title: "REUNIS", text: "Tableros y estadísticas para gestión, políticas e intervenciones de salud pública.", href: "https://www.minsa.gob.pe/reunis/?op=0" },
  { label: "TDR + plantilla", title: "Contratar el análisis", text: "Veinte bloques para necesidad, acceso, red, calidad, evaluación y protección.", href: "/toolkits/tdr-analisis-salud-territorial" },
  { label: "Vigilancia", title: "Sala de situación CDC", text: "Magnitud, distribución, tendencia y riesgo para focalizar intervenciones sanitarias.", href: "https://www.dge.gob.pe/portalnuevo/sala-de-situacion/" },
  { label: "Escucha", title: "Encuestas y experiencia", text: "Acceso, barreras, satisfacción y experiencia con inferencia y ética explícitas.", href: "/encuestas-estudios-opinion" },
  { label: "Muestra", title: "Diagnóstico de un servicio", text: "Arquitectura demostrativa para separar necesidad, acceso, atención y resultado.", href: "/muestras/diagnostico-desempeno-servicio-publico" },
  { label: "Evaluación", title: "Línea de base y resultados", text: "Diseños para programas, servicios, campañas y pilotos de salud.", href: "/linea-base-evaluacion-impacto" }
];

const faq = [
  { title: "¿Pueden preparar un análisis de situación de salud?", content: "Sí. Delimitamos población, problema, territorio, periodo, tendencias, determinantes, servicios, capacidades y fuentes. La síntesis distingue vigilancia, registros asistenciales, encuestas, estimaciones y vacíos de información." },
  { title: "¿Más atenciones significan mejor salud?", content: "No necesariamente. El aumento puede reflejar mayor acceso, más necesidad, cambios de registro o repetición de atenciones. Debe relacionarse con población, oportunidad, calidad, continuidad, resolución y resultados." },
  { title: "¿Pueden crear una sala de situación o dashboard?", content: "Sí. Debe definir decisiones, usuarios, indicadores, alertas, periodicidad y protocolos. La visualización no sustituye validación epidemiológica, gobernanza de datos ni capacidad de respuesta." },
  { title: "¿Pueden analizar redes y establecimientos?", content: "Sí. Podemos integrar ubicación, cartera, producción, personal, insumos, accesibilidad, referencias y demanda. La disponibilidad registrada debe validarse frente a operación efectiva y periodo." },
  { title: "¿Pueden evaluar una campaña o programa de salud?", content: "Sí. Revisamos teoría de cambio, cobertura efectiva, implementación, comparación, resultados y heterogeneidad. No toda pregunta admite atribución causal, y esa limitación se declara antes de contratar." },
  { title: "¿Trabajan con datos individuales de pacientes?", content: "Solo con base legal, finalidad definida, minimización, controles de acceso y medidas de seguridad acordes al riesgo. Los productos públicos deben ser anónimos o agregados; NOAM no realiza diagnóstico clínico ni decisiones automatizadas sobre pacientes." }
];

export default function TerritorialHealthDataPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Análisis de datos para salud territorial", path }])} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: "Análisis de datos para salud territorial", description: "Diagnósticos, salas de situación, acceso, capacidad, experiencia y evaluación de salud.", url: `${siteConfig.url}${path}`, provider: { "@type": "Organization", name: "NOAM", url: siteConfig.url }, areaServed: { "@type": "Country", name: "Perú" } }} />

      <section className="overflow-hidden bg-[#26342f] pb-16 pt-14 text-white md:pb-24 md:pt-20"><Container><div className="grid gap-12 lg:grid-cols-[1fr_0.46fr] lg:items-end lg:gap-20"><div><Eyebrow className="text-[#b5d3c7]">Salud, acceso y territorio</Eyebrow><Heading as="h1" size="display" className="max-w-[15ch] text-white">Registrar atenciones no demuestra que la población recibió cuidado oportuno.</Heading></div><div><p className="text-base leading-8 text-white/68">Conectamos necesidades, acceso, capacidad, atención, continuidad y resultados para convertir información sanitaria en decisiones responsables.</p><div className="mt-7 flex flex-wrap gap-3"><Button href="#decisiones" variant="secondary" className="rounded-full border-white bg-white text-ink">Definir la necesidad</Button><Button href="/toolkits/tdr-analisis-salud-territorial" variant="ghost" className="!text-white/70 hover:!text-white">Abrir TDR y plantilla</Button></div></div></div><div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">{["Gobiernos, redes y prestadores", "Acceso, calidad y resultados", "Datos protegidos, vigilancia y escucha"].map((item, index) => <div key={item} className="bg-[#32463e] p-6 md:p-8"><span className="font-mono text-[10px] text-[#b5d3c7]">0{index + 1}</span><p className="mt-9 max-w-[27ch] text-lg font-medium leading-6 tracking-[-0.02em] text-white/86">{item}</p></div>)}</div></Container></section>

      <Section id="decisiones"><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Qué necesitas decidir</Eyebrow><Heading size="xl">Cinco decisiones que un tablero asistencial no resuelve.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">La información cobra valor cuando distingue necesidad, acceso, atención y resultado para una población concreta.</p></div><div className="mt-12 divide-y divide-border border-y border-border">{decisions.map(({ icon: Icon, title, question, use }, index) => <article key={title} className="grid gap-6 py-9 md:grid-cols-[64px_0.75fr_1fr] md:gap-10 md:py-11"><div className="flex items-center gap-4 md:block"><span className="font-mono text-[10px] text-[#477c69]">0{index + 1}</span><Icon className="h-5 w-5 text-[#477c69] md:mt-8" aria-hidden /></div><div><h2 className="text-2xl font-medium tracking-[-0.035em] text-ink">{title}</h2><p className="mt-4 text-sm leading-7 text-ink/72">{question}</p></div><div><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Aplicaciones</span><p className="mt-3 text-sm leading-7 text-ink/62">{use}</p></div></article>)}</div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container><div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><HeartPulse className="h-5 w-5 text-[#477c69]" aria-hidden /><Eyebrow className="mt-6">Cadena de evidencia</Eyebrow><Heading size="xl">De la necesidad al resultado en salud.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Cada eslabón evita confundir afiliación, producción, continuidad y bienestar.</p></div><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">{evidenceChain.map((item) => <article key={item.number} className="min-h-[190px] bg-canvas p-6 md:p-8"><span className="font-mono text-[10px] text-[#477c69]">{item.number}</span><h2 className="mt-9 text-xl font-medium tracking-[-0.025em] text-ink">{item.title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p></article>)}</div></div></Container></Section>

      <Section className="border-b border-border bg-[#e4ede9]"><Container><div className="grid gap-10 lg:grid-cols-[0.46fr_1fr] lg:gap-20"><div><Eyebrow>Marco y fuentes</Eyebrow><Heading size="xl">Los registros sanitarios requieren contexto, calidad y protección.</Heading></div><div className="max-w-3xl space-y-5 text-base leading-8 text-ink/72"><p>REUNIS integra estadísticas y tableros nacionales; el CDC publica salas de situación; SUSALUD ofrece datos de prestaciones y establecimientos; RENIPRESS permite revisar prestadores autorizados. Cada sistema responde preguntas y periodos distintos.</p><p>La información clínica o individual no debe circular como un dataset ordinario. El alcance define finalidad, base legal, minimización, seudonimización, acceso, retención, auditoría y respuesta ante incidentes antes de cualquier integración.</p><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#3e705f]"><a href="https://www.minsa.gob.pe/reunis/?op=0" target="_blank" rel="noreferrer">REUNIS</a><a href="https://www.dge.gob.pe/portalnuevo/sala-de-situacion/" target="_blank" rel="noreferrer">Sala de situación CDC</a><a href="https://www.gob.pe/institucion/susalud/noticias/306179-susalud-pone-a-disposicion-plataforma-de-datos-abiertos" target="_blank" rel="noreferrer">Datos abiertos SUSALUD</a><a href="https://www.datosabiertos.gob.pe/dataset/directorio-de-establecimientos-de-salud/resource/e396181b-457d-470d-a8a6-98d6c8650f47" target="_blank" rel="noreferrer">Directorio de establecimientos</a><a href="https://www.gob.pe/institucion/minsa/colecciones/85430-gestion-de-datos-para-la-salud" target="_blank" rel="noreferrer">Gestión de datos en salud</a></div></div></div></Container></Section>

      <Section><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Evidencia y servicios</Eyebrow><Heading size="xl">Explora antes de plantear el encargo.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Combina vigilancia, territorio, escucha, evaluación y sistemas según la decisión sanitaria.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{evidence.map((item) => <NextLink key={item.href} href={item.href} className="group min-h-[225px] bg-canvas p-6 transition-colors hover:bg-panel md:p-8" {...(item.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#477c69]">{item.label}</span><h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{item.title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-ink">Abrir <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span></NextLink>)}</div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Antes de interpretar un registro sanitario.</Heading><Accordion items={faq} className="mt-8" /></Container></Section>

      <Section className="pb-0"><Container><div className="relative overflow-hidden rounded-[1.5rem] bg-[#3e705f] px-7 py-12 text-white md:px-12 md:py-16"><div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" /><div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow className="text-white/55">Primera definición</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Cuéntanos qué población, servicio o resultado de salud debe comprenderse.</h2></div><div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/analisis-datos-salud-territorial" analyticsEvent="cta_click" analyticsTarget="health-hub:scope" variant="secondary" className="rounded-full border-white bg-white text-ink">Diseñar un alcance</Button><Button href="/contact?interest=salud-territorial&from=/analisis-datos-salud-territorial" analyticsEvent="cta_click" analyticsTarget="health-hub:contact" variant="ghost" className="!text-white/70 hover:!text-white">Plantear el encargo</Button></div></div></div></Container></Section>
    </>
  );
}

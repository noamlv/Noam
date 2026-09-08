import { ArrowRight, ChartNoAxesCombined, MapPinned, Recycle, Route, Scale, Truck } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/analisis-datos-residuos-limpieza-publica";

export const metadata = buildMetadata({
  title: "Análisis de datos para residuos sólidos y limpieza pública",
  description: "Diagnósticos, rutas, costos, mapas y tableros para mejorar recolección, valorización y disposición final de residuos sólidos municipales en Perú.",
  path
});

const decisions = [
  { icon: Truck, title: "Medir el servicio", question: "¿Qué zonas reciben qué frecuencia, horario y nivel de atención real?", use: "Línea de base, cobertura por zona, reclamos, incumplimientos y continuidad." },
  { icon: Route, title: "Optimizar rutas", question: "¿Dónde se pierde tiempo, capacidad, combustible o regularidad?", use: "Rutas, turnos, flota, puntos críticos, tiempos y escenarios operativos." },
  { icon: Scale, title: "Conciliar flujos", question: "¿Cuánto se genera, recoge, transfiere, valoriza y dispone?", use: "Balance de masas, pesaje, trazabilidad y conciliación entre registros." },
  { icon: Recycle, title: "Ampliar valorización", question: "¿Qué material, zona y cadena tienen condiciones verificables?", use: "Segregación, recolección selectiva, recicladores, orgánicos y mercado." },
  { icon: ChartNoAxesCombined, title: "Conducir y sostener", question: "¿Qué costo, calidad y resultado debe revisarse periódicamente?", use: "Tablero operativo, costos, arbitrios, contratos, alertas y decisiones." }
];

const evidenceChain = [
  { number: "01", title: "Servicio", text: "Usuarios, zonas, frecuencia, estándar y respuesta esperada." },
  { number: "02", title: "Operación", text: "Rutas, personal, flota, turnos, tiempos, pesajes e incidencias." },
  { number: "03", title: "Flujo", text: "Generación, recolección, transferencia, valorización y destino final." },
  { number: "04", title: "Territorio", text: "Vías, pendientes, densidad, mercados, puntos críticos e infraestructura." },
  { number: "05", title: "Economía", text: "Costo por componente, contrato, ingreso, morosidad y sostenibilidad." },
  { number: "06", title: "Control", text: "Indicador, umbral, responsable, acción correctiva y evidencia de cierre." }
];

const evidence = [
  { label: "Datos municipales", title: "Residuos en DataPerú", text: "Frecuencia, cobertura, instrumentos y destino declarados en RENAMU 2025.", href: "/dataperu/temas/residuos" },
  { label: "TDR + plantilla", title: "Contratar el análisis", text: "Servicio, rutas, flujos, costos, productos y aceptación verificable.", href: "/toolkits/tdr-analisis-residuos-limpieza-publica" },
  { label: "Capacidad", title: "Diagnóstico territorial", text: "Población, servicios, infraestructura, capacidades y prioridades.", href: "/diagnostico-territorial" },
  { label: "Capacidad", title: "Observatorios y tableros", text: "Indicadores, alertas, responsables y continuidad operativa.", href: "/observatorios-dashboards-visores" },
  { label: "Solución", title: "Agenda territorial", text: "Lectura integrada y cartera priorizada para actuar por etapas.", href: "/solutions/diagnostico-agenda-territorial" },
  { label: "Datos territoriales", title: "Perfiles municipales", text: "Recursos, capacidad declarada, población e inversión por municipio.", href: "/dataperu/municipios" }
];

const faq = [
  { title: "¿Pueden analizar la limpieza pública de una municipalidad pequeña?", content: "Sí. El estudio puede comenzar con registros simples de rutas, turnos, pesajes, combustible, reclamos y destino. El alcance se ajusta a la escala, evitando exigir tecnología que la operación no podrá mantener." },
  { title: "¿RENAMU y SIGERSOL bastan para rediseñar rutas?", content: "No. Permiten construir contexto y verificar reportes, pero el rediseño requiere datos operativos, red vial, puntos atendidos, tiempos, capacidad de flota y validación en campo." },
  { title: "¿Pueden estimar cuánto residuo genera el distrito?", content: "Sí, usando estudios de caracterización, pesajes y supuestos documentados. Una estimación debe distinguir generación, recolección y disposición, además de declarar cobertura e incertidumbre." },
  { title: "¿El análisis puede incluir recicladores y valorización?", content: "Sí. Debe medir materiales, volumen, calidad, rutas, condiciones de trabajo, trazabilidad, costos y demanda. Una meta de toneladas no reemplaza la sostenibilidad de la cadena." },
  { title: "¿Pueden evaluar un contrato de limpieza pública?", content: "Sí. Se pueden revisar niveles de servicio, evidencia de cumplimiento, costos, incidencias y mecanismos de supervisión, respetando el contrato y sin sustituir una opinión legal o de control." },
  { title: "¿Entregan datos y modelos editables?", content: "El alcance puede incluir base integrada, diccionario, archivos geográficos, modelo de rutas o costos, tablero, fichas de indicadores, manual y documentación de actualización." }
];

export default function WasteDataPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Análisis de residuos y limpieza pública", path }])} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: "Análisis de datos para residuos sólidos y limpieza pública", description: "Diagnósticos, optimización, mapas y sistemas de seguimiento para la gestión municipal de residuos sólidos.", url: `${siteConfig.url}${path}`, provider: { "@type": "Organization", name: "NOAM", url: siteConfig.url }, areaServed: { "@type": "Country", name: "Perú" } }} />

      <section className="overflow-hidden bg-[#28231f] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.46fr] lg:items-end lg:gap-20">
            <div><Eyebrow className="text-[#e3ad8f]">Residuos sólidos y limpieza pública</Eyebrow><Heading as="h1" size="display" className="max-w-[15ch] text-white">La cobertura declarada no muestra cómo funciona cada ruta.</Heading></div>
            <div><p className="text-base leading-8 text-white/68">Conectamos servicio, flota, territorio, flujos, costos y destino final para mejorar la operación sin confundir toneladas reportadas con calidad para el ciudadano.</p><div className="mt-7 flex flex-wrap gap-3"><Button href="#decisiones" variant="secondary" className="rounded-full border-white bg-white text-ink">Definir la necesidad</Button><Button href="/toolkits/tdr-analisis-residuos-limpieza-publica" variant="ghost" className="!text-white/70 hover:!text-white">Abrir TDR y plantilla</Button></div></div>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">
            {["Municipalidades provinciales y distritales", "Recolección, valorización y disposición", "Datos reportados, operación y campo"].map((item, index) => <div key={item} className="bg-[#332c27] p-6 md:p-8"><span className="font-mono text-[10px] text-[#e3ad8f]">0{index + 1}</span><p className="mt-9 max-w-[26ch] text-lg font-medium leading-6 tracking-[-0.02em] text-white/86">{item}</p></div>)}
          </div>
        </Container>
      </section>

      <Section id="decisiones"><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Qué necesitas decidir</Eyebrow><Heading size="xl">Cinco frentes de una misma cadena.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Medir cobertura no optimiza rutas; optimizar rutas no demuestra disposición adecuada; aumentar valorización exige una cadena operativa y comercial.</p></div><div className="mt-12 divide-y divide-border border-y border-border">{decisions.map(({ icon: Icon, title, question, use }, index) => <article key={title} className="grid gap-6 py-9 md:grid-cols-[64px_0.75fr_1fr] md:gap-10 md:py-11"><div className="flex items-center gap-4 md:block"><span className="font-mono text-[10px] text-rust">0{index + 1}</span><Icon className="h-5 w-5 text-rust md:mt-8" aria-hidden /></div><div><h2 className="text-2xl font-medium tracking-[-0.035em] text-ink">{title}</h2><p className="mt-4 text-sm leading-7 text-ink/72">{question}</p></div><div><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Aplicaciones</span><p className="mt-3 text-sm leading-7 text-ink/62">{use}</p></div></article>)}</div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container><div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><MapPinned className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Cadena de evidencia</Eyebrow><Heading size="xl">Del servicio reportado a la operación verificable.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Cada cifra debe poder conectarse con una ruta, un flujo, un costo o una acción.</p></div><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">{evidenceChain.map((item) => <article key={item.number} className="min-h-[190px] bg-canvas p-6 md:p-8"><span className="font-mono text-[10px] text-rust">{item.number}</span><h2 className="mt-9 text-xl font-medium tracking-[-0.025em] text-ink">{item.title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p></article>)}</div></div></Container></Section>

      <Section className="border-b border-border bg-[#eee4dc]"><Container><div className="grid gap-10 lg:grid-cols-[0.46fr_1fr] lg:gap-20"><div><Eyebrow>Marco y fuentes</Eyebrow><Heading size="xl">Reportar es necesario; gestionar exige conciliar.</Heading></div><div className="max-w-3xl space-y-5 text-base leading-8 text-ink/72"><p>La Ley de Gestión Integral de Residuos Sólidos establece el marco nacional. SIGERSOL facilita el registro y seguimiento de la gestión municipal; MINAM ofrece guías de caracterización, operación, planes, valorización e infraestructura.</p><p>DataPerú añade una lectura de frecuencia, cobertura, instrumentos y destino declarados en RENAMU 2025. No valida rutas, pesajes, costos, calidad efectiva ni cumplimiento ambiental.</p><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-rust"><a href="https://www.gob.pe/institucion/minam/normas-legales/3610-1278" target="_blank" rel="noreferrer">Ley de gestión integral</a><a href="https://sigersol.minam.gob.pe/" target="_blank" rel="noreferrer">SIGERSOL</a><a href="https://site2.minam.gob.pe/documentos" target="_blank" rel="noreferrer">Guías del MINAM</a><NextLink href="/dataperu/temas/residuos">Residuos en DataPerú</NextLink></div></div></div></Container></Section>

      <Section><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Evidencia y servicios</Eyebrow><Heading size="xl">Explora antes de plantear el encargo.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Revisa datos municipales, método y capacidades combinables según el problema operativo.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{evidence.map((item) => <NextLink key={item.href} href={item.href} className="group min-h-[225px] bg-canvas p-6 transition-colors hover:bg-panel md:p-8"><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-rust">{item.label}</span><h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{item.title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-ink">Abrir <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span></NextLink>)}</div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Antes de rediseñar la operación.</Heading><Accordion items={faq} className="mt-8" /></Container></Section>

      <Section className="pb-0"><Container><div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-7 py-12 text-white md:px-12 md:py-16"><div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" /><div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow className="text-white/55">Primera definición</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Cuéntanos qué parte del servicio debe mejorar y qué datos operativos existen.</h2></div><div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/analisis-datos-residuos-limpieza-publica" analyticsEvent="cta_click" analyticsTarget="waste-hub:scope" variant="secondary" className="rounded-full border-white bg-white text-ink">Diseñar un alcance</Button><Button href="/contact?interest=residuos-limpieza-publica&from=/analisis-datos-residuos-limpieza-publica" analyticsEvent="cta_click" analyticsTarget="waste-hub:contact" variant="ghost" className="!text-white/70 hover:!text-white">Plantear el encargo</Button></div></div></div></Container></Section>
    </>
  );
}

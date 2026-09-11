import { ArrowRight, CircleCheck, Database, Layers3, MapPinned, Route, TriangleAlert } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/analisis-catastro-desarrollo-urbano-territorial";

export const metadata = buildMetadata({
  title: "Análisis de catastro, desarrollo urbano y territorio",
  description: "Datos geoespaciales para catastro municipal, planificación urbana, zonificación, expansión, servicios, riesgo, suelo e inversión territorial en el Perú.",
  path
});

const decisions = [
  { icon: Database, title: "Ordenar el catastro", question: "¿Qué unidades, atributos, identificadores y zonas necesitan levantamiento, actualización o conciliación?", use: "Predios, lotes, manzanas, construcciones, vías, equipamientos, contribuyentes, fuente, fecha y calidad." },
  { icon: MapPinned, title: "Comprender el crecimiento", question: "¿Dónde cambia la ocupación y qué población, actividad o servicio explica esa transformación?", use: "Huella urbana, densidad, vivienda, vacancia, centralidades, periferias, centros poblados y áreas de influencia." },
  { icon: Layers3, title: "Gestionar el suelo", question: "¿Qué clasificación, zonificación, uso o instrumento debe revisarse con evidencia territorial?", use: "Uso actual, norma aplicable, compatibilidad, valor, riesgo, patrimonio, ambiente, infraestructura y capacidad de servicio." },
  { icon: TriangleAlert, title: "Priorizar intervenciones", question: "¿Qué sectores requieren prevención, infraestructura, regularización, renovación o protección primero?", use: "Exposición, vulnerabilidad, déficit de servicios, accesibilidad, deterioro, población afectada, costo y viabilidad." },
  { icon: CircleCheck, title: "Operar y monitorear", question: "¿Cómo se actualizarán los datos y qué decisión activará cada cambio observado?", use: "Licencias, obras, fiscalización, inversión, recaudación, atención, mantenimiento, indicadores, responsables y trazabilidad." }
];

const evidenceChain = [
  { number: "01", title: "Geometría", text: "Lote, predio, manzana, vía, centro poblado, límite, sistema de referencia y precisión." },
  { number: "02", title: "Personas y actividades", text: "Población, vivienda, empleo, comercio, equipamientos, movilidad y demanda territorial." },
  { number: "03", title: "Servicios", text: "Agua, saneamiento, energía, residuos, transporte, espacio público y capacidad instalada." },
  { number: "04", title: "Condiciones", text: "Riesgo, ambiente, patrimonio, tenencia observada, accesibilidad y restricciones físicas." },
  { number: "05", title: "Reglas y proyectos", text: "Instrumentos, zonificación, parámetros, licencias, inversiones, plazos y competencias." },
  { number: "06", title: "Decisión", text: "Sector priorizado, escenario, responsable, acción, evidencia de cierre y actualización." }
];

const audiences = [
  { label: "Municipalidad", title: "Gestión urbana y catastral", text: "Una base común para planificación, obras, servicios, riesgo, fiscalización, licencias y administración tributaria." },
  { label: "Región y metrópoli", title: "Articulación territorial", text: "Lectura de ciudades, centros poblados, corredores y áreas funcionales que atraviesan más de una jurisdicción." },
  { label: "Empresa", title: "Diligencia territorial", text: "Contexto de suelo, acceso, servicios, riesgos e instrumentos para evaluar localización sin sustituir verificaciones legales y técnicas." }
];

const evidence = [
  { label: "TDR + plantilla", title: "Contratar el análisis", text: "Veinte bloques para definir ámbito, cartografía, levantamiento, interoperabilidad, productos y actualización.", href: "/toolkits/tdr-analisis-catastro-desarrollo-urbano" },
  { label: "Mapa abierto", title: "DataPerú territorial", text: "Explora departamentos, municipalidades y capas de contexto como punto de partida para una lectura localizada.", href: "/dataperu/mapa" },
  { label: "Perfiles", title: "1,891 municipalidades", text: "Capacidad declarada, población, presupuesto e inversión visibles con procedencia y límites de uso.", href: "/dataperu/municipios" },
  { label: "Riesgo", title: "Gestión del riesgo de desastres", text: "Integra peligros, exposición, vulnerabilidad, continuidad, medidas y responsabilidades territoriales.", href: "/analisis-datos-gestion-riesgo-desastres" },
  { label: "Ciudad", title: "Movilidad y transporte", text: "Conecta uso de suelo, viajes, accesibilidad, seguridad vial, logística e infraestructura urbana.", href: "/analisis-datos-movilidad-transporte" },
  { label: "Sistema", title: "Visores y observatorios", text: "Diseña una capacidad sostenible con datos, indicadores, accesos, alertas, operación y transferencia.", href: "/observatorios-dashboards-visores" }
];

const faq = [
  { title: "¿Pueden actualizar o construir un catastro municipal?", content: "Podemos diseñar la estrategia, modelo de datos, interoperabilidad, control de calidad, levantamiento y productos analíticos. El alcance técnico debe precisar método, precisión, sistema de referencia, trabajo de campo, competencias y aceptación. No todo encargo requiere un levantamiento catastral completo." },
  { title: "¿Un catastro acredita propiedad o define linderos legales?", content: "No por sí solo. Catastro, registro de predios, títulos, posesión y realidad física son capas relacionadas pero distintas. NOAM no certifica propiedad, saneamiento físico-legal, linderos ni derechos; cualquier uso jurídico exige validación por las autoridades y profesionales competentes." },
  { title: "¿Pueden apoyar un PAT, PDM, PDU, esquema o plan específico?", content: "Sí, mediante diagnóstico, integración de fuentes, análisis espacial, escenarios, participación, indicadores y seguimiento. La formulación y aprobación deben respetar el instrumento aplicable, las competencias municipales, la normativa vigente y los estudios especializados requeridos." },
  { title: "¿Sirve para priorizar obras y servicios urbanos?", content: "Sí. Podemos relacionar población, demanda, déficit, accesibilidad, riesgo, costo, capacidad de servicio e inversiones para comparar sectores. La priorización debe documentar criterios y no confundir ausencia de datos con ausencia de necesidad." },
  { title: "¿Pueden analizar una localización para una empresa?", content: "Sí. Integramos accesibilidad, población, actividad, servicios, riesgos, entorno institucional e instrumentos disponibles. El análisis orienta diligencias; no reemplaza certificados, compatibilidad de uso, estudios de suelo, títulos, licencias ni opinión legal." },
  { title: "¿El visor reemplaza los sistemas oficiales o el trabajo de campo?", content: "No. GeoPerú, el Observatorio Urbano Nacional, SIGRID, registros municipales y otras fuentes conservan su función. Un visor NOAM puede integrar información autorizada y hacer visibles discrepancias, pero cada capa mantiene procedencia, fecha, escala, precisión y limitación." }
];

export default function UrbanTerritorialAnalysisPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Catastro y desarrollo urbano", path }])} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: "Análisis de catastro, desarrollo urbano y territorio", description: "Integración geoespacial para catastro municipal, planificación urbana, suelo, servicios, riesgo e inversión territorial.", url: `${siteConfig.url}${path}`, provider: { "@id": `${siteConfig.url}/#organization` }, areaServed: { "@type": "Country", name: "Perú" } }} />

      <section className="overflow-hidden bg-[#27343a] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.46fr] lg:items-end lg:gap-20">
            <div><Eyebrow className="text-[#bad0d2]">Catastro, suelo y desarrollo urbano</Eyebrow><Heading as="h1" size="display" className="max-w-[15ch] text-white">Un mapa de predios no basta para gobernar la ciudad.</Heading></div>
            <div><p className="text-base leading-8 text-white/68">Integramos catastro, población, servicios, riesgo, movilidad, suelo e instrumentos urbanos para convertir información geográfica en decisiones trazables.</p><div className="mt-7 flex flex-wrap gap-3"><Button href="#decisiones" variant="secondary" className="rounded-full border-white bg-white text-ink">Definir la necesidad</Button><Button href="/toolkits/tdr-analisis-catastro-desarrollo-urbano" variant="ghost" className="!text-white/70 hover:!text-white">Abrir TDR y plantilla</Button></div></div>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">{["Municipalidades y regiones", "Empresas y proyectos", "Datos geográficos + gestión"].map((item, index) => <div key={item} className="bg-[#32434a] p-6 md:p-8"><span className="font-mono text-[10px] text-[#bad0d2]">0{index + 1}</span><p className="mt-9 max-w-[27ch] text-lg font-medium leading-6 tracking-[-0.02em] text-white/86">{item}</p></div>)}</div>
        </Container>
      </section>

      <Section id="decisiones"><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Qué necesitas decidir</Eyebrow><Heading size="xl">Cinco usos antes de encargar otro mapa.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">La unidad espacial, la precisión y la frecuencia deben responder a una decisión concreta.</p></div><div className="mt-12 divide-y divide-border border-y border-border">{decisions.map(({ icon: Icon, title, question, use }, index) => <article key={title} className="grid gap-6 py-9 md:grid-cols-[64px_0.75fr_1fr] md:gap-10 md:py-11"><div className="flex items-center gap-4 md:block"><span className="font-mono text-[10px] text-[#356775]">0{index + 1}</span><Icon className="h-5 w-5 text-[#356775] md:mt-8" aria-hidden /></div><div><h2 className="text-2xl font-medium tracking-[-0.035em] text-ink">{title}</h2><p className="mt-4 text-sm leading-7 text-ink/72">{question}</p></div><div><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Capas posibles</span><p className="mt-3 text-sm leading-7 text-ink/62">{use}</p></div></article>)}</div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container><div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><Route className="h-5 w-5 text-[#356775]" aria-hidden /><Eyebrow className="mt-6">Cadena de evidencia</Eyebrow><Heading size="xl">De la geometría a la decisión pública.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Superponer capas no basta: cada relación necesita unidad, fecha, escala, calidad y propósito.</p></div><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">{evidenceChain.map((item) => <article key={item.number} className="min-h-[190px] bg-canvas p-6 md:p-8"><span className="font-mono text-[10px] text-[#356775]">{item.number}</span><h2 className="mt-9 text-xl font-medium tracking-[-0.025em] text-ink">{item.title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p></article>)}</div></div></Container></Section>

      <Section><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Una base, decisiones distintas</Eyebrow><Heading size="xl">Información territorial para gestionar e invertir.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">El acceso, la precisión y el producto cambian según la responsabilidad de cada usuario.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border lg:grid-cols-3">{audiences.map((item, index) => <article key={item.title} className="min-h-[250px] bg-canvas p-7 md:p-9"><span className="font-mono text-[10px] text-[#356775]">0{index + 1} · {item.label}</span><h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{item.title}</h2><p className="mt-4 text-sm leading-7 text-ink/62">{item.text}</p></article>)}</div></Container></Section>

      <Section className="border-y border-border bg-[#e3eaeb]"><Container><div className="grid gap-10 lg:grid-cols-[0.46fr_1fr] lg:gap-20"><div><Eyebrow>Marco y fuentes</Eyebrow><Heading size="xl">La norma, el territorio y los datos cambian.</Heading></div><div className="max-w-3xl space-y-5 text-base leading-8 text-ink/72"><p>El Reglamento aprobado en 2022 desarrolla instrumentos de acondicionamiento territorial y planificación urbana. En mayo de 2026, el MVCS publicó para consulta un proyecto de nuevo reglamento con alcance urbano y rural. La versión vigente y el instrumento aplicable deben comprobarse antes de formular o contratar.</p><p>GeoPerú, el Observatorio Urbano Nacional, COFOPRI y SIGRID aportan capas y herramientas distintas. NOAM conserva fuente, fecha, escala, precisión y limitación; no convierte una capa referencial en verdad registral, compatibilidad normativa ni medición de campo.</p><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#356775]"><a href="https://www.gob.pe/institucion/vivienda/normas-legales/3588833-012-2022-vivienda" target="_blank" rel="noreferrer">Reglamento 2022</a><a href="https://www.gob.pe/institucion/vivienda/normas-legales/8101186-189-2026-vivienda" target="_blank" rel="noreferrer">Proyecto 2026</a><a href="https://oun.vivienda.gob.pe" target="_blank" rel="noreferrer">Observatorio Urbano</a><a href="https://www.gob.pe/geoperu" target="_blank" rel="noreferrer">GeoPerú</a><a href="https://www.gob.pe/institucion/cofopri/noticias/1125539-municipios-recibieron-equipos-y-herramientas-para-implementar-catastro-urbano" target="_blank" rel="noreferrer">Catastro urbano COFOPRI</a><a href="https://sigrid.cenepred.gob.pe" target="_blank" rel="noreferrer">SIGRID</a></div></div></div></Container></Section>

      <Section><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Datos y servicios</Eyebrow><Heading size="xl">Explora el territorio antes de plantear el encargo.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Una primera lectura pública permite precisar qué debe verificarse, levantarse o integrarse después.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{evidence.map((item) => <NextLink key={item.href} href={item.href} className="group min-h-[225px] bg-canvas p-6 transition-colors hover:bg-panel md:p-8"><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#356775]">{item.label}</span><h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{item.title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-ink">Abrir <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span></NextLink>)}</div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Antes de utilizar una capa territorial.</Heading><Accordion items={faq} className="mt-8" /></Container></Section>

      <Section className="pb-0"><Container><div className="relative overflow-hidden rounded-[1.5rem] bg-[#356775] px-7 py-12 text-white md:px-12 md:py-16"><div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" /><div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow className="text-white/55">Primera definición</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Cuéntanos qué territorio, instrumento o decisión necesita una base común.</h2></div><div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/analisis-catastro-desarrollo-urbano-territorial" analyticsEvent="cta_click" analyticsTarget="urban-hub:scope" variant="secondary" className="rounded-full border-white bg-white text-ink">Diseñar un alcance</Button><Button href="/contact?interest=catastro-desarrollo-urbano&from=/analisis-catastro-desarrollo-urbano-territorial" analyticsEvent="cta_click" analyticsTarget="urban-hub:contact" variant="ghost" className="!text-white/70 hover:!text-white">Plantear el encargo</Button></div></div></div></Container></Section>
    </>
  );
}

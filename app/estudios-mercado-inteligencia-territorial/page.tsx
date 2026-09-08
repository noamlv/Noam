import { ArrowRight, Building2, ChartNoAxesCombined, MapPinned, Network, ScanSearch, UsersRound } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/estudios-mercado-inteligencia-territorial";

export const metadata = buildMetadata({
  title: "Estudios de mercado e inteligencia territorial en Perú",
  description: "Estudios para dimensionar demanda, comparar territorios, analizar sectores, evaluar localizaciones y reducir incertidumbre antes de invertir, expandirse o diseñar una intervención.",
  path
});

const studyTypes = [
  { icon: ChartNoAxesCombined, title: "Mercado y demanda", question: "¿Qué tamaño, segmentos, evolución y condiciones sostienen la oportunidad?", use: "Entrada a mercado, nuevos servicios, portafolio, precio y priorización comercial." },
  { icon: UsersRound, title: "Clientes y usuarios", question: "¿Qué necesitan, valoran, experimentan o rechazan distintos grupos?", use: "Segmentación, satisfacción, experiencia, propuesta de valor y adopción." },
  { icon: MapPinned, title: "Localización y expansión", question: "¿En qué ciudades, zonas o corredores conviene profundizar la evaluación?", use: "Puntos de atención, infraestructura, operaciones, distribución e inversión." },
  { icon: Network, title: "Sector y cadena de valor", question: "¿Qué actores, flujos, capacidades y cuellos de botella estructuran la actividad?", use: "Proveedores, abastecimiento, clústeres, corredores y desarrollo productivo." },
  { icon: Building2, title: "Entorno institucional", question: "¿Qué políticas, inversiones, servicios y riesgos públicos cambian la decisión?", use: "Diligencia territorial, escenarios, licencia social y monitoreo de entorno." }
];

const evidenceChain = [
  { number: "01", title: "Decisión", text: "Inversión, expansión, diseño de producto o prioridad que el estudio debe reducir." },
  { number: "02", title: "Mercado y unidad", text: "Población, cliente, sector, territorio, periodo y área de influencia pertinentes." },
  { number: "03", title: "Hipótesis", text: "Condiciones de éxito, restricciones, alternativas y señales capaces de cambiar la decisión." },
  { number: "04", title: "Fuentes", text: "Datos públicos, registros propios, encuestas, entrevistas, campo y metadatos." },
  { number: "05", title: "Análisis", text: "Estimaciones, segmentos, mapas, escenarios, sensibilidad e incertidumbre visible." },
  { number: "06", title: "Validación", text: "Diligencias y evidencia primaria antes de recomendar o comprometer recursos." }
];

const methods = [
  { label: "Fuentes públicas", title: "Construir una primera lectura comparable", text: "Estadísticas oficiales, registros, cartografía, presupuesto, inversiones y publicaciones sectoriales permiten acotar el problema y detectar vacíos." },
  { label: "Datos propios", title: "Conectar territorio con operación y clientes", text: "Ventas, atención, transacciones, logística, costos o incidencias aportan la escala que una fuente pública no observa." },
  { label: "Investigación primaria", title: "Validar lo que puede cambiar la recomendación", text: "Encuestas, entrevistas, visitas, observación y levantamiento geográfico deben responder a hipótesis explícitas, no acumular información." },
  { label: "Modelos y escenarios", title: "Comparar sin ocultar los supuestos", text: "Segmentación, áreas de influencia y modelos multicriterio requieren criterios, ponderaciones y pruebas de sensibilidad reproducibles." }
];

const evidence = [
  { label: "Datos abiertos", title: "Explorar DataPerú", text: "Perfiles municipales, departamentos, inversión y mapas.", href: "/dataperu" },
  { label: "Muestra", title: "Screening territorial", text: "Arquitectura de una decisión de localización antes de contratar.", href: "/muestras/inteligencia-territorial-inversion" },
  { label: "TDR + plantilla", title: "Contratar el estudio", text: "Mercado, territorio, método, productos y aceptación verificable.", href: "/toolkits/tdr-estudio-mercado-inteligencia-territorial" },
  { label: "Insight", title: "Evaluar antes de invertir", text: "Demanda, infraestructura, instituciones, riesgos y validación.", href: "/insights/evaluar-territorio-antes-invertir" },
  { label: "Solución", title: "Inteligencia territorial", text: "Perfiles, comparadores, escenarios y recomendación ejecutiva.", href: "/solutions/inteligencia-territorial-inversion" },
  { label: "Prácticas", title: "Industrias y decisiones", text: "Infraestructura, minería, servicios, comercio, agro e impacto.", href: "/sectors/companies" }
];

const faq = [
  { title: "¿Un estudio de mercado puede enfocarse en una región o municipio?", content: "Sí. La unidad puede ser un distrito, ciudad, provincia, región, corredor o área de influencia. Debe corresponder a la decisión y al comportamiento real de clientes, proveedores y operación, no solo a un límite administrativo." },
  { title: "¿Las fuentes públicas bastan para decidir una inversión?", content: "Sirven para comparar, descartar alternativas y priorizar vacíos. Una decisión final suele requerir datos comerciales, validación técnica, trabajo de campo o diligencias legales, ambientales y sociales según el proyecto." },
  { title: "¿Pueden calcular el tamaño de un mercado?", content: "Sí, cuando se definen mercado, unidad, horizonte y fuentes defendibles. Presentamos supuestos y escenarios, evitando convertir una estimación incierta en una cifra exacta sin sustento." },
  { title: "¿El estudio puede incluir encuestas o entrevistas?", content: "Sí. La investigación primaria se incorpora cuando responde una hipótesis y puede cambiar la decisión. El diseño debe definir población, selección, instrumento, supervisión, privacidad y límites de inferencia." },
  { title: "¿Entregan bases, mapas y modelos editables?", content: "El alcance puede incluir base integrada, diccionario, archivos geográficos, código o bitácora analítica, modelo de escenarios, visualizaciones y brief ejecutivo. Los formatos y criterios de aceptación se definen antes de iniciar." },
  { title: "¿Trabajan para empresas que todavía no tienen datos propios?", content: "Sí. Podemos comenzar con una exploración basada en fuentes públicas y entrevistas internas. El primer producto debe indicar qué preguntas puede responder y qué información propia conviene generar después." }
];

export default function MarketTerritorialIntelligencePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Estudios de mercado e inteligencia territorial", path }])} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Estudios de mercado e inteligencia territorial en Perú",
        description: "Rutas para dimensionar demanda, analizar sectores, comparar territorios y evaluar localizaciones.",
        url: `${siteConfig.url}${path}`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: studyTypes.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title }))
        }
      }} />

      <section className="overflow-hidden bg-[#20231e] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.46fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="text-[#d7c687]">Mercado, territorio y decisión</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[14ch] text-white">Un estudio útil no describe todo. Reduce una decisión.</Heading>
            </div>
            <div>
              <p className="text-base leading-8 text-white/68">Integramos mercado, clientes, geografía, inversión pública y entorno institucional para decidir dónde crecer, qué validar y qué riesgo no ignorar.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#estudios" variant="secondary" className="rounded-full border-white bg-white text-ink">Elegir un estudio</Button>
                <Button href="/toolkits/tdr-estudio-mercado-inteligencia-territorial" variant="ghost" className="!text-white/70 hover:!text-white">Abrir TDR y plantilla</Button>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">
            {["Empresas, gremios e inversionistas", "Regiones, ciudades y corredores", "Fuentes públicas, datos propios y campo"].map((item, index) => (
              <div key={item} className="bg-[#292c26] p-6 md:p-8">
                <span className="font-mono text-[10px] text-[#d7c687]">0{index + 1}</span>
                <p className="mt-9 max-w-[25ch] text-lg font-medium leading-6 tracking-[-0.02em] text-white/86">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section id="estudios">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Qué necesitas decidir</Eyebrow><Heading size="xl">Cinco estudios que responden preguntas distintas.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Pueden combinarse, pero no deben confundirse. Un estudio de clientes no reemplaza un análisis de localización; una base territorial no demuestra por sí sola demanda comercial.</p>
          </div>

          <div className="mt-12 divide-y divide-border border-y border-border">
            {studyTypes.map(({ icon: Icon, title, question, use }, index) => (
              <article key={title} className="grid gap-6 py-9 md:grid-cols-[64px_0.75fr_1fr] md:gap-10 md:py-11">
                <div className="flex items-center gap-4 md:block"><span className="font-mono text-[10px] text-[#8a6d21]">0{index + 1}</span><Icon className="h-5 w-5 text-[#8a6d21] md:mt-8" aria-hidden /></div>
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
            <div><ScanSearch className="h-5 w-5 text-[#8a6d21]" aria-hidden /><Eyebrow className="mt-6">Cadena de evidencia</Eyebrow><Heading size="xl">La cifra final depende de seis decisiones previas.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">La calidad no se evalúa por el número de páginas. Se evalúa por la trazabilidad de la pregunta, la comparabilidad y la capacidad de verificar la recomendación.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {evidenceChain.map((item) => (
                <article key={item.number} className="min-h-[190px] bg-canvas p-6 md:p-8">
                  <span className="font-mono text-[10px] text-[#8a6d21]">{item.number}</span>
                  <h2 className="mt-9 text-xl font-medium tracking-[-0.025em] text-ink">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Métodos complementarios</Eyebrow><Heading size="xl">Explorar, medir, validar y comparar.</Heading></div>
            <div className="divide-y divide-border border-y border-border">
              {methods.map((item, index) => (
                <article key={item.label} className="grid gap-4 py-7 sm:grid-cols-[36px_0.55fr_1fr] sm:gap-7">
                  <span className="font-mono text-[10px] text-[#8a6d21]">0{index + 1}</span>
                  <div><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">{item.label}</span><h2 className="mt-2 text-lg font-medium tracking-[-0.025em] text-ink">{item.title}</h2></div>
                  <p className="text-sm leading-7 text-ink/62">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#e5dfc8]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.46fr_1fr] lg:gap-20">
            <div><Eyebrow>Fuentes para Perú</Eyebrow><Heading size="xl">La primera diligencia puede comenzar con evidencia pública.</Heading></div>
            <div className="max-w-3xl text-base leading-8 text-ink/72">
              <p>INEI ofrece sistemas distritales, censales, económicos y geográficos; PRODUCE publica estadísticas empresariales, industriales, Mipyme y comercio; PROMPERÚ desarrolla inteligencia y prospectiva de mercados e inversiones; y MEF permite examinar carteras y proyectos públicos. Estas fuentes orientan la exploración, pero no reemplazan datos comerciales ni validación primaria cuando la decisión lo exige.</p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#735b1f]">
                <a href="https://www.inei.gob.pe/sistemas-consulta/" target="_blank" rel="noreferrer">Sistemas de consulta del INEI</a>
                <a href="https://ide.inei.gob.pe/" target="_blank" rel="noreferrer">Infraestructura geoespacial del INEI</a>
                <a href="https://ogeiee.produce.gob.pe/index.php/shortcode/oee-documentos-publicaciones/publicaciones-anuales" target="_blank" rel="noreferrer">Estadísticas de PRODUCE</a>
                <a href="https://www.promperu.gob.pe/investdata" target="_blank" rel="noreferrer">InvestData de PROMPERÚ</a>
                <a href="https://www.mef.gob.pe/es/?id=157&option=com_content&view=article" target="_blank" rel="noreferrer">Proyectos de inversión del MEF</a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Evidencia abierta</Eyebrow><Heading size="xl">Datos, método y muestra antes del contacto.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Explora la infraestructura territorial de NOAM, una arquitectura de entregable y una plantilla para definir alcance sin revelar información confidencial.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {evidence.map((item) => (
              <NextLink key={item.href} href={item.href} className="group min-h-[225px] bg-canvas p-6 transition-colors hover:bg-panel md:p-8">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8a6d21]">{item.label}</span>
                <h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-ink">Abrir <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </NextLink>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Antes de estimar el mercado.</Heading><Accordion items={faq} className="mt-8" /></Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-[#8a6d21] px-7 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><Eyebrow className="text-white/55">Primera definición</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Cuéntanos qué decisión de mercado debe reducirse y qué territorio está en juego.</h2></div>
              <div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/estudios-mercado-inteligencia-territorial" analyticsEvent="cta_click" analyticsTarget="market-hub:scope" variant="secondary" className="rounded-full border-white bg-white text-ink">Diseñar un alcance</Button><Button href="/contact?interest=inteligencia-territorial-inversion&from=/estudios-mercado-inteligencia-territorial" analyticsEvent="cta_click" analyticsTarget="market-hub:contact" variant="ghost" className="!text-white/70 hover:!text-white">Plantear el estudio</Button></div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

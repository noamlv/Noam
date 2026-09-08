import { ArrowRight, Banknote, Building2, Check, Layers3, MapPinned, Network, UsersRound } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/diagnostico-territorial";

export const metadata = buildMetadata({
  title: "Diagnóstico territorial para gobiernos y empresas",
  description: "Guía para convertir datos, brechas, capacidades, actores, riesgos y oportunidades de un distrito, provincia o región en prioridades y decisiones verificables.",
  path
});

const decisions = [
  { number: "01", title: "Definir prioridades", text: "Separar urgencia, magnitud, población afectada y viabilidad para no tratar todos los problemas por igual." },
  { number: "02", title: "Formular o actualizar", text: "Sustentar planes, programas, inversiones o una agenda de gestión con evidencia territorial pertinente." },
  { number: "03", title: "Focalizar recursos", text: "Identificar dónde, para quién y bajo qué condiciones una intervención puede producir mayor valor." },
  { number: "04", title: "Entrar a un mercado", text: "Comprender demanda, infraestructura, actores, riesgos y oportunidades antes de una decisión empresarial." }
];

const layers = [
  { icon: UsersRound, title: "Población y bienestar", question: "¿Quiénes enfrentan la brecha y cómo cambia entre grupos y lugares?" },
  { icon: Building2, title: "Servicios y acceso", question: "¿Qué cobertura, calidad y barreras presentan los servicios relevantes?" },
  { icon: Banknote, title: "Economía y medios de vida", question: "¿Qué actividades, empleo, cadenas y restricciones sostienen el territorio?" },
  { icon: MapPinned, title: "Geografía, ambiente y riesgos", question: "¿Cómo influyen distancia, conectividad, exposición y uso del territorio?" },
  { icon: Layers3, title: "Presupuesto e inversiones", question: "¿Qué recursos, proyectos y brechas pueden movilizarse o requieren corrección?" },
  { icon: Network, title: "Capacidad y actores", question: "¿Qué competencias, equipos, organizaciones e incentivos condicionan la respuesta?" }
];

const scopes = [
  { label: "Gobierno distrital", title: "Barrio, centro poblado y servicio", text: "Lectura operativa con fuentes disponibles, brechas concretas y prioridades compatibles con una capacidad acotada." },
  { label: "Gobierno provincial", title: "Articulación entre distritos", text: "Movilidad, servicios supradistritales, cadenas, riesgos y diferencias internas que exigen coordinación." },
  { label: "Gobierno regional", title: "Heterogeneidad y cartera", text: "Comparación provincial, prioridades sectoriales, inversiones, capacidades y agenda intergubernamental." },
  { label: "Sector nacional", title: "Despliegue territorial", text: "Variación subnacional, criterios de focalización y condiciones locales para programas y políticas nacionales." },
  { label: "Empresa u organización", title: "Entorno y oportunidad", text: "Demanda, infraestructura, licencia social, actores, riesgo operativo y opciones de impacto territorial." }
];

const readiness = [
  "Decisión, usuario y fecha límite",
  "Ámbito y unidades territoriales",
  "Población y grupos de interés",
  "Fuentes, periodos y responsables",
  "Criterios de comparación y prioridad",
  "Productos y ruta de uso"
];

const evidence = [
  { label: "Estudio", title: "Qué debe entregar un diagnóstico", text: "Del inventario de datos a una agenda accionable.", href: "/insights/diagnostico-territorial-que-debe-entregar" },
  { label: "TDR + plantilla", title: "Contratar un diagnóstico territorial", text: "Preguntas, productos y aceptación en una matriz editable.", href: "/toolkits/tdr-diagnostico-territorial-institucional" },
  { label: "Muestra", title: "Diagnóstico y agenda priorizada", text: "Arquitectura demostrativa de un entregable profesional.", href: "/muestras/diagnostico-agenda-territorial" },
  { label: "Datos abiertos", title: "Perfiles municipales", text: "Punto de partida para explorar 1,891 municipalidades.", href: "/dataperu/municipios" },
  { label: "Atlas", title: "Agendas departamentales", text: "Veinticinco lecturas iniciales de problemas y oportunidades.", href: "/dataperu/departamentos" },
  { label: "Solución", title: "Diagnóstico y agenda territorial", text: "Alcance, fases, productos y condiciones del servicio.", href: "/solutions/diagnostico-agenda-territorial" }
];

const faq = [
  { title: "¿Un diagnóstico territorial es solo una recopilación de indicadores?", content: "No. Los indicadores describen parte de la situación. Un diagnóstico útil también contrasta causas, actores, capacidades, diferencias internas, riesgos y alternativas vinculadas con una decisión." },
  { title: "¿Sirve para una municipalidad pequeña con pocos datos?", content: "Sí. Se puede comenzar con fuentes públicas, instrumentos existentes, entrevistas focalizadas y una agenda explícita de vacíos. El alcance debe ajustarse a la capacidad real y evitar una falsa exhaustividad." },
  { title: "¿Es lo mismo que elaborar un PDLC, un diagnóstico de brechas o un DIT?", content: "No. Son instrumentos y procesos con finalidades y reglas específicas. Un servicio puede aportar insumos o apoyar una fase, pero debe declarar cuál instrumento atiende y qué normativa resulta aplicable." },
  { title: "¿Puede incluir encuestas, entrevistas o trabajo de campo?", content: "Sí. Se incorporan cuando responden preguntas que los registros y datos públicos no resuelven. El diseño debe precisar muestra, cobertura, calidad, privacidad y limitaciones." },
  { title: "¿También aplica a empresas?", content: "Sí. La estructura puede adaptarse para evaluar entorno, demanda, infraestructura, actores, riesgos y oportunidades, sin confundir un diagnóstico territorial con una investigación comercial completa." },
  { title: "¿Qué debe quedar después del informe?", content: "Como mínimo, fuentes documentadas, matrices editables, criterios de prioridad, productos ejecutivos y una ruta de decisiones. Si corresponde, también datos, mapas, código y protocolo de actualización." }
];

export default function TerritorialDiagnosisPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Diagnóstico territorial", path }])} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Diagnóstico territorial para gobiernos y empresas",
        description: "Guía para convertir evidencia territorial en prioridades y decisiones.",
        url: `${siteConfig.url}${path}`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: layers.map((layer, index) => ({ "@type": "ListItem", position: index + 1, name: layer.title }))
        }
      }} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.46fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="text-[#d9a48f]">Territorio y decisión</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[14ch] text-white">Un territorio no se diagnostica con una tabla. Se entiende para decidir.</Heading>
            </div>
            <div>
              <p className="text-base leading-8 text-white/68">Para gobiernos y empresas que necesitan convertir brechas, capacidades, actores, riesgos y oportunidades en prioridades verificables.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#capas" variant="secondary" className="rounded-full border-white bg-white text-ink">Ver qué debe incluir</Button>
                <Button href="/toolkits/tdr-diagnostico-territorial-institucional" variant="ghost" className="!text-white/70 hover:!text-white">Abrir TDR y plantilla</Button>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {decisions.map((item) => (
              <article key={item.number} className="min-h-[230px] bg-[#192823] p-6 md:p-8">
                <span className="font-mono text-[10px] text-[#d9a48f]">{item.number}</span>
                <h2 className="mt-10 text-xl font-medium tracking-[-0.025em] text-white/90">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/58">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Section id="capas">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Lectura integrada</Eyebrow><Heading size="xl">Seis capas que deben conversar.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">La selección exacta depende de la decisión. La calidad no está en sumar variables, sino en explicar relaciones, diferencias internas y restricciones para actuar.</p>
          </div>

          <div className="mt-12 divide-y divide-border border-y border-border">
            {layers.map(({ icon: Icon, title, question }, index) => (
              <article key={title} className="grid gap-5 py-8 md:grid-cols-[64px_0.65fr_1fr] md:items-center md:gap-10 md:py-10">
                <div className="flex items-center gap-4 md:block"><span className="font-mono text-[10px] text-rust">0{index + 1}</span><Icon className="h-5 w-5 text-rust md:mt-7" aria-hidden /></div>
                <h2 className="text-2xl font-medium tracking-[-0.035em] text-ink">{title}</h2>
                <p className="text-sm leading-7 text-ink/65">{question}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Escala correcta</Eyebrow><Heading size="xl">El territorio cambia con quien decide.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Una región no es una municipalidad grande. Cada nivel observa competencias, relaciones y heterogeneidades distintas.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {scopes.map((scope, index) => (
                <article key={scope.label} className={`min-h-[215px] bg-canvas p-6 md:p-8 ${index === scopes.length - 1 ? "sm:col-span-2" : ""}`}>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-rust">{scope.label}</span>
                  <h2 className="mt-10 text-xl font-medium tracking-[-0.025em] text-ink">{scope.title}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/62">{scope.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.46fr_1fr] lg:gap-20">
            <div><Eyebrow>Marco público</Eyebrow><Heading size="xl">Caracterizar, explicar, priorizar y usar.</Heading></div>
            <div className="max-w-3xl text-base leading-8 text-ink/72">
              <p>La guía de CEPLAN para planes locales conecta caracterización y diagnóstico con variables estratégicas, riesgos, oportunidades y decisiones. La guía del MEF para programación de inversiones organiza el diagnóstico de brechas subnacional desde la caracterización, la contextualización y la difusión. Son referencias para estructurar el análisis; el instrumento aplicable y sus reglas deben confirmarse en cada encargo.</p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-rust">
                <a href="https://www.gob.pe/institucion/ceplan/informes-publicaciones/5972882-guia-para-el-plan-de-desarrollo-local-concertado-para-la-mejora-de-planes-estrategicos-con-enfoque-territorial-actualizada-2024" target="_blank" rel="noreferrer">Guía PDLC de CEPLAN</a>
                <a href="https://www.mef.gob.pe/contenidos/inv_publica/PMI/GUIA_PMI_2026.pdf" target="_blank" rel="noreferrer">Guía PMI 2026 del MEF</a>
                <a href="https://www.gob.pe/institucion/minam/normas-legales/318159-172-2016-minam" target="_blank" rel="noreferrer">Pautas DIT del MINAM</a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#ded9cc]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Antes de contratar</Eyebrow><Heading size="xl">Seis definiciones evitan un informe sin uso.</Heading></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-black/10 bg-black/10 sm:grid-cols-2">
              {readiness.map((item, index) => (
                <div key={item} className="min-h-[145px] bg-[#e6e1d5] p-6 md:p-8">
                  <div className="flex items-center justify-between"><Check className="h-4 w-4 text-rust" aria-hidden /><span className="font-mono text-[10px] text-muted">0{index + 1}</span></div>
                  <p className="mt-7 text-base font-medium leading-6 tracking-[-0.02em] text-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Evidencia abierta</Eyebrow><Heading size="xl">Explora antes de solicitar una propuesta.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">NOAM conecta una guía breve, un TDR editable, una muestra de entregable, datos territoriales y una solución profesional.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {evidence.map((item) => (
              <NextLink key={item.href} href={item.href} className="group min-h-[225px] bg-canvas p-6 transition-colors hover:bg-panel md:p-8">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-rust">{item.label}</span>
                <h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-ink">Abrir <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </NextLink>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Antes de definir el alcance.</Heading><Accordion items={faq} className="mt-8" /></Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-7 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><Eyebrow className="text-white/55">Punto de partida</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Dinos qué territorio y qué decisión necesitas entender. El alcance viene después.</h2></div>
              <div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/diagnostico-territorial" analyticsEvent="cta_click" analyticsTarget="territorial-hub:scope" variant="secondary" className="rounded-full border-white bg-white text-ink">Diseñar un alcance</Button><Button href="/contact?interest=diagnostico-agenda-territorial&from=/diagnostico-territorial" analyticsEvent="cta_click" analyticsTarget="territorial-hub:contact" variant="ghost" className="!text-white/70 hover:!text-white">Plantear un encargo</Button></div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

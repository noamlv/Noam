import { ArrowRight, BarChart3, MessageCircleMore, ScanSearch, Store, UsersRound } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/encuestas-estudios-opinion";

export const metadata = buildMetadata({
  title: "Encuestas y estudios de opinión para gobiernos y empresas",
  description: "Guía para diseñar y contratar encuestas de satisfacción, experiencia, necesidades, opinión pública, mercado o seguimiento con muestra, campo y análisis verificables.",
  path
});

const studyTypes = [
  { icon: MessageCircleMore, title: "Satisfacción y experiencia", question: "¿Qué funciona, qué frustra y qué parte del servicio debe mejorar?", use: "Servicios públicos, atención, canales digitales, clientes y usuarios." },
  { icon: ScanSearch, title: "Necesidades y barreras", question: "¿Quién necesita qué, dónde y qué impide el acceso o uso?", use: "Diagnósticos, diseño de programas, focalización y líneas de base." },
  { icon: UsersRound, title: "Opinión, confianza y clima", question: "¿Qué piensa una población y cómo cambia entre segmentos o momentos?", use: "Opinión pública, reputación, licencia social y seguimiento territorial." },
  { icon: BarChart3, title: "Resultados y seguimiento", question: "¿Qué cambió desde una medición anterior o después de una intervención?", use: "Programas, campañas, servicios, políticas y mejora continua." },
  { icon: Store, title: "Mercado y clientes", question: "¿Qué demanda existe, cómo se segmenta y qué propuesta resulta relevante?", use: "Entrada a mercados, producto, precio, experiencia y oportunidad territorial." }
];

const qualityChain = [
  { number: "01", title: "Decisión", text: "Qué cambiará si el resultado es distinto y quién utilizará la evidencia." },
  { number: "02", title: "Población y marco", text: "A quién se busca representar, cómo se identifica y quién puede quedar fuera." },
  { number: "03", title: "Instrumento y piloto", text: "Conceptos, lenguaje, orden, duración y pruebas antes del campo." },
  { number: "04", title: "Campo y supervisión", text: "Selección, cobertura, no respuesta, validaciones e incidencias documentadas." },
  { number: "05", title: "Análisis e incertidumbre", text: "Ponderación, estimación, segmentos, comparaciones y límites de inferencia." },
  { number: "06", title: "Datos y uso", text: "Privacidad, base anonimizada, diccionario, decisiones y continuidad." }
];

const methodChoices = [
  { label: "Encuesta probabilística", text: "Cuando se necesita estimar resultados para una población definida y existe un marco o estrategia de selección defendible." },
  { label: "Encuesta de usuarios", text: "Cuando interesa la experiencia de quienes utilizaron un servicio; no describe automáticamente a quienes no accedieron." },
  { label: "Encuesta online abierta", text: "Útil para participación o exploración, pero su autoselección limita la generalización al conjunto de la población." },
  { label: "Estudio cualitativo", text: "Entrevistas, grupos o talleres para comprender lenguaje, mecanismos y experiencias que un cuestionario cerrado no explica." },
  { label: "Diseño mixto", text: "Integra medición y explicación cuando las decisiones requieren magnitud, diferencias y comprensión del porqué." }
];

const evidence = [
  { label: "Método", title: "Diseñar una encuesta para decidir", text: "Preguntas, población, instrumento y plan de análisis.", href: "/toolkits/diseno-encuesta-para-decidir" },
  { label: "TDR + plantilla", title: "Contratar una encuesta", text: "Muestra, campo, privacidad, productos y aceptación.", href: "/toolkits/tdr-encuesta-estudio-territorial" },
  { label: "Muestra", title: "Encuesta y escucha territorial", text: "Arquitectura de un entregable antes de contratar.", href: "/muestras/encuesta-escucha-territorial" },
  { label: "Caso real", title: "Barómetro Electoral 2026", text: "De 1,300 entrevistas a una lectura pública integrada.", href: "/cases/barometro-electoral-enero-2026" },
  { label: "Demostración", title: "Explorar el Barómetro", text: "Narrativa, segmentos, modelos y límites metodológicos.", href: "/electoral/barometro-enero-2026" },
  { label: "Solución", title: "Encuestas y escucha territorial", text: "Alcance profesional para gobiernos y empresas.", href: "/solutions/encuestas-escucha-ciudadana" }
];

const faq = [
  { title: "¿Cuántas encuestas necesito?", content: "No existe un número universal. Depende de la población, dominios que deben compararse, precisión requerida, diseño muestral, no respuesta y presupuesto. El tamaño se justifica después de definir esas condiciones." },
  { title: "¿Una encuesta online representa a toda la población?", content: "No por defecto. Si el acceso y la participación son voluntarios, pueden quedar sobrerrepresentados ciertos perfiles. Puede ser útil, pero la población efectivamente observada y los límites deben declararse." },
  { title: "¿Pueden medir satisfacción de un servicio municipal o regional?", content: "Sí. Primero se define quién utilizó el servicio, en qué canal y periodo, qué experiencia se medirá y cómo los resultados se conectarán con responsables y mejoras concretas." },
  { title: "¿Realizan encuestas para empresas?", content: "Sí. El alcance puede cubrir clientes, mercado, reputación, experiencia, actores territoriales o clima social. La muestra y el instrumento se adaptan a la decisión empresarial." },
  { title: "¿La encuesta puede formar parte de una línea de base o evaluación?", content: "Sí. Debe diseñarse para que sus indicadores, población, calendario e instrumentos sean comparables con mediciones posteriores y coherentes con la teoría de cambio." },
  { title: "¿Qué recibe la organización además del informe?", content: "Según el encargo: ficha técnica, cuestionario, reporte de campo, base anonimizada, diccionario, tabulados, código o bitácora analítica, visualizaciones, brief ejecutivo y sesión de implicancias." }
];

export default function SurveysOpinionPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Encuestas y estudios de opinión", path }])} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Encuestas y estudios de opinión para gobiernos y empresas",
        description: "Rutas para diseñar estudios de satisfacción, necesidades, opinión, seguimiento o mercado.",
        url: `${siteConfig.url}${path}`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: studyTypes.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title }))
        }
      }} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.46fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="text-[#d9a48f]">Población, usuarios y mercados</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[14ch] text-white">Una encuesta útil no empieza con preguntas. Empieza con una decisión.</Heading>
            </div>
            <div>
              <p className="text-base leading-8 text-white/68">Diseño, trabajo de campo y análisis para comprender satisfacción, experiencia, necesidades, opinión o mercado sin ocultar a quién representan los resultados.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#tipos" variant="secondary" className="rounded-full border-white bg-white text-ink">Elegir un estudio</Button>
                <Button href="/toolkits/tdr-encuesta-estudio-territorial" variant="ghost" className="!text-white/70 hover:!text-white">Abrir TDR y plantilla</Button>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">
            {["Gobiernos nacionales y subnacionales", "Empresas, servicios y mercados", "Estudios cuantitativos, cualitativos o mixtos"].map((item, index) => (
              <div key={item} className="bg-[#192823] p-6 md:p-8">
                <span className="font-mono text-[10px] text-[#d9a48f]">0{index + 1}</span>
                <p className="mt-9 max-w-[24ch] text-lg font-medium leading-6 tracking-[-0.02em] text-white/86">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section id="tipos">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Qué necesitas comprender</Eyebrow><Heading size="xl">Cinco estudios que no deben confundirse.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Pueden compartir técnicas, pero cambian la población, el instrumento, las comparaciones y el uso. El primer alcance debe nombrar la decisión y a quién necesita representar.</p>
          </div>

          <div className="mt-12 divide-y divide-border border-y border-border">
            {studyTypes.map(({ icon: Icon, title, question, use }, index) => (
              <article key={title} className="grid gap-6 py-9 md:grid-cols-[64px_0.75fr_1fr] md:gap-10 md:py-11">
                <div className="flex items-center gap-4 md:block"><span className="font-mono text-[10px] text-rust">0{index + 1}</span><Icon className="h-5 w-5 text-rust md:mt-8" aria-hidden /></div>
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
            <div><Eyebrow>Calidad completa</Eyebrow><Heading size="xl">La muestra no es el único control.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Una cifra puede fallar por una población mal definida, preguntas ambiguas, cobertura desigual, no respuesta o una interpretación que excede el diseño.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {qualityChain.map((item) => (
                <article key={item.number} className="min-h-[190px] bg-canvas p-6 md:p-8">
                  <span className="font-mono text-[10px] text-rust">{item.number}</span>
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
            <div><Eyebrow>Elegir método</Eyebrow><Heading size="xl">Representar, escuchar o explicar.</Heading></div>
            <div className="divide-y divide-border border-y border-border">
              {methodChoices.map((item, index) => (
                <article key={item.label} className="grid gap-4 py-7 sm:grid-cols-[36px_0.55fr_1fr] sm:gap-7">
                  <span className="font-mono text-[10px] text-rust">0{index + 1}</span>
                  <h2 className="text-lg font-medium tracking-[-0.025em] text-ink">{item.label}</h2>
                  <p className="text-sm leading-7 text-ink/62">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#ded9cc]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.46fr_1fr] lg:gap-20">
            <div><Eyebrow>Referencias públicas</Eyebrow><Heading size="xl">Medir para mejorar, no para producir otro porcentaje.</Heading></div>
            <div className="max-w-3xl text-base leading-8 text-ink/72">
              <p>El INEI reúne metodologías para diseño y análisis de encuestas. La PCM utiliza mediciones de satisfacción para identificar mejoras en servicios públicos, y OSIPTEL documenta diseño muestral, cuestionarios, campo y análisis para estudios comparables de experiencia. Son referencias de calidad; cada estudio debe adaptar población, método y protección de datos a su finalidad.</p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-rust">
                <a href="https://www.gob.pe/institucion/inei/informes-publicaciones/2439678-metodologias-para-encuestas" target="_blank" rel="noreferrer">Metodologías del INEI</a>
                <a href="https://www.gob.pe/institucion/pcm/informes-publicaciones/7023366-herramientas-para-una-gestion-integral-de-los-servicios-municipales" target="_blank" rel="noreferrer">Herramientas municipales de PCM</a>
                <a href="https://www.gob.pe/institucion/osiptel/informes-publicaciones/5179246-guia-metodologica-para-la-medicion-de-la-satisfaccion-de-los-usuarios-de-los-servicios-publicos-de-telecomunicaciones" target="_blank" rel="noreferrer">Guía de satisfacción de OSIPTEL</a>
                <a href="https://www.gob.pe/institucion/anpd/normas-legales/6554453-n-016-2024-jus" target="_blank" rel="noreferrer">Reglamento de datos personales</a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Evidencia abierta</Eyebrow><Heading size="xl">Método, muestra y caso antes del contacto.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Examina cómo NOAM conecta pregunta, campo, análisis y uso sin convertir la encuesta en una colección de gráficos.</p>
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
        <Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Antes de fijar la muestra.</Heading><Accordion items={faq} className="mt-8" /></Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-7 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><Eyebrow className="text-white/55">Primera definición</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Cuéntanos qué decisión cambiaría con una respuesta distinta.</h2></div>
              <div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/encuestas-estudios-opinion" analyticsEvent="cta_click" analyticsTarget="surveys-hub:scope" variant="secondary" className="rounded-full border-white bg-white text-ink">Diseñar un alcance</Button><Button href="/contact?interest=encuestas-escucha-ciudadana&from=/encuestas-estudios-opinion" analyticsEvent="cta_click" analyticsTarget="surveys-hub:contact" variant="ghost" className="!text-white/70 hover:!text-white">Plantear un estudio</Button></div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

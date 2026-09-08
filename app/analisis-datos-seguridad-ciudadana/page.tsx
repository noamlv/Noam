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
  { icon: Radar, title: "Diagnosticar", question: "¿Qué hechos, percepciones, factores de riesgo y capacidades requieren atención?", use: "Diagnóstico territorial, PASC, cartera de prioridades y línea de base." },
  { icon: MapPinned, title: "Focalizar", question: "¿Dónde coinciden incidentes, exposición, población y capacidad de respuesta?", use: "Mapas operativos, patrullaje, prevención situacional y recuperación de espacios." },
  { icon: UsersRound, title: "Escuchar", question: "¿Qué vive, reporta y evita la población, incluso cuando no denuncia?", use: "Encuestas de victimización, percepción, confianza, experiencia y convivencia." },
  { icon: ChartNoAxesCombined, title: "Monitorear", question: "¿Qué compromisos avanzan y qué señal exige una respuesta?", use: "Observatorios, tableros, alertas y sesiones de CODISEC, COPROSEC o CORESEC." },
  { icon: BadgeCheck, title: "Evaluar", question: "¿La intervención se implementó y produjo el cambio esperado?", use: "Evaluación de proceso, resultados o impacto según datos y diseño disponibles." }
];

const evidenceChain = [
  { number: "01", title: "Decisión", text: "Problema, competencia, usuario y acción que la evidencia debe sostener." },
  { number: "02", title: "Territorio", text: "Unidad geográfica, periodo, población y horarios comparables." },
  { number: "03", title: "Fuentes", text: "Denuncias, encuestas, llamadas, registros, capacidades y contexto." },
  { number: "04", title: "Calidad", text: "Subregistro, duplicados, cambios de cobertura, denominadores y vigencia." },
  { number: "05", title: "Protección", text: "Acceso por roles, agregación, trazabilidad y resguardo de datos sensibles." },
  { number: "06", title: "Acción", text: "Indicador, umbral, responsable, respuesta, evidencia de cierre y evaluación." }
];

const evidence = [
  { label: "Datos municipales", title: "Seguridad en DataPerú", text: "Serenazgo, planes, mapas y patrullaje declarados en RENAMU 2025.", href: "/dataperu/temas/seguridad-ciudadana" },
  { label: "TDR + plantilla", title: "Contratar el análisis", text: "Preguntas, fuentes, privacidad, productos y aceptación verificable.", href: "/toolkits/tdr-analisis-seguridad-ciudadana" },
  { label: "Capacidad", title: "Diagnóstico territorial", text: "Problemas, población, servicios, actores, capacidades y prioridades.", href: "/diagnostico-territorial" },
  { label: "Capacidad", title: "Encuestas y opinión", text: "Victimización, percepción, confianza y experiencia con diseño interpretable.", href: "/encuestas-estudios-opinion" },
  { label: "Capacidad", title: "Observatorios y visores", text: "Indicadores, mapas, alertas, responsables y rutina de seguimiento.", href: "/observatorios-dashboards-visores" },
  { label: "Producto", title: "Visor georreferenciado", text: "Prototipo para explorar capas, brechas y prioridades territoriales.", href: "/products/visor-riesgo-georreferenciado" }
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
              <Heading as="h1" size="display" className="max-w-[15ch] text-white">La seguridad no se gestiona con un solo mapa ni con una sola cifra.</Heading>
            </div>
            <div>
              <p className="text-base leading-8 text-white/68">Integramos capacidades, hechos, victimización, percepción y territorio para priorizar intervenciones, conducir compromisos y evaluar sin confundir actividad con resultado.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#decisiones" variant="secondary" className="rounded-full border-white bg-white text-ink">Definir la necesidad</Button>
                <Button href="/toolkits/tdr-analisis-seguridad-ciudadana" variant="ghost" className="!text-white/70 hover:!text-white">Abrir TDR y plantilla</Button>
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
            <div><Eyebrow>Qué necesitas decidir</Eyebrow><Heading size="xl">Cinco encargos que no deben confundirse.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Un diagnóstico identifica prioridades; un mapa focaliza; una encuesta observa experiencias; un observatorio sostiene la conducción; una evaluación juzga una intervención.</p>
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
            <div><ShieldCheck className="h-5 w-5 text-[#2f5c52]" aria-hidden /><Eyebrow className="mt-6">Cadena de evidencia</Eyebrow><Heading size="xl">Del registro a una respuesta institucional.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">La utilidad depende de definiciones comparables, protección de datos y una regla clara para actuar.</p></div>
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
            <div><Eyebrow>Marco y fuentes</Eyebrow><Heading size="xl">Datos distintos responden preguntas distintas.</Heading></div>
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
            <div><Eyebrow>Evidencia y servicios</Eyebrow><Heading size="xl">Explora antes de plantear el encargo.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Revisa la información municipal, el método y las capacidades que pueden combinarse según la decisión.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {evidence.map((item) => (
              <NextLink key={item.href} href={item.href} className="group min-h-[225px] bg-canvas p-6 transition-colors hover:bg-panel md:p-8">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2f5c52]">{item.label}</span>
                <h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-ink">Abrir <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </NextLink>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Antes de integrar los datos.</Heading><Accordion items={faq} className="mt-8" /></Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-[#2f5c52] px-7 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><Eyebrow className="text-white/55">Primera definición</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Cuéntanos qué decisión de seguridad debe mejorar y qué territorio está en juego.</h2></div>
              <div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/analisis-datos-seguridad-ciudadana" analyticsEvent="cta_click" analyticsTarget="security-hub:scope" variant="secondary" className="rounded-full border-white bg-white text-ink">Diseñar un alcance</Button><Button href="/contact?interest=seguridad-ciudadana&from=/analisis-datos-seguridad-ciudadana" analyticsEvent="cta_click" analyticsTarget="security-hub:contact" variant="ghost" className="!text-white/70 hover:!text-white">Plantear el encargo</Button></div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

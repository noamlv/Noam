import { ArrowRight, BellRing, FileText, Files, MessagesSquare, Search, ShieldCheck, Workflow } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/ia-automatizacion-gobiernos-empresas";

export const metadata = buildMetadata({
  title: "IA y automatización para gobiernos y empresas",
  description: "Guía para elegir, probar y gobernar casos de inteligencia artificial y automatización con un proceso definido, datos autorizados, supervisión y métricas antes de escalar.",
  path
});

const useCases = [
  { icon: Search, title: "Búsqueda y conocimiento", question: "¿Cómo encontrar normas, informes y antecedentes con fuente y versión verificables?", use: "Repositorios institucionales, soporte interno, investigación y gestión documental." },
  { icon: Files, title: "Extracción y clasificación", question: "¿Qué campos, categorías o derivaciones repetitivas puede sugerir el sistema para revisión?", use: "Expedientes, formularios, contratos, solicitudes, incidencias y archivos históricos." },
  { icon: FileText, title: "Redacción asistida", question: "¿Qué borradores pueden prepararse desde plantillas y evidencia autorizada sin delegar la aprobación?", use: "Respuestas, resúmenes, reportes, fichas, comunicaciones y documentación técnica." },
  { icon: MessagesSquare, title: "Orientación y atención", question: "¿Qué consultas frecuentes pueden resolverse y cuándo debe intervenir una persona?", use: "Ciudadanía, clientes, equipos internos, proveedores y canales de autoservicio." },
  { icon: BellRing, title: "Señales y apoyo analítico", question: "¿Qué patrones o excepciones necesitan revisión y qué acción sigue después?", use: "Proyectos, servicios, riesgos, control de calidad, mercado y seguimiento operativo." }
];

const pilotChain = [
  { number: "01", title: "Proceso y línea de base", text: "Tarea, volumen, tiempo, errores, costo y responsables antes de introducir IA." },
  { number: "02", title: "Datos y permisos", text: "Fuentes autorizadas, vigencia, sensibilidad, acceso, retención y calidad mínima." },
  { number: "03", title: "Exposición y controles", text: "Consecuencias del error, supervisión, trazabilidad, abstención y respuesta a incidentes." },
  { number: "04", title: "Piloto y pruebas", text: "Alcance acotado, casos representativos y criterios definidos antes del desarrollo." },
  { number: "05", title: "Medición completa", text: "Calidad, tiempo total, retrabajo, riesgo, adopción y costo de operación." },
  { number: "06", title: "Decisión y adopción", text: "Evidencia para escalar, limitar, rediseñar o detener, con responsables claros." }
];

const outcomes = [
  { label: "Pilotar", title: "Valor plausible y exposición controlable", text: "Existe una tarea acotada, datos utilizables, revisión viable y una mejora que puede medirse en semanas." },
  { label: "Investigar", title: "Falta evidencia antes de construir", text: "La oportunidad puede ser relevante, pero todavía no están claros el proceso, los datos, las obligaciones o la línea de base." },
  { label: "Rediseñar", title: "Cambiar autonomía, datos o alcance", text: "El caso puede conservar utilidad si se reduce la consecuencia, se fortalece la supervisión o se limita la población afectada." },
  { label: "Detener", title: "El riesgo o la inviabilidad dominan", text: "Una alternativa más simple, reglas determinísticas o mejora del proceso puede producir más valor con menor exposición." }
];

const contexts = [
  { eyebrow: "Gobiernos", title: "Mejorar capacidad sin delegar responsabilidad pública", text: "La IA puede asistir búsqueda, clasificación, atención y análisis. Las decisiones sobre derechos, servicios o beneficios requieren controles proporcionales, transparencia y responsables institucionales." },
  { eyebrow: "Empresas", title: "Reducir fricción sin crear una deuda operativa invisible", text: "La evaluación debe incluir integración, seguridad, dependencia tecnológica, propiedad de datos, costo total, revisión humana y efecto real sobre clientes o equipos." }
];

const evidence = [
  { label: "Herramienta abierta", title: "Laboratorio de casos de IA", text: "Separa oportunidad, exposición y fortaleza de controles.", href: "/products/ai-governance-lab" },
  { label: "Muestra", title: "Piloto de IA documental", text: "Línea de base, corpus, pruebas, errores y decisión de escala.", href: "/muestras/piloto-ia-documental" },
  { label: "Guía directiva", title: "Gobernanza de IA", text: "Roles y controles proporcionales desde la selección del caso.", href: "/toolkits/ai-governance-playbook" },
  { label: "Toolkit", title: "Priorizar un caso de uso", text: "Ficha editable para comparar valor, datos, factibilidad y riesgo.", href: "/toolkits/ficha-priorizacion-caso-uso-ia" },
  { label: "Arquitectura", title: "IA documental en entidades", text: "Fuentes, permisos, recuperación, citas y supervisión.", href: "/insights/ia-documental-entidades-publicas" },
  { label: "Solución", title: "IA para procesos públicos", text: "Diagnóstico, portafolio, piloto, medición y adopción.", href: "/solutions/ia-procesos-publicos" }
];

const faq = [
  { title: "¿NOAM implementa chatbots y asistentes institucionales?", content: "Sí, cuando existe una finalidad clara, un corpus autorizado, reglas de acceso, rutas de derivación y métricas de calidad. Primero definimos qué puede responder, qué debe citar y cuándo debe abstenerse o transferir la consulta." },
  { title: "¿Se necesita una gran base de datos para comenzar?", content: "No siempre. Un piloto puede trabajar con una colección documental o un proceso acotado. La prioridad es que la fuente sea pertinente, autorizada, versionada y suficiente para probar el caso de uso." },
  { title: "¿Pueden automatizar una decisión completa?", content: "No es el punto de partida recomendado. Cuando una decisión afecta derechos, servicios, empleo, crédito u otros resultados relevantes, deben evaluarse la clasificación jurídica, la supervisión humana y alternativas de menor riesgo." },
  { title: "¿Cómo se evita que el sistema invente respuestas?", content: "Con fuentes controladas, recuperación verificable, instrucciones de abstención, citas, conjuntos de prueba, revisión humana y monitoreo. Ningún control elimina por sí solo el riesgo, por lo que debe medirse sobre casos reales." },
  { title: "¿Cómo se calcula si el piloto fue exitoso?", content: "Se compara con la línea de base del proceso completo: calidad, tiempo, retrabajo, errores graves, costo, adopción y carga de supervisión. Los umbrales se acuerdan antes de observar los resultados." },
  { title: "¿Queda la organización dependiente de un proveedor?", content: "El alcance debe definir código, datos, configuraciones, documentación, exportación, credenciales y condiciones de salida. La portabilidad y la transferencia son parte del producto, no una conversación posterior." }
];

export default function AiAutomationPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "IA y automatización", path }])} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "IA y automatización para gobiernos y empresas",
        description: "Rutas para seleccionar, controlar, probar y medir casos de inteligencia artificial.",
        url: `${siteConfig.url}${path}`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: useCases.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title }))
        }
      }} />

      <section className="overflow-hidden bg-[#172025] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.46fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="text-[#b8c8ce]">IA aplicada y gobernable</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[13ch] text-white">La IA no es el servicio. El servicio es un proceso mejor.</Heading>
            </div>
            <div>
              <p className="text-base leading-8 text-white/68">Seleccionamos casos, diseñamos controles y construimos pilotos medibles para gobiernos y empresas antes de comprometer una adopción mayor.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#casos" variant="secondary" className="rounded-full border-white bg-white text-ink">Explorar casos</Button>
                <Button href="/products/ai-governance-lab" variant="ghost" className="!text-white/70 hover:!text-white">Abrir laboratorio</Button>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">
            {["Proceso y línea de base antes de la herramienta", "Privacidad, seguridad y supervisión desde el diseño", "Evidencia para escalar, limitar o detener"].map((item, index) => (
              <div key={item} className="bg-[#1b282e] p-6 md:p-8">
                <span className="font-mono text-[10px] text-[#b8c8ce]">0{index + 1}</span>
                <p className="mt-9 max-w-[25ch] text-lg font-medium leading-6 tracking-[-0.02em] text-white/86">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section id="casos">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Casos de uso</Eyebrow><Heading size="xl">Cinco tareas concretas para evaluar.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">El nombre de una tecnología no define un proyecto. Cada caso cambia según el dato, el usuario, la consecuencia del error y la posibilidad real de supervisión.</p>
          </div>

          <div className="mt-12 divide-y divide-border border-y border-border">
            {useCases.map(({ icon: Icon, title, question, use }, index) => (
              <article key={title} className="grid gap-6 py-9 md:grid-cols-[64px_0.75fr_1fr] md:gap-10 md:py-11">
                <div className="flex items-center gap-4 md:block"><span className="font-mono text-[10px] text-[#475c63]">0{index + 1}</span><Icon className="h-5 w-5 text-[#475c63] md:mt-8" aria-hidden /></div>
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
            <div><Workflow className="h-5 w-5 text-[#475c63]" aria-hidden /><Eyebrow className="mt-6">Piloto completo</Eyebrow><Heading size="xl">La demostración es solo una de seis etapas.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Un prototipo convincente no demuestra calidad, seguridad, ahorro ni capacidad de operación. La evaluación empieza antes de construir.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {pilotChain.map((item) => (
                <article key={item.number} className="min-h-[190px] bg-canvas p-6 md:p-8">
                  <span className="font-mono text-[10px] text-[#475c63]">{item.number}</span>
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
            <div><Eyebrow>Decisión de portafolio</Eyebrow><Heading size="xl">El resultado no siempre es escalar.</Heading></div>
            <div className="divide-y divide-border border-y border-border">
              {outcomes.map((item, index) => (
                <article key={item.label} className="grid gap-4 py-7 sm:grid-cols-[36px_0.55fr_1fr] sm:gap-7">
                  <span className="font-mono text-[10px] text-[#475c63]">0{index + 1}</span>
                  <div><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">{item.label}</span><h2 className="mt-2 text-lg font-medium tracking-[-0.025em] text-ink">{item.title}</h2></div>
                  <p className="text-sm leading-7 text-ink/62">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#dce2e4]">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-md border border-ink/15 bg-ink/15 md:grid-cols-2">
            {contexts.map((item) => (
              <article key={item.eyebrow} className="bg-[#dce2e4] p-7 md:min-h-[300px] md:p-10">
                <Eyebrow>{item.eyebrow}</Eyebrow>
                <h2 className="mt-9 max-w-[22ch] text-3xl font-medium leading-tight tracking-[-0.04em] text-ink">{item.title}</h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-ink/68">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#172025] text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><ShieldCheck className="h-5 w-5 text-[#b8c8ce]" aria-hidden /><Eyebrow className="mt-6 text-[#b8c8ce]">Marco vigente</Eyebrow><Heading size="xl" className="text-white">Innovación responsable, no cumplimiento por apariencia.</Heading><p className="mt-5 text-sm leading-7 text-white/58">El alcance técnico debe adaptarse al uso, la organización y las obligaciones aplicables. NOAM no sustituye la clasificación jurídica ni una auditoría especializada.</p></div>
            <div className="divide-y divide-white/14 border-y border-white/14">
              {[
                { label: "Perú", title: "Estrategia Nacional de IA 2026–2030", text: "Marco para articular desarrollo, uso y gestión de la IA en el país.", href: "https://www.gob.pe/institucion/pcm/informes-publicaciones/8408055-estrategia-nacional-de-inteligencia-artificial-2026-2030" },
                { label: "Perú", title: "Reglamento de la Ley N.° 31814", text: "Clasificación, obligaciones y principios para sistemas basados en IA.", href: "https://www.gob.pe/institucion/pcm/normas-legales/7133522-115-2025-pcm" },
                { label: "NIST", title: "AI Risk Management Framework", text: "Marco voluntario para gobernar, mapear, medir y gestionar riesgos.", href: "https://www.nist.gov/itl/ai-risk-management-framework" }
              ].map((source) => (
                <a key={source.title} href={source.href} target="_blank" rel="noreferrer" className="group grid gap-3 py-5 sm:grid-cols-[80px_1fr_auto] sm:items-center">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#b8c8ce]">{source.label}</span>
                  <span><span className="block text-sm font-medium text-white/82">{source.title}</span><span className="mt-1 block text-xs leading-5 text-white/55">{source.text}</span></span>
                  <ArrowRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-[#b8c8ce]" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Evidencia abierta</Eyebrow><Heading size="xl">Prueba el criterio antes de contratar.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">El laboratorio, la muestra y las guías permiten examinar cómo NOAM prioriza, controla y mide un caso sin confundir una respuesta fluida con un sistema confiable.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {evidence.map((item) => (
              <NextLink key={item.href} href={item.href} className="group min-h-[225px] bg-canvas p-6 transition-colors hover:bg-panel md:p-8">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#475c63]">{item.label}</span>
                <h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-ink">Abrir <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </NextLink>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Antes de automatizar.</Heading><Accordion items={faq} className="mt-8" /></Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-[#475c63] px-7 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><Eyebrow className="text-white/55">Primera definición</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Cuéntanos qué tarea consume tiempo y qué error no puede pasar desapercibido.</h2></div>
              <div className="flex flex-wrap gap-3"><Button href="/products/ai-governance-lab" analyticsEvent="cta_click" analyticsTarget="ai-hub:lab" variant="secondary" className="rounded-full border-white bg-white text-ink">Evaluar un caso</Button><Button href="/contact?interest=ia-procesos-publicos&from=/ia-automatizacion-gobiernos-empresas" analyticsEvent="cta_click" analyticsTarget="ai-hub:contact" variant="ghost" className="!text-white/70 hover:!text-white">Plantear el piloto</Button></div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

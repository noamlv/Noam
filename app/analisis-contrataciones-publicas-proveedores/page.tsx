import { ArrowRight, Building2, CircleCheck, ListChecks, Search, Store, TriangleAlert } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/analisis-contrataciones-publicas-proveedores";

export const metadata = buildMetadata({
  title: "Análisis de contrataciones públicas y proveedores",
  description: "Analítica de compras para entidades y empresas: demanda, procedimientos, competencia, proveedores, plazos, contratos y oportunidades en el mercado público peruano.",
  path
});

const decisions = [
  { icon: ListChecks, title: "Ordenar la demanda", question: "¿Qué necesidades se repiten, cuáles pueden agregarse y qué requerimientos llegan tarde?", use: "Programación, categorías, unidades usuarias, estacionalidad, recurrencia, fraccionamiento analítico y oportunidad de compra." },
  { icon: Search, title: "Leer la competencia", question: "¿Dónde hay poca concurrencia, procesos sin resultado o barreras que merecen revisión?", use: "Convocatorias, participantes, ofertas, adjudicación, duración, territorio, objeto, modalidad y condiciones del requerimiento." },
  { icon: Store, title: "Comprender proveedores", question: "¿Qué empresas participan, ganan, repiten, se especializan o podrían atender una necesidad?", use: "Rubro, experiencia observada, ámbito, concentración, consorcios, recurrencia, tamaño de oportunidad y requisitos verificables." },
  { icon: TriangleAlert, title: "Seguir la ejecución", question: "¿Qué contratos, hitos o entregas requieren atención antes de afectar el servicio?", use: "Orden, contrato, plazo, ampliación, penalidad registrada, conformidad, pago, controversia, entregable y responsable." },
  { icon: CircleCheck, title: "Mejorar la estrategia", question: "¿Qué decisión concreta debe cambiar con la evidencia disponible?", use: "Plan de compra, estudio de mercado, diálogo con oferta, estandarización, gestión contractual, desarrollo de proveedores y seguimiento." }
];

const readingLayers = [
  { number: "01", title: "Necesidad", text: "Problema público, usuario, resultado esperado, cantidad, territorio y fecha en que debe estar disponible." },
  { number: "02", title: "Requerimiento", text: "Especificación, condición, experiencia, plazo, entregable, criterio de aceptación y posible barrera." },
  { number: "03", title: "Procedimiento", text: "Convocatoria, participación, consultas, ofertas, resultado, duración y trazabilidad documental." },
  { number: "04", title: "Mercado", text: "Proveedores, categorías, competencia, precios observados, distribución territorial y recurrencia." },
  { number: "05", title: "Contrato", text: "Obligaciones, plazo, modificaciones, entregas, conformidad, pago, incidencias y cierre." },
  { number: "06", title: "Servicio", text: "Disponibilidad, calidad, continuidad, usuario atendido y efecto de la compra sobre la finalidad pública." }
];

const audiences = [
  { label: "Entidad contratante", title: "Gestión de compras", text: "Cartera de demanda, concurrencia, tiempos, riesgos operativos y seguimiento contractual para conducir decisiones." },
  { label: "Empresa", title: "Inteligencia del mercado público", text: "Categorías, entidades compradoras, estacionalidad y oportunidades compatibles con capacidades demostrables." },
  { label: "Dirección y control", title: "Lectura ejecutiva", text: "Indicadores, excepciones y expedientes priorizados para revisar causas sin convertir una alerta en una acusación." }
];

const evidence = [
  { label: "TDR + plantilla", title: "Contratar el análisis", text: "Veinte bloques para definir universo, fuentes, indicadores, seguridad, productos y aceptación.", href: "/toolkits/tdr-analisis-contrataciones-publicas" },
  { label: "Sistema", title: "Observatorios y dashboards", text: "Arquitectura para convertir registros en alertas, responsables, reuniones y decisiones sostenibles.", href: "/observatorios-dashboards-visores" },
  { label: "Mercado", title: "Inteligencia territorial", text: "Método para dimensionar demanda, segmentos, competencia, localización y escenarios sin ocultar supuestos.", href: "/estudios-mercado-inteligencia-territorial" },
  { label: "Proveedores", title: "Desarrollo económico local", text: "Lectura de cadenas, capacidades empresariales, demanda verificable y barreras de articulación territorial.", href: "/analisis-datos-desarrollo-economico-local" },
  { label: "Cartera", title: "Inversión pública y proyectos", text: "Conecta contratos con presupuesto, avance físico, restricciones, operación y resultados esperados.", href: "/analisis-inversion-publica-proyectos" },
  { label: "Muestra", title: "Observatorio de gestión", text: "Revisa una arquitectura demostrativa de indicadores, alertas, responsables y rutina ejecutiva.", href: "/muestras/observatorio-gestion-inversiones" }
];

const faq = [
  { title: "¿Este análisis sirve para una municipalidad o gobierno regional?", content: "Sí. El universo puede delimitarse por entidad, unidad compradora, categoría, periodo, territorio o cartera priorizada. Antes de comparar se concilian identificadores, estados, fechas de corte y reglas de cada fuente." },
  { title: "¿También sirve para empresas que quieren vender al Estado?", content: "Sí. Podemos caracterizar demanda histórica, entidades compradoras, categorías, estacionalidad, participación y condiciones observables. El análisis no garantiza adjudicaciones ni sustituye la revisión de bases, requisitos, RNP y canales oficiales." },
  { title: "¿Pueden identificar sobrecostos, corrupción o direccionamiento?", content: "No a partir de una señal aislada. Podemos detectar patrones, diferencias y expedientes que justifican revisión documental. Una alerta no prueba una infracción, responsabilidad, concertación ni daño; esas conclusiones corresponden a procedimientos y autoridades competentes." },
  { title: "¿El análisis reemplaza SEACE, OECE, RNP o Perú Compras?", content: "No. Son sistemas y autoridades oficiales. NOAM puede integrar datos autorizados, documentar transformaciones y construir una capa analítica para decisiones, manteniendo vínculos, fecha de corte y límites de interpretación." },
  { title: "¿Pueden construir un observatorio de contrataciones?", content: "Sí. Primero se definen usuarios, decisiones, universo, indicadores, fuentes, actualización, accesos y protocolo de revisión. El tablero es una interfaz; la capacidad real incluye datos, responsables, documentación y operación." },
  { title: "¿Trabajan con información interna de contratos y entregables?", content: "Sí, cuando existe autorización y un alcance de seguridad acordado. Se separan datos públicos, institucionales y restringidos; además se definen acceso, minimización, registro de cambios, respaldo, conservación y entrega final." }
];

export default function PublicProcurementAnalysisPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Contrataciones públicas y proveedores", path }])} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: "Análisis de contrataciones públicas y proveedores", description: "Analítica de demanda, procedimientos, competencia, proveedores y ejecución contractual para entidades y empresas.", url: `${siteConfig.url}${path}`, provider: { "@id": `${siteConfig.url}/#organization` }, areaServed: { "@type": "Country", name: "Perú" } }} />

      <section className="overflow-hidden bg-[#2f302d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.46fr] lg:items-end lg:gap-20">
            <div><Eyebrow className="text-[#c8d0b9]">Contrataciones públicas y mercado proveedor</Eyebrow><Heading as="h1" size="display" className="max-w-[15ch] text-white">Comprar mejor exige mirar más que el procedimiento.</Heading></div>
            <div><p className="text-base leading-8 text-white/68">Conectamos demanda, procesos, competencia, proveedores y contratos para que entidades y empresas comprendan el mercado público con evidencia trazable.</p><div className="mt-7 flex flex-wrap gap-3"><Button href="#decisiones" variant="secondary" className="rounded-full border-white bg-white text-ink">Definir la pregunta</Button><Button href="/toolkits/tdr-analisis-contrataciones-publicas" variant="ghost" className="!text-white/70 hover:!text-white">Abrir TDR y plantilla</Button></div></div>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">{["Entidades de los tres niveles", "Empresas y proveedores", "Datos públicos + gestión contractual"].map((item, index) => <div key={item} className="bg-[#3a3c37] p-6 md:p-8"><span className="font-mono text-[10px] text-[#c8d0b9]">0{index + 1}</span><p className="mt-9 max-w-[27ch] text-lg font-medium leading-6 tracking-[-0.02em] text-white/86">{item}</p></div>)}</div>
        </Container>
      </section>

      <Section id="decisiones"><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Qué necesitas decidir</Eyebrow><Heading size="xl">Cinco preguntas antes de abrir otro tablero.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">El análisis comienza por una acción posible, no por acumular expedientes o gráficos.</p></div><div className="mt-12 divide-y divide-border border-y border-border">{decisions.map(({ icon: Icon, title, question, use }, index) => <article key={title} className="grid gap-6 py-9 md:grid-cols-[64px_0.75fr_1fr] md:gap-10 md:py-11"><div className="flex items-center gap-4 md:block"><span className="font-mono text-[10px] text-[#66734f]">0{index + 1}</span><Icon className="h-5 w-5 text-[#66734f] md:mt-8" aria-hidden /></div><div><h2 className="text-2xl font-medium tracking-[-0.035em] text-ink">{title}</h2><p className="mt-4 text-sm leading-7 text-ink/72">{question}</p></div><div><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Variables</span><p className="mt-3 text-sm leading-7 text-ink/62">{use}</p></div></article>)}</div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container><div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><Building2 className="h-5 w-5 text-[#66734f]" aria-hidden /><Eyebrow className="mt-6">Cadena de lectura</Eyebrow><Heading size="xl">De la necesidad al servicio recibido.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Cada capa responde una pregunta distinta. Un proceso adjudicado todavía no demuestra una prestación oportuna y útil.</p></div><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">{readingLayers.map((item) => <article key={item.number} className="min-h-[190px] bg-canvas p-6 md:p-8"><span className="font-mono text-[10px] text-[#66734f]">{item.number}</span><h2 className="mt-9 text-xl font-medium tracking-[-0.025em] text-ink">{item.title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p></article>)}</div></div></Container></Section>

      <Section><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Dos mercados, una base común</Eyebrow><Heading size="xl">Información útil para comprar y para competir.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">La misma evidencia admite vistas diferentes según la responsabilidad y la decisión del usuario.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border lg:grid-cols-3">{audiences.map((item, index) => <article key={item.title} className="min-h-[250px] bg-canvas p-7 md:p-9"><span className="font-mono text-[10px] text-[#66734f]">0{index + 1} · {item.label}</span><h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{item.title}</h2><p className="mt-4 text-sm leading-7 text-ink/62">{item.text}</p></article>)}</div></Container></Section>

      <Section className="border-y border-border bg-[#e8ebe3]"><Container><div className="grid gap-10 lg:grid-cols-[0.46fr_1fr] lg:gap-20"><div><Eyebrow>Marco y fuentes</Eyebrow><Heading size="xl">Trazabilidad antes que conclusiones automáticas.</Heading></div><div className="max-w-3xl space-y-5 text-base leading-8 text-ink/72"><p>SEACE, el Portal de Contrataciones Abiertas, el RNP, CONOSCE y las herramientas de Perú Compras responden preguntas distintas. La cobertura histórica, actualización y estructura de cada fuente deben verificarse para el periodo analizado.</p><p>NOAM no brinda defensa legal, decide una adjudicación ni atribuye responsabilidad. Una diferencia de precio, una baja concurrencia o una concentración observada es un punto de revisión que necesita contexto, documentos y competencia institucional.</p><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#596644]"><a href="https://www.gob.pe/institucion/oece/informes-publicaciones/6444155-ley-" target="_blank" rel="noreferrer">Ley y Reglamento actualizados</a><a href="https://www.gob.pe/52005" target="_blank" rel="noreferrer">Contrataciones Abiertas</a><a href="https://www.gob.pe/8205-participar-en-procedimientos-de-seleccion-de-entidades-publicas" target="_blank" rel="noreferrer">SEACE para proveedores</a><a href="https://www.gob.pe/institucion/oece/tema/registro-nacional-de-proveedores" target="_blank" rel="noreferrer">RNP</a><a href="https://www.gob.pe/institucion/perucompras/colecciones/689-boletines-peru-compras" target="_blank" rel="noreferrer">Estadísticas Perú Compras</a></div></div></div></Container></Section>

      <Section><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Método y servicios</Eyebrow><Heading size="xl">Examina el enfoque antes de plantear el encargo.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">La profundidad depende de la decisión, la cobertura de los datos y los accesos autorizados.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{evidence.map((item) => <NextLink key={item.href} href={item.href} className="group min-h-[225px] bg-canvas p-6 transition-colors hover:bg-panel md:p-8"><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#66734f]">{item.label}</span><h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{item.title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-ink">Abrir <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span></NextLink>)}</div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Antes de interpretar una compra.</Heading><Accordion items={faq} className="mt-8" /></Container></Section>

      <Section className="pb-0"><Container><div className="relative overflow-hidden rounded-[1.5rem] bg-[#596644] px-7 py-12 text-white md:px-12 md:py-16"><div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" /><div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow className="text-white/55">Primera definición</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Cuéntanos qué compra, mercado o contrato necesita hacerse comprensible.</h2></div><div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/analisis-contrataciones-publicas-proveedores" analyticsEvent="cta_click" analyticsTarget="procurement-hub:scope" variant="secondary" className="rounded-full border-white bg-white text-ink">Diseñar un alcance</Button><Button href="/contact?interest=contrataciones-publicas&from=/analisis-contrataciones-publicas-proveedores" analyticsEvent="cta_click" analyticsTarget="procurement-hub:contact" variant="ghost" className="!text-white/70 hover:!text-white">Plantear el encargo</Button></div></div></div></Container></Section>
    </>
  );
}

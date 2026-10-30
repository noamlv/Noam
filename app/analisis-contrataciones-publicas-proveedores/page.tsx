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
  { icon: ListChecks, title: "Necesidades de compra", question: "¿Qué compras se repiten, cuáles pueden agruparse y cuáles se solicitan tarde?", use: "Revisar qué necesitan las áreas usuarias y en qué fechas para organizar la programación de compras." },
  { icon: Search, title: "Participación y competencia", question: "¿En qué procesos participan pocos proveedores o no se logra una adjudicación?", use: "Comparar convocatorias, ofertas y plazos para identificar condiciones que requieren revisión." },
  { icon: Store, title: "Proveedores y oportunidades", question: "¿Qué empresas participan y qué necesidades podrían atender?", use: "Estudiar experiencia observada, especialización y concentración de proveedores, junto con los requisitos de cada oportunidad." },
  { icon: TriangleAlert, title: "Entregas y ejecución contractual", question: "¿Qué contratos o entregas necesitan atención para evitar afectar el servicio?", use: "Dar seguimiento a plazos, ampliaciones, conformidades y pagos, incluidas penalidades registradas y controversias." },
  { icon: CircleCheck, title: "Mejoras en la compra", question: "¿Qué puede cambiar en la programación, los requerimientos o el seguimiento?", use: "Revisar estudios de mercado y necesidades comunes para orientar la estrategia de compra y el trabajo con proveedores." }
];

const readingLayers = [
  { number: "01", title: "Necesidad", text: "Definir qué se necesita, para quién, en qué cantidad y lugar, y para cuándo debe estar disponible." },
  { number: "02", title: "Requerimiento", text: "Revisar especificaciones, requisitos y plazos, además de posibles barreras y criterios para aceptar la entrega." },
  { number: "03", title: "Procedimiento", text: "Seguir convocatoria, consultas y ofertas hasta el resultado, conservando los documentos y fechas." },
  { number: "04", title: "Mercado proveedor", text: "Estudiar qué proveedores participan, dónde operan, qué precios se observan y con qué frecuencia compran las entidades." },
  { number: "05", title: "Contrato y entregas", text: "Contrastar obligaciones y plazos con modificaciones, entregas, conformidades, pagos e incidencias." },
  { number: "06", title: "Servicio recibido", text: "Comprobar si la compra permitió atender al usuario con la calidad, continuidad y disponibilidad esperadas." }
];

const audiences = [
  { label: "Entidad contratante", title: "Programación y seguimiento de compras", text: "Revisar necesidades, participación y tiempos para seguir contratos e identificar problemas de entrega." },
  { label: "Empresa", title: "Oportunidades para proveedores", text: "Estudiar qué compran las entidades y cuándo, y qué oportunidades corresponden a las capacidades de la empresa." },
  { label: "Dirección y control", title: "Revisión de alertas y expedientes", text: "Priorizar expedientes para revisar posibles causas. Una alerta por sí sola no constituye una acusación." }
];

const evidence = [
  { label: "Guía de trabajo", title: "Guía de análisis", text: "Preguntas para elegir datos, indicadores y medidas de seguridad en el análisis de compras.", href: "/toolkits/tdr-analisis-contrataciones-publicas" },
  { label: "Sistema", title: "Observatorios y dashboards", text: "Cómo organizar registros y alertas con responsables y reuniones de seguimiento.", href: "/observatorios-dashboards-visores" },
  { label: "Mercado", title: "Inteligencia territorial", text: "Cómo estudiar demanda, competencia y localización, explicando los supuestos.", href: "/estudios-mercado-inteligencia-territorial" },
  { label: "Proveedores", title: "Desarrollo económico local", text: "Preguntas sobre proveedores locales, capacidades empresariales y barreras para vender.", href: "/analisis-datos-desarrollo-economico-local" },
  { label: "Cartera", title: "Inversión pública y proyectos", text: "Cómo relacionar contratos, presupuesto y avance de los proyectos.", href: "/analisis-inversion-publica-proyectos" },
  { label: "Muestra", title: "Observatorio de gestión", text: "Ejemplo demostrativo de indicadores y alertas para reuniones de seguimiento.", href: "/muestras/observatorio-gestion-inversiones" }
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
            <div><Eyebrow className="text-[#c8d0b9]">Contrataciones públicas y mercado proveedor</Eyebrow><Heading as="h1" size="display" className="max-w-[15ch] text-white">¿Qué compra el Estado y cómo avanzan los contratos?</Heading></div>
            <div><p className="text-base leading-8 text-white/68">Esta página reúne preguntas y fuentes para estudiar compras públicas, participación de proveedores y cumplimiento de entregas. Sirve para revisar necesidades de una entidad o entender el mercado antes de competir.</p><div className="mt-7 flex flex-wrap gap-3"><Button href="#decisiones" variant="secondary" className="rounded-full border-white bg-white text-ink">Qué podemos analizar</Button><Button href="/toolkits/tdr-analisis-contrataciones-publicas" variant="ghost" className="!text-white/70 hover:!text-white">Leer la guía</Button></div></div>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">{["Entidades de los tres niveles", "Empresas y proveedores", "Datos públicos + gestión contractual"].map((item, index) => <div key={item} className="bg-[#3a3c37] p-6 md:p-8"><span className="font-mono text-[10px] text-[#c8d0b9]">0{index + 1}</span><p className="mt-9 max-w-[27ch] text-lg font-medium leading-6 tracking-[-0.02em] text-white/86">{item}</p></div>)}</div>
        </Container>
      </section>

      <Section id="decisiones"><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Qué podemos analizar</Eyebrow><Heading size="xl">Necesidades de compra, proveedores y contratos</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">El análisis puede ayudar a programar compras, revisar la competencia o seguir entregas. La pregunta define qué expedientes y datos se necesitan.</p></div><div className="mt-12 divide-y divide-border border-y border-border">{decisions.map(({ icon: Icon, title, question, use }, index) => <article key={title} className="grid gap-6 py-9 md:grid-cols-[64px_0.75fr_1fr] md:gap-10 md:py-11"><div className="flex items-center gap-4 md:block"><span className="font-mono text-[10px] text-[#66734f]">0{index + 1}</span><Icon className="h-5 w-5 text-[#66734f] md:mt-8" aria-hidden /></div><div><h2 className="text-2xl font-medium tracking-[-0.035em] text-ink">{title}</h2><p className="mt-4 text-sm leading-7 text-ink/72">{question}</p></div><div><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Qué se puede revisar</span><p className="mt-3 text-sm leading-7 text-ink/62">{use}</p></div></article>)}</div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container><div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><Building2 className="h-5 w-5 text-[#66734f]" aria-hidden /><Eyebrow className="mt-6">Qué información revisar</Eyebrow><Heading size="xl">Etapas de la compra y del servicio recibido</Heading><p className="mt-5 text-sm leading-7 text-ink/65">La adjudicación es una etapa de la compra. Para saber si el servicio llegó a tiempo y fue útil hay que revisar las entregas y su uso.</p></div><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">{readingLayers.map((item) => <article key={item.number} className="min-h-[190px] bg-canvas p-6 md:p-8"><span className="font-mono text-[10px] text-[#66734f]">{item.number}</span><h2 className="mt-9 text-xl font-medium tracking-[-0.025em] text-ink">{item.title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p></article>)}</div></div></Container></Section>

      <Section><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Quién puede usar el análisis</Eyebrow><Heading size="xl">Usos para entidades, proveedores y equipos de control</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Una entidad compradora, un proveedor y un equipo de control necesitan consultas distintas sobre los mismos registros.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border lg:grid-cols-3">{audiences.map((item, index) => <article key={item.title} className="min-h-[250px] bg-canvas p-7 md:p-9"><span className="font-mono text-[10px] text-[#66734f]">0{index + 1} · {item.label}</span><h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{item.title}</h2><p className="mt-4 text-sm leading-7 text-ink/62">{item.text}</p></article>)}</div></Container></Section>

      <Section className="border-y border-border bg-[#e8ebe3]"><Container><div className="grid gap-10 lg:grid-cols-[0.46fr_1fr] lg:gap-20"><div><Eyebrow>Marco y fuentes</Eyebrow><Heading size="xl">Fuentes de contratación y límites del análisis</Heading></div><div className="max-w-3xl space-y-5 text-base leading-8 text-ink/72"><p>SEACE, el Portal de Contrataciones Abiertas, el RNP, CONOSCE y las herramientas de Perú Compras responden preguntas distintas. La cobertura histórica, actualización y estructura de cada fuente deben verificarse para el periodo analizado.</p><p>NOAM no brinda defensa legal, decide una adjudicación ni atribuye responsabilidad. Una diferencia de precio, una baja concurrencia o una concentración observada es un punto de revisión que necesita contexto, documentos y competencia institucional.</p><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#596644]"><a href="https://www.gob.pe/institucion/oece/informes-publicaciones/6444155-ley-" target="_blank" rel="noreferrer">Ley y Reglamento actualizados</a><a href="https://www.gob.pe/52005" target="_blank" rel="noreferrer">Contrataciones Abiertas</a><a href="https://www.gob.pe/8205-participar-en-procedimientos-de-seleccion-de-entidades-publicas" target="_blank" rel="noreferrer">SEACE para proveedores</a><a href="https://www.gob.pe/institucion/oece/tema/registro-nacional-de-proveedores" target="_blank" rel="noreferrer">RNP</a><a href="https://www.gob.pe/institucion/perucompras/colecciones/689-boletines-peru-compras" target="_blank" rel="noreferrer">Estadísticas Perú Compras</a></div></div></div></Container></Section>

      <Section><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Método y servicios</Eyebrow><Heading size="xl">Guía y ejemplos de análisis de compras públicas</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Revisa la guía y los ejemplos para precisar qué se puede estudiar con los datos y accesos autorizados.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{evidence.map((item) => <NextLink key={item.href} href={item.href} className="group min-h-[225px] bg-canvas p-6 transition-colors hover:bg-panel md:p-8"><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#66734f]">{item.label}</span><h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{item.title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-ink">{item.href.startsWith("/toolkits/") ? "Leer la guía" : `Ver ${item.title}`} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span></NextLink>)}</div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Preguntas sobre compras, proveedores y contratos</Heading><Accordion items={faq} className="mt-8" /></Container></Section>

      <Section className="pb-0"><Container><div className="relative overflow-hidden rounded-[1.5rem] bg-[#596644] px-7 py-12 text-white md:px-12 md:py-16"><div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" /><div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow className="text-white/55">Apoyo opcional</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">¿Necesitas apoyo para analizar compras o contratos?</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/75">Puedes describir tu consulta en el formulario para orientar una primera conversación.</p></div><div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/analisis-contrataciones-publicas-proveedores" analyticsEvent="cta_click" analyticsTarget="procurement-hub:scope" variant="secondary" className="rounded-full border-white bg-white text-ink">Describir mi consulta</Button><Button href="/contact?interest=contrataciones-publicas&from=/analisis-contrataciones-publicas-proveedores" analyticsEvent="cta_click" analyticsTarget="procurement-hub:contact" variant="ghost" className="!text-white/70 hover:!text-white">Conversar con NOAM</Button></div></div></div></Container></Section>
    </>
  );
}

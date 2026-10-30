import { ArrowRight, BarChart3, Building2, CircleCheck, MapPinned, TriangleAlert } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/analisis-inversion-publica-proyectos";

export const metadata = buildMetadata({
  title: "Análisis de inversión pública, presupuesto y proyectos",
  description: "Priorización y seguimiento de carteras de inversión con presupuesto, avance físico, hitos, contratos, riesgos y preparación del servicio en el Perú.",
  path
});

const decisions = [
  { icon: MapPinned, title: "Proyectos prioritarios", question: "¿Qué inversiones necesitan primero atención, asistencia y recursos?", use: "Comparar necesidades de servicio, población y preparación de los proyectos, junto con sus costos y viabilidad." },
  { icon: TriangleAlert, title: "Problemas y retrasos", question: "¿Qué puede cambiar el plazo, costo o alcance de un proyecto?", use: "Revisar expedientes, terrenos y permisos, además de problemas de contratación, financiamiento o ejecución." },
  { icon: BarChart3, title: "Gasto y avance de obra", question: "¿El gasto registrado corresponde al avance físico y al cronograma?", use: "Contrastar presupuesto y gasto con valorizaciones, metas físicas y comprobaciones de campo." },
  { icon: Building2, title: "Acuerdos y plazos", question: "¿Qué debe resolverse ahora, quién responde y cómo se comprobará?", use: "Dar seguimiento a hitos, acuerdos y fechas, y avisar a los responsables cuando una decisión siga pendiente." },
  { icon: CircleCheck, title: "Puesta en funcionamiento", question: "¿Qué necesita el servicio para operar y mantenerse al terminar la inversión?", use: "Revisar recepción, equipamiento y personal, junto con presupuesto de operación y mantenimiento." }
];

const evidenceChain = [
  { number: "01", title: "Necesidad de servicio", text: "Precisar qué problema existe, a qué población afecta y qué servicio necesita en su territorio." },
  { number: "02", title: "Proyecto de inversión", text: "Definir objetivo, alcance y costo, e identificar la unidad responsable y la etapa del proyecto." },
  { number: "03", title: "Contratación", text: "Revisar procedimiento, contrato y plazos, incluidas modificaciones y controversias." },
  { number: "04", title: "Avance físico", text: "Contrastar metas, valorizaciones e hitos con evidencia sobre avance y calidad de lo ejecutado." },
  { number: "05", title: "Operación del servicio", text: "Comprobar qué recursos y operador recibirán la inversión y cómo se sostendrá el mantenimiento." },
  { number: "06", title: "Resultados", text: "Medir acceso, calidad y uso del servicio, y los cambios para la población atendida." }
];

const evidence = [
  { label: "Datos abiertos", title: "Cartera municipal DataPerú", text: "Proyectos municipales con presupuesto, territorio, función y fecha de corte de la fuente.", href: "/dataperu/inversiones" },
  { label: "Guía de trabajo", title: "Guía de análisis", text: "Preguntas sobre avances, riesgos, responsabilidades y operación del servicio.", href: "/toolkits/tdr-analisis-inversion-publica" },
  { label: "Muestra", title: "Observatorio de gestión e inversiones", text: "Ejemplo demostrativo de indicadores y alertas para reuniones de seguimiento.", href: "/muestras/observatorio-gestion-inversiones" },
  { label: "Indicadores", title: "Arquitectura de seguimiento", text: "Cómo distinguir gasto, avance de obra y preparación para operar el servicio.", href: "/indicators/indicadores-seguimiento-inversion-publica" },
  { label: "Método", title: "Observatorio regional de inversiones", text: "Cómo ordenar proyectos para dar seguimiento a responsables y acuerdos.", href: "/insights/observatorio-inversiones-gobierno-regional" },
  { label: "Sistema", title: "Dashboards y visores", text: "Cómo organizar fuentes, alertas y reglas de seguridad y actualización.", href: "/observatorios-dashboards-visores" }
];

const faq = [
  { title: "¿Pueden analizar una cartera municipal, regional o sectorial?", content: "Sí. Delimitamos entidad, ciclo, sectores, territorio, fuentes y decisiones. El alcance puede ser una lectura rápida con datos públicos, una cartera priorizada o un sistema institucional con información interna y rutinas de seguimiento." },
  { title: "¿Un porcentaje alto de ejecución significa que la inversión está bien?", content: "No. La ejecución financiera describe gasto reconocido frente al presupuesto, pero no certifica avance físico, calidad, plazo, cierre de restricciones, operación ni beneficio. Esas dimensiones deben medirse por separado y conciliarse." },
  { title: "¿Pueden construir un observatorio o dashboard de inversiones?", content: "Sí. Primero definimos reuniones, decisiones, cartera, indicadores, fuentes, responsables y reglas de alerta. La visualización es una interfaz de gestión; no sustituye la actualización de sistemas oficiales ni la conducción del proyecto." },
  { title: "¿Pueden identificar proyectos paralizados o en riesgo?", content: "Podemos construir señales de alerta y validar una cartera priorizada con documentación y responsables. La clasificación depende de definiciones, fecha de corte y evidencia disponible; no equivale a una determinación de control ni de responsabilidad." },
  { title: "¿El análisis reemplaza Invierte.pe, SIAF, SEACE o InfObras?", content: "No. Esos sistemas conservan sus funciones oficiales. NOAM puede integrar identificadores, conciliar cortes y crear una capa de decisión sobre fuentes autorizadas, manteniendo procedencia, límites y vínculos al registro de origen." },
  { title: "¿También pueden evaluar si una inversión entrega el servicio esperado?", content: "Sí. El análisis puede extenderse a recepción, operación, mantenimiento, acceso, calidad y resultados. Para afirmar efectos o impacto se necesita un diseño evaluativo adicional, no solo seguimiento de obra o presupuesto." }
];

export default function PublicInvestmentAnalysisPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Análisis de inversión pública", path }])} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: "Análisis de inversión pública, presupuesto y proyectos", description: "Priorización y seguimiento de carteras con avance financiero, físico, contractual y operativo.", url: `${siteConfig.url}${path}`, provider: { "@id": `${siteConfig.url}/#organization` }, areaServed: { "@type": "Country", name: "Perú" } }} />

      <section className="overflow-hidden bg-[#243842] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.46fr] lg:items-end lg:gap-20">
            <div><Eyebrow className="text-[#b8d1c2]">Inversión pública y gestión de cartera</Eyebrow><Heading as="h1" size="display" className="max-w-[18ch] text-white">¿Qué proyectos avanzan y cuáles necesitan atención?</Heading></div>
            <div><p className="text-base leading-8 text-white/68">Aquí puedes revisar qué analizar sobre presupuesto, avance de obras y problemas que retrasan una inversión. También encontrarás preguntas para comprobar si el servicio podrá operar cuando termine el proyecto.</p><div className="mt-7 flex flex-wrap gap-3"><Button href="/dataperu/inversiones" variant="secondary" className="rounded-full border-white bg-white text-ink">Ver datos de inversión municipal</Button><Button href="/toolkits/tdr-analisis-inversion-publica" variant="ghost" className="!text-white/70 hover:!text-white">Leer la guía</Button></div></div>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">{["Municipalidades, regiones y sectores", "Cartera, hitos y restricciones", "Fuentes oficiales + gestión interna"].map((item, index) => <div key={item} className="bg-[#304955] p-6 md:p-8"><span className="font-mono text-[10px] text-[#b8d1c2]">0{index + 1}</span><p className="mt-9 max-w-[27ch] text-lg font-medium leading-6 tracking-[-0.02em] text-white/86">{item}</p></div>)}</div>
        </Container>
      </section>

      <Section id="decisiones"><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Qué podemos analizar</Eyebrow><Heading size="xl">Prioridades, avances y problemas de los proyectos</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">El seguimiento debe ayudar a identificar posibles causas de retraso, responsables y acciones que se puedan comprobar.</p></div><div className="mt-12 divide-y divide-border border-y border-border">{decisions.map(({ icon: Icon, title, question, use }, index) => <article key={title} className="grid gap-6 py-9 md:grid-cols-[64px_0.75fr_1fr] md:gap-10 md:py-11"><div className="flex items-center gap-4 md:block"><span className="font-mono text-[10px] text-[#2f5c52]">0{index + 1}</span><Icon className="h-5 w-5 text-[#2f5c52] md:mt-8" aria-hidden /></div><div><h2 className="text-2xl font-medium tracking-[-0.035em] text-ink">{title}</h2><p className="mt-4 text-sm leading-7 text-ink/72">{question}</p></div><div><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Aplicaciones</span><p className="mt-3 text-sm leading-7 text-ink/62">{use}</p></div></article>)}</div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container><div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><BarChart3 className="h-5 w-5 text-[#2f5c52]" aria-hidden /><Eyebrow className="mt-6">Qué información revisar</Eyebrow><Heading size="xl">Etapas de una inversión y datos para seguirlas</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Asignar presupuesto, registrar gasto, terminar una obra y prestar un servicio son etapas diferentes. Cada una requiere información propia.</p></div><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">{evidenceChain.map((item) => <article key={item.number} className="min-h-[190px] bg-canvas p-6 md:p-8"><span className="font-mono text-[10px] text-[#2f5c52]">{item.number}</span><h2 className="mt-9 text-xl font-medium tracking-[-0.025em] text-ink">{item.title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p></article>)}</div></div></Container></Section>

      <Section className="border-b border-border bg-[#e6edf0]"><Container><div className="grid gap-10 lg:grid-cols-[0.46fr_1fr] lg:gap-20"><div><Eyebrow>Marco y fuentes</Eyebrow><Heading size="xl">Fuentes de presupuesto, inversiones y obras</Heading></div><div className="max-w-3xl space-y-5 text-base leading-8 text-ink/72"><p>Consulta Amigable permite revisar presupuesto y fases de ejecución. El Sistema de Seguimiento de Inversiones integra información del ciclo de inversión y vínculos con otros sistemas. InfObras y los registros de contratación aportan otras dimensiones. Los identificadores, periodos y responsabilidades deben conciliarse antes de comparar.</p><p>NOAM no reemplaza los registros oficiales, la supervisión técnica, el control gubernamental ni una auditoría. Una alerta es una señal para revisar evidencia y actuar; no determina por sí sola incumplimiento, responsabilidad ni calidad de obra.</p><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#2f5c52]"><a href="https://www.mef.gob.pe/es/seguimiento-de-la-ejecucion-presupuestal-consulta-amigable" target="_blank" rel="noreferrer">Consulta Amigable</a><a href="https://mef.gob.pe/contenidos/inv_publica/docs/Instructivo_BI/Manual_SSI_inviertepe_2.pdf" target="_blank" rel="noreferrer">Manual del SSI</a><a href="https://datosabiertos.mef.gob.pe/dataset/presupuesto-y-ejecucion-de-gasto" target="_blank" rel="noreferrer">Datos Abiertos MEF</a><a href="https://apps.contraloria.gob.pe/ciudadano/wfm_obras_mostrar_1.aspx?ID=Weifi" target="_blank" rel="noreferrer">InfObras</a></div></div></div></Container></Section>

      <Section><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Evidencia y servicios</Eyebrow><Heading size="xl">Datos de inversión, guía y ejemplos de seguimiento</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Consulta los proyectos municipales y revisa métodos para contrastar presupuesto, documentación y avance en campo.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{evidence.map((item) => <NextLink key={item.href} href={item.href} className="group min-h-[225px] bg-canvas p-6 transition-colors hover:bg-panel md:p-8"><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2f5c52]">{item.label}</span><h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{item.title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-ink">{item.href.startsWith("/toolkits/") ? "Leer la guía" : `Ver ${item.title}`} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span></NextLink>)}</div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Preguntas sobre avances y resultados de inversión</Heading><Accordion items={faq} className="mt-8" /></Container></Section>

      <Section className="pb-0"><Container><div className="relative overflow-hidden rounded-[1.5rem] bg-[#2f5c52] px-7 py-12 text-white md:px-12 md:py-16"><div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" /><div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow className="text-white/55">Apoyo opcional</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">¿Necesitas apoyo para revisar tus proyectos de inversión?</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/75">Puedes describir tu consulta en el formulario para orientar una primera conversación.</p></div><div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/analisis-inversion-publica-proyectos" analyticsEvent="cta_click" analyticsTarget="investment-hub:scope" variant="secondary" className="rounded-full border-white bg-white text-ink">Describir mi consulta</Button><Button href="/contact?interest=inversion-publica-proyectos&from=/analisis-inversion-publica-proyectos" analyticsEvent="cta_click" analyticsTarget="investment-hub:contact" variant="ghost" className="!text-white/70 hover:!text-white">Conversar con NOAM</Button></div></div></div></Container></Section>
    </>
  );
}

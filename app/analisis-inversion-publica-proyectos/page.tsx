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
  { icon: MapPinned, title: "Priorizar la cartera", question: "¿Qué inversiones deben concentrar atención, asistencia y recursos limitados?", use: "Brecha, servicio, población, madurez, territorio, costo, complementariedad, urgencia y viabilidad." },
  { icon: TriangleAlert, title: "Detectar restricciones", question: "¿Qué problema puede cambiar el plazo, costo, alcance o continuidad del proyecto?", use: "Expediente, terreno, permisos, interferencias, contratación, controversias, financiamiento y capacidad ejecutora." },
  { icon: BarChart3, title: "Conciliar avances", question: "¿El gasto registrado corresponde al avance físico, contractual y programado?", use: "PIA, PIM, devengado, valorización, meta física, cronograma, modificación y evidencia de campo." },
  { icon: Building2, title: "Conducir hitos", question: "¿Qué decisión debe tomarse ahora, quién responde y qué prueba confirma el cierre?", use: "Hitos críticos, acuerdos, responsables, fechas, alertas, escalamiento y trazabilidad de decisiones." },
  { icon: CircleCheck, title: "Preparar el servicio", question: "¿La inversión culminada podrá operar, mantenerse y producir el beneficio esperado?", use: "Recepción, equipamiento, personal, presupuesto recurrente, mantenimiento, protocolo operativo y nivel de servicio." }
];

const evidenceChain = [
  { number: "01", title: "Brecha", text: "Problema, población, servicio, territorio, estándar y magnitud verificable." },
  { number: "02", title: "Inversión", text: "Alternativa, objetivo, alcance, costo, unidad responsable y fase del ciclo." },
  { number: "03", title: "Contratación", text: "Procedimiento, contrato, plazo, obligaciones, modificaciones y controversias." },
  { number: "04", title: "Producto físico", text: "Componentes, metas, valorizaciones, calidad, hitos y evidencia de avance." },
  { number: "05", title: "Operación", text: "Recepción, recursos, operador, mantenimiento, continuidad y capacidad instalada." },
  { number: "06", title: "Resultado", text: "Acceso, calidad, uso, población atendida y cambio que debe medirse después." }
];

const evidence = [
  { label: "Datos abiertos", title: "Cartera municipal DataPerú", text: "Proyectos con presupuesto visible, territorio, función y corte de fuente para una primera lectura.", href: "/dataperu/inversiones" },
  { label: "TDR + plantilla", title: "Contratar el análisis", text: "Veinte bloques para cartera, hitos, avance, riesgos, gobernanza, operación y transferencia.", href: "/toolkits/tdr-analisis-inversion-publica" },
  { label: "Muestra", title: "Observatorio de gestión e inversiones", text: "Arquitectura demostrativa de decisiones, indicadores, alertas y rutina ejecutiva.", href: "/muestras/observatorio-gestion-inversiones" },
  { label: "Indicadores", title: "Arquitectura de seguimiento", text: "Marco para separar ritmo financiero, avance físico, hitos, riesgos y preparación operativa.", href: "/indicators/indicadores-seguimiento-inversion-publica" },
  { label: "Método", title: "Observatorio regional de inversiones", text: "Cómo pasar de una cartera extensa a una agenda ejecutiva con responsables y acuerdos.", href: "/insights/observatorio-inversiones-gobierno-regional" },
  { label: "Sistema", title: "Dashboards y visores", text: "Diseño de productos sostenibles con fuentes, alertas, seguridad y reglas de operación.", href: "/observatorios-dashboards-visores" }
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
            <div><Eyebrow className="text-[#b8d1c2]">Inversión pública y gestión de cartera</Eyebrow><Heading as="h1" size="display" className="max-w-[18ch] text-white">La ejecución presupuestal no demuestra avance físico ni un servicio operativo.</Heading></div>
            <div><p className="text-base leading-8 text-white/68">Conectamos presupuesto, avance físico, contratos, hitos, riesgos y operación para que la cartera produzca decisiones, no solo reportes.</p><div className="mt-7 flex flex-wrap gap-3"><Button href="#decisiones" variant="secondary" className="rounded-full border-white bg-white text-ink">Definir la necesidad</Button><Button href="/toolkits/tdr-analisis-inversion-publica" variant="ghost" className="!text-white/70 hover:!text-white">Abrir TDR y plantilla</Button></div></div>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">{["Municipalidades, regiones y sectores", "Cartera, hitos y restricciones", "Fuentes oficiales + gestión interna"].map((item, index) => <div key={item} className="bg-[#304955] p-6 md:p-8"><span className="font-mono text-[10px] text-[#b8d1c2]">0{index + 1}</span><p className="mt-9 max-w-[27ch] text-lg font-medium leading-6 tracking-[-0.02em] text-white/86">{item}</p></div>)}</div>
        </Container>
      </section>

      <Section id="decisiones"><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Qué necesitas decidir</Eyebrow><Heading size="xl">Cinco decisiones que el devengado no resuelve.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Una cartera se conduce cuando cada señal identifica una causa posible, un responsable y una acción verificable.</p></div><div className="mt-12 divide-y divide-border border-y border-border">{decisions.map(({ icon: Icon, title, question, use }, index) => <article key={title} className="grid gap-6 py-9 md:grid-cols-[64px_0.75fr_1fr] md:gap-10 md:py-11"><div className="flex items-center gap-4 md:block"><span className="font-mono text-[10px] text-[#2f5c52]">0{index + 1}</span><Icon className="h-5 w-5 text-[#2f5c52] md:mt-8" aria-hidden /></div><div><h2 className="text-2xl font-medium tracking-[-0.035em] text-ink">{title}</h2><p className="mt-4 text-sm leading-7 text-ink/72">{question}</p></div><div><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Aplicaciones</span><p className="mt-3 text-sm leading-7 text-ink/62">{use}</p></div></article>)}</div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container><div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><BarChart3 className="h-5 w-5 text-[#2f5c52]" aria-hidden /><Eyebrow className="mt-6">Cadena de evidencia</Eyebrow><Heading size="xl">Del problema público al servicio en operación.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Cada eslabón evita confundir una asignación, un gasto, una obra y un resultado.</p></div><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">{evidenceChain.map((item) => <article key={item.number} className="min-h-[190px] bg-canvas p-6 md:p-8"><span className="font-mono text-[10px] text-[#2f5c52]">{item.number}</span><h2 className="mt-9 text-xl font-medium tracking-[-0.025em] text-ink">{item.title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p></article>)}</div></div></Container></Section>

      <Section className="border-b border-border bg-[#e6edf0]"><Container><div className="grid gap-10 lg:grid-cols-[0.46fr_1fr] lg:gap-20"><div><Eyebrow>Marco y fuentes</Eyebrow><Heading size="xl">Los sistemas públicos responden preguntas distintas y usan cortes distintos.</Heading></div><div className="max-w-3xl space-y-5 text-base leading-8 text-ink/72"><p>Consulta Amigable permite revisar presupuesto y fases de ejecución. El Sistema de Seguimiento de Inversiones integra información del ciclo de inversión y vínculos con otros sistemas. InfObras y los registros de contratación aportan otras dimensiones. Los identificadores, periodos y responsabilidades deben conciliarse antes de comparar.</p><p>NOAM no reemplaza los registros oficiales, la supervisión técnica, el control gubernamental ni una auditoría. Una alerta es una señal para revisar evidencia y actuar; no determina por sí sola incumplimiento, responsabilidad ni calidad de obra.</p><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#2f5c52]"><a href="https://www.mef.gob.pe/es/seguimiento-de-la-ejecucion-presupuestal-consulta-amigable" target="_blank" rel="noreferrer">Consulta Amigable</a><a href="https://mef.gob.pe/contenidos/inv_publica/docs/Instructivo_BI/Manual_SSI_inviertepe_2.pdf" target="_blank" rel="noreferrer">Manual del SSI</a><a href="https://datosabiertos.mef.gob.pe/dataset/presupuesto-y-ejecucion-de-gasto" target="_blank" rel="noreferrer">Datos Abiertos MEF</a><a href="https://apps.contraloria.gob.pe/ciudadano/wfm_obras_mostrar_1.aspx?ID=Weifi" target="_blank" rel="noreferrer">InfObras</a></div></div></div></Container></Section>

      <Section><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Evidencia y servicios</Eyebrow><Heading size="xl">Explora la cartera y el método antes de conversar.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Combina información pública, documentación institucional y verificación operativa según la decisión.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{evidence.map((item) => <NextLink key={item.href} href={item.href} className="group min-h-[225px] bg-canvas p-6 transition-colors hover:bg-panel md:p-8"><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2f5c52]">{item.label}</span><h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{item.title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-ink">Abrir <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span></NextLink>)}</div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Antes de interpretar una cartera.</Heading><Accordion items={faq} className="mt-8" /></Container></Section>

      <Section className="pb-0"><Container><div className="relative overflow-hidden rounded-[1.5rem] bg-[#2f5c52] px-7 py-12 text-white md:px-12 md:py-16"><div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" /><div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow className="text-white/55">Primera definición</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Cuéntanos qué cartera, decisión o restricción necesita hacerse visible.</h2></div><div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/analisis-inversion-publica-proyectos" analyticsEvent="cta_click" analyticsTarget="investment-hub:scope" variant="secondary" className="rounded-full border-white bg-white text-ink">Diseñar un alcance</Button><Button href="/contact?interest=inversion-publica-proyectos&from=/analisis-inversion-publica-proyectos" analyticsEvent="cta_click" analyticsTarget="investment-hub:contact" variant="ghost" className="!text-white/70 hover:!text-white">Plantear el encargo</Button></div></div></div></Container></Section>
    </>
  );
}

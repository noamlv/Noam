import { Activity, ArrowRight, Building2, MapPinned, RadioTower, Route, ShieldAlert } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/analisis-datos-gestion-riesgo-desastres";

export const metadata = buildMetadata({
  title: "Análisis de datos para la gestión del riesgo de desastres",
  description: "Diagnósticos, escenarios, mapas, COEL y sistemas de seguimiento para prevenir, prepararse y responder ante riesgos de desastres en gobiernos regionales y locales.",
  path
});

const decisions = [
  { icon: MapPinned, title: "Comprender el riesgo", question: "¿Qué peligro, elementos expuestos y vulnerabilidades producen el escenario?", use: "Evaluación de riesgo, diagnóstico territorial, escenarios y actualización de evidencia." },
  { icon: Building2, title: "Prevenir y reducir", question: "¿Qué medida evita nuevo riesgo o reduce el existente con mayor prioridad?", use: "PPRRD, cartera de inversiones, mantenimiento, regulación y medidas no estructurales." },
  { icon: Route, title: "Preparar continuidad", question: "¿Qué servicio crítico debe sostenerse, con qué recursos y ruta alternativa?", use: "Planes de contingencia y continuidad, almacenes, rutas, protocolos y simulacros." },
  { icon: RadioTower, title: "Conducir la respuesta", question: "¿Qué señal activa qué decisión y cómo se comparte una situación común?", use: "COEL, sala de situación, alertas, daños, necesidades, recursos y responsables." },
  { icon: Activity, title: "Aprender y reconstruir", question: "¿Qué funcionó, qué falló y cómo evitar reconstruir el mismo riesgo?", use: "Evaluación posterior, rehabilitación, reconstrucción y seguimiento de compromisos." }
];

const evidenceChain = [
  { number: "01", title: "Peligro", text: "Fenómeno, intensidad, frecuencia, extensión, escenario y vigencia." },
  { number: "02", title: "Exposición", text: "Personas, viviendas, medios de vida, infraestructura y servicios críticos." },
  { number: "03", title: "Vulnerabilidad", text: "Fragilidad, resiliencia, acceso, desigualdad y capacidad institucional." },
  { number: "04", title: "Capacidad", text: "Personal, recursos, protocolos, comunicaciones, logística y continuidad." },
  { number: "05", title: "Prioridad", text: "Riesgo, urgencia, viabilidad, costo, competencia y población protegida." },
  { number: "06", title: "Decisión", text: "Umbral, responsable, respuesta, evidencia de cierre y aprendizaje." }
];

const evidence = [
  { label: "Datos municipales", title: "Riesgos en DataPerú", text: "Oficina responsable, COEL, zonas, almacenes y simulacros declarados en RENAMU 2025.", href: "/dataperu/temas/gestion-del-riesgo" },
  { label: "TDR + plantilla", title: "Contratar el análisis", text: "Escenarios, población expuesta, capacidades, productos y aceptación verificable.", href: "/toolkits/tdr-analisis-gestion-riesgo-desastres" },
  { label: "Capacidad", title: "Diagnóstico territorial", text: "Territorio, población, servicios, capacidades y prioridades.", href: "/diagnostico-territorial" },
  { label: "Capacidad", title: "Observatorios y visores", text: "Capas, indicadores, alertas y rutina de seguimiento.", href: "/observatorios-dashboards-visores" },
  { label: "Producto", title: "Visor georreferenciado", text: "Prototipo para explorar capas, brechas y prioridades territoriales.", href: "/products/visor-riesgo-georreferenciado" },
  { label: "Solución", title: "Agenda territorial", text: "Diagnóstico integrado y cartera priorizada para actuar por etapas.", href: "/solutions/diagnostico-agenda-territorial" }
];

const faq = [
  { title: "¿Pueden preparar un diagnóstico para una municipalidad pequeña?", content: "Sí. Se parte de las decisiones y recursos reales de la entidad, se reutiliza evidencia oficial y se priorizan vacíos críticos. El producto puede ser una agenda acotada antes de desarrollar estudios especializados." },
  { title: "¿Un mapa de peligros es una evaluación de riesgo?", content: "No. El riesgo requiere relacionar peligro, exposición y vulnerabilidad en una escala y periodo pertinentes. Un mapa existente puede ser un insumo, pero su resolución, vigencia y propósito deben verificarse." },
  { title: "¿Pueden elaborar o actualizar un PPRRD?", content: "Podemos apoyar el diagnóstico, la base geoespacial, la priorización, los indicadores y la cartera, siguiendo la metodología aplicable. La entidad debe conducir, validar y aprobar el instrumento mediante sus órganos competentes." },
  { title: "¿Pueden implementar un tablero para el COEL?", content: "Sí. Debe comenzar por los protocolos, fuentes, umbrales, responsables y decisiones del COEL. Una pantalla sin actualización, comunicaciones y turnos de operación no constituye capacidad de respuesta." },
  { title: "¿Trabajan con datos de población vulnerable?", content: "Sí, aplicando minimización, perfiles de acceso y agregación. La información pública no debe permitir identificar personas, hogares o instalaciones cuya exposición aumente por la publicación." },
  { title: "¿Pueden evaluar simulacros o la respuesta posterior?", content: "Sí. Se definen criterios observables sobre tiempos, coordinación, comunicaciones, cobertura, decisiones y cierre de hallazgos. El número de participantes por sí solo no demuestra preparación." }
];

export default function DisasterRiskDataPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Análisis de datos para gestión del riesgo", path }])} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: "Análisis de datos para la gestión del riesgo de desastres", description: "Diagnósticos, escenarios, mapas, COEL y sistemas de seguimiento para gobiernos regionales y locales.", url: `${siteConfig.url}${path}`, provider: { "@type": "Organization", name: "NOAM", url: siteConfig.url }, areaServed: { "@type": "Country", name: "Perú" } }} />

      <section className="overflow-hidden bg-[#1c2528] pb-16 pt-14 text-white md:pb-24 md:pt-20"><Container><div className="grid gap-12 lg:grid-cols-[1fr_0.46fr] lg:items-end lg:gap-20"><div><Eyebrow className="text-[#b6cad0]">Riesgo, territorio y continuidad</Eyebrow><Heading as="h1" size="display" className="max-w-[15ch] text-white">Un mapa de peligros no decide qué proteger primero.</Heading></div><div><p className="text-base leading-8 text-white/68">Conectamos escenarios, población expuesta, vulnerabilidad, servicios críticos y capacidad institucional para prevenir, prepararse y responder con prioridades verificables.</p><div className="mt-7 flex flex-wrap gap-3"><Button href="#decisiones" variant="secondary" className="rounded-full border-white bg-white text-ink">Definir la necesidad</Button><Button href="/toolkits/tdr-analisis-gestion-riesgo-desastres" variant="ghost" className="!text-white/70 hover:!text-white">Abrir TDR y plantilla</Button></div></div></div><div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">{["Gobiernos regionales y locales", "Prevención, preparación y respuesta", "Fuentes oficiales, registros y campo"].map((item, index) => <div key={item} className="bg-[#263034] p-6 md:p-8"><span className="font-mono text-[10px] text-[#b6cad0]">0{index + 1}</span><p className="mt-9 max-w-[26ch] text-lg font-medium leading-6 tracking-[-0.02em] text-white/86">{item}</p></div>)}</div></Container></section>

      <Section id="decisiones"><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Qué necesitas decidir</Eyebrow><Heading size="xl">Cinco momentos que exigen evidencia diferente.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Estimar el riesgo no sustituye preparar la respuesta; responder no corrige automáticamente la vulnerabilidad; reconstruir exige aprender.</p></div><div className="mt-12 divide-y divide-border border-y border-border">{decisions.map(({ icon: Icon, title, question, use }, index) => <article key={title} className="grid gap-6 py-9 md:grid-cols-[64px_0.75fr_1fr] md:gap-10 md:py-11"><div className="flex items-center gap-4 md:block"><span className="font-mono text-[10px] text-[#496b76]">0{index + 1}</span><Icon className="h-5 w-5 text-[#496b76] md:mt-8" aria-hidden /></div><div><h2 className="text-2xl font-medium tracking-[-0.035em] text-ink">{title}</h2><p className="mt-4 text-sm leading-7 text-ink/72">{question}</p></div><div><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Aplicaciones</span><p className="mt-3 text-sm leading-7 text-ink/62">{use}</p></div></article>)}</div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container><div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><ShieldAlert className="h-5 w-5 text-[#496b76]" aria-hidden /><Eyebrow className="mt-6">Cadena de evidencia</Eyebrow><Heading size="xl">Del escenario a una decisión protegida.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">La prioridad debe ser trazable hasta la población, los activos y la capacidad que busca proteger.</p></div><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">{evidenceChain.map((item) => <article key={item.number} className="min-h-[190px] bg-canvas p-6 md:p-8"><span className="font-mono text-[10px] text-[#496b76]">{item.number}</span><h2 className="mt-9 text-xl font-medium tracking-[-0.025em] text-ink">{item.title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p></article>)}</div></div></Container></Section>

      <Section className="border-b border-border bg-[#e4ebed]"><Container><div className="grid gap-10 lg:grid-cols-[0.46fr_1fr] lg:gap-20"><div><Eyebrow>Marco y fuentes</Eyebrow><Heading size="xl">La fuente oficial orienta; la escala local decide su uso.</Heading></div><div className="max-w-3xl space-y-5 text-base leading-8 text-ink/72"><p>La Ley del SINAGERD, la Política Nacional al 2050 y el PLANAGERD 2022–2030 articulan estimación, prevención, reducción, preparación, respuesta, rehabilitación y reconstrucción. SIGRID reúne información geoespacial y escenarios elaborados por entidades técnico-científicas y públicas.</p><p>DataPerú añade capacidades municipales declaradas en RENAMU 2025. Una oficina, un COEL o un almacén reportados no demuestran operatividad, cobertura, actualización ni capacidad efectiva.</p><div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#496b76]"><a href="https://www.gob.pe/institucion/minam/normas-legales/3600-29664" target="_blank" rel="noreferrer">Ley del SINAGERD</a><a href="https://www.gob.pe/institucion/pcm/informes-publicaciones/6322922-plan-nacional-de-gestion-del-riesgo-de-desastres-planagerd-2022-2030" target="_blank" rel="noreferrer">PLANAGERD</a><a href="https://sigrid.cenepred.gob.pe/sigridv3/" target="_blank" rel="noreferrer">SIGRID</a><NextLink href="/dataperu/temas/gestion-del-riesgo">Capacidades en DataPerú</NextLink></div></div></div></Container></Section>

      <Section><Container><div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end"><div><Eyebrow>Evidencia y servicios</Eyebrow><Heading size="xl">Explora antes de plantear el encargo.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Revisa capacidades municipales, método y productos combinables según el proceso de riesgo.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{evidence.map((item) => <NextLink key={item.href} href={item.href} className="group min-h-[225px] bg-canvas p-6 transition-colors hover:bg-panel md:p-8"><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#496b76]">{item.label}</span><h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{item.title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{item.text}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-ink">Abrir <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span></NextLink>)}</div></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Antes de producir otro mapa.</Heading><Accordion items={faq} className="mt-8" /></Container></Section>

      <Section className="pb-0"><Container><div className="relative overflow-hidden rounded-[1.5rem] bg-[#496b76] px-7 py-12 text-white md:px-12 md:py-16"><div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" /><div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow className="text-white/55">Primera definición</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Cuéntanos qué población o servicio debe protegerse y qué decisión está pendiente.</h2></div><div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/analisis-datos-gestion-riesgo-desastres" analyticsEvent="cta_click" analyticsTarget="risk-hub:scope" variant="secondary" className="rounded-full border-white bg-white text-ink">Diseñar un alcance</Button><Button href="/contact?interest=gestion-riesgo-desastres&from=/analisis-datos-gestion-riesgo-desastres" analyticsEvent="cta_click" analyticsTarget="risk-hub:contact" variant="ghost" className="!text-white/70 hover:!text-white">Plantear el encargo</Button></div></div></div></Container></Section>
    </>
  );
}

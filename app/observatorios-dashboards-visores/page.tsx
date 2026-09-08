import { Activity, ArrowRight, BellRing, Gauge, MapPinned, ShieldCheck, TableProperties } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const path = "/observatorios-dashboards-visores";

export const metadata = buildMetadata({
  title: "Observatorios, dashboards y visores para gobiernos y empresas",
  description: "Guía para diseñar y contratar tableros, observatorios, visores geográficos y sistemas de seguimiento que conecten indicadores, alertas, responsables y decisiones.",
  path
});

const productTypes = [
  { icon: Gauge, title: "Dashboard ejecutivo", question: "¿Qué cambió, qué se desvía y qué necesita atención ahora?", use: "Dirección, comités, cartera de proyectos, presupuesto y resultados clave." },
  { icon: Activity, title: "Observatorio", question: "¿Cómo evoluciona un problema y qué evidencia debe sostenerse en el tiempo?", use: "Políticas, servicios, mercados, territorio y rendición de cuentas." },
  { icon: MapPinned, title: "Visor geográfico", question: "¿Dónde coinciden brechas, población, infraestructura, riesgos u oportunidades?", use: "Focalización, inversión, cobertura, operaciones y análisis territorial." },
  { icon: BellRing, title: "Sistema de seguimiento", question: "¿Qué señal activa una acción, quién responde y cómo se verifica el cierre?", use: "Compromisos, hitos, alertas, incidencias y reuniones de gestión." },
  { icon: TableProperties, title: "Portal de datos", question: "¿Qué información puede abrirse con definiciones, descarga y trazabilidad?", use: "Transparencia, investigación, ciudadanía, proveedores y ecosistemas de datos." }
];

const architecture = [
  { number: "01", title: "Decisiones y usuarios", text: "Preguntas, reuniones, acciones y permisos que justifican el producto." },
  { number: "02", title: "Indicadores", text: "Definición, unidad, fórmula, meta, desagregación y responsable." },
  { number: "03", title: "Fuentes y linaje", text: "Origen, fecha de corte, transformación, calidad y trazabilidad del dato." },
  { number: "04", title: "Producto y experiencia", text: "Vistas, filtros, mapas y exportaciones probados con usuarios reales." },
  { number: "05", title: "Alertas y flujo", text: "Umbrales, notificaciones, responsables, plazos y evidencia de cierre." },
  { number: "06", title: "Operación y seguridad", text: "Actualización, accesos, respaldo, soporte, documentación y continuidad." }
];

const useCases = [
  { label: "Inversión y proyectos", title: "Detectar hitos, retrasos y cuellos de botella", text: "Integra cartera, ejecución física y financiera, contratos, riesgos y responsables sin confundir gasto con avance real." },
  { label: "Servicios públicos", title: "Seguir cobertura, calidad y experiencia", text: "Relaciona demanda, atención, incidencias, tiempos y percepción para identificar dónde intervenir primero." },
  { label: "Programas y políticas", title: "Conectar productos con resultados", text: "Ordena indicadores, metas y brechas de implementación para distinguir entrega, cobertura y cambio observado." },
  { label: "Territorio y riesgos", title: "Ver patrones que una tabla oculta", text: "Cruza población, accesibilidad, amenazas, equipamiento y proyectos con escalas geográficas comparables." },
  { label: "Empresas y mercados", title: "Monitorear operación y oportunidad territorial", text: "Combina desempeño interno, demanda, competencia, entorno y señales tempranas para decidir expansión o respuesta." }
];

const readiness = [
  "Existe una decisión o reunión que usará el producto.",
  "Cada indicador tiene definición y responsable.",
  "Las fuentes pueden obtenerse y actualizarse legalmente.",
  "Los faltantes y errores serán visibles, no reemplazados por cero.",
  "Los accesos públicos, internos y restringidos están separados.",
  "Hay presupuesto y capacidad para operar después de la entrega."
];

const evidence = [
  { label: "Demostración", title: "Observatorio de inversiones", text: "Cartera municipal, avance, proyectos y señales de atención.", href: "/dataperu/inversiones" },
  { label: "Visor", title: "Mapa territorial DataPerú", text: "Información municipal explorada desde su ubicación y contexto.", href: "/dataperu/mapa" },
  { label: "Caso de producto", title: "DataPerú", text: "Infraestructura pública para 1,891 perfiles municipales.", href: "/cases/dataperu-platform-case" },
  { label: "Insight", title: "No es solo un dashboard", text: "Cinco condiciones para que los indicadores cambien decisiones.", href: "/insights/sistema-seguimiento-municipal-no-es-dashboard" },
  { label: "TDR + plantilla", title: "Contratar un sistema", text: "Indicadores, datos, seguridad, pruebas, transferencia y operación.", href: "/toolkits/tdr-observatorio-dashboard-visor" },
  { label: "Muestra", title: "Observatorio de gestión", text: "Arquitectura de un entregable antes de contratarlo.", href: "/muestras/observatorio-gestion-inversiones" }
];

const faq = [
  { title: "¿Cuál es la diferencia entre un dashboard y un observatorio?", content: "Un dashboard presenta métricas para una lectura definida. Un observatorio sostiene además fuentes, metodología, análisis, responsables y una agenda de seguimiento. La elección depende de la decisión y continuidad requeridas." },
  { title: "¿Se puede comenzar si los datos están en Excel o en áreas distintas?", content: "Sí. El primer módulo puede inventariar fuentes, normalizar definiciones y probar una actualización controlada. No conviene automatizar antes de identificar responsables, calidad y permisos." },
  { title: "¿Todos los indicadores deben actualizarse en tiempo real?", content: "No. La frecuencia debe corresponder al ritmo de la decisión y de la fuente. Un dato mensual confiable puede ser más útil que una cifra diaria incompleta o sin acción asociada." },
  { title: "¿Qué necesita un visor geográfico?", content: "Datos con ubicación o códigos territoriales consistentes, una escala apropiada, límites de interpretación y controles para no exponer información sensible. Un mapa no corrige una fuente sin cobertura o precisión." },
  { title: "¿Quién mantiene el sistema después de la entrega?", content: "Debe definirse desde el alcance. Podemos transferir código, documentación y rutinas al equipo, acompañar la operación o prestar un servicio de mantenimiento con responsabilidades y costos explícitos." },
  { title: "¿Puede tener información pública y módulos privados?", content: "Sí. La arquitectura puede separar un portal abierto de vistas internas por rol. Los permisos, registros de actividad, respaldo y tratamiento de datos personales deben probarse antes de producción." }
];

export default function ObservatoriesDashboardsViewersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Observatorios, dashboards y visores", path }])} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Observatorios, dashboards y visores para gobiernos y empresas",
        description: "Rutas para elegir y diseñar productos de seguimiento, decisión y datos territoriales.",
        url: `${siteConfig.url}${path}`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: productTypes.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title }))
        }
      }} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.46fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="text-[#9ec6ba]">Seguimiento y decisión</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[15ch] text-white">Un dashboard muestra datos. Un sistema de decisión hace que alguien actúe.</Heading>
            </div>
            <div>
              <p className="text-base leading-8 text-white/68">Diseñamos observatorios, tableros y visores para gobiernos y empresas desde las preguntas, los responsables y la operación que deben sostener.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#productos" variant="secondary" className="rounded-full border-white bg-white text-ink">Elegir un producto</Button>
                <Button href="/toolkits/tdr-observatorio-dashboard-visor" variant="ghost" className="!text-white/70 hover:!text-white">Abrir TDR y plantilla</Button>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">
            {["Gobiernos nacionales, regionales y locales", "Empresas, programas y operaciones", "Datos públicos, internos o integrados"].map((item, index) => (
              <div key={item} className="bg-[#192823] p-6 md:p-8">
                <span className="font-mono text-[10px] text-[#9ec6ba]">0{index + 1}</span>
                <p className="mt-9 max-w-[24ch] text-lg font-medium leading-6 tracking-[-0.02em] text-white/86">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section id="productos">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Qué necesitas operar</Eyebrow><Heading size="xl">Cinco productos que no son intercambiables.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Pueden compartir datos y tecnología, pero cambian el usuario, la frecuencia, la interacción y la responsabilidad institucional. El alcance debe comenzar por la decisión.</p>
          </div>

          <div className="mt-12 divide-y divide-border border-y border-border">
            {productTypes.map(({ icon: Icon, title, question, use }, index) => (
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
            <div><Eyebrow>Arquitectura completa</Eyebrow><Heading size="xl">La interfaz es una de seis capas.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Si una capa falla, el sistema puede verse terminado y aun así producir cifras discutibles, alertas sin respuesta o dependencia del proveedor.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {architecture.map((item) => (
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

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Aplicaciones</Eyebrow><Heading size="xl">Comenzar por el cuello de botella.</Heading></div>
            <div className="divide-y divide-border border-y border-border">
              {useCases.map((item, index) => (
                <article key={item.label} className="grid gap-4 py-7 sm:grid-cols-[36px_0.55fr_1fr] sm:gap-7">
                  <span className="font-mono text-[10px] text-[#2f5c52]">0{index + 1}</span>
                  <div><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">{item.label}</span><h2 className="mt-2 text-lg font-medium tracking-[-0.025em] text-ink">{item.title}</h2></div>
                  <p className="text-sm leading-7 text-ink/62">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#dbe5e0]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.46fr_1fr] lg:gap-20">
            <div><Eyebrow>Marco público</Eyebrow><Heading size="xl">Seguimiento, datos y operación deben diseñarse juntos.</Heading></div>
            <div className="max-w-3xl text-base leading-8 text-ink/72">
              <p>CEPLAN vincula el seguimiento con indicadores, logros esperados y evidencia para la mejora. La Estrategia Nacional de Gobierno de Datos 2026–2030 exige que las entidades articulen calidad, privacidad, interoperabilidad, infraestructura y capacidades. Un producto sostenible debe responder a ambos planos: uso institucional y gobierno del dato.</p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#2f5c52]">
                <a href="https://www.gob.pe/institucion/ceplan/informes-publicaciones/5678657-guia-para-el-seguimiento-y-evaluacion-de-politicas-nacionales-y-planes-del-sinaplan-actualizada-2024" target="_blank" rel="noreferrer">Seguimiento y evaluación de CEPLAN</a>
                <a href="https://www.gob.pe/institucion/ceplan/informes-publicaciones/5614517-guia-para-la-elaboracion-de-indicadores-de-politicas-nacionales-y-planes-estrategicos-actualizada-2024" target="_blank" rel="noreferrer">Indicadores de CEPLAN</a>
                <a href="https://www.gob.pe/99097-estrategia-para-mejorar-el-uso-de-datos-en-el-gobierno" target="_blank" rel="noreferrer">Estrategia de Gobierno de Datos</a>
                <a href="https://www.gob.pe/112167-plan-de-accion-de-gobierno-de-datos" target="_blank" rel="noreferrer">Plan de Acción de Gobierno de Datos</a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Preparación mínima</Eyebrow><Heading size="xl">Seis preguntas antes de construir.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">No es necesario tener datos perfectos. Sí es necesario saber qué debe validarse, quién participa y cómo se sostendrá la primera versión.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {readiness.map((item, index) => (
                <div key={item} className="flex min-h-[126px] gap-5 bg-canvas p-6 md:p-8">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#2f5c52]" aria-hidden />
                  <div><span className="font-mono text-[10px] text-muted">0{index + 1}</span><p className="mt-3 text-sm leading-7 text-ink/72">{item}</p></div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.55fr_1fr] md:items-end">
            <div><Eyebrow>Evidencia abierta</Eyebrow><Heading size="xl">Examina datos, método y entregables.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">DataPerú muestra la capacidad técnica. El insight, la muestra y el TDR hacen visible cómo se convierte un producto digital en una rutina de decisión.</p>
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

      <Section>
        <Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Antes de elegir la tecnología.</Heading><Accordion items={faq} className="mt-8" /></Container>
      </Section>

      <Section className="pb-0 pt-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-[#2f5c52] px-7 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><Eyebrow className="text-white/55">Primera definición</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Cuéntanos qué señal necesitas ver y qué decisión debe ocurrir después.</h2></div>
              <div className="flex flex-wrap gap-3"><Button href="/diagnostico?from=/observatorios-dashboards-visores" analyticsEvent="cta_click" analyticsTarget="observatories-hub:scope" variant="secondary" className="rounded-full border-white bg-white text-ink">Diseñar un alcance</Button><Button href="/contact?interest=observatorio-gestion-inversiones&from=/observatorios-dashboards-visores" analyticsEvent="cta_click" analyticsTarget="observatories-hub:contact" variant="ghost" className="!text-white/70 hover:!text-white">Plantear el sistema</Button></div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

import { ArrowRight, Check, Database, Droplets, FileChartColumn, GraduationCap, Layers3, MapPinned, Radar, Search, ShieldAlert } from "lucide-react";
import NextLink from "next/link";
import { DataVisual } from "@/components/brand/data-visual";
import { TerritoryMap } from "@/components/brand/territory-map";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { dataperuSummary, formatCurrency, formatMetric, formatPercent, projectSummary, renamuSummary } from "@/lib/dataperu";
import { educationSummary } from "@/lib/dataperu-education";
import { waterSanitationSummary } from "@/lib/dataperu-water-sanitation";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "DataPerú",
  description: "Consulta datos de municipios, inversión pública, agua, saneamiento y educación en el Perú. Cada publicación indica sus fuentes, periodo y límites.",
  path: "/dataperu"
});

const decisionPaths = [
  {
    icon: MapPinned,
    title: "Explorar una agenda territorial",
    description: "Consulta problemas públicos, poblaciones afectadas y oportunidades por validar en los 25 departamentos.",
    href: "/dataperu/agendas-territoriales",
    action: "Ver agendas territoriales"
  },
  {
    icon: Search,
    title: "Conocer un municipio",
    description: "Revisa población, presupuesto, inversión, proyectos y capacidades declaradas en una sola ficha.",
    href: "/dataperu/municipios",
    action: "Buscar un municipio"
  },
  {
    icon: FileChartColumn,
    title: "Seguir inversión pública",
    description: "Consulta los proyectos disponibles por sector y territorio, sus montos y su avance financiero.",
    href: "/dataperu/inversiones",
    action: "Ver inversiones municipales"
  }
];

const modules = [
  { icon: FileChartColumn, title: "Análisis por tema", description: "Consulta análisis y gráficos de residuos, planes territoriales, discapacidad, deporte y archivo electoral, con sus fuentes.", href: "/analisis", status: "Disponible" },
  { icon: Droplets, title: "Agua y saneamiento", description: `Cobertura por red pública en ${formatMetric(waterSanitationSummary.districts)} distritos según los Censos Nacionales 2025.`, href: "/dataperu/agua-saneamiento", status: "Disponible" },
  { icon: GraduationCap, title: "Educación", description: `Matrícula en educación básica regular (EBR) por nivel, ámbito y tipo de gestión en ${formatMetric(educationSummary.districts)} distritos según el Minedu.`, href: "/dataperu/educacion", status: "Disponible" },
  { icon: Search, title: "Agendas territoriales", description: "100 problemas y 75 oportunidades en validación para los 25 departamentos.", href: "/dataperu/agendas-territoriales", status: "Disponible" },
  { icon: MapPinned, title: "Mapa de gestión e inversión", description: "Compara cinco indicadores en un mapa con límites departamentales referenciales.", href: "/dataperu/mapa", status: "Disponible" },
  { icon: MapPinned, title: "Atlas departamental", description: "Presupuesto, inversión y capacidades municipales agregadas en 25 departamentos.", href: "/dataperu/departamentos", status: "Disponible" },
  { icon: Layers3, title: "Observatorio de inversiones", description: "9,429 proyectos municipales visibles por función, territorio y ejecución financiera.", href: "/dataperu/inversiones", status: "Disponible" },
  { icon: MapPinned, title: "Perfiles municipales", description: "Capacidades declaradas por 1,891 gobiernos locales.", href: "/dataperu/municipios", status: "Disponible" },
  { icon: Radar, title: "Radar municipal", description: "Compara recursos, ejecución del presupuesto y capacidades declaradas entre municipios similares.", href: "/dataperu/radar", status: "Disponible" },
  { icon: Layers3, title: "Temas de gestión", description: "Residuos, seguridad, riesgos, economía local y ambiente.", href: "/dataperu/temas", status: "Disponible" },
  { icon: Database, title: "Datos y metodología", description: "Consulta de dónde vienen los datos, qué mide cada indicador y cuáles son sus límites de uso.", href: "/indicators/ficha-capacidad-municipal", status: "Metodología" }
];

const applications = [
  "Seguimiento de inversión y proyectos",
  "Brechas de servicios y capacidades",
  "Seguridad y riesgos territoriales",
  "Empleo y desarrollo económico",
  "Infraestructura y desarrollo urbano",
  "Indicadores sociales y ambientales"
];

const coverageRoadmap = [
  { title: "Gestión e inversión", state: "Disponible", description: "Presupuesto, ejecución financiera, proyectos y capacidades municipales." },
  { title: "Servicios y bienestar", state: "Dos temas disponibles", description: "Agua y saneamiento con Censos 2025, y matrícula en educación básica regular por distrito con información oficial del Minedu 2025. Las fuentes de salud siguen en evaluación." },
  { title: "Seguridad y riesgos", state: "Evaluación de fuentes", description: "Victimización, capacidades preventivas, emergencias y exposición territorial." },
  { title: "Empleo y economía local", state: "Evaluación de fuentes", description: "Estructura productiva, actividad empresarial, empleo y condiciones para invertir." }
];

export default function DataPeruPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "DataPerú", path: "/dataperu" }])} />
      <section className="overflow-hidden bg-[#15211d] pb-20 pt-14 text-white md:pb-28 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:items-center lg:gap-20">
            <div>
              <Eyebrow className="text-[#d9a48f]">Datos públicos del Perú reunidos por NOAM</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[12ch] text-white">DataPerú</Heading>
              <p className="mt-5 text-2xl font-medium leading-tight tracking-[-0.035em] text-white/92 md:text-3xl">Consulta datos de tu municipio o departamento.</p>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/62 md:text-base">
                Busca una ficha municipal, revisa proyectos de inversión o explora datos de agua, saneamiento y educación. Consulta las fuentes, fechas y límites de cada publicación.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/dataperu/municipios" variant="secondary" className="rounded-full border-white bg-white text-ink">Explorar municipalidades</Button>
                <Button href="/analisis" variant="ghost" className="text-white/70 hover:text-white">Ver análisis por tema</Button>
              </div>
            </div>
            <DataVisual className="min-h-[450px] border-white/10 bg-[#1b2d27]" />
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-panel/55 py-8">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: formatMetric(renamuSummary.municipalities), label: "municipalidades con ficha" },
              { value: formatMetric(projectSummary.projects), label: "proyectos principales visibles" },
              { value: formatCurrency(dataperuSummary.totalPim, true), label: "presupuesto institucional modificado (PIM) municipal 2025, total agregado" },
              { value: formatPercent(dataperuSummary.totalExecutionPercent), label: "ejecución financiera municipal agregada" }
            ].map((metric) => (
              <div key={metric.label} className="border-l border-border pl-5">
                <p className="text-2xl font-medium tracking-[-0.035em] text-ink">{metric.value}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{metric.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[11px] leading-5 text-muted">Fuentes: población proyectada del INEI, presupuesto y proyectos del MEF, y capacidades declaradas en el Registro Nacional de Municipalidades (RENAMU). La ejecución agregada se calcula con los montos de presupuesto y gasto de los municipios; cada uno pesa según su presupuesto, en lugar de promediar sus porcentajes.</p>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.5fr_1fr] md:items-end">
            <div><Eyebrow>Por dónde empezar</Eyebrow><Heading size="xl">Elige qué quieres consultar.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Busca un municipio, revisa proyectos de inversión o consulta los problemas y oportunidades identificados por departamento.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
            {decisionPaths.map((path) => {
              const Icon = path.icon;
              return (
                <NextLink key={path.title} href={path.href} className="group flex min-h-[300px] flex-col bg-panel p-6 transition-colors hover:bg-canvas md:p-7">
                  <Icon className="h-5 w-5 text-rust" aria-hidden />
                  <h2 className="mt-12 text-xl font-medium leading-tight tracking-[-0.03em] text-ink">{path.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-ink/62">{path.description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-xs font-medium text-rust">{path.action} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span>
                </NextLink>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section id="explorar" className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.48fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Datos disponibles</Eyebrow>
              <Heading size="xl">Busca por tema o lugar.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">Cada publicación indica su fuente, periodo, definiciones y límites. Antes de añadir datos, revisamos su cobertura y calidad.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <NextLink key={module.title} href={module.href} className="group rounded-md border border-border bg-panel p-6 transition-all duration-220 hover:-translate-y-0.5 hover:border-border-strong">
                    <Icon className="h-5 w-5 text-rust" aria-hidden />
                    <Badge className="mt-6">{module.status}</Badge>
                    <h2 className="mt-8 text-xl font-medium tracking-[-0.025em] text-ink">{module.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-ink/65">{module.description}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-rust">Ver {module.title.toLowerCase()} <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden /></span>
                  </NextLink>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:gap-20">
            <TerritoryMap className="min-h-[430px]" />
            <div>
              <Eyebrow>Territorio y gestión</Eyebrow>
              <Heading size="xl">Compara los datos de distintos lugares.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">Los mapas y las fichas permiten revisar diferencias entre municipios y departamentos que un promedio nacional puede ocultar. Estos son los temas de consulta y desarrollo:</p>
              <div className="mt-7 grid gap-3">
                {applications.map((application) => <p key={application} className="flex items-center gap-3 text-sm text-ink/72"><Check className="h-4 w-4 text-rust" />{application}</p>)}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#15211d] text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <ShieldAlert className="h-5 w-5 text-[#d9a48f]" aria-hidden />
              <Eyebrow className="mt-6 text-[#d9a48f]">Disponibilidad de los datos</Eyebrow>
              <Heading size="xl" className="text-white">Qué puedes consultar y qué seguimos revisando.</Heading>
              <p className="mt-5 text-sm leading-7 text-white/58">Los temas marcados como “Evaluación de fuentes” aún no tienen un producto publicado. Revisamos si los datos permiten comparaciones antes de incorporarlos.</p>
              <Button href="/insights/dataperu-infraestructura-decision-territorial" variant="ghost" className="mt-7 gap-2 !text-white/70 hover:!text-white">Leer cómo se construye DataPerú <ArrowRight className="h-4 w-4" aria-hidden /></Button>
            </div>
            <div className="divide-y divide-white/14 border-y border-white/14">
              {coverageRoadmap.map((item, index) => (
                <article key={item.title} className="grid gap-4 py-6 sm:grid-cols-[38px_1fr_auto] sm:items-start">
                  <span className="font-mono text-[10px] text-[#d9a48f]">{String(index + 1).padStart(2, "0")}</span>
                  <div><h2 className="text-lg font-medium tracking-[-0.02em] text-white">{item.title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">{item.description}</p></div>
                  <span className="w-fit rounded-full border border-white/15 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/58">{item.state}</span>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Consultas por territorio</Eyebrow>
              <Heading size="xl">Abre una ficha, un mapa o una tabla.</Heading>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {[
                { title: "Agua y saneamiento por distrito", label: "Disponible", href: "/dataperu/agua-saneamiento", text: "Cobertura censal de agua y servicio higiénico por red pública para 1,892 distritos." },
                { title: "Matrícula escolar por distrito", label: "Disponible", href: "/dataperu/educacion", text: "Matrícula en educación básica regular por nivel, ámbito y gestión para 1,892 distritos, con la procedencia del dato." },
                { title: "Agendas territoriales del Perú", label: "Disponible", href: "/dataperu/agendas-territoriales", text: "Busca problemas públicos, poblaciones afectadas y oportunidades por validar en los 25 departamentos." },
                { title: "Mapa de gestión e inversión municipal", label: "Disponible", href: "/dataperu/mapa", text: "Mapa departamental para consultar ejecución, recursos, transparencia y proyectos disponibles." },
                { title: "Observatorio de inversiones municipales", label: "Disponible", href: "/dataperu/inversiones", text: "Consulta los proyectos disponibles, su sector y sus datos financieros por departamento y municipalidad." },
                { title: "Atlas departamental DataPerú 2025", label: "Disponible", href: "/dataperu/departamentos", text: "Seis comparaciones sobre recursos y capacidades municipales, con datos agrupados en 25 departamentos." },
                { title: "Radar de gestión municipal", label: "Disponible", href: "/dataperu/radar", text: "Consulta cómo se distribuyen los recursos, la ejecución y las capacidades, y compara municipios similares." },
                { title: "Perfiles municipales DataPerú 2025", label: "Disponible", href: "/dataperu/municipios", text: "Busca proyectos e indicadores de gestión para 1,891 municipalidades." }
              ].map((item) => (
                <NextLink key={item.title} href={item.href} className="group grid gap-4 py-6 sm:grid-cols-[90px_1fr_auto] sm:items-center">
                  <Badge>{item.label}</Badge>
                  <span><span className="block text-lg font-medium text-ink">{item.title}</span><span className="mt-1 block text-sm leading-6 text-ink/60">{item.text}</span></span>
                  <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1" />
                </NextLink>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-7 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[54px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><Eyebrow className="text-white/58">Si necesitas apoyo para tu institución</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Un estudio o sistema con los datos que necesitas.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">Podemos adaptar un diagnóstico o un sistema de seguimiento a tu municipalidad, región u organización.</p><div className="mt-6 flex flex-wrap gap-x-6 gap-y-4 text-sm"><NextLink href="/services/estudios-diagnosticos-evaluacion" className="underline underline-offset-4">Ver servicios de diagnóstico</NextLink><NextLink href="/diagnostico" className="underline underline-offset-4">Preparar un encargo</NextLink><NextLink href="/contact?interest=dataperu" className="underline underline-offset-4">Consultar por un módulo de DataPerú</NextLink></div></div>
              <Button href="/contact?interest=dataperu&from=/dataperu" analyticsEvent="cta_click" analyticsTarget="dataperu:final-contact" variant="secondary" className="rounded-full border-white bg-white px-6 text-ink">Contactar a NOAM</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

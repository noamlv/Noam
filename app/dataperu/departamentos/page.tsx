import { ArrowRight, Database, Layers3, Scale } from "lucide-react";
import { DepartmentAtlasVisual } from "@/components/brand/department-atlas-visual";
import { DepartmentAtlas } from "@/components/dataperu/department-atlas";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { dataperuSources, formatCurrency, formatMetric, formatPercent, renamuSource } from "@/lib/dataperu";
import { departmentProfiles, departmentSummary } from "@/lib/dataperu-departments";
import { breadcrumbJsonLd, buildMetadata, datasetJsonLd, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Atlas departamental DataPerú",
  description: "Compara población, presupuesto, inversión y capacidades municipales agregadas en los 25 departamentos del Perú.",
  path: "/dataperu/departamentos",
  image: ogImagePath("dataperu", "departamentos")
});

export default function DepartmentAtlasPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "DataPerú", path: "/dataperu" }, { name: "Atlas departamental", path: "/dataperu/departamentos" }])} />
      <JsonLd data={datasetJsonLd({ name: "Atlas departamental DataPerú 2025", description: "Agregados departamentales de población, presupuesto, inversión y capacidades declaradas por municipalidades.", url: `${siteConfig.url}/dataperu/departamentos`, datePublished: renamuSource.releaseDate })} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.88fr_1fr] lg:items-center lg:gap-20">
            <div><Eyebrow className="text-[#d9a48f]">DataPerú · Escala regional</Eyebrow><Heading as="h1" size="display" className="max-w-[11ch] text-white">El país cambia cuando cambia la escala.</Heading><p className="mt-7 max-w-xl text-base leading-8 text-white/66">Explora cómo se distribuyen recursos, ejecución y capacidades municipales entre los 25 departamentos. Una entrada para formular preguntas regionales con evidencia comparable.</p><div className="mt-8 flex flex-wrap gap-3"><Button href="#atlas" variant="secondary" className="rounded-full border-white bg-white text-ink">Abrir el atlas</Button><Button href="/contact?interest=dataperu&from=/dataperu/departamentos" variant="ghost" className="gap-2 !text-white/68 hover:!text-white">Diseñar un observatorio regional <ArrowRight className="h-4 w-4" aria-hidden /></Button></div></div>
            <DepartmentAtlasVisual />
          </div>
        </Container>
      </section>

      <section className="border-b border-border"><Container><div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">{[
        [formatMetric(departmentProfiles.length), "departamentos", "incluye Callao como departamento estadístico"],
        [formatMetric(departmentSummary.municipalities), "municipalidades", "universo publicado en RENAMU 2025"],
        [formatCurrency(departmentSummary.pim, true), "PIM municipal agregado", "suma de presupuestos 2025"],
        [formatPercent(departmentSummary.investmentExecutionPercent), "ejecución de inversión", "devengado agregado / PIM agregado"]
      ].map(([value, label, note]) => <div key={label} className="min-w-0 py-7 sm:px-6 sm:first:pl-0 md:py-9"><p className="break-words text-3xl font-medium tracking-[-0.05em] text-ink">{value}</p><p className="mt-2 text-xs font-medium text-ink/72">{label}</p><p className="mt-1 text-[9px] leading-4 text-muted">{note}</p></div>)}</div></Container></section>

      <Section id="atlas"><Container><div className="mb-10 grid gap-8 md:grid-cols-[0.58fr_1fr] md:items-end"><div><Eyebrow>Explorador nacional</Eyebrow><Heading size="xl">Una lectura. Veinticinco contextos.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Cambia la métrica y selecciona un departamento. La vista mantiene cada dimensión separada para evitar un índice opaco o un ranking general.</p></div><DepartmentAtlas profiles={departmentProfiles} summary={departmentSummary} /></Container></Section>

      <Section className="border-y border-border bg-[#ded9cc]"><Container><div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><Scale className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Cómo se construye</Eyebrow><Heading size="xl">Agregados transparentes, preguntas prudentes.</Heading></div><div className="grid gap-px overflow-hidden rounded-md border border-ink/15 bg-ink/15 md:grid-cols-3">{[
        [Database, "Montos ponderados", "PIM y devengado se suman antes de calcular ejecución. No se promedian porcentajes municipales."],
        [Layers3, "Capacidades declaradas", "Las proporciones RENAMU describen respuestas institucionales, no calidad ni resultados verificados."],
        [Scale, "Sin ranking compuesto", "Cada indicador conserva definición y unidad. Una diferencia territorial abre una pregunta; no dicta un veredicto."]
      ].map(([Icon, title, text]) => { const Component = Icon as typeof Database; return <article key={String(title)} className="min-h-[260px] bg-[#ded9cc] p-6"><Component className="h-4 w-4 text-rust" aria-hidden /><h2 className="mt-14 text-xl font-medium tracking-[-0.025em] text-ink">{String(title)}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{String(text)}</p></article>; })}</div></div></Container></Section>

      <Section><Container><div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><Eyebrow>De la consulta al encargo</Eyebrow><Heading size="xl">Lo abierto permite mirar. El servicio permite actuar.</Heading></div><div className="grid gap-4 sm:grid-cols-2">{[
        ["Gobiernos regionales", "Observatorios de inversión, servicios, brechas y compromisos con indicadores propios, responsables y alertas."],
        ["Empresas y organizaciones", "Inteligencia territorial para localizar, priorizar, comprender entorno público y diseñar estrategias de intervención."]
      ].map(([title, text]) => <article key={title} className="rounded-md border border-border bg-panel p-6"><h2 className="text-xl font-medium tracking-[-0.025em] text-ink">{title}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{text}</p><Button href={`/contact?interest=dataperu&from=/dataperu/departamentos`} variant="ghost" className="mt-6 gap-2 px-0">Plantear una necesidad <ArrowRight className="h-4 w-4" aria-hidden /></Button></article>)}</div></div><div className="mt-12 border-t border-border pt-6 text-[10px] leading-5 text-muted">Fuentes: {dataperuSources.population.publisher}, proyecciones de población; {dataperuSources.budget.publisher}, consulta amigable de presupuesto; {renamuSource.publisher}, {renamuSource.name}. Referencia 2025 y límites metodológicos disponibles en cada módulo.</div></Container></Section>
    </>
  );
}

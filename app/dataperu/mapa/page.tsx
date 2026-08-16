import { ArrowRight, Database, Layers3, MapPinned, Scale, ShieldCheck } from "lucide-react";
import { TerritoryMap } from "@/components/brand/territory-map";
import { DepartmentMapExplorer } from "@/components/dataperu/department-map-explorer";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { departmentSummary } from "@/lib/dataperu-departments";
import {
  departmentMapData,
  departmentMapNationalReferences,
  departmentMapSource,
  departmentMapViewBox
} from "@/lib/dataperu-map";
import { departmentMapMetrics } from "@/lib/dataperu-map-metrics";
import { breadcrumbJsonLd, buildMetadata, datasetJsonLd, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 86_400;

export const metadata = buildMetadata({
  title: "Mapa de gestión e inversión municipal",
  description: "Compara ejecución, recursos, transparencia e inversión municipal sobre límites departamentales referenciales del Perú.",
  path: "/dataperu/mapa",
  image: ogImagePath("dataperu", "mapa")
});

export default function DataPeruMapPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "DataPerú", path: "/dataperu" }, { name: "Mapa territorial", path: "/dataperu/mapa" }])} />
      <JsonLd data={datasetJsonLd({ name: "Mapa departamental de gestión e inversión municipal 2025", description: "Capas descriptivas de ejecución, presupuesto, transparencia y cartera visible sobre límites departamentales referenciales.", url: `${siteConfig.url}/dataperu/mapa`, datePublished: departmentMapSource.resourceUpdated })} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container><div className="grid gap-14 lg:grid-cols-[0.86fr_1fr] lg:items-center lg:gap-20"><div><Eyebrow className="text-[#d9a48f]">DataPerú · Visor territorial</Eyebrow><Heading as="h1" size="display" className="max-w-[11ch] text-white">Las decisiones también tienen geografía.</Heading><p className="mt-7 max-w-xl text-base leading-8 text-white/66">Explora cómo cambian recursos, ejecución, transparencia e inversión entre departamentos. Una lectura espacial para formular mejores preguntas, no para fabricar rankings.</p><div className="mt-8 flex flex-wrap gap-3"><Button href="#mapa" variant="secondary" className="rounded-full border-white bg-white text-ink">Explorar el mapa</Button><Button href="/contact?interest=visor-territorial&from=/dataperu/mapa" variant="ghost" className="gap-2 !text-white/72 hover:!text-white">Construir un visor <ArrowRight className="h-4 w-4" aria-hidden /></Button></div></div><TerritoryMap className="min-h-[430px] border-white/12" /></div></Container>
      </section>

      <section className="border-b border-border"><Container><div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">{[
        [departmentMapData.length.toLocaleString("es-PE"), "departamentos", "geometrías referenciales"],
        [departmentSummary.municipalities.toLocaleString("es-PE"), "municipalidades", "agregadas por departamento"],
        [departmentMapMetrics.length.toLocaleString("es-PE"), "capas comparables", "MEF, INEI y RENAMU"],
        ["192 KB", "GeoJSON abierto", "simplificado para web"]
      ].map(([value, label, note]) => <div key={label} className="min-w-0 py-7 sm:px-6 sm:first:pl-0 md:py-9"><p className="text-3xl font-medium tracking-[-0.05em] text-ink">{value}</p><p className="mt-2 text-xs font-medium text-ink/72">{label}</p><p className="mt-1 text-[9px] leading-4 text-muted">{note}</p></div>)}</div></Container></section>

      <Section id="mapa"><Container><div className="mb-10 grid gap-8 md:grid-cols-[0.58fr_1fr] md:items-end"><div><MapPinned className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Mapa interactivo</Eyebrow><Heading size="xl">Cambiar de capa cambia la conversación.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Selecciona una variable y un departamento. La ficha conecta cada señal con su perfil territorial y con el extracto de proyectos municipales.</p></div><DepartmentMapExplorer departments={departmentMapData} viewBox={departmentMapViewBox} nationalReferences={departmentMapNationalReferences} /></Container></Section>

      <Section className="border-y border-border bg-panel/45"><Container><div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><Scale className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Cómo leer</Eyebrow><Heading size="xl">Una comparación responsable necesita contexto.</Heading></div><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">{[
        [Layers3, "Escala departamental", "Los valores agregan municipalidades. Pueden ocultar diferencias entre provincias, distritos y tipos institucionales."],
        [ShieldCheck, "Sin causalidad", "Un color ubica diferencias descriptivas; no explica desempeño, necesidad, calidad del gasto ni responsabilidad."],
        [Database, "Fuentes trazables", "Cada capa conserva periodo, definición y fuente. El GeoJSON se publica para revisión y reutilización."]
      ].map(([Icon, title, text]) => { const Component = Icon as typeof Layers3; return <article key={String(title)} className="min-h-[260px] bg-panel p-6"><Component className="h-4 w-4 text-rust" aria-hidden /><h2 className="mt-12 text-xl font-medium tracking-[-0.025em] text-ink">{String(title)}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{String(text)}</p></article>; })}</div></div><div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-7"><p className="max-w-2xl text-xs leading-5 text-muted">Límites departamentales referenciales atribuidos a INEI. Archivo publicado por la Plataforma Nacional de Datos Abiertos el 24 de junio de 2025; no es cartografía para demarcación o catastro.</p><Button href={departmentMapSource.resourcePage} target="_blank" rel="noreferrer" variant="secondary" className="rounded-full">Revisar fuente oficial</Button></div></Container></Section>

      <Section className="bg-[#15211d] text-white"><Container><div className="grid gap-12 lg:grid-cols-[0.62fr_1fr] lg:items-end lg:gap-20"><div><Eyebrow className="text-[#d9a48f]">Visores para operar</Eyebrow><Heading size="xl" className="max-w-[13ch] text-white">Tus datos pueden convertirse en una vista común de decisión.</Heading></div><div><p className="max-w-2xl text-base leading-8 text-white/58">Integramos capas institucionales, indicadores, proyectos, alertas y responsables para que dirección y equipos territoriales trabajen sobre la misma evidencia.</p><Button href="/contact?interest=visor-territorial&from=/dataperu/mapa" variant="secondary" className="mt-7 rounded-full border-white bg-white px-6 text-ink">Plantear un visor territorial</Button></div></div></Container></Section>
    </>
  );
}

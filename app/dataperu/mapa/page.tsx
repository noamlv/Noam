import { ArrowRight, MapPinned } from "lucide-react";
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
        <Container><div className="grid gap-14 lg:grid-cols-[0.86fr_1fr] lg:items-center lg:gap-20"><div><Eyebrow className="text-[#d9a48f]">DataPerú · Visor territorial</Eyebrow><Heading as="h1" size="display" className="max-w-[11ch] text-white">Explora los datos en el mapa</Heading><p className="mt-7 max-w-xl text-base leading-8 text-white/66">Explora cómo cambian recursos, ejecución, transparencia e inversión entre departamentos. Una lectura espacial para formular mejores preguntas, no para fabricar rankings.</p><div className="mt-8 flex flex-wrap gap-3"><Button href="#mapa" variant="secondary" className="rounded-full border-white bg-white text-ink">Explorar el mapa</Button><Button href="/contact?interest=visor-territorial&from=/dataperu/mapa" variant="ghost" className="gap-2 !text-white/72 hover:!text-white">Construir un visor <ArrowRight className="h-4 w-4" aria-hidden /></Button></div></div><TerritoryMap className="min-h-[430px] border-white/12" /></div></Container>
      </section>

      <section className="border-b border-border"><Container><div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">{[
        [departmentMapData.length.toLocaleString("es-PE"), "departamentos", "límites de referencia"],
        [departmentSummary.municipalities.toLocaleString("es-PE"), "municipalidades", "agrupadas por departamento"],
        [departmentMapMetrics.length.toLocaleString("es-PE"), "indicadores del mapa", "MEF, INEI y RENAMU"],
        ["2025", "año de referencia", "gestión e inversión municipal"]
      ].map(([value, label, note]) => <div key={label} className="min-w-0 py-7 sm:px-6 sm:first:pl-0 md:py-9"><p className="text-3xl font-medium tracking-[-0.05em] text-ink">{value}</p><p className="mt-2 text-xs font-medium text-ink/72">{label}</p><p className="mt-1 text-[9px] leading-4 text-muted">{note}</p></div>)}</div></Container></section>

      <Section id="mapa"><Container><div className="mb-10 grid gap-8 md:grid-cols-[0.58fr_1fr] md:items-end"><div><MapPinned className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Mapa interactivo</Eyebrow><Heading size="xl">Elige el indicador que quieres consultar</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">Elige un indicador y un departamento. Abre su ficha para consultar los municipios y proyectos incluidos.</p></div><DepartmentMapExplorer departments={departmentMapData} viewBox={departmentMapViewBox} nationalReferences={departmentMapNationalReferences} /><p className="mt-4 text-xs text-muted">El mapa reúne los datos municipales por departamento. <a href={departmentMapSource.resourcePage} target="_blank" rel="noreferrer" className="text-rust underline">Fuente de los límites de referencia</a>.</p></Container></Section>



      <Section className="bg-[#15211d] text-white"><Container><div className="grid gap-12 lg:grid-cols-[0.62fr_1fr] lg:items-end lg:gap-20"><div><Eyebrow className="text-[#d9a48f]">Visores para operar</Eyebrow><Heading size="xl" className="max-w-[13ch] text-white">¿Necesitas un mapa con los datos de tu organización?</Heading></div><div><p className="max-w-2xl text-base leading-8 text-white/58">Integramos capas institucionales, indicadores, proyectos, alertas y responsables para que dirección y equipos territoriales trabajen sobre la misma evidencia.</p><Button href="/contact?interest=visor-territorial&from=/dataperu/mapa" variant="secondary" className="mt-7 rounded-full border-white bg-white px-6 text-ink">Plantear un visor territorial</Button></div></div></Container></Section>
    </>
  );
}

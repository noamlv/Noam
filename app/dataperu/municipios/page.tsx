import { Database, ExternalLink } from "lucide-react";
import { MunicipalityExplorer } from "@/components/dataperu/municipality-explorer";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import { dataperuSources, getMunicipalityContext, municipalities, renamuSource, renamuSummary } from "@/lib/dataperu";
import { educationSource } from "@/lib/dataperu-education";
import { waterSanitationSource } from "@/lib/dataperu-water-sanitation";
import { breadcrumbJsonLd, buildMetadata, datasetJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Perfiles municipales",
  description: "Explora población, educación, agua y saneamiento, presupuesto, inversión y capacidades institucionales de 1,891 municipalidades del Perú.",
  path: "/dataperu/municipios"
});

export default function MunicipalityIndexPage() {
  const searchItems = municipalities.map((item) => {
    const context = getMunicipalityContext(item.ubigeo);
    return {
      ubigeo: item.ubigeo,
      department: item.department,
      province: item.province,
      district: item.district,
      municipalityType: item.municipalityType,
      population2025: context?.population.projected2025 ?? null,
      pim: context?.budget.pim ?? null,
      executionPercent: context?.budget.executionPercent ?? null
    };
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "DataPerú", path: "/dataperu" }, { name: "Perfiles municipales", path: "/dataperu/municipios" }])} />
      <JsonLd data={datasetJsonLd({
        name: "Perfiles municipales DataPerú 2025",
        description: "Población, educación, agua y saneamiento, presupuesto, inversión y capacidades institucionales de municipalidades provinciales y distritales del Perú.",
        url: `${siteConfig.url}/dataperu/municipios`,
        datePublished: renamuSource.releaseDate
      })} />

      <section className="border-b border-white/10 bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <Eyebrow className="text-[#d9a48f]">DataPerú · Módulo abierto</Eyebrow>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_0.56fr] lg:items-end">
            <div>
              <Heading as="h1" size="display" className="max-w-[13ch] text-white">Perfiles municipales</Heading>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">Una línea de base abierta para entender población, servicios, recursos, ejecución y capacidades antes de diseñar un estudio, sistema o intervención.</p>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/12 bg-white/12">
              <div className="bg-[#192822] p-5"><p className="text-3xl font-medium">{renamuSummary.municipalities.toLocaleString("es-PE")}</p><p className="mt-2 text-xs text-white/52">municipalidades</p></div>
              <div className="bg-[#192822] p-5"><p className="text-3xl font-medium">{renamuSummary.departments}</p><p className="mt-2 text-xs text-white/52">departamentos</p></div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.58fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Explorar</Eyebrow>
              <Heading size="xl">Encuentra una gestión local.</Heading>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-ink/65">Busca por distrito, provincia, departamento o ubigeo. La ficha no califica el desempeño: organiza información oficial para formular mejores preguntas.</p>
          </div>
          <MunicipalityExplorer items={searchItems} />
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/55">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.58fr_1fr] lg:gap-20">
            <div>
              <Database className="h-5 w-5 text-rust" aria-hidden />
              <Eyebrow className="mt-6">Fuente y límites</Eyebrow>
              <Heading size="lg">Trazabilidad antes que apariencia de precisión.</Heading>
            </div>
            <div className="space-y-5 text-sm leading-7 text-ink/68">
              <p><strong className="font-medium text-ink">Fuentes:</strong> INEI para población, agua y saneamiento; Minedu para matrícula EBR; MEF para presupuesto y ejecución; y RENAMU para capacidades institucionales.</p>
              <p>{dataperuSources.population.notes} {renamuSource.notes}</p>
              <div className="flex flex-wrap gap-5 pt-2">
                <a href={dataperuSources.budget.datasetUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-rust hover:text-ink">Datos del MEF <ExternalLink className="h-3.5 w-3.5" /></a>
                <a href={dataperuSources.population.pageUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-rust hover:text-ink">Población del INEI <ExternalLink className="h-3.5 w-3.5" /></a>
                <a href={renamuSource.technicalSheetUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-rust hover:text-ink">Ficha técnica <ExternalLink className="h-3.5 w-3.5" /></a>
                <a href={waterSanitationSource.datasetUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-rust hover:text-ink">Censos 2025 <ExternalLink className="h-3.5 w-3.5" /></a>
                <a href={educationSource.datasetUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-rust hover:text-ink">Matrícula Minedu <ExternalLink className="h-3.5 w-3.5" /></a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

import { ResourceIndex } from "@/components/content/resource-index";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getAllContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Indicadores",
  description: "Indicadores y fichas metodológicas para comprender territorio, capacidades y gestión.",
  path: "/indicators"
});

export default async function IndicatorsPage() {
  const items = await getAllContent("indicators");

  return (
    <>
      <JsonLd
        data={
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Indicadores", path: "/indicators" }
          ])
        }
      />
      <ResourceIndex
        eyebrow="Indicadores"
        title="Indicadores y cómo interpretarlos"
        description="Consulta qué mide cada indicador, cómo se calcula y qué debes tener en cuenta al comparar resultados."
        items={items}
      />
    </>
  );
}

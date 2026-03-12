import { ResourceIndex } from "@/components/content/resource-index";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getAllContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Indicators",
  description: "Senales e indicadores de contexto para decision estrategica.",
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
            { name: "Indicators", path: "/indicators" }
          ])
        }
      />
      <ResourceIndex
        eyebrow="Indicators"
        title="Indicadores accionables para anticipar cambios relevantes."
        description="Monitoreos con enfoque en riesgo, oportunidad y timing de ejecucion."
        items={items}
      />
    </>
  );
}

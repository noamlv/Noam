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
        title="Medir mejor para interpretar con cuidado."
        description="Arquitecturas de indicadores, definiciones y criterios de lectura para comparar sin perder contexto."
        items={items}
      />
    </>
  );
}

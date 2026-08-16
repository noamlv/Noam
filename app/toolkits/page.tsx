import { ResourceIndex } from "@/components/content/resource-index";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getAllContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Métodos y guías",
  description: "Guías, checklists y herramientas metodológicas para equipos públicos y organizacionales.",
  path: "/toolkits"
});

export default async function ToolkitsPage() {
  const items = await getAllContent("toolkits");

  return (
    <>
      <JsonLd
        data={
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Métodos y guías", path: "/toolkits" }
          ])
        }
      />
      <ResourceIndex
        eyebrow="Métodos y guías"
        title="Herramientas para pasar de la pregunta al trabajo."
        description="Checklists, marcos y plantillas que hacen visibles nuestros criterios y facilitan una mejor implementación."
        items={items}
      />
    </>
  );
}

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
        title="Guías y plantillas de trabajo"
        description="Encuentra preguntas, listas de revisión y plantillas para preparar un estudio o una herramienta de datos."
        items={items}
      />
    </>
  );
}

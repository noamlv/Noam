import { ResourceIndex } from "@/components/content/resource-index";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getAllContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Toolkits",
  description: "Playbooks, templates y activos para implementacion.",
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
            { name: "Toolkits", path: "/toolkits" }
          ])
        }
      />
      <ResourceIndex
        eyebrow="Toolkits"
        title="Activos listos para acelerar ejecucion en equipos reales."
        description="Frameworks y guias en formato operativo para implementar sin friccion."
        items={items}
      />
    </>
  );
}

import { ResourceIndex } from "@/components/content/resource-index";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getAllContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Servicios",
  description: "Servicios orientados a outcomes en gobierno, inversion e IA.",
  path: "/services"
});

export default async function ServicesPage() {
  const items = await getAllContent("services");

  return (
    <>
      <JsonLd
        data={
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Servicios", path: "/services" }
          ])
        }
      />
      <ResourceIndex
        eyebrow="Servicios"
        title="Programas orientados a resultados, no a actividad."
        description="Sprints de decision estrategica, monitoreo de senales y diseno de capacidades en IA."
        items={items}
      />
    </>
  );
}

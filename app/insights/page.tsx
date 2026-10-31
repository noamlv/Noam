import { ResourceIndex } from "@/components/content/resource-index";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getAllContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Estudios y análisis",
  description: "Análisis aplicados sobre gobierno, territorio, datos e inteligencia artificial.",
  path: "/insights"
});

export default async function InsightsPage() {
  const items = await getAllContent("insights");

  return (
    <>
      <JsonLd
        data={
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Estudios", path: "/insights" }
          ])
        }
      />
      <ResourceIndex
        eyebrow="Estudios y análisis"
        title="Estudios y análisis"
        description="Lee nuestros análisis sobre gestión pública, territorio e inteligencia artificial, con sus fuentes y límites."
        items={items}
      />
    </>
  );
}

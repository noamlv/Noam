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
        title="Preguntas públicas examinadas con método y contexto."
        description="Notas, estudios y marcos de decisión para comprender problemas institucionales, territoriales y tecnológicos."
        items={items}
      />
    </>
  );
}

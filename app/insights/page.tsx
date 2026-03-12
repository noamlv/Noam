import { ResourceIndex } from "@/components/content/resource-index";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getAllContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Insights",
  description: "Analisis ejecutivos sobre gobierno, inversion e IA.",
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
            { name: "Insights", path: "/insights" }
          ])
        }
      />
      <ResourceIndex
        eyebrow="Insights"
        title="Analisis para equipos que operan con alto nivel de incertidumbre."
        description="Cada insight condensa contexto, datos y criterio de ejecucion para tomar mejores decisiones."
        items={items}
      />
    </>
  );
}

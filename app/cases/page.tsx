import { ResourceIndex } from "@/components/content/resource-index";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getAllContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Casos",
  description: "Casos de impacto en decisiones publicas, financieras y de IA.",
  path: "/cases"
});

export default async function CasesPage() {
  const items = await getAllContent("cases");

  return (
    <>
      <JsonLd
        data={
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Casos", path: "/cases" }
          ])
        }
      />
      <ResourceIndex
        eyebrow="Casos"
        title="Impacto validado en contextos de alta exigencia."
        description="Resultados obtenidos junto a equipos de direccion, inversion y transformacion digital."
        items={items}
      />
    </>
  );
}

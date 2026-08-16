import { ProductDemoPage } from "@/components/brand/product-demo-page";
import { JsonLd } from "@/components/seo/json-ld";
import { productProofs } from "@/lib/product-proofs";
import { breadcrumbJsonLd, buildMetadata, datasetJsonLd, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 86_400;

export const metadata = buildMetadata({
  title: "Barómetro Electoral, enero 2026",
  description: "Arquitectura analítica y ficha metodológica de una encuesta online de cobertura nacional con 1.300 entrevistas ponderadas.",
  path: "/electoral/barometro-enero-2026",
  image: ogImagePath("electoral", "barometro-enero-2026")
});

export default function BarometroElectoralPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "Electoral", path: "/electoral" },
        { name: "Barómetro Electoral", path: "/electoral/barometro-enero-2026" }
      ])} />
      <JsonLd data={datasetJsonLd({
        name: "Barómetro Electoral Perú, enero 2026: resultados agregados",
        description: "Experiencia analítica sobre una encuesta online de cobertura nacional de 1.300 entrevistas ponderadas. La base individual no se publica.",
        url: `${siteConfig.url}/electoral/barometro-enero-2026`,
        datePublished: "2026-01-31"
      })} />
      <ProductDemoPage proof={productProofs.barometro} />
    </>
  );
}

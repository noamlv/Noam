import { ProductDemoPage } from "@/components/brand/product-demo-page";
import { JsonLd } from "@/components/seo/json-ld";
import { productProofs } from "@/lib/product-proofs";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Planómetro 2026",
  description: "Análisis reproducible de 36 planes de gobierno y 2,742 propuestas operativas para las elecciones peruanas de 2026.",
  path: "/demos/planometro"
});

export default function PlanometroDemoPage() {
  return <><JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Electoral", path: "/electoral" }, { name: "Planómetro", path: "/demos/planometro" }])} /><ProductDemoPage proof={productProofs.planometro} /></>;
}

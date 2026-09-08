import type { MetadataRoute } from "next";
import { CONTENT_TYPES } from "@/types/content";
import { getAllContent } from "@/lib/content";
import { getManagedPlatformCatalog } from "@/lib/platform-products";
import { municipalities, renamuSource } from "@/lib/dataperu";
import { departmentProfiles } from "@/lib/dataperu-departments";
import { sectorSlugs } from "@/lib/dataperu-sectors";
import { solutionSlugs } from "@/lib/solutions";
import { sectorPractices } from "@/lib/sector-practices";
import { planometroAxes, planometroData, planometroParties } from "@/lib/planometro";
import { siteConfig } from "@/lib/site-config";
import { deliverableSamples } from "@/lib/deliverable-samples";
import { briefEditions } from "@/lib/brief";

export const revalidate = 3600;

const staticRoutes = [
  "",
  "/insights",
  "/indicators",
  "/toolkits",
  "/products",
  "/resources",
  "/newsletter",
  "/brief",
  "/dataperu",
  "/dataperu/departamentos",
  "/dataperu/panorama-municipal-2025",
  "/dataperu/inversiones",
  "/dataperu/mapa",
  "/dataperu/radar",
  "/dataperu/municipios",
  "/dataperu/temas",
  "/electoral",
  "/electoral/erm-2026",
  "/electoral/barometro-enero-2026",
  "/electoral/planometro-2026",
  "/electoral/planometro-2026/organizaciones",
  "/electoral/planometro-2026/ejes",
  "/evidence",
  "/sectors",
  "/sectors/public-sector",
  "/sectors/companies",
  "/services",
  "/solutions",
  "/cases",
  "/about",
  "/como-trabajamos",
  "/contact",
  "/diagnostico",
  "/contratar-analisis-datos",
  "/diagnostico-territorial",
  "/encuestas-estudios-opinion",
  "/observatorios-dashboards-visores",
  "/ia-automatizacion-gobiernos-empresas",
  "/estudios-mercado-inteligencia-territorial",
  "/analisis-datos-seguridad-ciudadana",
  "/analisis-datos-residuos-limpieza-publica",
  "/linea-base-evaluacion-impacto",
  "/muestras",
  "/privacy",
  "/terms",
  "/transparency",
  "/cv",
  "/en"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [contentCollections, managedProducts] = await Promise.all([
    Promise.all(CONTENT_TYPES.map((type) => getAllContent(type))),
    getManagedPlatformCatalog()
  ]);
  const contentPages = contentCollections.flat().map((item) => ({
    url: `${siteConfig.url}${item.url}`,
    lastModified: new Date(item.reviewedAt ?? item.date),
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  const staticPages = staticRoutes.map((route): MetadataRoute.Sitemap[number] => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8
  }));

  const productPages = managedProducts.filter((product) => product.href.startsWith("/products/")).map((product): MetadataRoute.Sitemap[number] => ({
    url: `${siteConfig.url}${product.href}`,
    changeFrequency: "weekly",
    priority: product.demoHref ? 0.8 : 0.7
  }));

  const municipalityPages = municipalities.map((municipality): MetadataRoute.Sitemap[number] => ({
    url: `${siteConfig.url}/dataperu/municipios/${municipality.ubigeo}`,
    lastModified: new Date(renamuSource.releaseDate),
    changeFrequency: "yearly",
    priority: 0.6
  }));

  const departmentPages = departmentProfiles.map((department): MetadataRoute.Sitemap[number] => ({
    url: `${siteConfig.url}/dataperu/departamentos/${department.code}`,
    lastModified: new Date(renamuSource.releaseDate),
    changeFrequency: "yearly",
    priority: 0.72
  }));

  const sectorPages = sectorSlugs.map((slug): MetadataRoute.Sitemap[number] => ({
    url: `${siteConfig.url}/dataperu/temas/${slug}`,
    lastModified: new Date(renamuSource.releaseDate),
    changeFrequency: "yearly",
    priority: 0.7
  }));

  const solutionPages = solutionSlugs.map((slug): MetadataRoute.Sitemap[number] => ({
    url: `${siteConfig.url}/solutions/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8
  }));

  const samplePages = deliverableSamples.map((sample): MetadataRoute.Sitemap[number] => ({
    url: `${siteConfig.url}/muestras/${sample.slug}`,
    changeFrequency: "monthly",
    priority: 0.74
  }));

  const briefPages = briefEditions.map((edition): MetadataRoute.Sitemap[number] => ({
    url: `${siteConfig.url}/brief/${edition.slug}`,
    lastModified: new Date(edition.date),
    changeFrequency: "monthly",
    priority: 0.78
  }));

  const practicePages = sectorPractices.map((practice): MetadataRoute.Sitemap[number] => ({
    url: `${siteConfig.url}/sectors/${practice.market === "public" ? "public-sector" : "companies"}/${practice.slug}`,
    changeFrequency: "monthly",
    priority: 0.8
  }));

  const planometroOrganizationPages = planometroParties.map((party): MetadataRoute.Sitemap[number] => ({
    url: `${siteConfig.url}/electoral/planometro-2026/organizaciones/${party.slug}`,
    lastModified: new Date(planometroData.source.strictSnapshotDate),
    changeFrequency: "monthly",
    priority: 0.66
  }));

  const planometroAxisPages = planometroAxes.map((axis): MetadataRoute.Sitemap[number] => ({
    url: `${siteConfig.url}/electoral/planometro-2026/ejes/${axis.key}`,
    lastModified: new Date(planometroData.source.strictSnapshotDate),
    changeFrequency: "monthly",
    priority: 0.72
  }));

  return [...staticPages, ...briefPages, ...samplePages, ...planometroAxisPages, ...planometroOrganizationPages, ...solutionPages, ...practicePages, ...productPages, ...departmentPages, ...sectorPages, ...municipalityPages, ...contentPages];
}

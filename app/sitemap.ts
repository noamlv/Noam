import type { MetadataRoute } from "next";
import { CONTENT_TYPES } from "@/types/content";
import { getAllContent } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

const staticRoutes = ["", "/insights", "/indicators", "/toolkits", "/services", "/cases", "/about", "/contact", "/cv", "/en"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const contentCollections = await Promise.all(CONTENT_TYPES.map((type) => getAllContent(type)));
  const contentPages = contentCollections.flat().map((item) => ({
    url: `${siteConfig.url}${item.url}`,
    lastModified: new Date(item.date),
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  const staticPages = staticRoutes.map((route): MetadataRoute.Sitemap[number] => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8
  }));

  return [...staticPages, ...contentPages];
}

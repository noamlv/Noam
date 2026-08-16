import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceDetail } from "@/components/content/resource-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllSlugs, getContentBySlug } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata, datasetJsonLd, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

interface IndicatorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs("indicators");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: IndicatorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContentBySlug("indicators", slug);

  if (!content) {
    return {};
  }

  return buildMetadata({
    title: content.item.title,
    description: content.item.description,
    path: content.item.url,
    image: content.item.ogImage && content.item.ogImage !== "/og-default.png" ? content.item.ogImage : ogImagePath("indicators", slug),
    type: "article"
  });
}

export default async function IndicatorDetailPage({ params }: IndicatorPageProps) {
  const { slug } = await params;
  const content = await getContentBySlug("indicators", slug);

  if (!content) {
    notFound();
  }

  const canonical = new URL(content.item.url, siteConfig.url).toString();

  return (
    <>
      <JsonLd
        data={
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Indicators", path: "/indicators" },
            { name: content.item.title, path: content.item.url }
          ])
        }
      />
      <JsonLd
        data={
          datasetJsonLd({
            name: content.item.title,
            description: content.item.description,
            url: canonical,
            datePublished: content.item.date
          })
        }
      />
      <ResourceDetail item={content.item} body={content.body} parentLabel="Indicators" parentHref="/indicators" />
    </>
  );
}

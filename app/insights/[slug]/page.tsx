import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceDetail } from "@/components/content/resource-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllSlugs, getContentBySlug } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs("insights");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContentBySlug("insights", slug);

  if (!content) {
    return {};
  }

  return buildMetadata({
    title: content.item.title,
    description: content.item.description,
    path: content.item.url,
    image: content.item.ogImage && content.item.ogImage !== "/og-default.png" ? content.item.ogImage : ogImagePath("insights", slug),
    type: "article"
  });
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const content = await getContentBySlug("insights", slug);

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
            { name: "Insights", path: "/insights" },
            { name: content.item.title, path: content.item.url }
          ])
        }
      />
      <JsonLd
        data={
          articleJsonLd({
            title: content.item.title,
            description: content.item.description,
            datePublished: content.item.date,
            dateModified: content.item.reviewedAt,
            url: canonical,
            image: new URL(content.item.ogImage && content.item.ogImage !== "/og-default.png" ? content.item.ogImage : ogImagePath("insights", slug), siteConfig.url).toString(),
            author: content.item.author
          })
        }
      />
      <ResourceDetail item={content.item} body={content.body} parentLabel="Insights" parentHref="/insights" />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceDetail } from "@/components/content/resource-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllSlugs, getContentBySlug } from "@/lib/content";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs("cases");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContentBySlug("cases", slug);

  if (!content) {
    return {};
  }

  return buildMetadata({
    title: content.item.title,
    description: content.item.description,
    path: content.item.url,
    image: content.item.ogImage && content.item.ogImage !== "/og-default.png" ? content.item.ogImage : ogImagePath("cases", slug),
    type: "article"
  });
}

export default async function CaseDetailPage({ params }: CasePageProps) {
  const { slug } = await params;
  const content = await getContentBySlug("cases", slug);

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
            { name: "Casos", path: "/cases" },
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
            url: canonical,
            image: new URL(content.item.ogImage && content.item.ogImage !== "/og-default.png" ? content.item.ogImage : ogImagePath("cases", slug), siteConfig.url).toString()
          })
        }
      />
      <ResourceDetail item={content.item} body={content.body} parentLabel="Casos" parentHref="/cases" />
    </>
  );
}

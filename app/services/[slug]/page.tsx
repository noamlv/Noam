import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceDetail } from "@/components/content/resource-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllSlugs, getContentBySlug } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs("services");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContentBySlug("services", slug);

  if (!content) {
    return {};
  }

  return buildMetadata({
    title: content.item.title,
    description: content.item.description,
    path: content.item.url,
    image: content.item.ogImage,
    type: "article"
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const content = await getContentBySlug("services", slug);

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
            { name: "Servicios", path: "/services" },
            { name: content.item.title, path: content.item.url }
          ])
        }
      />
      <JsonLd
        data={
          serviceJsonLd({
            name: content.item.title,
            description: content.item.description,
            url: canonical
          })
        }
      />
      <ResourceDetail item={content.item} body={content.body} parentLabel="Servicios" parentHref="/services" />
    </>
  );
}

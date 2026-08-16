import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorPracticePage } from "@/components/brand/sector-practice-page";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";
import { getSectorPractice, publicPractices } from "@/lib/sector-practices";
import { siteConfig } from "@/lib/site-config";

interface PublicPracticePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return publicPractices.map((practice) => ({ slug: practice.slug }));
}

export async function generateMetadata({ params }: PublicPracticePageProps): Promise<Metadata> {
  const { slug } = await params;
  const practice = getSectorPractice("public", slug);
  if (!practice) return {};
  return buildMetadata({ title: practice.title, description: practice.description, path: `/sectors/public-sector/${practice.slug}`, image: practice.image });
}

export default async function PublicPracticePage({ params }: PublicPracticePageProps) {
  const { slug } = await params;
  const practice = getSectorPractice("public", slug);
  if (!practice) notFound();
  const path = `/sectors/public-sector/${practice.slug}`;

  return <><JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Sectores", path: "/sectors" }, { name: "Gobiernos", path: "/sectors/public-sector" }, { name: practice.title, path }])} /><JsonLd data={serviceJsonLd({ name: practice.title, description: practice.description, url: `${siteConfig.url}${path}` })} /><SectorPracticePage practice={practice} /></>;
}

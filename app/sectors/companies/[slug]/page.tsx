import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorPracticePage } from "@/components/brand/sector-practice-page";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";
import { getSectorPractice, privatePractices } from "@/lib/sector-practices";
import { siteConfig } from "@/lib/site-config";

interface PrivatePracticePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return privatePractices.map((practice) => ({ slug: practice.slug }));
}

export async function generateMetadata({ params }: PrivatePracticePageProps): Promise<Metadata> {
  const { slug } = await params;
  const practice = getSectorPractice("private", slug);
  if (!practice) return {};
  return buildMetadata({ title: practice.title, description: practice.description, path: `/sectors/companies/${practice.slug}`, image: practice.image });
}

export default async function PrivatePracticePage({ params }: PrivatePracticePageProps) {
  const { slug } = await params;
  const practice = getSectorPractice("private", slug);
  if (!practice) notFound();
  const path = `/sectors/companies/${practice.slug}`;

  return <><JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Sectores", path: "/sectors" }, { name: "Empresas", path: "/sectors/companies" }, { name: practice.title, path }])} /><JsonLd data={serviceJsonLd({ name: practice.title, description: practice.description, url: `${siteConfig.url}${path}` })} /><SectorPracticePage practice={practice} /></>;
}

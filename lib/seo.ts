import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

interface MetadataInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  locale?: string;
  languages?: Record<string, string>;
}

export function ogImagePath(category: string, slug: string) {
  return `/og/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`;
}

export function buildMetadata({ title, description, path = "/", image = "/og-default.png", type = "website", locale = "es_PE", languages }: MetadataInput): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();
  const imageUrl = new URL(image, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languages ?? { es: canonical }
    },
    openGraph: {
      type,
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
      locale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/wordmark.svg`,
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.email,
        areaServed: "PE"
      }
    ]
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Noam Lopez Villanes",
    jobTitle: "Fundador y director de NOAM",
    description: "Doctor en Ciencia Política y Gobierno especializado en investigación aplicada, gestión pública, datos y análisis territorial.",
    worksFor: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url
    },
    url: `${siteConfig.url}/about`,
    sameAs: ["https://www.linkedin.com/in/noamlv", "https://github.com/noamlv"],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Pontificia Universidad Católica del Perú" },
      { "@type": "CollegeOrUniversity", name: "Universidad Nacional de Ingeniería" }
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Doctorado",
        name: "Doctor en Ciencia Política y Gobierno",
        recognizedBy: { "@type": "CollegeOrUniversity", name: "Pontificia Universidad Católica del Perú" }
      }
    ],
    knowsAbout: [
      "Gestión pública",
      "Ciencia política",
      "Evaluación",
      "Análisis territorial",
      "Seguridad y justicia",
      "Inteligencia artificial aplicada"
    ]
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    mainEntityOfPage: input.url,
    image: input.image ?? `${siteConfig.url}/og-default.png`,
    author: {
      "@type": "Organization",
      name: siteConfig.legalName
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName
    }
  };
}

export function datasetJsonLd(input: {
  name: string;
  description: string;
  url: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: input.name,
    description: input.description,
    url: input.url,
    datePublished: input.datePublished,
    creator: {
      "@type": "Organization",
      name: siteConfig.legalName
    }
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: input.name,
    description: input.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url
    },
    areaServed: "PE",
    url: input.url
  };
}

export function faqJsonLd(items: Array<{ title: string; content: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.content
      }
    }))
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString()
    }))
  };
}

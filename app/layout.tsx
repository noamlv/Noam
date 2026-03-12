import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, personJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import "@/app/globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "NOAM | Gobierno, Inversion e IA",
    template: "%s | NOAM"
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
    languages: {
      es: "/",
      en: "/en"
    }
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "es_ES",
    url: siteConfig.url,
    title: "NOAM | Gobierno, Inversion e IA",
    description: siteConfig.description,
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: "NOAM"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NOAM | Gobierno, Inversion e IA",
    description: siteConfig.description,
    images: ["/og-default.svg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${sans.variable} font-sans antialiased`}>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={personJsonLd()} />
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

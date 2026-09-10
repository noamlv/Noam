import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { NoamNavigator } from "@/components/assistant/noam-navigator";
import { SiteAnalytics } from "@/components/analytics/site-analytics";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, personJsonLd, websiteJsonLd } from "@/lib/seo";
import { runtimeCapabilities } from "@/lib/runtime-capabilities";
import { siteConfig } from "@/lib/site-config";
import "@/app/globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  applicationName: "NOAM",
  creator: "NOAM",
  publisher: "NOAM",
  category: "consulting",
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "NOAM | Inteligencia pública y territorial",
    template: "%s | NOAM"
  },
  description: siteConfig.description,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg"
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  alternates: {
    canonical: "/",
    languages: {
      es: "/",
      en: "/en"
    },
    types: {
      "application/rss+xml": [
        { url: "/insights/rss.xml", title: "NOAM Insights" },
        { url: "/brief/rss.xml", title: "Brief NOAM" }
      ]
    }
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "es_PE",
    url: siteConfig.url,
    title: "NOAM | Inteligencia pública y territorial",
    description: siteConfig.description,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "NOAM"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NOAM | Inteligencia pública y territorial",
    description: siteConfig.description,
    images: ["/og-default.png"]
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } } : {})
  }
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${sans.variable} font-sans antialiased`}>
        {runtimeCapabilities.analytics ? <SiteAnalytics /> : null}
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={personJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <NoamNavigator />
        </div>
      </body>
    </html>
  );
}

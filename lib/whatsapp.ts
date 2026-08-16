import { siteConfig } from "./site-config.ts";

export function buildWhatsAppUrl(path: string, context?: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const source = new URL(normalizedPath, siteConfig.url).toString();
  const purpose = context?.trim() || "un proyecto de estudios, datos o gestión pública";
  const message = `Hola, llegué a NOAM desde ${source}. Quisiera conversar sobre ${purpose}.`;

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

import { briefEditions } from "@/lib/brief";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

function xml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

export async function GET() {
  const items = [...briefEditions]
    .sort((left, right) => +new Date(right.date) - +new Date(left.date))
    .map((edition) => {
      const url = `${siteConfig.url}/brief/${edition.slug}`;
      return `\n    <item>\n      <title>${xml(edition.title)}</title>\n      <link>${url}</link>\n      <guid isPermaLink="true">${url}</guid>\n      <pubDate>${new Date(`${edition.date}T00:00:00Z`).toUTCString()}</pubDate>\n      <description>${xml(edition.description)}</description>\n    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0">\n  <channel>\n    <title>${siteConfig.name} · Brief</title>\n    <link>${siteConfig.url}/brief</link>\n    <description>Lecturas breves y verificables para decisiones públicas, territoriales y organizacionales.</description>\n    <language>es-PE</language>${items}\n  </channel>\n</rss>`;

  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" } });
}

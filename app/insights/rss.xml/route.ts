import { getRecentInsights } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export async function GET() {
  const insights = await getRecentInsights(30);

  const items = insights
    .map(
      (item) => `\n    <item>\n      <title><![CDATA[${item.title}]]></title>\n      <link>${siteConfig.url}${item.url}</link>\n      <guid>${siteConfig.url}${item.url}</guid>\n      <pubDate>${new Date(item.date).toUTCString()}</pubDate>\n      <description><![CDATA[${item.description}]]></description>\n    </item>`
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0">\n  <channel>\n    <title>${siteConfig.name} Insights</title>\n    <link>${siteConfig.url}/insights</link>\n    <description>${siteConfig.description}</description>${items}\n  </channel>\n</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}

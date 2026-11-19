import { getSearchIndex } from "@/lib/search";
import { isPublicSearchPath } from "@/lib/search-core";

export const dynamic = "force-static";

export async function GET() {
  const entries = await getSearchIndex({ repositoryOnly: true });
  return Response.json(entries.filter((entry) => isPublicSearchPath(entry.href)), {
    headers: { "X-Robots-Tag": "noindex" }
  });
}

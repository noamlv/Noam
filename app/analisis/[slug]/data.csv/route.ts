import { analysisLibrary, getAnalysisSnapshot } from "@/lib/analysis-library";
import { analysisPresentation } from "@/lib/analysis-presentation";
import { reportCsv } from "@/lib/analysis-report";

export function generateStaticParams() {
  return analysisLibrary.filter(({ slug }) => analysisPresentation[slug].area === "dataperu").map(({ slug }) => ({ slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const snapshot = analysisPresentation[slug]?.area === "dataperu" ? getAnalysisSnapshot(slug) : undefined;
  if (!snapshot) return new Response(null, { status: 404 });
  return new Response(reportCsv(snapshot), {
    headers: {
      "Content-Disposition": `attachment; filename="noam-${snapshot.slug}-agregados.csv"`,
      "Content-Type": "text/csv; charset=utf-8",
      "X-Robots-Tag": "noindex"
    }
  });
}

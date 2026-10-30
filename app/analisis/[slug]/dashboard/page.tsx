import NextLink from "next/link";
import { notFound } from "next/navigation";
import { AnalysisDashboard } from "@/components/dataperu/analysis-dashboard";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import { analysisLibrary, getAnalysis, getAnalysisSnapshot } from "@/lib/analysis-library";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return analysisLibrary.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) { const entry = getAnalysis((await params).slug); return entry ? buildMetadata({ title: `${entry.title}: dashboard`, description: entry.description, path: `/analisis/${entry.slug}/dashboard` }) : {}; }

export default async function DashboardPage({ params }: Props) {
  const { slug } = await params; const entry = getAnalysis(slug); const snapshot = getAnalysisSnapshot(slug);
  if (!entry || !snapshot) notFound();
  return <><Section className="pb-10"><Container><NextLink href={`/analisis/${slug}`} className="text-xs text-rust">← Volver al análisis y metodología</NextLink><Eyebrow className="mt-10">Explorador NOAM · {entry.category}</Eyebrow><Heading as="h1" size="xl">{entry.title}</Heading><p className="mt-5 max-w-3xl text-sm leading-7 text-muted">{entry.period}. Versión nativa de agregados: no reproduce todos los módulos de la aplicación original.</p><p className="mt-5 border-l-2 border-rust pl-4 text-sm leading-7 text-ink/75">{entry.limits[0]}</p></Container></Section><Section className="pt-0"><Container><AnalysisDashboard snapshot={snapshot} /><div className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-2"><div><h2 className="text-lg font-medium">Fuente y trazabilidad</h2><p className="mt-3 text-xs leading-6 text-muted">{entry.source}. {snapshot.sourceRows.toLocaleString("es-PE")} filas en la copia de origen. Extracción analítica NOAM del 29 de octubre de 2026; no es una actualización del registro oficial.</p><p className="mt-3 break-all font-mono text-[10px] leading-5 text-muted">SHA-256: {snapshot.sha256}</p><a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm text-rust">Consultar la fuente oficial ↗</a></div><div><h2 className="text-lg font-medium">Límites de uso</h2><ul className="mt-3 space-y-3 text-xs leading-6 text-muted">{entry.limits.map((limit) => <li key={limit}>{limit}</li>)}</ul></div></div></Container></Section></>;
}

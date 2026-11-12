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
  const { slug } = await params;
  const entry = getAnalysis(slug);
  const snapshot = getAnalysisSnapshot(slug);
  if (!entry || !snapshot) notFound();
  return <>
    <Section className="pb-10"><Container>
      <NextLink href={`/analisis/${slug}`} className="text-xs text-rust">← Volver al análisis</NextLink>
      <Eyebrow className="mt-10">Explorador NOAM · {entry.category}</Eyebrow>
      <Heading as="h1" size="xl">{entry.title}</Heading>
      <p className="mt-5 text-sm leading-7 text-muted"><a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="text-rust underline underline-offset-4">{entry.source}</a> · {entry.period}</p>
    </Container></Section>
    <Section className="pt-0"><Container><AnalysisDashboard snapshot={snapshot} /></Container></Section>
  </>;
}

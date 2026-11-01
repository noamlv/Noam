import Image from "next/image";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { AnalysisDashboard } from "@/components/dataperu/analysis-dashboard";
import { AnalysisOverview } from "@/components/dataperu/analysis-overview";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { analysisLibrary, getAnalysis, getAnalysisSnapshot } from "@/lib/analysis-library";
import { analysisPresentation } from "@/lib/analysis-presentation";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return analysisLibrary.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) { const entry = getAnalysis((await params).slug); return entry ? buildMetadata({ title: entry.title, description: entry.description, path: `/analisis/${entry.slug}` }) : {}; }

export default async function AnalysisPage({ params }: Props) {
  const entry = getAnalysis((await params).slug);
  if (!entry) notFound();
  const snapshot = getAnalysisSnapshot(entry.slug);
  const presentation = analysisPresentation[entry.slug];
  const isElectoral = presentation.area === "electoral";
  const parent = isElectoral ? { name: "Electoral", path: "/electoral" } : { name: "DataPerú", path: "/dataperu" };
  const related = analysisLibrary.filter((item) => item.slug !== entry.slug && analysisPresentation[item.slug].area === presentation.area);

  return <>
    <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, parent, { name: "Análisis por tema", path: isElectoral ? "/analisis" : "/dataperu/analisis" }, { name: entry.title, path: `/analisis/${entry.slug}` }])} />
    <section className="bg-[#15211d] py-14 text-white md:py-20"><Container>
      <NextLink href={isElectoral ? "/electoral" : "/dataperu/analisis"} className="text-xs text-white/70 hover:text-white">← {isElectoral ? "Análisis electorales" : "DataPerú · Análisis por tema"}</NextLink>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.8fr] lg:items-end">
        <div><Eyebrow className="text-[#d9a48f]">{entry.category}</Eyebrow><Heading as="h1" size="display" className="max-w-[16ch] text-white">{entry.headline.replace(/\.$/, "")}</Heading></div>
        <div><p className="text-base leading-8 text-white/75">{entry.description}</p><div className="mt-7 flex flex-wrap gap-3"><Button href="#datos" variant="secondary" className="gap-2 rounded-full border-white bg-white text-ink">Ver datos y gráficos <ArrowDown className="h-4 w-4" aria-hidden /></Button></div><p className="mt-3 text-xs leading-5 text-white/55">Puedes leer, filtrar y descargar los datos sin salir de esta página.</p></div>
      </div>
      <p className="mt-10 border-t border-white/15 pt-5 text-xs leading-6 text-white/65">{entry.source} · {entry.period}</p>
      {isElectoral ? <p className="mt-3 border-l-2 border-[#d9a48f] pl-4 text-sm leading-7 text-white/85">{entry.limits[0]}</p> : null}
    </Container></section>
    <Section className="pb-0"><Container><figure><Image src={presentation.image} alt={presentation.imageAlt} width={1672} height={941} sizes="(max-width: 768px) 100vw, 1160px" className="aspect-[2/1] w-full rounded-[1.25rem] object-cover md:aspect-[3.4/1]" /><figcaption className="mt-2 text-right text-[10px] leading-5 text-muted">Imagen ilustrativa; no es una fotografía del estudio.</figcaption></figure></Container></Section>
    <Section id="datos"><Container><div className="mb-8 grid gap-6 md:grid-cols-[0.65fr_1fr] md:items-end"><div><Eyebrow>Datos del análisis</Eyebrow><Heading size="xl">Datos y gráficos</Heading></div><p className="max-w-2xl text-sm leading-7 text-muted">{entry.scope}. {entry.limits[0]}</p></div>{snapshot ? <AnalysisOverview snapshot={snapshot} accent={presentation.accent} /> : null}<div className="mt-9 flex flex-wrap gap-4">{presentation.originalDashboardUrl ? <Button href={presentation.originalDashboardUrl} target="_blank" rel="noopener noreferrer" variant="ghost" className="gap-2">Ver dashboard original <ArrowUpRight className="h-4 w-4" aria-hidden /></Button> : null}</div>{snapshot ? <details className="mt-10 rounded-md border border-border bg-white p-5 md:p-8"><summary className="cursor-pointer text-lg font-medium tracking-tight">Filtrar y explorar todos los datos</summary><p className="mt-3 text-sm leading-7 text-muted">Elige un periodo o ámbito para actualizar esta sección. Puedes consultar los valores y descargar los datos agrupados.</p><div className="mt-8"><AnalysisDashboard snapshot={snapshot} /></div></details> : null}</Container></Section>
    <Section className="border-y border-border bg-panel/45"><Container><Eyebrow>Para entender los resultados</Eyebrow><Heading size="xl">Qué muestran estos datos</Heading><div className="mt-10 grid gap-8 md:grid-cols-3">{entry.findings.map((finding, index) => <article key={finding} className="border-t border-border pt-6"><p className="font-mono text-xs text-rust">0{index + 1}</p><p className="mt-5 text-base leading-8 text-ink/75">{finding}</p></article>)}</div></Container></Section>
    <Section><Container><div className="grid gap-10 md:grid-cols-[0.6fr_1fr]"><div><Eyebrow>Qué falta conocer</Eyebrow><Heading size="xl">Preguntas para seguir investigando</Heading></div><ul className="divide-y divide-border border-y border-border">{entry.questions.map((question) => <li key={question} className="py-6 text-lg leading-8">{question}</li>)}</ul></div></Container></Section>
    <Section className="border-y border-border bg-panel/45"><Container><div className="grid gap-10 md:grid-cols-[0.6fr_1fr]"><div><Eyebrow>Fuente y método</Eyebrow><Heading size="lg">Cómo interpretar los datos</Heading><a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-rust">Consultar fuente oficial <ArrowUpRight className="h-4 w-4" aria-hidden /></a><p className="mt-4 text-xs leading-6 text-muted">Periodo: {entry.period}</p></div><ul className="space-y-4 text-sm leading-7 text-muted">{entry.limits.map((limit) => <li key={limit} className="border-l border-border pl-5">{limit}</li>)}</ul></div></Container></Section>
    {related.length ? <Section><Container><Eyebrow>Sigue explorando</Eyebrow><Heading size="lg">Otros análisis de DataPerú</Heading><div className="mt-8 grid gap-4 md:grid-cols-3">{related.map((item) => <NextLink key={item.slug} href={`/analisis/${item.slug}`} className="rounded-md border border-border p-6 transition-colors hover:border-rust"><p className="text-xs text-muted">{item.category}</p><h3 className="mt-4 text-xl font-medium tracking-tight">{item.title}</h3><span className="mt-6 inline-block text-sm text-rust">Leer análisis →</span></NextLink>)}</div></Container></Section> : null}
    <Section className="bg-[#15211d] text-white"><Container><Eyebrow className="text-[#d9a48f]">Si necesitas apoyo de NOAM</Eyebrow><Heading size="xl" className="max-w-3xl text-white">{entry.offer.replace(/\.$/, "")}</Heading><p className="mt-6 max-w-2xl text-sm leading-7 text-white/65">Si necesitas estudiar este tema en tu institución o localidad, cuéntanos qué buscas. Podemos revisar contigo los datos disponibles y el apoyo que necesitas.</p><div className="mt-8 flex flex-wrap gap-4"><Button href={`/contact?from=${encodeURIComponent(`/analisis/${entry.slug}`)}`} variant="secondary" className="rounded-full border-white bg-white text-ink">Consultar con NOAM</Button><NextLink href={entry.serviceHref} className="inline-flex items-center text-sm text-white/75 hover:text-white">Conocer el servicio →</NextLink></div></Container></Section>
  </>;
}

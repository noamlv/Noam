import NextLink from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { analysisLibrary, getAnalysis } from "@/lib/analysis-library";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return analysisLibrary.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) { const entry = getAnalysis((await params).slug); return entry ? buildMetadata({ title: entry.title, description: entry.description, path: `/analisis/${entry.slug}` }) : {}; }

export default async function AnalysisPage({ params }: Props) {
  const entry = getAnalysis((await params).slug); if (!entry) notFound();
  return <><JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Análisis", path: "/analisis" }, { name: entry.title, path: `/analisis/${entry.slug}` }])} />
    <section className="bg-[#15211d] py-16 text-white md:py-24"><Container><NextLink href="/analisis" className="text-xs text-white/60 hover:text-white">← Biblioteca de análisis</NextLink><div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.8fr]"><div><Eyebrow className="text-[#d9a48f]">{entry.category}</Eyebrow><Heading as="h1" size="display" className="max-w-[16ch] text-white">{entry.headline}</Heading></div><div className="lg:self-end"><p className="text-base leading-8 text-white/70">{entry.description}</p><Button href={`/analisis/${entry.slug}/dashboard`} target="_blank" rel="noopener noreferrer" variant="secondary" className="mt-8 gap-3 rounded-full border-white bg-white text-ink">Ver dashboard <ArrowUpRight className="h-4 w-4" aria-hidden /></Button><p className="mt-3 text-xs text-white/50">Otra pestaña, dentro de noam.pe · {entry.scope}</p></div></div><p className="mt-12 border-t border-white/15 pt-5 text-xs leading-6 text-white/60">{entry.source} · {entry.period}</p></Container></section>
    <Section><Container><Eyebrow>Lo que permite observar</Eyebrow><Heading size="xl">Una lectura antes de explorar.</Heading><div className="mt-10 grid gap-8 md:grid-cols-3">{entry.findings.map((finding, index) => <article key={finding} className="border-t border-border pt-6"><p className="font-mono text-xs text-rust">0{index + 1}</p><p className="mt-5 text-base leading-8 text-ink/75">{finding}</p></article>)}</div></Container></Section>
    <Section className="border-y border-border bg-panel/45"><Container><div className="grid gap-10 md:grid-cols-[0.6fr_1fr]"><div><Eyebrow>Decisiones de gestión</Eyebrow><Heading size="xl">Del dato a una pregunta útil.</Heading></div><ul className="divide-y divide-border border-y border-border">{entry.questions.map((question) => <li key={question} className="py-6 text-lg leading-8">{question}</li>)}</ul></div></Container></Section>
    <Section><Container><div className="grid gap-10 md:grid-cols-[0.6fr_1fr]"><div><Eyebrow>Fuente y método</Eyebrow><Heading size="lg">Qué no debemos concluir.</Heading><a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-rust">Consultar fuente oficial <ArrowUpRight className="h-4 w-4" aria-hidden /></a></div><ul className="space-y-4 text-sm leading-7 text-muted">{entry.limits.map((limit) => <li key={limit} className="border-l border-border pl-5">{limit}</li>)}</ul></div></Container></Section>
    <Section className="bg-[#15211d] text-white"><Container><Eyebrow className="text-[#d9a48f]">Cómo puede ayudar NOAM</Eyebrow><Heading size="xl" className="max-w-3xl text-white">{entry.offer}</Heading><p className="mt-6 max-w-2xl text-sm leading-7 text-white/60">Adaptamos la pregunta, las fuentes y el entregable a tu institución o empresa. El análisis abierto es un punto de partida, no una propuesta cerrada.</p><div className="mt-8 flex flex-wrap gap-4"><Button href={`/contact?from=${encodeURIComponent(`/analisis/${entry.slug}`)}`} variant="secondary" className="rounded-full border-white bg-white text-ink">Conversar sobre una necesidad</Button><NextLink href={entry.serviceHref} className="inline-flex items-center text-sm text-white/70 hover:text-white">Ver enfoque de servicio →</NextLink></div></Container></Section>
  </>;
}

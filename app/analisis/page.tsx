import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import { analysisLibrary } from "@/lib/analysis-library";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Análisis y dashboards", description: "Residuos, planeamiento territorial, discapacidad, deporte y archivo electoral: análisis abiertos con fuentes y límites visibles.", path: "/analisis" });

export default function AnalysisLibraryPage() {
  return <><Section><Container><Eyebrow>Biblioteca de análisis</Eyebrow><Heading as="h1" size="display" className="max-w-[15ch]">Datos abiertos. Preguntas concretas.</Heading><p className="mt-7 max-w-2xl text-base leading-8 text-muted">Lecturas de gestión y exploradores para comenzar a investigar. Cada análisis identifica su fuente, periodo y límites; ninguno sustituye un diagnóstico local.</p></Container></Section><Section className="border-y border-border bg-panel/40"><Container><div className="divide-y divide-border border-t border-border">{analysisLibrary.map((entry, index) => <article key={entry.slug} className="grid gap-7 py-10 md:grid-cols-[60px_1fr_1fr]"><span className="font-mono text-xs text-rust">0{index + 1}</span><div><Eyebrow>{entry.category}</Eyebrow><h2 className="mt-4 text-3xl font-medium tracking-tight"><NextLink href={`/analisis/${entry.slug}`} className="hover:text-rust">{entry.title}</NextLink></h2><p className="mt-4 text-xs leading-6 text-muted">{entry.period}</p></div><div><p className="text-sm leading-7 text-ink/70">{entry.description}</p><NextLink href={`/analisis/${entry.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-rust">Leer análisis <ArrowRight className="h-4 w-4" aria-hidden /></NextLink></div></article>)}</div></Container></Section></>;
}

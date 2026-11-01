import Image from "next/image";
import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import type { AnalysisEntry } from "@/lib/analysis-library";
import { analysisPresentation } from "@/lib/analysis-presentation";

export function AnalysisCards({ entries }: { entries: AnalysisEntry[] }) {
  return <div className="grid gap-6 md:grid-cols-2">{entries.map((entry) => {
    const visual = analysisPresentation[entry.slug];
    return <article key={entry.slug} className="flex flex-col overflow-hidden rounded-[1.25rem] border border-border bg-white">
      <NextLink href={`/analisis/${entry.slug}`} className="group block overflow-hidden" tabIndex={-1} aria-hidden="true"><Image src={visual.image} alt="" width={836} height={470} sizes="(max-width: 768px) 100vw, 560px" className="aspect-[2.2/1] w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]" /></NextLink>
      <div className="flex flex-1 flex-col border-t-2 p-6 md:p-8" style={{ borderTopColor: visual.accent }}><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">{entry.category}</p><h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight"><NextLink href={`/analisis/${entry.slug}`} className="hover:text-rust">{entry.title}</NextLink></h2><p className="mt-4 text-sm leading-7 text-muted">{entry.description}</p><p className="mt-5 text-xs leading-6 text-muted">{entry.period}</p><NextLink href={`/analisis/${entry.slug}`} className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium text-ink hover:text-rust">Leer análisis y ver gráficos <ArrowRight className="h-4 w-4" aria-hidden /></NextLink></div>
    </article>;
  })}</div>;
}

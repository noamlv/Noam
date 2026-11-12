import Image from "next/image";
import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import type { AnalysisEntry } from "@/lib/analysis-library";
import { analysisPresentation } from "@/lib/analysis-presentation";
import { AnalysisImageCredit } from "./analysis-image-credit";

export function AnalysisCards({ entries }: { entries: AnalysisEntry[] }) {
  return <div className="grid gap-6 md:grid-cols-2">{entries.map((entry) => {
    const visual = analysisPresentation[entry.slug];
    return <article key={entry.slug} className="flex flex-col overflow-hidden rounded-[1.25rem] border border-border bg-white">
      <div className="relative">
        <NextLink href={`/analisis/${entry.slug}`} className="group relative block aspect-[2.2/1] overflow-hidden" tabIndex={-1} aria-hidden="true"><Image src={visual.image} alt="" fill sizes="(max-width: 768px) 100vw, 560px" className="object-cover transition-transform duration-200 group-hover:scale-[1.02]" style={{ objectPosition: visual.imagePosition }} /></NextLink>
        {visual.photoCredit && <div className="absolute bottom-0 right-0 rounded-tl-md bg-white/95 px-2.5 py-0.5"><AnalysisImageCredit credit={visual.photoCredit} /></div>}
      </div>
      <div className="flex flex-1 flex-col border-t-2 p-6 md:p-8" style={{ borderTopColor: visual.accent }}><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">{entry.category}</p><h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight"><NextLink href={`/analisis/${entry.slug}`} className="hover:text-rust">{entry.title}</NextLink></h2><p className="mt-4 text-sm leading-7 text-muted">{entry.description}</p><p className="mt-5 text-xs leading-6 text-muted">{entry.period}</p><NextLink href={`/analisis/${entry.slug}`} className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium text-ink hover:text-rust">Leer análisis y ver gráficos <ArrowRight className="h-4 w-4" aria-hidden /></NextLink></div>
    </article>;
  })}</div>;
}

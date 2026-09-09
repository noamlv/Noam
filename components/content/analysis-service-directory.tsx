import { ArrowRight } from "lucide-react";
import NextLink from "next/link";
import { analysisNeedPaths, sectorAnalysisPaths, type AnalysisServiceEntry } from "@/lib/analysis-service-catalog";

function DirectoryGroup({ title, description, entries, targetPrefix }: { title: string; description: string; entries: AnalysisServiceEntry[]; targetPrefix: string }) {
  return (
    <section>
      <div className="border-b border-ink pb-5">
        <h2 className="text-2xl font-medium tracking-[-0.035em] text-ink">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/62">{description}</p>
      </div>
      <div className="divide-y divide-border">
        {entries.map((entry, index) => (
          <NextLink key={entry.slug} href={entry.href} data-analytics-event="cta_click" data-analytics-target={`${targetPrefix}:${entry.slug}`} className="group grid gap-4 py-6 sm:grid-cols-[38px_minmax(0,0.72fr)_minmax(0,1fr)_auto] sm:items-start">
            <span className="font-mono text-[10px] text-rust">{String(index + 1).padStart(2, "0")}</span>
            <span><span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">{entry.label}</span><span className="mt-2 block text-lg font-medium leading-6 tracking-[-0.025em] text-ink">{entry.title}</span></span>
            <span className="text-sm leading-6 text-ink/62">{entry.description}</span>
            <ArrowRight className="hidden h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-rust sm:block" aria-hidden />
          </NextLink>
        ))}
      </div>
    </section>
  );
}

export function AnalysisServiceDirectory() {
  return (
    <div className="grid gap-14 xl:grid-cols-2 xl:gap-16">
      <DirectoryGroup title="Por tipo de encargo" description="Empieza por la pregunta que debe responderse, aunque todavía no sepas qué método o producto necesitas." entries={analysisNeedPaths} targetPrefix="services:need" />
      <DirectoryGroup title="Por tema de gestión" description="Rutas sectoriales con datos abiertos, límites de lectura, soluciones y TDR listos para adaptar." entries={sectorAnalysisPaths} targetPrefix="services:sector" />
    </div>
  );
}

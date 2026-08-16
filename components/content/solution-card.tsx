import { ArrowUpRight } from "lucide-react";
import NextLink from "next/link";
import type { Solution } from "@/lib/solutions";
import { cn } from "@/lib/utils";

export function SolutionCard({ solution, className }: { solution: Solution; className?: string }) {
  return (
    <NextLink href={`/solutions/${solution.slug}`} className={cn("group relative flex min-h-[330px] flex-col overflow-hidden rounded-md border border-border bg-panel p-7 transition-all duration-220 hover:-translate-y-0.5 hover:border-border-strong", className)}>
      <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: solution.accent }} />
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] text-rust">{solution.number}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">{solution.market}</span>
      </div>
      <h2 className="mt-10 text-2xl font-medium leading-tight tracking-[-0.035em] text-ink">{solution.title}</h2>
      <p className="mt-4 text-sm leading-7 text-ink/65">{solution.promise}</p>
      <div className="mt-auto flex items-end justify-between gap-6 border-t border-border pt-6">
        <span><span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Punto de partida</span><span className="mt-1 block text-sm font-medium text-ink">{solution.duration}</span></span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-rust transition-colors group-hover:border-rust group-hover:bg-rust group-hover:text-white"><ArrowUpRight className="h-4 w-4" aria-hidden /></span>
      </div>
    </NextLink>
  );
}

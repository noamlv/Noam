import { ArrowRight, ShieldCheck } from "lucide-react";
import NextLink from "next/link";
import { ResourceThumb } from "@/components/content/resource-thumb";
import { cn } from "@/lib/utils";
import type { ContentItem } from "@/types/content";

interface InstitutionalCaseCardProps {
  item: ContentItem;
  index?: number;
  className?: string;
}

export function InstitutionalCaseCard({ item, index, className }: InstitutionalCaseCardProps) {
  return (
    <article className={cn("group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.25rem] border border-border bg-panel shadow-hairline transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-subtle", className)}>
      <ResourceThumb item={item} className="h-36 border-b border-border" />
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-rust">Experiencia institucional</p>
            <p className="mt-2 text-xs leading-5 text-muted">{item.client} · {item.period}</p>
          </div>
          {typeof index === "number" ? <span className="font-mono text-[10px] text-muted/70">{String(index + 1).padStart(2, "0")}</span> : null}
        </div>
        <h2 className="mt-7 text-2xl font-medium leading-[1.08] tracking-[-0.035em] text-ink">{item.title}</h2>
        <p className="mt-4 text-sm leading-7 text-ink/65">{item.description}</p>
        {item.outcome ? <p className="mt-5 border-l border-rust/50 pl-4 text-xs leading-6 text-ink/72">{item.outcome}</p> : null}
        <div className="mt-auto pt-8">
          <div className="flex items-start gap-2 border-t border-border pt-5 text-[10px] leading-5 text-muted">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rust" aria-hidden />
            <span>Versión pública sin entregables ni información reservada.</span>
          </div>
          <NextLink href={item.url} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-rust">
            Examinar caso <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </NextLink>
        </div>
      </div>
    </article>
  );
}

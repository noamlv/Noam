import NextLink from "next/link";
import { Badge } from "@/components/ui/badge";
import { ResourceThumb } from "@/components/content/resource-thumb";
import { contentTypeLabel, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { ContentItem } from "@/types/content";

interface ResourceRowProps {
  item: ContentItem;
  className?: string;
}

export function ResourceRow({ item, className }: ResourceRowProps) {
  return (
    <NextLink
      href={item.url}
      className={cn(
        "group grid grid-cols-[72px_1fr] items-center gap-4 rounded-md border border-border bg-panel p-3 transition-all duration-220 hover:border-border-strong hover:bg-canvas md:grid-cols-[96px_1fr_auto] md:gap-6 md:p-4",
        className
      )}
    >
      <ResourceThumb item={item} compact className="h-[72px] w-[72px] rounded-sm border border-border md:h-[96px] md:w-[96px]" />

      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge className="text-[10px]">{contentTypeLabel(item.type)}</Badge>
          <time className="text-xs text-muted" dateTime={item.date}>
            {formatDate(item.date)}
          </time>
        </div>
        <h3 className="line-clamp-2 text-base font-medium tracking-[-0.015em] text-ink md:text-lg">{item.title}</h3>
      </div>

      <span className="hidden text-sm font-medium tracking-[-0.01em] text-muted transition-colors duration-220 group-hover:text-ink md:inline">
        Leer
      </span>
    </NextLink>
  );
}

import { Grid } from "@/components/ui/grid";
import { ResourceCard } from "@/components/ui/resource-card";
import { ResourceRow } from "@/components/ui/resource-row";
import { cn } from "@/lib/utils";
import type { ContentItem } from "@/types/content";

interface ResourceListProps {
  items: ContentItem[];
  variant?: "grid" | "rows";
  className?: string;
}

export function ResourceList({ items, variant = "grid", className }: ResourceListProps) {
  if (variant === "rows") {
    return (
      <div className={cn("space-y-3 md:space-y-4", className)}>
        {items.map((item) => (
          <ResourceRow key={item.url} item={item} />
        ))}
      </div>
    );
  }

  return (
    <Grid className={cn("md:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item) => (
        <ResourceCard key={item.url} item={item} />
      ))}
    </Grid>
  );
}

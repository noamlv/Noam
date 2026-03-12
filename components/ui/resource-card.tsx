import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { Tag } from "@/components/ui/tag";
import { formatDate } from "@/lib/utils";
import type { ContentItem } from "@/types/content";

interface ResourceCardProps {
  item: ContentItem;
}

export function ResourceCard({ item }: ResourceCardProps) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between gap-3">
        <Badge>{item.type.slice(0, -1)}</Badge>
        <time className="text-xs text-muted" dateTime={item.date}>
          {formatDate(item.date)}
        </time>
      </div>
      <h3 className="mb-2 text-2xl font-medium tracking-[-0.02em] text-ink">{item.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-ink/80">{item.description}</p>
      <div className="mb-5 flex flex-wrap gap-2">
        {item.tags.slice(0, 3).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <Link href={item.url}>Ver detalle</Link>
    </Card>
  );
}

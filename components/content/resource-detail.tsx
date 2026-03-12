import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { RenderMdx } from "@/components/mdx/render-mdx";
import { Badge, Container, Prose, Section, Tag } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import type { ContentItem } from "@/types/content";

interface ResourceDetailProps {
  item: ContentItem;
  body: string;
  parentLabel: string;
  parentHref: string;
}

export function ResourceDetail({ item, body, parentLabel, parentHref }: ResourceDetailProps) {
  return (
    <Section className="pt-14 md:pt-20">
      <Container className="max-w-site-sm">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: parentLabel, href: parentHref },
            { label: item.title, href: item.url }
          ]}
        />

        <header className="mb-8 border-b border-border pb-8">
          <div className="mb-4 flex items-center gap-3">
            <Badge>{item.type.slice(0, -1)}</Badge>
            <time dateTime={item.date} className="text-xs text-muted">
              {formatDate(item.date)}
            </time>
          </div>
          <h1 className="mb-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">{item.title}</h1>
          <p className="max-w-2xl text-base text-ink/80">{item.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </header>

        <Prose>
          <RenderMdx source={body} />
        </Prose>
      </Container>
    </Section>
  );
}

import { ArrowLeft, ArrowRight } from "lucide-react";
import NextLink from "next/link";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { ResourceThumb } from "@/components/content/resource-thumb";
import { ShareActions } from "@/components/content/share-actions";
import { RenderMdx } from "@/components/mdx/render-mdx";
import { Badge, Container, Eyebrow, Heading, Prose, ResourceList, Section, Tag } from "@/components/ui";
import { getContentForTopic } from "@/lib/content";
import { topicLabels } from "@/lib/site-config";
import { contentTypeLabel, formatDate } from "@/lib/utils";
import type { ContentItem } from "@/types/content";

interface ResourceDetailProps {
  item: ContentItem;
  body: string;
  parentLabel: string;
  parentHref: string;
}

export async function ResourceDetail({ item, body, parentLabel, parentHref }: ResourceDetailProps) {
  const isInstitutionalCase = item.type === "cases" && item.caseType === "institutional";
  const related = (await getContentForTopic(item.topic))
    .filter((candidate) => candidate.url !== item.url && candidate.type !== "services")
    .slice(0, 3);

  return (
    <>
      <div className="pt-8 md:pt-10">
        <Container><Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: parentLabel, href: parentHref }, { label: item.title, href: item.url }]} /></Container>
      </div>

      <section className="overflow-hidden bg-[#15211d] py-12 text-white md:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.38fr] lg:items-end lg:gap-20">
            <header>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="border-white/20 text-[#d9a48f]">{contentTypeLabel(item.type)}</Badge>
                <time dateTime={item.date} className="text-xs text-white/55">{formatDate(item.date)}</time>
                {item.readingTime ? <span className="text-xs text-white/55">{item.readingTime}</span> : null}
              </div>
              <h1 className="mt-7 max-w-[18ch] text-4xl font-medium leading-[1.04] tracking-[-0.05em] text-white md:text-6xl">{item.title}</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/68 md:text-lg">{item.description}</p>
              {item.outcome ? <p className="mt-7 max-w-2xl border-l border-[#d9a48f] pl-4 text-sm font-medium leading-6 text-white/78">{item.outcome}</p> : null}
              {isInstitutionalCase ? (
                <dl className="mt-9 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-2">
                  {[
                    ["Cliente", item.client],
                    ["Periodo", item.period],
                    ["Encargo", item.engagement],
                    ["Evidencia", item.evidence]
                  ].map(([label, value]) => value ? (
                    <div key={label} className="bg-[#15211d] p-4">
                      <dt className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/45">{label}</dt>
                      <dd className="mt-2 text-xs leading-5 text-white/78">{value}</dd>
                    </div>
                  ) : null)}
                </dl>
              ) : null}
              <ShareActions title={item.title} path={item.url} theme="dark" className="mt-7" />
            </header>
            <ResourceThumb item={item} className="aspect-square w-full max-w-[360px] justify-self-start rounded-[1.25rem] border border-white/15 shadow-visual lg:justify-self-end" />
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.25fr_minmax(0,0.75fr)] lg:gap-20">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">Tema</p>
              <NextLink href={`/topics/${item.topic}`} className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-rust">{topicLabels[item.topic]} <ArrowRight className="h-3.5 w-3.5" /></NextLink>
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">Etiquetas</p>
                <div className="mt-3 flex flex-wrap gap-2">{item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
              </div>
              <NextLink href={parentHref} className="mt-8 inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-ink"><ArrowLeft className="h-3.5 w-3.5" /> Volver a {parentLabel.toLowerCase()}</NextLink>
            </aside>
            <article className="min-w-0 max-w-[780px]">
              {isInstitutionalCase && item.disclosure ? (
                <div className="mb-10 border-l border-rust bg-rust/[0.04] px-5 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-rust">Divulgación responsable</p>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{item.disclosure}</p>
                </div>
              ) : null}
              <Prose><RenderMdx source={body} /></Prose>
            </article>
          </div>
        </Container>
      </Section>

      {related.length ? (
        <Section className="border-y border-border bg-panel/45">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.36fr_1fr] lg:gap-20">
              <div><Eyebrow>Continuar</Eyebrow><Heading size="lg">Más evidencia sobre {topicLabels[item.topic].toLowerCase()}.</Heading></div>
              <ResourceList items={related} variant="rows" />
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}

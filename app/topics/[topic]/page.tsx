import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { PracticeVisual } from "@/components/brand/practice-visual";
import { SolutionCard } from "@/components/content/solution-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, ResourceList, Section } from "@/components/ui";
import { getContentForTopic } from "@/lib/content";
import { editorialCollections, editorialPillars } from "@/lib/editorial";
import { breadcrumbJsonLd, buildMetadata, ogImagePath } from "@/lib/seo";
import { solutions } from "@/lib/solutions";
import { topicLabels } from "@/lib/site-config";
import { TOPICS, type Topic } from "@/types/content";

interface TopicPageProps {
  params: Promise<{ topic: Topic }>;
}

export function generateStaticParams() {
  return TOPICS.map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { topic } = await params;
  if (!TOPICS.includes(topic)) return {};
  const pillar = editorialPillars[topic];
  return buildMetadata({ title: pillar.title, description: pillar.description, path: `/topics/${topic}`, image: ogImagePath("topics", topic) });
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params;
  if (!TOPICS.includes(topic)) notFound();

  const pillar = editorialPillars[topic];
  const items = await getContentForTopic(topic);
  const editorialItems = items.filter((item) => item.type !== "services");
  const relatedSolutions = pillar.solutionSlugs.map((slug) => solutions.find((solution) => solution.slug === slug)).filter(Boolean);
  const path = `/topics/${topic}`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Evidencia", path: "/evidence" }, { name: topicLabels[topic], path }])} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1fr] lg:items-center lg:gap-20">
            <div>
              <Eyebrow className="reveal text-[#d9a48f]">{pillar.eyebrow}</Eyebrow>
              <Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[13ch] text-white">{pillar.title}</Heading>
              <p className="reveal reveal-delay-2 mt-7 max-w-2xl text-base leading-8 text-white/68">{pillar.description}</p>
              <p className="reveal reveal-delay-3 mt-7 max-w-2xl border-l border-[#d9a48f] pl-4 text-sm font-medium leading-6 text-white/78">{pillar.thesis}</p>
              <Button href={pillar.primaryHref} variant="ghost" className="reveal reveal-delay-3 mt-8 gap-2 !text-white/70 hover:!text-white">{pillar.primaryLabel} <ArrowRight className="h-4 w-4" /></Button>
            </div>
            <PracticeVisual labels={pillar.questions} accent={pillar.accent} className="reveal reveal-delay-2" />
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container>
          <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {editorialCollections.slice(0, 3).map((collection) => {
              const count = editorialItems.filter((item) => item.type === collection.type).length;
              return <div key={collection.type} className="py-7 sm:px-7 sm:first:pl-0"><p className="text-3xl font-medium tracking-[-0.045em] text-ink">{count}</p><p className="mt-2 text-xs text-muted">{collection.label.toLowerCase()} sobre {topicLabels[topic].toLowerCase()}</p></div>;
            })}
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Lecturas recientes</Eyebrow><Heading size="xl">Un criterio que se puede examinar.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Cada publicación explicita problema, datos, método, hallazgos y límites.</p></div>
            <ResourceList items={editorialItems.slice(0, 6)} variant="rows" />
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><Eyebrow>Por formato</Eyebrow><Heading size="xl">Estudiar, aplicar y comprobar.</Heading></div><Button href="/evidence" variant="ghost" className="justify-start gap-2">Toda la biblioteca <ArrowRight className="h-4 w-4" /></Button></div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {editorialCollections.map((collection) => {
              const collectionItems = editorialItems.filter((item) => item.type === collection.type);
              return <NextLink key={collection.type} href={collection.href} className="group flex min-h-[260px] flex-col rounded-md border border-border bg-canvas p-6 transition-all hover:-translate-y-0.5 hover:border-border-strong"><span className="font-mono text-[10px] text-rust">{String(collectionItems.length).padStart(2, "0")}</span><h2 className="mt-10 text-xl font-medium tracking-[-0.03em] text-ink">{collection.label}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{collection.description}</p><span className="mt-auto inline-flex items-center gap-2 pt-7 text-xs font-medium text-rust">Explorar <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span></NextLink>;
            })}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Aplicación</Eyebrow><Heading size="xl">De una idea a un encargo concreto.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Estas soluciones convierten el criterio editorial en trabajo aplicable a una institución.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">{relatedSolutions.map((solution) => solution ? <SolutionCard key={solution.slug} solution={solution} /> : null)}</div>
          </div>
        </Container>
      </Section>
    </>
  );
}

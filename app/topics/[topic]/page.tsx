import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBlock, Container, Eyebrow, Heading, ResourceList, Section } from "@/components/ui";
import { JsonLd } from "@/components/seo/json-ld";
import { getTopicBundle } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { topicLabels } from "@/lib/site-config";
import { TOPICS, type Topic } from "@/types/content";

interface TopicPageProps {
  params: Promise<{ topic: Topic }>;
}

export async function generateStaticParams() {
  return TOPICS.map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { topic } = await params;

  if (!TOPICS.includes(topic)) {
    return {};
  }

  return buildMetadata({
    title: `Topic: ${topicLabels[topic]}`,
    description: `Contenido agregado de ${topicLabels[topic]} en insights, indicadores, toolkits, servicios y casos.`,
    path: `/topics/${topic}`
  });
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params;

  if (!TOPICS.includes(topic)) {
    notFound();
  }

  const items = await getTopicBundle(topic);

  return (
    <Section className="pt-16 md:pt-20">
      <Container>
        <JsonLd
          data={
            breadcrumbJsonLd([
              { name: "Inicio", path: "/" },
              { name: topicLabels[topic], path: `/topics/${topic}` }
            ])
          }
        />
        <Eyebrow>Topic</Eyebrow>
        <Heading className="mb-4">{topicLabels[topic]}: evidencia, ejecucion y negocio.</Heading>
        <p className="mb-8 max-w-2xl text-sm text-ink/80">
          Curacion transversal de contenido para acelerar criterio de decision y pasar de analisis a accion.
        </p>

        <ResourceList items={items} />

        <div className="mt-12">
          <CtaBlock
            title="Necesitas una agenda priorizada para este tema?"
            description="Disenamos un sprint de 2-4 semanas para traducir insights en decisiones y resultados medibles."
            href="/contact"
            buttonLabel="Solicitar sprint"
          />
        </div>
      </Container>
    </Section>
  );
}

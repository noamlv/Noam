import { CtaBlock, Eyebrow, Heading, ResourceList, Section, Container } from "@/components/ui";
import type { ContentItem } from "@/types/content";

interface ResourceIndexProps {
  eyebrow: string;
  title: string;
  description: string;
  items: ContentItem[];
}

export function ResourceIndex({ eyebrow, title, description, items }: ResourceIndexProps) {
  return (
    <Section className="pt-14 md:pt-20">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading className="max-w-3xl">{title}</Heading>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/80">{description}</p>

        <div className="mt-10">
          <ResourceList items={items} />
        </div>

        <div className="mt-12">
          <CtaBlock
            title="Llevemos esta capacidad a tu contexto"
            description="Podemos convertir una pregunta, una fuente de datos o una necesidad de gestión en un alcance concreto para tu equipo."
            href="/contact"
            buttonLabel="Plantear un desafío"
          />
        </div>
      </Container>
    </Section>
  );
}

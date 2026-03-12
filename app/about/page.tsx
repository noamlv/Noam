import { JsonLd } from "@/components/seo/json-ld";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sobre NOAM",
  description: "Equipo, enfoque y estandares de trabajo de NOAM.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <Section className="pt-16 md:pt-20">
      <Container className="max-w-site-sm">
        <JsonLd
          data={
            breadcrumbJsonLd([
              { name: "Inicio", path: "/" },
              { name: "Sobre NOAM", path: "/about" }
            ])
          }
        />
        <Eyebrow>Sobre NOAM</Eyebrow>
        <Heading className="mb-4">Think tank operativo para decisiones de alta complejidad.</Heading>
        <p className="mb-4 text-sm leading-relaxed text-ink/85">
          NOAM combina producto, estrategia y evidencia para resolver decisiones donde conviven riesgo politico, financiero y tecnologico.
        </p>
        <p className="text-sm leading-relaxed text-ink/85">
          Operamos con enfoque de sprint: hipotesis claras, trazabilidad de fuentes, validacion temprana y entregables accionables.
        </p>
      </Container>
    </Section>
  );
}

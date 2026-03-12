import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";

export const metadata = buildMetadata({
  title: "Contacto",
  description: "Agenda una conversacion con NOAM.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <Section className="pt-16 md:pt-20">
      <Container className="max-w-site-sm">
        <JsonLd
          data={
            breadcrumbJsonLd([
              { name: "Inicio", path: "/" },
              { name: "Contacto", path: "/contact" }
            ])
          }
        />
        <Eyebrow>Contacto</Eyebrow>
        <Heading className="mb-4">Cuentame el contexto y disenamos el primer sprint.</Heading>
        <p className="mb-8 text-sm text-ink/80">
          Respondemos en menos de 24 horas con una propuesta de alcance, tiempos y entregables.
        </p>

        <form action="/contact/thank-you" method="get" className="space-y-4 rounded-md border border-border bg-panel p-6 shadow-subtle">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">
              Nombre
            </label>
            <input id="name" name="name" required className="w-full rounded-sm border border-border bg-canvas px-3 py-2 text-sm text-ink" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-sm border border-border bg-canvas px-3 py-2 text-sm text-ink"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink">
              Objetivo principal
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full rounded-sm border border-border bg-canvas px-3 py-2 text-sm text-ink"
            />
          </div>

          <Button type="submit">Enviar</Button>
        </form>
      </Container>
    </Section>
  );
}

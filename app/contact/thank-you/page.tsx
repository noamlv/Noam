import { Button, Container, Section } from "@/components/ui";

export default function ThankYouPage() {
  return (
    <Section className="pt-20">
      <Container className="max-w-site-sm text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">Mensaje enviado</p>
        <h1 className="mb-4 text-5xl font-medium tracking-[-0.04em] text-ink">Gracias por escribir.</h1>
        <p className="mb-8 text-sm text-ink/80">Revisaremos el contexto y te contactaremos para definir el siguiente paso.</p>
        <Button href="/" className="rounded-full">Volver al inicio</Button>
      </Container>
    </Section>
  );
}

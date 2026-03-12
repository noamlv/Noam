import { Button, Container, Section } from "@/components/ui";

export default function ThankYouPage() {
  return (
    <Section className="pt-20">
      <Container className="max-w-site-sm text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">Mensaje enviado</p>
        <h1 className="mb-4 font-serif text-5xl text-ink">Gracias por escribir.</h1>
        <p className="mb-8 text-sm text-ink/80">Te contactaremos pronto con una propuesta de siguiente paso.</p>
        <Button href="/">Volver al inicio</Button>
      </Container>
    </Section>
  );
}

import { Button, Container, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section className="pt-20">
      <Container className="max-w-site-sm text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted">404</p>
        <h1 className="mb-4 font-serif text-5xl text-ink">Pagina no encontrada</h1>
        <p className="mb-8 text-sm text-ink/80">El recurso que buscas no existe o fue movido.</p>
        <Button href="/">Volver al inicio</Button>
      </Container>
    </Section>
  );
}

import { Button, Container, Section } from "@/components/ui";

export default function EnglishLandingPage() {
  return (
    <Section className="pt-20">
      <Container className="max-w-site-sm">
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">English Version</p>
        <h1 className="mb-4 font-serif text-5xl text-ink">NOAM in English is prepared.</h1>
        <p className="mb-8 text-sm text-ink/80">
          Core routes, metadata alternates, and IA are ready for localized content. Full EN copy rollout is queued for V2.
        </p>
        <Button href="/">Ir a version en espanol</Button>
      </Container>
    </Section>
  );
}

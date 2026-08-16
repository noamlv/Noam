import { ArrowRight, Compass } from "lucide-react";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section className="border-b border-border pb-24 pt-16 md:pb-32 md:pt-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1fr] lg:items-end lg:gap-24">
          <div>
            <Eyebrow className="text-rust">Error 404</Eyebrow>
            <Heading as="h1" size="display" className="max-w-[12ch]">
              Esta ruta ya no conduce a una página.
            </Heading>
          </div>
          <div className="border-t border-border pt-7">
            <Compass className="h-6 w-6 text-rust" aria-hidden />
            <p className="mt-7 max-w-xl text-base leading-8 text-ink/68">
              El contenido pudo cambiar de ubicación. Puedes volver al inicio, explorar la evidencia pública o contarnos qué estabas buscando.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/" className="rounded-full">Volver al inicio</Button>
              <Button href="/evidence" variant="ghost" className="gap-2">
                Explorar evidencia <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

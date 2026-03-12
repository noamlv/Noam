import fs from "node:fs";
import path from "node:path";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const pdfPath = "/docs/noam-cv.pdf";

export const metadata = buildMetadata({
  title: "CV | Noam Lopez",
  description: "Perfil profesional y trayectoria de Noam Lopez.",
  path: "/cv"
});

export default function CvPage() {
  const absolutePath = path.join(process.cwd(), "public", pdfPath.replace(/^\//, ""));
  const hasPdf = fs.existsSync(absolutePath);

  return (
    <Section className="pt-16 md:pt-20">
      <Container>
        <JsonLd
          data={
            breadcrumbJsonLd([
              { name: "Inicio", path: "/" },
              { name: "CV", path: "/cv" }
            ])
          }
        />

        <Eyebrow>Perfil profesional</Eyebrow>
        <Heading as="h1" size="xl" className="max-w-3xl">
          CV documentado
        </Heading>

        {hasPdf ? (
          <>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={pdfPath} target="_blank" rel="noreferrer">
                Abrir PDF
              </Button>
              <Button href={pdfPath} variant="secondary" target="_blank" rel="noreferrer">
                Descargar
              </Button>
            </div>

            <div className="mt-8 overflow-hidden rounded-md border border-border bg-panel shadow-subtle">
              <iframe
                src={`${pdfPath}#view=FitH`}
                title="CV de Noam"
                className="h-[72vh] w-full"
              />
            </div>
          </>
        ) : (
          <div className="mt-8 rounded-md border border-border bg-panel p-6 text-sm text-ink/80">
            Falta cargar el PDF en <code>public/docs/noam-cv.pdf</code>. En cuanto lo subas, esta pagina lo mostrara automaticamente.
          </div>
        )}
      </Container>
    </Section>
  );
}

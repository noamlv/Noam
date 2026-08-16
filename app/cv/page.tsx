import { ArrowRight, Download } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { noamProfile } from "@/lib/profile";
import { breadcrumbJsonLd, buildMetadata, personJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Noam López Villanes | Perfil profesional",
  description: "Doctor en Ciencia Política y Gobierno, fundador de NOAM. Trayectoria en investigación, gestión pública, evaluación, datos y análisis electoral.",
  path: "/cv"
});

export default function CvPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Sobre NOAM", path: "/about" }, { name: "Perfil profesional", path: "/cv" }])} />
      <JsonLd data={personJsonLd()} />

      <section className="border-b border-border bg-[#15211d] py-16 text-white md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div>
              <Eyebrow className="text-white/48">Perfil profesional</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[12ch] text-white">{noamProfile.name}</Heading>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65 md:text-xl">{noamProfile.headline}</p>
            </div>
            <div>
              <Button href={noamProfile.cvPdf} target="_blank" rel="noreferrer" className="gap-2 !bg-white !text-ink hover:!bg-white/90">Descargar CV público <Download className="h-4 w-4" /></Button>
              <p className="mt-4 max-w-sm text-xs leading-5 text-white/44">Versión pública resumida. Excluye datos personales, identificadores y documentación de respaldo.</p>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.36fr_1fr] lg:gap-20">
            <div><Eyebrow>Perfil</Eyebrow><Heading size="lg">Evidencia que entra en la decisión.</Heading></div>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-ink/68">
              {noamProfile.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.36fr_1fr] lg:gap-20">
            <div><Eyebrow>Formación</Eyebrow><Heading size="lg">Base académica.</Heading></div>
            <div className="divide-y divide-border border-y border-border">
              {noamProfile.credentials.map((credential, index) => (
                <div key={credential} className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr] sm:items-start">
                  <span className="text-xs font-semibold text-rust">0{index + 1}</span>
                  <p className="text-base leading-7 text-ink/78">{credential}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.36fr_1fr] lg:gap-20">
            <div><Eyebrow>Trayectoria</Eyebrow><Heading size="lg">Experiencia seleccionada.</Heading><p className="mt-5 max-w-sm text-sm leading-6 text-ink/60">Una síntesis orientada a las capacidades que hoy convergen en NOAM.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2">
              <article className="bg-canvas p-6 md:p-8">
                <h2 className="text-lg font-medium text-ink">Investigación y proyectos recientes</h2>
                <ul className="mt-6 divide-y divide-border">{noamProfile.researchAndTeaching.map((item) => <li key={item} className="py-4 text-sm leading-6 text-ink/70 first:pt-0 last:pb-0">{item}</li>)}</ul>
              </article>
              <article className="bg-canvas p-6 md:p-8">
                <h2 className="text-lg font-medium text-ink">Dirección pública</h2>
                <ul className="mt-6 divide-y divide-border">{noamProfile.publicLeadership.map((item) => <li key={item} className="py-4 text-sm leading-6 text-ink/70 first:pt-0 last:pb-0">{item}</li>)}</ul>
              </article>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.36fr_1fr] lg:gap-20">
            <div><Eyebrow>Capacidades</Eyebrow><Heading size="lg">Problemas, métodos y productos.</Heading></div>
            <div>
              <div className="flex flex-wrap gap-2">{noamProfile.expertise.map((item) => <span key={item} className="rounded-full border border-border bg-panel px-4 py-2 text-sm text-ink/70">{item}</span>)}</div>
              <div className="mt-10 border-t border-border pt-8">
                <p className="max-w-3xl text-base leading-8 text-ink/68">La experiencia profesional se traduce en estudios, evaluaciones, observatorios, sistemas de decisión y proyectos de transformación institucional. El objetivo no es exhibir herramientas, sino construir capacidad útil y verificable.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <section className="border-t border-border py-12 md:py-16">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div><Eyebrow>Contacto</Eyebrow><p className="max-w-xl text-xl font-medium tracking-[-0.025em] text-ink md:text-2xl">¿Hay un problema público u organizacional que necesita evidencia y ejecución?</p></div>
            <NextLink href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-rust transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-4">Conversemos <ArrowRight className="h-4 w-4" /></NextLink>
          </div>
        </Container>
      </section>
    </>
  );
}

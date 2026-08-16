import fs from "node:fs";
import path from "node:path";
import { ArrowRight, Code2, ExternalLink, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { noamProfile } from "@/lib/profile";
import { breadcrumbJsonLd, buildMetadata, personJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sobre NOAM | Dirección y principios",
  description: "Conoce la tesis, los principios y la dirección de NOAM, firma peruana de inteligencia pública, territorial y organizacional.",
  path: "/about"
});

const icons = { linkedin: ExternalLink, github: Code2, whatsapp: MessageCircle, mail: Mail } as const;
const principles = [
  { number: "01", title: "La decisión primero", text: "El método y la tecnología se eligen a partir del problema que debe resolverse." },
  { number: "02", title: "Rigor trazable", text: "Fuentes, supuestos, limitaciones y criterios deben poder examinarse." },
  { number: "03", title: "Diseño para el uso", text: "Un entregable vale cuando mejora una conversación, un proceso o una acción." },
  { number: "04", title: "Capacidad transferible", text: "Buscamos que los equipos puedan sostener y ampliar lo construido." }
];

export default function AboutPage() {
  const photoPath = path.join(process.cwd(), "public", noamProfile.photo.replace(/^\//, ""));
  const hasPhoto = fs.existsSync(photoPath);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "NOAM", path: "/about" }])} />
      <JsonLd data={personJsonLd()} />

      <Section className="pb-16 pt-14 md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div>
              <Eyebrow className="text-rust">NOAM</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[15ch]">Inteligencia para instituciones que mueven el territorio.</Heading>
            </div>
            <p className="text-sm leading-7 text-ink/68 md:text-base">Somos una firma peruana que integra investigación, datos, estrategia y producto digital para mejorar decisiones públicas y empresariales.</p>
          </div>
        </Container>
      </Section>

      <section className="border-y border-border bg-[#15211d] py-16 text-white md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.58fr_1fr] lg:gap-20">
            <div><Eyebrow className="text-white/55">Nuestra tesis</Eyebrow><Heading size="xl" className="text-white">La información no cambia una institución por sí sola.</Heading></div>
            <div className="space-y-6 text-lg leading-8 text-white/68 md:text-xl md:leading-9">
              <p>El cambio ocurre cuando la evidencia entra en una decisión, se convierte en una herramienta y encuentra responsables capaces de utilizarla.</p>
              <p>NOAM trabaja precisamente en esa intersección: comprender el problema, construir evidencia y diseñar la capacidad que permite actuar.</p>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.45fr_1fr] lg:gap-20">
            <div><Eyebrow>Principios</Eyebrow><Heading size="xl">Cómo abordamos cada encargo.</Heading></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {principles.map((principle) => (
                <article key={principle.number} className="min-h-[220px] bg-panel p-6">
                  <span className="text-xs font-semibold text-rust">{principle.number}</span>
                  <h2 className="mt-10 text-xl font-medium text-ink">{principle.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/65">{principle.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Dirección</Eyebrow>
              <div className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-[1.25rem] bg-[radial-gradient(circle_at_70%_20%,rgba(185,83,55,.35),transparent_36%),#15211d] shadow-visual">
                {hasPhoto ? (
                  <Image src={noamProfile.photo} alt={`Retrato de ${noamProfile.name}`} fill sizes="(min-width: 1024px) 360px, 85vw" className="object-cover" priority />
                ) : (
                  <div className="flex h-full items-end p-7 text-white">
                    <div><p className="text-6xl font-medium tracking-[-0.06em]">NL</p><p className="mt-3 text-[10px] uppercase tracking-[0.17em] text-white/50">Retrato pendiente</p></div>
                  </div>
                )}
              </div>
              <p className="mt-4 max-w-sm text-xs leading-5 text-ink/52">La trayectoria del fundador respalda el método; el trabajo de NOAM se evalúa por la calidad de su evidencia y sus entregables.</p>
            </div>

            <div className="lg:pt-10">
              <Heading size="xl">{noamProfile.name}</Heading>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-rust">{noamProfile.role}</p>
              <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-ink/68">
                {noamProfile.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/cv" variant="secondary" className="rounded-full">Ver trayectoria</Button>
                <Button href={noamProfile.cvPdf} target="_blank" rel="noreferrer" variant="ghost" className="gap-2">Descargar CV público <ArrowRight className="h-4 w-4" /></Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {noamProfile.socials.map((social) => {
                  const Icon = icons[social.kind];
                  return <a key={social.href} href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel={social.href.startsWith("http") ? "noreferrer" : undefined} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-canvas text-ink transition-colors hover:border-rust hover:text-rust focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2" aria-label={social.label}><Icon className="h-4 w-4" /></a>;
                })}
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-border bg-border lg:grid-cols-2">
            <article className="bg-canvas p-6 md:p-8">
              <Eyebrow>Investigación y proyectos recientes</Eyebrow>
              <ul className="mt-7 divide-y divide-border">
                {noamProfile.researchAndTeaching.map((item) => <li key={item} className="py-4 text-sm leading-6 text-ink/72 first:pt-0 last:pb-0">{item}</li>)}
              </ul>
            </article>
            <article className="bg-canvas p-6 md:p-8">
              <Eyebrow>Dirección pública seleccionada</Eyebrow>
              <ul className="mt-7 divide-y divide-border">
                {noamProfile.publicLeadership.map((item) => <li key={item} className="py-4 text-sm leading-6 text-ink/72 first:pt-0 last:pb-0">{item}</li>)}
              </ul>
            </article>
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <Eyebrow>Áreas que convergen en NOAM</Eyebrow>
            <div className="mt-5 flex flex-wrap gap-2">
              {noamProfile.expertise.map((item) => <span key={item} className="rounded-full border border-border bg-canvas px-4 py-2 text-xs font-medium text-ink/68">{item}</span>)}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-0">
        <Container><NextLink href="/contact" className="group flex flex-col gap-8 rounded-[1.5rem] bg-rust p-8 text-white transition-colors hover:bg-rust/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-4 md:flex-row md:items-end md:justify-between md:p-12"><Heading size="lg" className="max-w-3xl text-white">Construyamos una respuesta a la medida del desafío, no un paquete genérico.</Heading><span className="inline-flex items-center gap-2 text-sm font-medium">Conversemos <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></NextLink></Container>
      </Section>
    </>
  );
}

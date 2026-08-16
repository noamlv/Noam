import { ArrowRight, Rss } from "lucide-react";
import NextLink from "next/link";
import { BriefSignalGrid } from "@/components/brief/brief-signal-grid";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { briefEditions, getLatestBriefEdition } from "@/lib/brief";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Brief NOAM",
  description: "Lecturas breves, verificables y accionables sobre gestión pública, territorio, elecciones, datos e IA aplicada.",
  path: "/brief"
});

const formatDate = (date: string) => new Intl.DateTimeFormat("es-PE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));

export default function BriefArchivePage() {
  const latest = getLatestBriefEdition();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Brief NOAM", path: "/brief" }])} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="reveal text-[#d9a48f]">Inteligencia editorial · NOAM</Eyebrow>
              <Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[10ch] text-white">Una señal útil para decidir.</Heading>
              <p className="reveal reveal-delay-2 mt-7 max-w-xl text-base leading-8 text-white/64">Datos, métodos y preguntas convertidos en una lectura breve. Cada edición muestra fuentes, límites y un siguiente paso posible.</p>
              <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3"><Button href={`/brief/${latest.slug}`} variant="secondary" className="rounded-full border-white bg-white text-ink">Leer la última edición</Button><Button href="/newsletter" variant="ghost" className="!text-white/65 hover:!text-white">Recibir por email</Button></div>
            </div>
            <BriefSignalGrid signals={latest.signals} compact />
          </div>
        </Container>
      </section>

      <section className="border-b border-border"><Container><div className="flex flex-col gap-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between"><p>{briefEditions.length} edición publicada · Cadencia basada en relevancia, como máximo semanal.</p><NextLink href="/brief/rss.xml" className="inline-flex items-center gap-2 font-medium text-ink transition-colors hover:text-rust"><Rss className="h-3.5 w-3.5" aria-hidden /> RSS del Brief</NextLink></div></Container></section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.34fr_1fr] lg:gap-20">
            <div><Eyebrow>Última edición</Eyebrow><Heading size="xl">Breve no significa superficial.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Una tesis, evidencia trazable, límites explícitos y decisiones que se pueden discutir.</p></div>
            <NextLink href={`/brief/${latest.slug}`} className="group grid overflow-hidden rounded-[1.25rem] border border-border bg-panel transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-subtle md:grid-cols-[0.72fr_1fr]">
              <div className="flex min-h-[330px] flex-col bg-[#ded9cc] p-7 md:p-9"><div className="flex items-center justify-between font-mono text-[10px] text-rust"><span>BRIEF {latest.issue}</span><span>{formatDate(latest.date)}</span></div><p className="mt-auto max-w-[9ch] text-5xl font-medium leading-[0.95] tracking-[-0.065em] text-ink">{latest.signals[0].value}</p><p className="mt-4 max-w-xs text-xs leading-5 text-ink/55">Diferencia entre medianas de personal reportado provincial y distrital.</p></div>
              <div className="flex min-h-[330px] flex-col p-7 md:p-9"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Gestión pública · {latest.readingTime}</p><h2 className="mt-8 max-w-xl text-3xl font-medium leading-[1.05] tracking-[-0.045em] text-ink md:text-4xl">{latest.title}</h2><p className="mt-5 max-w-xl text-sm leading-7 text-ink/62">{latest.description}</p><span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-rust">Abrir edición <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span></div>
            </NextLink>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.34fr_1fr] lg:gap-20"><div><Eyebrow>Archivo</Eyebrow><Heading size="xl">Una biblioteca que crecerá con evidencia.</Heading></div><div className="divide-y divide-border border-y border-border">{briefEditions.map((edition) => <NextLink key={edition.slug} href={`/brief/${edition.slug}`} className="group grid gap-4 py-7 sm:grid-cols-[90px_1fr_auto] sm:items-center"><span className="font-mono text-[10px] text-rust">N.º {edition.issue}</span><span><span className="block text-lg font-medium tracking-[-0.02em] text-ink">{edition.title}</span><span className="mt-2 block text-xs leading-5 text-muted">{formatDate(edition.date)} · {edition.readingTime}</span></span><ArrowRight className="hidden h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-rust sm:block" aria-hidden /></NextLink>)}</div></div>
        </Container>
      </Section>

      <Section>
        <Container><div className="grid gap-10 lg:grid-cols-[0.4fr_1fr] lg:gap-20"><div><Eyebrow>Recibir el Brief</Eyebrow><Heading size="xl">Una edición cuando exista algo que valga la atención.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Sin listas compradas, sin frecuencia artificial y con baja disponible en cada envío.</p></div><NewsletterSignup sourcePath="/brief" /></div></Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { ArrowRight, ExternalLink } from "lucide-react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { BriefSignalGrid } from "@/components/brief/brief-signal-grid";
import { ShareActions } from "@/components/content/share-actions";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { briefEditions, getBriefEdition } from "@/lib/brief";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

type BriefPageProps = { params: Promise<{ slug: string }> };

const formatDate = (date: string) => new Intl.DateTimeFormat("es-PE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));

export function generateStaticParams() {
  return briefEditions.map((edition) => ({ slug: edition.slug }));
}

export async function generateMetadata({ params }: BriefPageProps): Promise<Metadata> {
  const { slug } = await params;
  const edition = getBriefEdition(slug);
  if (!edition) return {};
  return buildMetadata({ title: edition.title, description: edition.description, path: `/brief/${slug}`, image: ogImagePath("brief", slug), type: "article" });
}

export default async function BriefDetailPage({ params }: BriefPageProps) {
  const { slug } = await params;
  const edition = getBriefEdition(slug);
  if (!edition) notFound();
  const path = `/brief/${edition.slug}`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Brief NOAM", path: "/brief" }, { name: `Edición ${edition.issue}`, path }])} />
      <JsonLd data={articleJsonLd({ title: edition.title, description: edition.description, datePublished: edition.date, url: `${siteConfig.url}${path}`, image: `${siteConfig.url}${ogImagePath("brief", edition.slug)}` })} />

      <section className="pb-14 pt-14 md:pb-20 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.73fr_1.27fr] lg:items-end lg:gap-20">
            <div className="reveal"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-rust">Brief NOAM · N.º {edition.issue}</p><p className="mt-4 text-xs text-muted">{formatDate(edition.date)} · {edition.readingTime}</p></div>
            <div><Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[13ch]">{edition.title}</Heading><p className="reveal reveal-delay-2 mt-7 max-w-3xl text-base leading-8 text-ink/68 md:text-lg">{edition.lead}</p><ShareActions title={edition.title} path={path} className="reveal reveal-delay-3 mt-8" /></div>
          </div>
        </Container>
      </section>

      <section className="bg-[#15211d] py-8 text-white md:py-12"><Container><BriefSignalGrid signals={edition.signals} /></Container></section>

      <Section>
        <Container size="narrow">
          <div className="grid gap-8 border-b border-border pb-12 md:grid-cols-[0.3fr_1fr]"><Eyebrow>En una frase</Eyebrow><p className="text-2xl font-medium leading-[1.25] tracking-[-0.035em] text-ink md:text-4xl">Diseñar para el promedio puede producir una intervención demasiado pesada para unos y demasiado superficial para otros.</p></div>
        </Container>
      </Section>

      <div>
        {edition.signals.map((signal, index) => (
          <Section key={signal.number} className={index % 2 === 1 ? "border-y border-border bg-panel/45" : ""}>
            <Container>
              <article className="grid gap-12 lg:grid-cols-[0.35fr_1fr] lg:gap-20">
                <div><div className="flex items-center gap-4"><span className="font-mono text-[10px] text-rust">{signal.number}</span><span className="h-px flex-1 bg-border" /></div><p className="mt-10 text-6xl font-medium tracking-[-0.07em] text-ink">{signal.value}</p><p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">{signal.label}</p></div>
                <div><h2 className="max-w-3xl text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink md:text-5xl">{signal.title}</h2><div className="mt-10 grid gap-8 md:grid-cols-2"><div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-rust">Qué muestra</p><p className="mt-4 text-sm leading-7 text-ink/68">{signal.reading}</p></div><div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-rust">Qué decisión abre</p><p className="mt-4 text-sm leading-7 text-ink/68">{signal.decision}</p></div></div><div className="mt-8 border-l-2 border-rust/45 pl-5"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Límite de lectura</p><p className="mt-3 text-xs leading-6 text-muted">{signal.limit}</p></div><a href={signal.sourceHref} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-rust hover:text-ink">{signal.sourceLabel} <ExternalLink className="h-3.5 w-3.5" aria-hidden /></a></div>
              </article>
            </Container>
          </Section>
        ))}
      </div>

      <Section className="bg-[#ded9cc]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.35fr_1fr] lg:gap-20"><div><Eyebrow>Agenda de 90 días</Eyebrow><Heading size="xl">Cuatro movimientos antes de construir la solución.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">No sustituyen un diagnóstico. Ordenan la conversación para que el encargo responda a una decisión real.</p></div><ol className="grid gap-px overflow-hidden rounded-md border border-ink/15 bg-ink/15 md:grid-cols-2">{edition.actions.map((action, index) => <li key={action.title} className="min-h-[230px] bg-[#e7e2d7] p-6 md:p-8"><span className="font-mono text-[10px] text-ink">0{index + 1}</span><h2 className="mt-12 text-xl font-medium tracking-[-0.025em] text-ink">{action.title}</h2><p className="mt-4 text-sm leading-6 text-ink/62">{action.description}</p></li>)}</ol></div>
        </Container>
      </Section>

      <Section className="border-b border-border">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.35fr_1fr] lg:gap-20"><div><Eyebrow>Fuentes</Eyebrow><Heading size="xl">Dos bases públicas, una lectura prudente.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">La edición sintetiza el estudio de DataPerú. No reemplaza la revisión de registros ni una validación institucional.</p></div><div className="divide-y divide-border border-y border-border">{edition.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="group grid gap-4 py-7 md:grid-cols-[0.32fr_1fr_auto]"><span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">{source.publisher}</span><span><span className="block text-base font-medium text-ink">{source.title}</span><span className="mt-2 block text-xs leading-5 text-muted">{source.period}. {source.note}</span></span><ExternalLink className="h-4 w-4 text-muted transition-colors group-hover:text-rust" aria-hidden /></a>)}</div></div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.35fr_1fr] lg:gap-20"><div><Eyebrow>Seguir explorando</Eyebrow><Heading size="xl">De la señal a la evidencia y al encargo.</Heading></div><div className="grid gap-4 md:grid-cols-3">{edition.related.map((item) => <NextLink key={item.href} href={item.href} className="group flex min-h-[250px] flex-col rounded-md border border-border bg-panel p-6 transition-all hover:-translate-y-0.5 hover:border-border-strong"><h2 className="text-lg font-medium leading-6 tracking-[-0.025em] text-ink">{item.label}</h2><p className="mt-4 text-sm leading-6 text-ink/60">{item.description}</p><span className="mt-auto inline-flex items-center gap-2 pt-8 text-xs font-medium text-rust">Abrir <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span></NextLink>)}</div></div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#15211d] text-white">
        <Container><div className="grid gap-10 lg:grid-cols-[0.4fr_1fr] lg:gap-20"><div><Eyebrow className="text-[#d9a48f]">Próxima edición</Eyebrow><Heading size="xl" className="text-white">Recibe el Brief cuando exista una nueva señal útil.</Heading><div className="mt-7 flex flex-wrap gap-3"><Button href="/diagnostico" variant="ghost" className="!text-white/75 hover:!text-white">Diseñar un alcance</Button><Button href="/contact?interest=brief-noam" variant="secondary" className="rounded-full border-white bg-white text-ink">Conversar con NOAM</Button></div></div><NewsletterSignup sourcePath={path} /></div></Container>
      </Section>
    </>
  );
}

import { ArrowRight, Search } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge, Button, Container, Eyebrow, Heading, ResourceList, Section } from "@/components/ui";
import { evidencePrinciples } from "@/lib/brand-content";
import { getAllContent } from "@/lib/content";
import { editorialCollections, editorialPillars } from "@/lib/editorial";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { TOPICS } from "@/types/content";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";
import { getLatestBriefEdition } from "@/lib/brief";

export const metadata = buildMetadata({
  title: "Evidencia",
  description: "Estudios, casos, indicadores, métodos y recursos abiertos para decisiones públicas, territoriales y empresariales.",
  path: "/evidence"
});

export default async function EvidencePage() {
  const [insights, indicators, toolkits, cases] = await Promise.all([getAllContent("insights"), getAllContent("indicators"), getAllContent("toolkits"), getAllContent("cases")]);
  const all = [...insights, ...indicators, ...toolkits, ...cases].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const latestBrief = getLatestBriefEdition();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Evidencia", path: "/evidence" }])} />

      <Section className="pb-14 pt-14 md:pb-20 md:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div><Eyebrow className="reveal text-rust">Biblioteca NOAM</Eyebrow><Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[14ch]">Ideas que se pueden examinar, usar y discutir.</Heading></div>
            <div className="reveal reveal-delay-2"><p className="text-sm leading-7 text-ink/68 md:text-base">Publicamos análisis, métodos, datos y casos para que nuestra capacidad pueda evaluarse antes de una conversación comercial.</p><p className="mt-5 font-mono text-xs text-rust">{all.length} recursos publicados</p></div>
          </div>
          <form action="/buscar" method="get" role="search" className="mt-12 grid gap-3 rounded-[1.25rem] border border-ink/15 bg-panel p-4 shadow-subtle sm:grid-cols-[1fr_auto] sm:items-center md:p-5">
            <input type="hidden" name="type" value="evidence" />
            <label className="flex min-h-12 items-center gap-3 rounded-sm border border-border bg-canvas px-4 focus-within:border-ink">
              <Search className="h-4 w-4 text-muted" aria-hidden />
              <span className="sr-only">Buscar en la biblioteca de evidencia</span>
              <input name="q" placeholder="Buscar por problema, método o territorio" className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted/70" />
            </label>
            <Button type="submit" className="min-h-12 rounded-full px-7">Buscar evidencia</Button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <NextLink href="/buscar?type=evidence&topic=gobierno" className="rounded-full border border-border bg-panel px-3 py-1.5 text-ink/70 hover:border-border-strong hover:text-ink">Gobierno</NextLink>
            <NextLink href="/buscar?type=evidence&topic=inversion" className="rounded-full border border-border bg-panel px-3 py-1.5 text-ink/70 hover:border-border-strong hover:text-ink">Inversión</NextLink>
            <NextLink href="/buscar?type=evidence&topic=ia" className="rounded-full border border-border bg-panel px-3 py-1.5 text-ink/70 hover:border-border-strong hover:text-ink">IA</NextLink>
            <NextLink href="/buscar?type=evidence" className="rounded-full border border-border bg-panel px-3 py-1.5 text-ink/70 hover:border-border-strong hover:text-ink">Ver todo el índice</NextLink>
          </div>
        </Container>
      </Section>

      <section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-px bg-border lg:grid-cols-3">
            {TOPICS.map((topic) => {
              const pillar = editorialPillars[topic];
              const count = all.filter((item) => item.topic === topic).length;
              return (
                <NextLink key={topic} href={`/topics/${topic}`} className="group flex min-h-[390px] flex-col bg-panel px-6 py-8 transition-colors hover:bg-canvas md:px-8">
                  <div className="flex items-center justify-between"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: pillar.accent }} /><span className="font-mono text-[10px] text-muted">{String(count).padStart(2, "0")} recursos</span></div>
                  <div className="mt-auto pt-20"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">{pillar.eyebrow}</p><h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.04em] text-ink">{pillar.title}</h2><p className="mt-4 text-sm leading-6 text-ink/62">{pillar.description}</p><span className="mt-7 inline-flex items-center gap-2 text-xs font-medium text-rust">Explorar tema <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span></div>
                </NextLink>
              );
            })}
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Publicaciones recientes</Eyebrow><Heading size="xl">Evidencia para decisiones públicas y territoriales.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Problemas, fuentes, métodos, hallazgos, implicancias y límites en una estructura común.</p></div>
            <div><NextLink href="/dataperu/panorama-municipal-2025" className="group mb-8 block rounded-md border border-border bg-[#15211d] p-6 text-white transition-all hover:-translate-y-0.5 hover:shadow-subtle"><span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#d9a48f]">Estudio insignia · DataPerú</span><h2 className="mt-5 text-2xl font-medium tracking-[-0.035em]">El Perú municipal no cabe en un promedio.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">1,891 municipalidades, 25 contextos departamentales y una lectura sin índice opaco.</p><span className="mt-6 inline-flex items-center gap-2 text-xs text-white/75">Abrir estudio <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span></NextLink><ResourceList items={all.slice(0, 7)} variant="rows" /></div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#ded9cc]">
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><Eyebrow>Formatos</Eyebrow><Heading size="xl">Leer, medir, aplicar y comprobar.</Heading></div><div className="flex flex-wrap gap-3"><Button href="/resources" variant="secondary">Recursos y datos abiertos</Button><Button href="/insights/rss.xml" variant="ghost" className="justify-start gap-2">RSS de estudios <ArrowRight className="h-4 w-4" /></Button></div></div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {editorialCollections.map((collection, index) => {
              const items = { insights, indicators, toolkits, cases }[collection.type];
              return <NextLink key={collection.type} href={collection.href} className="group flex min-h-[250px] flex-col rounded-md border border-ink/15 bg-canvas/45 p-6 transition-all hover:-translate-y-0.5 hover:bg-canvas"><span className="font-mono text-[10px] text-rust">0{index + 1} · {String(items.length).padStart(2, "0")}</span><h2 className="mt-10 text-xl font-medium tracking-[-0.03em] text-ink">{collection.label}</h2><p className="mt-3 text-sm leading-6 text-ink/62">{collection.description}</p><span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-medium text-rust">Ver colección <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span></NextLink>;
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#15211d] text-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:gap-20">
            <div><Eyebrow className="text-white/55">Estándar editorial</Eyebrow><Heading size="xl" className="text-white">Rigor visible, no decorativo.</Heading><p className="mt-5 max-w-md text-sm leading-7 text-white/58">No publicamos una conclusión sin mostrar de dónde proviene, cómo debe leerse y qué no permite afirmar.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md bg-white/15 sm:grid-cols-2">
              {evidencePrinciples.map((principle, index) => <div key={principle} className="bg-[#15211d] p-6"><Badge className="border-white/15 text-[#d9a48f]">0{index + 1}</Badge><p className="mt-8 text-base font-medium text-white">{principle}</p></div>)}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container><div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><Eyebrow>Brief NOAM</Eyebrow><Heading size="xl">Una selección útil para volver.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Datos, métodos y preguntas para gestión pública, elecciones y decisiones apoyadas por IA.</p><Button href="/brief" variant="ghost" className="mt-6 justify-start gap-2">Ver archivo editorial <ArrowRight className="h-4 w-4" /></Button></div><div><NextLink href={`/brief/${latestBrief.slug}`} className="group mb-5 block rounded-[1.25rem] border border-border bg-[#15211d] p-7 text-white transition-all hover:-translate-y-0.5 hover:shadow-subtle"><span className="font-mono text-[10px] text-[#d9a48f]">EDICIÓN {latestBrief.issue} · {latestBrief.readingTime}</span><h2 className="mt-7 max-w-2xl text-2xl font-medium tracking-[-0.035em] md:text-3xl">{latestBrief.title}</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">{latestBrief.description}</p><span className="mt-7 inline-flex items-center gap-2 text-xs text-white/75">Leer edición <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span></NextLink><NewsletterSignup sourcePath="/evidence" /></div></div></Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <NextLink href="/muestras" className="group flex flex-col gap-8 rounded-[1.5rem] bg-rust p-8 text-white md:flex-row md:items-end md:justify-between md:p-12">
            <div><Eyebrow className="text-white/55">Aplicación</Eyebrow><Heading size="lg" className="mt-4 max-w-3xl text-white">Examina cómo esta evidencia se convierte en un diagnóstico, sistema o piloto.</Heading></div>
            <span className="inline-flex items-center gap-2 text-sm font-medium">Ver muestras <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
          </NextLink>
        </Container>
      </Section>
    </>
  );
}

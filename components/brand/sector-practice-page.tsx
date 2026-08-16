import { ArrowLeft, ArrowRight, Check, MoveUpRight } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { PracticeVisual } from "@/components/brand/practice-visual";
import { SolutionCard } from "@/components/content/solution-card";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import type { SectorPractice } from "@/lib/sector-practices";
import { solutions } from "@/lib/solutions";

export function SectorPracticePage({ practice }: { practice: SectorPractice }) {
  const isPublic = practice.market === "public";
  const parentHref = isPublic ? "/sectors/public-sector" : "/sectors/companies";
  const parentLabel = isPublic ? "Gobiernos" : "Empresas";
  const relatedSolutions = practice.solutionSlugs.map((slug) => solutions.find((solution) => solution.slug === slug)).filter(Boolean);

  return (
    <>
      <section className="pb-16 pt-10 md:pb-24 md:pt-14">
        <Container>
          <NextLink href={parentHref} className="inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-ink"><ArrowLeft className="h-3.5 w-3.5" /> {parentLabel}</NextLink>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.78fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow className="reveal text-rust">{practice.eyebrow}</Eyebrow>
              <Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[13ch]">{practice.title}</Heading>
              <p className="reveal reveal-delay-2 mt-7 max-w-2xl text-xl font-medium leading-8 tracking-[-0.025em] text-ink/82">{practice.promise}</p>
              <p className="reveal reveal-delay-2 mt-5 max-w-2xl text-sm leading-7 text-ink/65">{practice.description}</p>
              <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3"><Button href={`/contact?interest=${practice.slug}`} className="rounded-full">Conversar sobre esta práctica</Button><Button href="/diagnostico" variant="secondary" className="rounded-full">Diseñar un alcance</Button><Button href="/solutions" variant="ghost" className="gap-2">Ver soluciones <ArrowRight className="h-4 w-4" /></Button></div>
            </div>
            <div className="reveal reveal-delay-2 relative min-h-[420px] overflow-hidden rounded-[1.25rem] border border-border shadow-visual">
              <Image src={practice.image} alt={practice.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 44vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">Imagen editorial · Cobertura nacional</p><p className="mt-3 max-w-md text-lg font-medium leading-6 tracking-[-0.02em]">Método común, respuesta situada.</p><p className="mt-2 text-[10px] leading-4 text-white/55">Escena representativa; no corresponde a un cliente.</p></div>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-[#15211d] text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1fr] lg:items-center lg:gap-20">
            <div>
              <Eyebrow className="text-[#d9a48f]">Preguntas de decisión</Eyebrow>
              <Heading size="xl" className="text-white">La práctica comienza por lo que necesitas resolver.</Heading>
              <div className="mt-8 divide-y divide-white/12 border-y border-white/12">
                {practice.decisions.map((decision, index) => <div key={decision} className="grid grid-cols-[38px_1fr] gap-3 py-5"><span className="font-mono text-[10px] text-[#d9a48f]">0{index + 1}</span><p className="text-sm leading-6 text-white/72">{decision}</p></div>)}
              </div>
            </div>
            <PracticeVisual labels={practice.decisions} accent={practice.accent} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Contexto operativo</Eyebrow><Heading size="xl">Lo que una solución debe reconocer.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">El método solo sirve si se adapta a restricciones, actores y ritmos reales.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
              {practice.realities.map((reality, index) => <article key={reality.title} className="min-h-[260px] bg-canvas p-6"><span className="font-mono text-[10px] text-rust">0{index + 1}</span><h2 className="mt-12 text-xl font-medium tracking-[-0.03em] text-ink">{reality.title}</h2><p className="mt-4 text-sm leading-6 text-ink/62">{reality.description}</p></article>)}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div><Eyebrow>Qué cambia</Eyebrow><Heading size="lg">Resultados buscados.</Heading><div className="mt-8 grid gap-3">{practice.outcomes.map((outcome) => <p key={outcome} className="flex items-start gap-3 rounded-sm border border-border bg-canvas p-4 text-sm leading-6 text-ink/72"><Check className="mt-1 h-4 w-4 shrink-0 text-rust" />{outcome}</p>)}</div></div>
            <div><Eyebrow>Qué puede recibir el equipo</Eyebrow><Heading size="lg">Entregables configurables.</Heading><ol className="mt-8 divide-y divide-border border-y border-border">{practice.deliverables.map((deliverable, index) => <li key={deliverable} className="grid grid-cols-[38px_1fr] gap-3 py-4"><span className="font-mono text-[10px] text-rust">{String(index + 1).padStart(2, "0")}</span><p className="text-sm font-medium leading-6 text-ink">{deliverable}</p></li>)}</ol></div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Puntos de partida</Eyebrow><Heading size="xl">Soluciones que se adaptan a esta práctica.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">El alcance final se define por decisión, territorio, datos disponibles, usuarios y plazo.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">{relatedSolutions.map((solution) => solution ? <SolutionCard key={solution.slug} solution={solution} /> : null)}</div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#ded9cc]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Evidencia relacionada</Eyebrow><Heading size="xl">Evalúa cómo pensamos.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Productos y contenidos abiertos antes de definir un encargo.</p></div>
            <div className="divide-y divide-ink/15 border-y border-ink/15">{practice.evidence.map((item, index) => <NextLink key={item.href} href={item.href} className="group grid grid-cols-[38px_1fr_auto] items-center gap-4 py-6"><span className="font-mono text-[10px] text-rust">0{index + 1}</span><span><span className="block text-[10px] font-semibold uppercase tracking-[0.13em] text-muted">{item.type}</span><span className="mt-2 block text-base font-medium text-ink">{item.label}</span></span><MoveUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rust" /></NextLink>)}</div>
          </div>
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-7 py-12 text-white md:px-12 md:py-16"><div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" /><div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow className="text-white/55">Siguiente paso</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Cuéntanos la decisión y el contexto. Diseñaremos el punto de partida.</h2></div><div className="flex flex-wrap gap-3"><Button href="/diagnostico" variant="ghost" className="!text-white/75 hover:!text-white">Preparar un brief</Button><Button href={`/contact?interest=${practice.slug}`} variant="secondary" className="rounded-full border-white bg-white px-6 text-ink">Iniciar conversación</Button></div></div></div>
        </Container>
      </Section>
    </>
  );
}

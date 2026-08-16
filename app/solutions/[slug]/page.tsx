import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, Clock3, FileText, MoveUpRight } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { SolutionSystem } from "@/components/brand/solution-system";
import { DeliverablePreview } from "@/components/commercial/deliverable-preview";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Badge, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { getSolution, solutionSlugs } from "@/lib/solutions";
import { serviceLines } from "@/lib/brand-content";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, ogImagePath, serviceJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getDeliverableSampleBySolution } from "@/lib/deliverable-samples";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return buildMetadata({ title: solution.title, description: solution.description, path: `/solutions/${solution.slug}`, image: ogImagePath("solutions", solution.slug) });
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();
  const sample = getDeliverableSampleBySolution(solution.slug);
  const visual = serviceLines.find((service) => service.slug === solution.serviceSlug);

  const path = `/solutions/${solution.slug}`;
  const faq = [
    { title: "¿El alcance es fijo?", content: "No. Esta solución define un punto de partida. El territorio, las fuentes, el trabajo de campo, los usuarios y la profundidad se acuerdan después de una conversación de diagnóstico." },
    { title: "¿Pueden comenzar solo con información pública?", content: "Sí. Podemos construir una primera lectura con fuentes públicas y luego identificar qué datos internos o evidencia primaria cambiarían materialmente la decisión." },
    { title: "¿Qué recibe el equipo al terminar?", content: `Los entregables se configuran según el uso. Como referencia, esta solución puede incluir: ${solution.deliverables.slice(0, 3).join(", ")}.` },
    { title: "¿Trabajan fuera de Lima?", content: "Sí. Diseñamos alcances locales, regionales y nacionales. El componente presencial y el trabajo territorial se dimensionan según el problema y la cobertura necesaria." }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Soluciones", path: "/solutions" }, { name: solution.title, path }])} />
      <JsonLd data={serviceJsonLd({ name: solution.title, description: solution.description, url: `${siteConfig.url}${path}` })} />
      <JsonLd data={faqJsonLd(faq)} />

      <section className="overflow-hidden bg-[#15211d] pb-20 pt-10 text-white md:pb-28 md:pt-14">
        <Container>
          <NextLink href="/solutions" className="inline-flex items-center gap-2 text-xs text-white/55 hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /> Todas las soluciones</NextLink>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.78fr] lg:items-center lg:gap-20">
            <div>
              <div className="flex flex-wrap items-center gap-3"><Badge className="border-white/18 text-white/65">{solution.market}</Badge><span className="font-mono text-[10px] text-[#d9a48f]">SOLUCIÓN {solution.number}</span></div>
              <Heading as="h1" size="display" className="mt-6 max-w-[13ch] text-white">{solution.title}</Heading>
              <p className="mt-6 max-w-2xl text-xl font-medium leading-8 tracking-[-0.025em] text-white/86">{solution.promise}</p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/58">{solution.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4"><Button href={`/contact?interest=${solution.slug}`} analyticsEvent="cta_click" analyticsTarget={`solution:${solution.slug}`} variant="secondary" className="rounded-full border-white bg-white text-ink">Solicitar conversación inicial</Button><span className="inline-flex items-center gap-2 text-xs text-white/48"><Clock3 className="h-3.5 w-3.5" /> {solution.duration}</span></div>
            </div>
            <SolutionSystem labels={solution.phases.map((phase) => phase.title)} accent={solution.accent} />
          </div>
          {visual ? (
            <figure className="group relative mt-14 overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#1b2d27] shadow-visual md:mt-20">
              <Image src={visual.image} alt={visual.imageAlt} width={1672} height={941} sizes="(max-width: 768px) 100vw, 1160px" className="aspect-[1.15/1] w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.018] sm:aspect-[2/1] lg:aspect-[2.7/1]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15211d]/90 via-transparent to-[#15211d]/10" />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 text-white md:flex-row md:items-end md:justify-between md:p-7">
                <span className="max-w-2xl text-sm font-medium tracking-[-0.015em] text-white/82">{solution.promise}</span>
                <span className="max-w-sm text-[9px] leading-4 text-white/55 md:text-right">{visual.imageCaption}</span>
              </figcaption>
            </figure>
          ) : null}
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <article>
              <Eyebrow>Cuándo ayuda</Eyebrow>
              <Heading size="lg">Situaciones que requieren estructura.</Heading>
              <div className="mt-7 divide-y divide-border border-y border-border">
                {solution.situations.map((item, index) => <div key={item} className="grid grid-cols-[36px_1fr] gap-3 py-5"><span className="font-mono text-[10px] text-rust">0{index + 1}</span><p className="text-sm leading-6 text-ink/72">{item}</p></div>)}
              </div>
            </article>
            <article>
              <Eyebrow>Qué cambia</Eyebrow>
              <Heading size="lg">Resultados buscados.</Heading>
              <div className="mt-7 grid gap-3">
                {solution.outcomes.map((item) => <p key={item} className="flex items-start gap-3 rounded-sm border border-border bg-panel p-4 text-sm leading-6 text-ink/72"><Check className="mt-1 h-4 w-4 shrink-0 text-rust" aria-hidden />{item}</p>)}
              </div>
            </article>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><FileText className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Entregables</Eyebrow><Heading size="xl">Un sistema de trabajo, no una pila de archivos.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">La combinación final depende del uso, los datos disponibles y quién operará la solución.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {solution.deliverables.map((item, index) => <article key={item} className={`bg-canvas p-6 ${index === solution.deliverables.length - 1 ? "sm:col-span-2" : ""}`}><span className="font-mono text-[10px] text-rust">{String(index + 1).padStart(2, "0")}</span><h2 className="mt-8 text-lg font-medium leading-6 tracking-[-0.02em] text-ink">{item}</h2></article>)}
            </div>
          </div>
        </Container>
      </Section>

      {sample && (
        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.48fr_1fr] lg:items-center lg:gap-20">
              <div>
                <Eyebrow>Muestra demostrativa</Eyebrow>
                <Heading size="xl">Examina la forma del entregable.</Heading>
                <p className="mt-5 text-sm leading-7 text-ink/65">Preguntas, módulos, artefacto central, cronograma, insumos y controles. No corresponde a un cliente ni promete resultados sin conocer el contexto.</p>
                <Button href={`/muestras/${sample.slug}`} analyticsEvent="cta_click" analyticsTarget={`solution:${solution.slug}:sample`} variant="secondary" className="mt-7 gap-2">Abrir muestra completa <ArrowRight className="h-4 w-4" aria-hidden /></Button>
              </div>
              <DeliverablePreview sample={sample} compact />
            </div>
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Cómo se construye</Eyebrow><Heading size="xl">Cuatro movimientos, una decisión.</Heading></div>
            <ol className="divide-y divide-border border-y border-border">
              {solution.phases.map((phase, index) => <li key={phase.title} className="grid gap-4 py-6 sm:grid-cols-[50px_0.42fr_1fr]"><span className="font-mono text-xs text-rust">0{index + 1}</span><h2 className="text-lg font-medium text-ink">{phase.title}</h2><p className="text-sm leading-6 text-ink/65">{phase.description}</p></li>)}
            </ol>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#15211d] text-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow className="text-[#d9a48f]">Evidencia relacionada</Eyebrow><Heading size="xl" className="text-white">Evalúa cómo pensamos antes de contratarnos.</Heading></div>
            <div className="divide-y divide-white/12 border-y border-white/12">
              {solution.evidence.map((item, index) => <NextLink key={item.href} href={item.href} className="group grid grid-cols-[38px_1fr_auto] items-center gap-4 py-6"><span className="font-mono text-[10px] text-[#d9a48f]">0{index + 1}</span><span className="text-base font-medium text-white/82">{item.label}</span><MoveUpRight className="h-4 w-4 text-white/55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></NextLink>)}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Antes de definir el alcance.</Heading><Accordion items={faq} className="mt-8" />
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-7 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><Eyebrow className="text-white/55">Siguiente paso</Eyebrow><Heading size="xl" className="max-w-[18ch] text-white">Cuéntanos la decisión, el territorio y el plazo.</Heading><p className="mt-4 max-w-xl text-sm leading-7 text-white/68">Responderemos con preguntas de alcance y una propuesta de punto de partida, no con una solución genérica.</p></div>
              <div className="flex flex-wrap gap-4"><Button href={`/contact?interest=${solution.slug}`} variant="secondary" className="rounded-full border-white bg-white text-ink">Plantear el desafío</Button><NextLink href={`/services/${solution.serviceSlug}`} className="inline-flex items-center gap-2 text-sm font-medium text-white/72 hover:text-white">Ver capacidad relacionada <ArrowRight className="h-4 w-4" /></NextLink></div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

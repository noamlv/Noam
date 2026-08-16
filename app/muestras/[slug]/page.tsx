import { ArrowLeft, ArrowRight, Check, Clock3, FileText, ShieldCheck } from "lucide-react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { DeliverablePreview } from "@/components/commercial/deliverable-preview";
import { PrintButton } from "@/components/dataperu/print-button";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { deliverableSamples, getDeliverableSample } from "@/lib/deliverable-samples";
import { breadcrumbJsonLd, buildMetadata, ogImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const dynamicParams = false;

export function generateStaticParams() {
  return deliverableSamples.map((sample) => ({ slug: sample.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sample = getDeliverableSample(slug);
  if (!sample) return {};
  return buildMetadata({ title: `${sample.shortTitle} · Muestra`, description: sample.promise, path: `/muestras/${slug}`, image: ogImagePath("muestras", slug) });
}

export default async function SamplePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sample = getDeliverableSample(slug);
  if (!sample) notFound();
  const path = `/muestras/${sample.slug}`;
  const contactHref = `/contact?interest=${sample.solutionSlug}&from=${encodeURIComponent(path)}`;
  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: sample.title,
    description: sample.promise,
    url: `${siteConfig.url}${path}`,
    isPartOf: { "@type": "CollectionPage", name: "Muestras de entregables NOAM", url: `${siteConfig.url}/muestras` },
    creator: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.url }
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Muestras", path: "/muestras" }, { name: sample.shortTitle, path }])} />
      <JsonLd data={creativeWorkJsonLd} />

      <article className="sample-print">
        <section className="bg-[#15211d] py-12 text-white md:py-20 print:bg-white print:py-0 print:text-black">
          <Container>
            <div className="mb-10 flex flex-wrap items-center justify-between gap-5 print:hidden">
              <NextLink href="/muestras" className="inline-flex items-center gap-2 text-xs text-white/55 transition-colors hover:text-white"><ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Todas las muestras</NextLink>
              <PrintButton analyticsTarget={`sample:${sample.slug}`} />
            </div>

            <div className="grid gap-12 lg:grid-cols-[0.86fr_1fr] lg:items-end lg:gap-20">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d9a48f] print:text-neutral-600">Muestra demostrativa · No corresponde a cliente real</p>
                <h1 className="mt-6 max-w-[12ch] text-[2.75rem] font-medium leading-[0.99] tracking-[-0.052em] text-white sm:text-5xl md:text-6xl print:text-5xl print:text-black">{sample.title}</h1>
                <p className="mt-7 max-w-xl text-base leading-8 text-white/65 print:text-neutral-700">{sample.promise}</p>
                <div className="mt-8 flex flex-wrap gap-3 print:hidden">
                  <Button href="/diagnostico?from=/muestras" analyticsEvent="cta_click" analyticsTarget={`sample:${sample.slug}:scope`} variant="secondary" className="rounded-full border-white bg-white text-ink">Adaptar esta estructura</Button>
                  <Button href={contactHref} analyticsEvent="cta_click" analyticsTarget={`sample:${sample.slug}:contact`} variant="ghost" className="text-white/70 hover:text-white">Conversar <ArrowRight className="ml-2 h-4 w-4" aria-hidden /></Button>
                </div>
              </div>
              <DeliverablePreview sample={sample} className="print:hidden" />
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-4 print:mt-8 print:border-neutral-300 print:bg-neutral-300">
              {[
                ["Mercado", sample.market],
                ["Horizonte", sample.duration],
                ["Módulos", String(sample.modules.length).padStart(2, "0")],
                ["Controles", String(sample.qualityControls.length).padStart(2, "0")]
              ].map(([label, value]) => <div key={label} className="bg-[#15211d] p-5 print:bg-white"><p className="text-[9px] uppercase tracking-[0.14em] text-white/35 print:text-neutral-500">{label}</p><p className="mt-3 text-sm font-medium text-white/78 print:text-black">{value}</p></div>)}
            </div>
          </Container>
        </section>

        <Section className="print:py-10">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.38fr_1fr] lg:gap-20">
              <div><Eyebrow>Decisión central</Eyebrow><Heading size="xl">Qué debe quedar más claro.</Heading></div>
              <div><p className="max-w-3xl text-2xl font-medium leading-[1.35] tracking-[-0.025em] text-ink md:text-3xl">{sample.decision}</p><p className="mt-6 max-w-2xl text-sm leading-7 text-ink/62">{sample.description}</p></div>
            </div>
          </Container>
        </Section>

        <Section className="bg-[#15211d] text-white print:border-y print:border-neutral-300 print:bg-white print:text-black">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.38fr_1fr] lg:gap-20">
              <div><Eyebrow className="text-[#d9a48f] print:text-neutral-600">Preguntas de trabajo</Eyebrow><Heading size="xl" className="text-white print:text-black">Antes del tablero, el informe o la IA.</Heading></div>
              <ol className="divide-y divide-white/14 border-y border-white/14 print:divide-neutral-300 print:border-neutral-300">
                {sample.questions.map((question, index) => <li key={question} className="grid grid-cols-[40px_1fr] gap-4 py-6"><span className="font-mono text-[10px] text-[#d9a48f] print:text-neutral-600">0{index + 1}</span><p className="text-lg font-medium leading-7 text-white/82 print:text-black">{question}</p></li>)}
              </ol>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div><Eyebrow>Arquitectura</Eyebrow><Heading size="xl">Cuatro módulos, un hilo de decisión.</Heading></div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2">
              {sample.modules.map((module, index) => <section key={module.title} className="min-h-[270px] bg-canvas p-6 md:p-8"><div className="flex items-center justify-between"><span className="font-mono text-[10px] text-rust">0{index + 1}</span><FileText className="h-4 w-4 text-ink/25" aria-hidden /></div><h3 className="mt-14 text-2xl font-medium tracking-[-0.035em] text-ink">{module.title}</h3><p className="mt-4 text-sm leading-7 text-ink/62">{module.purpose}</p><p className="mt-7 border-t border-border pt-4 text-xs font-medium text-rust">Salida · {module.output}</p></section>)}
            </div>
          </Container>
        </Section>

        <Section className="border-y border-border bg-[#ded9cc]">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
              <div><Eyebrow>Artefacto central</Eyebrow><Heading size="xl">Una estructura que obliga a conectar evidencia y acción.</Heading><p className="mt-5 text-sm leading-7 text-ink/62">Los textos son demostrativos. La ficha muestra la lógica del artefacto, no datos ni conclusiones de un cliente.</p></div>
              <div className="overflow-hidden rounded-md border border-ink/15 bg-canvas">
                <div className="flex items-center justify-between border-b border-border p-5"><h3 className="text-sm font-medium text-ink">{sample.preview.title}</h3><span className="h-2 w-2 rounded-full" style={{ backgroundColor: sample.accent }} /></div>
                <div className="grid grid-cols-3 bg-ink px-5 py-3 text-[9px] uppercase tracking-[0.11em] text-white/52">{sample.preview.columns.map((column) => <span key={column}>{column}</span>)}</div>
                {sample.preview.rows.map((row) => <div key={row.join("")} className="grid grid-cols-3 border-t border-border px-5 py-4 text-xs leading-5 text-ink/68">{row.map((cell) => <span key={cell} className="pr-3">{cell}</span>)}</div>)}
              </div>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.38fr_1fr] lg:gap-20">
              <div><Eyebrow>Secuencia</Eyebrow><Heading size="xl">Un ritmo visible para conducir el encargo.</Heading></div>
              <div className="divide-y divide-border border-y border-border">
                {sample.timeline.map((step, index) => <article key={step.period} className="grid gap-3 py-6 sm:grid-cols-[48px_0.35fr_1fr]"><span className="font-mono text-[10px] text-rust">0{index + 1}</span><div><p className="text-base font-medium text-ink">{step.title}</p><p className="mt-1 text-xs text-muted"><Clock3 className="mr-1.5 inline h-3 w-3" aria-hidden />{step.period}</p></div><p className="text-sm leading-6 text-ink/65">{step.description}</p></article>)}
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-border bg-panel/45">
          <Container>
            <div className="grid gap-5 lg:grid-cols-2">
              <article className="rounded-md border border-border bg-canvas p-6 md:p-8"><Eyebrow>Requiere del cliente</Eyebrow><h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-ink">Acceso y contexto.</h2><ul className="mt-8 divide-y divide-border border-y border-border">{sample.clientInputs.map((item) => <li key={item} className="flex gap-3 py-4 text-sm leading-6 text-ink/68"><Check className="mt-1 h-4 w-4 shrink-0 text-rust" aria-hidden />{item}</li>)}</ul></article>
              <article className="rounded-md border border-border bg-canvas p-6 md:p-8"><Eyebrow>Estándar NOAM</Eyebrow><h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-ink">Control y trazabilidad.</h2><ul className="mt-8 divide-y divide-border border-y border-border">{sample.qualityControls.map((item) => <li key={item} className="flex gap-3 py-4 text-sm leading-6 text-ink/68"><ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-rust" aria-hidden />{item}</li>)}</ul></article>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.38fr_1fr] lg:gap-20">
              <div><Eyebrow>Paquete de salida</Eyebrow><Heading size="xl">Entregables que pueden usarse.</Heading></div>
              <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">{sample.deliverables.map((item, index) => <div key={item} className="min-h-[150px] bg-canvas p-6"><span className="font-mono text-[10px] text-rust">0{index + 1}</span><p className="mt-8 text-base font-medium leading-6 text-ink">{item}</p></div>)}</div>
            </div>
          </Container>
        </Section>

        <Section className="border-y border-border bg-[#ded9cc] print:hidden">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.38fr_1fr] lg:gap-20">
              <div><Eyebrow>Seguir examinando</Eyebrow><Heading size="xl">Método, producto y solución.</Heading></div>
              <div className="divide-y divide-ink/15 border-y border-ink/15">{sample.related.map((item) => <NextLink key={item.href} href={item.href} className="group grid gap-3 py-5 sm:grid-cols-[110px_1fr_auto] sm:items-center"><span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-rust">{item.type}</span><span className="text-base font-medium text-ink">{item.label}</span><ArrowRight className="h-4 w-4 text-ink/35 transition-transform group-hover:translate-x-1 group-hover:text-rust" aria-hidden /></NextLink>)}</div>
            </div>
          </Container>
        </Section>
      </article>

      <Section className="pb-0 print:hidden">
        <Container><div className="rounded-[1.5rem] bg-rust p-8 text-white md:p-12"><div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow className="text-white/55">Aplicación real</Eyebrow><Heading size="lg" className="mt-4 max-w-3xl text-white">La estructura es un punto de partida. El encargo se diseña alrededor de tu decisión.</Heading></div><Button href={contactHref} analyticsEvent="cta_click" analyticsTarget={`sample:${sample.slug}:final-contact`} variant="secondary" className="rounded-full border-white bg-white text-ink">Plantear el contexto</Button></div></div></Container>
      </Section>
    </>
  );
}

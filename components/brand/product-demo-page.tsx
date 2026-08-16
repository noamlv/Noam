import { ArrowRight, Check, ExternalLink } from "lucide-react";
import { ProductProofVisual } from "@/components/brand/product-proof-visual";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import type { ProductProof } from "@/lib/product-proofs";

export function ProductDemoPage({ proof }: { proof: ProductProof }) {
  if (!proof.externalUrl || proof.slug === "dataperu") return null;

  return (
    <>
      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1fr] lg:items-center lg:gap-20">
            <div>
              <Eyebrow className="reveal text-[#d9a48f]">{proof.eyebrow}</Eyebrow>
              <Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[11ch] text-white">{proof.title}</Heading>
              <p className="reveal reveal-delay-2 mt-7 max-w-xl text-base leading-8 text-white/68">{proof.description}</p>
              <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3">
                <Button href={proof.externalUrl} target="_blank" rel="noreferrer" variant="secondary" className="gap-2 rounded-full border-white bg-white text-ink">Abrir producto <ExternalLink className="h-4 w-4" /></Button>
                <Button href={proof.caseHref} variant="ghost" className="gap-2 !text-white/70 hover:!text-white">Ver caso y método <ArrowRight className="h-4 w-4" /></Button>
              </div>
            </div>
            <ProductProofVisual kind={proof.slug} className="reveal reveal-delay-2 min-h-[430px]" />
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container>
          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {proof.metrics.map((metric) => (
              <div key={metric.label} className="py-8 sm:px-6 sm:first:pl-0 lg:py-10">
                <p className="text-4xl font-medium tracking-[-0.055em] text-ink md:text-5xl">{metric.value}</p>
                <p className="mt-3 text-sm font-medium text-ink">{metric.label}</p>
                {metric.note ? <p className="mt-2 text-xs leading-5 text-muted">{metric.note}</p> : null}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {proof.technicalProfile ? (
        <Section className="border-b border-border bg-panel/45">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
              <div>
                <Eyebrow>Ficha técnica</Eyebrow>
                <Heading size="xl">Qué se midió y cómo leerlo.</Heading>
                <p className="mt-5 text-sm leading-7 text-ink/65">La procedencia y el diseño de la muestra son parte del resultado, no una nota al pie.</p>
              </div>
              <div>
                <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
                  {proof.technicalProfile.map((item) => (
                    <article key={item.label} className="min-h-[180px] bg-panel p-6">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted">{item.label}</p>
                      <h2 className="mt-7 text-2xl font-medium tracking-[-0.035em] text-ink">{item.value}</h2>
                      <p className="mt-3 text-xs leading-5 text-ink/58">{item.note}</p>
                    </article>
                  ))}
                </div>
                {proof.sourceNote ? <p className="mt-5 border-l border-rust pl-4 text-[10px] leading-5 text-muted">{proof.sourceNote}</p> : null}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Arquitectura del producto</Eyebrow><Heading size="xl">Del insumo a una experiencia de consulta.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Cada módulo responde una pregunta distinta y conserva una ruta hacia la fuente, el método o la definición utilizada.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {proof.modules.map((module) => (
                <article key={module.number} className="min-h-[220px] bg-canvas p-6">
                  <span className="font-mono text-[10px] text-rust">{module.number}</span>
                  <h2 className="mt-8 text-xl font-medium tracking-[-0.03em] text-ink">{module.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/62">{module.description}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div>
              <Eyebrow>Método</Eyebrow>
              <Heading size="lg">Reproducibilidad antes que caja negra.</Heading>
              <ul className="mt-8 divide-y divide-border border-y border-border">
                {proof.methods.map((method) => <li key={method} className="flex items-center gap-3 py-4 text-sm text-ink/72"><Check className="h-4 w-4 shrink-0 text-rust" />{method}</li>)}
              </ul>
            </div>
            <div>
              <Eyebrow>Límites de lectura</Eyebrow>
              <Heading size="lg">Lo que el producto no afirma.</Heading>
              <ol className="mt-8 divide-y divide-border border-y border-border">
                {proof.limits.map((limit, index) => <li key={limit} className="grid grid-cols-[34px_1fr] gap-3 py-4"><span className="font-mono text-[10px] text-rust">0{index + 1}</span><p className="text-sm leading-6 text-ink/68">{limit}</p></li>)}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div><Eyebrow>Producto interactivo</Eyebrow><Heading size="xl">Explora la versión publicada.</Heading><p className="mt-4 max-w-2xl text-sm leading-7 text-ink/65">La vista se carga desde el proyecto original. Ábrela en una pestaña nueva para usar todas sus funciones y navegar con mayor espacio.</p></div>
            <Button href={proof.externalUrl} target="_blank" rel="noreferrer" variant="ghost" className="gap-2">Abrir aparte <ExternalLink className="h-4 w-4" /></Button>
          </div>
          <div className="mt-10 overflow-hidden rounded-[1.25rem] border border-border bg-panel shadow-visual">
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4"><span className="text-sm font-medium text-ink">{proof.title}</span><span className="text-[10px] uppercase tracking-[0.14em] text-muted">Vista integrada</span></div>
            <iframe src={proof.externalUrl} title={`${proof.title}, producto interactivo`} className="h-[720px] w-full bg-white" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
          </div>
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="rounded-[1.5rem] bg-rust px-6 py-12 text-white md:px-12 md:py-16">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><Eyebrow className="text-white/55">Aplicación institucional</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Construyamos una lectura específica para tu decisión.</h2></div>
              <Button href={`/contact?interest=${proof.slug}&origin=${encodeURIComponent(proof.path)}`} variant="secondary" className="rounded-full border-white bg-white px-6 text-ink">Solicitar análisis</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

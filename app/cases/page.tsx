import { ArrowRight, Check } from "lucide-react";
import NextLink from "next/link";
import { CaseProofCard } from "@/components/brand/case-proof-card";
import { InstitutionalCaseCard } from "@/components/brand/institutional-case-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { getAllContent } from "@/lib/content";
import { productProofs } from "@/lib/product-proofs";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Experiencia, casos y productos",
  description: "Consultorías institucionales, productos propios y análisis aplicados de NOAM, con método, evidencia y límites de divulgación documentados.",
  path: "/cases"
});

const evidenceRules = [
  "Las cifras remiten al corpus, dataset o producto descrito.",
  "El método y sus límites se publican junto al resultado.",
  "Un producto propio no se presenta como encargo de un cliente.",
  "Los datos sensibles no forman parte de las versiones abiertas."
];

export default async function CasesPage() {
  const institutionalCases = (await getAllContent("cases")).filter((item) => item.caseType === "institutional");

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Casos", path: "/cases" }])} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.42fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="reveal text-[#d9a48f]">Experiencia, casos y productos</Eyebrow>
              <Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[13ch] text-white">Trabajo que se puede examinar.</Heading>
            </div>
            <div className="reveal reveal-delay-2">
              <p className="text-base leading-8 text-white/68">Separamos consultorías institucionales, productos propios y demostraciones. En cada caso documentamos qué se hizo, con qué evidencia y qué permanece reservado.</p>
              <Button href="/contact?origin=/cases" analyticsEvent="cta_click" analyticsTarget="cases:hero-contact" variant="secondary" className="mt-7 rounded-full border-white bg-white text-ink">Plantear un encargo</Button>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/12 bg-white/12 sm:grid-cols-3">
            {[
              ["01", "Encargos reales", "La experiencia institucional se presenta sin exagerar resultados."],
              ["02", "Método trazable", "Las decisiones analíticas y los entregables quedan explicados."],
              ["03", "Divulgación responsable", "La confidencialidad define qué evidencia puede hacerse pública."]
            ].map(([number, title, text]) => (
              <div key={number} className="bg-[#15211d] p-6 md:p-8">
                <span className="font-mono text-[10px] text-[#d9a48f]">{number}</span>
                <p className="mt-8 text-lg font-medium text-white">{title}</p>
                <p className="mt-3 text-xs leading-6 text-white/52">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.58fr_1fr] md:items-end">
            <div><Eyebrow>Experiencia institucional</Eyebrow><Heading size="xl">Consultorías reales, publicadas con criterio.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/68 md:justify-self-end">Tres encargos realizados como consultor independiente para entidades públicas. Las versiones abiertas describen problema, alcance, método y productos, pero no exponen información contractual reservada.</p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {institutionalCases.map((item, index) => <InstitutionalCaseCard key={item.url} item={item} index={index} />)}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#ded9cc]">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.58fr_1fr] md:items-end">
            <div><Eyebrow>Plataforma territorial</Eyebrow><Heading size="xl">Escala nacional, lectura local.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/68 md:justify-self-end">DataPerú demuestra cómo transformar fuentes públicas dispersas en una infraestructura indexable, actualizable y útil para cada municipalidad.</p>
          </div>
          <CaseProofCard proof={productProofs.dataperu} layout="featured" className="mt-12" />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.58fr_1fr] md:items-end">
            <div><Eyebrow>Análisis aplicado</Eyebrow><Heading size="xl">Del documento y la encuesta a una experiencia pública.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/68 md:justify-self-end">Planómetro y Barómetro muestran capacidades de procesamiento documental, encuesta, modelado, validación y diseño editorial.</p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <CaseProofCard proof={productProofs.planometro} />
            <CaseProofCard proof={productProofs.barometro} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <NextLink href="/muestras" className="group grid gap-10 rounded-md border border-border bg-panel p-6 transition-all hover:border-border-strong hover:shadow-subtle md:grid-cols-[0.42fr_1fr] md:p-10">
            <div><Eyebrow>Muestras demostrativas</Eyebrow><Heading size="xl">La forma de un entregable, sin fingir un cliente.</Heading></div>
            <div className="flex flex-col justify-between gap-10"><p className="max-w-2xl text-sm leading-7 text-ink/65">Además de productos propios, publicamos ocho arquitecturas de trabajo para que puedas examinar preguntas, módulos, cronogramas y controles antes de contratar.</p><span className="inline-flex items-center gap-2 text-sm font-medium text-rust">Ver muestras <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span></div>
          </NextLink>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Reglas de evidencia</Eyebrow>
              <Heading size="xl">Mostrar capacidad sin inflar experiencia.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">Los encargos institucionales se presentan con alcance limitado; los productos propios y las demostraciones mantienen una identificación distinta.</p>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {evidenceRules.map((rule) => (
                <li key={rule} className="flex items-start gap-4 py-5 text-sm leading-6 text-ink/72">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-rust/30 text-rust"><Check className="h-3.5 w-3.5" aria-hidden /></span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <NextLink href="/contact?origin=/cases" className="group flex flex-col gap-8 rounded-[1.5rem] bg-rust p-8 text-white md:flex-row md:items-end md:justify-between md:p-12">
            <div><Eyebrow className="text-white/55">Siguiente caso</Eyebrow><Heading size="lg" className="mt-4 max-w-3xl text-white">La próxima decisión puede convertirse en una capacidad que tu equipo pueda sostener.</Heading></div>
            <span className="inline-flex items-center gap-2 text-sm font-medium">Conversemos <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
          </NextLink>
        </Container>
      </Section>
    </>
  );
}

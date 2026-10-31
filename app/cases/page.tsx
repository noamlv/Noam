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
  "Cada cifra corresponde a los documentos o datos indicados en la ficha.",
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
              <Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[13ch] text-white">Nuestra experiencia y productos</Heading>
            </div>
            <div className="reveal reveal-delay-2">
              <p className="text-base leading-8 text-white/68">Conoce las consultorías realizadas, los análisis publicados y los ejemplos de herramientas. Cada ficha explica el trabajo y sus fuentes, sin revelar información reservada.</p>
              <Button href="/contact?origin=/cases" analyticsEvent="cta_click" analyticsTarget="cases:hero-contact" variant="secondary" className="mt-7 rounded-full border-white bg-white text-ink">Conversar sobre el problema</Button>
            </div>
          </div>


        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.58fr_1fr] md:items-end">
            <div><Eyebrow>Experiencia institucional</Eyebrow><Heading size="xl">Consultorías para instituciones públicas</Heading></div>
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
            <div><Eyebrow>Plataforma territorial</Eyebrow><Heading size="xl">Datos de municipios y departamentos</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/68 md:justify-self-end">DataPerú reúne datos públicos de presupuesto, inversión y servicios para consultar y comparar municipalidades.</p>
          </div>
          <CaseProofCard proof={productProofs.dataperu} layout="featured" className="mt-12" />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.58fr_1fr] md:items-end">
            <div><Eyebrow>Análisis aplicado</Eyebrow><Heading size="xl">Análisis de planes de gobierno y encuestas</Heading></div>
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
            <div><Eyebrow>Muestras demostrativas</Eyebrow><Heading size="xl">Ejemplos de informes y herramientas</Heading></div>
            <div className="flex flex-col justify-between gap-10"><p className="max-w-2xl text-sm leading-7 text-ink/65">Consulta nueve ejemplos de informes y herramientas, con preguntas, tareas y plazos de referencia. Son demostraciones, no encargos de clientes.</p><span className="inline-flex items-center gap-2 text-sm font-medium text-rust">Ver muestras <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span></div>
          </NextLink>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Reglas de evidencia</Eyebrow>
              <Heading size="xl">Qué puedes consultar en cada caso</Heading>
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
            <div><Eyebrow className="text-white/55">Siguiente caso</Eyebrow><Heading size="lg" className="mt-4 max-w-3xl text-white">¿Necesitas un estudio o una herramienta para tu equipo?</Heading></div>
            <span className="inline-flex items-center gap-2 text-sm font-medium">Conversemos <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
          </NextLink>
        </Container>
      </Section>
    </>
  );
}

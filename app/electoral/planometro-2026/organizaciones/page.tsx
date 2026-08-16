import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { formatPlanometroNumber, formatPlanometroPercent, planometroParties, planometroSummary } from "@/lib/planometro";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const path = "/electoral/planometro-2026/organizaciones";

export const metadata = buildMetadata({
  title: "Organizaciones políticas en Planómetro 2026",
  description: "Perfiles descriptivos de 36 planes de gobierno: volumen extraído, composición temática y señales textuales con método y límites visibles.",
  path,
  image: "/og/electoral/planometro-2026"
});

export default function PlanometroOrganizationsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Electoral", path: "/electoral" }, { name: "Planómetro 2026", path: "/electoral/planometro-2026" }, { name: "Organizaciones", path }])} />

      <section className="border-b border-border pb-16 pt-14 md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div><Eyebrow className="text-rust">Planómetro 2026 · Directorio</Eyebrow><Heading as="h1" size="display" className="max-w-[14ch]">Treinta y seis planes. Una lectura comparable.</Heading></div>
            <div><p className="text-sm leading-7 text-ink/68 md:text-base">Cada perfil resume lo que el pipeline detectó en el documento procesado. No certifica candidaturas, no estima intención de voto y no convierte extensión textual en calidad política.</p><Button href="/electoral/planometro-2026#explorar" variant="ghost" className="mt-6 gap-2 px-0">Usar el explorador <ArrowRight className="h-4 w-4" aria-hidden /></Button></div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-[#ded9cc]"><Container><div className="grid divide-y divide-ink/14 sm:grid-cols-3 sm:divide-x sm:divide-y-0">{[
        [formatPlanometroNumber(planometroSummary.plans), "planes procesados"],
        [formatPlanometroNumber(planometroSummary.operationalProposals), "propuestas bajo criterio"],
        [formatPlanometroPercent(planometroSummary.operationalSharePercent), "del universo detectado"]
      ].map(([value, label]) => <div key={label} className="py-7 sm:px-7 sm:first:pl-0"><p className="text-3xl font-medium tracking-[-0.05em] text-ink">{value}</p><p className="mt-2 text-[10px] uppercase tracking-[0.13em] text-ink/55">{label}</p></div>)}</div></Container></section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.42fr_1fr] md:items-end"><div><FileText className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Perfiles programáticos</Eyebrow><Heading size="xl">Abrir el documento desde sus señales.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65">Las tarjetas se ordenan alfabéticamente. Los ejes destacados corresponden a la mayor participación dentro de cada extracción, no a prioridades oficialmente declaradas.</p></div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
            {planometroParties.map((party, index) => (
              <NextLink key={party.slug} href={`${path}/${party.slug}`} className="group flex min-h-[300px] flex-col bg-panel p-6 transition-colors hover:bg-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust">
                <div className="flex items-center justify-between"><span className="font-mono text-[9px] text-rust">ORG · {String(index + 1).padStart(2, "0")}</span><Badge>{formatPlanometroNumber(party.operationalProposals)} propuestas</Badge></div>
                <h2 className="mt-12 text-2xl font-medium tracking-[-0.035em] text-ink">{party.name}</h2>
                <p className="mt-4 text-xs leading-5 text-ink/58">{party.topAxes.map((axis) => axis.label).join(" · ")}</p>
                <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-5"><div><p className="text-xl font-medium tracking-[-0.03em] text-ink">{formatPlanometroPercent(party.operationalSharePercent)}</p><p className="mt-1 text-[8px] text-muted">del universo detectado</p></div><ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-rust" aria-hidden /></div>
              </NextLink>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#15211d] text-white"><Container><div className="grid gap-10 md:grid-cols-[0.42fr_1fr] md:items-end"><div><ShieldCheck className="h-5 w-5 text-[#d9a48f]" aria-hidden /><Eyebrow className="mt-6 text-[#d9a48f]">Lectura responsable</Eyebrow><Heading size="xl" className="text-white">Comparar texto no equivale a evaluar gobierno.</Heading></div><div><p className="max-w-2xl text-base leading-8 text-white/60">Los perfiles sirven para formular preguntas, localizar temas y revisar señales explícitas. La viabilidad exige competencias, costos, normas, capacidades, territorio y contraste documental adicional.</p><Button href="/electoral/planometro-2026/ejes" variant="secondary" className="mt-7 rounded-full border-white bg-white text-ink">Explorar los 11 ejes</Button></div></div></Container></Section>
    </>
  );
}

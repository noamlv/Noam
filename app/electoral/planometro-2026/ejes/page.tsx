import { ArrowRight, Layers3 } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { formatPlanometroNumber, formatPlanometroPercent, getPlanometroAxisEditorial, getPlanometroAxisParties, planometroAxes, planometroSummary } from "@/lib/planometro";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const path = "/electoral/planometro-2026/ejes";

export const metadata = buildMetadata({
  title: "Ejes temáticos de los planes de gobierno 2026",
  description: "Once lecturas temáticas del corpus Planómetro 2026: volumen, señales operativas, organizaciones y preguntas para analizar cada agenda.",
  path,
  image: "/og/electoral/planometro-2026"
});

export default function PlanometroAxesPage() {
  const maximum = Math.max(...planometroAxes.map((axis) => axis.sharePercent), 1);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Electoral", path: "/electoral" }, { name: "Planómetro 2026", path: "/electoral/planometro-2026" }, { name: "Ejes", path }])} />

      <section className="overflow-hidden bg-[#15211d] pb-16 pt-14 text-white md:pb-24 md:pt-20"><Container><div className="grid gap-14 lg:grid-cols-[0.86fr_1fr] lg:items-end lg:gap-20"><div><Eyebrow className="text-[#d9a48f]">Planómetro 2026 · Agenda agregada</Eyebrow><Heading as="h1" size="display" className="max-w-[11ch] text-white">Once puertas para leer la agenda.</Heading></div><div><p className="max-w-xl text-base leading-8 text-white/65">Los ejes organizan {formatPlanometroNumber(planometroSummary.operationalProposals)} propuestas filtradas. Son categorías analíticas del pipeline, no capítulos oficiales ni una medición de importancia electoral.</p><div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/12"><div className="bg-[#15211d] p-5"><p className="text-3xl font-medium">{planometroSummary.axes}</p><p className="mt-2 text-[9px] text-white/55">ejes analíticos</p></div><div className="bg-[#15211d] p-5"><p className="text-3xl font-medium">{formatPlanometroNumber(planometroSummary.plans)}</p><p className="mt-2 text-[9px] text-white/55">documentos procesados</p></div></div></div></div></Container></section>

      <Section><Container><div className="grid gap-9 md:grid-cols-[0.42fr_1fr]"><div><Layers3 className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Mapa temático</Eyebrow><Heading size="xl">Volumen, cobertura y preguntas.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">“Otros” se mantiene visible porque el residuo de clasificación también informa sobre los límites del modelo.</p></div><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
        {planometroAxes.map((axis, index) => {
          const editorial = getPlanometroAxisEditorial(axis.key);
          const organizations = getPlanometroAxisParties(axis.key).length;
          return <NextLink key={axis.key} href={`${path}/${axis.key}`} className="group flex min-h-[330px] flex-col bg-panel p-6 transition-colors hover:bg-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"><div className="flex items-center justify-between"><span className="font-mono text-[9px] text-rust">EJE · {String(index + 1).padStart(2, "0")}</span><Badge>{organizations} organizaciones</Badge></div><h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-ink">{axis.label}</h2><p className="mt-3 text-xs leading-5 text-ink/58">{editorial.description}</p><div className="mt-auto pt-8"><div className="flex items-center justify-between text-[9px] text-muted"><span>{formatPlanometroNumber(axis.proposals)} propuestas</span><span>{formatPlanometroPercent(axis.sharePercent)}</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-[#5f796e]" style={{ width: `${(axis.sharePercent / maximum) * 100}%` }} /></div><span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink">Abrir lectura <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span></div></NextLink>;
        })}
      </div></div></Container></Section>
    </>
  );
}

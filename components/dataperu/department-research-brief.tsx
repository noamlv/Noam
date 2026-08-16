import { ArrowRight, BriefcaseBusiness, Building2, CircleHelp, Database, Landmark, UsersRound } from "lucide-react";
import { Badge, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import type { DepartmentResearch } from "@/lib/department-research";

type DepartmentResearchBriefProps = {
  research: DepartmentResearch;
  contactHref: string;
};

const dateFormat = new Intl.DateTimeFormat("es-PE", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

export function DepartmentResearchBrief({ research, contactHref }: DepartmentResearchBriefProps) {
  return (
    <>
      <Section id="agenda-territorial" className="border-y border-border bg-[#f4f2ed]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_1fr] lg:gap-20">
            <div>
              <Landmark className="h-5 w-5 text-rust" aria-hidden />
              <Eyebrow className="mt-6">Agenda territorial</Eyebrow>
              <Heading size="xl">Problemas que exigen decisiones conectadas.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/66">{research.thesis}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge>En validación</Badge>
                <Badge>Confianza {research.confidence}</Badge>
                <Badge>{dateFormat.format(new Date(research.researchDate))}</Badge>
                {research.evidenceBase?.sourceCount ? <Badge>{research.evidenceBase.sourceCount} fuentes</Badge> : null}
              </div>
              {research.evidenceBase ? (
                <div className="mt-6 border-l border-border-strong pl-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Base {research.evidenceBase.scope}
                    {research.evidenceBase.officialSources ? ` · fuentes oficiales ${research.evidenceBase.officialSources === "total" ? "exclusivas" : "parciales"}` : ""}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-ink/58">{research.evidenceBase.note}</p>
                </div>
              ) : null}
            </div>

            <div className="divide-y divide-border border-y border-border">
              {research.problems.map((problem, index) => (
                <article key={problem.title} className="grid gap-6 py-8 lg:grid-cols-[52px_0.72fr_1fr] lg:gap-8">
                  <span className="font-mono text-[10px] text-rust">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 className="text-xl font-medium tracking-[-0.03em] text-ink">{problem.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-ink/64">{problem.problem}</p>
                    <div className="mt-5 border-l border-border-strong pl-4">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">Población y actores afectados</p>
                      <p className="mt-2 text-xs leading-5 text-ink/68">{problem.affected}</p>
                    </div>
                  </div>
                  <div className="grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div className="bg-panel p-5">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-rust">Decisión pública</p>
                      <p className="mt-3 text-xs leading-5 text-ink/72">{problem.governmentDecision}</p>
                    </div>
                    <div className="bg-[#e8e4da] p-5">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/48">Cómo ayuda NOAM</p>
                      <p className="mt-3 text-xs leading-5 text-ink/72">{problem.noamResponse}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_1fr] lg:gap-20">
            <div>
              <BriefcaseBusiness className="h-5 w-5 text-rust" aria-hidden />
              <Eyebrow className="mt-6">Empresas y emprendimiento</Eyebrow>
              <Heading size="xl">Oportunidades que todavía deben probarse.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">No presentamos estas oportunidades como mercados garantizados. Son hipótesis para validar con demanda, compradores, costos, regulación y capacidad local.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {research.opportunities.map((opportunity, index) => (
                <article key={opportunity.title} className="flex min-h-[360px] flex-col rounded-md border border-border bg-panel p-6">
                  <div className="flex items-center justify-between"><Badge>Hipótesis {index + 1}</Badge><Building2 className="h-4 w-4 text-rust" aria-hidden /></div>
                  <h2 className="mt-9 text-xl font-medium tracking-[-0.03em] text-ink">{opportunity.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/64">{opportunity.rationale}</p>
                  <div className="mt-auto space-y-4 border-t border-border pt-5">
                    <div><p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-muted">Quién puede actuar</p><p className="mt-2 text-xs leading-5 text-ink/65">{opportunity.actors}</p></div>
                    <div><p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-muted">Prueba necesaria</p><p className="mt-2 text-xs leading-5 text-ink/65">{opportunity.validation}</p></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#15211d] text-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_1fr] lg:gap-20">
            <div>
              <Database className="h-5 w-5 text-[#d9a48f]" aria-hidden />
              <Eyebrow className="mt-6 text-[#d9a48f]">Capacidad NOAM</Eyebrow>
              <Heading size="xl" className="text-white">De la señal a una herramienta de gestión.</Heading>
              <p className="mt-5 text-sm leading-7 text-white/62">Cada módulo puede comenzar como diagnóstico acotado y crecer hacia un sistema operado por la institución.</p>
              <Button href={contactHref} variant="secondary" className="mt-7 gap-2 rounded-full border-white bg-white text-ink">Trabajar en {research.department} <ArrowRight className="h-4 w-4" aria-hidden /></Button>
            </div>
            <div className="grid gap-px overflow-hidden rounded-md bg-white/12 md:grid-cols-3">
              {research.interventions.map((intervention, index) => (
                <article key={intervention.title} className="min-h-[300px] bg-[#1a2b25] p-6">
                  <span className="font-mono text-[10px] text-[#d9a48f]">0{index + 1}</span>
                  <h2 className="mt-12 text-xl font-medium tracking-[-0.03em] text-white">{intervention.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-white/62">{intervention.outcome}</p>
                  <div className="mt-6 border-t border-white/12 pt-5"><p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-white/36">Entregable inicial</p><p className="mt-2 text-xs leading-5 text-white/68">{intervention.deliverable}</p></div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-6 border-t border-white/12 pt-8 lg:grid-cols-[0.4fr_1fr] lg:gap-20">
            <div><CircleHelp className="h-4 w-4 text-[#d9a48f]" aria-hidden /><p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/48">Información pendiente</p><p className="mt-3 text-xs leading-5 text-white/52">Vacíos que deben resolverse antes de recomendar una inversión o política específica.</p></div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {research.evidenceGaps.map((gap) => <li key={gap} className="flex gap-3 border-b border-white/10 pb-3 text-xs leading-5 text-white/66"><UsersRound className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d9a48f]" aria-hidden />{gap}</li>)}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}

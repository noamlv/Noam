"use client";

import { ArrowRight, ChevronDown, Search } from "lucide-react";
import NextLink from "next/link";
import { useMemo, useState } from "react";
import type { DepartmentResearch } from "@/lib/department-research";

type ViewMode = "problems" | "opportunities";

type ProblemEntry = {
  id: string;
  kind: "problems";
  code: string;
  department: string;
  confidence: DepartmentResearch["confidence"];
  scope: "departamental" | "macroregional";
  title: string;
  summary: string;
  affected: string;
  decision: string;
  response: string;
};

type OpportunityEntry = {
  id: string;
  kind: "opportunities";
  code: string;
  department: string;
  confidence: DepartmentResearch["confidence"];
  scope: ProblemEntry["scope"];
  title: string;
  summary: string;
  actors: string;
  validation: string;
};

type AgendaEntry = ProblemEntry | OpportunityEntry;

const normalize = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLocaleLowerCase("es-PE");

function buildEntries(research: DepartmentResearch[]): AgendaEntry[] {
  return research.flatMap((department) => {
    const shared = {
      code: department.code,
      department: department.department,
      confidence: department.confidence,
      scope: department.evidenceBase?.scope ?? "departamental"
    } as const;

    return [
      ...department.problems.map((problem, index): ProblemEntry => ({
        ...shared,
        id: `problem-${department.code}-${index}`,
        kind: "problems",
        title: problem.title,
        summary: problem.problem,
        affected: problem.affected,
        decision: problem.governmentDecision,
        response: problem.noamResponse
      })),
      ...department.opportunities.map((opportunity, index): OpportunityEntry => ({
        ...shared,
        id: `opportunity-${department.code}-${index}`,
        kind: "opportunities",
        title: opportunity.title,
        summary: opportunity.rationale,
        actors: opportunity.actors,
        validation: opportunity.validation
      }))
    ];
  });
}

export function TerritorialAgendaExplorer({ research }: { research: DepartmentResearch[] }) {
  const [view, setView] = useState<ViewMode>("problems");
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("Todos");
  const entries = useMemo(() => buildEntries(research), [research]);
  const departments = useMemo(() => research.map((item) => ({ code: item.code, name: item.department })), [research]);

  const results = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    return entries.filter((entry) => {
      if (entry.kind !== view || (department !== "Todos" && entry.code !== department)) return false;
      if (!normalizedQuery) return true;
      const detail = entry.kind === "problems"
        ? `${entry.affected} ${entry.decision} ${entry.response}`
        : `${entry.actors} ${entry.validation}`;
      return normalize(`${entry.department} ${entry.title} ${entry.summary} ${detail}`).includes(normalizedQuery);
    });
  }, [department, entries, query, view]);

  const visibleResults = results.slice(0, 36);
  const fieldClass = "min-h-12 w-full rounded-sm border border-border bg-panel px-4 text-sm text-ink outline-none transition-colors duration-200 focus:border-rust focus:ring-2 focus:ring-rust/15";

  return (
    <div>
      <div className="rounded-[1.25rem] border border-border bg-canvas p-4 shadow-subtle md:p-6">
        <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="Tipo de agenda">
          {[
            { value: "problems" as const, label: "Problemas públicos", count: entries.filter((entry) => entry.kind === "problems").length },
            { value: "opportunities" as const, label: "Oportunidades por validar", count: entries.filter((entry) => entry.kind === "opportunities").length }
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={view === option.value}
              onClick={() => setView(option.value)}
              className={`flex min-h-14 items-center justify-between rounded-sm border px-4 text-left text-sm font-medium transition-all duration-200 ${view === option.value ? "border-ink bg-ink text-white" : "border-border bg-panel text-ink hover:border-border-strong"}`}
            >
              <span>{option.label}</span>
              <span className="font-mono text-[10px] opacity-60">{option.count}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_280px]">
          <label className="relative">
            <span className="sr-only">Buscar por problema, población o actividad</span>
            <Search className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Agua, empleo, seguridad, agricultura, turismo…"
              className={`${fieldClass} pl-11`}
            />
          </label>
          <label>
            <span className="sr-only">Filtrar por departamento</span>
            <select value={department} onChange={(event) => setDepartment(event.target.value)} className={fieldClass}>
              <option value="Todos">Todo el Perú</option>
              {departments.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 text-xs text-muted">
        <p aria-live="polite">{results.length} {view === "problems" ? "problemas para investigar" : "oportunidades por validar"}</p>
        <p>Agenda editorial; no es un ranking ni una recomendación automática.</p>
      </div>

      {visibleResults.length > 0 ? (
        <div className="divide-y divide-border">
          {visibleResults.map((entry) => (
            <article key={entry.id} className="grid gap-5 py-7 lg:grid-cols-[180px_1fr] lg:gap-10">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-rust">{entry.department} · {entry.code}</p>
                <p className="mt-2 text-[10px] leading-5 text-muted">
                  Confianza {entry.confidence} · base {entry.scope === "macroregional" ? "macroregional preliminar" : "departamental"}
                </p>
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-medium tracking-[-0.025em] text-ink md:text-2xl">{entry.title}</h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-ink/65">{entry.summary}</p>

                <details className="group mt-5 border-y border-border">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-xs font-medium text-ink marker:content-none">
                    {entry.kind === "problems" ? "Ver población, decisión y respuesta posible" : "Ver actores y prueba necesaria"}
                    <ChevronDown className="h-4 w-4 shrink-0 text-rust transition-transform duration-200 group-open:rotate-180" aria-hidden />
                  </summary>
                  {entry.kind === "problems" ? (
                    <div className="grid gap-px border-t border-border bg-border sm:grid-cols-3">
                      <div className="bg-panel p-5"><p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-muted">Población y actores</p><p className="mt-3 text-xs leading-5 text-ink/68">{entry.affected}</p></div>
                      <div className="bg-panel p-5"><p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-muted">Decisión pública</p><p className="mt-3 text-xs leading-5 text-ink/68">{entry.decision}</p></div>
                      <div className="bg-[#f2efe7] p-5"><p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-rust">Respuesta posible</p><p className="mt-3 text-xs leading-5 text-ink/72">{entry.response}</p></div>
                    </div>
                  ) : (
                    <div className="grid gap-px border-t border-border bg-border sm:grid-cols-2">
                      <div className="bg-panel p-5"><p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-muted">Quién puede actuar</p><p className="mt-3 text-xs leading-5 text-ink/68">{entry.actors}</p></div>
                      <div className="bg-[#f2efe7] p-5"><p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-rust">Validación necesaria</p><p className="mt-3 text-xs leading-5 text-ink/72">{entry.validation}</p></div>
                    </div>
                  )}
                </details>

                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <NextLink href={`/dataperu/departamentos/${entry.code}`} className="inline-flex items-center gap-2 text-xs font-medium text-ink transition-colors hover:text-rust">
                    Abrir agenda de {entry.department} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </NextLink>
                  <NextLink
                    href={`/contact?interest=dataperu&territory=${encodeURIComponent(entry.department)}&from=/dataperu/agendas-territoriales`}
                    data-analytics-event="cta_click"
                    data-analytics-target={`territorial-agenda:${entry.code}:${entry.kind}`}
                    className="text-xs font-medium text-rust transition-colors hover:text-ink"
                  >
                    Analizar este tema
                  </NextLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-border bg-panel px-6 py-14 text-center">
          <p className="text-sm text-ink/65">No encontramos coincidencias con esos filtros.</p>
          <button type="button" onClick={() => { setQuery(""); setDepartment("Todos"); }} className="mt-4 text-xs font-medium text-rust hover:text-ink">Limpiar búsqueda</button>
        </div>
      )}

      {results.length > visibleResults.length ? (
        <p className="mt-6 text-center text-xs text-muted">Mostrando las primeras {visibleResults.length} coincidencias. Usa el tema o el departamento para acotar la búsqueda.</p>
      ) : null}
    </div>
  );
}

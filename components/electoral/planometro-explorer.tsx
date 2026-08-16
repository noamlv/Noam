"use client";

import { ArrowRight, CircleDollarSign, Clock3, FileText, Search, Target } from "lucide-react";
import NextLink from "next/link";
import { useMemo, useState } from "react";
import type { PlanometroParty } from "@/lib/planometro";
import { formatPlanometroNumber, formatPlanometroPercent, formatPlanometroScore } from "@/lib/planometro";

type SortKey = "name" | "proposals" | "concreteness";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es-PE");

export function PlanometroExplorer({ parties }: { parties: PlanometroParty[] }) {
  const [selectedSlug, setSelectedSlug] = useState(parties[0]?.slug ?? "");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("name");
  const selected = parties.find((party) => party.slug === selectedSlug) ?? parties[0];
  const axisMaximum = Math.max(...selected.axes.map((axis) => axis.sharePercent), 1);
  const rows = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    return parties
      .filter((party) => !normalizedQuery || normalize(party.name).includes(normalizedQuery))
      .sort((left, right) => {
        if (sort === "proposals") return right.operationalProposals - left.operationalProposals;
        if (sort === "concreteness") return right.averageConcreteness - left.averageConcreteness;
        return left.name.localeCompare(right.name, "es-PE");
      });
  }, [parties, query, sort]);

  const fieldClass = "h-12 w-full rounded-sm border border-border bg-panel px-4 text-sm text-ink outline-none transition-colors focus:border-rust";
  const components = [
    { icon: Target, label: "Meta cuantitativa", value: selected.quantTargetPercent },
    { icon: Clock3, label: "Horizonte temporal", value: selected.timeHorizonPercent },
    { icon: CircleDollarSign, label: "Costo o financiamiento", value: selected.costOrFundingPercent }
  ];

  return (
    <div data-testid="planometro-explorer" className="overflow-hidden rounded-[1.25rem] border border-border bg-panel shadow-subtle">
      <div className="border-b border-border bg-canvas p-5 md:p-7">
        <div className="grid gap-4 lg:grid-cols-[1fr_250px] lg:items-end"><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-rust">Organización en el corpus</p><label className="mt-3 block"><span className="sr-only">Organización política</span><select value={selected.slug} onChange={(event) => setSelectedSlug(event.target.value)} className={`${fieldClass} text-base font-medium`}>{parties.map((party) => <option key={party.slug} value={party.slug}>{party.name}</option>)}</select></label></div><div className="rounded-sm border border-border bg-panel px-4 py-3"><p className="text-[9px] leading-4 text-muted">Snapshot del corpus, no padrón vigente ni lista oficial de candidaturas.</p></div></div>
      </div>

      <div className="grid lg:grid-cols-[0.72fr_1fr]">
        <section className="border-b border-border bg-[#15211d] p-6 text-white md:p-8 lg:border-b-0 lg:border-r" aria-live="polite">
          <div className="flex items-center justify-between border-b border-white/14 pb-5"><span className="font-mono text-[9px] text-white/35">ORG · {String(parties.findIndex((party) => party.slug === selected.slug) + 1).padStart(2, "0")}</span><span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#d9a48f]">Perfil programático</span></div>
          <FileText className="mt-8 h-5 w-5 text-[#d9a48f]" aria-hidden />
          <h3 className="mt-6 text-3xl font-medium tracking-[-0.045em] text-white">{selected.name}</h3>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/12">{[
            [formatPlanometroNumber(selected.operationalProposals), "propuestas bajo criterio"],
            [formatPlanometroPercent(selected.operationalSharePercent), "del universo detectado"],
            [formatPlanometroScore(selected.averageConcreteness), "concreción textual"],
            [formatPlanometroPercent(selected.quantTargetPercent), "con meta cuantitativa"]
          ].map(([value, label]) => <div key={label} className="min-h-[112px] bg-[#15211d] p-4"><p className="text-2xl font-medium tracking-[-0.04em]">{value}</p><p className="mt-2 text-[8px] leading-4 text-white/55">{label}</p></div>)}</div>
          <p className="mt-6 text-xs leading-5 text-white/48">Los conteos dependen de extracción automatizada. El score resume rasgos textuales y no determina calidad, viabilidad o conveniencia política.</p>
          <NextLink href={`/electoral/planometro-2026/organizaciones/${selected.slug}`} className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-white/78 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d9a48f]">Abrir perfil indexable <ArrowRight className="h-3.5 w-3.5" aria-hidden /></NextLink>
        </section>

        <section className="p-6 md:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Composición por eje</p>
          <div className="mt-6 space-y-3">{selected.axes.map((axis) => <div key={axis.key} className="grid grid-cols-[128px_1fr_48px] items-center gap-3"><p className="truncate text-[10px] text-ink/62" title={axis.label}>{axis.label}</p><div className="h-5 overflow-hidden rounded-sm bg-border/70"><div className="h-full rounded-sm bg-[#5f796e] transition-[width] duration-200" style={{ width: `${(axis.sharePercent / axisMaximum) * 100}%` }} /></div><p className="text-right font-mono text-[9px] text-muted">{formatPlanometroPercent(axis.sharePercent)}</p></div>)}</div>
          <div className="mt-8 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">{components.map(({ icon: Icon, label, value }) => <div key={label} className="bg-panel p-4"><Icon className="h-4 w-4 text-rust" aria-hidden /><p className="mt-6 text-xl font-medium tracking-[-0.035em] text-ink">{formatPlanometroPercent(value)}</p><p className="mt-1 text-[8px] leading-4 text-muted">{label}</p></div>)}</div>
        </section>
      </div>

      <div className="border-t border-border p-5 md:p-7">
        <div className="grid gap-3 sm:grid-cols-[1fr_260px]"><label className="relative"><span className="sr-only">Buscar organización</span><Search className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-muted" aria-hidden /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar organización" className={`${fieldClass} pl-11`} /></label><label><span className="sr-only">Ordenar organizaciones</span><select value={sort} onChange={(event) => setSort(event.target.value as SortKey)} className={fieldClass}><option value="name">Nombre A–Z</option><option value="proposals">Más propuestas bajo criterio</option><option value="concreteness">Mayor concreción textual</option></select></label></div>
        <div className="mt-5 flex items-center justify-between gap-4 border-y border-border py-4 text-[10px] text-muted"><p aria-live="polite">{rows.length} organizaciones</p><p>Orden descriptivo; no es un ranking electoral.</p></div>
        <div className="mt-4 divide-y divide-border border-y border-border">{rows.map((party) => <button key={party.slug} type="button" onClick={() => setSelectedSlug(party.slug)} className="group grid w-full gap-3 py-4 text-left transition-colors hover:text-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust sm:grid-cols-[1fr_110px_110px_auto] sm:items-center"><span><span className="block text-sm font-medium text-ink group-hover:text-rust">{party.name}</span><span className="mt-1 block text-[9px] text-muted">{party.topAxes.map((axis) => axis.label).join(" · ")}</span></span><span className="text-xs text-ink/65">{formatPlanometroNumber(party.operationalProposals)} propuestas</span><span className="text-xs text-ink/65">{formatPlanometroScore(party.averageConcreteness)} concreción</span><ArrowRight className="h-4 w-4 justify-self-end text-muted transition-transform group-hover:translate-x-1" aria-hidden /></button>)}</div>
      </div>
    </div>
  );
}

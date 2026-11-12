"use client";

import { useState } from "react";
import type { AnalysisGroup } from "@/lib/analysis-library";

const number = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 2 });
const percent = new Intl.NumberFormat("es-PE", { style: "percent", maximumFractionDigits: 1 });
const measures = [
  { key: "value", label: "Monto reportado" },
  { key: "records", label: "Registros" }
] as const;

export function AthleteBreakdown({ groups, label, accent }: { groups: AnalysisGroup[]; label: string; accent: string }) {
  const [measure, setMeasure] = useState<"value" | "records">("value");
  const [expanded, setExpanded] = useState(false);
  const sorted = [...groups].sort((a, b) => b[measure] - a[measure]);
  const total = sorted.reduce((sum, group) => sum + group[measure], 0);
  const max = sorted[0][measure];
  const shown = expanded ? sorted : sorted.slice(0, 10);

  return <figure className="mt-6 rounded-xl border border-border bg-[#f8faf9] p-4 sm:p-6">
    <figcaption className="text-sm font-semibold">{label}</figcaption>
    <div role="group" aria-label={`Medida de ${label.toLowerCase()}`} className="my-4 flex flex-wrap gap-2">
      {measures.map((option) => <button type="button" key={option.key} aria-pressed={measure === option.key}
        onClick={() => setMeasure(option.key)}
        className={`min-h-10 rounded-full border px-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16746d] ${measure === option.key ? "border-[#155950] bg-[#155950] text-white" : "border-border bg-white text-ink"}`}>{option.label}</button>)}
    </div>
    <ol className="space-y-3 border-t border-border pt-4">
      {shown.map((group) => <li key={group.label}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
          <span>{group.label}</span>
          <span className="shrink-0 tabular-nums">{measure === "value" ? "S/ " : ""}{number.format(group[measure])} <span className="text-xs text-ink/70">({percent.format(group[measure] / total)})</span></span>
        </div>
        <div aria-hidden="true" className="mt-1.5 h-2 rounded-full bg-[#e9efec]"><div className="h-full rounded-full" style={{ width: `${group[measure] / max * 100}%`, backgroundColor: accent }} /></div>
      </li>)}
    </ol>
    {sorted.length > 10 && <button type="button" aria-expanded={expanded} className="mt-4 min-h-10 text-sm font-semibold text-[#155950] underline underline-offset-4" onClick={() => setExpanded(!expanded)}>
      {expanded ? "Mostrar las 10 primeras" : `Ver las ${sorted.length} categorías`}
    </button>}
  </figure>;
}

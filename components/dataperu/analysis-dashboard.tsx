"use client";

import { useState } from "react";
import type { AnalysisSnapshot } from "@/lib/analysis-library";

const format = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 2 });
const percentage = new Intl.NumberFormat("es-PE", { style: "percent", maximumFractionDigits: 2 });

export function AnalysisDashboard({ snapshot }: { snapshot: AnalysisSnapshot }) {
  const temporal = snapshot.slices.every((slice) => /^\d{4}$/.test(slice.period));
  const [period, setPeriod] = useState(temporal ? snapshot.slices.at(-1)!.period : snapshot.slices[0].period);
  const selected = snapshot.slices.find((slice) => slice.period === period)!;
  const total = selected.groups.reduce((sum, group) => sum + group.value, 0);
  const maximum = Math.max(...selected.groups.map((group) => group.value), 1);
  const histories = snapshot.slices.map((slice) => ({ label: slice.label, total: slice.groups.reduce((sum, group) => sum + group.value, 0) }));
  const historyMax = Math.max(...histories.map((entry) => entry.total), 1);

  function download() {
    const csvCell = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`;
    const rows = [["Ambito o periodo", "Categoria", "Valor", "Unidad", "Filas con dato"], ...selected.groups.map((group) => [selected.label, group.label, group.value, snapshot.unit, group.records])];
    const url = URL.createObjectURL(new Blob(["\uFEFF", rows.map((row) => row.map(csvCell).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = `noam-${snapshot.slug}-${selected.period}.csv`; link.click();
    URL.revokeObjectURL(url);
  }

  return <div className="space-y-10">
    <div className="flex flex-col gap-6 rounded-md border border-border bg-panel p-6 sm:flex-row sm:items-end sm:justify-between">
      <label className="text-xs font-medium text-muted">{temporal ? "Periodo del archivo" : "Ámbito de análisis"}
        <select value={period} onChange={(event) => setPeriod(event.target.value)} className="mt-2 block min-h-12 w-full rounded-sm border border-border bg-canvas px-4 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-rust sm:min-w-64">
          {snapshot.slices.map((slice) => <option key={slice.period} value={slice.period}>{slice.label}</option>)}
        </select>
      </label>
      <div aria-live="polite"><p className="text-xs text-muted">{selected.label} · {snapshot.unit}</p><p className="mt-2 text-3xl font-medium tracking-tight text-ink">{format.format(total)}</p></div>
      <button type="button" onClick={download} className="min-h-11 rounded-full border border-border px-5 text-xs font-medium text-ink transition-colors hover:border-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-rust">Descargar agregados CSV</button>
    </div>
    <p className="text-xs leading-6 text-muted">Solo se muestran datos de la copia identificada, no información en vivo. {selected.missing > 0 ? `${selected.missing} filas sin valor en este periodo: la suma mostrada es parcial, no se imputaron ceros.` : "No hay valores faltantes en la medida seleccionada."} {temporal && selected.period === "2025" ? "2025 es parcial: enero a septiembre; no equivale a un año completo." : ""}</p>
    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <section aria-labelledby="analysis-composition"><h2 id="analysis-composition" className="text-2xl font-medium tracking-tight">Composición del ámbito seleccionado</h2><p className="mt-3 text-xs leading-6 text-muted">Hasta doce categorías por volumen. La tabla incluye todas. Unidad: {snapshot.unit}. No es un ranking de calidad ni desempeño.</p>
        <ol className="mt-7 space-y-4">{selected.groups.slice(0, 12).map((group) => <li key={group.label}>
          <div className="mb-2 flex justify-between gap-4 text-xs leading-5"><span className="min-w-0">{group.label}</span><span className="shrink-0 font-mono">{format.format(group.value)}</span></div>
          <div aria-hidden className="h-3 bg-panel"><div className="h-full bg-[#799084]" style={{ width: `${group.value / maximum * 100}%` }} /></div>
        </li>)}</ol>
      </section>
      {temporal ? <section aria-labelledby="analysis-history"><h2 id="analysis-history" className="text-2xl font-medium tracking-tight">Periodos en contexto</h2><p className="mt-3 text-xs leading-6 text-muted">Suma de valores informados de cada periodo. Las coberturas y periodos parciales limitan la comparación. Selecciona un periodo arriba para ver su composición.</p>
        <ol className="mt-7 space-y-4">{histories.map((entry) => <li key={entry.label}>
          <div className="mb-2 flex justify-between gap-3 text-xs"><span>{entry.label}</span><span className="font-mono">{format.format(entry.total)}</span></div>
          <div aria-hidden className="h-3 bg-panel"><div className="h-full bg-rust" style={{ width: `${entry.total / historyMax * 100}%` }} /></div>
        </li>)}</ol>
      </section> : <aside className="border-l border-border pl-6"><p className="text-xs font-semibold uppercase tracking-widest text-rust">Cómo leerlo</p><p className="mt-5 text-base leading-8 text-ink/70">Cada barra representa un agregado de la copia histórica. Cambiar de ámbito cambia también el denominador. Consulta el periodo, las definiciones y las limitaciones antes de formular conclusiones.</p><p className="mt-5 text-sm leading-7 text-muted">Los porcentajes se calculan sobre la suma de categorías del ámbito seleccionado, no sobre un universo externo. Los resultados no demuestran causalidad.</p></aside>}
    </div>
    <section aria-labelledby="analysis-detail"><h2 id="analysis-detail" className="text-2xl font-medium tracking-tight">Detalle del agregado</h2><div className="mt-6 overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">{selected.label}, {snapshot.unit}. Porcentajes del total informado seleccionado.</caption><thead className="border-y border-border text-xs text-muted"><tr><th scope="col" className="py-4 pr-5">Categoría</th><th scope="col" className="px-4 py-4 text-right">Valor</th><th scope="col" className="px-4 py-4 text-right">% del agregado</th><th scope="col" className="py-4 pl-4 text-right">Filas con dato</th></tr></thead><tbody className="divide-y divide-border">{selected.groups.map((group) => <tr key={group.label}><th scope="row" className="py-4 pr-5 font-normal">{group.label}</th><td className="whitespace-nowrap px-4 py-4 text-right font-mono text-xs">{format.format(group.value)}</td><td className="px-4 py-4 text-right font-mono text-xs">{total > 0 ? percentage.format(group.value / total) : "No aplica"}</td><td className="py-4 pl-4 text-right font-mono text-xs">{format.format(group.records)}</td></tr>)}</tbody></table></div></section>
  </div>;
}

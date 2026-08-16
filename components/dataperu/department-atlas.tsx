"use client";

import { ArrowRight, Download, MapPinned } from "lucide-react";
import NextLink from "next/link";
import { useMemo, useState } from "react";
import type { DepartmentProfile, DepartmentSummary } from "@/lib/dataperu-departments";

type MetricKey = "budgetExecutionPercent" | "investmentExecutionPercent" | "pimPerCapita" | "internetPercent" | "updatedTransparencyPercent" | "concertedPlanPercent";

const titleCase = (value: string) => value.toLocaleLowerCase("es-PE").replace(/(^|[\s-])\p{L}/gu, (character) => character.toLocaleUpperCase("es-PE"));
const numberFormat = new Intl.NumberFormat("es-PE");
const percentFormat = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 1 });
const currencyFormat = new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", notation: "compact", maximumFractionDigits: 1 });

const metricDefinitions: Record<MetricKey, { label: string; shortLabel: string; description: string; source: string; format: (value: number) => string; color: [number, number, number] }> = {
  budgetExecutionPercent: { label: "Ejecución presupuestal total", shortLabel: "Ejecución total", description: "Devengado agregado dividido entre PIM agregado de las municipalidades del departamento.", source: "MEF · 2025", format: (value) => `${percentFormat.format(value)}%`, color: [78, 111, 96] },
  investmentExecutionPercent: { label: "Ejecución de inversión", shortLabel: "Inversión", description: "Devengado de proyectos dividido entre PIM de inversión municipal agregado.", source: "MEF · 2025", format: (value) => `${percentFormat.format(value)}%`, color: [185, 83, 55] },
  pimPerCapita: { label: "PIM municipal por habitante", shortLabel: "PIM por habitante", description: "PIM municipal agregado dividido entre población proyectada para 2025.", source: "MEF + INEI · 2025", format: (value) => new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", maximumFractionDigits: 0 }).format(value), color: [177, 139, 69] },
  internetPercent: { label: "Municipalidades con internet", shortLabel: "Con internet", description: "Proporción de municipalidades que declararon contar con servicio de internet.", source: "RENAMU · 2025", format: (value) => `${percentFormat.format(value)}%`, color: [63, 105, 116] },
  updatedTransparencyPercent: { label: "Portal de transparencia actualizado", shortLabel: "Transparencia", description: "Proporción que declaró tener actualizado su portal de transparencia estándar.", source: "RENAMU · 2025", format: (value) => `${percentFormat.format(value)}%`, color: [111, 118, 99] },
  concertedPlanPercent: { label: "Plan de desarrollo concertado", shortLabel: "Planeamiento", description: "Proporción que declaró contar con plan de desarrollo local concertado.", source: "RENAMU · 2025", format: (value) => `${percentFormat.format(value)}%`, color: [151, 93, 72] }
};

const tilePositions: Record<string, [number, number]> = {
  "24": [1, 1], "16": [5, 1], "20": [1, 2], "01": [3, 2], "14": [1, 3], "06": [2, 3], "22": [4, 3], "13": [1, 4], "10": [3, 4], "25": [5, 4], "02": [1, 5], "19": [3, 5], "15": [1, 6], "12": [3, 6], "17": [6, 6], "07": [1, 7], "09": [2, 7], "05": [3, 7], "08": [5, 7], "11": [1, 8], "03": [3, 8], "21": [6, 8], "04": [3, 9], "18": [4, 10], "23": [5, 11]
};

function percentile(values: number[], proportion: number) {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.min(Math.floor((sorted.length - 1) * proportion), sorted.length - 1)] ?? 0;
}

function csvCell(value: string | number) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function DepartmentAtlas({ profiles, summary }: { profiles: DepartmentProfile[]; summary: DepartmentSummary }) {
  const [metric, setMetric] = useState<MetricKey>("budgetExecutionPercent");
  const [selectedCode, setSelectedCode] = useState("15");
  const selected = profiles.find((profile) => profile.code === selectedCode) ?? profiles[0];
  const definition = metricDefinitions[metric];
  const range = useMemo(() => {
    const values = profiles.map((profile) => profile[metric]);
    return { low: percentile(values, 0.1), high: percentile(values, 0.9) };
  }, [metric, profiles]);

  const normalizedValue = (value: number) => range.high === range.low ? 0.5 : Math.min(1, Math.max(0, (value - range.low) / (range.high - range.low)));
  const selectedContact = `/contact?interest=dataperu&territory=${encodeURIComponent(titleCase(selected.name))}&from=/dataperu/departamentos`;

  const downloadProfile = () => {
    const rows: Array<[string, string | number]> = [
      ["Departamento", titleCase(selected.name)], ["Municipalidades", selected.municipalities], ["Población proyectada 2025", selected.population2025], ["PIM municipal 2025", selected.pim], ["Devengado municipal 2025", selected.accrued], ["Ejecución presupuestal total (%)", selected.budgetExecutionPercent], ["PIM de inversión 2025", selected.investmentPim], ["Devengado de inversión 2025", selected.investmentAccrued], ["Ejecución de inversión (%)", selected.investmentExecutionPercent], ["PIM por habitante", selected.pimPerCapita], ["Municipalidades con internet (%)", selected.internetPercent], ["Portal de transparencia actualizado (%)", selected.updatedTransparencyPercent], ["Plan de desarrollo concertado (%)", selected.concertedPlanPercent], ["COEL conformado (%)", selected.coelFormedPercent]
    ];
    const csv = `campo,valor\n${rows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`;
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `dataperu-departamento-${selected.code}.csv`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const detailMetrics: Array<{ label: string; value: number; national: number; formatter: (value: number) => string }> = [
    { label: "Ejecución total", value: selected.budgetExecutionPercent, national: summary.budgetExecutionPercent, formatter: metricDefinitions.budgetExecutionPercent.format },
    { label: "Ejecución de inversión", value: selected.investmentExecutionPercent, national: summary.investmentExecutionPercent, formatter: metricDefinitions.investmentExecutionPercent.format },
    { label: "PIM por habitante", value: selected.pimPerCapita, national: summary.pimPerCapita, formatter: metricDefinitions.pimPerCapita.format },
    { label: "Internet municipal", value: selected.internetPercent, national: summary.internetPercent, formatter: metricDefinitions.internetPercent.format },
    { label: "Transparencia actualizada", value: selected.updatedTransparencyPercent, national: summary.updatedTransparencyPercent, formatter: metricDefinitions.updatedTransparencyPercent.format },
    { label: "Planeamiento concertado", value: selected.concertedPlanPercent, national: summary.concertedPlanPercent, formatter: metricDefinitions.concertedPlanPercent.format }
  ];

  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-border bg-panel shadow-subtle">
      <div className="border-b border-border bg-canvas p-5 md:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-rust">Selecciona una lectura</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(metricDefinitions) as MetricKey[]).map((key) => <button key={key} type="button" aria-pressed={metric === key} onClick={() => setMetric(key)} className={`min-h-14 rounded-sm border px-4 py-3 text-left text-xs font-medium transition-all duration-200 ${metric === key ? "border-ink bg-ink text-white" : "border-border bg-panel text-ink hover:border-border-strong"}`}>{metricDefinitions[key].shortLabel}</button>)}
        </div>
        <div className="mt-5 grid gap-2 border-t border-border pt-5 sm:grid-cols-[1fr_auto] sm:items-end"><div><h2 className="text-xl font-medium tracking-[-0.025em] text-ink">{definition.label}</h2><p className="mt-2 max-w-3xl text-xs leading-5 text-muted">{definition.description}</p></div><p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-rust">{definition.source}</p></div>
      </div>

      <div className="grid min-w-0 lg:grid-cols-[1fr_0.72fr]">
        <div className="min-w-0 border-b border-border p-5 md:p-7 lg:border-b-0 lg:border-r">
          <div className="overflow-x-auto pb-3" role="region" aria-label="Atlas esquemático de departamentos" tabIndex={0}>
            <div className="grid min-w-[700px] grid-cols-6 grid-rows-11 gap-2" style={{ gridAutoRows: "64px" }}>
              {profiles.map((profile) => {
                const position = tilePositions[profile.code] ?? [1, 1];
                const intensity = normalizedValue(profile[metric]);
                const active = profile.code === selected.code;
                const [red, green, blue] = definition.color;
                return <button key={profile.code} type="button" aria-pressed={active} onClick={() => setSelectedCode(profile.code)} style={{ gridColumnStart: position[0], gridRowStart: position[1], backgroundColor: active ? "#15211d" : `rgba(${red}, ${green}, ${blue}, ${0.09 + intensity * 0.76})`, color: active || intensity > 0.54 ? "#fff" : "#15211d" }} className="group min-w-0 rounded-sm border border-ink/10 p-2 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/35 focus-visible:z-10">
                  <span className="block truncate text-[9px] font-semibold uppercase tracking-[0.06em]">{titleCase(profile.name)}</span><span className="mt-1 block font-mono text-[9px] opacity-75">{definition.format(profile[metric])}</span>
                </button>;
              })}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-[9px] uppercase tracking-[0.1em] text-muted"><span>Menor valor observado</span><span className="h-2 min-w-28 flex-1 rounded-full" style={{ background: `linear-gradient(90deg, rgba(${definition.color.join(",")},.12), rgba(${definition.color.join(",")},.85))` }} /><span>Mayor valor observado</span></div>
          <p className="mt-4 text-[10px] leading-5 text-muted">Mapa esquemático: la posición facilita orientación y no representa límites, superficie ni distancia. La intensidad describe el valor seleccionado, no desempeño general.</p>
        </div>

        <aside className="min-w-0 bg-[#f2efe7] p-5 md:p-7 lg:sticky lg:top-20 lg:self-start" aria-live="polite">
          <div className="flex items-center justify-between gap-4"><div><p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-rust">Departamento · {selected.code}</p><h2 className="mt-2 text-3xl font-medium tracking-[-0.045em] text-ink">{titleCase(selected.name)}</h2></div><MapPinned className="h-5 w-5 text-rust" aria-hidden /></div>
          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border"><div className="bg-panel p-4"><p className="text-2xl font-medium tracking-[-0.04em] text-ink">{numberFormat.format(selected.municipalities)}</p><p className="mt-1 text-[9px] text-muted">municipalidades</p></div><div className="bg-panel p-4"><p className="text-2xl font-medium tracking-[-0.04em] text-ink">{numberFormat.format(selected.population2025)}</p><p className="mt-1 text-[9px] text-muted">habitantes proyectados</p></div><div className="bg-panel p-4"><p className="text-2xl font-medium tracking-[-0.04em] text-ink">{currencyFormat.format(selected.pim)}</p><p className="mt-1 text-[9px] text-muted">PIM municipal</p></div><div className="bg-panel p-4"><p className="text-2xl font-medium tracking-[-0.04em] text-ink">{numberFormat.format(selected.provincialMunicipalities)}</p><p className="mt-1 text-[9px] text-muted">municipalidades provinciales</p></div></div>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {detailMetrics.map((item) => <div key={item.label} className="grid grid-cols-[1fr_auto] gap-5 py-3"><p className="text-[10px] leading-4 text-ink/68">{item.label}</p><div className="text-right"><p className="text-xs font-medium text-ink">{item.formatter(item.value)}</p><p className="mt-0.5 text-[8px] text-muted">Perú: {item.formatter(item.national)}</p></div></div>)}
          </div>
          <div className="mt-6 flex flex-wrap gap-3"><NextLink href={`/dataperu/departamentos/${selected.code}`} className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-ink px-5 text-xs font-medium text-white transition-transform hover:-translate-y-px">Ver perfil <ArrowRight className="h-3.5 w-3.5" aria-hidden /></NextLink><button type="button" onClick={downloadProfile} data-analytics-event="resource_download" data-analytics-target="dataperu:department-csv" className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-border bg-panel px-5 text-xs font-medium text-ink transition-colors hover:border-border-strong"><Download className="h-3.5 w-3.5" aria-hidden /> Descargar ficha</button><NextLink href={selectedContact} className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-rust/25 bg-rust/[0.055] px-5 text-xs font-medium text-rust transition-colors hover:bg-rust hover:text-white">Analizar el territorio</NextLink></div>
          <p className="mt-5 text-[9px] leading-4 text-muted">Los porcentajes RENAMU describen respuestas declaradas por municipalidades. No sustituyen verificación, análisis causal ni evaluación de resultados.</p>
        </aside>
      </div>
    </div>
  );
}

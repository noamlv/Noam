"use client";

import { ArrowRight, Download, MapPin } from "lucide-react";
import NextLink from "next/link";
import { useMemo, useState } from "react";
import type { DepartmentMapDatum } from "@/lib/dataperu-map";
import {
  departmentMapMetrics,
  formatDepartmentMapValue,
  type DepartmentMapMetricKey
} from "@/lib/dataperu-map-metrics";

const palette = ["#dfe6df", "#bdcec2", "#8eaa99", "#587b69", "#234b3c"];
const integerFormat = new Intl.NumberFormat("es-PE");

function scaledValue(value: number, scale: "linear" | "log") {
  return scale === "log" ? Math.log1p(value) : value;
}

export function DepartmentMapExplorer({
  departments,
  viewBox,
  nationalReferences
}: {
  departments: DepartmentMapDatum[];
  viewBox: string;
  nationalReferences: Partial<Record<DepartmentMapMetricKey, number>>;
}) {
  const [metricKey, setMetricKey] = useState<DepartmentMapMetricKey>("investmentExecutionPercent");
  const [selectedCode, setSelectedCode] = useState("15");
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const metric = departmentMapMetrics.find((item) => item.key === metricKey) ?? departmentMapMetrics[0];
  const values = useMemo(() => departments.map((department) => scaledValue(department[metricKey], metric.scale)), [departments, metric.scale, metricKey]);
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const activeCode = hoveredCode ?? selectedCode;
  const active = departments.find((department) => department.code === activeCode) ?? departments[0];
  const reference = nationalReferences[metricKey];

  const colorFor = (department: DepartmentMapDatum) => {
    const value = scaledValue(department[metricKey], metric.scale);
    const normalized = maximum === minimum ? 0.5 : (value - minimum) / (maximum - minimum);
    return palette[Math.min(palette.length - 1, Math.floor(normalized * palette.length))];
  };

  return (
    <div data-testid="department-map" className="overflow-hidden rounded-[1.25rem] border border-border bg-panel shadow-subtle">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-h-[620px] border-b border-border bg-[#e9e7de] p-5 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(21,33,29,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(21,33,29,.07)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-rust">Capa activa</p><p className="mt-2 max-w-sm text-sm font-medium text-ink">{metric.label}</p></div>
            <label><span className="sr-only">Indicador del mapa</span><select value={metricKey} onChange={(event) => setMetricKey(event.target.value as DepartmentMapMetricKey)} className="h-11 max-w-[240px] rounded-sm border border-ink/15 bg-canvas/90 px-3 text-xs text-ink outline-none transition-colors focus:border-rust">{departmentMapMetrics.map((item) => <option key={item.key} value={item.key}>{item.shortLabel}</option>)}</select></label>
          </div>

          <svg viewBox={viewBox} role="img" aria-labelledby="department-map-title department-map-description" className="relative mx-auto mt-6 h-[500px] w-full max-w-[500px] overflow-visible sm:h-[560px]">
            <title id="department-map-title">Mapa departamental del Perú por {metric.label.toLocaleLowerCase("es-PE")}</title>
            <desc id="department-map-description">Mapa coroplético descriptivo. Selecciona un departamento para revisar su ficha.</desc>
            {departments.map((department) => {
              const activePath = department.code === activeCode;
              return <path key={department.code} d={department.path} fill={colorFor(department)} fillRule="evenodd" stroke={activePath ? "#b95337" : "#f7f5ef"} strokeWidth={activePath ? 2.6 : 1.3} vectorEffect="non-scaling-stroke" tabIndex={0} role="button" aria-label={`${department.name}: ${formatDepartmentMapValue(metricKey, department[metricKey])}`} className="cursor-pointer outline-none transition-[fill,stroke] duration-200 focus:stroke-rust" onMouseEnter={() => setHoveredCode(department.code)} onMouseLeave={() => setHoveredCode(null)} onFocus={() => setHoveredCode(department.code)} onBlur={() => setHoveredCode(null)} onClick={() => setSelectedCode(department.code)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedCode(department.code); } }}><title>{department.name}: {formatDepartmentMapValue(metricKey, department[metricKey])}</title></path>;
            })}
          </svg>

          <div className="relative mt-1 flex items-center justify-between gap-4 rounded-sm border border-ink/10 bg-canvas/80 px-4 py-3 backdrop-blur">
            <span className="text-[9px] text-muted">{formatDepartmentMapValue(metricKey, departments.reduce((lowest, item) => item[metricKey] < lowest[metricKey] ? item : lowest)[metricKey])}</span>
            <div className="flex flex-1 overflow-hidden rounded-full">{palette.map((color) => <span key={color} className="h-2 flex-1" style={{ backgroundColor: color }} />)}</div>
            <span className="text-[9px] text-muted">{formatDepartmentMapValue(metricKey, departments.reduce((highest, item) => item[metricKey] > highest[metricKey] ? item : highest)[metricKey])}</span>
          </div>
        </div>

        <aside className="flex flex-col bg-canvas p-6 md:p-8 lg:p-10" aria-live="polite">
          <div className="flex items-center justify-between gap-5 border-b border-border pb-5"><span className="font-mono text-[9px] text-muted">DEP · {active.code}</span><span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-rust">Ficha territorial</span></div>
          <div className="mt-8"><MapPin className="h-5 w-5 text-rust" aria-hidden /><p className="mt-6 text-[10px] text-muted">Capital: {active.capital}</p><h2 className="mt-1 text-4xl font-medium tracking-[-0.045em] text-ink">{active.name}</h2></div>
          <div className="mt-9 rounded-md border border-border bg-panel p-5"><p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">{metric.shortLabel}</p><p className="mt-3 text-4xl font-medium tracking-[-0.05em] text-ink">{formatDepartmentMapValue(metricKey, active[metricKey])}</p>{reference !== undefined ? <p className="mt-2 text-[10px] text-muted">Referencia nacional: {formatDepartmentMapValue(metricKey, reference)}</p> : <p className="mt-2 text-[10px] text-muted">Valor departamental dentro del extracto visible.</p>}</div>
          <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border">{[
            [integerFormat.format(active.municipalities), "municipalidades"],
            [integerFormat.format(active.visibleProjects), "proyectos visibles"],
            [formatDepartmentMapValue("visibleCoveragePercent", active.visibleCoveragePercent), "cobertura visible"],
            [formatDepartmentMapValue("investmentExecutionPercent", active.investmentExecutionPercent), "ejecución inversión"]
          ].map(([value, label]) => <div key={label} className="bg-panel p-4"><p className="text-xl font-medium tracking-[-0.035em] text-ink">{value}</p><p className="mt-1 text-[8px] leading-4 text-muted">{label}</p></div>)}</div>
          <p className="mt-6 text-xs leading-5 text-ink/58">{metric.description} La intensidad del color facilita lectura espacial; no constituye un ranking ni explica causas.</p>
          <div className="mt-auto grid gap-3 pt-8"><NextLink href={`/dataperu/departamentos/${active.code}`} className="inline-flex items-center justify-between rounded-full border border-ink bg-ink px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-ink/90">Abrir perfil departamental <ArrowRight className="h-4 w-4" aria-hidden /></NextLink><NextLink href={`/dataperu/inversiones?departamento=${active.code}`} className="inline-flex items-center justify-between rounded-full border border-border bg-panel px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-border-strong">Explorar proyectos <ArrowRight className="h-4 w-4" aria-hidden /></NextLink></div>
        </aside>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-panel px-5 py-4 md:px-8"><p className="text-[9px] leading-4 text-muted">{metric.source} · límites referenciales INEI · recurso publicado en 2025</p><NextLink href="/downloads/peru-departments-reference-2025.geojson" className="inline-flex items-center gap-2 text-xs font-medium text-rust" data-analytics-event="resource_download" data-analytics-target="departamentos-geojson"><Download className="h-3.5 w-3.5" aria-hidden /> Descargar GeoJSON</NextLink></div>
    </div>
  );
}

"use client";

import { ArrowUpRight, Search } from "lucide-react";
import NextLink from "next/link";
import { useMemo, useState } from "react";

export type WaterSanitationSearchItem = {
  ubigeo: string;
  department: string;
  province: string;
  district: string;
  occupiedHousing: number | null;
  waterNetwork: { value: number | null; percent: number | null };
  sanitationNetwork: { value: number | null; percent: number | null };
  hasMunicipalProfile: boolean;
};

type MetricKey = "waterNetwork" | "sanitationNetwork";

const numberFormatter = new Intl.NumberFormat("es-PE");
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es-PE");
const formatNumber = (value: number | null) => value == null ? "No disponible" : numberFormatter.format(value);
const formatPercent = (value: number | null) => value == null ? "No disponible" : `${value.toLocaleString("es-PE", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
const calculatePercent = (numerator: number, denominator: number) => denominator > 0 ? (numerator / denominator) * 100 : null;

const metricLabels: Record<MetricKey, { short: string; full: string }> = {
  waterNetwork: { short: "Agua por red", full: "Abastecimiento de agua por red pública" },
  sanitationNetwork: { short: "Saneamiento por red", full: "Servicio higiénico conectado a red pública" }
};

const matchesBand = (value: number | null, band: string) => {
  if (band === "all") return true;
  if (value == null) return band === "missing";
  if (band === "under50") return value < 50;
  if (band === "50to70") return value >= 50 && value < 70;
  if (band === "70to90") return value >= 70 && value < 90;
  return value >= 90;
};

export function WaterSanitationExplorer({ items, initialQuery = "" }: { items: WaterSanitationSearchItem[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [department, setDepartment] = useState("Todos");
  const [metric, setMetric] = useState<MetricKey>("waterNetwork");
  const [band, setBand] = useState("all");
  const [sort, setSort] = useState("name");
  const [visibleCount, setVisibleCount] = useState(36);

  const departments = useMemo(() => [...new Set(items.map((item) => item.department))].sort((a, b) => a.localeCompare(b, "es-PE")), [items]);
  const normalizedQuery = normalize(query.trim());

  const results = useMemo(() => {
    const filtered = items.filter((item) => {
      const searchable = normalize(`${item.district} ${item.province} ${item.department} ${item.ubigeo}`);
      return (!normalizedQuery || searchable.includes(normalizedQuery))
        && (department === "Todos" || item.department === department)
        && matchesBand(item[metric].percent, band);
    });

    return filtered.sort((left, right) => {
      if (sort === "coverage") return (left[metric].percent ?? Infinity) - (right[metric].percent ?? Infinity);
      if (sort === "gap") {
        const leftGap = left.occupiedHousing == null || left[metric].value == null ? -1 : left.occupiedHousing - left[metric].value;
        const rightGap = right.occupiedHousing == null || right[metric].value == null ? -1 : right.occupiedHousing - right[metric].value;
        return rightGap - leftGap;
      }
      return left.district.localeCompare(right.district, "es-PE") || left.province.localeCompare(right.province, "es-PE");
    });
  }, [band, department, items, metric, normalizedQuery, sort]);

  const aggregate = useMemo(() => results.reduce((totals, item) => ({
    occupied: totals.occupied + (item.occupiedHousing ?? 0),
    water: totals.water + (item.waterNetwork.value ?? 0),
    sanitation: totals.sanitation + (item.sanitationNetwork.value ?? 0)
  }), { occupied: 0, water: 0, sanitation: 0 }), [results]);

  const visibleResults = results.slice(0, visibleCount);
  const activeLabel = metricLabels[metric];
  const fieldClass = "h-12 w-full rounded-sm border border-border bg-panel px-4 text-sm text-ink outline-none transition-colors focus:border-rust focus:ring-2 focus:ring-rust/15";
  const resetVisible = () => setVisibleCount(36);

  return (
    <div>
      <div className="rounded-md border border-border bg-canvas p-4 md:p-5">
        <fieldset>
          <legend className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Indicador principal</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {(Object.keys(metricLabels) as MetricKey[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={metric === key}
                onClick={() => { setMetric(key); resetVisible(); }}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${metric === key ? "border-ink bg-ink text-white" : "border-border bg-panel text-ink/68 hover:border-border-strong hover:text-ink"}`}
              >
                {metricLabels[key].short}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <label className="relative">
            <span className="sr-only">Buscar distrito, provincia o ubigeo</span>
            <Search className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(event) => { setQuery(event.target.value); resetVisible(); }}
              placeholder="Distrito, provincia o ubigeo"
              className={`${fieldClass} pl-11`}
            />
          </label>
          <label>
            <span className="sr-only">Filtrar por departamento</span>
            <select value={department} onChange={(event) => { setDepartment(event.target.value); resetVisible(); }} className={fieldClass}>
              <option>Todos</option>
              {departments.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Filtrar por rango de cobertura</span>
            <select value={band} onChange={(event) => { setBand(event.target.value); resetVisible(); }} className={fieldClass}>
              <option value="all">Toda cobertura</option>
              <option value="under50">Menos de 50%</option>
              <option value="50to70">De 50% a 69,9%</option>
              <option value="70to90">De 70% a 89,9%</option>
              <option value="90plus">90% o más</option>
              <option value="missing">Sin dato</option>
            </select>
          </label>
          <label>
            <span className="sr-only">Ordenar resultados</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)} className={fieldClass}>
              <option value="name">Orden alfabético</option>
              <option value="coverage">Menor cobertura</option>
              <option value="gap">Mayor brecha absoluta</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-5 grid overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
        {[
          { label: "Distritos en la selección", value: formatNumber(results.length) },
          { label: "Agua por red pública", value: formatPercent(calculatePercent(aggregate.water, aggregate.occupied)) },
          { label: "Saneamiento por red pública", value: formatPercent(calculatePercent(aggregate.sanitation, aggregate.occupied)) }
        ].map((item) => (
          <div key={item.label} className="bg-panel px-5 py-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{item.label}</p>
            <p className="mt-2 text-2xl font-medium tracking-[-0.035em] text-ink">{item.value}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] leading-5 text-muted">Las tasas de la selección se recalculan con los numeradores y denominadores agregados; no son promedios simples de porcentajes distritales.</p>

      <div className="mt-7 flex items-center justify-between gap-4 text-xs text-muted">
        <p aria-live="polite">{formatNumber(results.length)} {results.length === 1 ? "distrito encontrado" : "distritos encontrados"}</p>
        {results.length > visibleResults.length ? <p>Mostrando {formatNumber(visibleResults.length)}</p> : null}
      </div>

      {visibleResults.length > 0 ? (
        <>
          <div className="mt-4 divide-y divide-border border-y border-border">
            {visibleResults.map((item) => {
              const active = item[metric];
              const gap = item.occupiedHousing == null || active.value == null ? null : Math.max(0, item.occupiedHousing - active.value);
              return (
                <article key={item.ubigeo} className="grid gap-6 py-6 md:grid-cols-[minmax(190px,0.7fr)_1.3fr_auto] md:items-center md:px-4">
                  <div>
                    <h3 className="text-lg font-medium tracking-[-0.02em] text-ink">{item.district}</h3>
                    <p className="mt-1 text-xs leading-5 text-muted">{item.province}, {item.department} · Ubigeo {item.ubigeo}</p>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{activeLabel.full}</p>
                        <p className="mt-1 text-2xl font-medium tracking-[-0.035em] text-ink">{formatPercent(active.percent)}</p>
                      </div>
                      <p className="text-xs leading-5 text-muted">{formatNumber(active.value)} con red · {formatNumber(gap)} sin red</p>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border" role="img" aria-label={`${activeLabel.full}: ${formatPercent(active.percent)}`}>
                      <div className="h-full rounded-full bg-rust" style={{ width: `${Math.min(100, Math.max(0, active.percent ?? 0))}%` }} />
                    </div>
                    <dl className="mt-4 grid grid-cols-2 gap-5 text-xs">
                      <div><dt className="text-muted">Viviendas base</dt><dd className="mt-1 font-medium text-ink">{formatNumber(item.occupiedHousing)}</dd></div>
                      <div><dt className="text-muted">{metricLabels[metric === "waterNetwork" ? "sanitationNetwork" : "waterNetwork"].short}</dt><dd className="mt-1 font-medium text-ink">{formatPercent(item[metric === "waterNetwork" ? "sanitationNetwork" : "waterNetwork"].percent)}</dd></div>
                    </dl>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 md:flex-col md:items-end">
                    {item.hasMunicipalProfile ? (
                      <NextLink href={`/dataperu/municipios/${item.ubigeo}`} className="inline-flex items-center gap-2 text-sm font-medium text-rust hover:text-ink">
                        Perfil municipal <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </NextLink>
                    ) : <span className="text-xs text-muted">Perfil municipal pendiente</span>}
                  </div>
                </article>
              );
            })}
          </div>
          {visibleResults.length < results.length ? (
            <div className="mt-7 flex justify-center">
              <button type="button" onClick={() => setVisibleCount((count) => count + 36)} className="rounded-full border border-border-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-panel focus:outline-none focus:ring-2 focus:ring-rust/25">
                Mostrar 36 distritos más
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="mt-5 rounded-md border border-border bg-panel px-6 py-12 text-center">
          <p className="text-sm text-ink/65">No hay distritos con esa combinación de filtros.</p>
        </div>
      )}
    </div>
  );
}

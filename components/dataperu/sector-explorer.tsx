"use client";

import { ArrowUpRight, Search } from "lucide-react";
import NextLink from "next/link";
import { useMemo, useState } from "react";
import type { SectorMetric } from "@/lib/dataperu-sectors";

export type SectorSearchItem = {
  ubigeo: string;
  department: string;
  province: string;
  district: string;
  municipalityType: "Provincial" | "Distrital";
  metrics: SectorMetric[];
};

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es-PE");
const titleCase = (value: string) => value.toLocaleLowerCase("es-PE").replace(/(^|[\s-])\p{L}/gu, (character) => character.toLocaleUpperCase("es-PE"));

export function SectorExplorer({ items }: { items: SectorSearchItem[] }) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("Todos");
  const [type, setType] = useState("Todas");
  const departments = useMemo(() => [...new Set(items.map((item) => item.department))].sort(), [items]);
  const normalizedQuery = normalize(query.trim());

  const results = useMemo(() => items.filter((item) => {
    const searchable = normalize(`${item.district} ${item.province} ${item.department} ${item.ubigeo}`);
    return (!normalizedQuery || searchable.includes(normalizedQuery))
      && (department === "Todos" || item.department === department)
      && (type === "Todas" || item.municipalityType === type);
  }), [department, items, normalizedQuery, type]);

  const visibleResults = results.slice(0, 48);
  const fieldClass = "h-12 w-full rounded-sm border border-border bg-panel px-4 text-sm text-ink outline-none transition-colors focus:border-rust";

  return (
    <div>
      <div className="grid gap-3 rounded-md border border-border bg-canvas p-4 md:grid-cols-[1fr_220px_180px]">
        <label className="relative">
          <span className="sr-only">Buscar municipalidad</span>
          <Search className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-muted" aria-hidden />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Distrito, provincia o ubigeo" className={`${fieldClass} pl-11`} />
        </label>
        <label>
          <span className="sr-only">Filtrar por departamento</span>
          <select value={department} onChange={(event) => setDepartment(event.target.value)} className={fieldClass}>
            <option>Todos</option>
            {departments.map((item) => <option key={item} value={item}>{titleCase(item)}</option>)}
          </select>
        </label>
        <label>
          <span className="sr-only">Filtrar por tipo</span>
          <select value={type} onChange={(event) => setType(event.target.value)} className={fieldClass}>
            <option>Todas</option>
            <option>Provincial</option>
            <option>Distrital</option>
          </select>
        </label>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 text-xs text-muted">
        <p aria-live="polite">{new Intl.NumberFormat("es-PE").format(results.length)} municipalidades encontradas</p>
        {results.length > visibleResults.length ? <p>Mostrando las primeras {visibleResults.length}</p> : null}
      </div>

      {visibleResults.length > 0 ? (
        <div className="mt-5 divide-y divide-border border-y border-border">
          {visibleResults.map((item) => (
            <article key={item.ubigeo} className="grid gap-5 py-6 md:grid-cols-[minmax(190px,0.8fr)_1.4fr_auto] md:items-center md:px-4">
              <div>
                <p className="text-lg font-medium tracking-[-0.02em] text-ink">{titleCase(item.district)}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{titleCase(item.province)}, {titleCase(item.department)} · {item.municipalityType}</p>
              </div>
              <dl className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3">
                {item.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{metric.label}</dt>
                    <dd className="mt-1 text-sm leading-5 text-ink/75">{metric.value}</dd>
                  </div>
                ))}
              </dl>
              <NextLink href={`/dataperu/municipios/${item.ubigeo}`} className="inline-flex items-center gap-2 text-sm font-medium text-rust hover:text-ink">
                Perfil completo <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </NextLink>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-md border border-border bg-panel px-6 py-12 text-center">
          <p className="text-sm text-ink/65">No encontramos una municipalidad con esos filtros.</p>
        </div>
      )}
    </div>
  );
}

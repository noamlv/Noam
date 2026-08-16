"use client";

import { ArrowRight, FileText, Search } from "lucide-react";
import NextLink from "next/link";
import { useMemo, useState } from "react";
import type { RadarMunicipality } from "@/lib/dataperu-radar";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es-PE");
const titleCase = (value: string) => value.toLocaleLowerCase("es-PE").replace(/(^|[\s-])\p{L}/gu, (character) => character.toLocaleUpperCase("es-PE"));
const formatNumber = (value: number | null) => value === null ? "No informado" : new Intl.NumberFormat("es-PE").format(value);
const formatMoney = (value: number | null) => value === null ? "No informado" : new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", notation: "compact", maximumFractionDigits: 1 }).format(value);
const formatPercent = (value: number | null) => value === null ? "No informada" : `${new Intl.NumberFormat("es-PE", { maximumFractionDigits: 1 }).format(value)}%`;

const sortOptions = [
  { value: "name", label: "Nombre A–Z" },
  { value: "population-desc", label: "Mayor población" },
  { value: "pim-desc", label: "Mayor PIM" },
  { value: "budget-desc", label: "Mayor ejecución total" },
  { value: "budget-asc", label: "Menor ejecución total" },
  { value: "investment-desc", label: "Mayor ejecución de inversión" },
  { value: "investment-asc", label: "Menor ejecución de inversión" }
] as const;

type SortValue = typeof sortOptions[number]["value"];

function nullableOrder(left: number | null, right: number | null, direction: "asc" | "desc") {
  if (left === null && right === null) return 0;
  if (left === null) return 1;
  if (right === null) return -1;
  return direction === "asc" ? left - right : right - left;
}

export function RadarExplorer({ items }: { items: RadarMunicipality[] }) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("Todos");
  const [type, setType] = useState("Todas");
  const [sort, setSort] = useState<SortValue>("name");
  const departments = useMemo(() => [...new Set(items.map((item) => item.department))].sort(), [items]);

  const results = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    const filtered = items.filter((item) => {
      const searchable = normalize(`${item.district} ${item.province} ${item.department} ${item.ubigeo}`);
      return (!normalizedQuery || searchable.includes(normalizedQuery))
        && (department === "Todos" || item.department === department)
        && (type === "Todas" || item.municipalityType === type);
    });

    return filtered.sort((left, right) => {
      if (sort === "population-desc") return right.population2025 - left.population2025;
      if (sort === "pim-desc") return right.pim - left.pim;
      if (sort === "budget-desc") return nullableOrder(left.budgetExecutionPercent, right.budgetExecutionPercent, "desc");
      if (sort === "budget-asc") return nullableOrder(left.budgetExecutionPercent, right.budgetExecutionPercent, "asc");
      if (sort === "investment-desc") return nullableOrder(left.investmentExecutionPercent, right.investmentExecutionPercent, "desc");
      if (sort === "investment-asc") return nullableOrder(left.investmentExecutionPercent, right.investmentExecutionPercent, "asc");
      return left.district.localeCompare(right.district, "es-PE");
    });
  }, [department, items, query, sort, type]);

  const visibleResults = results.slice(0, 80);
  const fieldClass = "h-12 w-full rounded-sm border border-border bg-panel px-4 text-sm text-ink outline-none transition-colors focus:border-rust";

  return (
    <div>
      <div className="grid gap-3 rounded-md border border-border bg-canvas p-4 lg:grid-cols-[1fr_210px_170px_230px]">
        <label className="relative">
          <span className="sr-only">Buscar municipalidad</span>
          <Search className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-muted" aria-hidden />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Distrito, provincia o ubigeo" className={`${fieldClass} pl-11`} />
        </label>
        <label><span className="sr-only">Filtrar por departamento</span><select value={department} onChange={(event) => setDepartment(event.target.value)} className={fieldClass}><option>Todos</option>{departments.map((item) => <option key={item} value={item}>{titleCase(item)}</option>)}</select></label>
        <label><span className="sr-only">Filtrar por tipo municipal</span><select value={type} onChange={(event) => setType(event.target.value)} className={fieldClass}><option>Todas</option><option>Provincial</option><option>Distrital</option></select></label>
        <label><span className="sr-only">Ordenar resultados</span><select value={sort} onChange={(event) => setSort(event.target.value as SortValue)} className={fieldClass}>{sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
        <p aria-live="polite">{new Intl.NumberFormat("es-PE").format(results.length)} municipalidades en la selección</p>
        <p>Orden descriptivo; no es un ranking de desempeño.</p>
      </div>

      {visibleResults.length > 0 ? (
        <div className="mt-5 overflow-hidden rounded-md border border-border">
          <div className="hidden grid-cols-[1.35fr_0.75fr_0.75fr_0.75fr_0.55fr] gap-4 border-b border-border bg-panel px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.13em] text-muted lg:grid">
            <span>Municipalidad</span><span>Población / PIM</span><span>Ejecución total</span><span>Inversión</span><span>Acciones</span>
          </div>
          <div className="divide-y divide-border bg-canvas">
            {visibleResults.map((item) => (
              <article key={item.ubigeo} className="grid min-w-0 gap-5 px-5 py-5 transition-colors hover:bg-panel/55 lg:grid-cols-[1.35fr_0.75fr_0.75fr_0.75fr_0.55fr] lg:items-center lg:gap-4">
                <div className="min-w-0">
                  <p className="truncate text-base font-medium tracking-[-0.02em] text-ink">{titleCase(item.district)}</p>
                  <p className="mt-1 truncate text-[10px] text-muted">{titleCase(item.province)}, {titleCase(item.department)} · {item.municipalityType} · {item.ubigeo}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:block">
                  <p className="text-sm font-medium text-ink">{formatNumber(item.population2025)}</p>
                  <p className="mt-1 text-[10px] text-muted">{formatMoney(item.pim)} PIM</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{formatPercent(item.budgetExecutionPercent)}</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border" role="img" aria-label={`Ejecución total de ${titleCase(item.district)}: ${formatPercent(item.budgetExecutionPercent)}`}><div className="h-full rounded-full bg-[#5f796e]" style={{ width: `${Math.min(item.budgetExecutionPercent ?? 0, 100)}%` }} /></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{formatPercent(item.investmentExecutionPercent)}</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border" role="img" aria-label={`Ejecución de inversión de ${titleCase(item.district)}: ${formatPercent(item.investmentExecutionPercent)}`}><div className="h-full rounded-full bg-rust" style={{ width: `${Math.min(item.investmentExecutionPercent ?? 0, 100)}%` }} /></div>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 lg:block">
                  <NextLink href={`/dataperu/municipios/${item.ubigeo}`} className="inline-flex items-center gap-1.5 text-xs font-medium text-ink transition-colors hover:text-rust">Perfil <ArrowRight className="h-3 w-3" aria-hidden /></NextLink>
                  <NextLink href={`/electoral/erm-2026/territorios/${item.ubigeo}`} className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-rust lg:mt-2"><FileText className="h-3 w-3" aria-hidden /> Brief ERM</NextLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-md border border-border bg-panel px-6 py-12 text-center"><p className="text-sm text-ink/65">No encontramos municipalidades con esos filtros.</p></div>
      )}

      {results.length > visibleResults.length ? <p className="mt-5 text-center text-xs text-muted">Mostrando las primeras {visibleResults.length}. Usa los filtros para acotar la selección.</p> : null}
    </div>
  );
}

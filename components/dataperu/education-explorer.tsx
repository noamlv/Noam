"use client";

import { ArrowUpRight, Search } from "lucide-react";
import NextLink from "next/link";
import { useMemo, useState } from "react";

export type EducationSearchItem = {
  ubigeo: string;
  department: string;
  province: string;
  district: string;
  servicePrograms: {
    total: number;
    schoolBased: number;
    nonSchoolBased: number;
    otherForm: number;
  };
  enrollment: {
    total: number;
    male: number;
    female: number;
    urban: number;
    rural: number;
    publicManagement: number;
    privateManagement: number;
    initial: number;
    primary: number;
    secondary: number;
  };
  provenance: {
    informantRecords: number;
    partialImputationRecords: number;
    totalImputationRecords: number;
  };
  hasMunicipalProfile: boolean;
};

const numberFormatter = new Intl.NumberFormat("es-PE");
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es-PE");
const formatNumber = (value: number) => numberFormatter.format(value);
const rate = (numerator: number, denominator: number) => denominator > 0 ? (numerator / denominator) * 100 : null;
const formatPercent = (value: number | null) => value == null ? "No disponible" : `${value.toLocaleString("es-PE", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

const matchesFocus = (item: EducationSearchItem, focus: string) => {
  if (focus === "rural") return (rate(item.enrollment.rural, item.enrollment.total) ?? 0) >= 50;
  if (focus === "private") return (rate(item.enrollment.privateManagement, item.enrollment.total) ?? 0) >= 50;
  if (focus === "imputation") return item.provenance.partialImputationRecords + item.provenance.totalImputationRecords > 0;
  if (focus === "large") return item.enrollment.total >= 10_000;
  return true;
};

export function EducationExplorer({ items, initialQuery = "" }: { items: EducationSearchItem[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [department, setDepartment] = useState("Todos");
  const [focus, setFocus] = useState("all");
  const [sort, setSort] = useState("name");
  const [visibleCount, setVisibleCount] = useState(36);

  const departments = useMemo(() => [...new Set(items.map((item) => item.department))].sort((a, b) => a.localeCompare(b, "es-PE")), [items]);
  const normalizedQuery = normalize(query.trim());
  const resetVisible = () => setVisibleCount(36);

  const results = useMemo(() => {
    const filtered = items.filter((item) => {
      const searchable = normalize(`${item.district} ${item.province} ${item.department} ${item.ubigeo}`);
      return (!normalizedQuery || searchable.includes(normalizedQuery))
        && (department === "Todos" || item.department === department)
        && matchesFocus(item, focus);
    });

    return filtered.sort((left, right) => {
      if (sort === "enrollment") return right.enrollment.total - left.enrollment.total;
      if (sort === "rural") return (rate(right.enrollment.rural, right.enrollment.total) ?? -1) - (rate(left.enrollment.rural, left.enrollment.total) ?? -1);
      if (sort === "private") return (rate(right.enrollment.privateManagement, right.enrollment.total) ?? -1) - (rate(left.enrollment.privateManagement, left.enrollment.total) ?? -1);
      if (sort === "provenance") return (rate(left.provenance.informantRecords, left.servicePrograms.total) ?? Infinity) - (rate(right.provenance.informantRecords, right.servicePrograms.total) ?? Infinity);
      return left.district.localeCompare(right.district, "es-PE") || left.province.localeCompare(right.province, "es-PE");
    });
  }, [department, focus, items, normalizedQuery, sort]);

  const aggregate = useMemo(() => results.reduce((total, item) => ({
    students: total.students + item.enrollment.total,
    rural: total.rural + item.enrollment.rural,
    publicManagement: total.publicManagement + item.enrollment.publicManagement,
    records: total.records + item.servicePrograms.total,
    informantRecords: total.informantRecords + item.provenance.informantRecords
  }), { students: 0, rural: 0, publicManagement: 0, records: 0, informantRecords: 0 }), [results]);

  const visibleResults = results.slice(0, visibleCount);
  const fieldClass = "h-12 w-full rounded-sm border border-border bg-panel px-4 text-sm text-ink outline-none transition-colors focus:border-rust focus:ring-2 focus:ring-rust/15";

  return (
    <div>
      <div className="rounded-md border border-border bg-canvas p-4 md:p-5">
        <div className="grid gap-3 md:grid-cols-2">
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
            <span className="sr-only">Filtrar por característica</span>
            <select value={focus} onChange={(event) => { setFocus(event.target.value); resetVisible(); }} className={fieldClass}>
              <option value="all">Todos los distritos</option>
              <option value="rural">Mayoría de matrícula rural</option>
              <option value="private">Mayoría de matrícula privada</option>
              <option value="imputation">Con registros imputados</option>
              <option value="large">10,000 estudiantes o más</option>
            </select>
          </label>
          <label>
            <span className="sr-only">Ordenar resultados</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)} className={fieldClass}>
              <option value="name">Orden alfabético</option>
              <option value="enrollment">Mayor matrícula</option>
              <option value="rural">Mayor proporción rural</option>
              <option value="private">Mayor proporción privada</option>
              <option value="provenance">Menor proporción de informante</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-5 grid overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Distritos", value: formatNumber(results.length) },
          { label: "Matrícula EBR", value: formatNumber(aggregate.students) },
          { label: "Matrícula rural", value: formatPercent(rate(aggregate.rural, aggregate.students)) },
          { label: "Registros de informante", value: formatPercent(rate(aggregate.informantRecords, aggregate.records)) }
        ].map((item) => (
          <div key={item.label} className="bg-panel px-5 py-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{item.label}</p>
            <p className="mt-2 text-2xl font-medium tracking-[-0.035em] text-ink">{item.value}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] leading-5 text-muted">Las proporciones de la selección se recalculan con estudiantes o registros agregados. No son promedios simples de distritos.</p>

      <div className="mt-7 flex items-center justify-between gap-4 text-xs text-muted">
        <p aria-live="polite">{formatNumber(results.length)} {results.length === 1 ? "distrito encontrado" : "distritos encontrados"}</p>
        {results.length > visibleResults.length ? <p>Mostrando {formatNumber(visibleResults.length)}</p> : null}
      </div>

      {visibleResults.length > 0 ? (
        <>
          <div className="mt-4 divide-y divide-border border-y border-border">
            {visibleResults.map((item) => {
              const ruralPercent = rate(item.enrollment.rural, item.enrollment.total);
              const publicPercent = rate(item.enrollment.publicManagement, item.enrollment.total);
              const informantPercent = rate(item.provenance.informantRecords, item.servicePrograms.total);
              const initialPercent = rate(item.enrollment.initial, item.enrollment.total) ?? 0;
              const primaryPercent = rate(item.enrollment.primary, item.enrollment.total) ?? 0;
              const secondaryPercent = rate(item.enrollment.secondary, item.enrollment.total) ?? 0;
              const imputedRecords = item.provenance.partialImputationRecords + item.provenance.totalImputationRecords;

              return (
                <article key={item.ubigeo} className="grid gap-6 py-6 md:grid-cols-[minmax(190px,0.72fr)_1.28fr_auto] md:items-center md:px-4">
                  <div>
                    <h3 className="text-lg font-medium tracking-[-0.02em] text-ink">{item.district}</h3>
                    <p className="mt-1 text-xs leading-5 text-muted">{item.province}, {item.department} · Ubigeo {item.ubigeo}</p>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Matrícula EBR 2025</p>
                        <p className="mt-1 text-2xl font-medium tracking-[-0.035em] text-ink">{formatNumber(item.enrollment.total)}</p>
                      </div>
                      <p className="text-xs leading-5 text-muted">{formatNumber(item.servicePrograms.total)} servicios o programas</p>
                    </div>
                    <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-border" role="img" aria-label={`Distribución de matrícula: inicial ${formatPercent(initialPercent)}, primaria ${formatPercent(primaryPercent)} y secundaria ${formatPercent(secondaryPercent)}`}>
                      <span className="h-full bg-[#6d9f91]" style={{ width: `${initialPercent}%` }} />
                      <span className="h-full bg-rust" style={{ width: `${primaryPercent}%` }} />
                      <span className="h-full bg-[#b8b0a2]" style={{ width: `${secondaryPercent}%` }} />
                    </div>
                    <dl className="mt-4 grid grid-cols-3 gap-4 text-xs">
                      <div><dt className="text-muted">Rural</dt><dd className="mt-1 font-medium text-ink">{formatPercent(ruralPercent)}</dd></div>
                      <div><dt className="text-muted">Gestión pública</dt><dd className="mt-1 font-medium text-ink">{formatPercent(publicPercent)}</dd></div>
                      <div><dt className="text-muted">Datos de informante</dt><dd className="mt-1 font-medium text-ink">{formatPercent(informantPercent)}</dd></div>
                    </dl>
                    {imputedRecords > 0 ? <p className="mt-3 text-[11px] leading-5 text-muted">{formatNumber(imputedRecords)} {imputedRecords === 1 ? "registro tiene" : "registros tienen"} imputación parcial o total.</p> : null}
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

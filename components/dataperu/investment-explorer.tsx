"use client";

import { ArrowRight, Search } from "lucide-react";
import NextLink from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { investmentBandDefinitions, type InvestmentBandKey } from "@/lib/dataperu-investment-bands";
import type { DepartmentInvestment, InvestmentProject } from "@/lib/dataperu-investments";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es-PE");
const numberFormat = new Intl.NumberFormat("es-PE");
const percentFormat = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 1 });
const moneyFormat = new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", notation: "compact", maximumFractionDigits: 1 });
const formatPercent = (value: number) => `${percentFormat.format(value)}%`;

const sortOptions = [
  { value: "pim-desc", label: "Mayor PIM visible" },
  { value: "execution-asc", label: "Menor ejecución financiera" },
  { value: "execution-desc", label: "Mayor ejecución financiera" },
  { value: "name", label: "Nombre A–Z" }
] as const;

type SortValue = typeof sortOptions[number]["value"];

export function InvestmentExplorer({ departments, initialDepartmentCode, initialProjects }: { departments: DepartmentInvestment[]; initialDepartmentCode: string; initialProjects: InvestmentProject[] }) {
  const [departmentCode, setDepartmentCode] = useState(initialDepartmentCode);
  const [projects, setProjects] = useState(initialProjects);
  const [query, setQuery] = useState("");
  const [functionName, setFunctionName] = useState("Todas");
  const [band, setBand] = useState<InvestmentBandKey | "Todas">("Todas");
  const [sort, setSort] = useState<SortValue>("pim-desc");
  const [loading, setLoading] = useState(initialProjects.length === 0);
  const [error, setError] = useState("");
  const cache = useRef(new Map(initialProjects.length > 0 ? [[initialDepartmentCode, initialProjects]] : []));
  const department = departments.find((item) => item.code === departmentCode) ?? departments[0];

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("departamento");
    if (requested && departments.some((item) => item.code === requested)) setDepartmentCode(requested);
  }, [departments]);

  useEffect(() => {
    const cached = cache.current.get(departmentCode);
    if (cached) {
      setProjects(cached);
      setLoading(false);
      setError("");
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetch(`/api/dataperu/investments?department=${departmentCode}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("No se pudo cargar la cartera.");
        return response.json() as Promise<{ projects: InvestmentProject[] }>;
      })
      .then((payload) => {
        cache.current.set(departmentCode, payload.projects);
        setProjects(payload.projects);
      })
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === "AbortError") return;
        setError("No pudimos cargar este departamento. Intenta nuevamente.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [departmentCode]);

  useEffect(() => {
    setFunctionName("Todas");
    setBand("Todas");
    setQuery("");
  }, [departmentCode]);

  const functions = useMemo(() => [...new Set(projects.map((project) => project.function))].sort((left, right) => left.localeCompare(right, "es-PE")), [projects]);
  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    return projects.filter((project) => {
      const searchable = normalize(`${project.name} ${project.code} ${project.municipality} ${project.province}`);
      return (!normalizedQuery || searchable.includes(normalizedQuery))
        && (functionName === "Todas" || project.function === functionName)
        && (band === "Todas" || project.band === band);
    }).sort((left, right) => {
      if (sort === "execution-asc") return left.executionPercent - right.executionPercent;
      if (sort === "execution-desc") return right.executionPercent - left.executionPercent;
      if (sort === "name") return left.name.localeCompare(right.name, "es-PE");
      return right.pim - left.pim;
    });
  }, [band, functionName, projects, query, sort]);
  const visible = filtered.slice(0, 80);
  const filteredPim = filtered.reduce((sum, project) => sum + project.pim, 0);
  const filteredAccrued = filtered.reduce((sum, project) => sum + project.accrued, 0);
  const filteredExecution = filteredPim > 0 ? (filteredAccrued / filteredPim) * 100 : 0;
  const fieldClass = "h-12 w-full rounded-sm border border-border bg-panel px-4 text-sm text-ink outline-none transition-colors focus:border-rust";
  const selectDepartment = (code: string) => {
    setDepartmentCode(code);
    const url = new URL(window.location.href);
    url.searchParams.set("departamento", code);
    window.history.replaceState({}, "", url);
  };

  return (
    <div data-testid="investment-explorer" className="overflow-hidden rounded-[1.25rem] border border-border bg-panel shadow-subtle">
      <div className="border-b border-border bg-canvas p-5 md:p-7">
        <div className="grid gap-5 lg:grid-cols-[0.65fr_1fr] lg:items-end"><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-rust">Selecciona un departamento</p><label className="mt-3 block"><span className="sr-only">Departamento</span><select value={departmentCode} onChange={(event) => selectDepartment(event.target.value)} className={`${fieldClass} text-base font-medium`}>{departments.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}</select></label></div><div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-4">{[
          [numberFormat.format(department.projects), "proyectos visibles"], [moneyFormat.format(department.visiblePim), "PIM visible"], [formatPercent(department.coveragePercent), "cobertura del PIM"], [formatPercent(department.visibleExecutionPercent), "ejecución visible"]
        ].map(([value, label]) => <div key={label} className="bg-panel p-4"><p className="text-xl font-medium tracking-[-0.035em] text-ink">{value}</p><p className="mt-1 text-[8px] leading-4 text-muted">{label}</p></div>)}</div></div>
        <p className="mt-4 text-[10px] leading-5 text-muted">La cobertura compara el PIM de hasta cinco proyectos por municipalidad con el PIM total de inversión municipal del departamento. Diferencias de actualización entre recursos MEF pueden afectar marginalmente la relación.</p>
      </div>

      <div className="p-5 md:p-7">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px_190px_220px]">
          <label className="relative"><span className="sr-only">Buscar proyecto o municipalidad</span><Search className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-muted" aria-hidden /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Proyecto, código o municipalidad" className={`${fieldClass} pl-11`} /></label>
          <label><span className="sr-only">Filtrar por función</span><select value={functionName} onChange={(event) => setFunctionName(event.target.value)} className={fieldClass}><option>Todas</option>{functions.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span className="sr-only">Filtrar por ejecución</span><select value={band} onChange={(event) => setBand(event.target.value as InvestmentBandKey | "Todas")} className={fieldClass}><option>Todas</option>{investmentBandDefinitions.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select></label>
          <label><span className="sr-only">Ordenar proyectos</span><select value={sort} onChange={(event) => setSort(event.target.value as SortValue)} className={fieldClass}>{sortOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-border py-4 text-xs text-muted"><p aria-live="polite">{loading ? "Cargando cartera…" : `${numberFormat.format(filtered.length)} proyectos · ${moneyFormat.format(filteredPim)} PIM · ${formatPercent(filteredExecution)} ejecución financiera`}</p><p>Selección descriptiva; no es un ranking.</p></div>
        {error ? <p role="alert" className="mt-5 rounded-sm border border-rust/25 bg-rust/[0.05] p-4 text-sm text-ink">{error}</p> : null}

        {!loading && !error && visible.length > 0 ? <div className="mt-5 overflow-hidden rounded-md border border-border"><div className="hidden grid-cols-[1.35fr_0.48fr_0.42fr_0.42fr_auto] gap-4 border-b border-border bg-canvas px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.13em] text-muted lg:grid"><span>Proyecto</span><span>Función</span><span>PIM</span><span>Ejecución</span><span>Municipio</span></div><div className="divide-y divide-border">{visible.map((project) => <article key={project.id} className="grid min-w-0 gap-4 px-5 py-5 transition-colors hover:bg-canvas/70 lg:grid-cols-[1.35fr_0.48fr_0.42fr_0.42fr_auto] lg:items-center"><div className="min-w-0"><p className="line-clamp-2 text-sm font-medium leading-5 text-ink">{project.name}</p><p className="mt-1 font-mono text-[9px] text-muted">CUI {project.code}</p></div><p className="text-[10px] leading-4 text-ink/65">{project.function}</p><p className="text-xs font-medium text-ink">{moneyFormat.format(project.pim)}</p><div><p className="text-xs font-medium text-ink">{formatPercent(project.executionPercent)}</p><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border" role="img" aria-label={`Ejecución financiera ${formatPercent(project.executionPercent)}`}><div className="h-full rounded-full bg-rust" style={{ width: `${Math.min(project.executionPercent, 100)}%` }} /></div></div><NextLink href={`/dataperu/municipios/${project.ubigeo}`} className="inline-flex items-center gap-1.5 text-xs font-medium text-rust">{project.municipality}<ArrowRight className="h-3 w-3" aria-hidden /></NextLink></article>)}</div></div> : null}
        {!loading && !error && visible.length === 0 ? <div className="mt-5 rounded-md border border-border bg-canvas px-6 py-12 text-center"><p className="text-sm text-ink/65">No encontramos proyectos con esos filtros.</p></div> : null}
        {filtered.length > visible.length ? <p className="mt-5 text-center text-xs text-muted">Mostrando los primeros {visible.length}. Usa los filtros para acotar la cartera.</p> : null}
      </div>
    </div>
  );
}

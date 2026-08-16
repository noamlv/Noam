import { ArrowUpRight } from "lucide-react";
import NextLink from "next/link";
import { formatCurrency, formatMetric, formatPercent, titleCase } from "@/lib/dataperu";
import { panoramaDepartments, panoramaRanges, panoramaTypeComparison } from "@/lib/dataperu-panorama";

const position = (value: number, min: number, max: number) => max === min ? 50 : ((value - min) / (max - min)) * 100;
const formatRangeValue = (value: number, format: "currency" | "percent") => format === "currency" ? formatCurrency(value) : formatPercent(value);

export function PanoramaHeroVisual() {
  const departments = [...panoramaDepartments].sort((left, right) => left.investmentExecutionPercent - right.investmentExecutionPercent);
  const range = panoramaRanges.find((item) => item.key === "investmentExecutionPercent")!;
  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-[1.25rem] border border-white/14 bg-[#1b2d27] p-6 shadow-visual md:p-8" role="img" aria-label="Distribución ilustrada de la ejecución de inversión municipal en 25 departamentos">
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="relative flex items-center justify-between border-b border-white/14 pb-5"><div><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#d9a48f]">25 contextos</p><p className="mt-2 text-sm font-medium text-white">Ejecución de inversión municipal</p></div><span className="font-mono text-[9px] text-white/35">2025</span></div>
      <div className="relative mt-10 flex h-56 items-end gap-1.5 border-b border-l border-white/18 px-3 pt-5">
        {[60, 70, 80, 90].map((line) => <span key={line} className="absolute inset-x-0 border-t border-dashed border-white/9" style={{ bottom: `${line}%` }}><span className="absolute -left-1 -translate-x-full -translate-y-1/2 font-mono text-[8px] text-white/25">{line}</span></span>)}
        {departments.map((department, index) => <span key={department.code} className="group relative z-10 flex-1 rounded-t-[2px] bg-gradient-to-t from-white/15 to-white/70 transition-colors hover:to-[#d9a48f]" style={{ height: `${department.investmentExecutionPercent}%` }}><span className="sr-only">{titleCase(department.name)}: {formatPercent(department.investmentExecutionPercent)}</span>{index === 0 || index === departments.length - 1 ? <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] text-white/55">{formatPercent(department.investmentExecutionPercent)}</span> : null}</span>)}
      </div>
      <div className="relative mt-6 grid grid-cols-3 gap-3 border-t border-white/14 pt-5 text-center"><div><p className="font-mono text-lg text-white">{formatPercent(range.min)}</p><p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-white/35">mínimo</p></div><div><p className="font-mono text-lg text-[#d9a48f]">{formatPercent(range.median)}</p><p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-white/35">mediana dept.</p></div><div><p className="font-mono text-lg text-white">{formatPercent(range.max)}</p><p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-white/35">máximo</p></div></div>
    </div>
  );
}

export function PanoramaRangeChart() {
  return (
    <div className="divide-y divide-border border-y border-border">
      {panoramaRanges.map((range) => (
        <article key={range.key} className="grid gap-6 py-7 lg:grid-cols-[0.43fr_1fr] lg:items-center">
          <div><h3 className="text-lg font-medium tracking-[-0.025em] text-ink">{range.label}</h3><p className="mt-2 max-w-md text-xs leading-5 text-ink/55">{range.question}</p></div>
          <div>
            <div className="relative mx-2 h-8">
              <span className="absolute inset-x-0 top-1/2 h-px bg-ink/22" />
              <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
              <span className="absolute right-0 top-1/2 h-2.5 w-2.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
              <span className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-rust bg-canvas shadow-subtle" style={{ left: `${position(range.national, range.min, range.max)}%` }}><span className="sr-only">Valor nacional {formatRangeValue(range.national, range.format)}</span></span>
            </div>
            <div className="mt-2 grid grid-cols-[1fr_auto_1fr] gap-4 text-[10px] leading-4"><div><p className="font-mono text-sm text-ink">{formatRangeValue(range.min, range.format)}</p><p className="mt-1 text-muted">{titleCase(range.minDepartment)}</p></div><div className="text-center"><p className="font-mono text-sm text-rust">{formatRangeValue(range.national, range.format)}</p><p className="mt-1 text-muted">agregado nacional</p></div><div className="text-right"><p className="font-mono text-sm text-ink">{formatRangeValue(range.max, range.format)}</p><p className="mt-1 text-muted">{titleCase(range.maxDepartment)}</p></div></div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function MunicipalityTypeComparison() {
  const rows = [
    ["Municipalidades", formatMetric(panoramaTypeComparison.provincial.municipalities), formatMetric(panoramaTypeComparison.district.municipalities)],
    ["Población 2025", formatMetric(panoramaTypeComparison.provincial.population), formatMetric(panoramaTypeComparison.district.population)],
    ["PIM 2025", formatCurrency(panoramaTypeComparison.provincial.pim, true), formatCurrency(panoramaTypeComparison.district.pim, true)],
    ["PIM por habitante", formatCurrency(panoramaTypeComparison.provincial.pimPerCapita), formatCurrency(panoramaTypeComparison.district.pimPerCapita)],
    ["Personal reportado", formatMetric(panoramaTypeComparison.provincial.workforce), formatMetric(panoramaTypeComparison.district.workforce)],
    ["Computadoras operativas", formatMetric(panoramaTypeComparison.provincial.computers), formatMetric(panoramaTypeComparison.district.computers)],
    ["Ejecución de inversión", formatPercent(panoramaTypeComparison.provincial.investmentExecution), formatPercent(panoramaTypeComparison.district.investmentExecution)]
  ];
  return (
    <div className="overflow-hidden rounded-md border border-ink/15 bg-canvas">
      <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] bg-ink px-5 py-4 text-[9px] uppercase tracking-[0.12em] text-white/52"><span>Mediana por tipo</span><span>Provincial</span><span>Distrital</span></div>
      {rows.map(([label, provincial, district]) => <div key={label} className="grid grid-cols-[1.2fr_0.8fr_0.8fr] items-center border-t border-border px-5 py-4 text-xs sm:text-sm"><span className="pr-3 text-ink/58">{label}</span><span className="font-medium text-ink">{provincial}</span><span className="font-medium text-ink">{district}</span></div>)}
    </div>
  );
}

export function DepartmentEvidenceTable() {
  return (
    <>
      <div className="grid gap-2 md:hidden">
        {panoramaDepartments.map((department) => <NextLink key={department.code} href={`/dataperu/departamentos/${department.code}`} className="rounded-sm border border-border bg-panel p-5"><div className="flex items-center justify-between"><h3 className="text-base font-medium text-ink">{titleCase(department.name)}</h3><ArrowUpRight className="h-4 w-4 text-rust" aria-hidden /></div><p className="mt-1 text-[10px] text-muted">{formatMetric(department.municipalities)} municipalidades</p><dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-border pt-4"><div><dt className="text-[9px] uppercase tracking-[0.1em] text-muted">PIM / hab.</dt><dd className="mt-1 text-sm font-medium text-ink">{formatCurrency(department.pimPerCapita)}</dd></div><div><dt className="text-[9px] uppercase tracking-[0.1em] text-muted">Ejec. inversión</dt><dd className="mt-1 text-sm font-medium text-ink">{formatPercent(department.investmentExecutionPercent)}</dd></div><div><dt className="text-[9px] uppercase tracking-[0.1em] text-muted">Ejec. total</dt><dd className="mt-1 text-sm text-ink/68">{formatPercent(department.budgetExecutionPercent)}</dd></div><div><dt className="text-[9px] uppercase tracking-[0.1em] text-muted">Transparencia</dt><dd className="mt-1 text-sm text-ink/68">{formatPercent(department.updatedTransparencyPercent)}</dd></div></dl></NextLink>)}
      </div>
      <div className="hidden w-full min-w-0 max-w-full overflow-x-auto rounded-md border border-border bg-panel md:block">
        <table className="w-full min-w-[820px] border-collapse text-left text-xs">
          <caption className="sr-only">Indicadores municipales agregados por departamento, 2025</caption>
          <thead className="bg-ink text-[9px] uppercase tracking-[0.11em] text-white/52"><tr><th className="px-5 py-4 font-medium">Departamento</th><th className="px-4 py-4 font-medium">Municipios</th><th className="px-4 py-4 font-medium">PIM / hab.</th><th className="px-4 py-4 font-medium">Ejec. total</th><th className="px-4 py-4 font-medium">Ejec. inversión</th><th className="px-4 py-4 font-medium">Transparencia</th><th className="px-4 py-4 font-medium"><span className="sr-only">Abrir perfil</span></th></tr></thead>
          <tbody className="divide-y divide-border">{panoramaDepartments.map((department) => <tr key={department.code} className="transition-colors hover:bg-canvas"><td className="px-5 py-4 font-medium text-ink">{titleCase(department.name)}</td><td className="px-4 py-4 text-ink/62">{formatMetric(department.municipalities)}</td><td className="px-4 py-4 text-ink/62">{formatCurrency(department.pimPerCapita)}</td><td className="px-4 py-4 text-ink/62">{formatPercent(department.budgetExecutionPercent)}</td><td className="px-4 py-4 font-medium text-ink">{formatPercent(department.investmentExecutionPercent)}</td><td className="px-4 py-4 text-ink/62">{formatPercent(department.updatedTransparencyPercent)}</td><td className="px-4 py-4 text-right"><NextLink href={`/dataperu/departamentos/${department.code}`} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-rust hover:text-rust" aria-label={`Abrir perfil de ${titleCase(department.name)}`}><ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></NextLink></td></tr>)}</tbody>
        </table>
      </div>
    </>
  );
}

import type { AnalysisSnapshot } from "@/lib/analysis-library";
import { getAnalysisOverview } from "@/lib/analysis-presentation";

const format = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 2 });

export function AnalysisOverview({ snapshot, accent }: { snapshot: AnalysisSnapshot; accent: string }) {
  const overview = getAnalysisOverview(snapshot);
  const shown = overview.groups.slice(0, 8);
  const maximum = Math.max(...shown.map((group) => group.value), 1);
  const id = `overview-${snapshot.slug}`;

  return <div className="space-y-10">
    <div className="grid gap-6 border-y border-border py-7 sm:grid-cols-2">
      <div><p className="text-xs text-muted">{overview.selected.label}</p><p className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">{format.format(overview.total)}</p><p className="mt-2 text-sm text-muted">{snapshot.unit}{overview.selected.missing > 0 ? " · suma parcial" : ""}</p></div>
      <div><p className="text-xs text-muted">Información representada</p><p className="mt-3 text-3xl font-medium tracking-tight">{overview.selected.groups.length}</p><p className="mt-2 text-sm text-muted">organizaciones políticas</p></div>
    </div>
    <div className={`grid gap-10 ${overview.temporal ? "lg:grid-cols-2 lg:gap-16" : "max-w-4xl"}`}>
      <figure aria-labelledby={`${id}-composition`}>
        <figcaption id={`${id}-composition`} className="text-xl font-medium tracking-tight">{overview.temporal ? `Distribución en ${overview.selected.period}` : overview.selected.label}</figcaption>
        <p className="mt-3 text-xs leading-6 text-muted">{shown.length < overview.groups.length ? `Se muestran las ${shown.length} categorías con mayor valor de ${overview.groups.length}. ` : "Se muestran todas las categorías informadas. "}Unidad: {snapshot.unit}. </p>
        <ol className="mt-7 space-y-5">{shown.map((group) => <li key={group.label}>
          <div className="mb-2 flex items-start justify-between gap-4 text-xs leading-5"><span className="min-w-0 text-ink/75">{group.label}</span><span className="shrink-0 font-mono">{format.format(group.value)}</span></div>
          <div className="h-3 overflow-hidden rounded-sm bg-panel" aria-hidden><div className="h-full rounded-sm" style={{ width: `${group.value / maximum * 100}%`, backgroundColor: accent }} /></div>
        </li>)}</ol>
      </figure>
    </div>
    {overview.selected.missing > 0 ? <p className="border-l-2 border-rust pl-4 text-sm leading-7 text-muted">Hay {overview.selected.missing} filas sin valor en esta vista. Se excluyen de la suma, sin reemplazarlas por cero.</p> : null}
  </div>;
}

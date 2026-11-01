import type { AnalysisSnapshot } from "@/lib/analysis-library";
import { getAnalysisOverview } from "@/lib/analysis-presentation";

const format = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 2 });
const compact = new Intl.NumberFormat("es-PE", { notation: "compact", maximumFractionDigits: 1 });

export function AnalysisOverview({ snapshot, accent }: { snapshot: AnalysisSnapshot; accent: string }) {
  const overview = getAnalysisOverview(snapshot);
  const shown = overview.groups.slice(0, 8);
  const maximum = Math.max(...shown.map((group) => group.value), 1);
  const historyMaximum = Math.max(...overview.history.map((point) => point.total), 1);
  const firstYear = Number(overview.history[0]?.period ?? 0);
  const yearCount = Number(overview.history.at(-1)?.period ?? 0) - firstYear + 1;
  const id = `overview-${snapshot.slug}`;

  return <div className="space-y-10">
    <div className="grid gap-6 border-y border-border py-7 sm:grid-cols-[1fr_1fr_0.8fr]">
      <div><p className="text-xs text-muted">{overview.selected.label}</p><p className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">{format.format(overview.total)}</p><p className="mt-2 text-sm text-muted">{snapshot.unit}{overview.selected.missing > 0 ? " · suma parcial" : ""}</p></div>
      <div><p className="text-xs text-muted">Información representada</p><p className="mt-3 text-3xl font-medium tracking-tight">{overview.selected.groups.length}</p><p className="mt-2 text-sm text-muted">categorías con valor informado</p></div>
      <div><p className="text-xs text-muted">Cobertura de la vista</p><p className="mt-3 text-sm leading-7 text-ink/75">{overview.partial ? "Enero a septiembre de 2025. No es un año completo." : "Datos de la copia histórica indicada, no información en vivo."}</p></div>
    </div>
    <div className={`grid gap-10 ${overview.temporal ? "lg:grid-cols-2 lg:gap-16" : "max-w-4xl"}`}>
      <figure aria-labelledby={`${id}-composition`}>
        <figcaption id={`${id}-composition`} className="text-xl font-medium tracking-tight">{overview.temporal ? `Distribución en ${overview.selected.period}` : overview.selected.label}</figcaption>
        <p className="mt-3 text-xs leading-6 text-muted">{shown.length < overview.groups.length ? `Se muestran las ${shown.length} categorías con mayor valor de ${overview.groups.length}. ` : "Se muestran todas las categorías informadas. "}Unidad: {snapshot.unit}. La cantidad no mide calidad ni desempeño.</p>
        <ol className="mt-7 space-y-5">{shown.map((group) => <li key={group.label}>
          <div className="mb-2 flex items-start justify-between gap-4 text-xs leading-5"><span className="min-w-0 text-ink/75">{group.label}</span><span className="shrink-0 font-mono">{format.format(group.value)}</span></div>
          <div className="h-3 overflow-hidden rounded-sm bg-panel" aria-hidden><div className="h-full rounded-sm" style={{ width: `${group.value / maximum * 100}%`, backgroundColor: accent }} /></div>
        </li>)}</ol>
      </figure>
      {overview.temporal ? <figure aria-labelledby={`${id}-history`}>
        <figcaption id={`${id}-history`} className="text-xl font-medium tracking-tight">Datos disponibles por año</figcaption>
        <p className="mt-3 text-xs leading-6 text-muted">Suma de valores informados. Los años con datos faltantes o cobertura parcial no son directamente comparables con años completos. Una barra vacía puede indicar ausencia de datos, no un valor cero.</p>
        <svg viewBox="0 0 560 230" className="mt-7 h-auto w-full" aria-hidden="true" focusable="false">
          {[0, 0.5, 1].map((fraction) => <g key={fraction}><line x1="64" x2="560" y1={190 - fraction * 170} y2={190 - fraction * 170} stroke="#d6dcd8" strokeDasharray={fraction ? "3 4" : undefined} /><text x="54" y={195 - fraction * 170} textAnchor="end" fontSize="16" fill="#53625b">{compact.format(historyMaximum * fraction)}</text></g>)}
          {overview.history.map((point) => {
            const step = 496 / yearCount;
            const index = Number(point.period) - firstYear;
            const height = point.total / historyMaximum * 170;
            return <g key={point.period}><rect x={64 + index * step + step * 0.2} y={190 - height} width={step * 0.6} height={height} rx="2" fill={point.partial || point.missing > 0 ? "#a85b3f" : accent} opacity={point.missing > 0 ? 0.6 : 1} /><text x={64 + index * step + step / 2} y="211" textAnchor="middle" fontSize="16" fill="#53625b">{point.period.slice(2)}</text></g>;
          })}
        </svg>
        <p className="mt-2 text-xs leading-6 text-muted">Las barras terracota identifican años parciales o con valores faltantes. Los años se indican con sus dos últimas cifras.</p>
        <details className="mt-5 border-t border-border pt-4"><summary className="cursor-pointer text-sm font-medium">Ver valores y cobertura por año</summary><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-xs"><caption className="sr-only">Valores anuales en {snapshot.unit}</caption><thead><tr className="border-b border-border"><th scope="col" className="py-3 pr-4">Periodo</th><th scope="col" className="py-3 pr-4">Suma informada</th><th scope="col" className="py-3">Cobertura</th></tr></thead><tbody>{overview.history.map((point) => <tr key={point.period} className="border-b border-border"><th scope="row" className="py-3 pr-4 font-normal">{point.label}</th><td className="py-3 pr-4 font-mono">{format.format(point.total)}</td><td className="py-3">{point.missing > 0 ? `${point.missing} filas sin valor. ` : ""}{point.partial ? "Enero–septiembre" : point.missing > 0 ? "Suma incompleta" : "Sin faltantes en esta medida"}</td></tr>)}</tbody></table></div></details>
      </figure> : null}
    </div>
    {overview.selected.missing > 0 ? <p className="border-l-2 border-rust pl-4 text-sm leading-7 text-muted">Hay {overview.selected.missing} filas sin valor en esta vista. Se excluyen de la suma, sin reemplazarlas por cero.</p> : null}
  </div>;
}

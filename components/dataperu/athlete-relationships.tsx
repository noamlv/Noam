"use client";

import { useState } from "react";
import { athleteModalities, type AthleteModality, type AthleteRelationshipRow } from "@/lib/analysis-report";

const colors: Record<AthleteModality, string> = {
  "PAD I": "#16746d",
  "PAD II": "#ad4c2e",
  PNM: "#5b6199"
};
const integer = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 2 });
const money = (value: number) => `S/ ${number.format(value)}`;
const pointId = ({ year, modality }: AthleteRelationshipRow) => `${year}:${modality}`;
const pointLabel = (row: AthleteRelationshipRow) =>
  `${row.modality}, ${row.year}${row.partial ? " (enero–septiembre)" : ""}: ${integer.format(row.records)} registros, ${money(row.amount)} en total, ${money(row.mean)} por registro`;

function axisStep(maximum: number) {
  const scale = 10 ** Math.floor(Math.log10(maximum / 4));
  return Math.ceil(maximum / (4 * scale)) * scale;
}

function PointDetail({ row, announced = false }: { row: AthleteRelationshipRow; announced?: boolean }) {
  return <div className="mt-6 rounded-lg border border-[#dce8e3] bg-[#edf6f1] p-4" aria-live={announced ? "polite" : undefined}>
    <p className="text-sm font-semibold">{row.modality} · {row.year}{row.partial ? " (enero–septiembre)" : ""}</p>
    <dl className="mt-3 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
      {[
        ["Registros", integer.format(row.records)],
        ["Monto total", money(row.amount)],
        ["Por registro", money(row.mean)]
      ].map(([label, value]) => <div key={label}>
        <dt className="text-xs text-ink/75">{label}</dt><dd className="mt-1 font-semibold tabular-nums">{value}</dd>
      </div>)}
    </dl>
  </div>;
}

export function AthleteRelationships({ rows }: { rows: AthleteRelationshipRow[] }) {
  const [modality, setModality] = useState<AthleteModality | "all">("all");
  const [includePartial, setIncludePartial] = useState(false);
  const [selected, setSelected] = useState("2024:PAD II");
  const [preview, setPreview] = useState<string | null>(null);

  const visible = rows.filter((row) => (includePartial || !row.partial) && (modality === "all" || row.modality === modality));
  if (!visible.length) return null;
  const complete = rows.filter((row) => !row.partial);
  const years = [...new Set(rows.filter((row) => includePartial || !row.partial).map((row) => row.year))];
  const columns = modality === "all" ? athleteModalities : [modality];
  const chosen = visible.find((row) => pointId(row) === selected) ?? visible.at(-1)!;
  const active = visible.find((row) => pointId(row) === preview) ?? chosen;
  const visibleById = new Map(visible.map((row) => [pointId(row), row]));
  const recordStep = axisStep(Math.max(1, ...complete.map((row) => row.records), ...visible.map((row) => row.records)));
  const amountStep = axisStep(Math.max(1, ...complete.map((row) => row.amount), ...visible.map((row) => row.amount)));
  const maxMean = Math.max(1, ...complete.map((row) => row.mean), ...visible.map((row) => row.mean));
  const x = (row: AthleteRelationshipRow) => row.records / (recordStep * 4) * 100;
  const y = (row: AthleteRelationshipRow) => 100 - row.amount / (amountStep * 4) * 100;
  const select = (row: AthleteRelationshipRow) => {
    setSelected(pointId(row));
    setPreview(null);
  };

  return <div className="mt-6 rounded-xl border border-[#dce8e3] bg-[#f8faf9] p-4 sm:p-6">
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
      <div role="group" aria-label="Modalidad de apoyo" className="flex flex-wrap gap-2">
        {(["all", ...athleteModalities] as const).map((option) => <button
          key={option} type="button" aria-pressed={modality === option}
          onClick={() => { setModality(option); setPreview(null); }}
          className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16746d] ${modality === option ? "border-[#155950] bg-[#155950] text-white" : "border-border bg-white text-ink hover:border-[#16746d]"}`}
        >{option !== "all" && <span aria-hidden="true" className="size-2.5 rounded-full border border-white/60" style={{ backgroundColor: colors[option] }} />}
          {option === "all" ? "Todas" : option}</button>)}
      </div>
      <label className="flex min-h-10 cursor-pointer items-center gap-2 text-sm"><input type="checkbox" checked={includePartial} onChange={(event) => { setIncludePartial(event.target.checked); setPreview(null); }} className="size-4 accent-[#16746d]" /> Incluir 2025 (parcial)</label>
    </div>

    <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="min-w-0">
        <h4 className="text-base font-semibold">Monto total frente a registros</h4>
        <p className="mt-1 text-xs leading-6 text-ink/75">Cada punto es una modalidad en un año. Elige un punto o una celda para ver sus cifras.</p>
        <p className="mt-4 text-xs font-medium">Monto reportado (millones de soles)</p>
        <div className="relative ml-8 mr-4 mt-4 h-52 border-b border-l border-[#afc4bb] sm:ml-10 sm:h-64" onMouseLeave={() => setPreview(null)}>
          {[0, 1, 2, 3, 4].map((tick) => <div key={tick} aria-hidden="true" className="pointer-events-none absolute inset-x-0 border-t border-[#d9e4df]" style={{ top: `${100 - tick * 25}%` }}>
            <span className="absolute right-full mr-2 -translate-y-1/2 font-mono text-[11px] text-ink/75">{number.format(tick * amountStep / 1_000_000)}</span>
          </div>)}
          {[0, 1, 2, 3, 4].map((tick) => <span key={tick} aria-hidden="true" className="absolute top-full mt-2 -translate-x-1/2 font-mono text-[11px] text-ink/75" style={{ left: `${tick * 25}%` }}>{integer.format(tick * recordStep)}</span>)}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 border-l border-dashed border-[#6a9487]" style={{ left: `${x(active)}%` }} />
          {visible.map((row) => {
            const current = pointId(row) === pointId(active);
            return <button key={pointId(row)} type="button" aria-label={pointLabel(row)} aria-pressed={pointId(row) === pointId(chosen)}
              onMouseEnter={() => setPreview(pointId(row))} onFocus={() => setPreview(pointId(row))} onBlur={() => setPreview(null)} onClick={() => select(row)}
              className={`group absolute grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full focus-visible:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#155950] ${current ? "z-10" : ""}`}
              style={{ left: `${x(row)}%`, top: `${y(row)}%` }}>
              <span className={`size-2.5 rounded-full border-2 shadow-sm ${current ? "ring-2 ring-[#155950] ring-offset-2" : ""}`} style={{ backgroundColor: row.partial ? "#fff" : colors[row.modality], borderColor: row.partial ? colors[row.modality] : "#fff" }} />
            </button>;
          })}
        </div>
        <p className="mt-8 text-center text-xs font-medium">Número de registros</p>
        {includePartial && <p className="mt-2 text-xs text-ink/75">Los puntos huecos son de enero a septiembre de 2025.</p>}
        <PointDetail row={active} announced={active === chosen} />
      </div>

      <div className="min-w-0" onMouseLeave={() => setPreview(null)}>
        <h4 className="text-base font-semibold">Mapa de calor del monto medio</h4>
        <p className="mt-1 text-xs leading-6 text-ink/75">Soles nominales por registro. Un color más oscuro indica un monto medio mayor.</p>
        <table className="mt-3 w-full border-separate border-spacing-1 text-right text-xs tabular-nums">
          <caption className="sr-only">Monto medio por registro, por año y modalidad</caption>
          <thead><tr><th scope="col" className="text-left">Año</th>{columns.map((column) => <th key={column} scope="col" className="px-1 pb-1 text-center">{column}</th>)}</tr></thead>
          <tbody>{years.map((year) => <tr key={year}>
            <th scope="row" className="whitespace-nowrap pr-1 text-left font-medium">{year}{rows.some((row) => row.year === year && row.partial) ? "*" : ""}</th>
            {columns.map((column) => {
              const row = visibleById.get(`${year}:${column}`);
              if (!row) return <td key={column} className="rounded bg-[#edf1ee] text-center" aria-label="Sin registros en la copia">—</td>;
              return <td key={column} className="p-0"><button type="button" aria-label={pointLabel(row)} aria-pressed={pointId(row) === pointId(chosen)}
                onMouseEnter={() => setPreview(pointId(row))} onFocus={() => setPreview(pointId(row))} onBlur={() => setPreview(null)} onClick={() => select(row)}
                className={`min-h-8 w-full rounded px-1 text-center font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#155950] ${pointId(row) === pointId(active) ? "ring-2 ring-[#155950] ring-inset" : ""}`}
                style={{ backgroundColor: `rgba(22,116,109,${0.05 + (row.mean / maxMean) * 0.32})` }}>{integer.format(row.mean)}</button></td>;
            })}
          </tr>)}</tbody>
        </table>
        <p className="mt-3 text-xs leading-6 text-ink/75">— Sin registros de la modalidad en la copia.{includePartial ? " * 2025 solo incluye enero a septiembre." : ""}</p>
      </div>
    </div>
    <p className="mt-6 border-t border-border pt-4 text-xs leading-6 text-ink/75">Monto total = registros × monto medio por registro. La relación es descriptiva: un registro no equivale a un deportista único y el promedio no mide impacto ni refleja ajustes por inflación.</p>
  </div>;
}

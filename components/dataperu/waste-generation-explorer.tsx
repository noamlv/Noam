"use client";

import { useMemo, useState } from "react";

type AnnualEntry = { year: number; districts: number; tonnes: number };
type DepartmentEntry = { code: string; name: string; annual: AnnualEntry[] };

const integer = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 });
const decimal = new Intl.NumberFormat("es-PE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function WasteGenerationExplorer({ annual, departments }: {
  annual: AnnualEntry[];
  departments: DepartmentEntry[];
}) {
  const [departmentCode, setDepartmentCode] = useState("");
  const department = useMemo(() => departments.find((item) => item.code === departmentCode), [departmentCode, departments]);
  const series = department?.annual ?? annual;
  const latest = series.at(-1);
  const maximum = Math.max(...series.map((entry) => entry.tonnes));
  const scale = department ? 1_000 : 1_000_000;
  const unit = department ? "mil t" : "millones de t";

  return (
    <div className="rounded-md border border-border bg-panel p-5 md:p-8">
      <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-rust">Generación estimada · MINAM</p>
          <h3 className="mt-2 text-xl font-medium tracking-[-0.03em] text-ink">{department ? department.name.toLocaleLowerCase("es-PE").replace(/(^|\s)\p{L}/gu, (letter) => letter.toLocaleUpperCase("es-PE")) : "Perú"}</h3>
        </div>
        <label className="block text-xs font-medium text-muted">
          Selecciona un departamento
          <select
            value={departmentCode}
            onChange={(event) => setDepartmentCode(event.target.value)}
            className="mt-2 h-11 w-full min-w-56 rounded-sm border border-border bg-panel px-3 text-sm text-ink outline-none transition-colors focus:border-rust focus-visible:ring-2 focus-visible:ring-rust/30"
          >
            <option value="">Todo el Perú</option>
            {departments.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-7 grid gap-7 lg:grid-cols-[0.36fr_1fr] lg:gap-12">
        <div>
          <p className="text-xs text-muted">Último año de la serie · 2024</p>
          <p className="mt-3 text-4xl font-medium tracking-[-0.045em] text-ink" aria-live="polite">{latest ? integer.format(latest.tonnes) : "—"}</p>
          <p className="mt-1 text-sm text-ink/65">toneladas anuales estimadas</p>
          <p className="mt-6 border-t border-border pt-5 text-xs leading-6 text-muted">{latest ? integer.format(latest.districts) : "—"} distritos en este ámbito. La cobertura de la serie varía entre años; este volumen no mide desempeño municipal.</p>
        </div>
        <div>
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.13em] text-muted">Serie anual · {unit}</p>
          <div className="space-y-2" role="list" aria-label={`Serie anual de ${department?.name ?? "Perú"}`}>
            {series.map((entry) => (
              <div key={entry.year} role="listitem" className="grid grid-cols-[38px_minmax(0,1fr)_74px] items-center gap-3 sm:grid-cols-[42px_minmax(0,1fr)_92px]">
                <span className="sr-only">{entry.year}: {integer.format(entry.tonnes)} toneladas; {entry.districts} distritos.</span>
                <span aria-hidden className="font-mono text-[11px] text-muted">{entry.year}</span>
                <div aria-hidden className="h-5 bg-canvas">
                  <div className={`h-full ${entry.year === 2024 ? "bg-rust" : "bg-[#799084]"}`} style={{ width: `${(entry.tonnes / maximum) * 100}%` }} />
                </div>
                <span aria-hidden className="text-right font-mono text-[11px] text-ink/75">{decimal.format(entry.tonnes / scale)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import type { CSSProperties, ReactNode } from "react";
import type { AnalysisSlice, AnalysisSnapshot } from "@/lib/analysis-library";
import { annualObservations, athleteRelationshipRows, completeSegments, matchedChanges, sliceTotal, type AnnualObservation } from "@/lib/analysis-report";
import { AthleteRelationships } from "./athlete-relationships";

const number = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 2 });
const percent = new Intl.NumberFormat("es-PE", { style: "percent", maximumFractionDigits: 1 });
const millions = (n: number) => number.format(Math.round(n / 10_000) / 100);
const palette = ["#287477", "#bb5537", "#c99931", "#55749e", "#80639b", "#647b4e"];

function StoryBlock({ id, index, title, children }: { id?: string; index: string; title: string; children: ReactNode }) {
  return <section id={id} className="scroll-mt-20 border-t border-border pt-9 md:pt-12">
    <p className="font-mono text-xs font-semibold tracking-widest text-rust">{index}</p>
    <h3 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">{title}</h3>
    {children}
  </section>;
}

function Reading({ children }: { children: ReactNode }) {
  return <p className="my-6 max-w-3xl border-l-2 border-rust pl-4 text-base leading-7 text-ink/80">{children}</p>;
}

function Metrics({ items }: { items: { value: string; label: string }[] }) {
  return <dl className="grid gap-px overflow-hidden rounded-xl border border-[#dce8e3] bg-[#dce8e3] sm:grid-cols-3">
    {items.map(({ value, label }) => <div key={label} className="flex flex-col-reverse gap-2 bg-[#f0f7f4] px-5 py-6 sm:px-7">
      <dt className="text-sm leading-6 text-ink/75">{label}</dt>
      <dd className="text-3xl font-medium tracking-tight text-[#135653] sm:text-4xl">{value}</dd>
    </div>)}
  </dl>;
}

function Timeline({ points, accent, label, display = number.format }: { points: AnnualObservation[]; accent: string; label: string; display?: (n: number) => string }) {
  const first = points[0].year;
  const last = points.at(-1)!.year;
  const maximum = Math.max(1, ...points.map((point) => point.value));
  const magnitude = 10 ** Math.floor(Math.log10(maximum / 4));
  const step = Math.ceil(maximum / (4 * magnitude)) * magnitude;
  const top = step * 4;
  const x = (year: number) => 2 + ((year - first) / Math.max(last - first, 1)) * 96;
  const y = (value: number) => 100 - (value / top) * 100;
  const hasPartial = points.some((point) => point.partial);

  return <figure className="mt-6 rounded-xl border border-border bg-[#f8faf9] px-4 pb-5 pt-6 sm:px-7">
    <figcaption className="text-sm font-medium text-ink">{label}</figcaption>
    <div className="relative mt-6 ml-[3.5rem] mr-2 h-48 sm:ml-[4.5rem] sm:h-64" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((tick) => <div key={tick} className="absolute inset-x-0 border-t border-[#d9e4df]" style={{ top: `${y(tick * step)}%` }}>
        <span className="absolute right-full mr-2 -translate-y-1/2 whitespace-nowrap font-mono text-[11px] text-ink/75 sm:mr-3">{display(tick * step)}</span>
      </div>)}
      <svg viewBox="0 0 1000 250" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" focusable="false">
        {completeSegments(points).filter((segment) => segment.length > 1).map((segment) => {
          const vertices = segment.map((point) => `${x(point.year) * 10},${y(point.value) * 2.5}`).join(" ");
          return <g key={segment[0].year}>
            <polygon points={`${x(segment[0].year) * 10},250 ${vertices} ${x(segment.at(-1)!.year) * 10},250`} fill={accent} fillOpacity=".1" />
            <polyline points={vertices} stroke={accent} strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" fill="none" />
          </g>;
        })}
      </svg>
      {points.map((point) => <span key={point.year} title={`${point.year}: ${display(point.value)} · ${point.coverage}`} className={`absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${point.partial ? "border-[#a2462c] bg-white" : "border-white"}`} style={{ left: `${x(point.year)}%`, top: `${y(point.value)}%`, backgroundColor: point.partial ? undefined : accent }} />)}
      {points.map((point, index) => <span key={point.year} className={`absolute top-full mt-2 -translate-x-1/2 font-mono text-[11px] text-ink/80 sm:text-xs ${index === 0 || index === points.length - 1 || (index % 4 === 0 && index < points.length - 2) ? "" : "hidden sm:block"}`} style={{ left: `${x(point.year)}%` }}>{point.year}</span>)}
    </div>
    <p className="mt-9 text-xs leading-6 text-ink/75">Año{hasPartial ? " · Los puntos abiertos indican cortes parciales o filas faltantes. No se unen a la línea." : ""}</p>
  </figure>;
}

function DataTable({ title, columns, rows }: { title: string; columns: string[]; rows: { label: string; values: ReactNode[] }[] }) {
  return <div className="mt-6 overflow-x-auto rounded-xl border border-border" tabIndex={0} role="region" aria-label={title}>
    <table className="w-full border-collapse text-left text-sm">
      <caption className="bg-[#f0f5f2] px-4 py-3 text-left text-sm font-medium">{title}</caption>
      <thead className="border-y border-border text-xs text-ink/75"><tr>{columns.map((column, i) => <th key={column} scope="col" className={`px-4 py-3 ${i ? "text-right" : ""}`}>{column}</th>)}</tr></thead>
      <tbody className="divide-y divide-border">{rows.map(({ label, values }) => <tr key={label} className="even:bg-panel/40">
        <th scope="row" className="px-4 py-2.5 font-medium">{label}</th>
        {values.map((value, i) => <td key={columns[i + 1]} className="whitespace-nowrap px-4 py-2.5 text-right tabular-nums">{value}</td>)}
      </tr>)}</tbody>
    </table>
  </div>;
}

function Ranking({ slice, title, accent }: { slice: AnalysisSlice; title: string; accent: string }) {
  const total = sliceTotal(slice);
  const groups = [...slice.groups].sort((a, b) => b.value - a.value);
  return <figure className="mt-6">
    <figcaption className="mb-4 text-sm font-medium">{title}</figcaption>
    <ol className="grid gap-x-10 gap-y-4 md:grid-flow-col md:grid-rows-[repeat(var(--rank-rows),minmax(0,1fr))] md:grid-cols-2" style={{ "--rank-rows": Math.ceil(groups.length / 2) } as CSSProperties}>
      {groups.map((group) => <li key={group.label}>
        <div className="flex items-baseline justify-between gap-2 text-sm"><span>{group.label}</span><span className="shrink-0 tabular-nums">{number.format(group.value)} <span className="ml-1 text-xs text-ink/65">({percent.format(group.value / total)})</span></span></div>
        <div aria-hidden="true" className="mt-1.5 h-2 rounded-full bg-[#edf1ee]"><div className="h-full rounded-full" style={{ width: `${group.value / groups[0].value * 100}%`, backgroundColor: accent }} /></div>
      </li>)}
    </ol>
    <p className="mt-4 text-xs leading-6 text-muted">La barra más larga representa el mayor valor. El porcentaje usa como base el total informado de esta vista.</p>
  </figure>;
}

function Composition({ slices, labels, title }: { slices: AnalysisSlice[]; labels: string[]; title: string }) {
  return <figure className="mt-6 rounded-xl border border-border bg-[#f8faf9] p-4 sm:p-6">
    <figcaption className="text-sm font-medium">{title}</figcaption>
    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink/80">{labels.map((label, i) => <li key={label} className="flex items-center gap-2"><span className="size-2.5 rounded-sm" style={{ backgroundColor: palette[i % palette.length] }} />{label}</li>)}</ul>
    <div className={`mt-5 grid gap-x-8 gap-y-2.5 ${slices.length > 15 ? "lg:grid-cols-2" : ""}`}>
      {slices.map((slice) => {
        const total = sliceTotal(slice);
        const parts = labels.map((label) => ({ label, value: slice.groups.find((group) => group.label === label)?.value ?? 0 }));
        const description = parts.filter((part) => part.value > 0).map((part) => `${part.label}: ${percent.format(part.value / total)}`).join("; ");
        return <div key={slice.period} className="grid grid-cols-[minmax(5rem,8rem)_1fr] items-center gap-3 text-xs">
          <span>{slice.period === "2025" ? "2025 (parcial)" : slice.label}</span>
          <div className="flex h-4 overflow-hidden rounded-sm bg-[#edf1ee]" role="img" aria-label={`${slice.label}, ${description}`}>
            {parts.map((part, i) => part.value > 0 && <div key={part.label} className="h-full" title={`${part.label}: ${number.format(part.value)} (${percent.format(part.value / total)})`} style={{ width: `${part.value / total * 100}%`, backgroundColor: palette[i % palette.length] }} />)}
          </div>
        </div>;
      })}
    </div>
    <p className="mt-4 text-xs leading-6 text-muted">Cada barra suma 100 % dentro de su fila. El largo de la barra no representa el volumen total.</p>
  </figure>;
}

function AnnualTable({ points, unit, recordLabel }: { points: AnnualObservation[]; unit: string; recordLabel?: string }) {
  return <DataTable title="Valores y cobertura por año" columns={["Año", unit, ...(recordLabel ? [recordLabel] : []), "Cobertura"]} rows={points.map((point) => ({
    label: String(point.year),
    values: [number.format(point.value), ...(recordLabel ? [number.format(point.records)] : []), point.coverage]
  }))} />;
}

function ChangeBars({ rows, title }: { rows: ReturnType<typeof matchedChanges>; title: string }) {
  const maximum = Math.max(1, ...rows.map((row) => Math.abs(row.delta)));
  return <figure className="mt-6 rounded-xl bg-[#f4f7f5] p-4 sm:p-6">
    <figcaption className="text-sm font-medium">{title}</figcaption>
    <p className="mt-2 text-xs text-ink/75">Desde el centro: disminuciones a la izquierda, aumentos a la derecha. Todas las barras usan la misma escala.</p>
    <ul className={`mt-5 grid gap-x-10 gap-y-3 ${rows.length > 8 ? "md:grid-cols-2" : ""}`}>
      {rows.map(({ label, delta }) => <li key={label}>
        <div className="flex justify-between gap-2 text-sm"><span>{label}</span><span className="shrink-0 tabular-nums">{delta > 0 ? "+" : delta < 0 ? "−" : ""}{number.format(Math.abs(delta))}</span></div>
        <div aria-hidden="true" className="relative mt-1 h-2.5 rounded-full bg-[#e6ece8]">
          <span className="absolute inset-y-0 left-1/2 border-l border-ink/40" />
          <span className="absolute inset-y-0 rounded-sm" style={{ left: `${delta < 0 ? 50 + delta / maximum * 50 : 50}%`, width: `${Math.abs(delta) / maximum * 50}%`, backgroundColor: delta < 0 ? "#bb5537" : "#287477" }} />
        </div>
      </li>)}
    </ul>
  </figure>;
}

function change(from: number, to: number) {
  return `${to >= from ? "+" : "−"}${percent.format(Math.abs(to - from) / from)}`;
}

function AthleteReport({ snapshot, accent }: { snapshot: AnalysisSnapshot; accent: string }) {
  const points = annualObservations(snapshot);
  const complete = points.filter((point) => !point.partial);
  const last = complete.at(-1)!;
  const previous = complete.at(-2)!;
  const peak = complete.reduce((max, point) => point.value > max.value ? point : max);
  const latest = points.at(-1)!;
  const categories = ["PAD I", "PAD II", "PNM"];
  const lastSlice = snapshot.slices.find((slice) => Number(slice.period) === last.year)!;
  const previousSlice = snapshot.slices.find((slice) => Number(slice.period) === previous.year)!;
  const changes = matchedChanges(previousSlice, lastSlice);
  const relationships = athleteRelationshipRows(snapshot);
  const padTwoBefore = relationships.find((row) => row.year === previous.year && row.modality === "PAD II");
  const padTwoAfter = relationships.find((row) => row.year === last.year && row.modality === "PAD II");
  return <>
    <Metrics items={[
      { value: `S/ ${millions(last.value)} millones`, label: `Monto reportado en ${last.year}, último año completo` },
      { value: change(previous.value, last.value), label: `Variación nominal entre ${previous.year} y ${last.year}` },
      { value: `S/ ${millions(latest.value)} millones`, label: `Monto reportado entre enero y septiembre de ${latest.year}` }
    ]} />
    <StoryBlock index="01 · EVOLUCIÓN" title="Cómo cambiaron los montos de apoyo">
      <Reading>El mayor monto anual de la copia fue S/ {millions(peak.value)} millones en {peak.year}. En {last.year} el total fue {percent.format(Math.abs(last.value - previous.value) / previous.value)} {last.value < previous.value ? "menor" : "mayor"} que en {previous.year}. Los montos son nominales; no reflejan cambios en el poder de compra.</Reading>
      <Timeline points={points} accent={accent} label="Monto reportado (millones de soles nominales)" display={millions} />
    </StoryBlock>
    <StoryBlock id="cruces-pad" index="02 · CRUCES INTERACTIVOS" title="¿Más registros o un mayor monto por registro?">
      {padTwoBefore && padTwoAfter && <Reading>En PAD II, los registros pasaron de {number.format(padTwoBefore.records)} en {previous.year} a {number.format(padTwoAfter.records)} en {last.year}. El total pasó de S/ {millions(padTwoBefore.amount)} a S/ {millions(padTwoAfter.amount)} millones, mientras el promedio por registro pasó de S/ {number.format(padTwoBefore.mean)} a S/ {number.format(padTwoAfter.mean)}.</Reading>}
      <AthleteRelationships rows={relationships} />
    </StoryBlock>
    <StoryBlock index="03 · MODALIDADES" title="Cómo se distribuye el apoyo entre modalidades">
      <Composition slices={snapshot.slices} labels={categories} title="Participación de cada modalidad en el monto anual" />
      <Reading>En {last.year}, PAD I reunió {percent.format((lastSlice.groups.find((group) => group.label === "PAD I")?.value ?? 0) / last.value)} del monto reportado. En 2025, la composición describe solo nueve meses: no permite estimar el cierre del año.</Reading>
      <ChangeBars rows={changes} title={`Diferencia del monto por modalidad, ${previous.year}–${last.year} (S/)`} />
      <Reading>El monto de PAD I cayó en S/ {millions(Math.abs(changes.find((row) => row.label === "PAD I")!.delta))} millones, mientras aumentó el de PAD II. El total anual por sí solo no muestra esos movimientos en direcciones distintas.</Reading>
      <DataTable title="Montos por modalidad (S/)" columns={["Año", ...categories]} rows={snapshot.slices.map((slice) => ({
        label: slice.period === "2025" ? "2025 (parcial)" : slice.label,
        values: categories.map((label) => { const value = slice.groups.find((group) => group.label === label)?.value; return value === undefined ? "—" : number.format(value); })
      }))} />
      <p className="mt-3 text-xs text-muted">Un guion indica que no hay registros de esa modalidad en el año dentro de esta copia.</p>
    </StoryBlock>
    <StoryBlock index="04 · REGISTROS" title="Cuántos registros de apoyo aparecen en el archivo">
      <Timeline points={points.map((point) => ({ ...point, value: point.records }))} accent="#55749e" label="Registros de beneficios reportados" />
      <Reading>El archivo suma {number.format(snapshot.sourceRows)} filas. Una persona puede figurar en varios registros, por lo que el gráfico no mide cuántos deportistas distintos recibieron apoyo ni sus resultados deportivos.</Reading>
      <AnnualTable points={points} unit="Monto (S/)" recordLabel="Registros" />
    </StoryBlock>
  </>;
}

function TerritoryReport({ snapshot, accent }: { snapshot: AnalysisSnapshot; accent: string }) {
  const national = snapshot.slices[0];
  const total = sliceTotal(national);
  const noRecord = national.groups.find((group) => group.label === "Sin Registro")!.value;
  const states = national.groups.map((group) => group.label);
  const regions = snapshot.slices.slice(1);
  return <>
    <Metrics items={[
      { value: number.format(total), label: "Provincias incluidas en la copia histórica" },
      { value: percent.format(noRecord / total), label: "Provincias con la etiqueta «Sin Registro»" },
      { value: number.format(states.length), label: "Estados reportados por la fuente" }
    ]} />
    <StoryBlock index="01 · PANORAMA" title="En qué estado figuran los planes territoriales">
      <Reading>{number.format(noRecord)} de {number.format(total)} provincias figuran como «Sin Registro». Es la etiqueta más frecuente, pero no prueba que esas provincias no tengan un plan: hace falta revisar sus documentos.</Reading>
      <Ranking slice={national} title="Provincias por estado reportado" accent={accent} />
    </StoryBlock>
    <StoryBlock index="02 · TERRITORIO" title="Cómo cambia la composición por departamento">
      <Composition slices={regions} labels={states} title="Proporción de provincias por estado dentro de cada ámbito" />
      <Reading>Una provincia tiene más peso en un departamento con pocas provincias. Lee los porcentajes junto con los recuentos de la tabla. Las etiquetas se conservan tal como figuran en la fuente y no certifican vigencia jurídica.</Reading>
      <DataTable title="Provincias por ámbito y estado reportado" columns={["Ámbito", ...states, "Total"]} rows={regions.map((slice) => ({
        label: slice.label, values: [...states.map((state) => slice.groups.find((group) => group.label === state)?.value ?? 0), sliceTotal(slice)]
      }))} />
    </StoryBlock>
  </>;
}

function RegionalReport({ snapshot, accent }: { snapshot: AnalysisSnapshot; accent: string }) {
  const waste = snapshot.slug === "residuos-municipales";
  const points = annualObservations(snapshot);
  const complete = points.filter((point) => !point.partial);
  const latest = complete.at(-1)!;
  const previous = complete.at(-2)!;
  const first = complete[0];
  const selected = snapshot.slices.find((slice) => Number(slice.period) === latest.year)!;
  const before = snapshot.slices.find((slice) => Number(slice.period) === previous.year)!;
  const changes = matchedChanges(before, selected);
  const leader = selected.groups.reduce((max, group) => group.value > max.value ? group : max);
  return <>
    <Metrics items={[
      { value: waste ? `${millions(latest.value)} millones` : number.format(latest.value), label: waste ? `Toneladas estimadas en ${latest.year}` : `Inscripciones reportadas en ${latest.year}, último año completo` },
      { value: change(waste ? first.value : previous.value, latest.value), label: `Cambio del total informado entre ${waste ? first.year : previous.year} y ${latest.year}` },
      { value: number.format(waste ? latest.records : points.at(-1)!.value), label: waste ? `Distritos incluidos en ${latest.year}` : "Inscripciones entre enero y septiembre de 2025" }
    ]} />
    <StoryBlock index="01 · EVOLUCIÓN" title={waste ? "Cómo cambió la generación estimada de residuos" : "Cómo cambiaron las inscripciones reportadas"}>
      <Reading>{waste ? <>La estimación total pasó de {millions(first.value)} a {millions(latest.value)} millones de toneladas entre {first.year} y {latest.year}. La cobertura también cambió: de {number.format(first.records)} a {number.format(latest.records)} distritos. La variación no corresponde a un panel fijo de distritos.</> : <>El total informado pasó de {number.format(previous.value)} inscripciones en {previous.year} a {number.format(latest.value)} en {latest.year}. Un aumento del registro no indica por sí solo un aumento en la prevalencia de discapacidad.</>}</Reading>
      <Timeline points={points} accent={accent} label={waste ? "Generación municipal estimada (millones de toneladas)" : "Inscripciones reportadas"} display={waste ? millions : number.format} />
      <AnnualTable points={points} unit={waste ? "Toneladas estimadas" : "Inscripciones"} recordLabel={waste ? "Distritos incluidos" : undefined} />
    </StoryBlock>
    <StoryBlock index="02 · TERRITORIO" title={`Cómo se distribuye el total de ${latest.year}`}>
      <Reading>{leader.label} concentra {percent.format(leader.value / latest.value)} del total informado en {latest.year}. {waste ? "Estos valores muestran volumen estimado, no desempeño del servicio ni generación por habitante." : "Se mantienen los ámbitos de la fuente, incluida Lima Metropolitana como ámbito separado. No son tasas de registro ni estimaciones de prevalencia."}</Reading>
      <Ranking slice={selected} title={waste ? "Toneladas estimadas por departamento" : "Inscripciones por ámbito reportado"} accent={accent} />
    </StoryBlock>
    <StoryBlock index="03 · CAMBIOS" title={`Dónde cambió más el total entre ${previous.year} y ${latest.year}`}>
      <Reading>El mayor aumento informado fue en {changes[0].label}: {number.format(changes[0].delta)} {waste ? "toneladas estimadas" : "inscripciones"} adicionales. {waste ? "La diferencia se calcula sobre los totales departamentales del archivo, no sobre un panel fijo de distritos." : "Se comparan los ámbitos con la misma etiqueta en ambos años. Los cambios pueden reflejar diferencias de cobertura o registro, no de prevalencia."}</Reading>
      <ChangeBars rows={changes} title={`Diferencia entre ${latest.year} y ${previous.year} (${waste ? "toneladas" : "inscripciones"})`} />
    </StoryBlock>
    {!waste && <StoryBlock index="04 · CORTE PARCIAL" title="Qué muestran los datos de enero a septiembre de 2025">
      <Reading>Este corte no debe compararse como año completo con 2024. Los ámbitos de 2025 se presentan con los nombres de la fuente; no se equipara Lima con Lima Metropolitana.</Reading>
      <Ranking slice={snapshot.slices.at(-1)!} title="Inscripciones por ámbito en el corte parcial" accent="#55749e" />
    </StoryBlock>}
  </>;
}

export function AnalysisReport({ snapshot, accent }: { snapshot: AnalysisSnapshot; accent: string }) {
  return <div className="space-y-12 md:space-y-16">
    {snapshot.slug === "apoyo-deportista" ? <AthleteReport snapshot={snapshot} accent={accent} /> :
      snapshot.slug === "planes-territoriales" ? <TerritoryReport snapshot={snapshot} accent={accent} /> :
      <RegionalReport snapshot={snapshot} accent={accent} />}
    <a className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-medium text-ink hover:border-rust" href={`/analisis/${snapshot.slug}/data.csv`} download>Descargar agregados CSV</a>
  </div>;
}

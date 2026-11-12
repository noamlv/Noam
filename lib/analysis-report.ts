import type { AnalysisSlice, AnalysisSnapshot } from "./analysis-library.ts";

export function sliceTotal(slice: AnalysisSlice) {
  return slice.groups.reduce((sum, group) => sum + group.value, 0);
}

export function sliceRecords(slice: AnalysisSlice) {
  return slice.groups.reduce((sum, group) => sum + group.records, 0);
}

export function matchedChanges(from: AnalysisSlice, to: AnalysisSlice) {
  const baseline = new Map(from.groups.map(({ label, value }) => [label, value]));
  return to.groups.flatMap(({ label, value }) => {
    const before = baseline.get(label);
    return before === undefined ? [] : [{ label, delta: value - before }];
  }).sort((a, b) => b.delta - a.delta);
}

export function annualObservations(snapshot: AnalysisSnapshot) {
  if (!snapshot.slices.length || snapshot.slices.some((slice) => !/^\d{4}$/.test(slice.period))) return [];
  return snapshot.slices.map((slice) => ({
    year: Number(slice.period),
    value: sliceTotal(slice),
    records: sliceRecords(slice),
    partial: slice.period === "2025" || slice.missing > 0
  })).sort((a, b) => a.year - b.year);
}

export type AnnualObservation = ReturnType<typeof annualObservations>[number];

export const athleteModalities = ["PAD I", "PAD II", "PNM"] as const;
export type AthleteModality = typeof athleteModalities[number];

export function athleteRelationshipRows(snapshot: AnalysisSnapshot) {
  if (snapshot.slug !== "apoyo-deportista") return [];
  return annualObservations(snapshot).flatMap(({ year, partial }) => {
    const slice = snapshot.slices.find(({ period }) => Number(period) === year)!;
    return athleteModalities.flatMap((modality) => {
      const group = slice.groups.find(({ label }) => label === modality);
      return group && group.records > 0 ? [{
        year, modality, partial, records: group.records, amount: group.value, mean: group.value / group.records
      }] : [];
    });
  });
}

export type AthleteRelationshipRow = ReturnType<typeof athleteRelationshipRows>[number];

export function completeSegments<T extends { year: number; partial: boolean }>(points: T[]) {
  const segments: T[][] = [];
  let current: T[] = [];
  for (const point of points) {
    if (point.partial || (current.length && point.year !== current.at(-1)!.year + 1)) {
      if (current.length) segments.push(current);
      current = [];
    }
    if (!point.partial) current.push(point);
  }
  if (current.length) segments.push(current);
  return segments;
}

export function reportCsv(snapshot: AnalysisSnapshot) {
  const cell = (value: string | number) => {
    const string = String(value);
    return `"${(typeof value === "string" && /^[\s]*[=+@-]/.test(string) ? `'${string}` : string).replaceAll('"', '""')}"`;
  };
  // PAT's national row repeats the departmental totals; export only the disjoint breakdown.
  const slices = snapshot.slug === "planes-territoriales" ? snapshot.slices.slice(1) : snapshot.slices;
  const rows = [["Periodo o ámbito", "Categoría", "Valor", "Unidad", "Filas con dato", "Filas faltantes en el ámbito"], ...slices.flatMap((slice) =>
    slice.groups.map((group) => [slice.label, group.label, group.value, snapshot.unit, group.records, slice.missing])
  )];
  return "\uFEFF" + rows.map((row) => row.map(cell).join(",")).join("\r\n");
}

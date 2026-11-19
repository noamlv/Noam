import type { ReactNode } from "react";

export function PublicDataTable({ title, columns, rows }: {
  title: string;
  columns: readonly string[];
  rows: readonly { label: string; values: readonly ReactNode[] }[];
}) {
  return <div className="mt-6 overflow-x-auto rounded-xl border border-border focus-visible:ring-2 focus-visible:ring-rust" tabIndex={0} role="region" aria-label={title}>
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

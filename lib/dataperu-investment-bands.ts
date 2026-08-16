export type InvestmentBandKey = "no-accrual" | "under-25" | "25-50" | "50-75" | "75-100";

export const investmentBandDefinitions: ReadonlyArray<{
  key: InvestmentBandKey;
  label: string;
  min: number;
  max: number;
}> = [
  { key: "no-accrual", label: "Sin devengado", min: 0, max: 0.05 },
  { key: "under-25", label: "Menos de 25%", min: 0.05, max: 25 },
  { key: "25-50", label: "25%–49.9%", min: 25, max: 50 },
  { key: "50-75", label: "50%–74.9%", min: 50, max: 75 },
  { key: "75-100", label: "75%–100%", min: 75, max: 100.1 }
];

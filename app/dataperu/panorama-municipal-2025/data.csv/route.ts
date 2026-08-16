import { panoramaDepartments } from "@/lib/dataperu-panorama";

export const dynamic = "force-static";

const quote = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`;

export function GET() {
  const columns = ["department_code", "department", "municipalities", "population_2025", "pim_2025", "accrued_2025", "budget_execution_percent", "investment_pim_2025", "investment_accrued_2025", "investment_execution_percent", "pim_per_capita", "internet_percent", "updated_transparency_percent", "concerted_plan_percent", "coel_formed_percent", "reference_period"];
  const rows = panoramaDepartments.map((department) => [department.code, department.name, department.municipalities, department.population2025, department.pim, department.accrued, department.budgetExecutionPercent, department.investmentPim, department.investmentAccrued, department.investmentExecutionPercent, department.pimPerCapita, department.internetPercent, department.updatedTransparencyPercent, department.concertedPlanPercent, department.coelFormedPercent, "2025"]);
  const csv = `\uFEFF${[columns, ...rows].map((row) => row.map(quote).join(",")).join("\n")}\n`;
  return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="noam-panorama-municipal-2025-departamentos.csv"', "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800", "X-Robots-Tag": "noindex" } });
}

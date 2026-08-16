import { NextResponse } from "next/server";
import { getDepartmentInvestment, getDepartmentInvestmentProjects } from "@/lib/dataperu-investments";

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("department") ?? "";
  if (!/^\d{2}$/.test(code)) return NextResponse.json({ error: "Departamento inválido" }, { status: 400 });
  const department = getDepartmentInvestment(code);
  if (!department) return NextResponse.json({ error: "Departamento no encontrado" }, { status: 404 });

  return NextResponse.json(
    { department, projects: getDepartmentInvestmentProjects(code) },
    { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" } }
  );
}

import mapGeometry from "@/data/processed/peru-departments-map.json";
import { titleCase } from "@/lib/dataperu";
import { departmentProfiles, departmentSummary } from "@/lib/dataperu-departments";
import { departmentInvestments, investmentSummary } from "@/lib/dataperu-investments";
import type { DepartmentMapMetricKey } from "@/lib/dataperu-map-metrics";

export type DepartmentMapDatum = {
  code: string;
  name: string;
  capital: string;
  path: string;
  municipalities: number;
  population2025: number;
  pim: number;
  pimPerCapita: number;
  investmentExecutionPercent: number;
  updatedTransparencyPercent: number;
  visiblePim: number;
  visibleCoveragePercent: number;
  visibleProjects: number;
};

const geometryByCode = new Map(mapGeometry.departments.map((department) => [department.code, department]));
const investmentByCode = new Map(departmentInvestments.map((department) => [department.code, department]));

export const departmentMapData: DepartmentMapDatum[] = departmentProfiles.map((profile) => {
  const geometry = geometryByCode.get(profile.code);
  const investment = investmentByCode.get(profile.code);
  if (!geometry || !investment) throw new Error(`Falta geometría o inversión departamental para ${profile.code}`);
  return {
    code: profile.code,
    name: titleCase(profile.name),
    capital: titleCase(geometry.capital),
    path: geometry.path,
    municipalities: profile.municipalities,
    population2025: profile.population2025,
    pim: profile.pim,
    pimPerCapita: profile.pimPerCapita,
    investmentExecutionPercent: profile.investmentExecutionPercent,
    updatedTransparencyPercent: profile.updatedTransparencyPercent,
    visiblePim: investment.visiblePim,
    visibleCoveragePercent: investment.coveragePercent,
    visibleProjects: investment.projects
  };
});

export const departmentMapViewBox = mapGeometry.viewBox;
export const departmentMapSource = mapGeometry.source;

export const departmentMapNationalReferences: Partial<Record<DepartmentMapMetricKey, number>> = {
  investmentExecutionPercent: departmentSummary.investmentExecutionPercent,
  pimPerCapita: departmentSummary.pimPerCapita,
  updatedTransparencyPercent: departmentSummary.updatedTransparencyPercent,
  visibleCoveragePercent: investmentSummary.coveragePercent
};

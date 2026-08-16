import {
  dataperuSummary,
  getMunicipalityProjects,
  municipalities,
  sentenceCase,
  titleCase
} from "@/lib/dataperu";
import { departmentProfiles } from "@/lib/dataperu-departments";
import { investmentBandDefinitions, type InvestmentBandKey } from "@/lib/dataperu-investment-bands";

export type { InvestmentBandKey } from "@/lib/dataperu-investment-bands";

export type InvestmentProject = {
  id: string;
  code: string;
  name: string;
  function: string;
  ubigeo: string;
  municipality: string;
  province: string;
  departmentCode: string;
  department: string;
  municipalityType: "Provincial" | "Distrital";
  pim: number;
  accrued: number;
  executionPercent: number;
  band: InvestmentBandKey;
};

export type InvestmentBreakdown = {
  label: string;
  projects: number;
  pim: number;
  accrued: number;
  executionPercent: number;
  shareOfPimPercent: number;
};

export type DepartmentInvestment = {
  code: string;
  name: string;
  projects: number;
  municipalities: number;
  visiblePim: number;
  visibleAccrued: number;
  visibleExecutionPercent: number;
  totalInvestmentPim: number;
  coveragePercent: number;
  topTenSharePercent: number;
  noAccrualProjects: number;
  under25Projects: number;
  functions: InvestmentBreakdown[];
};

export type ExecutionBand = {
  key: InvestmentBandKey;
  label: string;
  projects: number;
  pim: number;
  projectSharePercent: number;
  pimSharePercent: number;
};

const round1 = (value: number) => Math.round(value * 10) / 10;
const weightedExecution = (pim: number, accrued: number) => pim > 0 ? round1((accrued / pim) * 100) : 0;

function bandFor(executionPercent: number): InvestmentBandKey {
  return investmentBandDefinitions.find((band) => executionPercent >= band.min && executionPercent < band.max)?.key ?? "75-100";
}

export const investmentProjects: InvestmentProject[] = municipalities.flatMap((municipality) =>
  getMunicipalityProjects(municipality.ubigeo).map((project) => ({
    id: `${municipality.ubigeo}-${project.code}`,
    code: project.code,
    name: sentenceCase(project.name),
    function: titleCase(project.function),
    ubigeo: municipality.ubigeo,
    municipality: titleCase(municipality.district),
    province: titleCase(municipality.province),
    departmentCode: municipality.ubigeo.slice(0, 2),
    department: titleCase(municipality.department),
    municipalityType: municipality.municipalityType,
    pim: project.pim,
    accrued: project.accrued,
    executionPercent: project.executionPercent ?? 0,
    band: bandFor(project.executionPercent ?? 0)
  }))
);

function buildBreakdown(projects: InvestmentProject[]): InvestmentBreakdown[] {
  const groups = Object.groupBy(projects, (project) => project.function);
  const totalPim = projects.reduce((sum, project) => sum + project.pim, 0);
  return Object.entries(groups).flatMap(([label, items]) => {
    if (!items) return [];
    const pim = items.reduce((sum, project) => sum + project.pim, 0);
    const accrued = items.reduce((sum, project) => sum + project.accrued, 0);
    return [{ label, projects: items.length, pim, accrued, executionPercent: weightedExecution(pim, accrued), shareOfPimPercent: totalPim > 0 ? round1((pim / totalPim) * 100) : 0 }];
  }).sort((left, right) => right.pim - left.pim);
}

export const departmentInvestments: DepartmentInvestment[] = departmentProfiles.map((department) => {
  const projects = investmentProjects.filter((project) => project.departmentCode === department.code);
  const visiblePim = projects.reduce((sum, project) => sum + project.pim, 0);
  const visibleAccrued = projects.reduce((sum, project) => sum + project.accrued, 0);
  const topTenPim = [...projects].sort((left, right) => right.pim - left.pim).slice(0, 10).reduce((sum, project) => sum + project.pim, 0);
  return {
    code: department.code,
    name: titleCase(department.name),
    projects: projects.length,
    municipalities: new Set(projects.map((project) => project.ubigeo)).size,
    visiblePim,
    visibleAccrued,
    visibleExecutionPercent: weightedExecution(visiblePim, visibleAccrued),
    totalInvestmentPim: department.investmentPim,
    coveragePercent: department.investmentPim > 0 ? round1((visiblePim / department.investmentPim) * 100) : 0,
    topTenSharePercent: visiblePim > 0 ? round1((topTenPim / visiblePim) * 100) : 0,
    noAccrualProjects: projects.filter((project) => project.band === "no-accrual").length,
    under25Projects: projects.filter((project) => project.band === "under-25").length,
    functions: buildBreakdown(projects)
  };
}).sort((left, right) => left.name.localeCompare(right.name, "es-PE"));

const visiblePim = investmentProjects.reduce((sum, project) => sum + project.pim, 0);
const visibleAccrued = investmentProjects.reduce((sum, project) => sum + project.accrued, 0);

export const investmentExecutionBands: ExecutionBand[] = investmentBandDefinitions.map((definition) => {
  const projects = investmentProjects.filter((project) => project.band === definition.key);
  const pim = projects.reduce((sum, project) => sum + project.pim, 0);
  return {
    key: definition.key,
    label: definition.label,
    projects: projects.length,
    pim,
    projectSharePercent: round1((projects.length / investmentProjects.length) * 100),
    pimSharePercent: visiblePim > 0 ? round1((pim / visiblePim) * 100) : 0
  };
});

export const investmentFunctions = buildBreakdown(investmentProjects);

export const investmentSummary = {
  projects: investmentProjects.length,
  municipalities: new Set(investmentProjects.map((project) => project.ubigeo)).size,
  departments: departmentInvestments.length,
  functions: investmentFunctions.length,
  visiblePim,
  visibleAccrued,
  visibleExecutionPercent: weightedExecution(visiblePim, visibleAccrued),
  totalInvestmentPim: dataperuSummary.totalInvestmentPim,
  coveragePercent: round1((visiblePim / dataperuSummary.totalInvestmentPim) * 100),
  noAccrualProjects: investmentProjects.filter((project) => project.band === "no-accrual").length
};

export const topNationalInvestmentProjects = [...investmentProjects].sort((left, right) => right.pim - left.pim).slice(0, 60);

export function getDepartmentInvestment(code: string) {
  return departmentInvestments.find((department) => department.code === code);
}

export function getDepartmentInvestmentProjects(code: string) {
  return investmentProjects.filter((project) => project.departmentCode === code);
}

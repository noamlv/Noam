import { dataperuSummary, getMunicipalityContext, municipalities } from "@/lib/dataperu";

export type DepartmentProfile = {
  code: string;
  name: string;
  municipalities: number;
  provincialMunicipalities: number;
  districtMunicipalities: number;
  population2025: number;
  pim: number;
  accrued: number;
  budgetExecutionPercent: number;
  investmentPim: number;
  investmentAccrued: number;
  investmentExecutionPercent: number;
  pimPerCapita: number;
  internetPercent: number;
  updatedTransparencyPercent: number;
  concertedPlanPercent: number;
  coelFormedPercent: number;
};

export type DepartmentSummary = Omit<DepartmentProfile, "code" | "name">;

export type DepartmentSignal = {
  label: string;
  title: string;
  observation: string;
  question: string;
};

type MutableDepartment = DepartmentProfile & {
  internetKnown: number;
  internetYes: number;
  transparencyKnown: number;
  transparencyUpdated: number;
  concertedPlanKnown: number;
  concertedPlanYes: number;
  coelKnown: number;
  coelFormed: number;
};

const round1 = (value: number) => Math.round(value * 10) / 10;
const safeRate = (yes: number, known: number) => known > 0 ? round1((yes / known) * 100) : 0;

const departments = new Map<string, MutableDepartment>();

for (const municipality of municipalities) {
  const context = getMunicipalityContext(municipality.ubigeo);
  if (!context) throw new Error(`Falta contexto DataPerú para ${municipality.ubigeo}`);

  const current = departments.get(municipality.department) ?? {
    code: municipality.ubigeo.slice(0, 2),
    name: municipality.department,
    municipalities: 0,
    provincialMunicipalities: 0,
    districtMunicipalities: 0,
    population2025: 0,
    pim: 0,
    accrued: 0,
    budgetExecutionPercent: 0,
    investmentPim: 0,
    investmentAccrued: 0,
    investmentExecutionPercent: 0,
    pimPerCapita: 0,
    internetPercent: 0,
    updatedTransparencyPercent: 0,
    concertedPlanPercent: 0,
    coelFormedPercent: 0,
    internetKnown: 0,
    internetYes: 0,
    transparencyKnown: 0,
    transparencyUpdated: 0,
    concertedPlanKnown: 0,
    concertedPlanYes: 0,
    coelKnown: 0,
    coelFormed: 0
  };

  current.municipalities += 1;
  current.provincialMunicipalities += municipality.municipalityType === "Provincial" ? 1 : 0;
  current.districtMunicipalities += municipality.municipalityType === "Distrital" ? 1 : 0;
  current.population2025 += context.population.projected2025;
  current.pim += context.budget.pim;
  current.accrued += context.budget.accrued;
  current.investmentPim += context.investment.pim;
  current.investmentAccrued += context.investment.accrued;

  if (municipality.digital.hasInternet !== null) {
    current.internetKnown += 1;
    current.internetYes += municipality.digital.hasInternet ? 1 : 0;
  }
  if (municipality.digital.transparencyPortal) {
    current.transparencyKnown += 1;
    current.transparencyUpdated += municipality.digital.transparencyPortal === "Actualizado" ? 1 : 0;
  }
  if (municipality.management.concertedDevelopmentPlan !== null) {
    current.concertedPlanKnown += 1;
    current.concertedPlanYes += municipality.management.concertedDevelopmentPlan ? 1 : 0;
  }
  if (municipality.operations.coelStatus) {
    current.coelKnown += 1;
    current.coelFormed += municipality.operations.coelStatus === "No conformado" ? 0 : 1;
  }

  departments.set(municipality.department, current);
}

export const departmentProfiles: DepartmentProfile[] = [...departments.values()]
  .map((department) => ({
    code: department.code,
    name: department.name,
    municipalities: department.municipalities,
    provincialMunicipalities: department.provincialMunicipalities,
    districtMunicipalities: department.districtMunicipalities,
    population2025: department.population2025,
    pim: department.pim,
    accrued: department.accrued,
    budgetExecutionPercent: department.pim > 0 ? round1((department.accrued / department.pim) * 100) : 0,
    investmentPim: department.investmentPim,
    investmentAccrued: department.investmentAccrued,
    investmentExecutionPercent: department.investmentPim > 0 ? round1((department.investmentAccrued / department.investmentPim) * 100) : 0,
    pimPerCapita: department.population2025 > 0 ? Math.round(department.pim / department.population2025) : 0,
    internetPercent: safeRate(department.internetYes, department.internetKnown),
    updatedTransparencyPercent: safeRate(department.transparencyUpdated, department.transparencyKnown),
    concertedPlanPercent: safeRate(department.concertedPlanYes, department.concertedPlanKnown),
    coelFormedPercent: safeRate(department.coelFormed, department.coelKnown)
  }))
  .sort((left, right) => left.name.localeCompare(right.name, "es-PE"));

const totalInternetKnown = [...departments.values()].reduce((sum, item) => sum + item.internetKnown, 0);
const totalInternetYes = [...departments.values()].reduce((sum, item) => sum + item.internetYes, 0);
const totalTransparencyKnown = [...departments.values()].reduce((sum, item) => sum + item.transparencyKnown, 0);
const totalTransparencyUpdated = [...departments.values()].reduce((sum, item) => sum + item.transparencyUpdated, 0);
const totalConcertedKnown = [...departments.values()].reduce((sum, item) => sum + item.concertedPlanKnown, 0);
const totalConcertedYes = [...departments.values()].reduce((sum, item) => sum + item.concertedPlanYes, 0);
const totalCoelKnown = [...departments.values()].reduce((sum, item) => sum + item.coelKnown, 0);
const totalCoelFormed = [...departments.values()].reduce((sum, item) => sum + item.coelFormed, 0);

export const departmentSummary: DepartmentSummary = {
  municipalities: dataperuSummary.municipalities,
  provincialMunicipalities: departmentProfiles.reduce((sum, item) => sum + item.provincialMunicipalities, 0),
  districtMunicipalities: departmentProfiles.reduce((sum, item) => sum + item.districtMunicipalities, 0),
  population2025: dataperuSummary.projectedPopulation2025,
  pim: dataperuSummary.totalPim,
  accrued: dataperuSummary.totalAccrued,
  budgetExecutionPercent: dataperuSummary.totalExecutionPercent,
  investmentPim: dataperuSummary.totalInvestmentPim,
  investmentAccrued: dataperuSummary.totalInvestmentAccrued,
  investmentExecutionPercent: dataperuSummary.totalInvestmentExecutionPercent,
  pimPerCapita: Math.round(dataperuSummary.totalPim / dataperuSummary.projectedPopulation2025),
  internetPercent: safeRate(totalInternetYes, totalInternetKnown),
  updatedTransparencyPercent: safeRate(totalTransparencyUpdated, totalTransparencyKnown),
  concertedPlanPercent: safeRate(totalConcertedYes, totalConcertedKnown),
  coelFormedPercent: safeRate(totalCoelFormed, totalCoelKnown)
};

export function getDepartmentProfile(code: string) {
  return departmentProfiles.find((department) => department.code === code);
}

const percentage = (value: number) => `${new Intl.NumberFormat("es-PE", { maximumFractionDigits: 1 }).format(value)}%`;
const signedPoints = (value: number) => `${value > 0 ? "+" : ""}${new Intl.NumberFormat("es-PE", { maximumFractionDigits: 1 }).format(value)} p.p.`;
const soles = (value: number) => new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", maximumFractionDigits: 0 }).format(value);

export function getDepartmentSignals(profile: DepartmentProfile): DepartmentSignal[] {
  const investmentGap = round1(profile.investmentExecutionPercent - departmentSummary.investmentExecutionPercent);
  const resourcesGap = profile.pimPerCapita - departmentSummary.pimPerCapita;
  const transparencyGap = round1(profile.updatedTransparencyPercent - departmentSummary.updatedTransparencyPercent);
  const planningGap = round1(profile.concertedPlanPercent - departmentSummary.concertedPlanPercent);

  return [
    {
      label: "Inversión",
      title: "Ejecución de la cartera municipal",
      observation: `La ejecución agregada de inversión fue ${percentage(profile.investmentExecutionPercent)}, una diferencia de ${signedPoints(investmentGap)} frente al agregado nacional.`,
      question: "¿Qué proyectos, hitos contractuales o restricciones concentran la diferencia observada?"
    },
    {
      label: "Recursos",
      title: "Escala presupuestal por habitante",
      observation: `El PIM municipal agregado equivale a ${soles(profile.pimPerCapita)} por habitante; el referente nacional es ${soles(departmentSummary.pimPerCapita)}.`,
      question: `¿Cómo influyen dispersión, funciones, canon, transferencias y demanda de servicios en esta brecha de ${soles(Math.abs(resourcesGap))}?`
    },
    {
      label: "Transparencia",
      title: "Actualización declarada del portal",
      observation: `${percentage(profile.updatedTransparencyPercent)} de municipalidades declaró tener actualizado su portal, ${signedPoints(transparencyGap)} respecto del agregado nacional.`,
      question: "¿Qué entidades, contenidos y rutinas de actualización requieren soporte o verificación?"
    },
    {
      label: "Planeamiento",
      title: "Instrumento concertado declarado",
      observation: `${percentage(profile.concertedPlanPercent)} declaró contar con plan de desarrollo concertado, ${signedPoints(planningGap)} respecto del agregado nacional.`,
      question: "¿Los instrumentos vigentes conectan prioridades, presupuesto, indicadores y seguimiento territorial?"
    }
  ];
}

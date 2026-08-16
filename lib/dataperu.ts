import renamu from "@/data/processed/renamu-2025-municipalities.json";
import context from "@/data/processed/dataperu-context-2025.json";
import projectPortfolio from "@/data/processed/mef-2025-municipal-projects.json";

export type MunicipalityType = "Provincial" | "Distrital";

export type MunicipalityProfile = {
  ubigeo: string;
  department: string;
  province: string;
  district: string;
  municipalityType: MunicipalityType;
  digital: {
    operationalComputers: number | null;
    hasInternet: boolean | null;
    computersWithInternet: number | null;
    internetCoveragePercent: number | null;
    hasReportedWebsite: boolean;
    transparencyPortal: string;
  };
  workforce: {
    staffMarch2025: number | null;
    serviceContractorsMarch2025: number | null;
    reportedWorkforceTotal: number | null;
  };
  management: {
    concertedDevelopmentPlan: boolean | null;
    institutionalStrategicPlan: boolean | null;
    localEconomicDevelopmentPlan: boolean | null;
    organizationFunctionsRegulation: boolean | null;
    organizationFunctionsManual: boolean | null;
    personnelAssignmentTable: boolean | null;
  };
  operations: {
    providesSerenazgo: boolean | null;
    serenazgoPersonnel: number | null;
    coelStatus: string;
    coelOperation: string | null;
    hasHumanitarianWarehouse: boolean | null;
  };
};

type MunicipalityBenchmark = {
  municipalities: number;
  medianOperationalComputers: number | null;
  medianReportedWorkforce: number | null;
  medianSerenazgoPersonnel: number | null;
};

export type MunicipalityContext = {
  ubigeo: string;
  population: {
    projected2018: number | null;
    projected2025: number;
    projected2026: number;
    change2018To2025Percent: number | null;
  };
  budget: {
    pia: number;
    pim: number;
    accrued: number;
    executionPercent: number | null;
    pimPerCapita: number | null;
    accruedPerCapita: number | null;
  };
  investment: {
    pim: number;
    accrued: number;
    executionPercent: number | null;
    projectsWithBudget: number;
  };
};

type ContextBenchmark = {
  municipalities: number;
  medianPopulation2025: number;
  medianPopulationChangePercent: number;
  medianPim: number;
  medianBudgetExecutionPercent: number;
  medianPimPerCapita: number;
  medianInvestmentExecutionPercent: number;
};

type ContextData = {
  sources: {
    population: { name: string; publisher: string; publicationDate: string; referenceDate: string; pageUrl: string; notes: string };
    budget: { name: string; publisher: string; referencePeriod: string; resourceId: string; pageUrl: string; datasetUrl: string; notes: string };
  };
  summary: {
    municipalities: number;
    populationDistrictsInSource: number;
    localEntitiesInBudgetSource: number;
    projectedPopulation2025: number;
    totalPim: number;
    totalAccrued: number;
    totalExecutionPercent: number;
    totalInvestmentPim: number;
    totalInvestmentAccrued: number;
    totalInvestmentExecutionPercent: number;
    byType: Record<MunicipalityType, ContextBenchmark>;
  };
  municipalities: MunicipalityContext[];
};

export type MunicipalityProject = {
  ubigeo: string;
  code: string;
  name: string;
  function: string;
  pim: number;
  accrued: number;
  executionPercent: number | null;
  order: number;
};

type ProjectPortfolioData = {
  source: {
    name: string;
    publisher: string;
    resourceId: string;
    referencePeriod: string;
    datasetUrl: string;
    resourceUrl: string;
    notes: string;
  };
  summary: {
    departments: number;
    municipalitiesWithProjects: number;
    expectedWithProjects: number;
    projects: number;
  };
  municipalities: Record<string, MunicipalityProject[]>;
};

export type MunicipalitySignal = {
  id: string;
  label: string;
  title: string;
  observation: string;
  question: string;
  serviceHref: string;
  serviceLabel: string;
  priority: number;
};

type RenamuData = {
  source: {
    name: string;
    publisher: string;
    releaseDate: string;
    referencePeriod: string;
    license: string;
    datasetUrl: string;
    technicalSheetUrl: string;
    notes: string;
  };
  summary: {
    municipalities: number;
    departments: number;
    internetServicePercent: number;
    updatedTransparencyPercent: number;
    concertedPlanPercent: number;
    coelFormedPercent: number;
    serenazgoPercent: number;
    humanitarianWarehousePercent: number;
    byType: Record<MunicipalityType, MunicipalityBenchmark>;
  };
  municipalities: MunicipalityProfile[];
};

const data = renamu as RenamuData;
const contextData = context as ContextData;
const projectsData = projectPortfolio as ProjectPortfolioData;
const contextByUbigeo = new Map(contextData.municipalities.map((item) => [item.ubigeo, item]));

export const renamuSource = data.source;
export const renamuSummary = data.summary;
export const municipalities = data.municipalities;
export const dataperuSources = contextData.sources;
export const dataperuSummary = contextData.summary;
export const projectSource = projectsData.source;
export const projectSummary = projectsData.summary;

export function getMunicipality(ubigeo: string) {
  return municipalities.find((item) => item.ubigeo === ubigeo);
}

export function getMunicipalityBenchmark(type: MunicipalityType) {
  return renamuSummary.byType[type];
}

export function getMunicipalityContext(ubigeo: string) {
  return contextByUbigeo.get(ubigeo);
}

export function getContextBenchmark(type: MunicipalityType) {
  return dataperuSummary.byType[type];
}

export function getMunicipalityProjects(ubigeo: string) {
  return projectsData.municipalities[ubigeo] ?? [];
}

export function getMunicipalitySignals(
  municipality: MunicipalityProfile,
  municipalityContext: MunicipalityContext,
  projects: MunicipalityProject[]
) {
  const benchmark = getContextBenchmark(municipality.municipalityType);
  const signals: MunicipalitySignal[] = [];
  const budgetGap = municipalityContext.budget.pim - municipalityContext.budget.accrued;
  const investmentGap = municipalityContext.investment.pim - municipalityContext.investment.accrued;
  const planningMissing = [
    municipality.management.concertedDevelopmentPlan,
    municipality.management.institutionalStrategicPlan,
    municipality.management.localEconomicDevelopmentPlan
  ].filter((value) => value === false).length;

  if (municipalityContext.investment.executionPercent !== null
    && municipalityContext.investment.executionPercent <= benchmark.medianInvestmentExecutionPercent - 10
    && investmentGap >= 500_000) {
    signals.push({
      id: "investment-execution",
      label: "Inversión",
      title: "Ejecución de la cartera por profundizar",
      observation: `${formatCurrency(investmentGap)} del PIM de inversión no se devengaron en 2025; la ejecución quedó en ${formatPercent(municipalityContext.investment.executionPercent)}.`,
      question: "¿Qué proyectos, hitos o restricciones explican la brecha entre programación y ejecución?",
      serviceHref: "/services/estudios-diagnosticos-evaluacion",
      serviceLabel: "Diagnóstico de cartera",
      priority: 100
    });
  }

  if (municipalityContext.budget.executionPercent !== null
    && municipalityContext.budget.executionPercent <= benchmark.medianBudgetExecutionPercent - 10
    && budgetGap >= 1_000_000) {
    signals.push({
      id: "budget-execution",
      label: "Presupuesto",
      title: "Margen de ejecución presupuestal",
      observation: `${formatCurrency(budgetGap)} del PIM total no se devengaron en 2025.`,
      question: "¿En qué funciones y metas se concentra el saldo y qué decisiones permitirían destrabarlo?",
      serviceHref: "/services/observatorios-sistemas-decision",
      serviceLabel: "Sistema de seguimiento",
      priority: 90
    });
  }

  if (municipalityContext.population.change2018To2025Percent !== null
    && Math.abs(municipalityContext.population.change2018To2025Percent) >= 10) {
    const growing = municipalityContext.population.change2018To2025Percent > 0;
    signals.push({
      id: "population-change",
      label: "Territorio",
      title: growing ? "Crecimiento poblacional proyectado" : "Contracción poblacional proyectada",
      observation: `La población proyectada cambió ${formatPercent(municipalityContext.population.change2018To2025Percent)} entre 2018 y 2025.`,
      question: growing
        ? "¿Cómo cambia la demanda esperada por servicios, infraestructura y movilidad?"
        : "¿Qué efectos puede tener la tendencia sobre servicios, economía local y sostenibilidad fiscal?",
      serviceHref: "/services/estudios-diagnosticos-evaluacion",
      serviceLabel: "Diagnóstico territorial",
      priority: 75
    });
  }

  if (municipality.digital.hasInternet === false
    || (municipality.digital.internetCoveragePercent !== null && municipality.digital.internetCoveragePercent < 75)) {
    signals.push({
      id: "digital-capacity",
      label: "Capacidad digital",
      title: "Conectividad institucional por revisar",
      observation: municipality.digital.hasInternet === false
        ? "La municipalidad declaró no contar con servicio de internet."
        : `El ${formatPercent(municipality.digital.internetCoveragePercent)} de las computadoras operativas tendría acceso a internet.`,
      question: "¿Qué procesos críticos están limitados por conectividad, equipamiento o calidad de datos?",
      serviceHref: "/services/ia-transformacion-gestion",
      serviceLabel: "Diagnóstico de preparación digital",
      priority: 85
    });
  }

  if (planningMissing > 0) {
    signals.push({
      id: "planning-instruments",
      label: "Gestión",
      title: "Instrumentos de planeamiento por verificar",
      observation: `${planningMissing} de 3 instrumentos estratégicos seleccionados ${planningMissing === 1 ? "fue declarado como inexistente" : "fueron declarados como inexistentes"}.`,
      question: "¿Los instrumentos vigentes conectan prioridades territoriales, presupuesto y seguimiento?",
      serviceHref: "/services/estudios-diagnosticos-evaluacion",
      serviceLabel: "Diagnóstico institucional",
      priority: 80
    });
  }

  const topProjectsPim = projects.reduce((total, project) => total + project.pim, 0);
  if (municipalityContext.investment.pim > 0 && projects.length > 0) {
    const concentration = Math.round((topProjectsPim / municipalityContext.investment.pim) * 1000) / 10;
    signals.push({
      id: "portfolio-concentration",
      label: "Cartera",
      title: "Concentración en proyectos principales",
      observation: `Los ${projects.length} proyectos con mayor PIM reúnen ${formatPercent(concentration)} del presupuesto de inversión.`,
      question: "¿La concentración refleja prioridades explícitas y una secuencia viable de entregas?",
      serviceHref: "/services/observatorios-sistemas-decision",
      serviceLabel: "Tablero de inversiones",
      priority: 55
    });
  }

  return signals.sort((a, b) => b.priority - a.priority).slice(0, 4);
}

export function titleCase(value: string) {
  return value.toLocaleLowerCase("es-PE").replace(/(^|[\s-])\p{L}/gu, (character) => character.toLocaleUpperCase("es-PE"));
}

export function sentenceCase(value: string) {
  const normalized = value.trim().toLocaleLowerCase("es-PE");
  return normalized.replace(/^\p{L}/u, (character) => character.toLocaleUpperCase("es-PE"));
}

export function formatMetric(value: number | null) {
  return value === null ? "No informado" : new Intl.NumberFormat("es-PE").format(value);
}

export function formatCurrency(value: number | null, compact = false) {
  if (value === null) return "No informado";
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
    notation: compact ? "compact" : "standard"
  }).format(value);
}

export function formatPercent(value: number | null) {
  return value === null ? "No informado" : `${new Intl.NumberFormat("es-PE", { maximumFractionDigits: 1 }).format(value)}%`;
}

export function yesNoLabel(value: boolean | null) {
  return value === null ? "No informado" : value ? "Sí" : "No";
}

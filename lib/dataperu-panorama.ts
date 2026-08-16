import { dataperuSummary, renamuSummary } from "@/lib/dataperu";
import { departmentProfiles, departmentSummary } from "@/lib/dataperu-departments";

export const panoramaPublicationDate = "2026-07-17";

const round1 = (value: number) => Math.round(value * 10) / 10;
const median = (values: number[]) => {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.floor(sorted.length / 2)];
};

type RangeMetric = {
  key: "pimPerCapita" | "budgetExecutionPercent" | "investmentExecutionPercent" | "updatedTransparencyPercent";
  label: string;
  question: string;
  format: "currency" | "percent";
};

const rangeDefinitions: RangeMetric[] = [
  { key: "pimPerCapita", label: "PIM municipal por habitante", question: "¿Qué capacidad fiscal y de ejecución acompaña la disponibilidad de recursos?", format: "currency" },
  { key: "budgetExecutionPercent", label: "Ejecución presupuestal", question: "¿Qué funciones y procesos explican la distancia entre programación y devengado?", format: "percent" },
  { key: "investmentExecutionPercent", label: "Ejecución de inversión", question: "¿Qué proyectos, hitos y restricciones concentran la brecha de implementación?", format: "percent" },
  { key: "updatedTransparencyPercent", label: "Portales declarados actualizados", question: "¿La publicación permite supervisar decisiones y resultados con información vigente?", format: "percent" }
];

export const panoramaRanges = rangeDefinitions.map((definition) => {
  const ordered = [...departmentProfiles].sort((left, right) => left[definition.key] - right[definition.key]);
  return {
    ...definition,
    min: ordered[0][definition.key],
    minDepartment: ordered[0].name,
    median: median(ordered.map((department) => department[definition.key])),
    max: ordered.at(-1)![definition.key],
    maxDepartment: ordered.at(-1)!.name,
    national: departmentSummary[definition.key]
  };
});

const workforceProvincial = renamuSummary.byType.Provincial.medianReportedWorkforce ?? 0;
const workforceDistrict = renamuSummary.byType.Distrital.medianReportedWorkforce ?? 0;
const resourceRange = panoramaRanges.find((range) => range.key === "pimPerCapita")!;
const investmentRange = panoramaRanges.find((range) => range.key === "investmentExecutionPercent")!;

export const panoramaFindings = [
  {
    number: "01",
    label: "Escala operativa",
    value: `${round1(workforceProvincial / workforceDistrict).toLocaleString("es-PE")}×`,
    title: "La mediana provincial reporta casi nueve veces el personal de la distrital.",
    description: `${workforceProvincial.toLocaleString("es-PE")} personas frente a ${workforceDistrict.toLocaleString("es-PE")}. Un mismo entregable no puede exigir la misma operación a ambas escalas.`
  },
  {
    number: "02",
    label: "Recursos por habitante",
    value: `${round1(resourceRange.max / resourceRange.min).toLocaleString("es-PE")}×`,
    title: "El PIM municipal per cápita cambia siete veces entre extremos departamentales.",
    description: "La diferencia describe disponibilidad agregada, no eficiencia ni esfuerzo fiscal. Obliga a dimensionar prioridades y capacidad de entrega."
  },
  {
    number: "03",
    label: "Inversión",
    value: `${round1(investmentRange.max - investmentRange.min).toLocaleString("es-PE")} p.p.`,
    title: "La ejecución de inversión presenta una dispersión que no cabe en el promedio nacional.",
    description: "El dato abre una investigación sobre cartera, contratación, expedientes, hitos y restricciones; no identifica por sí solo la causa."
  },
  {
    number: "04",
    label: "Transparencia declarada",
    value: `${renamuSummary.updatedTransparencyPercent.toLocaleString("es-PE")} %`,
    title: "Menos de cuatro de cada diez portales fueron declarados actualizados.",
    description: "RENAMU describe una condición reportada. No evalúa calidad, oportunidad ni facilidad de uso de la información publicada."
  }
];

export const panoramaNationalMetrics = [
  { value: dataperuSummary.municipalities.toLocaleString("es-PE"), label: "municipalidades", note: "universo común RENAMU y contexto DataPerú" },
  { value: departmentProfiles.length.toLocaleString("es-PE"), label: "departamentos", note: "incluye Callao como departamento estadístico" },
  { value: `${dataperuSummary.totalExecutionPercent.toLocaleString("es-PE")} %`, label: "ejecución presupuestal", note: "devengado agregado / PIM agregado" },
  { value: `${dataperuSummary.totalInvestmentExecutionPercent.toLocaleString("es-PE")} %`, label: "ejecución de inversión", note: "devengado agregado / PIM de inversión" }
];

export const panoramaTypeComparison = {
  provincial: {
    label: "Municipalidad provincial",
    municipalities: dataperuSummary.byType.Provincial.municipalities,
    population: dataperuSummary.byType.Provincial.medianPopulation2025,
    pim: dataperuSummary.byType.Provincial.medianPim,
    pimPerCapita: dataperuSummary.byType.Provincial.medianPimPerCapita,
    budgetExecution: dataperuSummary.byType.Provincial.medianBudgetExecutionPercent,
    investmentExecution: dataperuSummary.byType.Provincial.medianInvestmentExecutionPercent,
    workforce: renamuSummary.byType.Provincial.medianReportedWorkforce,
    computers: renamuSummary.byType.Provincial.medianOperationalComputers
  },
  district: {
    label: "Municipalidad distrital",
    municipalities: dataperuSummary.byType.Distrital.municipalities,
    population: dataperuSummary.byType.Distrital.medianPopulation2025,
    pim: dataperuSummary.byType.Distrital.medianPim,
    pimPerCapita: dataperuSummary.byType.Distrital.medianPimPerCapita,
    budgetExecution: dataperuSummary.byType.Distrital.medianBudgetExecutionPercent,
    investmentExecution: dataperuSummary.byType.Distrital.medianInvestmentExecutionPercent,
    workforce: renamuSummary.byType.Distrital.medianReportedWorkforce,
    computers: renamuSummary.byType.Distrital.medianOperationalComputers
  }
};

export const panoramaDepartments = [...departmentProfiles].sort((left, right) => right.investmentExecutionPercent - left.investmentExecutionPercent);

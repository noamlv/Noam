import {
  dataperuSummary,
  getContextBenchmark,
  getMunicipalityContext,
  municipalities,
  renamuSummary,
  type MunicipalityType
} from "@/lib/dataperu";

export type RadarMunicipality = {
  ubigeo: string;
  department: string;
  province: string;
  district: string;
  municipalityType: MunicipalityType;
  population2025: number;
  pim: number;
  pimPerCapita: number | null;
  budgetExecutionPercent: number | null;
  investmentExecutionPercent: number | null;
  planningInstruments: number;
  hasInternet: boolean | null;
};

export type DistributionBand = {
  label: string;
  min: number;
  max: number;
  count: number;
  percent: number;
};

const bandDefinitions = [
  { label: "Menos de 50%", min: 0, max: 50 },
  { label: "50%–69.9%", min: 50, max: 70 },
  { label: "70%–84.9%", min: 70, max: 85 },
  { label: "85%–94.9%", min: 85, max: 95 },
  { label: "95%–100%", min: 95, max: 100.1 }
] as const;

function round(value: number, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export const radarMunicipalities: RadarMunicipality[] = municipalities.flatMap((municipality) => {
  const context = getMunicipalityContext(municipality.ubigeo);
  if (!context) return [];
  const planningInstruments = [
    municipality.management.concertedDevelopmentPlan,
    municipality.management.institutionalStrategicPlan,
    municipality.management.localEconomicDevelopmentPlan
  ].filter((value) => value === true).length;

  return [{
    ubigeo: municipality.ubigeo,
    department: municipality.department,
    province: municipality.province,
    district: municipality.district,
    municipalityType: municipality.municipalityType,
    population2025: context.population.projected2025,
    pim: context.budget.pim,
    pimPerCapita: context.budget.pimPerCapita,
    budgetExecutionPercent: context.budget.executionPercent,
    investmentExecutionPercent: context.investment.executionPercent,
    planningInstruments,
    hasInternet: municipality.digital.hasInternet
  }];
});

function buildDistribution(values: Array<number | null>): { bands: DistributionBand[]; known: number; unknown: number } {
  const knownValues = values.filter((value): value is number => value !== null && Number.isFinite(value));
  const bands = bandDefinitions.map((band) => {
    const count = knownValues.filter((value) => value >= band.min && value < band.max).length;
    return { ...band, count, percent: knownValues.length > 0 ? round((count / knownValues.length) * 100) : 0 };
  });
  return { bands, known: knownValues.length, unknown: values.length - knownValues.length };
}

export const radarDistributions = {
  budgetExecution: buildDistribution(radarMunicipalities.map((item) => item.budgetExecutionPercent)),
  investmentExecution: buildDistribution(radarMunicipalities.map((item) => item.investmentExecutionPercent))
};

export const radarSummary = {
  municipalities: radarMunicipalities.length,
  departments: renamuSummary.departments,
  totalPim: dataperuSummary.totalPim,
  totalExecutionPercent: dataperuSummary.totalExecutionPercent,
  totalInvestmentPim: dataperuSummary.totalInvestmentPim,
  totalInvestmentExecutionPercent: dataperuSummary.totalInvestmentExecutionPercent,
  peerMedians: (["Provincial", "Distrital"] as MunicipalityType[]).map((type) => {
    const benchmark = getContextBenchmark(type);
    return {
      type,
      municipalities: benchmark.municipalities,
      population2025: benchmark.medianPopulation2025,
      pim: benchmark.medianPim,
      pimPerCapita: benchmark.medianPimPerCapita,
      budgetExecutionPercent: benchmark.medianBudgetExecutionPercent,
      investmentExecutionPercent: benchmark.medianInvestmentExecutionPercent
    };
  }),
  declaredCapacity: [
    { label: "Servicio de internet", value: renamuSummary.internetServicePercent, note: "declaró contar con el servicio" },
    { label: "Portal de transparencia actualizado", value: renamuSummary.updatedTransparencyPercent, note: "respuesta declarada en RENAMU" },
    { label: "Plan de desarrollo concertado", value: renamuSummary.concertedPlanPercent, note: "declaró contar con el instrumento" },
    { label: "COEL conformado", value: renamuSummary.coelFormedPercent, note: "centro local reportado" },
    { label: "Servicio de serenazgo", value: renamuSummary.serenazgoPercent, note: "municipalidades que lo brindan" },
    { label: "Almacén de ayuda humanitaria", value: renamuSummary.humanitarianWarehousePercent, note: "infraestructura declarada" }
  ]
};

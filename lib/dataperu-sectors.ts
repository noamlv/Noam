import sectorDataJson from "@/data/processed/renamu-2025-sectors.json";
import { formatMetric, formatPercent, titleCase, yesNoLabel } from "@/lib/dataperu";

export const sectorSlugs = [
  "residuos",
  "seguridad-ciudadana",
  "gestion-del-riesgo",
  "desarrollo-economico",
  "gestion-ambiental"
] as const;

export type SectorSlug = (typeof sectorSlugs)[number];

type Rate = { value: number; denominator: number };

type WasteData = {
  collectionFrequency: string | null;
  dailyCollectedKg: number | null;
  collectionCoverage: string | null;
  hasManagementPlan: boolean | null;
  hasSelectiveCollectionProgram: boolean | null;
  reportsNoManagementInstrument: boolean | null;
  usesLandfill: boolean | null;
  landfillPercent: number | null;
  usesDumpsite: boolean | null;
  dumpsitePercent: number | null;
  recycledPercent: number | null;
  burnedPercent: number | null;
  compostedPercent: number | null;
};

type SecurityData = {
  providesSerenazgo: boolean | null;
  serenazgoPersonnel: number | null;
  committeeSessions: number | null;
  jointOperations: number | null;
  preparedRiskMap: boolean | null;
  hasRatifiedPlan: boolean | null;
  hasCrimeMap: boolean | null;
  hasRiskMap: boolean | null;
  hasIntegratedPatrolPlan: boolean | null;
};

type RiskData = {
  coelStatus: string | null;
  coelOperation: string | null;
  hasHumanitarianWarehouse: boolean | null;
  hasRiskManagementOffice: boolean | null;
  drills: number | null;
  identifiedRiskAreas: boolean | null;
};

type DevelopmentData = {
  licensesGranted: number | null;
  supportActions: number | null;
  heldFairs: boolean | null;
  offeredTraining: boolean | null;
  simplifiedLicensing: boolean | null;
  reportsNoSupportActions: boolean | null;
};

type EnvironmentData = {
  hasEnvironmentalOffice: boolean | null;
  reportedPollutionSources: number | null;
  managementInstruments: number | null;
  hasLocalEnvironmentalPolicy: boolean | null;
  hasLocalEnvironmentalDiagnosis: boolean | null;
  hasLocalEnvironmentalActionPlan: boolean | null;
  reportsNoManagementInstrument: boolean | null;
};

export type SectorMunicipality = {
  ubigeo: string;
  department: string;
  province: string;
  district: string;
  municipalityType: "Provincial" | "Distrital";
  waste: WasteData;
  security: SecurityData;
  risk: RiskData;
  development: DevelopmentData;
  environment: EnvironmentData;
};

type SectorData = {
  source: {
    name: string;
    publisher: string;
    releaseDate: string;
    referencePeriod: string;
    datasetUrl: string;
    notes: string;
  };
  summary: {
    waste: {
      frequentCollection: Rate;
      coverage75Plus: Rate;
      reportsDumpsiteUse: Rate;
      selectiveCollectionProgram: Rate;
    };
    security: {
      serenazgo: Rate;
      ratifiedPlan: Rate;
      crimeMap: Rate;
      integratedPatrolPlan: Rate;
    };
    risk: {
      managementOffice: Rate;
      formedCoel: Rate;
      identifiedRiskAreas: Rate;
      humanitarianWarehouse: Rate;
    };
    development: {
      grantedLicenses: number;
      municipalitiesWithLicenses: number;
      offeredTraining: Rate;
      simplifiedLicensing: Rate;
    };
    environment: {
      environmentalOffice: Rate;
      localPolicy: Rate;
      localDiagnosis: Rate;
      localActionPlan: Rate;
    };
  };
  municipalities: SectorMunicipality[];
};

export type SectorMetric = {
  label: string;
  value: string;
  note?: string;
};

export type SectorTopic = {
  slug: SectorSlug;
  kicker: string;
  title: string;
  shortTitle: string;
  description: string;
  question: string;
  decisionQuestions: string[];
  serviceHref: string;
  serviceLabel: string;
  accent: string;
};

const data = sectorDataJson as SectorData;

export const sectorSource = data.source;
export const sectorSummary = data.summary;
export const sectorMunicipalities = data.municipalities;

export const sectorTopics: SectorTopic[] = [
  {
    slug: "residuos",
    kicker: "Servicios públicos locales",
    title: "Residuos sólidos",
    shortTitle: "Residuos",
    description: "Frecuencia y cobertura declaradas de recolección, instrumentos de gestión y destino reportado de los residuos.",
    question: "¿Dónde están los vacíos entre cobertura, operación e instrumentos de gestión?",
    decisionQuestions: [
      "¿Qué zonas, rutas o frecuencias requieren una medición operativa más precisa?",
      "¿El destino declarado de los residuos es consistente con la infraestructura disponible?",
      "¿Qué decisiones permitirían pasar de recolección a valorización y disposición adecuada?"
    ],
    serviceHref: "/analisis-datos-residuos-limpieza-publica",
    serviceLabel: "Explorar soluciones para residuos",
    accent: "#b95337"
  },
  {
    slug: "seguridad-ciudadana",
    kicker: "Gobernanza y prevención",
    title: "Seguridad ciudadana",
    shortTitle: "Seguridad",
    description: "Serenazgo, instrumentos de prevención, mapas declarados y coordinación operativa de los gobiernos locales.",
    question: "¿La capacidad declarada se traduce en una operación territorial coordinada?",
    decisionQuestions: [
      "¿Los mapas y planes se actualizan con incidentes y patrones territoriales recientes?",
      "¿Cómo se distribuyen personal, patrullaje y acciones conjuntas en el territorio?",
      "¿Qué indicadores permitirían evaluar prevención y respuesta sin confundir actividad con resultado?"
    ],
    serviceHref: "/analisis-datos-seguridad-ciudadana",
    serviceLabel: "Explorar soluciones para seguridad",
    accent: "#2f5c52"
  },
  {
    slug: "gestion-del-riesgo",
    kicker: "Preparación territorial",
    title: "Gestión del riesgo",
    shortTitle: "Riesgos",
    description: "Organización institucional, COEL, almacenes, simulacros e identificación declarada de zonas de riesgo.",
    question: "¿La organización existente está preparada para anticipar, responder y aprender?",
    decisionQuestions: [
      "¿Las zonas de riesgo identificadas orientan inversión, mantenimiento y protocolos?",
      "¿El COEL cuenta con datos, responsables y continuidad operativa suficiente?",
      "¿Qué brechas existen entre documentos, equipamiento y capacidad efectiva de respuesta?"
    ],
    serviceHref: "/analisis-datos-gestion-riesgo-desastres",
    serviceLabel: "Explorar soluciones para gestión del riesgo",
    accent: "#8a623d"
  },
  {
    slug: "desarrollo-economico",
    kicker: "Economía local",
    title: "Desarrollo económico local",
    shortTitle: "Desarrollo económico",
    description: "Licencias emitidas y acciones municipales declaradas para capacitación, ferias y simplificación de trámites.",
    question: "¿La gestión municipal reduce fricciones y conecta oportunidades con empresas y empleo?",
    decisionQuestions: [
      "¿Qué sectores y unidades productivas concentran las oportunidades del territorio?",
      "¿Dónde están las fricciones para formalizar, invertir, contratar o acceder a mercados?",
      "¿Qué cartera de acciones puede generar resultados verificables en el corto plazo?"
    ],
    serviceHref: "/analisis-datos-desarrollo-economico-local",
    serviceLabel: "Explorar soluciones para desarrollo económico",
    accent: "#a17a24"
  },
  {
    slug: "gestion-ambiental",
    kicker: "Sostenibilidad local",
    title: "Gestión ambiental",
    shortTitle: "Ambiente",
    description: "Organización ambiental, fuentes de contaminación e instrumentos locales declarados por las municipalidades.",
    question: "¿La institucionalidad ambiental existente permite priorizar y seguir problemas concretos?",
    decisionQuestions: [
      "¿Cuáles son las presiones ambientales más relevantes y quién puede actuar sobre ellas?",
      "¿Los instrumentos locales forman una secuencia coherente entre diagnóstico, política y acción?",
      "¿Qué indicadores y evidencia necesita la gestión para orientar inversión y fiscalización?"
    ],
    serviceHref: "/services/observatorios-sistemas-decision",
    serviceLabel: "Diseñar seguimiento ambiental",
    accent: "#62724d"
  }
];

const rateMetric = (label: string, rate: Rate, note: string): SectorMetric => ({
  label,
  value: formatPercent(rate.value),
  note: `${note} · ${formatMetric(rate.denominator)} municipalidades informaron`
});

export function getSectorTopic(slug: string) {
  return sectorTopics.find((topic) => topic.slug === slug);
}

export function getSectorMunicipality(ubigeo: string) {
  return sectorMunicipalities.find((municipality) => municipality.ubigeo === ubigeo);
}

export function getNationalSectorMetrics(slug: SectorSlug): SectorMetric[] {
  switch (slug) {
    case "residuos":
      return [
        rateMetric("Recolección frecuente", sectorSummary.waste.frequentCollection, "Declara frecuencia diaria o interdiaria"),
        rateMetric("Cobertura de 75% a 100%", sectorSummary.waste.coverage75Plus, "Reporta ese rango de cobertura"),
        rateMetric("Uso de botadero", sectorSummary.waste.reportsDumpsiteUse, "Declara usar botadero como destino"),
        rateMetric("Recolección selectiva", sectorSummary.waste.selectiveCollectionProgram, "Reporta un programa municipal")
      ];
    case "seguridad-ciudadana":
      return [
        rateMetric("Servicio de serenazgo", sectorSummary.security.serenazgo, "Declara prestar el servicio"),
        rateMetric("Plan ratificado", sectorSummary.security.ratifiedPlan, "Entre quienes informaron el instrumento"),
        rateMetric("Mapa del delito", sectorSummary.security.crimeMap, "Entre quienes informaron sobre mapas"),
        rateMetric("Patrullaje integrado", sectorSummary.security.integratedPatrolPlan, "Reporta contar con plan")
      ];
    case "gestion-del-riesgo":
      return [
        rateMetric("Oficina responsable", sectorSummary.risk.managementOffice, "Declara una unidad de gestión del riesgo"),
        rateMetric("COEL conformado", sectorSummary.risk.formedCoel, "Declara conformación dentro o fuera de la estructura"),
        rateMetric("Zonas identificadas", sectorSummary.risk.identifiedRiskAreas, "Entre quienes informaron sobre riesgos"),
        rateMetric("Almacén humanitario", sectorSummary.risk.humanitarianWarehouse, "Declara disponer de almacén")
      ];
    case "desarrollo-economico":
      return [
        { label: "Licencias emitidas", value: formatMetric(sectorSummary.development.grantedLicenses), note: "Total declarado durante 2024; no representa empresas activas" },
        { label: "Municipalidades con licencias", value: formatMetric(sectorSummary.development.municipalitiesWithLicenses), note: "Declararon al menos una licencia durante 2024" },
        rateMetric("Capacitación empresarial", sectorSummary.development.offeredTraining, "Declara haber realizado acciones"),
        rateMetric("Simplificación de licencias", sectorSummary.development.simplifiedLicensing, "Declara haber realizado acciones")
      ];
    case "gestion-ambiental":
      return [
        rateMetric("Oficina ambiental", sectorSummary.environment.environmentalOffice, "Declara una unidad responsable"),
        rateMetric("Política ambiental local", sectorSummary.environment.localPolicy, "Declara contar con el instrumento"),
        rateMetric("Diagnóstico ambiental", sectorSummary.environment.localDiagnosis, "Declara contar con el instrumento"),
        rateMetric("Plan de acción ambiental", sectorSummary.environment.localActionPlan, "Declara contar con el instrumento")
      ];
  }
}

const yesNo = (value: boolean | null) => yesNoLabel(value);
const reportedNumber = (value: number | null) => value === null ? "No informado" : formatMetric(value);

export function getMunicipalitySectorMetrics(slug: SectorSlug, municipality: SectorMunicipality): SectorMetric[] {
  switch (slug) {
    case "residuos":
      return [
        { label: "Frecuencia", value: municipality.waste.collectionFrequency ?? "No informada" },
        { label: "Cobertura", value: municipality.waste.collectionCoverage ?? "No informada" },
        { label: "Uso de botadero", value: municipality.waste.usesDumpsite === true && municipality.waste.dumpsitePercent !== null ? `Sí · ${formatPercent(municipality.waste.dumpsitePercent)}` : yesNo(municipality.waste.usesDumpsite) }
      ];
    case "seguridad-ciudadana":
      return [
        { label: "Serenazgo", value: yesNo(municipality.security.providesSerenazgo) },
        { label: "Plan ratificado", value: yesNo(municipality.security.hasRatifiedPlan) },
        { label: "Operaciones conjuntas", value: reportedNumber(municipality.security.jointOperations) }
      ];
    case "gestion-del-riesgo":
      return [
        { label: "Oficina de riesgo", value: yesNo(municipality.risk.hasRiskManagementOffice) },
        { label: "COEL", value: municipality.risk.coelStatus ?? "No informado" },
        { label: "Simulacros", value: reportedNumber(municipality.risk.drills) }
      ];
    case "desarrollo-economico":
      return [
        { label: "Licencias 2024", value: reportedNumber(municipality.development.licensesGranted) },
        { label: "Acciones de apoyo", value: reportedNumber(municipality.development.supportActions) },
        { label: "Simplificación", value: yesNo(municipality.development.simplifiedLicensing) }
      ];
    case "gestion-ambiental":
      return [
        { label: "Oficina ambiental", value: yesNo(municipality.environment.hasEnvironmentalOffice) },
        { label: "Instrumentos", value: reportedNumber(municipality.environment.managementInstruments) },
        { label: "Plan de acción", value: yesNo(municipality.environment.hasLocalEnvironmentalActionPlan) }
      ];
  }
}

export function buildSectorSearchItems(slug: SectorSlug) {
  return sectorMunicipalities
    .map((municipality) => ({
      ubigeo: municipality.ubigeo,
      department: municipality.department,
      province: municipality.province,
      district: municipality.district,
      municipalityType: municipality.municipalityType,
      metrics: getMunicipalitySectorMetrics(slug, municipality)
    }))
    .sort((a, b) => titleCase(a.district).localeCompare(titleCase(b.district), "es-PE"));
}

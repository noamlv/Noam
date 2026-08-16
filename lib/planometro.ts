import planometroSnapshot from "@/data/processed/planometro-2026.json";

export type PlanometroAxisMix = {
  key: string;
  label: string;
  proposals: number;
  sharePercent: number;
};

export type PlanometroAxis = PlanometroAxisMix & {
  averageConcreteness: number;
  quantTargetPercent: number;
  timeHorizonPercent: number;
};

export type PlanometroParty = {
  slug: string;
  name: string;
  detectedStatements: number;
  operationalProposals: number;
  operationalSharePercent: number;
  averageConcreteness: number;
  quantTargetPercent: number;
  timeHorizonPercent: number;
  costOrFundingPercent: number;
  fundingSourcePercent: number;
  axes: PlanometroAxisMix[];
  topAxes: PlanometroAxisMix[];
};

export type PlanometroData = {
  source: {
    name: string;
    externalUrl: string;
    pipeline: string;
    broadSnapshotDate: string;
    strictSnapshotDate: string;
    broadSha256: string;
    strictSha256: string;
  };
  summary: {
    plans: number;
    detectedStatements: number;
    operationalProposals: number;
    operationalSharePercent: number;
    annotatedCases: number;
    axes: number;
    averageConcreteness: number;
    quantTargetPercent: number;
    timeHorizonPercent: number;
    fundingSourcePercent: number;
  };
  validation: {
    sample: number;
    broad: { precisionPercent: number; recallPercent: number; f1Percent: number; accuracyPercent: number };
    strict: { precisionPercent: number; recallPercent: number; f1Percent: number; accuracyPercent: number };
    annotationLabel: string;
    annotationMode: string[];
    note: string;
  };
  components: Array<{ label: string; sharePercent: number }>;
  scoreBands: Array<{ label: string; minimum: number; maximum: number; proposals: number; sharePercent: number }>;
  instruments: Array<{ key: string; label: string; proposals: number; sharePercent: number }>;
  axes: PlanometroAxis[];
  parties: PlanometroParty[];
};

export const planometroData = planometroSnapshot as unknown as PlanometroData;
export const planometroSummary = planometroData.summary;
export const planometroParties = planometroData.parties;
export const planometroAxes = planometroData.axes;

export type PlanometroAxisEditorial = {
  description: string;
  questions: [string, string, string];
};

export const planometroAxisEditorial = {
  otros: {
    description: "Enunciados que el clasificador no asignó a un eje específico. Es una categoría residual útil para auditar cobertura, no un tema sustantivo homogéneo.",
    questions: ["¿Qué asuntos recurrentes quedaron fuera de la taxonomía?", "¿La redacción ambigua impide reconocer el sector o instrumento?", "¿Qué nuevas categorías mejorarían la siguiente versión del modelo?"]
  },
  institucionalidad: {
    description: "Propuestas relacionadas con reforma del Estado, integridad, descentralización, justicia, gestión pública y fortalecimiento institucional.",
    questions: ["¿Qué capacidad estatal debe cambiar para ejecutar la propuesta?", "¿Se identifica una entidad responsable y una ruta normativa?", "¿Cómo se observará una mejora institucional verificable?"]
  },
  economia: {
    description: "Medidas sobre crecimiento, productividad, tributación, inversión, comercio, formalización y entorno económico.",
    questions: ["¿Qué mecanismo conecta la intervención con el resultado económico?", "¿Se explicitan costos, beneficiarios y supuestos?", "¿Qué indicadores permitirían distinguir actividad de impacto?"]
  },
  seguridad: {
    description: "Propuestas sobre seguridad ciudadana, crimen organizado, prevención, justicia, policía y convivencia.",
    questions: ["¿La intervención diferencia prevención, control e investigación?", "¿Qué nivel de gobierno tiene competencia efectiva?", "¿Cómo se medirán resultados sin reducirlos a operativos realizados?"]
  },
  infraestructura: {
    description: "Iniciativas de transporte, conectividad, vivienda, saneamiento, equipamiento y obras públicas.",
    questions: ["¿La propuesta parte de una brecha territorial verificable?", "¿Define cartera, priorización, costo y modalidad de ejecución?", "¿Incluye operación, mantenimiento y sostenibilidad del activo?"]
  },
  ambiente: {
    description: "Medidas sobre biodiversidad, agua, residuos, cambio climático, ordenamiento, fiscalización y sostenibilidad.",
    questions: ["¿Qué riesgo o activo ambiental busca gestionar?", "¿La medida articula territorio, regulación e incentivos?", "¿Qué información permitiría vigilar efectos y conflictos?"]
  },
  salud: {
    description: "Propuestas sobre prevención, atención, aseguramiento, infraestructura, personal y sistemas de salud.",
    questions: ["¿Qué población, servicio y cuello de botella se priorizan?", "¿La medida distingue cobertura, acceso y calidad?", "¿Qué capacidades y recursos exige su implementación territorial?"]
  },
  empleo: {
    description: "Medidas sobre trabajo, empleabilidad, capacitación, formalización, productividad laboral y protección social vinculada al empleo.",
    questions: ["¿La propuesta identifica población y barrera laboral específica?", "¿Cómo se conecta capacitación con demanda productiva real?", "¿Qué resultado se medirá además del número de participantes?"]
  },
  energia: {
    description: "Propuestas de generación, acceso, transición energética, hidrocarburos, electricidad y seguridad de suministro.",
    questions: ["¿Qué problema de acceso, costo o seguridad energética se aborda?", "¿Se reconocen regulación, inversión y horizonte de ejecución?", "¿Qué impactos territoriales y ambientales deben gestionarse?"]
  },
  educacion: {
    description: "Medidas sobre aprendizaje, docentes, infraestructura, educación superior, formación técnica y gestión educativa.",
    questions: ["¿Qué resultado de aprendizaje o trayectoria educativa se busca cambiar?", "¿La propuesta identifica población, nivel y brecha?", "¿Qué combinación de personas, gestión e infraestructura requiere?"]
  },
  social: {
    description: "Propuestas de protección social, cuidados, inclusión, igualdad, pobreza y atención a poblaciones específicas.",
    questions: ["¿Qué población y vulnerabilidad concreta se priorizan?", "¿La intervención evita duplicidades y define criterios de acceso?", "¿Cómo se medirá bienestar y no solo cobertura administrativa?"]
  }
} satisfies Record<string, PlanometroAxisEditorial>;

export function getPlanometroParty(slug: string) {
  return planometroParties.find((party) => party.slug === slug);
}

export function getPlanometroAxis(key: string) {
  return planometroAxes.find((axis) => axis.key === key);
}

export function getPlanometroAxisEditorial(key: string) {
  return planometroAxisEditorial[key as keyof typeof planometroAxisEditorial];
}

export function getPartyAxisMix(party: PlanometroParty, key: string) {
  return party.axes.find((axis) => axis.key === key) ?? { key, label: getPlanometroAxis(key)?.label ?? key, proposals: 0, sharePercent: 0 };
}

export function getPlanometroAxisParties(key: string) {
  return planometroParties
    .map((party) => ({ party, ...getPartyAxisMix(party, key) }))
    .filter((item) => item.proposals > 0)
    .sort((left, right) => right.proposals - left.proposals || left.party.name.localeCompare(right.party.name, "es-PE"));
}

export function describePlanometroDifference(value: number, reference: number, threshold = 3) {
  const difference = Number((value - reference).toFixed(1));
  if (difference >= threshold) return { direction: "higher" as const, label: "Mayor presencia relativa", difference };
  if (difference <= -threshold) return { direction: "lower" as const, label: "Menor presencia relativa", difference };
  return { direction: "similar" as const, label: "Cercano al corpus", difference };
}

export const formatPlanometroPercent = (value: number) => `${new Intl.NumberFormat("es-PE", { maximumFractionDigits: 1 }).format(value)}%`;
export const formatPlanometroScore = (value: number) => `${new Intl.NumberFormat("es-PE", { maximumFractionDigits: 1 }).format(value)} / 100`;
export const formatPlanometroNumber = (value: number) => new Intl.NumberFormat("es-PE").format(value);

export const scopeOrganizationOptions = [
  { value: "municipality", label: "Municipalidad", description: "Gestión local, servicios, inversión y territorio." },
  { value: "regional", label: "Gobierno regional", description: "Políticas, sectores y provincias con una conducción común." },
  { value: "national", label: "Entidad nacional", description: "Programas o políticas con implementación territorial." },
  { value: "company", label: "Empresa", description: "Inversión, operación, entorno o expansión." },
  { value: "organization", label: "Otra organización", description: "Cooperación, academia, fundación o asociación." }
] as const;

export const scopeChallengeOptions = [
  { value: "understand", label: "Comprender y priorizar", description: "Necesitamos ordenar un problema y decidir por dónde empezar." },
  { value: "evaluate", label: "Medir resultados", description: "Necesitamos saber qué funciona, para quién y por qué." },
  { value: "monitor", label: "Monitorear y conducir", description: "Necesitamos indicadores, alertas y una rutina de decisión." },
  { value: "transform", label: "Mejorar un proceso con IA", description: "Necesitamos automatizar con controles y un caso de uso concreto." },
  { value: "transition", label: "Preparar una nueva gestión", description: "Necesitamos transferencia, prioridades y primeros 100 días." }
] as const;

export const scopeEvidenceOptions = [
  { value: "public", label: "Fuentes públicas", description: "Comenzaremos con información abierta y documentada." },
  { value: "documents", label: "Documentos internos", description: "Existen planes, informes, expedientes o archivos de trabajo." },
  { value: "databases", label: "Bases institucionales", description: "Hay registros o sistemas que requieren integración y calidad." },
  { value: "fieldwork", label: "Trabajo de campo", description: "La decisión requiere encuesta, entrevistas u observación territorial." }
] as const;

export const scopeHorizonOptions = [
  { value: "immediate", label: "2 a 3 semanas", description: "Una respuesta inicial para ordenar la decisión." },
  { value: "medium", label: "4 a 8 semanas", description: "Un diagnóstico o diseño con validación suficiente." },
  { value: "extended", label: "8 a 16 semanas", description: "Un estudio, piloto o sistema con mayor profundidad." },
  { value: "continuous", label: "Seguimiento continuo", description: "Una capacidad que debe actualizarse y usarse periódicamente." }
] as const;

export type ScopeOrganization = (typeof scopeOrganizationOptions)[number]["value"];
export type ScopeChallenge = (typeof scopeChallengeOptions)[number]["value"];
export type ScopeEvidence = (typeof scopeEvidenceOptions)[number]["value"];
export type ScopeHorizon = (typeof scopeHorizonOptions)[number]["value"];

export type ScopeBuilderInput = {
  organization: ScopeOrganization;
  challenge: ScopeChallenge;
  evidence: ScopeEvidence;
  horizon: ScopeHorizon;
};

type ChallengeDesign = {
  title: string;
  promise: string;
  interest: string;
  firstDecision: string;
  phases: [string, string, string];
  deliverables: [string, string, string];
};

const challengeDesigns: Record<ScopeChallenge, ChallengeDesign> = {
  understand: {
    title: "Diagnóstico orientado a decisión",
    promise: "Convertir evidencia dispersa en prioridades, preguntas críticas y una ruta de acción defendible.",
    interest: "diagnostico-agenda-territorial",
    firstDecision: "Definir qué problema merece prioridad y qué evidencia falta antes de intervenir.",
    phases: ["Alinear decisión, usuarios y alcance", "Integrar evidencia y contrastar hipótesis", "Priorizar hallazgos y convertirlos en agenda"],
    deliverables: ["Línea de base y mapa del problema", "Matriz de prioridades y riesgos", "Brief ejecutivo con decisiones siguientes"]
  },
  evaluate: {
    title: "Evaluación útil para rediseñar",
    promise: "Medir resultados y explicar la implementación para decidir qué sostener, corregir o escalar.",
    interest: "linea-base-evaluacion-programas",
    firstDecision: "Acordar qué resultado debe evaluarse y qué comparación puede sostener la evidencia disponible.",
    phases: ["Reconstruir teoría de cambio y preguntas", "Diseñar medición y estrategia de análisis", "Interpretar resultados y acordar mejoras"],
    deliverables: ["Marco de evaluación e indicadores", "Análisis de resultados e implementación", "Recomendaciones priorizadas y trazables"]
  },
  monitor: {
    title: "Sistema de decisión y seguimiento",
    promise: "Diseñar indicadores, alertas y rutinas que conecten datos con responsables y acciones concretas.",
    interest: "observatorio-gestion-inversiones",
    firstDecision: "Precisar qué decisión recurrente debe mejorar antes de elegir gráficos o tecnología.",
    phases: ["Mapear decisiones, usuarios y fuentes", "Definir métricas, alertas y gobernanza", "Prototipar vistas y rutina de uso"],
    deliverables: ["Arquitectura de indicadores y fuentes", "Prototipo de tablero o visor", "Protocolo de actualización y reunión ejecutiva"]
  },
  transform: {
    title: "Piloto controlado de IA y procesos",
    promise: "Validar un caso de uso acotado con datos, riesgos, métricas y control humano desde el inicio.",
    interest: "ia-procesos-publicos",
    firstDecision: "Confirmar que el cuello de botella requiere IA y no una mejora más simple de proceso o información.",
    phases: ["Mapear proceso, volumen y exposición", "Diseñar prueba, controles y criterio de detención", "Evaluar utilidad, riesgo y escalamiento"],
    deliverables: ["Ficha del caso de uso y línea de base", "Prototipo o prueba controlada", "Evaluación y plan de gobernanza"]
  },
  transition: {
    title: "Agenda de transición y 100 días",
    promise: "Pasar de compromisos y evidencia territorial a prioridades, responsables, hitos y seguimiento.",
    interest: "transferencia-gestion-100-dias",
    firstDecision: "Distinguir urgencias, compromisos y capacidades críticas para el inicio de la gestión.",
    phases: ["Ordenar transferencia, riesgos y cartera", "Priorizar agenda política y operativa", "Diseñar hitos, responsables y seguimiento"],
    deliverables: ["Diagnóstico rápido de inicio", "Matriz de prioridades de 100 días", "Tablero de compromisos y alertas"]
  }
};

const organizationContext: Record<ScopeOrganization, { label: string; type: string; lens: string }> = {
  municipality: { label: "Municipalidad", type: "municipality", lens: "competencias locales, capacidad del equipo y diferencias dentro del territorio" },
  regional: { label: "Gobierno regional", type: "regional-government", lens: "provincias, sectores, unidades ejecutoras y coordinación intergubernamental" },
  national: { label: "Entidad nacional", type: "national-government", lens: "implementación territorial, estándares comunes y heterogeneidad entre unidades" },
  company: { label: "Empresa", type: "company", lens: "decisión de inversión u operación, entorno territorial y validación comercial" },
  organization: { label: "Otra organización", type: "cooperation", lens: "misión institucional, socios, población objetivo y capacidad de implementación" }
};

const evidenceDesign: Record<ScopeEvidence, { label: string; dependency: string; deliverable: string }> = {
  public: { label: "Fuentes públicas", dependency: "Validar cobertura, periodos y compatibilidad antes de construir conclusiones.", deliverable: "Inventario de fuentes y nota de calidad" },
  documents: { label: "Documentos internos", dependency: "Acordar acceso, confidencialidad, versiones y criterios de trazabilidad.", deliverable: "Corpus documental y matriz de evidencia" },
  databases: { label: "Bases institucionales", dependency: "Revisar diccionario, identificadores, completitud, permisos y actualización.", deliverable: "Auditoría de datos y modelo semántico inicial" },
  fieldwork: { label: "Trabajo de campo", dependency: "Definir población, cobertura, instrumentos, ética y logística antes de levantar información.", deliverable: "Diseño de campo e instrumentos" }
};

const horizonDesign: Record<ScopeHorizon, { label: string; mode: string; timeline: string; boundary: string }> = {
  immediate: { label: "2 a 3 semanas", mode: "Alcance breve", timeline: "urgent", boundary: "Debe concentrarse en una decisión, fuentes disponibles y un entregable ejecutivo." },
  medium: { label: "4 a 8 semanas", mode: "Sprint de diagnóstico", timeline: "one-to-three-months", boundary: "Permite integrar fuentes, validar hipótesis y producir una recomendación defendible." },
  extended: { label: "8 a 16 semanas", mode: "Implementación focalizada", timeline: "one-to-three-months", boundary: "Admite mayor profundidad, trabajo con usuarios y una prueba operativa o de campo." },
  continuous: { label: "Seguimiento continuo", mode: "Capacidad institucional", timeline: "three-to-six-months", boundary: "Requiere gobernanza, actualización, soporte y una rutina estable de uso." }
};

export function buildScopeRecommendation(input: ScopeBuilderInput) {
  const challenge = challengeDesigns[input.challenge];
  const organization = organizationContext[input.organization];
  const evidence = evidenceDesign[input.evidence];
  const horizon = horizonDesign[input.horizon];
  const contextualInterest = input.challenge === "monitor" && input.organization === "company"
    ? "monitoreo-entorno-impacto"
    : input.challenge === "evaluate" && input.evidence === "fieldwork"
      ? "encuestas-escucha-ciudadana"
      : input.challenge === "understand" && input.organization === "company"
        ? "inteligencia-territorial-inversion"
        : challenge.interest;

  return {
    ...challenge,
    interest: contextualInterest,
    organizationLabel: organization.label,
    organizationType: organization.type,
    organizationLens: organization.lens,
    evidenceLabel: evidence.label,
    dependency: evidence.dependency,
    timelineLabel: horizon.label,
    timeline: horizon.timeline,
    mode: horizon.mode,
    boundary: horizon.boundary,
    deliverables: [...challenge.deliverables, evidence.deliverable]
  };
}

export function buildScopeSampleSlug(input: ScopeBuilderInput) {
  if (input.challenge === "transform") return "piloto-ia-documental";
  if (input.challenge === "monitor") return input.organization === "company" ? "monitoreo-entorno-impacto" : "observatorio-gestion-inversiones";
  if (input.challenge === "evaluate") return input.evidence === "fieldwork" ? "encuesta-escucha-territorial" : "linea-base-evaluacion-programa";
  if (input.challenge === "transition") return "transferencia-gestion-100-dias";
  if (input.challenge === "understand" && input.organization === "company") return "inteligencia-territorial-inversion";
  return "diagnostico-agenda-territorial";
}

function isOption<T extends readonly { value: string }[]>(options: T, value?: string): value is T[number]["value"] {
  return Boolean(value && options.some((option) => option.value === value));
}

export function parseScopeBuilderInput(input: Partial<Record<"org" | "challenge" | "evidence" | "horizon", string>>): ScopeBuilderInput | null {
  if (!isOption(scopeOrganizationOptions, input.org) || !isOption(scopeChallengeOptions, input.challenge) || !isOption(scopeEvidenceOptions, input.evidence) || !isOption(scopeHorizonOptions, input.horizon)) return null;
  return { organization: input.org, challenge: input.challenge, evidence: input.evidence, horizon: input.horizon };
}

export function buildScopeContactHref(input: ScopeBuilderInput) {
  const recommendation = buildScopeRecommendation(input);
  const params = new URLSearchParams({
    interest: recommendation.interest,
    org: input.organization,
    challenge: input.challenge,
    evidence: input.evidence,
    horizon: input.horizon,
    from: "/diagnostico"
  });
  return `/contact?${params.toString()}`;
}

export function buildScopeContactMessage(input: ScopeBuilderInput) {
  const recommendation = buildScopeRecommendation(input);
  return `Generamos un brief inicial con el Diseñador de alcance NOAM.\n\nOrganización: ${recommendation.organizationLabel}\nNecesidad: ${recommendation.title}\nEvidencia disponible: ${recommendation.evidenceLabel}\nHorizonte: ${recommendation.timelineLabel}\n\nDecisión que buscamos mejorar:\n`;
}

export function buildScopeBrief(input: ScopeBuilderInput, date = new Date()) {
  const recommendation = buildScopeRecommendation(input);
  return `# Brief inicial de alcance · NOAM\n\nGenerado: ${new Intl.DateTimeFormat("es-PE", { dateStyle: "long" }).format(date)}\n\n## Punto de partida\n\n- Organización: ${recommendation.organizationLabel}\n- Necesidad: ${recommendation.title}\n- Evidencia disponible: ${recommendation.evidenceLabel}\n- Horizonte: ${recommendation.timelineLabel}\n- Modalidad sugerida: ${recommendation.mode}\n\n## Decisión inicial\n\n${recommendation.firstDecision}\n\n## Enfoque\n\n${recommendation.promise}\n\nLa lectura debe considerar ${recommendation.organizationLens}. ${recommendation.boundary}\n\n## Fases sugeridas\n\n${recommendation.phases.map((phase, index) => `${index + 1}. ${phase}`).join("\n")}\n\n## Entregables iniciales\n\n${recommendation.deliverables.map((deliverable) => `- ${deliverable}`).join("\n")}\n\n## Condición crítica\n\n${recommendation.dependency}\n\n## Para preparar una conversación\n\n1. ¿Qué decisión concreta debe mejorar?\n2. ¿Quién utilizará el resultado?\n3. ¿Qué hito o restricción define el plazo?\n4. ¿Qué información existe y quién puede autorizar su uso?\n5. ¿Cómo sabremos que el encargo produjo valor?\n\n---\n\nEste documento es una orientación automática, no una cotización ni una propuesta contractual. El alcance final requiere conversación, revisión de fuentes y acuerdo entre las partes.\n`;
}

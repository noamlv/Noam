export type ScaleValue = 1 | 2 | 3 | 4 | 5;

export type AiAssessment = {
  caseId: string;
  publicValue: ScaleValue;
  processClarity: ScaleValue;
  dataReadiness: ScaleValue;
  measurability: ScaleValue;
  impactIfWrong: ScaleValue;
  dataSensitivity: ScaleValue;
  autonomy: ScaleValue;
  humanOversight: ScaleValue;
  traceability: ScaleValue;
  fallback: ScaleValue;
};

export type AiUseCase = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  task: string;
  preset: Omit<AiAssessment, "caseId">;
};

export type AiAssessmentResult = {
  opportunity: number;
  exposure: number;
  controlStrength: number;
  status: "pilot" | "investigate" | "redesign" | "stop";
  label: string;
  summary: string;
  controls: string[];
};

export const aiUseCases: AiUseCase[] = [
  {
    id: "document-search",
    name: "Búsqueda y respuesta sobre documentos internos",
    shortName: "Búsqueda documental",
    description: "Asistir a equipos para localizar normas, directivas, informes o antecedentes y responder con referencias verificables.",
    task: "Recuperar evidencia y preparar una respuesta que siempre pueda ser revisada por una persona.",
    preset: { publicValue: 4, processClarity: 4, dataReadiness: 3, measurability: 4, impactIfWrong: 2, dataSensitivity: 3, autonomy: 1, humanOversight: 5, traceability: 4, fallback: 5 }
  },
  {
    id: "request-triage",
    name: "Clasificación inicial de solicitudes ciudadanas",
    shortName: "Clasificación de solicitudes",
    description: "Sugerir tema, unidad responsable y nivel de urgencia para ordenar una bandeja de atención.",
    task: "Priorizar revisión y derivación sin negar derechos ni cerrar expedientes automáticamente.",
    preset: { publicValue: 4, processClarity: 4, dataReadiness: 3, measurability: 4, impactIfWrong: 3, dataSensitivity: 3, autonomy: 2, humanOversight: 5, traceability: 4, fallback: 5 }
  },
  {
    id: "assisted-drafting",
    name: "Borradores asistidos de informes y respuestas",
    shortName: "Redacción asistida",
    description: "Preparar primeros borradores a partir de plantillas y fuentes institucionales autorizadas.",
    task: "Reducir tiempo de preparación sin reemplazar la responsabilidad de quien firma o aprueba.",
    preset: { publicValue: 4, processClarity: 4, dataReadiness: 3, measurability: 4, impactIfWrong: 3, dataSensitivity: 3, autonomy: 2, humanOversight: 5, traceability: 4, fallback: 5 }
  },
  {
    id: "project-alerts",
    name: "Señales para seguimiento de proyectos",
    shortName: "Alertas de proyectos",
    description: "Detectar registros que cumplen reglas de atraso, cambio o inconsistencia para priorizar revisión.",
    task: "Dirigir atención hacia evidencia que requiere explicación, sin declarar causalidad ni responsabilidad.",
    preset: { publicValue: 4, processClarity: 3, dataReadiness: 4, measurability: 4, impactIfWrong: 3, dataSensitivity: 2, autonomy: 2, humanOversight: 4, traceability: 4, fallback: 4 }
  },
  {
    id: "benefit-eligibility",
    name: "Decisión automática de elegibilidad para un beneficio",
    shortName: "Elegibilidad automática",
    description: "Aprobar o denegar de manera automática acceso a un beneficio o servicio público.",
    task: "Caso deliberadamente sensible para mostrar por qué valor y factibilidad no bastan.",
    preset: { publicValue: 5, processClarity: 4, dataReadiness: 4, measurability: 4, impactIfWrong: 5, dataSensitivity: 5, autonomy: 5, humanOversight: 2, traceability: 3, fallback: 2 }
  },
  {
    id: "inspection-targeting",
    name: "Priorización automatizada de inspecciones o sanciones",
    shortName: "Inspección y sanción",
    description: "Asignar prioridad o intensidad de fiscalización usando perfiles, predicciones o patrones históricos.",
    task: "Caso de alta exposición que exige revisar sesgo, fundamento, proporcionalidad y posibilidad de impugnación.",
    preset: { publicValue: 4, processClarity: 3, dataReadiness: 3, measurability: 3, impactIfWrong: 5, dataSensitivity: 4, autonomy: 4, humanOversight: 3, traceability: 3, fallback: 3 }
  }
];

export const assessmentCriteria = [
  { key: "publicValue", group: "Oportunidad", label: "Valor verificable", low: "Beneficio marginal", high: "Resultado público relevante", help: "Qué tan importante y observable sería la mejora para usuarios, equipo o institución." },
  { key: "processClarity", group: "Oportunidad", label: "Proceso delimitado", low: "Tarea ambigua", high: "Flujo y responsable claros", help: "Si la tarea, sus entradas, responsables y salida esperada están definidos." },
  { key: "dataReadiness", group: "Oportunidad", label: "Preparación de datos", low: "Datos inaccesibles", high: "Datos utilizables y gobernados", help: "Acceso, calidad, permisos, vigencia y representatividad de las fuentes." },
  { key: "measurability", group: "Oportunidad", label: "Capacidad de medir", low: "Sin línea de base", high: "Métrica y umbral acordados", help: "Si puede compararse el proceso actual con el piloto y definirse cuándo detenerlo." },
  { key: "impactIfWrong", group: "Exposición", label: "Consecuencia del error", low: "Fácil de corregir", high: "Daño grave o difícil de revertir", help: "Efecto potencial sobre personas, servicios, recursos, derechos o confianza." },
  { key: "dataSensitivity", group: "Exposición", label: "Sensibilidad de datos", low: "Datos no sensibles", high: "Datos personales o restringidos", help: "Nivel de sensibilidad, confidencialidad y posibilidad de inferir información protegida." },
  { key: "autonomy", group: "Exposición", label: "Autonomía del sistema", low: "Solo asiste", high: "Decide o actúa sin revisión", help: "Cuánto control conserva una persona antes de que la salida produzca efectos." },
  { key: "humanOversight", group: "Controles", label: "Supervisión humana", low: "Nominal o inexistente", high: "Efectiva y responsable", help: "Capacidad real de revisar, rechazar, corregir y asumir responsabilidad." },
  { key: "traceability", group: "Controles", label: "Trazabilidad", low: "Sin evidencia", high: "Fuentes, versión y acciones registradas", help: "Si puede reconstruirse qué información, reglas y versiones produjeron una salida." },
  { key: "fallback", group: "Controles", label: "Abstención y reversión", low: "No puede detenerse", high: "Puede abstenerse, revertir y escalar", help: "Existencia de rutas seguras cuando falta evidencia o aparece un error." }
] as const satisfies ReadonlyArray<{
  key: Exclude<keyof AiAssessment, "caseId">;
  group: "Oportunidad" | "Exposición" | "Controles";
  label: string;
  low: string;
  high: string;
  help: string;
}>;

function average(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function toScore(value: number) {
  return Math.round(value * 20);
}

export function evaluateAiUseCase(input: AiAssessment): AiAssessmentResult {
  const opportunity = toScore(average([input.publicValue, input.processClarity, input.dataReadiness, input.measurability]));
  const exposure = toScore((input.impactIfWrong * 0.45) + (input.dataSensitivity * 0.3) + (input.autonomy * 0.25));
  const controlStrength = toScore(average([input.humanOversight, input.traceability, input.fallback]));
  const controls = buildControlPlan(input);

  if (input.impactIfWrong >= 4 && input.autonomy >= 4) {
    return {
      opportunity,
      exposure,
      controlStrength,
      status: "stop",
      label: "No avanzar con esta configuración",
      summary: "La combinación de alto impacto y autonomía exige reducir o eliminar la decisión automática antes de considerar un piloto.",
      controls
    };
  }

  if (exposure >= 70 && controlStrength < 70) {
    return {
      opportunity,
      exposure,
      controlStrength,
      status: "redesign",
      label: "Rediseñar antes de pilotar",
      summary: "La exposición supera la capacidad de control declarada. Acota el caso, fortalece supervisión y valida obligaciones aplicables.",
      controls
    };
  }

  if (opportunity >= 65 && exposure < 70 && controlStrength >= 60) {
    return {
      opportunity,
      exposure,
      controlStrength,
      status: "pilot",
      label: "Candidato a piloto controlado",
      summary: "Existe una oportunidad inicial, pero el piloto debe comenzar con alcance limitado, línea de base, conjunto de prueba y criterios de detención.",
      controls
    };
  }

  return {
    opportunity,
    exposure,
    controlStrength,
    status: "investigate",
    label: "Profundizar evidencia",
    summary: "Antes de construir, precisa el proceso, mejora la evidencia disponible o define controles que permitan evaluar el caso con menor incertidumbre.",
    controls
  };
}

function buildControlPlan(input: AiAssessment) {
  const controls = [
    "Documentar propósito, propietario del proceso, usuarios y decisión que se busca mejorar.",
    "Definir línea de base, conjunto de prueba y umbrales para continuar, corregir o detener."
  ];

  if (input.dataReadiness <= 3) controls.push("Auditar acceso, calidad, cobertura, vigencia y representatividad de los datos antes de entrenar o integrar.");
  if (input.dataSensitivity >= 3) controls.push("Realizar revisión de privacidad, acceso, retención y exposición de datos personales o restringidos.");
  if (input.impactIfWrong >= 4) controls.push("Incorporar evaluación de impacto, revisión multidisciplinaria y un mecanismo efectivo de reclamo o corrección.");
  if (input.autonomy >= 3) controls.push("Reducir autonomía: mantener decisión humana, límites de acción y casos obligatorios de escalamiento.");
  if (input.humanOversight <= 3) controls.push("Asignar una persona responsable con tiempo, autoridad y criterios claros para revisar o rechazar salidas.");
  if (input.traceability <= 3) controls.push("Registrar fuentes, versión del sistema, instrucciones, salida, correcciones y responsable de cada uso relevante.");
  if (input.fallback <= 3) controls.push("Diseñar abstención, reversión, continuidad manual y procedimiento de suspensión inmediata.");

  controls.push("Monitorear calidad, errores graves, diferencias entre grupos, adopción y efectos no previstos durante todo el piloto.");
  return [...new Set(controls)].slice(0, 7);
}

export function assessmentFromUseCase(useCase: AiUseCase): AiAssessment {
  return { caseId: useCase.id, ...useCase.preset };
}

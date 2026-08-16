import {
  formatCurrency,
  formatMetric,
  type MunicipalityContext,
  type MunicipalityProfile,
  type MunicipalityProject,
  type MunicipalitySignal
} from "@/lib/dataperu";

export type ErmWorkstream = {
  id: string;
  theme: string;
  observation: string;
  decisionQuestion: string;
  evidenceToValidate: string;
  day30: string;
  day60: string;
  day100: string;
  firstIndicator: string;
};

type WorkstreamTemplate = Omit<ErmWorkstream, "id" | "theme" | "observation" | "decisionQuestion">;

const signalTemplates: Record<string, WorkstreamTemplate> = {
  "investment-execution": {
    evidenceToValidate: "Avance físico, contratos, valorizaciones, hitos, controversias y restricciones de los proyectos prioritarios.",
    day30: "Contrastar la ejecución financiera con el avance físico y contractual de la cartera.",
    day60: "Clasificar proyectos por continuidad, riesgo y decisión pendiente.",
    day100: "Instalar una revisión mensual de hitos, responsables, restricciones y alertas.",
    firstIndicator: "Proyectos críticos con hito, responsable y fecha validados."
  },
  "budget-execution": {
    evidenceToValidate: "Metas presupuestales, saldos por función, programación mensual, certificaciones y cuellos de botella operativos.",
    day30: "Localizar las partidas y metas donde se concentra la diferencia entre PIM y devengado.",
    day60: "Acordar decisiones de destrabe con responsables y restricciones explícitas.",
    day100: "Vincular la revisión presupuestal con metas físicas y resultados de servicio.",
    firstIndicator: "Saldos críticos con causa verificada y decisión asignada."
  },
  "population-change": {
    evidenceToValidate: "Proyecciones demográficas, padrones de atención, demanda por servicio, expansión urbana y diferencias intraterritoriales.",
    day30: "Contrastar la tendencia poblacional con registros administrativos y demanda observada.",
    day60: "Identificar servicios y zonas donde la presión o contracción cambia las prioridades.",
    day100: "Incorporar escenarios de demanda en programación, inversiones e indicadores.",
    firstIndicator: "Servicios críticos con escenario de demanda territorial validado."
  },
  "digital-capacity": {
    evidenceToValidate: "Conectividad efectiva, inventario tecnológico, procesos críticos, sistemas utilizados, calidad de datos y capacidades del equipo.",
    day30: "Verificar qué procesos están limitados por infraestructura, información o soporte.",
    day60: "Priorizar mejoras habilitantes y casos de uso con riesgo controlable.",
    day100: "Probar una mejora concreta y medir tiempo, calidad, adopción y errores.",
    firstIndicator: "Proceso piloto con línea de base, responsable y criterio de éxito."
  },
  "planning-instruments": {
    evidenceToValidate: "Vigencia, consistencia, responsables, uso real y conexión presupuestal de los instrumentos de planeamiento.",
    day30: "Inventariar instrumentos, versiones, responsables y brechas de actualización.",
    day60: "Alinear prioridades iniciales con competencias, presupuesto y compromisos vigentes.",
    day100: "Definir una rutina ejecutiva que conecte planes, decisiones e indicadores.",
    firstIndicator: "Prioridades iniciales vinculadas a instrumento, presupuesto y responsable."
  },
  "portfolio-concentration": {
    evidenceToValidate: "Peso financiero, avance físico, dependencias, población beneficiaria y riesgos de los principales proyectos.",
    day30: "Verificar qué parte de la cartera concentra recursos, decisiones y exposición institucional.",
    day60: "Definir la secuencia de decisiones de continuidad, corrección o reformulación.",
    day100: "Publicar una lectura ejecutiva de cartera con hitos y alertas verificables.",
    firstIndicator: "Proyectos principales con estado y siguiente decisión documentados."
  }
};

const transitionPhases = [
  {
    range: "0–30",
    title: "Verificar la línea de base",
    description: "Confirmar fuentes, responsables, obligaciones, cartera, servicios críticos y decisiones que no pueden esperar.",
    output: "Inventario de continuidad, riesgos y vacíos de información."
  },
  {
    range: "31–60",
    title: "Acordar prioridades operables",
    description: "Convertir problemas y compromisos en decisiones con alcance, restricción, responsable, hito e indicador.",
    output: "Cartera priorizada y agenda ejecutiva de decisiones."
  },
  {
    range: "61–100",
    title: "Instalar seguimiento",
    description: "Conectar prioridades con presupuesto, proyectos, servicios y una rutina breve de revisión y aprendizaje.",
    output: "Tablero inicial y cadencia de seguimiento."
  }
] as const;

export const ermTransitionPhases = transitionPhases;

export function buildErmWorkstreams(
  municipality: MunicipalityProfile,
  context: MunicipalityContext,
  projects: MunicipalityProject[],
  signals: MunicipalitySignal[]
) {
  const mapped = signals.map((signal): ErmWorkstream => {
    const template = signalTemplates[signal.id] ?? {
      evidenceToValidate: "Registros administrativos, responsables, alcance territorial, restricciones y línea de base disponible.",
      day30: "Verificar la observación con las áreas responsables y las fuentes primarias.",
      day60: "Definir una decisión, un responsable y un hito verificable.",
      day100: "Incorporar la prioridad a una rutina ejecutiva de seguimiento.",
      firstIndicator: "Prioridad con fuente, responsable y siguiente hito."
    };

    return {
      id: signal.id,
      theme: signal.label,
      observation: signal.observation,
      decisionQuestion: signal.question,
      ...template
    };
  });

  const fallbacks: ErmWorkstream[] = [
    {
      id: "service-baseline",
      theme: "Servicios y territorio",
      observation: `La línea de base registra una población proyectada de ${formatMetric(context.population.projected2025)} habitantes para 2025.`,
      decisionQuestion: "¿Qué servicios, grupos y zonas requieren una lectura más detallada antes de fijar prioridades?",
      evidenceToValidate: "Padrones de atención, cobertura, calidad, tiempos, reclamos, estacionalidad y diferencias dentro del territorio.",
      day30: "Contrastar población y demanda con los registros de los servicios críticos.",
      day60: "Definir brechas prioritarias por población, zona y capacidad de respuesta.",
      day100: "Establecer indicadores de cobertura, calidad y oportunidad para la revisión ejecutiva.",
      firstIndicator: "Servicios críticos con línea de base territorial validada."
    },
    {
      id: "investment-baseline",
      theme: "Inversión y cartera",
      observation: `La municipalidad registra ${formatMetric(context.investment.projectsWithBudget)} proyectos con presupuesto de inversión y un PIM de ${formatCurrency(context.investment.pim)}.`,
      decisionQuestion: "¿Qué proyectos requieren continuidad, destrabe, reformulación o una decisión temprana?",
      evidenceToValidate: "Avance físico y contractual, beneficiarios, costos pendientes, permisos, controversias y capacidad de operación posterior.",
      day30: "Verificar el estado de los proyectos con mayor exposición financiera y operativa.",
      day60: "Ordenar decisiones de cartera por urgencia, dependencia y capacidad de acción.",
      day100: "Instalar un tablero de hitos y restricciones para la cartera priorizada.",
      firstIndicator: "Proyectos prioritarios con estado, decisión y responsable verificados."
    },
    {
      id: "institutional-baseline",
      theme: "Capacidad institucional",
      observation: `RENAMU 2025 reporta ${formatMetric(municipality.workforce.reportedWorkforceTotal)} personas entre personal y locadores, y ${formatMetric(municipality.digital.operationalComputers)} computadoras operativas.`,
      decisionQuestion: "¿La organización, el equipo y la infraestructura disponibles permiten ejecutar las prioridades iniciales?",
      evidenceToValidate: "Estructura real, puestos críticos, carga de trabajo, competencias, conectividad, sistemas, procesos y dependencias externas.",
      day30: "Identificar responsables, puestos críticos y capacidades habilitantes para la transición.",
      day60: "Ajustar la agenda a restricciones organizacionales y necesidades de soporte.",
      day100: "Medir avances de capacidad junto con los resultados operativos esperados.",
      firstIndicator: "Prioridades con capacidad requerida, brecha y responsable identificados."
    },
    {
      id: "project-continuity",
      theme: "Continuidad de proyectos",
      observation: projects.length > 0
        ? `El portafolio visible reúne ${formatMetric(projects.length)} proyectos principales ordenados por PIM.`
        : "La fuente procesada no muestra proyectos principales con presupuesto para esta municipalidad.",
      decisionQuestion: "¿Qué compromisos, contratos y entregas deben protegerse durante el cambio de gestión?",
      evidenceToValidate: "Contratos, expedientes, entregables, obligaciones, controversias, pagos, activos y responsables de continuidad.",
      day30: "Construir un inventario verificable de compromisos y entregas en curso.",
      day60: "Resolver responsables y decisiones pendientes de continuidad.",
      day100: "Integrar compromisos críticos al seguimiento ejecutivo.",
      firstIndicator: "Compromisos críticos con evidencia, responsable y fecha."
    }
  ];

  const existing = new Set(mapped.map((item) => item.id));
  return [...mapped, ...fallbacks.filter((item) => !existing.has(item.id))].slice(0, 3);
}

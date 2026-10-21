import { peruTerritories } from "./peru-territories.ts";
import { normalizeSearchText } from "./search-core.ts";

type AssistantLink = { label: string; href: string };

export type AssistantAnswer = {
  topic: string;
  response: string;
  primary: AssistantLink;
  proof: AssistantLink & { kind: "Consultoría institucional" | "Producto propio" | "Muestra demostrativa" };
  interest: string;
  territory?: string;
};

type AnswerTemplate = Omit<AssistantAnswer, "territory">;

const answers: Array<{ terms: string[]; answer: AnswerTemplate }> = [
  {
    terms: ["evaluacion de impacto", "evaluacion", "evaluar", "linea de base", "teoria de cambio", "medir resultados"],
    answer: {
      topic: "Evaluación y línea de base",
      response: "Primero hay que definir qué resultado se quiere medir y qué comparación permite la evidencia. NOAM puede diseñar la línea de base, analizar la implementación y convertir hallazgos en decisiones.",
      primary: { label: "Ver el enfoque de evaluación", href: "/solutions/linea-base-evaluacion-programas" },
      proof: { kind: "Consultoría institucional", label: "Evaluación regional para el GORE Cusco", href: "/cases/gore-cusco-evaluacion-prevencion-trata" },
      interest: "linea-base-evaluacion-programas"
    }
  },
  {
    terms: ["encuesta", "encuestas", "opinion publica", "sondeo", "entrevistas", "escucha ciudadana"],
    answer: {
      topic: "Encuestas y escucha",
      response: "Una encuesta útil comienza por la decisión que debe informar, la población y el diseño de muestra. El análisis debe mostrar límites e incertidumbre, no solo porcentajes.",
      primary: { label: "Ver el enfoque de encuestas", href: "/solutions/encuestas-escucha-ciudadana" },
      proof: { kind: "Producto propio", label: "Barómetro Electoral 2026", href: "/cases/barometro-electoral-enero-2026" },
      interest: "encuestas-escucha-ciudadana"
    }
  },
  {
    terms: ["electoral", "elecciones", "eleccion", "plan de gobierno", "transferencia", "100 dias", "nueva gestion"],
    answer: {
      topic: "Elecciones y gestión",
      response: "Podemos ordenar propuestas, evidencia territorial y preguntas de transferencia para preparar prioridades de gestión. Los resultados electorales oficiales corresponden a los organismos competentes.",
      primary: { label: "Explorar la agenda ERM 2026", href: "/electoral/erm-2026" },
      proof: { kind: "Producto propio", label: "Planómetro 2026", href: "/cases/planometro-electoral-product" },
      interest: "transferencia-gestion-100-dias"
    }
  },
  {
    terms: ["inteligencia artificial", "automatizacion", "chatbot", "asistente virtual", "ia", "ia aplicada", "ia documental"],
    answer: {
      topic: "IA aplicada",
      response: "Antes de automatizar, definimos el proceso, los datos permitidos, la supervisión humana y una métrica de mejora. Si un piloto no supera esos controles, no recomendamos escalarlo.",
      primary: { label: "Evaluar un caso de IA", href: "/solutions/ia-procesos-publicos" },
      proof: { kind: "Muestra demostrativa", label: "Piloto de IA documental", href: "/muestras/piloto-ia-documental" },
      interest: "ia-procesos-publicos"
    }
  },
  {
    terms: ["dashboard", "tablero", "observatorio", "visor", "visores", "georreferenciado", "indicadores", "monitoreo", "alertas"],
    answer: {
      topic: "Sistema de decisión",
      response: "Un tablero debe responder a decisiones recurrentes, con indicadores definidos, fuentes trazables y responsables de actualización. La visualización viene después de esa arquitectura.",
      primary: { label: "Ver sistemas de decisión", href: "/services/observatorios-sistemas-decision" },
      proof: { kind: "Consultoría institucional", label: "Arquitectura estadística para el IPD", href: "/cases/ipd-sistema-estadistico-investigacion-deportiva" },
      interest: "observatorio-gestion-inversiones"
    }
  },
  {
    terms: ["estudio de mercado", "mercado", "expansion", "inversion privada", "clientes", "competencia empresarial"],
    answer: {
      topic: "Inteligencia para empresas",
      response: "Para una decisión de inversión u operación, combinamos demanda, competencia, territorio y restricciones con supuestos explícitos. El alcance depende del sector y de los datos disponibles.",
      primary: { label: "Ver inteligencia territorial", href: "/solutions/inteligencia-territorial-inversion" },
      proof: { kind: "Muestra demostrativa", label: "Muestra de inteligencia territorial", href: "/muestras/inteligencia-territorial-inversion" },
      interest: "inteligencia-territorial-inversion"
    }
  },
  {
    terms: ["inversion publica", "presupuesto", "proyecto", "proyectos", "cartera de inversiones", "ejecucion"],
    answer: {
      topic: "Inversión y proyectos",
      response: "La ejecución por sí sola no demuestra avance físico ni servicio operativo. Podemos integrar cartera, presupuesto, hitos y alertas para priorizar y hacer seguimiento.",
      primary: { label: "Explorar inversión pública", href: "/dataperu/inversiones" },
      proof: { kind: "Producto propio", label: "DataPerú territorial", href: "/cases/dataperu-platform-case" },
      interest: "observatorio-gestion-inversiones"
    }
  },
  {
    terms: ["municipio", "municipal", "municipalidad", "distrito", "departamento", "territorio", "datos regionales", "datos locales"],
    answer: {
      topic: "Datos territoriales",
      response: "Una ficha territorial ayuda a comenzar con población, capacidades, proyectos y vacíos de evidencia. Después podemos delimitar el estudio o sistema que necesita la entidad.",
      primary: { label: "Explorar DataPerú", href: "/dataperu" },
      proof: { kind: "Producto propio", label: "Plataforma DataPerú", href: "/cases/dataperu-platform-case" },
      interest: "dataperu"
    }
  },
  {
    terms: ["diagnostico", "politica publica", "programa", "programas", "estudio", "estudios", "analisis de datos", "priorizar", "problema publico"],
    answer: {
      topic: "Estudios y diagnósticos",
      response: "Podemos partir de una pregunta de gestión, contrastar fuentes y producir prioridades defendibles. El método concreto depende del problema, la escala y la evidencia disponible.",
      primary: { label: "Ver estudios y diagnósticos", href: "/services/estudios-diagnosticos-evaluacion" },
      proof: { kind: "Consultoría institucional", label: "Priorización de CTI para CONCYTEC", href: "/cases/concytec-prioridades-cti-seguridad" },
      interest: "diagnostico-agenda-territorial"
    }
  }
];

const sectorTopics = [
  { terms: ["agua", "saneamiento"], label: "Agua y saneamiento", href: "/analisis-datos-agua-saneamiento", interest: "agua-saneamiento" },
  { terms: ["educacion", "escuela", "matricula"], label: "Educación", href: "/analisis-datos-educacion-territorial", interest: "educacion-territorial" },
  { terms: ["salud", "hospital", "establecimiento de salud"], label: "Salud", href: "/analisis-datos-salud-territorial", interest: "salud-territorial" },
  { terms: ["seguridad ciudadana", "delito", "criminalidad"], label: "Seguridad ciudadana", href: "/analisis-datos-seguridad-ciudadana", interest: "general-public" },
  { terms: ["residuos", "limpieza publica", "basura"], label: "Residuos y limpieza pública", href: "/analisis-datos-residuos-limpieza-publica", interest: "general-public" },
  { terms: ["ambiente", "ambiental", "contaminacion"], label: "Gestión ambiental", href: "/analisis-datos-gestion-ambiental", interest: "gestion-ambiental" },
  { terms: ["movilidad", "transporte", "transito"], label: "Movilidad y transporte", href: "/analisis-datos-movilidad-transporte", interest: "movilidad-transporte" },
  { terms: ["catastro", "desarrollo urbano", "predios"], label: "Catastro y territorio urbano", href: "/analisis-catastro-desarrollo-urbano-territorial", interest: "catastro-desarrollo-urbano" },
  { terms: ["contrataciones", "compras publicas", "proveedores"], label: "Contrataciones públicas", href: "/analisis-contrataciones-publicas-proveedores", interest: "contrataciones-publicas" },
  { terms: ["empleo", "mype", "desarrollo economico local"], label: "Desarrollo económico local", href: "/analisis-datos-desarrollo-economico-local", interest: "desarrollo-economico-local" },
  { terms: ["desastres", "riesgo de desastres", "inundacion"], label: "Gestión del riesgo", href: "/analisis-datos-gestion-riesgo-desastres", interest: "general-public" },
  { terms: ["politicas sociales", "pobreza", "proteccion social"], label: "Políticas sociales", href: "/analisis-datos-politicas-sociales", interest: "politicas-sociales" }
] as const;

function hasTerm(text: string, term: string) {
  return ` ${text} `.includes(` ${normalizeSearchText(term)} `);
}

export function answerNavigatorQuestion(question: string): AssistantAnswer | null {
  const normalized = normalizeSearchText(question.slice(0, 320));
  if (normalized.length < 5) return null;

  const territory = peruTerritories.find((item) => hasTerm(normalized, item.name));
  const matched = answers.slice(0, 7).find(({ terms }) => terms.some((term) => hasTerm(normalized, term)))?.answer;
  const sector = sectorTopics.find(({ terms }) => terms.some((term) => hasTerm(normalized, term)));
  const sectorAnswer: AnswerTemplate | undefined = sector ? {
    topic: sector.label,
    response: `Para ${sector.label.toLowerCase()} conviene precisar el servicio, la escala territorial y la decisión que debe mejorar. Nuestra guía muestra preguntas, fuentes y límites antes de definir un encargo.`,
    primary: { label: `Ver guía de ${sector.label.toLowerCase()}`, href: sector.href },
    proof: { kind: "Muestra demostrativa", label: "Examinar formas de entregable", href: "/muestras" },
    interest: sector.interest
  } : undefined;
  const general = answers.find(({ terms, answer }) => answer.interest === "diagnostico-agenda-territorial" && terms.some((term) => hasTerm(normalized, term)))?.answer;
  if (!matched && !sectorAnswer && !general && !territory) return null;

  const answer = matched ?? sectorAnswer ?? general ?? answers.find(({ answer: item }) => item.interest === "dataperu")?.answer;
  if (!answer) return null;
  if (!territory) return answer;
  return {
    ...answer,
    territory: territory.name,
    primary: answer.interest === "dataperu"
      ? { label: `Ver el perfil de ${territory.name}`, href: `/dataperu/departamentos/${territory.code}` }
      : answer.primary
  };
}

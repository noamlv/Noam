export type ServiceLine = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  promise: string;
  description: string;
  outcomes: string[];
  deliverables: string[];
  timeline: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
};

export const serviceLines: ServiceLine[] = [
  {
    slug: "estudios-diagnosticos-evaluacion",
    number: "01",
    title: "Estudios, diagnósticos y evaluación",
    shortTitle: "Entender y priorizar",
    promise: "Comprender problemas, medir resultados y definir prioridades.",
    description:
      "Producimos evidencia útil para decisiones públicas y empresariales: desde una lectura territorial rápida hasta una evaluación integral de programas, mercados o inversiones.",
    outcomes: [
      "Una lectura común del problema y sus causas",
      "Prioridades sustentadas con evidencia",
      "Decisiones defendibles ante equipos y directorios",
      "Una ruta de acción con responsables y plazos"
    ],
    deliverables: [
      "Diagnóstico territorial o institucional",
      "Línea de base e indicadores",
      "Encuesta o estudio de opinión",
      "Evaluación de programa o proyecto",
      "Brief ejecutivo y hoja de ruta"
    ],
    timeline: "Desde 3 semanas",
    image: "/images/noam-field-research.jpg",
    imageAlt: "Equipo de investigación conversando con residentes durante trabajo de campo en una ciudad peruana",
    imageCaption: "Escena editorial representativa de investigación territorial. No corresponde a un cliente."
  },
  {
    slug: "observatorios-sistemas-decision",
    number: "02",
    title: "Observatorios y sistemas de decisión",
    shortTitle: "Monitorear y actuar",
    promise: "Monitorear indicadores, proyectos, presupuesto y servicios.",
    description:
      "Diseñamos sistemas que convierten datos dispersos en señales operativas para la alta dirección, los equipos técnicos y la ciudadanía.",
    outcomes: [
      "Indicadores críticos reunidos en un solo lugar",
      "Alertas tempranas para intervenir a tiempo",
      "Seguimiento visible de compromisos y resultados",
      "Menos trabajo manual para producir reportes"
    ],
    deliverables: [
      "Dashboard ejecutivo",
      "Observatorio temático o territorial",
      "Visor georreferenciado",
      "Sistema de alertas y reportes",
      "Pipeline, catálogo y diccionario de datos"
    ],
    timeline: "Desde 4 semanas",
    image: "/images/noam-decision-room.jpg",
    imageAlt: "Equipo directivo revisando un mapa territorial y señales de gestión en una sala de decisión",
    imageCaption: "Escena editorial representativa de una rutina de decisión. No corresponde a un cliente."
  },
  {
    slug: "ia-transformacion-gestion",
    number: "03",
    title: "IA y transformación de la gestión",
    shortTitle: "Mejorar y escalar",
    promise: "Mejorar procesos concretos mediante datos, automatización e IA responsable.",
    description:
      "Partimos del proceso y del resultado esperado, no de la tecnología. Priorizamos casos viables, controlamos riesgos y construimos pilotos que el equipo puede operar.",
    outcomes: [
      "Casos de uso priorizados por valor y viabilidad",
      "Menos tiempo en tareas documentales repetitivas",
      "Controles claros para datos, riesgos y supervisión",
      "Un piloto medible antes de escalar inversión"
    ],
    deliverables: [
      "Diagnóstico de preparación institucional",
      "Portafolio de casos de uso",
      "Marco de gobernanza y riesgos",
      "Piloto funcional de IA o automatización",
      "Plan de adopción y medición"
    ],
    timeline: "Desde 3 semanas",
    image: "/images/noam-ai-oversight.jpg",
    imageAlt: "Especialistas revisando documentos y un flujo digital con supervisión humana",
    imageCaption: "Escena editorial representativa de un piloto con supervisión humana. No corresponde a un cliente."
  }
];

export const clientSegments = [
  {
    slug: "municipalidades",
    label: "Municipalidades",
    type: "Sector público",
    description: "Soluciones modulares para distritos y provincias que necesitan priorizar, monitorear y mostrar resultados con recursos limitados.",
    needs: ["Perfil territorial", "Cartera de prioridades", "Seguimiento de inversión", "Tablero de servicios"]
  },
  {
    slug: "gobiernos-regionales",
    label: "Gobiernos regionales",
    type: "Sector público",
    description: "Inteligencia para coordinar políticas, inversiones y servicios entre provincias, sectores y unidades ejecutoras.",
    needs: ["Diagnóstico regional", "Observatorio de gestión", "Evaluación de programas", "Alertas territoriales"]
  },
  {
    slug: "gobierno-nacional",
    label: "Gobierno nacional",
    type: "Sector público",
    description: "Sistemas y estudios para programas, ministerios y organismos que necesitan leer implementación y resultados en el territorio.",
    needs: ["Monitoreo nacional", "Evaluación", "Analítica territorial", "Gobernanza de IA"]
  },
  {
    slug: "empresas",
    label: "Empresas",
    type: "Sector privado",
    description: "Evidencia territorial, institucional y de mercado para expansión, inversión, relacionamiento y gestión de riesgos.",
    needs: ["Inteligencia territorial", "Estudios de mercado", "Riesgo institucional", "Dashboards ejecutivos"]
  },
  {
    slug: "organizaciones",
    label: "Cooperación y organizaciones",
    type: "Ecosistema",
    description: "Diseño, seguimiento y evaluación para organizaciones que implementan iniciativas de desarrollo junto al Estado y las comunidades.",
    needs: ["Línea de base", "Monitoreo de proyectos", "Evaluación de impacto", "Visualización pública"]
  }
] as const;

export const publicAgendas = [
  "Planeamiento, presupuesto e inversión",
  "Desarrollo económico y empleo",
  "Seguridad ciudadana y justicia",
  "Desarrollo social, educación y salud",
  "Infraestructura, movilidad y territorio",
  "Ambiente, riesgos y resiliencia",
  "Servicios públicos y experiencia ciudadana",
  "Modernización, datos y gobierno digital"
];

export const privateAgendas = [
  "Inteligencia territorial y expansión",
  "Estudios de mercado y opinión",
  "Entorno público y regulatorio",
  "Localización y priorización de inversiones",
  "Riesgo social y relacionamiento territorial",
  "Impacto, sostenibilidad y evaluación",
  "Monitoreo ejecutivo y alertas",
  "Datos, automatización e IA aplicada"
];

export const publicInstitutionTypes = [
  {
    slug: "municipalidades-distritales",
    label: "Municipalidades distritales",
    description: "Soluciones modulares y sostenibles para equipos pequeños que necesitan ordenar prioridades, inversiones y servicios.",
    entry: "Perfil territorial, diagnóstico rápido o tablero de gestión"
  },
  {
    slug: "municipalidades-provinciales",
    label: "Municipalidades provinciales",
    description: "Lectura integrada de distritos, corredores, servicios e inversiones para coordinar decisiones de alcance provincial.",
    entry: "Agenda provincial, observatorio o sistema de seguimiento"
  },
  {
    slug: "gobiernos-regionales",
    label: "Gobiernos regionales",
    description: "Evidencia para conducir políticas, unidades ejecutoras, proyectos y brechas entre provincias y sectores.",
    entry: "Diagnóstico regional, cartera priorizada u observatorio"
  },
  {
    slug: "entidades-nacionales",
    label: "Entidades y programas nacionales",
    description: "Sistemas y estudios para comprender implementación, cobertura y resultados en territorios diversos.",
    entry: "Monitoreo territorial, evaluación o analítica de programas"
  }
] as const;

export const publicManagementAreas = [
  { title: "Planeamiento e inversión", description: "Prioridades, presupuesto, cartera de proyectos y seguimiento de ejecución." },
  { title: "Desarrollo económico y empleo", description: "Tejido productivo, mercados, capacidades y oportunidades territoriales." },
  { title: "Desarrollo social", description: "Población, brechas, servicios, educación, salud y protección social." },
  { title: "Seguridad y convivencia", description: "Incidencias, percepción, factores de riesgo y respuestas territoriales." },
  { title: "Territorio y resiliencia", description: "Infraestructura, movilidad, ambiente, riesgos y adaptación." },
  { title: "Modernización y servicios", description: "Procesos, experiencia ciudadana, datos, automatización e IA responsable." }
] as const;

export const privateIndustries = [
  {
    slug: "infraestructura-construccion",
    title: "Infraestructura y construcción",
    description: "Localización, inversión pública relacionada, entorno institucional y seguimiento territorial.",
    decisions: ["Priorizar territorios", "Monitorear proyectos", "Anticipar restricciones"]
  },
  {
    slug: "energia-mineria",
    title: "Energía, minería y recursos",
    description: "Contexto territorial, actores, compromisos, riesgos y evidencia para una operación informada.",
    decisions: ["Comprender el entorno", "Gestionar señales", "Medir compromisos"]
  },
  {
    slug: "servicios-publicos",
    title: "Servicios públicos y saneamiento",
    description: "Cobertura, experiencia del usuario, brechas, inversiones y desempeño operativo por territorio.",
    decisions: ["Diagnosticar cobertura", "Escuchar usuarios", "Seguir desempeño"]
  },
  {
    slug: "comercio-expansion",
    title: "Comercio y expansión territorial",
    description: "Demanda, accesibilidad, competencia, condiciones institucionales y escenarios de localización.",
    decisions: ["Seleccionar ciudades", "Segmentar mercados", "Validar expansión"]
  },
  {
    slug: "agroindustria",
    title: "Agroindustria y cadenas productivas",
    description: "Corredores, productores, infraestructura, riesgos climáticos y capacidades públicas locales.",
    decisions: ["Mapear cadenas", "Priorizar zonas", "Evaluar riesgos"]
  },
  {
    slug: "desarrollo-impacto",
    title: "Cooperación, fundaciones e impacto",
    description: "Líneas de base, diseño, monitoreo y evaluación de iniciativas junto al Estado y comunidades.",
    decisions: ["Diseñar intervenciones", "Medir resultados", "Comunicar impacto"]
  }
] as const;

export const engagementScales = [
  {
    number: "01",
    title: "Punto de partida",
    duration: "2 a 4 semanas",
    description: "Un diagnóstico rápido, brief ejecutivo o prototipo para reducir incertidumbre antes de una inversión mayor."
  },
  {
    number: "02",
    title: "Proyecto aplicado",
    duration: "4 a 12 semanas",
    description: "Un estudio, sistema o piloto con alcance, entregables, validación y transferencia claramente definidos."
  },
  {
    number: "03",
    title: "Capacidad continua",
    duration: "Por ciclos",
    description: "Actualización de datos, monitoreo, soporte analítico y mejora continua integrados a la operación."
  }
] as const;

export const deliverySteps = [
  {
    number: "01",
    title: "Definir la decisión",
    description: "Acordamos la pregunta, los usuarios, el resultado esperado y los límites del encargo."
  },
  {
    number: "02",
    title: "Construir evidencia",
    description: "Integramos fuentes públicas, datos institucionales, trabajo de campo y conocimiento experto."
  },
  {
    number: "03",
    title: "Entregar para usar",
    description: "Traducimos el análisis en un informe, tablero, visor, sistema o protocolo realmente operable."
  },
  {
    number: "04",
    title: "Acompañar la acción",
    description: "Transferimos capacidades, medimos adopción y ajustamos la solución con el equipo responsable."
  }
];

export const evidencePrinciples = [
  "Fuentes y supuestos explícitos",
  "Métodos adecuados a la decisión",
  "Trazabilidad de datos y resultados",
  "Diseño comprensible para usuarios no técnicos"
];

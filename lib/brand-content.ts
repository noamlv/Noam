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
      "Estudiamos problemas de una localidad u organización y evaluamos programas, mercados e inversiones. El alcance puede ir desde un diagnóstico rápido hasta una evaluación completa.",
    outcomes: [
      "Una explicación del problema y sus causas",
      "Datos que ayuden a elegir qué atender primero",
      "Argumentos para explicar las decisiones al equipo o directorio",
      "Un plan de trabajo con responsables y plazos"
    ],
    deliverables: [
      "Diagnóstico territorial o institucional",
      "Medición inicial e indicadores para seguir los cambios",
      "Encuesta o estudio de opinión",
      "Evaluación de programa o proyecto",
      "Resumen ejecutivo y plan de trabajo"
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
      "Reunimos datos de distintas fuentes en tableros y reportes para consultar indicadores, seguir proyectos y revisar el uso del presupuesto.",
    outcomes: [
      "Los indicadores que necesita el equipo, reunidos en un solo lugar",
      "Alertas tempranas para intervenir a tiempo",
      "Seguimiento visible de compromisos y resultados",
      "Menos trabajo manual para producir reportes"
    ],
    deliverables: [
      "Tablero de indicadores para la dirección",
      "Observatorio temático o territorial",
      "Mapa interactivo con datos por ubicación",
      "Sistema de alertas y reportes",
      "Proceso de actualización, catálogo de datos y definición de cada campo"
    ],
    timeline: "Desde 4 semanas",
    image: "/images/noam-decision-room.jpg",
    imageAlt: "Equipo directivo revisando un mapa e indicadores de gestión en una sala de reuniones",
    imageCaption: "Escena editorial representativa de una reunión de trabajo. No corresponde a un cliente."
  },
  {
    slug: "ia-transformacion-gestion",
    number: "03",
    title: "IA y transformación de la gestión",
    shortTitle: "Mejorar procesos",
    promise: "Mejorar procesos con datos, automatización e inteligencia artificial (IA) bajo supervisión.",
    description:
      "Revisamos cómo trabaja el equipo y qué necesita mejorar. Elegimos usos viables, definimos controles de riesgo y probamos un piloto que el equipo pueda operar.",
    outcomes: [
      "Usos elegidos según su utilidad y la posibilidad de implementarlos",
      "Menos tiempo en tareas documentales repetitivas",
      "Controles claros para datos, riesgos y supervisión",
      "Una prueba con resultados medibles antes de ampliar la inversión"
    ],
    deliverables: [
      "Revisión de los datos y recursos disponibles para comenzar",
      "Lista de usos propuestos y sus prioridades",
      "Reglas, responsables y controles de riesgo",
      "Piloto funcional de IA o automatización",
      "Plan para incorporar la herramienta y medir su uso"
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
    description: "Estudios y herramientas para que municipios distritales y provinciales elijan prioridades y sigan sus resultados con recursos limitados.",
    needs: ["Perfil del municipio", "Lista de prioridades", "Seguimiento de inversión", "Tablero de servicios"]
  },
  {
    slug: "gobiernos-regionales",
    label: "Gobiernos regionales",
    type: "Sector público",
    description: "Datos y análisis para coordinar políticas, inversiones y servicios entre provincias, sectores y unidades ejecutoras.",
    needs: ["Diagnóstico regional", "Observatorio de gestión", "Evaluación de programas", "Alertas territoriales"]
  },
  {
    slug: "gobierno-nacional",
    label: "Gobierno nacional",
    type: "Sector público",
    description: "Sistemas y estudios para revisar cómo se implementan los programas y qué resultados tienen en distintas zonas del país.",
    needs: ["Seguimiento nacional", "Evaluación de programas", "Análisis por territorio", "Reglas y supervisión de IA"]
  },
  {
    slug: "empresas",
    label: "Empresas",
    type: "Sector privado",
    description: "Estudios de mercados, instituciones y zonas de operación para planear una expansión, evaluar inversiones y gestionar riesgos y relaciones locales.",
    needs: ["Análisis del territorio", "Estudios de mercado", "Riesgo institucional", "Tableros para la dirección"]
  },
  {
    slug: "organizaciones",
    label: "Cooperación y organizaciones",
    type: "Cooperación y organizaciones",
    description: "Diseño, seguimiento y evaluación para organizaciones que implementan iniciativas de desarrollo junto al Estado y las comunidades.",
    needs: ["Medición inicial", "Seguimiento de proyectos", "Evaluación de impacto", "Gráficos y mapas públicos"]
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
  "Estudio del territorio para la expansión",
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
    description: "Estudios y herramientas para equipos pequeños que necesitan elegir prioridades y organizar inversiones y servicios.",
    entry: "Perfil territorial, diagnóstico rápido o tablero de gestión"
  },
  {
    slug: "municipalidades-provinciales",
    label: "Municipalidades provinciales",
    description: "Analizamos los distritos, sus conexiones, servicios e inversiones para coordinar el trabajo de la provincia.",
    entry: "Agenda provincial, observatorio o sistema de seguimiento"
  },
  {
    slug: "gobiernos-regionales",
    label: "Gobiernos regionales",
    description: "Datos para coordinar políticas y proyectos entre unidades ejecutoras, y atender diferencias en el acceso a servicios entre provincias y sectores.",
    entry: "Diagnóstico regional, cartera priorizada u observatorio"
  },
  {
    slug: "entidades-nacionales",
    label: "Entidades y programas nacionales",
    description: "Sistemas y estudios para revisar cómo se implementa un programa, a quiénes llega y qué resultados tiene en distintos territorios.",
    entry: "Monitoreo territorial, evaluación o analítica de programas"
  }
] as const;

export const publicManagementAreas = [
  { title: "Planeamiento e inversión", description: "Elegir prioridades, organizar el presupuesto y seguir la ejecución de proyectos." },
  { title: "Desarrollo económico y empleo", description: "Conocer la actividad productiva, los mercados y las oportunidades de cada territorio." },
  { title: "Desarrollo social", description: "Estudiar las necesidades de la población y su acceso a educación, salud y protección social." },
  { title: "Seguridad y convivencia", description: "Revisar incidentes, percepción de seguridad y riesgos para orientar las respuestas locales." },
  { title: "Territorio y resiliencia", description: "Estudiar la infraestructura, la movilidad y el ambiente para gestionar riesgos y adaptarse a ellos." },
  { title: "Modernización y servicios", description: "Revisar la atención a la ciudadanía y mejorar procesos con datos, automatización e IA bajo supervisión." }
] as const;

export const privateIndustries = [
  {
    slug: "infraestructura-construccion",
    title: "Infraestructura y construcción",
    description: "Estudiamos dónde ubicar un proyecto, qué inversión pública se relaciona con él y qué instituciones intervienen, y seguimos su entorno local.",
    decisions: ["Priorizar territorios", "Monitorear proyectos", "Anticipar restricciones"]
  },
  {
    slug: "energia-mineria",
    title: "Energía, minería y recursos",
    description: "Estudiamos las zonas de operación, las personas e instituciones involucradas, los compromisos y los riesgos.",
    decisions: ["Comprender el entorno", "Seguir riesgos", "Revisar compromisos"]
  },
  {
    slug: "servicios-publicos",
    title: "Servicios públicos y saneamiento",
    description: "Revisamos a quién llega el servicio, cómo lo viven los usuarios, qué falta cubrir y cómo funcionan las inversiones y la operación en cada lugar.",
    decisions: ["Diagnosticar cobertura", "Escuchar usuarios", "Seguir desempeño"]
  },
  {
    slug: "comercio-expansion",
    title: "Comercio y expansión territorial",
    description: "Comparamos posibles ubicaciones según la demanda, el acceso, la competencia y las condiciones institucionales.",
    decisions: ["Seleccionar ciudades", "Segmentar mercados", "Validar expansión"]
  },
  {
    slug: "agroindustria",
    title: "Agroindustria y cadenas productivas",
    description: "Estudiamos las conexiones entre productores, la infraestructura disponible, los riesgos climáticos y las capacidades de las entidades locales.",
    decisions: ["Mapear cadenas", "Priorizar zonas", "Evaluar riesgos"]
  },
  {
    slug: "desarrollo-impacto",
    title: "Cooperación, fundaciones e impacto",
    description: "Medimos la situación inicial y apoyamos el diseño, seguimiento y evaluación de iniciativas junto al Estado y las comunidades.",
    decisions: ["Diseñar intervenciones", "Medir resultados", "Comunicar impacto"]
  }
] as const;

export const engagementScales = [
  {
    number: "01",
    title: "Punto de partida",
    duration: "2 a 4 semanas",
    description: "Un diagnóstico rápido, resumen ejecutivo o prototipo para aclarar dudas antes de una inversión mayor."
  },
  {
    number: "02",
    title: "Proyecto aplicado",
    duration: "4 a 12 semanas",
    description: "Un estudio, sistema o piloto con acuerdos sobre qué incluye, qué se entrega, cómo se revisa y cómo se transfiere al equipo."
  },
  {
    number: "03",
    title: "Apoyo continuo",
    duration: "Por ciclos",
    description: "Actualizamos datos, seguimos indicadores y apoyamos al equipo con análisis y mejoras durante la operación."
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
    title: "Reunir y analizar la información",
    description: "Integramos fuentes públicas, datos institucionales, trabajo de campo y conocimiento experto."
  },
  {
    number: "03",
    title: "Entregar el estudio o la herramienta",
    description: "Preparamos un informe, tablero, mapa, sistema o protocolo que el equipo pueda usar."
  },
  {
    number: "04",
    title: "Acompañar al equipo",
    description: "Enseñamos a usar lo entregado, revisamos su uso y hacemos ajustes con el equipo responsable."
  }
];

export const evidencePrinciples = [
  "Indicamos las fuentes y los supuestos del análisis",
  "Elegimos métodos adecuados a la pregunta",
  "Documentamos de dónde viene cada dato y cómo se obtiene cada resultado",
  "Presentamos los resultados para que puedan entenderse sin conocimientos técnicos"
];

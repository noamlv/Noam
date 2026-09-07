export const solutionSlugs = [
  "diagnostico-agenda-territorial",
  "observatorio-gestion-inversiones",
  "encuestas-escucha-ciudadana",
  "ia-procesos-publicos",
  "inteligencia-territorial-inversion",
  "monitoreo-entorno-impacto",
  "linea-base-evaluacion-programas"
] as const;

export type SolutionSlug = (typeof solutionSlugs)[number];
export type SolutionMarket = "Gobiernos" | "Empresas" | "Gobiernos y empresas";

export type Solution = {
  slug: SolutionSlug;
  number: string;
  market: SolutionMarket;
  title: string;
  shortTitle: string;
  promise: string;
  description: string;
  duration: string;
  serviceSlug: string;
  accent: string;
  situations: string[];
  outcomes: string[];
  deliverables: string[];
  phases: Array<{ title: string; description: string }>;
  evidence: Array<{ label: string; href: string }>;
};

export const solutions: Solution[] = [
  {
    slug: "diagnostico-agenda-territorial",
    number: "01",
    market: "Gobiernos",
    title: "Diagnóstico y agenda territorial",
    shortTitle: "Diagnóstico territorial",
    promise: "Una lectura compartida del territorio y una cartera priorizada para actuar.",
    description: "Integramos datos públicos, instrumentos de gestión, presupuesto, entrevistas y evidencia territorial para convertir problemas dispersos en prioridades verificables.",
    duration: "4 a 8 semanas",
    serviceSlug: "estudios-diagnosticos-evaluacion",
    accent: "#b95337",
    situations: [
      "Inicio de gestión, transferencia o agenda de primeros 100 días",
      "Actualización de prioridades, planes o cartera de inversiones",
      "Problemas territoriales sin una explicación compartida",
      "Necesidad de sustentar decisiones ante autoridades y equipos"
    ],
    outcomes: [
      "Problemas y brechas organizados por territorio y población",
      "Criterios transparentes para priorizar",
      "Cartera de acciones con responsables y horizonte",
      "Brief ejecutivo para conducción política y técnica"
    ],
    deliverables: [
      "Perfil territorial y línea de base",
      "Mapa de problemas, causas y actores",
      "Matriz multicriterio de prioridades",
      "Cartera de acciones y agenda de 100 días",
      "Informe técnico, brief y sesión ejecutiva"
    ],
    phases: [
      { title: "Enfocar", description: "Definimos decisiones, usuarios, territorio y criterios de éxito." },
      { title: "Integrar", description: "Cruzamos fuentes públicas, datos internos y conocimiento local." },
      { title: "Priorizar", description: "Contrastamos causas, restricciones, riesgos y alternativas." },
      { title: "Activar", description: "Entregamos una agenda usable y transferimos el método al equipo." }
    ],
    evidence: [
      { label: "Qué debe entregar un diagnóstico territorial", href: "/insights/diagnostico-territorial-que-debe-entregar" },
      { label: "Matriz para priorizar una agenda de 100 días", href: "/toolkits/matriz-prioridades-100-dias" },
      { label: "Explorar perfiles municipales", href: "/dataperu/municipios" }
    ]
  },
  {
    slug: "observatorio-gestion-inversiones",
    number: "02",
    market: "Gobiernos",
    title: "Observatorio de gestión e inversiones",
    shortTitle: "Observatorio de gestión",
    promise: "Indicadores, proyectos y alertas reunidos para conducir la gestión.",
    description: "Diseñamos un sistema de seguimiento que conecta presupuesto, proyectos, servicios y compromisos con responsables, reglas de actualización y reuniones de decisión.",
    duration: "6 a 12 semanas",
    serviceSlug: "observatorios-sistemas-decision",
    accent: "#2f5c52",
    situations: [
      "Reportes dispersos que llegan tarde a la alta dirección",
      "Carteras de inversión sin una lectura común de hitos y riesgos",
      "Compromisos sin responsables o evidencia de avance",
      "Necesidad de informar resultados a ciudadanía o directorio"
    ],
    outcomes: [
      "Una definición compartida de indicadores críticos",
      "Alertas tempranas y responsables visibles",
      "Menos trabajo manual para preparar reportes",
      "Rutinas de gestión apoyadas por evidencia actualizada"
    ],
    deliverables: [
      "Mapa de decisiones y usuarios",
      "Catálogo y diccionario de indicadores",
      "Dashboard ejecutivo y vistas operativas",
      "Alertas, reportes y protocolo de actualización",
      "Gobernanza de datos y transferencia técnica"
    ],
    phases: [
      { title: "Decisiones", description: "Identificamos preguntas, reuniones y acciones que el sistema debe habilitar." },
      { title: "Datos", description: "Auditamos fuentes, reglas, responsables y calidad mínima." },
      { title: "Producto", description: "Prototipamos, probamos y construimos vistas por tipo de usuario." },
      { title: "Operación", description: "Instalamos rutinas, documentación y capacidades de mantenimiento." }
    ],
    evidence: [
      { label: "Un sistema municipal no es solo un dashboard", href: "/insights/sistema-seguimiento-municipal-no-es-dashboard" },
      { label: "DataPerú: proyectos y ejecución municipal", href: "/dataperu/municipios" },
      { label: "Ver productos y demostraciones", href: "/products" }
    ]
  },
  {
    slug: "encuestas-escucha-ciudadana",
    number: "03",
    market: "Gobiernos y empresas",
    title: "Encuestas y escucha territorial",
    shortTitle: "Encuestas y escucha",
    promise: "Comprender percepciones, experiencias y prioridades sin confundir ruido con evidencia.",
    description: "Diseñamos estudios cuantitativos y cualitativos para conocer población, usuarios, clientes o actores territoriales y conectar sus respuestas con decisiones concretas.",
    duration: "4 a 10 semanas",
    serviceSlug: "estudios-diagnosticos-evaluacion",
    accent: "#8a623d",
    situations: [
      "Prioridades públicas o de mercado basadas solo en intuición",
      "Necesidad de medir satisfacción, experiencia o confianza",
      "Cambios de opinión que requieren explicación por segmentos",
      "Programas o servicios que necesitan una línea de base"
    ],
    outcomes: [
      "Preguntas alineadas con decisiones reales",
      "Muestra y método documentados",
      "Segmentos y patrones interpretables",
      "Recomendaciones que distinguen señal, incertidumbre y límite"
    ],
    deliverables: [
      "Diseño metodológico y cuestionario",
      "Trabajo de campo o integración de fuentes",
      "Base anonimizada y diccionario",
      "Análisis, segmentación y visualizaciones",
      "Informe, presentación y brief ejecutivo"
    ],
    phases: [
      { title: "Preguntar", description: "Traducimos la decisión en hipótesis, población y variables observables." },
      { title: "Medir", description: "Diseñamos instrumento, muestra, campo y controles de calidad." },
      { title: "Explicar", description: "Analizamos diferencias, segmentos, relaciones e incertidumbre." },
      { title: "Decidir", description: "Convertimos resultados en implicancias y próximos experimentos." }
    ],
    evidence: [
      { label: "Barómetro electoral: demostración", href: "/electoral/barometro-enero-2026" },
      { label: "Guía para diseñar una encuesta que sirva para decidir", href: "/toolkits/diseno-encuesta-para-decidir" },
      { label: "Estudios, diagnósticos y evaluación", href: "/services/estudios-diagnosticos-evaluacion" }
    ]
  },
  {
    slug: "ia-procesos-publicos",
    number: "04",
    market: "Gobiernos",
    title: "IA para procesos públicos",
    shortTitle: "IA para la gestión",
    promise: "Un proceso concreto, un piloto controlado y evidencia antes de escalar.",
    description: "Priorizamos casos de uso viables para documentos, búsqueda, atención, clasificación o alertas; diseñamos controles y construimos un piloto que el equipo puede evaluar.",
    duration: "4 a 8 semanas",
    serviceSlug: "ia-transformacion-gestion",
    accent: "#475c63",
    situations: [
      "Equipos saturados por lectura, clasificación o redacción repetitiva",
      "Documentos y conocimiento institucional difíciles de encontrar",
      "Interés en IA sin un caso de uso ni control de riesgos",
      "Necesidad de demostrar valor antes de una inversión mayor"
    ],
    outcomes: [
      "Casos priorizados por valor, riesgo y viabilidad",
      "Proceso objetivo y línea de base documentados",
      "Piloto funcional con supervisión humana",
      "Decisión informada para detener, ajustar o escalar"
    ],
    deliverables: [
      "Diagnóstico de preparación y datos",
      "Portafolio priorizado de casos de uso",
      "Mapa de riesgos y controles",
      "Piloto funcional y protocolo de pruebas",
      "Plan de adopción, medición y escalamiento"
    ],
    phases: [
      { title: "Seleccionar", description: "Comparamos valor público, complejidad, datos y exposición al riesgo." },
      { title: "Controlar", description: "Definimos privacidad, seguridad, supervisión y criterios de rechazo." },
      { title: "Probar", description: "Construimos un piloto acotado y medimos calidad, tiempo y errores." },
      { title: "Escalar", description: "Documentamos arquitectura, gobernanza y condiciones de adopción." }
    ],
    evidence: [
      { label: "Laboratorio de casos de uso de IA", href: "/products/ai-governance-lab" },
      { label: "IA en gobiernos locales: cinco casos viables", href: "/insights/ia-gobiernos-locales-casos-viables" },
      { label: "Playbook de gobernanza de IA", href: "/toolkits/ai-governance-playbook" },
      { label: "IA y transformación de la gestión", href: "/services/ia-transformacion-gestion" }
    ]
  },
  {
    slug: "inteligencia-territorial-inversion",
    number: "05",
    market: "Empresas",
    title: "Inteligencia territorial para inversión",
    shortTitle: "Inteligencia para inversión",
    promise: "Comparar territorios y oportunidades con una lectura integrada de mercado, Estado y sociedad.",
    description: "Construimos perfiles y modelos de priorización para expansión, localización o inversión, combinando demanda, infraestructura, instituciones, riesgos y condiciones territoriales.",
    duration: "4 a 10 semanas",
    serviceSlug: "estudios-diagnosticos-evaluacion",
    accent: "#a17a24",
    situations: [
      "Selección de ciudades, zonas o corredores para crecer",
      "Evaluación inicial de una inversión o infraestructura",
      "Información territorial fragmentada entre múltiples fuentes",
      "Necesidad de explicar una recomendación ante un comité"
    ],
    outcomes: [
      "Criterios de decisión explícitos y ponderables",
      "Territorios comparados con información trazable",
      "Riesgos, vacíos de información y supuestos visibles",
      "Recomendación defendible y próximos pasos de validación"
    ],
    deliverables: [
      "Marco de criterios y variables",
      "Base territorial integrada",
      "Perfiles, mapas y comparador",
      "Escenarios y análisis de sensibilidad",
      "Recomendación ejecutiva y plan de validación"
    ],
    phases: [
      { title: "Criterios", description: "Definimos qué hace viable y valiosa una localización para la decisión." },
      { title: "Territorios", description: "Integramos demanda, oferta, infraestructura, Estado y entorno social." },
      { title: "Escenarios", description: "Comparamos opciones y probamos sensibilidad a supuestos clave." },
      { title: "Validación", description: "Priorizamos información primaria y diligencias antes de comprometer inversión." }
    ],
    evidence: [
      { label: "Cómo evaluar un territorio antes de invertir", href: "/insights/evaluar-territorio-antes-invertir" },
      { label: "Ficha de decisión territorial para empresas", href: "/toolkits/ficha-decision-territorial-empresas" },
      { label: "Caso DataPerú", href: "/cases/dataperu-platform-case" }
    ]
  },
  {
    slug: "monitoreo-entorno-impacto",
    number: "06",
    market: "Empresas",
    title: "Monitoreo de entorno e impacto",
    shortTitle: "Entorno e impacto",
    promise: "Señales tempranas sobre instituciones, territorio, actores y compromisos.",
    description: "Diseñamos un sistema de información para seguir cambios públicos, sociales, regulatorios o territoriales y conectar alertas con decisiones y responsables internos.",
    duration: "6 a 12 semanas",
    serviceSlug: "observatorios-sistemas-decision",
    accent: "#62724d",
    situations: [
      "Operaciones expuestas a cambios institucionales o territoriales",
      "Compromisos sociales y ambientales difíciles de seguir",
      "Información crítica distribuida entre áreas y proveedores",
      "Necesidad de reportar riesgos e impacto a la dirección"
    ],
    outcomes: [
      "Temas, actores y señales críticas definidos",
      "Alertas conectadas con responsables y protocolos",
      "Trazabilidad de compromisos e indicadores",
      "Una lectura ejecutiva periódica y comparable"
    ],
    deliverables: [
      "Mapa de riesgos, actores y decisiones",
      "Taxonomía de señales e indicadores",
      "Dashboard y fichas territoriales",
      "Alertas y protocolo de escalamiento",
      "Reporte ejecutivo y gobierno del sistema"
    ],
    phases: [
      { title: "Enmarcar", description: "Acordamos decisiones, exposición, actores y horizonte de monitoreo." },
      { title: "Detectar", description: "Diseñamos fuentes, indicadores, eventos y reglas de alerta." },
      { title: "Conectar", description: "Vinculamos cada señal con responsables, contexto y evidencia." },
      { title: "Operar", description: "Instalamos reportes, reuniones y criterios de revisión continua." }
    ],
    evidence: [
      { label: "Un sistema de seguimiento no es solo un dashboard", href: "/insights/sistema-seguimiento-municipal-no-es-dashboard" },
      { label: "Observatorios y sistemas de decisión", href: "/services/observatorios-sistemas-decision" },
      { label: "Biblioteca de evidencia", href: "/evidence" }
    ]
  },
  {
    slug: "linea-base-evaluacion-programas",
    number: "07",
    market: "Gobiernos y empresas",
    title: "Línea de base y evaluación de programas",
    shortTitle: "Línea de base y evaluación",
    promise: "Medir el punto de partida, comprender la implementación y decidir qué debe cambiar.",
    description: "Diseñamos líneas de base y evaluaciones para programas, proyectos, políticas e iniciativas de impacto. Definimos preguntas, indicadores y comparaciones que la evidencia disponible puede sostener.",
    duration: "6 a 14 semanas",
    serviceSlug: "estudios-diagnosticos-evaluacion",
    accent: "#7c523f",
    situations: [
      "Un programa comienza y necesita una medición inicial útil",
      "La dirección necesita saber qué resultados están cambiando y para quién",
      "La implementación presenta diferencias entre territorios o unidades",
      "Una decisión de continuidad, rediseño o escala requiere evidencia defendible"
    ],
    outcomes: [
      "Preguntas de evaluación conectadas con decisiones reales",
      "Indicadores con definiciones, fuentes y limitaciones visibles",
      "Una estrategia de comparación proporcional a los datos disponibles",
      "Recomendaciones que distinguen resultados, implementación e incertidumbre"
    ],
    deliverables: [
      "Teoría de cambio y matriz de preguntas",
      "Línea de base, indicadores y ficha metodológica",
      "Diseño de evaluación y plan de análisis",
      "Informe de resultados e implementación",
      "Brief ejecutivo con decisiones y agenda de aprendizaje"
    ],
    phases: [
      { title: "Enmarcar", description: "Acordamos la decisión, la teoría de cambio, la población y las preguntas evaluables." },
      { title: "Medir", description: "Definimos indicadores, fuentes, instrumentos, calidad y línea de base." },
      { title: "Comparar", description: "Seleccionamos una estrategia de análisis viable y hacemos explícitos sus supuestos." },
      { title: "Aprender", description: "Conectamos resultados e implementación con decisiones de corrección, continuidad o escala." }
    ],
    evidence: [
      { label: "Cómo diseñar la línea de base de un programa público", href: "/insights/como-disenar-linea-base-programa-publico" },
      { label: "Cuándo una evaluación de impacto es viable", href: "/insights/cuando-evaluacion-impacto-es-viable" },
      { label: "Matriz editable de línea de base", href: "/downloads/matriz-linea-base.csv" },
      { label: "Estudios, diagnósticos y evaluación", href: "/services/estudios-diagnosticos-evaluacion" }
    ]
  }
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}

export function getSolutionsForMarket(market: "public" | "private") {
  return solutions.filter((solution) => market === "public"
    ? solution.market === "Gobiernos" || solution.market === "Gobiernos y empresas"
    : solution.market === "Empresas" || solution.market === "Gobiernos y empresas");
}

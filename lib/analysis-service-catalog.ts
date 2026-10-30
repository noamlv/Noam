export type AnalysisServiceEntry = {
  slug: string;
  title: string;
  description: string;
  href: string;
  label: string;
};

export const analysisNeedPaths: AnalysisServiceEntry[] = [
  { slug: "diagnostico", title: "Comprender un problema o territorio", description: "Conocer el problema, a quién afecta y qué información falta para decidir cómo abordarlo.", href: "/diagnostico-territorial", label: "Diagnósticos" },
  { slug: "evaluacion", title: "Medir un programa, proyecto o política", description: "Revisar cómo funciona un programa y qué resultados obtiene.", href: "/linea-base-evaluacion-impacto", label: "Evaluación" },
  { slug: "encuestas", title: "Escuchar población, usuarios o clientes", description: "Conocer las necesidades, opiniones y experiencias de vecinos, usuarios o clientes.", href: "/encuestas-estudios-opinion", label: "Encuestas" },
  { slug: "sistemas", title: "Monitorear gestión, inversión o servicios", description: "Consultar indicadores y mapas para seguir proyectos, presupuestos o servicios.", href: "/observatorios-dashboards-visores", label: "Sistemas" },
  { slug: "ia", title: "Mejorar un proceso con automatización o IA", description: "Probar mejoras en tareas concretas, con protección de datos y revisión humana.", href: "/ia-automatizacion-gobiernos-empresas", label: "IA aplicada" },
  { slug: "mercado", title: "Evaluar un mercado, localización o inversión", description: "Conocer clientes, comparar ubicaciones y estudiar una oportunidad de negocio.", href: "/estudios-mercado-inteligencia-territorial", label: "Mercado" }
];

export const sectorAnalysisPaths: AnalysisServiceEntry[] = [
  { slug: "agua-saneamiento", title: "Agua y saneamiento", description: "Revisar dónde falta agua, la continuidad del servicio y su calidad.", href: "/analisis-datos-agua-saneamiento", label: "Servicios básicos" },
  { slug: "movilidad-transporte", title: "Movilidad y transporte", description: "Entender los viajes, los tiempos de traslado y la seguridad de las vías.", href: "/analisis-datos-movilidad-transporte", label: "Ciudades" },
  { slug: "catastro-desarrollo-urbano", title: "Catastro y desarrollo urbano", description: "Usar información de predios, servicios y crecimiento urbano para planificar la ciudad.", href: "/analisis-catastro-desarrollo-urbano-territorial", label: "Territorio urbano" },
  { slug: "politicas-sociales", title: "Políticas y programas sociales", description: "Conocer quién necesita apoyo, quién accede a los programas y qué resultados obtiene.", href: "/analisis-datos-politicas-sociales", label: "Inclusión" },
  { slug: "salud-territorial", title: "Salud territorial", description: "Estudiar el acceso a la atención y la capacidad de los servicios de salud.", href: "/analisis-datos-salud-territorial", label: "Salud" },
  { slug: "educacion-territorial", title: "Educación territorial", description: "Revisar acceso a la escuela, asistencia, aprendizajes y condiciones para estudiar.", href: "/analisis-datos-educacion-territorial", label: "Educación" },
  { slug: "inversion-publica-proyectos", title: "Inversión pública y proyectos", description: "Seguir el presupuesto, el avance de las obras y los problemas que retrasan los proyectos.", href: "/analisis-inversion-publica-proyectos", label: "Inversión pública" },
  { slug: "contrataciones-publicas-proveedores", title: "Contrataciones públicas y proveedores", description: "Analizar qué compra el Estado, quiénes participan y cómo se cumplen los contratos.", href: "/analisis-contrataciones-publicas-proveedores", label: "Compras públicas" },
  { slug: "seguridad-ciudadana", title: "Seguridad ciudadana", description: "Estudiar delitos, experiencias de la población y acciones de prevención.", href: "/analisis-datos-seguridad-ciudadana", label: "Convivencia" },
  { slug: "residuos", title: "Residuos y limpieza pública", description: "Revisar la recolección, los recorridos, los costos y el destino de la basura.", href: "/analisis-datos-residuos-limpieza-publica", label: "Servicios locales" },
  { slug: "riesgo", title: "Gestión del riesgo de desastres", description: "Identificar zonas expuestas a desastres y preparar medidas de prevención y respuesta.", href: "/analisis-datos-gestion-riesgo-desastres", label: "Resiliencia" },
  { slug: "desarrollo-economico", title: "Desarrollo económico local", description: "Conocer los negocios y el empleo local, sus dificultades y oportunidades.", href: "/analisis-datos-desarrollo-economico-local", label: "Economía local" },
  { slug: "gestion-ambiental", title: "Gestión ambiental", description: "Revisar problemas de contaminación, registros de monitoreo y medidas de protección ambiental.", href: "/analisis-datos-gestion-ambiental", label: "Ambiente" }
];

export const publicAnalysisAgenda: AnalysisServiceEntry[] = [
  { slug: "planeamiento-inversion", title: "Planeamiento e inversión", description: "Brechas, prioridades, cartera, presupuesto y seguimiento territorial.", href: "/diagnostico-territorial", label: "Gestión pública" },
  { slug: "programas-politicas", title: "Programas y políticas", description: "Diseño, indicadores, línea de base, implementación, resultados e impacto.", href: "/linea-base-evaluacion-impacto", label: "Evaluación" },
  { slug: "escucha-ciudadana", title: "Ciudadanía y usuarios", description: "Necesidades, percepción, experiencia, satisfacción y participación.", href: "/encuestas-estudios-opinion", label: "Escucha" },
  ...sectorAnalysisPaths,
  { slug: "datos-seguimiento", title: "Datos y seguimiento", description: "Observatorios, tableros, visores, alertas y salas de decisión.", href: "/observatorios-dashboards-visores", label: "Sistemas" },
  { slug: "modernizacion-ia", title: "Modernización e IA", description: "Procesos, documentos, automatización, asistentes y controles responsables.", href: "/ia-automatizacion-gobiernos-empresas", label: "Transformación" }
];

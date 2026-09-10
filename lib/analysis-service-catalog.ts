export type AnalysisServiceEntry = {
  slug: string;
  title: string;
  description: string;
  href: string;
  label: string;
};

export const analysisNeedPaths: AnalysisServiceEntry[] = [
  { slug: "diagnostico", title: "Comprender un problema o territorio", description: "Diagnósticos, brechas, causas, prioridades y agendas para decidir.", href: "/diagnostico-territorial", label: "Diagnósticos" },
  { slug: "evaluacion", title: "Medir un programa, proyecto o política", description: "Evaluabilidad, línea de base y evaluaciones de diseño, proceso, resultados o impacto.", href: "/linea-base-evaluacion-impacto", label: "Evaluación" },
  { slug: "encuestas", title: "Escuchar población, usuarios o clientes", description: "Encuestas, satisfacción, experiencia, opinión y segmentación con inferencias claras.", href: "/encuestas-estudios-opinion", label: "Encuestas" },
  { slug: "sistemas", title: "Monitorear gestión, inversión o servicios", description: "Observatorios, dashboards, visores, alertas y rutinas de decisión.", href: "/observatorios-dashboards-visores", label: "Sistemas" },
  { slug: "ia", title: "Mejorar un proceso con automatización o IA", description: "Casos priorizados, pilotos, controles, supervisión y medición antes de escalar.", href: "/ia-automatizacion-gobiernos-empresas", label: "IA aplicada" },
  { slug: "mercado", title: "Evaluar un mercado, localización o inversión", description: "Demanda, clientes, cadenas, territorios, escenarios y diligencias.", href: "/estudios-mercado-inteligencia-territorial", label: "Mercado" }
];

export const sectorAnalysisPaths: AnalysisServiceEntry[] = [
  { slug: "agua-saneamiento", title: "Agua y saneamiento", description: "Acceso, calidad, continuidad, prestación rural, inversiones y sostenibilidad.", href: "/analisis-datos-agua-saneamiento", label: "Servicios básicos" },
  { slug: "movilidad-transporte", title: "Movilidad y transporte", description: "Viajes, transporte público, seguridad vial, accesibilidad e inversiones urbanas.", href: "/analisis-datos-movilidad-transporte", label: "Ciudades" },
  { slug: "politicas-sociales", title: "Políticas y programas sociales", description: "Necesidades, focalización, acceso, prestación, articulación y resultados.", href: "/analisis-datos-politicas-sociales", label: "Inclusión" },
  { slug: "salud-territorial", title: "Salud territorial", description: "Necesidades, acceso, redes, capacidad, vigilancia, calidad y evaluación.", href: "/analisis-datos-salud-territorial", label: "Salud" },
  { slug: "educacion-territorial", title: "Educación territorial", description: "Acceso, asistencia, trayectorias, aprendizajes, condiciones del servicio y evaluación.", href: "/analisis-datos-educacion-territorial", label: "Educación" },
  { slug: "inversion-publica-proyectos", title: "Inversión pública y proyectos", description: "Cartera, presupuesto, avance físico, hitos, contratos, riesgos y operación.", href: "/analisis-inversion-publica-proyectos", label: "Inversión pública" },
  { slug: "contrataciones-publicas-proveedores", title: "Contrataciones públicas y proveedores", description: "Demanda, procedimientos, competencia, mercado proveedor, contratos y oportunidades.", href: "/analisis-contrataciones-publicas-proveedores", label: "Compras públicas" },
  { slug: "seguridad-ciudadana", title: "Seguridad ciudadana", description: "Diagnóstico, victimización, percepción, focalización, observatorios y evaluación.", href: "/analisis-datos-seguridad-ciudadana", label: "Convivencia" },
  { slug: "residuos", title: "Residuos y limpieza pública", description: "Cobertura, rutas, costos, valorización, infraestructura y desempeño del servicio.", href: "/analisis-datos-residuos-limpieza-publica", label: "Servicios locales" },
  { slug: "riesgo", title: "Gestión del riesgo de desastres", description: "Escenarios, PPRRD, continuidad, COEL, alertas y evaluación de respuesta.", href: "/analisis-datos-gestion-riesgo-desastres", label: "Resiliencia" },
  { slug: "desarrollo-economico", title: "Desarrollo económico local", description: "Tejido productivo, empleo, cadenas, mercados, barreras y agenda territorial.", href: "/analisis-datos-desarrollo-economico-local", label: "Economía local" },
  { slug: "gestion-ambiental", title: "Gestión ambiental", description: "Presiones, monitoreo, instrumentos, fiscalización y resultados ambientales.", href: "/analisis-datos-gestion-ambiental", label: "Ambiente" }
];

export const publicAnalysisAgenda: AnalysisServiceEntry[] = [
  { slug: "planeamiento-inversion", title: "Planeamiento e inversión", description: "Brechas, prioridades, cartera, presupuesto y seguimiento territorial.", href: "/diagnostico-territorial", label: "Gestión pública" },
  { slug: "programas-politicas", title: "Programas y políticas", description: "Diseño, indicadores, línea de base, implementación, resultados e impacto.", href: "/linea-base-evaluacion-impacto", label: "Evaluación" },
  { slug: "escucha-ciudadana", title: "Ciudadanía y usuarios", description: "Necesidades, percepción, experiencia, satisfacción y participación.", href: "/encuestas-estudios-opinion", label: "Escucha" },
  ...sectorAnalysisPaths,
  { slug: "datos-seguimiento", title: "Datos y seguimiento", description: "Observatorios, tableros, visores, alertas y salas de decisión.", href: "/observatorios-dashboards-visores", label: "Sistemas" },
  { slug: "modernizacion-ia", title: "Modernización e IA", description: "Procesos, documentos, automatización, asistentes y controles responsables.", href: "/ia-automatizacion-gobiernos-empresas", label: "Transformación" }
];

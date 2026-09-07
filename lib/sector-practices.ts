import type { SolutionSlug } from "@/lib/solutions";

export type SectorMarket = "public" | "private";

export type SectorPractice = {
  slug: string;
  market: SectorMarket;
  eyebrow: string;
  title: string;
  promise: string;
  description: string;
  image: string;
  imageAlt: string;
  accent: string;
  decisions: string[];
  realities: Array<{ title: string; description: string }>;
  outcomes: string[];
  deliverables: string[];
  solutionSlugs: SolutionSlug[];
  evidence: Array<{ label: string; href: string; type: string }>;
};

export const publicPractices: SectorPractice[] = [
  {
    slug: "municipalidades-distritales",
    market: "public",
    eyebrow: "Gobiernos locales",
    title: "Inteligencia para municipalidades distritales",
    promise: "Un sistema de gestión que cabe en la capacidad real del equipo.",
    description: "Ayudamos a ordenar información, prioridades e inversiones sin exigir una gran oficina de datos. Podemos comenzar con fuentes públicas y concentrarnos en una decisión que produzca valor visible.",
    image: "/images/noam-public-sector.jpg",
    imageAlt: "Equipo municipal trabajando sobre mapas y documentos territoriales",
    accent: "#b95337",
    decisions: ["¿Qué problemas requieren atención inmediata?", "¿Qué proyectos deben destrabarse primero?", "¿Qué información necesita semanalmente la alcaldía?", "¿Cómo mostrar avances sin producir reportes manuales?"],
    realities: [
      { title: "Equipos pequeños", description: "El sistema debe reducir carga operativa, no crear una nueva obligación imposible de mantener." },
      { title: "Información dispersa", description: "Presupuesto, proyectos, servicios y documentos suelen vivir en archivos y plataformas separadas." },
      { title: "Demandas inmediatas", description: "La gestión necesita equilibrar urgencias ciudadanas con prioridades de mediano plazo." }
    ],
    outcomes: ["Agenda breve de prioridades con responsables", "Lectura territorial común para autoridad y equipo", "Seguimiento simple de inversión y servicios", "Evidencia lista para comunicar decisiones"],
    deliverables: ["Perfil distrital y línea de base", "Matriz de prioridades", "Tablero ejecutivo modular", "Cartera de proyectos con alertas", "Brief para alcaldía y concejo"],
    solutionSlugs: ["diagnostico-agenda-territorial", "transferencia-gestion-100-dias", "observatorio-gestion-inversiones", "ia-procesos-publicos"],
    evidence: [
      { label: "Explorar los perfiles municipales de DataPerú", href: "/dataperu/municipios", type: "Producto abierto" },
      { label: "Checklist para un diagnóstico municipal", href: "/toolkits/checklist-diagnostico-municipal", type: "Toolkit" },
      { label: "Un sistema municipal no es solo un dashboard", href: "/insights/sistema-seguimiento-municipal-no-es-dashboard", type: "Insight" }
    ]
  },
  {
    slug: "municipalidades-provinciales",
    market: "public",
    eyebrow: "Gobiernos locales",
    title: "Decisiones de alcance provincial",
    promise: "Coordinar distritos, servicios e inversiones con una lectura compartida.",
    description: "Una provincia concentra relaciones funcionales que no terminan en un límite distrital: movilidad, residuos, mercados, seguridad, vías y actividad económica. Diseñamos evidencia para conducirlas como sistema.",
    image: "/images/noam-public-sector.jpg",
    imageAlt: "Equipo técnico analizando un territorio provincial",
    accent: "#8a623d",
    decisions: ["¿Dónde se concentran las brechas entre distritos?", "¿Qué inversiones tienen efecto provincial?", "¿Cómo coordinar compromisos y responsabilidades?", "¿Qué servicios requieren una lectura por corredores?"],
    realities: [
      { title: "Territorio interdependiente", description: "Los flujos de personas, residuos, comercio y transporte conectan distritos con capacidades distintas." },
      { title: "Competencias compartidas", description: "La respuesta exige distinguir responsabilidades provinciales, distritales, regionales y nacionales." },
      { title: "Carteras extensas", description: "La priorización debe combinar brecha, madurez, impacto, costo y viabilidad institucional." }
    ],
    outcomes: ["Mapa provincial de brechas y flujos", "Criterios transparentes de priorización", "Cartera coordinada entre distritos", "Rutina ejecutiva de seguimiento"],
    deliverables: ["Diagnóstico provincial", "Visor de brechas y proyectos", "Matriz multicriterio", "Observatorio de servicios", "Agenda de coordinación intergubernamental"],
    solutionSlugs: ["diagnostico-agenda-territorial", "transferencia-gestion-100-dias", "observatorio-gestion-inversiones", "encuestas-escucha-ciudadana"],
    evidence: [
      { label: "Perfiles municipales por provincia", href: "/dataperu/municipios", type: "DataPerú" },
      { label: "Matriz para priorizar una agenda de 100 días", href: "/toolkits/matriz-prioridades-100-dias", type: "Toolkit" },
      { label: "Qué debe entregar un diagnóstico territorial", href: "/insights/diagnostico-territorial-que-debe-entregar", type: "Insight" }
    ]
  },
  {
    slug: "gobiernos-regionales",
    market: "public",
    eyebrow: "Escala regional",
    title: "Inteligencia para gobiernos regionales",
    promise: "Conducir políticas, inversiones y servicios entre provincias y sectores.",
    description: "Integramos la lectura territorial con la estructura operativa del gobierno regional: gerencias, direcciones, unidades ejecutoras, proyectos y redes de servicios que requieren una visión común.",
    image: "/images/noam-regional-planning.jpg",
    imageAlt: "Mesa técnica regional con mapas de infraestructura y territorio",
    accent: "#2f5c52",
    decisions: ["¿Qué provincias concentran las brechas más críticas?", "¿Qué proyectos e hitos requieren conducción política?", "¿Dónde se desvía la implementación de los objetivos?", "¿Qué indicadores deben revisar el gobernador y la gerencia general?"],
    realities: [
      { title: "Múltiples sectores", description: "Salud, educación, infraestructura, desarrollo económico y ambiente operan con sistemas y ritmos diferentes." },
      { title: "Variación territorial", description: "Un promedio regional puede ocultar provincias con brechas, capacidades y riesgos muy distintos." },
      { title: "Cadena de ejecución", description: "Los resultados dependen de unidades ejecutoras, contrataciones, proyectos y coordinación con otros niveles." }
    ],
    outcomes: ["Prioridades regionales diferenciadas por territorio", "Alertas para proyectos y compromisos críticos", "Reuniones ejecutivas con información común", "Capacidad de comunicar avances y restricciones"],
    deliverables: ["Diagnóstico y agenda regional", "Observatorio de inversiones", "Tablero por provincia y sector", "Sistema de alertas", "Brief periódico para alta dirección"],
    solutionSlugs: ["diagnostico-agenda-territorial", "transferencia-gestion-100-dias", "linea-base-evaluacion-programas", "observatorio-gestion-inversiones"],
    evidence: [
      { label: "DataPerú: perfiles y temas municipales", href: "/dataperu", type: "Producto abierto" },
      { label: "Ocho preguntas antes de construir un observatorio", href: "/insights/ocho-preguntas-observatorio-gestion", type: "Insight" },
      { label: "Caso DataPerú", href: "/cases/dataperu-platform-case", type: "Caso" }
    ]
  },
  {
    slug: "entidades-nacionales",
    market: "public",
    eyebrow: "Gobierno nacional",
    title: "Implementación nacional con lectura territorial",
    promise: "Entender dónde, cómo y por qué una política produce resultados distintos.",
    description: "Ayudamos a ministerios, organismos y programas a convertir datos administrativos y evidencia territorial en seguimiento, evaluación y decisiones de implementación.",
    image: "/images/noam-national-implementation.jpg",
    imageAlt: "Equipo de política pública revisando evidencia de implementación territorial",
    accent: "#475c63",
    decisions: ["¿Dónde están las brechas de cobertura o implementación?", "¿Qué factores explican resultados heterogéneos?", "¿Qué unidades o territorios requieren asistencia?", "¿Cómo automatizar reportes sin perder control metodológico?"],
    realities: [
      { title: "Escala nacional", description: "La cobertura amplia exige definiciones consistentes sin borrar diferencias territoriales relevantes." },
      { title: "Datos administrativos", description: "La disponibilidad de registros no garantiza calidad, interoperabilidad ni una métrica útil para decidir." },
      { title: "Gobernanza compleja", description: "La información debe conectar responsables centrales, unidades desconcentradas y socios de implementación." }
    ],
    outcomes: ["Definiciones e indicadores compartidos", "Segmentación territorial de implementación", "Alertas conectadas con asistencia y responsables", "Evaluación útil para rediseñar operación"],
    deliverables: ["Mapa de implementación", "Catálogo y auditoría de indicadores", "Dashboard nacional con vistas territoriales", "Evaluación de procesos o resultados", "Protocolo de actualización y gobernanza"],
    solutionSlugs: ["linea-base-evaluacion-programas", "observatorio-gestion-inversiones", "encuestas-escucha-ciudadana", "ia-procesos-publicos"],
    evidence: [
      { label: "Arquitectura de decisión para IA pública", href: "/insights/decision-architecture-gov-ai", type: "Insight" },
      { label: "Playbook de gobernanza de IA", href: "/toolkits/ai-governance-playbook", type: "Toolkit" },
      { label: "Biblioteca de evidencia NOAM", href: "/evidence", type: "Evidencia" }
    ]
  }
];

export const privatePractices: SectorPractice[] = [
  {
    slug: "infraestructura-construccion",
    market: "private",
    eyebrow: "Infraestructura y construcción",
    title: "Inteligencia territorial para infraestructura",
    promise: "Evaluar oportunidades, proyectos y restricciones antes de comprometer recursos.",
    description: "Combinamos inversión pública, accesibilidad, demanda, instituciones y entorno territorial para priorizar oportunidades y monitorear proyectos con una lectura defendible.",
    image: "/images/noam-infrastructure-field.jpg",
    imageAlt: "Profesionales evaluando infraestructura y actividad productiva en un territorio peruano",
    accent: "#a17a24",
    decisions: ["¿Qué territorios presentan una oportunidad real?", "¿Qué proyectos públicos cambian la viabilidad?", "¿Qué permisos, actores y restricciones deben anticiparse?", "¿Cómo monitorear una cartera dispersa?"],
    realities: [
      { title: "Información fragmentada", description: "La decisión depende de fuentes técnicas, públicas, comerciales y territoriales que rara vez están integradas." },
      { title: "Horizonte largo", description: "Los supuestos cambian durante diseño, permisos, inversión y operación; el sistema debe conservar versiones." },
      { title: "Múltiples actores", description: "Gobiernos, operadores, comunidades y financiadores observan riesgos y resultados diferentes." }
    ],
    outcomes: ["Territorios comparados con criterios explícitos", "Riesgos y vacíos de información visibles", "Cartera con hitos y señales tempranas", "Recomendación apta para comité"],
    deliverables: ["Screening territorial", "Modelo multicriterio", "Mapa de infraestructura relacionada", "Dashboard de cartera", "Brief de inversión y validación"],
    solutionSlugs: ["inteligencia-territorial-inversion", "monitoreo-entorno-impacto", "encuestas-escucha-ciudadana"],
    evidence: [
      { label: "Cómo evaluar un territorio antes de invertir", href: "/insights/evaluar-territorio-antes-invertir", type: "Insight" },
      { label: "Ficha de decisión territorial", href: "/toolkits/ficha-decision-territorial-empresas", type: "Toolkit" },
      { label: "Explorar DataPerú", href: "/dataperu", type: "Producto abierto" }
    ]
  },
  {
    slug: "energia-mineria",
    market: "private",
    eyebrow: "Energía, minería y recursos",
    title: "Contexto territorial para operar con anticipación",
    promise: "Integrar actores, compromisos, instituciones y señales antes de que se conviertan en crisis.",
    description: "Diseñamos sistemas de entorno e impacto para operaciones donde el desempeño depende tanto de la ingeniería como de la relación con territorio, Estado y sociedad.",
    image: "/images/noam-infrastructure-field.jpg",
    imageAlt: "Lectura de infraestructura y territorio productivo en el Perú",
    accent: "#62724d",
    decisions: ["¿Qué señales territoriales requieren atención?", "¿Cómo priorizar actores y compromisos?", "¿Qué cambios públicos afectan la operación?", "¿Cómo reportar impacto y riesgo a dirección?"],
    realities: [
      { title: "Entorno dinámico", description: "Cambios políticos, sociales, regulatorios y ambientales interactúan y requieren lectura periódica." },
      { title: "Trazabilidad", description: "Los compromisos necesitan responsables, evidencia, territorio, fecha y criterio de cumplimiento." },
      { title: "Información sensible", description: "La arquitectura debe separar transparencia pública, análisis interno y acceso restringido." }
    ],
    outcomes: ["Mapa común de actores, riesgos y compromisos", "Alertas con responsables y protocolo", "Lectura ejecutiva periódica", "Trazabilidad para decisiones e impacto"],
    deliverables: ["Mapa de entorno", "Taxonomía de señales", "Dashboard territorial", "Registro de compromisos", "Protocolo de escalamiento"],
    solutionSlugs: ["monitoreo-entorno-impacto", "encuestas-escucha-ciudadana", "inteligencia-territorial-inversion"],
    evidence: [
      { label: "Monitoreo de entorno e impacto", href: "/solutions/monitoreo-entorno-impacto", type: "Solución" },
      { label: "Guía para diseñar una encuesta útil", href: "/toolkits/diseno-encuesta-para-decidir", type: "Toolkit" },
      { label: "Biblioteca de evidencia", href: "/evidence", type: "Evidencia" }
    ]
  },
  {
    slug: "servicios-publicos",
    market: "private",
    eyebrow: "Servicios públicos y saneamiento",
    title: "Cobertura y experiencia para servicios esenciales",
    promise: "Conectar operación, territorio y experiencia del usuario en una misma lectura.",
    description: "Ayudamos a empresas prestadoras y operadores a comprender brechas, incidencias, percepción, inversiones y desempeño con vistas adecuadas para dirección y equipos operativos.",
    image: "/images/noam-urban-services.jpg",
    imageAlt: "Infraestructura territorial observada por un equipo técnico",
    accent: "#2f5c52",
    decisions: ["¿Dónde se concentran brechas e incidencias?", "¿Qué explica una mala experiencia de servicio?", "¿Qué inversiones deben priorizarse?", "¿Qué alertas necesitan los equipos operativos?"],
    realities: [
      { title: "Servicio territorial", description: "Cobertura y calidad varían por redes, zonas, capacidad instalada y características de la demanda." },
      { title: "Datos operativos", description: "Incidencias, atención, mediciones e inversiones requieren definiciones y claves territoriales comunes." },
      { title: "Confianza del usuario", description: "La percepción no reemplaza el dato técnico, pero explica adopción, reclamos y legitimidad." }
    ],
    outcomes: ["Brechas e incidencias georreferenciadas", "Indicadores operativos y de experiencia conectados", "Priorización de inversión con criterios visibles", "Seguimiento ejecutivo y operativo"],
    deliverables: ["Diagnóstico de cobertura", "Encuesta de experiencia", "Visor de incidencias", "Observatorio del servicio", "Protocolo de alertas"],
    solutionSlugs: ["encuestas-escucha-ciudadana", "observatorio-gestion-inversiones", "ia-procesos-publicos"],
    evidence: [
      { label: "Encuestas y escucha territorial", href: "/solutions/encuestas-escucha-ciudadana", type: "Solución" },
      { label: "Ocho preguntas antes de un observatorio", href: "/insights/ocho-preguntas-observatorio-gestion", type: "Insight" },
      { label: "DataPerú: lecturas municipales", href: "/dataperu/temas", type: "Producto abierto" }
    ]
  },
  {
    slug: "comercio-expansion",
    market: "private",
    eyebrow: "Comercio y expansión",
    title: "Elegir dónde crecer con evidencia territorial",
    promise: "Comparar ciudades y zonas sin depender de una sola variable de mercado.",
    description: "Integramos población, accesibilidad, actividad, competencia, infraestructura y contexto institucional para construir escenarios de localización y una ruta de validación.",
    image: "/images/noam-private-sector.jpg",
    imageAlt: "Valle urbano y productivo evaluado para expansión territorial",
    accent: "#b95337",
    decisions: ["¿Qué ciudades o zonas priorizar?", "¿Qué segmentos sostienen la demanda?", "¿Qué infraestructura cambia el acceso?", "¿Qué supuestos necesitan validación en campo?"],
    realities: [
      { title: "Demanda heterogénea", description: "La población total no captura ingreso, movilidad, hábitos, estacionalidad ni competencia." },
      { title: "Unidad geográfica", description: "Distrito, área de influencia y corredor responden preguntas diferentes y no deben confundirse." },
      { title: "Incertidumbre", description: "El modelo debe permitir escenarios y sensibilidad, no producir un ranking incuestionable." }
    ],
    outcomes: ["Criterios de expansión acordados", "Territorios comparables y trazables", "Escenarios sensibles a supuestos clave", "Plan de validación antes de invertir"],
    deliverables: ["Modelo de localización", "Perfiles de ciudades", "Mapa de áreas de influencia", "Segmentación de demanda", "Recomendación y diligencias"],
    solutionSlugs: ["inteligencia-territorial-inversion", "encuestas-escucha-ciudadana", "monitoreo-entorno-impacto"],
    evidence: [
      { label: "Cómo evaluar un territorio antes de invertir", href: "/insights/evaluar-territorio-antes-invertir", type: "Insight" },
      { label: "Ficha de decisión territorial", href: "/toolkits/ficha-decision-territorial-empresas", type: "Toolkit" },
      { label: "Perfiles municipales DataPerú", href: "/dataperu/municipios", type: "Datos abiertos" }
    ]
  },
  {
    slug: "agroindustria",
    market: "private",
    eyebrow: "Agroindustria y cadenas productivas",
    title: "Leer cadenas, corredores y riesgos territoriales",
    promise: "Conectar producción, infraestructura, mercados y capacidad institucional.",
    description: "Construimos perfiles y sistemas para decisiones de abastecimiento, localización, desarrollo de proveedores, infraestructura y riesgos en cadenas distribuidas territorialmente.",
    image: "/images/noam-agro-value-chain.jpg",
    imageAlt: "Paisaje productivo e infraestructura logística en un valle peruano",
    accent: "#6f7663",
    decisions: ["¿Dónde se concentran productores y capacidades?", "¿Qué cuellos de botella afectan la cadena?", "¿Qué riesgos territoriales deben monitorearse?", "¿Dónde tiene sentido invertir o acompañar proveedores?"],
    realities: [
      { title: "Cadena distribuida", description: "Producción, acopio, transformación, logística y mercado operan en territorios y escalas diferentes." },
      { title: "Riesgo múltiple", description: "Clima, agua, conectividad, sanidad, precios e instituciones afectan continuidad y productividad." },
      { title: "Datos incompletos", description: "Las fuentes públicas orientan, pero la validación con actores y operación suele ser decisiva." }
    ],
    outcomes: ["Mapa de cadena y actores", "Territorios priorizados con criterios explícitos", "Cuellos de botella y riesgos visibles", "Cartera de acciones o inversiones"],
    deliverables: ["Perfil productivo territorial", "Mapa de cadena de valor", "Modelo de priorización", "Sistema de riesgos", "Agenda de proveedores e inversión"],
    solutionSlugs: ["inteligencia-territorial-inversion", "monitoreo-entorno-impacto", "encuestas-escucha-ciudadana"],
    evidence: [
      { label: "Inteligencia territorial para inversión", href: "/solutions/inteligencia-territorial-inversion", type: "Solución" },
      { label: "Explorar DataPerú", href: "/dataperu", type: "Producto abierto" },
      { label: "Ficha de decisión territorial", href: "/toolkits/ficha-decision-territorial-empresas", type: "Toolkit" }
    ]
  },
  {
    slug: "desarrollo-impacto",
    market: "private",
    eyebrow: "Cooperación, fundaciones e impacto",
    title: "Diseñar y medir iniciativas de desarrollo",
    promise: "Evidencia útil desde la línea de base hasta la decisión de escalar.",
    description: "Acompañamos programas que trabajan con gobiernos, comunidades y organizaciones para definir problemas, medir implementación y resultados, y comunicar aprendizaje con rigor.",
    image: "/images/noam-agro-value-chain.jpg",
    imageAlt: "Territorio peruano observado para diseñar y evaluar una intervención",
    accent: "#8a623d",
    decisions: ["¿Qué problema y población deben priorizarse?", "¿Cómo construir una línea de base viable?", "¿Qué indicadores capturan implementación y resultado?", "¿Qué evidencia justifica adaptar o escalar?"],
    realities: [
      { title: "Teoría y operación", description: "La cadena de resultados debe conectarse con actividades, responsables, datos y decisiones reales." },
      { title: "Contexto territorial", description: "Una intervención puede funcionar de manera distinta según capacidades públicas y condiciones locales." },
      { title: "Aprendizaje", description: "El monitoreo debe detectar desvíos y preguntas, no limitarse a reportar cumplimiento." }
    ],
    outcomes: ["Problema y población objetivo mejor definidos", "Indicadores medibles y pertinentes", "Evidencia para adaptar implementación", "Aprendizajes comunicables a aliados y financiadores"],
    deliverables: ["Diagnóstico y teoría de cambio", "Línea de base", "Sistema de monitoreo", "Evaluación de proceso o resultados", "Dashboard e informe de aprendizaje"],
    solutionSlugs: ["linea-base-evaluacion-programas", "encuestas-escucha-ciudadana", "diagnostico-agenda-territorial", "monitoreo-entorno-impacto"],
    evidence: [
      { label: "Estudios, diagnósticos y evaluación", href: "/services/estudios-diagnosticos-evaluacion", type: "Capacidad" },
      { label: "Guía de encuesta para decidir", href: "/toolkits/diseno-encuesta-para-decidir", type: "Toolkit" },
      { label: "Biblioteca de evidencia", href: "/evidence", type: "Evidencia" }
    ]
  }
];

export const sectorPractices = [...publicPractices, ...privatePractices];

export function getSectorPractice(market: SectorMarket, slug: string) {
  return sectorPractices.find((practice) => practice.market === market && practice.slug === slug);
}

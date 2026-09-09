import { getAllContent } from "@/lib/content";
import { getManagedPlatformCatalog } from "@/lib/platform-products";
import { getManagedPlatformResources } from "@/lib/platform-resources";
import { sectorPractices } from "@/lib/sector-practices";
import { solutions } from "@/lib/solutions";
import { searchEntries, type SearchEntry, type SearchFilters } from "@/lib/search-core";
import { briefEditions } from "@/lib/brief";

const curatedEntries: SearchEntry[] = [
  { id: "study:panorama", title: "Panorama municipal del Perú 2025", description: "Estudio insignia sobre 1,891 municipalidades, capacidades, recursos e inversión.", href: "/dataperu/panorama-municipal-2025", kind: "evidence", label: "Estudio insignia", topic: "gobierno", featured: true, keywords: ["municipalidades", "gobierno local", "RENAMU", "MEF", "Perú"], date: "2026-07-16" },
  { id: "product:municipios", title: "Perfiles municipales de DataPerú", description: "Buscador nacional con perfiles, proyectos, presupuesto y capacidades de 1,891 municipalidades.", href: "/dataperu/municipios", kind: "product", label: "Datos territoriales", topic: "gobierno", featured: true, keywords: ["ubigeo", "municipio", "alcaldía", "distrito", "provincia"] },
  { id: "product:departamentos", title: "Atlas departamental de DataPerú", description: "Veinticinco perfiles para comparar contexto, recursos, inversión y heterogeneidad territorial.", href: "/dataperu/departamentos", kind: "product", label: "Atlas territorial", topic: "inversion", keywords: ["regiones", "departamentos", "mapa", "territorio"] },
  { id: "electoral:erm", title: "Elecciones regionales y municipales 2026", description: "Inteligencia para preparar elección, transferencia y primeros meses de gestión subnacional.", href: "/electoral/erm-2026", kind: "product", label: "Elecciones y gestión", topic: "gobierno", featured: true, keywords: ["ERM", "alcaldes", "gobernadores", "transferencia", "100 días"] },
  { id: "product:scope", title: "Diseñador de alcance NOAM", description: "Convierte una necesidad institucional en un brief inicial para estudios, observatorios o IA.", href: "/diagnostico", kind: "product", label: "Herramienta", topic: "gobierno", keywords: ["brief", "cotización", "alcance", "proyecto", "consultoría"] },
  { id: "guide:service-directory", title: "Servicios de análisis de datos para gobiernos y empresas", description: "Directorio para encontrar diagnósticos, evaluaciones, encuestas, observatorios, dashboards, estudios de mercado e IA por decisión o tema de gestión.", href: "/services", kind: "solution", label: "Directorio de servicios", topic: "gobierno", featured: true, keywords: ["servicios de análisis de datos", "consultoría de datos", "consultoría gobierno", "estudio", "diagnóstico", "línea de base", "evaluación de impacto", "encuesta", "observatorio", "dashboard", "visor", "inteligencia artificial", "municipalidad", "gobierno regional", "gobierno nacional", "empresa", "Perú"] },
  { id: "guide:contract-analysis", title: "Contratar estudios y servicios de análisis de datos", description: "Guía para elegir entre diagnóstico, línea de base, evaluación, encuesta, observatorio, dashboard o IA aplicada antes de solicitar una propuesta.", href: "/contratar-analisis-datos", kind: "solution", label: "Guía de contratación", topic: "gobierno", featured: true, keywords: ["TDR", "consultoría", "servicio", "contratar", "análisis de datos", "estudio", "línea de base", "evaluación de impacto", "encuesta", "dashboard", "observatorio", "gobierno regional", "municipalidad"] },
  { id: "guide:baseline-evaluation", title: "Línea de base y evaluación de programas", description: "Guía para elegir entre evaluabilidad, línea de base, seguimiento y evaluaciones de diseño, proceso, resultados o impacto.", href: "/linea-base-evaluacion-impacto", kind: "solution", label: "Guía de evaluación", topic: "gobierno", featured: true, keywords: ["línea de base", "evaluación de impacto", "evaluación de resultados", "evaluación de programas", "evaluabilidad", "monitoreo", "seguimiento", "indicadores", "política pública", "proyecto social", "TDR"] },
  { id: "guide:territorial-diagnosis", title: "Diagnóstico territorial para gobiernos y empresas", description: "Guía para convertir datos, brechas, población, capacidades, actores, riesgos y oportunidades de un distrito, provincia o región en prioridades verificables.", href: "/diagnostico-territorial", kind: "solution", label: "Guía territorial", topic: "gobierno", featured: true, keywords: ["diagnóstico territorial", "diagnóstico municipal", "diagnóstico regional", "diagnóstico institucional", "brechas territoriales", "análisis territorial", "gobierno regional", "municipalidad provincial", "municipalidad distrital", "PDLC", "inversión pública", "TDR"] },
  { id: "guide:surveys-opinion", title: "Encuestas y estudios de opinión para gobiernos y empresas", description: "Guía para elegir y contratar encuestas de satisfacción, experiencia, necesidades, opinión pública, mercado o seguimiento con resultados interpretables.", href: "/encuestas-estudios-opinion", kind: "solution", label: "Guía de encuestas", topic: "gobierno", featured: true, keywords: ["encuestas", "estudio de opinión", "opinión pública", "satisfacción ciudadana", "satisfacción de usuarios", "experiencia del cliente", "estudio de mercado", "muestra", "trabajo de campo", "focus group", "municipalidad", "gobierno regional", "TDR"] },
  { id: "guide:observatories-dashboards", title: "Observatorios, dashboards y visores para gobiernos y empresas", description: "Guía para elegir y contratar tableros, observatorios, visores geográficos y sistemas de seguimiento con indicadores, alertas, responsables y operación sostenible.", href: "/observatorios-dashboards-visores", kind: "solution", label: "Guía de sistemas de decisión", topic: "gobierno", featured: true, keywords: ["observatorio", "dashboard", "tablero de control", "visor geográfico", "visor territorial", "GIS", "SIG", "sistema de seguimiento", "monitoreo", "indicadores", "alertas", "sala de situación", "inversión pública", "proyectos", "servicios públicos", "municipalidad", "gobierno regional", "TDR"] },
  { id: "guide:ai-automation", title: "IA y automatización para gobiernos y empresas", description: "Guía para seleccionar casos de uso, diseñar controles y probar pilotos de inteligencia artificial con línea de base, supervisión y métricas antes de escalar.", href: "/ia-automatizacion-gobiernos-empresas", kind: "solution", label: "Guía de IA aplicada", topic: "ia", featured: true, keywords: ["inteligencia artificial", "IA", "automatización", "chatbot", "asistente virtual", "IA documental", "búsqueda documental", "clasificación de documentos", "piloto de IA", "gobernanza de IA", "riesgo algorítmico", "supervisión humana", "gobierno digital", "municipalidad", "empresa"] },
  { id: "guide:market-territorial-intelligence", title: "Estudios de mercado e inteligencia territorial en Perú", description: "Guía para dimensionar demanda, investigar clientes, analizar sectores, comparar territorios y evaluar localizaciones antes de invertir o expandirse.", href: "/estudios-mercado-inteligencia-territorial", kind: "solution", label: "Guía de mercado y territorio", topic: "inversion", featured: true, keywords: ["estudio de mercado", "investigación de mercado", "inteligencia de mercado", "inteligencia territorial", "tamaño de mercado", "demanda potencial", "segmentación", "localización", "expansión", "inversión", "competencia", "cadena de valor", "área de influencia", "regiones del Perú", "TDR"] },
  { id: "guide:citizen-security-data", title: "Análisis de datos para seguridad ciudadana municipal y regional", description: "Guía para diagnosticar, focalizar, escuchar, monitorear y evaluar intervenciones de seguridad ciudadana con evidencia territorial.", href: "/analisis-datos-seguridad-ciudadana", kind: "solution", label: "Guía sectorial", topic: "gobierno", featured: true, keywords: ["seguridad ciudadana", "diagnóstico de seguridad", "observatorio de seguridad", "mapa del delito", "victimización", "percepción de inseguridad", "serenazgo", "patrullaje integrado", "CODISEC", "COPROSEC", "CORESEC", "CONASEC", "plan de acción de seguridad ciudadana", "PASC", "municipalidad", "gobierno regional", "TDR"] },
  { id: "guide:waste-public-cleaning-data", title: "Análisis de datos para residuos sólidos y limpieza pública", description: "Guía para medir cobertura, optimizar rutas, conciliar flujos, ampliar valorización y conducir el servicio municipal.", href: "/analisis-datos-residuos-limpieza-publica", kind: "solution", label: "Guía sectorial", topic: "gobierno", featured: true, keywords: ["residuos sólidos", "limpieza pública", "recolección de residuos", "recolección de basura", "optimización de rutas", "rutas de recolección", "SIGERSOL", "PIGARS", "valorización", "reciclaje", "relleno sanitario", "botadero", "arbitrios", "municipalidad", "TDR"] },
  { id: "guide:disaster-risk-data", title: "Análisis de datos para la gestión del riesgo de desastres", description: "Guía para comprender escenarios, priorizar medidas, preparar continuidad, operar un COEL y evaluar la respuesta territorial.", href: "/analisis-datos-gestion-riesgo-desastres", kind: "solution", label: "Guía sectorial", topic: "gobierno", featured: true, keywords: ["gestión del riesgo de desastres", "GRD", "SINAGERD", "PLANAGERD", "SIGRID", "PPRRD", "evaluación de riesgos", "escenario de riesgo", "mapa de peligros", "vulnerabilidad", "COEL", "COER", "continuidad operativa", "plan de contingencia", "municipalidad", "gobierno regional", "TDR"] },
  { id: "guide:local-economic-development", title: "Análisis de datos para desarrollo económico local", description: "Guía para diagnosticar tejido productivo, empleo, cadenas de valor, mercados, barreras y resultados de una agenda económica territorial.", href: "/analisis-datos-desarrollo-economico-local", kind: "solution", label: "Guía sectorial", topic: "inversion", featured: true, keywords: ["desarrollo económico local", "DEL", "MYPE", "tejido empresarial", "empleo local", "empleabilidad", "cadenas de valor", "proveedores locales", "formalización", "licencias de funcionamiento", "productividad", "competitividad", "mercados", "PROCOMPITE", "municipalidad", "gobierno regional", "TDR"] },
  { id: "guide:environmental-management-data", title: "Análisis de datos para la gestión ambiental", description: "Guía para diagnosticar presiones, diseñar monitoreo, ordenar instrumentos, focalizar fiscalización y evaluar respuestas ambientales.", href: "/analisis-datos-gestion-ambiental", kind: "solution", label: "Guía sectorial", topic: "gobierno", featured: true, keywords: ["gestión ambiental", "diagnóstico ambiental", "monitoreo ambiental", "observatorio ambiental", "fiscalización ambiental", "PLANEFA", "EFA local", "SLGA", "SRGA", "CAM", "CAR", "calidad ambiental", "agua", "aire", "suelo", "ruido", "contaminación", "OEFA", "MINAM", "municipalidad", "gobierno regional", "TDR"] },
  { id: "guide:water-sanitation-data", title: "Análisis de datos para agua y saneamiento", description: "Guía para diagnosticar acceso, calidad, continuidad, prestación rural, sostenibilidad e inversiones de agua y saneamiento.", href: "/analisis-datos-agua-saneamiento", kind: "solution", label: "Guía sectorial", topic: "gobierno", featured: true, keywords: ["agua potable", "saneamiento", "alcantarillado", "agua segura", "continuidad", "calidad del agua", "DATASS", "ATM", "organización comunal", "JASS", "prestador", "SUNASS", "brecha de saneamiento", "interrupciones de agua", "inversión en saneamiento", "municipalidad", "gobierno regional", "TDR"] },
  { id: "guide:mobility-transport-data", title: "Análisis de datos para movilidad y transporte", description: "Guía para diagnosticar viajes, transporte público, seguridad vial, accesibilidad, logística e inversiones urbanas.", href: "/analisis-datos-movilidad-transporte", kind: "solution", label: "Guía sectorial", topic: "gobierno", featured: true, keywords: ["movilidad urbana", "transporte urbano", "PMUS", "plan de movilidad", "transporte público", "origen destino", "aforo vehicular", "seguridad vial", "siniestros de tránsito", "tráfico", "congestión", "peatones", "ciclovías", "accesibilidad", "Promovilidad", "ONSV", "municipalidad provincial", "TDR"] },
  { id: "guide:social-policy-data", title: "Análisis de datos para políticas y programas sociales", description: "Guía para diagnosticar necesidades, focalización, acceso, prestación, articulación y resultados de intervenciones sociales.", href: "/analisis-datos-politicas-sociales", kind: "solution", label: "Guía sectorial", topic: "gobierno", featured: true, keywords: ["políticas sociales", "programas sociales", "desarrollo social", "inclusión social", "población vulnerable", "pobreza", "focalización", "SISFOH", "GeoSISFOH", "MIDIS", "cobertura efectiva", "brecha de atención", "primera infancia", "adulto mayor", "discapacidad", "línea de base", "evaluación de programas", "municipalidad", "gobierno regional", "TDR"] },
  { id: "guide:territorial-health-data", title: "Análisis de datos para salud territorial", description: "Guía para diagnosticar necesidades, acceso, capacidad, vigilancia, calidad y resultados de intervenciones y servicios de salud.", href: "/analisis-datos-salud-territorial", kind: "solution", label: "Guía sectorial", topic: "gobierno", featured: true, keywords: ["salud pública", "salud territorial", "análisis de situación de salud", "sala de situación", "REUNIS", "HIS MINSA", "SUSALUD", "RENIPRESS", "IPRESS", "red de salud", "vigilancia epidemiológica", "acceso a salud", "calidad de atención", "experiencia del paciente", "evaluación de programas de salud", "gobierno regional", "DIRESA", "GERESA", "TDR"] },
  { id: "evidence:samples", title: "Muestras de entregables", description: "Ocho arquitecturas de entregables para examinar cómo NOAM estructura un encargo.", href: "/muestras", kind: "evidence", label: "Muestras", topic: "gobierno", keywords: ["informe", "dashboard", "entregable", "ejemplo"] },
  { id: "editorial:brief", title: "Brief NOAM", description: "Lecturas breves, verificables y accionables sobre gestión pública, territorio, elecciones, datos e IA aplicada.", href: "/brief", kind: "evidence", label: "Archivo editorial", topic: "gobierno", featured: true, keywords: ["brief", "boletín", "análisis", "decisiones"] },
  { id: "editorial:newsletter", title: "Recibir el Brief NOAM", description: "Suscripción con preferencias, confirmación de email y baja disponible en cada envío.", href: "/newsletter", kind: "evidence", label: "Suscripción", topic: "gobierno", keywords: ["newsletter", "boletín", "suscripción", "email"] }
];

function topicForSolution(serviceSlug: string, market: string): SearchEntry["topic"] {
  if (serviceSlug.includes("ia-")) return "ia";
  if (market === "Empresas") return "inversion";
  return "gobierno";
}

function topicForProduct(href: string): SearchEntry["topic"] {
  if (href.includes("ai-governance")) return "ia";
  if (href.includes("inversion") || href.includes("mapa")) return "inversion";
  return "gobierno";
}

function topicForResource(productSlug?: string): SearchEntry["topic"] {
  if (productSlug === "ai-governance-lab") return "ia";
  if (productSlug?.includes("mapa") || productSlug === "dataperu" || productSlug?.includes("inversion")) return "inversion";
  return "gobierno";
}

function aliasesForSolution(serviceSlug: string) {
  if (serviceSlug === "ia-transformacion-gestion") {
    return ["automatización", "asistentes", "documentos", "procesos repetitivos", "inteligencia artificial"];
  }
  if (serviceSlug === "observatorios-sistemas-decision") {
    return ["dashboard", "tablero", "monitoreo", "seguimiento", "alertas"];
  }
  if (serviceSlug === "estudios-diagnosticos-evaluacion") {
    return ["consultoría", "línea de base", "encuesta", "evaluación", "investigación"];
  }
  return [];
}

export async function getSearchIndex(): Promise<SearchEntry[]> {
  const [insights, indicators, toolkits, services, cases, managedProducts, managedResources] = await Promise.all([
    getAllContent("insights"),
    getAllContent("indicators"),
    getAllContent("toolkits"),
    getAllContent("services"),
    getAllContent("cases"),
    getManagedPlatformCatalog(),
    getManagedPlatformResources()
  ]);

  const contentEntries: SearchEntry[] = [...insights, ...indicators, ...toolkits, ...services, ...cases].map((item) => ({
    id: `${item.type}:${item.slug}`,
    title: item.title,
    description: item.description,
    href: item.url,
    kind: item.type === "services" ? "solution" : "evidence",
    label: item.type === "insights" ? "Estudio" : item.type === "indicators" ? "Indicador" : item.type === "toolkits" ? "Guía" : item.type === "services" ? "Capacidad" : "Caso",
    topic: item.topic,
    date: item.date,
    featured: item.featured,
    keywords: [...item.tags, item.outcome ?? "", item.client ?? "", item.engagement ?? "", item.period ?? ""]
  }));

  const solutionEntries: SearchEntry[] = solutions.map((solution) => ({
    id: `solution:${solution.slug}`,
    title: solution.title,
    description: `${solution.promise} ${solution.description}`,
    href: `/solutions/${solution.slug}`,
    kind: "solution",
    label: "Solución",
    topic: topicForSolution(solution.serviceSlug, solution.market),
    featured: true,
    keywords: [solution.market, solution.duration, ...aliasesForSolution(solution.serviceSlug), ...solution.situations, ...solution.outcomes, ...solution.deliverables]
  }));

  const productEntries: SearchEntry[] = managedProducts.map((product) => ({
    id: `catalog:${product.slug}`,
    title: product.name,
    description: `${product.description} ${product.outcome}`,
    href: product.href,
    kind: "product",
    label: product.category === "dashboard" ? "Dashboard" : product.category === "viewer" ? "Visor" : product.category === "demo" ? "Herramienta" : "Producto",
    topic: topicForProduct(product.href),
    featured: product.status === "live",
    keywords: [...product.audience, ...product.features, ...product.deliverables]
  }));

  const resourceEntries: SearchEntry[] = managedResources.map((resource) => ({
    id: `resource:${resource.slug}`,
    title: resource.title,
    description: resource.description,
    href: resource.url,
    kind: "evidence",
    label: resource.kind === "dataset" ? "Dataset" : resource.kind === "methodology" ? "Metodología" : resource.kind === "template" ? "Plantilla" : resource.kind === "explorer" ? "Explorador" : resource.kind === "report" ? "Informe" : "Guía",
    topic: topicForResource(resource.productSlug),
    keywords: [resource.sourceLabel ?? "", resource.period ?? "", resource.format ?? "", resource.productSlug ?? ""]
  }));

  const sectorEntries: SearchEntry[] = sectorPractices.map((practice) => ({
    id: `sector:${practice.market}:${practice.slug}`,
    title: practice.title,
    description: `${practice.promise} ${practice.description}`,
    href: `/sectors/${practice.market === "public" ? "public-sector" : "companies"}/${practice.slug}`,
    kind: "sector",
    label: practice.market === "public" ? "Sector público" : "Industria",
    topic: practice.market === "public" ? "gobierno" : "inversion",
    keywords: [practice.eyebrow, ...practice.decisions, ...practice.outcomes, ...practice.deliverables]
  }));

  const briefEntries: SearchEntry[] = briefEditions.map((edition) => ({
    id: `brief:${edition.slug}`,
    title: edition.title,
    description: edition.description,
    href: `/brief/${edition.slug}`,
    kind: "evidence",
    label: `Brief ${edition.issue}`,
    topic: edition.topic,
    date: edition.date,
    featured: true,
    keywords: ["brief NOAM", ...edition.signals.flatMap((signal) => [signal.label, signal.title]), ...edition.actions.map((action) => action.title)]
  }));

  const unique = new Map<string, SearchEntry>();
  for (const entry of [...curatedEntries, ...briefEntries, ...contentEntries, ...resourceEntries, ...solutionEntries, ...productEntries, ...sectorEntries]) {
    if (!unique.has(entry.href)) unique.set(entry.href, entry);
  }
  return [...unique.values()];
}

export async function searchSite(filters: SearchFilters) {
  return searchEntries(await getSearchIndex(), filters);
}

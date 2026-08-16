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
  { id: "evidence:samples", title: "Muestras de entregables", description: "Seis arquitecturas de entregables para examinar cómo NOAM estructura un encargo.", href: "/muestras", kind: "evidence", label: "Muestras", topic: "gobierno", keywords: ["informe", "dashboard", "entregable", "ejemplo"] },
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

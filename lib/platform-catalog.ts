import type { PlatformProduct } from "../types/platform.ts";

export const platformCatalog: PlatformProduct[] = [
  {
    slug: "planometro-electoral",
    name: "Planometro Electoral",
    category: "product",
    description: "Analisis comparado de planes de gobierno con NLP, indicadores de concrecion, similitud, cobertura y viabilidad.",
    outcome: "Lectura ejecutiva y tecnica de agendas electorales para decision publica, medios, academia y equipos de campana.",
    href: "/electoral/planometro-2026",
    status: "live",
    audience: ["Analisis electoral", "Think tanks", "Medios", "Equipos programaticos"],
    features: ["Extraccion de propuestas", "Clasificacion por ejes", "Similitud entre partidos", "Indicadores de viabilidad"],
    deliverables: ["Sitio interactivo", "Paper metodologico", "Datos procesados", "Visualizaciones embebibles"],
    demoHref: "/electoral/planometro-2026",
    timeline: "Producto vivo"
  },
  {
    slug: "barometro-electoral-enero-2026",
    name: "Barometro Electoral Enero 2026",
    category: "dashboard",
    description: "Analisis narrativo y visual de una encuesta online de cobertura nacional para leer malestar, riesgo electoral, segmentos y territorio.",
    outcome: "Historia analitica de opinion publica con tracker, modelos, segmentacion y visualizaciones avanzadas.",
    href: "/electoral/barometro-enero-2026",
    status: "live",
    audience: ["Analisis electoral", "Campanas", "Medios", "Estrategia politica"],
    features: ["Tracker de riesgo electoral", "Segmentacion de opinion", "Modelos explicativos", "Lectura territorial"],
    deliverables: ["Sitio narrativo", "Informe grafico", "Brief estrategico", "Visualizaciones interactivas"],
    demoHref: "/electoral/barometro-enero-2026",
    timeline: "Producto vivo"
  },
  {
    slug: "observatorio-territorial",
    name: "DataPerú Radar de Gestión Municipal",
    category: "dashboard",
    description: "Radar nacional para explorar recursos, ejecución financiera y capacidades declaradas de 1,891 municipalidades con comparaciones responsables.",
    outcome: "Punto de partida verificable para formular preguntas de gestión, seleccionar pares y diseñar un observatorio institucional.",
    href: "/dataperu/radar",
    status: "live",
    audience: ["Gobiernos locales", "Gobiernos regionales", "Programas públicos", "Equipos de monitoreo"],
    features: ["KPIs nacionales", "Distribuciones", "Comparación por tipo municipal", "Explorador territorial"],
    deliverables: ["Dashboard web", "Definiciones visibles", "Perfiles enlazados", "Briefs territoriales"],
    demoHref: "/dataperu/radar",
    timeline: "Producto vivo"
  },
  {
    slug: "observatorio-inversiones",
    name: "Observatorio de Inversiones Municipales",
    category: "dashboard",
    description: "Explorador de 9,429 proyectos municipales visibles por departamento, función, PIM y ejecución financiera durante 2025.",
    outcome: "Una entrada verificable para localizar proyectos, formular preguntas de seguimiento y diseñar un observatorio institucional.",
    href: "/dataperu/inversiones",
    status: "live",
    audience: ["Gobiernos regionales", "Municipalidades", "Equipos de inversión", "Empresas y cooperación"],
    features: ["Composición funcional", "Bandas de ejecución", "Filtros territoriales", "Perfiles municipales enlazados"],
    deliverables: ["Dashboard abierto", "Metodología visible", "Explorador de proyectos", "Diseño de observatorio institucional"],
    demoHref: "/dataperu/inversiones",
    timeline: "Producto vivo"
  },
  {
    slug: "mapa-gestion-territorial",
    name: "Mapa de Gestión e Inversión Municipal",
    category: "viewer",
    description: "Visor con cinco capas departamentales sobre ejecución, recursos, transparencia e inversión municipal.",
    outcome: "Lectura espacial verificable para ubicar diferencias territoriales y conducir la exploración hacia perfiles y proyectos concretos.",
    href: "/dataperu/mapa",
    status: "live",
    audience: ["Gobiernos regionales", "Municipalidades", "Equipos de planeamiento", "Empresas y cooperación"],
    features: ["Límites oficiales referenciales", "Cinco capas comparables", "Ficha departamental", "GeoJSON descargable"],
    deliverables: ["Visor web", "Datos trazables", "Perfiles enlazados", "Diseño de visor institucional"],
    demoHref: "/dataperu/mapa",
    timeline: "Producto vivo"
  },
  {
    slug: "dataperu",
    name: "DataPeru",
    category: "dashboard",
    description: "Hub de dashboards, visores y analisis territoriales sobre Peru para gobiernos locales, regiones, inversion publica y decision institucional.",
    outcome: "Un espacio modular para publicar indicadores, mapas, reportes y tableros sectoriales por territorio, problema o cliente.",
    href: "/dataperu",
    status: "live",
    audience: ["Gobiernos locales", "Gobiernos regionales", "Programas publicos", "Cooperacion", "Equipos de inversion"],
    features: ["25 perfiles departamentales", "1,891 perfiles municipales", "Mapas y comparadores", "Briefs descargables"],
    deliverables: ["Portal DataPerú", "Dashboards temáticos", "Visores georreferenciados", "Reportes ejecutivos"],
    demoHref: "/dataperu",
    timeline: "Producto modular"
  },
  {
    slug: "visor-riesgo-georreferenciado",
    name: "Visor de Riesgo Georreferenciado",
    category: "viewer",
    description: "Mapa interactivo para explorar capas de riesgo, cobertura, brechas y priorizacion territorial.",
    outcome: "Lectura espacial para intervenciones, inversion publica, seguridad, monitoreo y comunicacion territorial.",
    href: "/products/visor-riesgo-georreferenciado",
    status: "prototype",
    audience: ["Gobiernos locales", "Seguridad ciudadana", "Planificacion territorial", "Inversion publica"],
    features: ["Capas georreferenciadas", "Filtros territoriales", "Leyendas y popups", "Exportables"],
    deliverables: ["Visor web", "GeoJSON/tileset", "Manual de lectura territorial"],
    demoHref: "/dataperu/municipios",
    timeline: "4-10 semanas"
  },
  {
    slug: "ai-governance-lab",
    name: "Laboratorio de casos de uso de IA",
    category: "demo",
    description: "Herramienta abierta para explorar oportunidad, exposición y controles antes de iniciar un piloto institucional de IA.",
    outcome: "Una conversación estructurada para priorizar casos, reconocer exposición y definir controles antes de invertir en desarrollo.",
    href: "/products/ai-governance-lab",
    status: "live",
    audience: ["Transformación digital", "Planeamiento", "Asesoría jurídica", "Alta dirección pública y privada"],
    features: ["Casos precargados", "Evaluación multidimensional", "Controles sugeridos", "Exportación CSV"],
    deliverables: ["Portafolio priorizado", "Matriz de decisión", "Diseño de piloto y gobernanza"],
    demoHref: "/products/ai-governance-lab",
    timeline: "Herramienta abierta"
  }
];

export function getPlatformProduct(slug: string) {
  return platformCatalog.find((product) => product.slug === slug);
}

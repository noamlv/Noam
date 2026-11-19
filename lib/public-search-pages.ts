import type { SearchEntry, SearchKind } from "@/lib/search-core";

type PublicPage = [href: string, title: string, description: string, kind: SearchKind];

const pages: PublicPage[] = [
  ["/", "NOAM: análisis de datos para gobiernos y empresas", "Consultoría, estudios y herramientas para decisiones públicas y territoriales.", "solution"],
  ["/about", "Sobre NOAM", "Consultoría para gobiernos y empresas, equipo y trayectoria de Noam López.", "solution"],
  ["/cv", "Noam López: trayectoria y CV", "Perfil profesional, experiencia en políticas públicas y currículo descargable.", "evidence"],
  ["/contact", "Contacto con NOAM", "Escríbenos para conversar sobre un estudio, servicio o proyecto. Correo y WhatsApp.", "solution"],
  ["/como-trabajamos", "Cómo trabajamos en NOAM", "Metodología para entender una necesidad, revisar los datos y entregar resultados.", "solution"],
  ["/en", "NOAM in English", "Data analysis and public policy consulting for governments, companies and organizations.", "solution"],
  ["/privacy", "Política de privacidad", "Tratamiento de datos personales, consentimiento y derechos.", "evidence"],
  ["/terms", "Términos de uso", "Condiciones de uso del sitio web, sus datos y publicaciones.", "evidence"],
  ["/transparency", "Transparencia editorial y de datos", "Fuentes, métodos, correcciones y niveles de evidencia de las publicaciones.", "evidence"],
  ["/evidence", "Evidencia de NOAM", "Encuentra estudios, datos, casos y recursos para decisiones públicas.", "evidence"],
  ["/cases", "Casos y trabajos de NOAM", "Experiencia en consultorías para GORE Cusco, IPD y CONCYTEC.", "evidence"],
  ["/insights", "Publicaciones y análisis de NOAM", "Artículos sobre políticas públicas, inversión, territorio e inteligencia artificial.", "evidence"],
  ["/indicators", "Indicadores", "Medidas para comparar capacidades, seguir inversiones y evaluar decisiones.", "evidence"],
  ["/toolkits", "Guías y plantillas", "Recursos prácticos, matrices y listas de verificación para estudios y gestión pública.", "evidence"],
  ["/resources", "Biblioteca de recursos", "Descargas, datos abiertos, metodologías, plantillas e informes.", "evidence"],
  ["/analisis", "Biblioteca de análisis de datos", "Estudios con datos, resultados, figuras y fuentes para explorar temas del Perú.", "evidence"],
  ["/products", "Productos de datos", "Dashboards, visores, análisis y herramientas públicas desarrolladas por NOAM.", "product"],
  ["/solutions", "Soluciones de NOAM", "Diagnósticos, encuestas, evaluación y herramientas para resolver problemas de gestión.", "solution"],
  ["/sectors", "Sectores", "Servicios y análisis para gobiernos, municipalidades, regiones y empresas.", "sector"],
  ["/sectors/public-sector", "Sector público", "Apoyo para gobiernos regionales, municipalidades y entidades nacionales.", "sector"],
  ["/sectors/companies", "Consultoría para empresas", "Análisis para infraestructura, minería, servicios, industria y otros sectores privados.", "sector"],
  ["/dataperu/temas", "DataPerú: temas de gestión", "Explora indicadores municipales por sector: ambiente, servicios y desarrollo local.", "product"],
  ["/electoral", "Análisis electoral", "Planes de gobierno, encuestas, elecciones nacionales y gestión municipal y regional.", "product"],
  ["/electoral/planometro-2026/organizaciones", "Planómetro: organizaciones políticas", "Consulta partidos y compara propuestas de los planes de gobierno de 2026.", "product"],
  ["/electoral/planometro-2026/ejes", "Planómetro: ejes temáticos", "Consulta los temas de las propuestas de gobierno por eje.", "product"],
  ["/topics/gobierno", "Gobierno", "Publicaciones, indicadores y recursos sobre gestión y políticas públicas.", "evidence"],
  ["/topics/inversion", "Inversión", "Publicaciones y recursos sobre proyectos, presupuesto e inteligencia territorial.", "evidence"],
  ["/topics/ia", "Inteligencia artificial", "Publicaciones y guías sobre IA, automatización, evaluación y supervisión.", "evidence"]
];

const labels: Record<SearchKind, string> = {
  evidence: "Publicación", solution: "NOAM", product: "Explorador", sector: "Sector", territory: "Territorio"
};

export const publicSearchPages: SearchEntry[] = pages.map(([href, title, description, kind]) => ({
  id: `page:${href}`, href, title, description, kind, label: labels[kind],
  keywords: href.split(/[/-]/).filter(Boolean)
}));

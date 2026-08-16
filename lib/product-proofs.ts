export type ProductProof = {
  slug: "planometro" | "barometro" | "dataperu";
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  externalUrl?: string;
  caseHref: string;
  metrics: Array<{ value: string; label: string; note?: string }>;
  modules: Array<{ number: string; title: string; description: string }>;
  methods: string[];
  limits: string[];
  technicalProfile?: Array<{ label: string; value: string; note: string }>;
  sourceNote?: string;
};

export const productProofs: Record<ProductProof["slug"], ProductProof> = {
  planometro: {
    slug: "planometro",
    path: "/electoral/planometro-2026",
    eyebrow: "Planes de gobierno · Perú 2026",
    title: "Planómetro",
    description: "Un sistema reproducible para convertir documentos programáticos extensos en propuestas comparables, trazables y explorables.",
    externalUrl: "https://noamlv.github.io/PlanesPeru26/",
    caseHref: "/cases/planometro-electoral-product",
    metrics: [
      { value: "36", label: "planes completos", note: "Corpus presidencial analizado" },
      { value: "4,084", label: "enunciados detectados", note: "Universo amplio para exploración" },
      { value: "2,742", label: "propuestas operativas", note: "Subconjunto con criterio más estricto" },
      { value: "404", label: "casos auditados", note: "Muestra de validación manual" }
    ],
    modules: [
      { number: "01", title: "Panorama programático", description: "Volumen, prioridades y composición temática de cada plan." },
      { number: "02", title: "Agenda por ejes", description: "Clasificación comparable de propuestas por política pública e instrumento." },
      { number: "03", title: "Concreción", description: "Señales de meta, plazo, costo, fuente, evidencia y definición operativa." },
      { number: "04", title: "Similitud", description: "Proximidades semánticas entre partidos y entre propuestas." },
      { number: "05", title: "Cobertura", description: "Grupos y territorios visibles, además de posibles puntos ciegos." },
      { number: "06", title: "Seguimiento", description: "Vínculo con indicadores oficiales y estructura para monitoreo posterior." }
    ],
    methods: ["Pipeline reproducible en R y Quarto", "Extracción con trazabilidad al texto fuente", "Clasificación supervisada y validación cruzada", "Similitud semántica, UMAP y modelado estadístico", "Benchmark de 21 indicadores oficiales"],
    limits: ["El universo amplio prioriza cobertura y contiene ruido; no equivale a 4,084 promesas plenamente operativas.", "La similitud textual no demuestra identidad ideológica ni viabilidad política.", "Los indicadores fiscales y de implementabilidad son señales descriptivas, no una evaluación presupuestal definitiva."]
  },
  barometro: {
    slug: "barometro",
    path: "/electoral/barometro-enero-2026",
    eyebrow: "Opinión pública · Enero 2026",
    title: "Barómetro Electoral",
    description: "Una experiencia narrativa para interpretar una encuesta online de cobertura nacional, sus segmentos y territorio sin reducirla a una colección de gráficos.",
    externalUrl: "https://noamlv.github.io/peru-malestar-riesgo-electoral/",
    caseHref: "/cases/barometro-electoral-enero-2026",
    metrics: [
      { value: "1,300", label: "entrevistas", note: "Casos analizados y ponderados" },
      { value: "184", label: "variables", note: "Dimensiones políticas y sociodemográficas" },
      { value: "5 + 1", label: "lecturas territoriales", note: "Cinco macrozonas y total nacional" },
      { value: "4", label: "familias analíticas", note: "Descripción, modelos, segmentos y territorio" }
    ],
    modules: [
      { number: "01", title: "Contexto político", description: "Toplines ponderados y comparación por macrozona." },
      { number: "02", title: "Índices analíticos", description: "Malestar, conocimiento y señales de riesgo con definiciones explícitas." },
      { number: "03", title: "Modelos explicativos", description: "Elastic Net y XGBoost para explorar asociaciones y variables relevantes." },
      { number: "04", title: "Segmentación", description: "Perfiles de grupos y paisaje de decisión mediante métodos no supervisados." },
      { number: "05", title: "Hipótesis", description: "Contrastes ponderados y estimaciones cuasi-causales presentadas con cautela." },
      { number: "06", title: "Territorio", description: "Mapas, escenarios y una lectura integrada por macrozonas." }
    ],
    methods: ["Análisis ponderado con el factor provisto en la base", "PCA y redes de co-mención", "Elastic Net, XGBoost y clustering", "Pruebas de hipótesis ponderadas", "Estimaciones IPW/AIPW de alcance exploratorio"],
    limits: ["La captación fue online y por cuotas; los resultados describen el estudio ponderado y no deben leerse como un censo ni una medición vigente.", "Los modelos identifican patrones y asociaciones, no predicciones electorales garantizadas ni efectos causales definitivos.", "La versión pública presenta resultados agregados y no expone microdatos de entrevistados ni reproduce las láminas restringidas del informe fuente."],
    technicalProfile: [
      { label: "Trabajo de campo", value: "27–31 ene 2026", note: "Fotografía temporal; no representa cambios posteriores." },
      { label: "Captación", value: "Online por cuotas", note: "Cuotas territoriales, de sexo y edad documentadas por la fuente." },
      { label: "Cobertura", value: "Urbana y rural", note: "Cinco macrozonas y agregado nacional." },
      { label: "Ponderación", value: "factor1", note: "Suma ponderada aproximada de 1.300 casos." }
    ],
    sourceNote: "Fuente del estudio: IMASEN, enero de 2026. Análisis y experiencia narrativa: Noam López Villanes. El informe fuente indica reproducción restringida; esta página no copia sus láminas ni distribuye la base individual."
  },
  dataperu: {
    slug: "dataperu",
    path: "/dataperu",
    eyebrow: "Gestión territorial · Perú 2025",
    title: "DataPerú",
    description: "Infraestructura abierta de perfiles municipales, inversión y capacidades de gestión para convertir fuentes públicas dispersas en una lectura territorial usable.",
    caseHref: "/cases/dataperu-platform-case",
    metrics: [
      { value: "1,891", label: "municipalidades", note: "Cobertura distrital y provincial" },
      { value: "25", label: "departamentos", note: "Cobertura nacional" },
      { value: "9,429", label: "proyectos visibles", note: "Hasta cinco principales por municipalidad" },
      { value: "5", label: "lecturas temáticas", note: "Capacidades y gestión municipal" }
    ],
    modules: [],
    methods: ["RENAMU 2025", "Población proyectada INEI", "Presupuesto y proyectos MEF", "Reglas de trazabilidad y control de cobertura"],
    limits: ["Los perfiles integran fuentes con fechas y definiciones distintas.", "Las señales no constituyen rankings de desempeño.", "La cartera visible resume proyectos principales y no reemplaza la consulta oficial completa."]
  }
};

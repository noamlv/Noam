import type { SolutionSlug } from "@/lib/solutions";
import type { Topic } from "@/types/content";

export type EditorialPillar = {
  topic: Topic;
  eyebrow: string;
  title: string;
  description: string;
  thesis: string;
  accent: string;
  questions: string[];
  solutionSlugs: SolutionSlug[];
  primaryHref: string;
  primaryLabel: string;
};

export const editorialPillars: Record<Topic, EditorialPillar> = {
  gobierno: {
    topic: "gobierno",
    eyebrow: "Gobierno y gestión pública",
    title: "Decidir, ejecutar y aprender en el territorio",
    description: "Evidencia para priorizar problemas, conducir inversiones, mejorar servicios y convertir compromisos en sistemas de gestión.",
    thesis: "Una institución no necesita más indicadores aislados. Necesita una arquitectura que conecte problemas, responsables, recursos, señales y decisiones.",
    accent: "#b95337",
    questions: ["¿Qué debe priorizar una nueva gestión?", "¿Cómo seguir inversión y servicios?", "¿Qué cambia entre territorios?"],
    solutionSlugs: ["diagnostico-agenda-territorial", "linea-base-evaluacion-programas", "observatorio-gestion-inversiones", "encuestas-escucha-ciudadana"],
    primaryHref: "/sectors/public-sector",
    primaryLabel: "Soluciones para gobiernos"
  },
  inversion: {
    topic: "inversion",
    eyebrow: "Inversión y territorio",
    title: "Contexto para invertir, operar y crecer",
    description: "Métodos para comparar territorios, documentar supuestos, monitorear entorno y tomar decisiones donde mercado, Estado y sociedad se encuentran.",
    thesis: "Un territorio atractivo en una tabla puede ser inviable en operación. La decisión mejora cuando demanda, infraestructura, instituciones y riesgo se leen como sistema.",
    accent: "#a17a24",
    questions: ["¿Dónde conviene invertir?", "¿Qué riesgos deben validarse?", "¿Qué cambia la viabilidad operativa?"],
    solutionSlugs: ["inteligencia-territorial-inversion", "monitoreo-entorno-impacto", "encuestas-escucha-ciudadana"],
    primaryHref: "/sectors/companies",
    primaryLabel: "Soluciones para empresas"
  },
  ia: {
    topic: "ia",
    eyebrow: "IA y transformación",
    title: "Procesos mejores antes que tecnología más llamativa",
    description: "Criterios, controles y pilotos para aplicar automatización e inteligencia artificial a problemas institucionales verificables.",
    thesis: "La unidad correcta de adopción no es el modelo: es el proceso. El valor aparece cuando datos, riesgo, supervisión y medición se diseñan desde el inicio.",
    accent: "#475c63",
    questions: ["¿Qué proceso vale la pena intervenir?", "¿Qué datos y controles hacen falta?", "¿Cómo medir antes de escalar?"],
    solutionSlugs: ["ia-procesos-publicos"],
    primaryHref: "/services/ia-transformacion-gestion",
    primaryLabel: "IA para la gestión"
  }
};

export const editorialCollections = [
  { type: "insights" as const, label: "Estudios", description: "Análisis que estructuran problemas, métodos y decisiones.", href: "/insights" },
  { type: "indicators" as const, label: "Indicadores", description: "Definiciones y arquitecturas de medición interpretables.", href: "/indicators" },
  { type: "toolkits" as const, label: "Métodos y guías", description: "Herramientas breves para aplicar criterios en un equipo.", href: "/toolkits" },
  { type: "cases" as const, label: "Casos", description: "Productos y capacidades documentados con límites explícitos.", href: "/cases" }
];

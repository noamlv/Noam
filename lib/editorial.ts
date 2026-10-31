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
    title: "Estudios y datos para mejorar la gestión pública",
    description: "Análisis para conocer problemas, revisar inversiones y servicios, y dar seguimiento al trabajo de una entidad pública.",
    thesis: "Para usar los datos en la gestión hace falta definir qué problema se revisará, quién es responsable y qué recursos y plazos están disponibles.",
    accent: "#b95337",
    questions: ["¿Qué debe priorizar una nueva gestión?", "¿Cómo seguir inversión y servicios?", "¿Qué cambia entre territorios?"],
    solutionSlugs: ["diagnostico-agenda-territorial", "linea-base-evaluacion-programas", "observatorio-gestion-inversiones", "encuestas-escucha-ciudadana"],
    primaryHref: "/sectors/public-sector",
    primaryLabel: "Soluciones para gobiernos"
  },
  inversion: {
    topic: "inversion",
    eyebrow: "Inversión y territorio",
    title: "Estudios para conocer mercados y territorios",
    description: "Métodos para comparar ubicaciones, estudiar la demanda y revisar los riesgos de una inversión.",
    thesis: "Antes de invertir conviene comprobar la demanda, el acceso, los costos, los servicios y los riesgos de cada ubicación. Los datos públicos son un punto de partida que debe contrastarse en campo.",
    accent: "#a17a24",
    questions: ["¿Dónde conviene invertir?", "¿Qué riesgos deben validarse?", "¿Qué cambia la viabilidad operativa?"],
    solutionSlugs: ["inteligencia-territorial-inversion", "monitoreo-entorno-impacto", "encuestas-escucha-ciudadana"],
    primaryHref: "/sectors/companies",
    primaryLabel: "Soluciones para empresas"
  },
  ia: {
    topic: "ia",
    eyebrow: "IA y transformación",
    title: "IA y automatización para tareas concretas",
    description: "Guías para elegir una tarea, revisar los datos y probar la inteligencia artificial con controles y supervisión.",
    thesis: "Empieza por una tarea que necesite mejorar. Antes de probar la IA, define los datos que puede usar, cómo revisar las respuestas y qué resultados permitirían continuar o detener la prueba.",
    accent: "#475c63",
    questions: ["¿Qué proceso vale la pena intervenir?", "¿Qué datos y controles hacen falta?", "¿Cómo medir antes de escalar?"],
    solutionSlugs: ["ia-procesos-publicos"],
    primaryHref: "/services/ia-transformacion-gestion",
    primaryLabel: "IA para la gestión"
  }
};

export const editorialCollections = [
  { type: "insights" as const, label: "Estudios", description: "Análisis de problemas y métodos para investigarlos.", href: "/insights" },
  { type: "indicators" as const, label: "Indicadores", description: "Qué mide cada indicador y cómo interpretar sus resultados.", href: "/indicators" },
  { type: "toolkits" as const, label: "Métodos y guías", description: "Preguntas, listas de revisión y plantillas para tu equipo.", href: "/toolkits" },
  { type: "cases" as const, label: "Casos", description: "Consultorías realizadas, productos propios y demostraciones.", href: "/cases" }
];

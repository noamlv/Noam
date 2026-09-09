import type { PlatformResource } from "../types/platform.ts";

export const platformResourceCatalog: PlatformResource[] = [
  {
    slug: "planometro-organizaciones-2026",
    title: "Planómetro 2026: organizaciones",
    description: "Agregados por organización política del snapshot presidencial 2026 publicado por NOAM.",
    kind: "dataset",
    url: "/downloads/planometro-2026-partidos.csv",
    productSlug: "planometro-electoral",
    sourceLabel: "Planómetro NOAM",
    period: "Elecciones generales 2026",
    format: "CSV"
  },
  {
    slug: "planometro-ejes-2026",
    title: "Planómetro 2026: ejes temáticos",
    description: "Agregados comparables por eje del corpus de planes de gobierno procesado por NOAM.",
    kind: "dataset",
    url: "/downloads/planometro-2026-ejes.csv",
    productSlug: "planometro-electoral",
    sourceLabel: "Planómetro NOAM",
    period: "Elecciones generales 2026",
    format: "CSV"
  },
  {
    slug: "limites-departamentales-referencia-2025",
    title: "Límites departamentales referenciales",
    description: "Geometrías simplificadas utilizadas por el visor departamental de DataPerú, con atribución y metadatos de origen.",
    kind: "dataset",
    url: "/downloads/peru-departments-reference-2025.geojson",
    productSlug: "mapa-gestion-territorial",
    sourceLabel: "INEI · procesamiento NOAM",
    period: "Referencia 2025",
    format: "GeoJSON"
  },
  {
    slug: "panorama-municipal-departamentos-2025",
    title: "Panorama municipal 2025: tabla departamental",
    description: "Tabla detrás del estudio insignia con población, recursos, ejecución e inversión municipal por departamento.",
    kind: "dataset",
    url: "/dataperu/panorama-municipal-2025/data.csv",
    productSlug: "dataperu",
    sourceLabel: "RENAMU · INEI · MEF · NOAM",
    period: "2025",
    format: "CSV"
  },
  {
    slug: "perfiles-municipales-dataperu",
    title: "Buscador nacional de perfiles municipales",
    description: "Acceso a 1,891 perfiles territoriales con capacidad declarada, población, presupuesto y cartera visible de proyectos.",
    kind: "explorer",
    url: "/dataperu/municipios",
    productSlug: "observatorio-territorial",
    sourceLabel: "DataPerú",
    period: "Fuentes 2025",
    format: "Web"
  },
  {
    slug: "guia-gobernanza-ia",
    title: "Guía de gobernanza de IA para equipos directivos",
    description: "Marco inicial para priorizar valor, riesgos, supervisión, pruebas y escalamiento institucional.",
    kind: "toolkit",
    url: "/toolkits/ai-governance-playbook",
    productSlug: "ai-governance-lab",
    sourceLabel: "NOAM",
    format: "Guía web"
  },
  {
    slug: "ficha-priorizacion-caso-uso-ia",
    title: "Ficha para priorizar un caso de uso de IA",
    description: "Plantilla para comparar oportunidad, datos, exposición, controles y condiciones de una prueba acotada.",
    kind: "template",
    url: "/toolkits/ficha-priorizacion-caso-uso-ia",
    productSlug: "ai-governance-lab",
    sourceLabel: "NOAM",
    format: "Plantilla web + CSV"
  },
  {
    slug: "diseno-encuesta-decision",
    title: "Guía para diseñar una encuesta que sirva para decidir",
    description: "Preguntas y controles mínimos para conectar muestra, cuestionario, análisis y decisión.",
    kind: "methodology",
    url: "/toolkits/diseno-encuesta-para-decidir",
    productSlug: "barometro-electoral-enero-2026",
    sourceLabel: "NOAM",
    format: "Guía web"
  },
  {
    slug: "tdr-estudio-analisis-datos",
    title: "Guía y matriz para TDR de estudios y análisis de datos",
    description: "Estructura editable para definir necesidad, objetivos, datos, productos, aceptación, roles y transferencia antes de contratar un servicio.",
    kind: "template",
    url: "/toolkits/tdr-estudio-analisis-datos",
    productSlug: "dataperu",
    sourceLabel: "NOAM · marco OECE",
    period: "Revisión septiembre 2026",
    format: "Guía web + CSV"
  },
  {
    slug: "tdr-encuesta-estudio-territorial",
    title: "TDR para encuestas y estudios territoriales",
    description: "Matriz para definir población, muestra, instrumento, campo, privacidad, análisis y criterios verificables de aceptación.",
    kind: "template",
    url: "/toolkits/tdr-encuesta-estudio-territorial",
    productSlug: "barometro-electoral-enero-2026",
    sourceLabel: "NOAM · INEI · marco OECE",
    period: "Revisión septiembre 2026",
    format: "Guía web + CSV"
  },
  {
    slug: "tdr-observatorio-dashboard-visor",
    title: "TDR para observatorios, dashboards y visores",
    description: "Matriz para contratar indicadores, datos, seguridad, pruebas, transferencia y operación de un sistema de decisión.",
    kind: "template",
    url: "/toolkits/tdr-observatorio-dashboard-visor",
    productSlug: "observatorio-territorial",
    sourceLabel: "NOAM · CEPLAN · PCM · marco OECE",
    period: "Revisión septiembre 2026",
    format: "Guía web + CSV"
  },
  {
    slug: "tdr-linea-base-evaluacion-programa",
    title: "TDR para línea de base y evaluación de programas",
    description: "Matriz para definir evaluabilidad, preguntas, indicadores, datos, comparación, productos, uso y criterios verificables de aceptación.",
    kind: "template",
    url: "/toolkits/tdr-linea-base-evaluacion-programa",
    productSlug: "dataperu",
    sourceLabel: "NOAM · CEPLAN · MEF · marco OECE",
    period: "Revisión septiembre 2026",
    format: "Guía web + CSV"
  },
  {
    slug: "tdr-diagnostico-territorial-institucional",
    title: "TDR para diagnóstico territorial e institucional",
    description: "Matriz para conectar población, servicios, brechas, economía, territorio, capacidad institucional y prioridades con productos verificables.",
    kind: "template",
    url: "/toolkits/tdr-diagnostico-territorial-institucional",
    productSlug: "dataperu",
    sourceLabel: "NOAM · CEPLAN · MEF · MINAM · marco OECE",
    period: "Revisión septiembre 2026",
    format: "Guía web + CSV"
  },
  {
    slug: "tdr-estudio-mercado-inteligencia-territorial",
    title: "TDR para estudios de mercado e inteligencia territorial",
    description: "Matriz para contratar demanda, segmentación, localización, análisis sectorial, escenarios y validación con fuentes y supuestos trazables.",
    kind: "template",
    url: "/toolkits/tdr-estudio-mercado-inteligencia-territorial",
    productSlug: "dataperu",
    sourceLabel: "NOAM · INEI · PRODUCE · PROMPERÚ · MEF",
    period: "Revisión septiembre 2026",
    format: "Guía web + CSV"
  },
  {
    slug: "tdr-analisis-seguridad-ciudadana",
    title: "TDR para análisis de seguridad ciudadana",
    description: "Matriz para contratar diagnósticos, encuestas, mapas, observatorios o evaluaciones con fuentes, privacidad y aceptación verificable.",
    kind: "template",
    url: "/toolkits/tdr-analisis-seguridad-ciudadana",
    productSlug: "visor-riesgo-georreferenciado",
    sourceLabel: "NOAM · MININTER · INEI · RENAMU",
    period: "Revisión septiembre 2026",
    format: "Guía web + CSV"
  },
  {
    slug: "tdr-analisis-residuos-limpieza-publica",
    title: "TDR para análisis de residuos y limpieza pública",
    description: "Matriz para contratar diagnósticos, optimización de rutas, balances, tableros o evaluaciones del servicio municipal.",
    kind: "template",
    url: "/toolkits/tdr-analisis-residuos-limpieza-publica",
    productSlug: "dataperu",
    sourceLabel: "NOAM · MINAM · SIGERSOL · INEI",
    period: "Revisión septiembre 2026",
    format: "Guía web + CSV"
  },
  {
    slug: "tdr-analisis-gestion-riesgo-desastres",
    title: "TDR para análisis y gestión del riesgo de desastres",
    description: "Matriz para contratar diagnósticos, escenarios, mapas, PPRRD, COEL o sistemas de seguimiento con criterios verificables.",
    kind: "template",
    url: "/toolkits/tdr-analisis-gestion-riesgo-desastres",
    productSlug: "visor-riesgo-georreferenciado",
    sourceLabel: "NOAM · PCM · CENEPRED · INDECI · INEI",
    period: "Revisión septiembre 2026",
    format: "Guía web + CSV"
  },
  {
    slug: "tdr-analisis-desarrollo-economico-local",
    title: "TDR para análisis de desarrollo económico local",
    description: "Matriz para contratar diagnósticos productivos, empleo, cadenas de valor, mercados o sistemas de seguimiento con resultados verificables.",
    kind: "template",
    url: "/toolkits/tdr-analisis-desarrollo-economico-local",
    productSlug: "dataperu",
    sourceLabel: "NOAM · PCM · INEI · PRODUCE · MTPE · PROMPERÚ",
    period: "Revisión septiembre 2026",
    format: "Guía web + CSV"
  },
  {
    slug: "tdr-analisis-gestion-ambiental",
    title: "TDR para análisis de gestión ambiental",
    description: "Matriz para contratar diagnósticos, líneas de base, monitoreo, observatorios o seguimiento de fiscalización ambiental.",
    kind: "template",
    url: "/toolkits/tdr-analisis-gestion-ambiental",
    productSlug: "dataperu",
    sourceLabel: "NOAM · MINAM · OEFA · RENAMU",
    period: "Revisión septiembre 2026",
    format: "Guía web + CSV"
  },
  {
    slug: "tdr-analisis-agua-saneamiento",
    title: "TDR para análisis de agua y saneamiento",
    description: "Matriz para contratar diagnósticos, líneas de base, observatorios, priorización de inversiones o evaluación de servicios de agua y saneamiento.",
    kind: "template",
    url: "/toolkits/tdr-analisis-agua-saneamiento",
    productSlug: "dataperu",
    sourceLabel: "NOAM · MVCS · SUNASS · ANA · INEI",
    period: "Revisión septiembre 2026",
    format: "Guía web + CSV"
  },
  {
    slug: "tdr-analisis-movilidad-transporte",
    title: "TDR para análisis de movilidad y transporte",
    description: "Matriz para contratar diagnósticos, encuestas, planes, observatorios, seguridad vial o evaluación de movilidad y transporte urbano.",
    kind: "template",
    url: "/toolkits/tdr-analisis-movilidad-transporte",
    productSlug: "dataperu",
    sourceLabel: "NOAM · MTC · Promovilidad · ONSV",
    period: "Revisión septiembre 2026",
    format: "Guía web + CSV"
  },
  {
    slug: "tdr-analisis-politicas-sociales",
    title: "TDR para análisis de políticas y programas sociales",
    description: "Matriz para contratar diagnósticos, focalización, líneas de base, seguimiento o evaluación de políticas, programas y servicios sociales.",
    kind: "template",
    url: "/toolkits/tdr-analisis-politicas-sociales",
    productSlug: "dataperu",
    sourceLabel: "NOAM · MIDIS · INEI · Datos Abiertos Perú",
    period: "Revisión septiembre 2026",
    format: "Guía web + CSV"
  }
];

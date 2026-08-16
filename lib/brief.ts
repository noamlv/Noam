import { dataperuSources, renamuSource, renamuSummary } from "@/lib/dataperu";
import { panoramaFindings, panoramaPublicationDate } from "@/lib/dataperu-panorama";

export type BriefSignal = {
  number: string;
  label: string;
  value: string;
  title: string;
  reading: string;
  decision: string;
  limit: string;
  sourceLabel: string;
  sourceHref: string;
};

export type BriefEdition = {
  slug: string;
  issue: string;
  date: string;
  title: string;
  description: string;
  lead: string;
  readingTime: string;
  topic: "gobierno" | "inversion" | "ia";
  signals: BriefSignal[];
  actions: Array<{ title: string; description: string }>;
  sources: Array<{ publisher: string; title: string; period: string; href: string; note: string }>;
  related: Array<{ label: string; description: string; href: string }>;
};

const [scaleFinding, , investmentFinding, transparencyFinding] = panoramaFindings;

export const briefEditions: BriefEdition[] = [
  {
    slug: "municipios-distintos-decisiones-distintas",
    issue: "01",
    date: panoramaPublicationDate,
    title: "Municipios distintos exigen decisiones distintas.",
    description: "Tres señales para dimensionar intervenciones públicas sin convertir el promedio nacional en una receta.",
    lead: "El mismo formato, plazo o sistema puede ser razonable para una municipalidad y desproporcionado para otra. La escala operativa, la dispersión de la inversión y la transparencia declarada ofrecen un punto de partida para diseñar mejor.",
    readingTime: "6 min",
    topic: "gobierno",
    signals: [
      {
        number: "01",
        label: scaleFinding.label,
        value: scaleFinding.value,
        title: scaleFinding.title,
        reading: `La mediana de personal reportado es de ${renamuSummary.byType.Provincial.medianReportedWorkforce?.toLocaleString("es-PE")} personas en municipalidades provinciales y ${renamuSummary.byType.Distrital.medianReportedWorkforce?.toLocaleString("es-PE")} en distritales. La diferencia no mide calidad: describe una capacidad operativa central radicalmente distinta.`,
        decision: "Antes de fijar productos, plazos o requerimientos de información, segmenta por tipo de municipalidad y capacidad disponible. Un estándar común puede conservar el objetivo, pero no debería imponer la misma operación.",
        limit: "RENAMU recoge información declarada. La dotación de personal no informa por sí sola sobre perfiles, productividad, tercerización ni calidad de gestión.",
        sourceLabel: "RENAMU 2025 · INEI",
        sourceHref: renamuSource.datasetUrl
      },
      {
        number: "02",
        label: investmentFinding.label,
        value: investmentFinding.value,
        title: investmentFinding.title,
        reading: `Entre los extremos departamentales, la ejecución agregada de inversión municipal difiere en ${investmentFinding.value}. El promedio nacional oculta una distribución que cambia el lugar donde conviene investigar.`,
        decision: "Usa la brecha como señal para revisar cartera, expedientes, contratación, hitos y restricciones por territorio. El siguiente paso no es premiar o sancionar, sino localizar el cuello de botella verificable.",
        limit: "La ejecución financiera no equivale a avance físico, calidad de obra o impacto. Tampoco identifica una causa sin revisar proyectos y procesos concretos.",
        sourceLabel: "Ejecución de gasto 2025 · MEF",
        sourceHref: dataperuSources.budget.pageUrl
      },
      {
        number: "03",
        label: transparencyFinding.label,
        value: transparencyFinding.value,
        title: transparencyFinding.title,
        reading: `Solo ${transparencyFinding.value} de las municipalidades declaró tener actualizado su portal de transparencia. La señal importa porque cualquier sistema de decisión depende también de información accesible y vigente.`,
        decision: "Incluye una línea de base mínima de publicación, responsables y frecuencia de actualización dentro del proyecto. La transparencia no debería aparecer al final como requisito documental.",
        limit: "La variable es declarada y no evalúa oportunidad, completitud, facilidad de uso ni cumplimiento normativo de cada portal.",
        sourceLabel: "RENAMU 2025 · INEI",
        sourceHref: renamuSource.datasetUrl
      }
    ],
    actions: [
      { title: "Definir la decisión", description: "Formula una decisión concreta que deba mejorar en los próximos 90 días, no una lista general de problemas." },
      { title: "Segmentar la operación", description: "Separa territorios o entidades por escala, capacidad y disponibilidad de datos antes de diseñar un único entregable." },
      { title: "Abrir el cuello de botella", description: "Descompón la brecha de inversión en proyectos, hitos y restricciones que sí puedan verificarse y gestionarse." },
      { title: "Acordar evidencia mínima", description: "Define fuente, responsable, periodicidad y límites de cada indicador antes de construir el tablero o informe." }
    ],
    sources: [
      {
        publisher: renamuSource.publisher,
        title: renamuSource.name,
        period: renamuSource.referencePeriod,
        href: renamuSource.datasetUrl,
        note: renamuSource.notes
      },
      {
        publisher: dataperuSources.budget.publisher,
        title: dataperuSources.budget.name,
        period: dataperuSources.budget.referencePeriod,
        href: dataperuSources.budget.pageUrl,
        note: dataperuSources.budget.notes
      }
    ],
    related: [
      { label: "Panorama municipal del Perú 2025", description: "Estudio completo, tabla departamental, método y datos descargables.", href: "/dataperu/panorama-municipal-2025" },
      { label: "Radar de gestión municipal", description: "Explora distribuciones y perfiles de 1,891 municipalidades.", href: "/dataperu/radar" },
      { label: "Diseñador de alcance", description: "Convierte una necesidad institucional en un brief inicial.", href: "/diagnostico" }
    ]
  }
];

export function getBriefEdition(slug: string) {
  return briefEditions.find((edition) => edition.slug === slug);
}

export function getLatestBriefEdition() {
  return [...briefEditions].sort((left, right) => +new Date(right.date) - +new Date(left.date))[0];
}

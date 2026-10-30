import snapshots from "../data/processed/diplomatura-analysis-snapshots.json" with { type: "json" };
import waste from "../data/processed/minam-waste-generation-2014-2024.json" with { type: "json" };

export type AnalysisGroup = { label: string; value: number; records: number };
export type AnalysisSlice = { period: string; label: string; groups: AnalysisGroup[]; missing: number };
export type AnalysisSnapshot = { slug: string; unit: string; sourceRows: number; sha256: string; slices: AnalysisSlice[] };
export type AnalysisEntry = {
  slug: string; title: string; headline: string; description: string; category: string;
  period: string; source: string; sourceUrl: string; scope: string;
  questions: string[]; findings: string[]; limits: string[]; serviceHref: string; offer: string;
};

export const analysisLibrary: AnalysisEntry[] = [
  {
    slug: "residuos-municipales", title: "Residuos municipales", category: "Ambiente y servicios públicos",
    headline: "Generación de residuos municipales.",
    description: "Consulta cuánto residuo municipal se estima que genera cada departamento y cómo cambia la cifra por año. Estos datos ayudan a preparar estudios sobre los residuos y su gestión local.",
    period: "2014–2024 · corte del archivo: 18 de diciembre de 2025",
    source: "MINAM · SIGERSOL", sourceUrl: waste.source.datasetUrl, scope: "25 departamentos",
    findings: ["La serie contiene once años de estimaciones de generación municipal.", "La cobertura pasa de 1.851 distritos en 2014 a 1.891 en 2024. Al comparar años, ten en cuenta que cambia el conjunto de distritos incluidos.", "Las capacidades declaradas de recolección y disposición se consultan por separado en DataPerú."],
    questions: ["¿Qué volumen debe atender el servicio local?", "¿Qué información falta sobre rutas, costos y disposición?", "¿Qué habría que medir antes de ampliar infraestructura?"],
    limits: ["Las cifras estiman los residuos generados. Para conocer cuánto se recoge y dónde se dispone, hay que consultar otras fuentes.", "Las columnas parciales de 2023 no suman el total del archivo; por eso se publica solo el total municipal.", "Los volúmenes sirven para comparar cantidades de residuos. Evaluar el desempeño municipal requiere información adicional sobre la gestión del servicio."],
    serviceHref: "/analisis-datos-residuos-limpieza-publica", offer: "Diagnóstico de generación, operación y capacidad de gestión de residuos."
  },
  {
    slug: "planes-territoriales", title: "Planes de acondicionamiento territorial", category: "Territorio y planeamiento",
    headline: "Estado reportado de los planes territoriales.",
    description: "Consulta cuántas provincias tienen planes de acondicionamiento territorial (PAT) en cada estado reportado, agrupadas por departamento. Para conocer la vigencia de un plan en particular, hace falta revisar sus documentos.",
    period: "Copia de trabajo con referencias RENAMU 2024 / DGPRVU 2025; sin fecha de corte única acreditada",
    source: "MVCS · INEI / RENAMU", sourceUrl: "https://www.datosabiertos.gob.pe/dataset/estado-de-planes-de-acondicionamiento-territorial", scope: "196 provincias en la copia",
    findings: ["El archivo de trabajo cubre 196 provincias.", "Contiene seis etiquetas de estado, conservadas tal como las reporta la fuente. La vigencia actual de cada plan requiere revisión documental.", "Si una provincia figura como «Sin Registro», hace falta consultar sus documentos para saber si cuenta con un plan."],
    questions: ["¿Qué instrumentos requieren verificación documental?", "¿Qué provincias necesitan asistencia técnica o actualización?", "¿Cómo vincular el planeamiento con inversión y servicios?"],
    limits: ["Esta copia histórica conserva los datos del archivo recibido y no se actualiza en tiempo real.", "«Vigente Act.» y «Vigente Des.» son etiquetas de la fuente; NOAM no certifica vigencia jurídica.", "La ficha oficial no especifica licencia. Solo publicamos recuentos analíticos, no el archivo provincial original."],
    serviceHref: "/analisis-catastro-desarrollo-urbano-territorial", offer: "Revisión de instrumentos, diagnóstico territorial y agenda de actualización."
  },
  {
    slug: "registro-discapacidad", title: "Discapacidad y registro", category: "Inclusión y políticas sociales",
    headline: "Discapacidad y acceso al registro.",
    description: "Consulta las inscripciones reportadas a CONADIS por año y departamento. Revisa qué información falta para estudiar el acceso al registro y la coordinación con otros servicios.",
    period: "2012–septiembre de 2025 · último reporte del archivo: 14 de octubre de 2025",
    source: "MIMP · CONADIS", sourceUrl: "https://www.datosabiertos.gob.pe/dataset/mimp-n%C3%BAmero-de-personas-con-discapacidad-inscritas-en-el-registro-nacional-de-la-persona-con", scope: "Agregados departamentales",
    findings: ["La copia distingue periodos anuales y un periodo parcial de enero a septiembre de 2025.", "El registro cubre las inscripciones reportadas. Estimar qué proporción de la población tiene discapacidad o identificar a todas las personas sin atención requiere otras fuentes.", "Los gráficos identifican los valores faltantes y los mantienen sin dato, en lugar de asignarles cero."],
    questions: ["¿Qué barreras dificultan acceder al registro?", "¿Qué información adicional necesita una Oficina Municipal de Atención a la Persona con Discapacidad (OMAPED)?", "¿Cómo coordinar el registro con los servicios y una atención accesible?"],
    limits: ["Al comparar periodos, recuerda que enero–septiembre de 2025 cubre solo parte del año.", "Se cuentan inscripciones reportadas en cada periodo. Para conocer el número acumulado de personas únicas o la atención que recibieron, se necesita información adicional.", "Solo se publican sumas departamentales; no hay nombres, diagnósticos individuales ni detalle distrital sensible.", "En los años con valores faltantes el total es parcial; los gráficos los identifican."],
    serviceHref: "/analisis-datos-politicas-sociales", offer: "Diagnóstico de acceso, necesidades de información y seguimiento de servicios inclusivos."
  },
  {
    slug: "apoyo-deportista", title: "Apoyo al deportista", category: "Deporte y gestión pública",
    headline: "Apoyo económico al deporte.",
    description: "Consulta los montos reportados por modalidad de apoyo del Instituto Peruano del Deporte (IPD). La versión pública muestra los datos financieros agrupados y protege la identidad de los deportistas.",
    period: "2013–septiembre de 2025 · corte del archivo: 30 de septiembre de 2025",
    source: "Instituto Peruano del Deporte · PAD", sourceUrl: "https://www.datosabiertos.gob.pe/dataset/programa-apoyo-al-deportista-deportistas-beneficiados-instituto-peruano-del-deporte-ipd", scope: "Modalidades de apoyo",
    findings: ["La base contiene 68.938 filas de beneficios reportados. Una persona puede aparecer más de una vez; 68.938 es el número de filas, no de personas distintas.", "Las modalidades PAD I, PAD II y PNM aparecen con los nombres de la fuente cuando tienen registros en el periodo seleccionado.", "Los montos permiten estudiar la asignación reportada. Evaluar el impacto deportivo y verificar la ejecución presupuestal exige información adicional."],
    questions: ["¿Cómo se distribuye el monto entre modalidades?", "¿Qué indicadores permitirían seguir continuidad y resultados?", "¿Qué datos adicionales exige una evaluación del programa?"],
    limits: ["2025 solo incluye enero–septiembre en esta copia.", "No se publican nombres, apellidos, trayectorias individuales ni microdatos descargables.", "Los montos se suman según el archivo; no se han conciliado con la contabilidad del IPD ni ajustado por inflación.", "Para ubicar el gasto se necesitarían datos del lugar de ejecución. El archivo registra el lugar de nacimiento del deportista, por lo que omitimos el mapa de inversión territorial."],
    serviceHref: "/services/estudios-diagnosticos-evaluacion", offer: "Sistema de información, seguimiento de beneficios y evaluación de programas deportivos."
  },
  {
    slug: "conteo-presidencial-2026", title: "Conteo presidencial 2026", category: "Electoral · archivo histórico",
    headline: "Conteo presidencial: archivo parcial del 15 de abril de 2026.",
    description: "Consulta los votos de esta copia histórica por organización política, en Perú y en el extranjero. Cada porcentaje indica sobre qué total se calcula y conserva la fecha del archivo.",
    period: "15 de abril de 2026 · 11:58 a. m. · corte parcial histórico",
    source: "ONPE · copia histórica proporcionada para análisis", sourceUrl: "https://www.onpe.gob.pe/", scope: "84.720 filas de mesas contabilizadas",
    findings: ["La copia contiene 84.720 mesas únicas con estado «Contabilizada».", "Distingue Perú y extranjero y 36 organizaciones políticas.", "Los porcentajes se calculan sobre los votos válidos de esta copia parcial, excluyendo blancos y nulos. El total final de la elección queda fuera de su alcance."],
    questions: ["¿Cómo se distribuyen los votos en Perú y en el extranjero en esta copia?", "¿Sobre qué total se calcula cada porcentaje?", "¿Qué archivos y fechas debe guardar un sistema de seguimiento electoral para que sus resultados puedan revisarse?"],
    limits: ["No es el resultado final, no se actualiza en vivo y no sustituye a ONPE ni JNE.", "La hora corresponde al nombre del archivo recibido; no ha sido certificada independientemente.", "No se calcula porcentaje de avance: esta copia no acredita el universo total de actas.", "No usar este corte para proclamar resultados, predecir ganadores ni describir la situación electoral actual."],
    serviceHref: "/electoral", offer: "Observatorios electorales con archivos fechados y análisis por territorio."
  }
];

export function getAnalysis(slug: string) { return analysisLibrary.find((entry) => entry.slug === slug); }

export function getAnalysisSnapshot(slug: string): AnalysisSnapshot | undefined {
  if (slug === "residuos-municipales") return {
    slug, unit: "toneladas anuales estimadas", sourceRows: 20_650, sha256: waste.source.sha256,
    slices: waste.annual.map((annual) => ({ period: String(annual.year), label: String(annual.year), missing: 0,
      groups: waste.departments.map((department) => {
        const row = department.annual.find((item) => item.year === annual.year)!;
        return { label: department.name, value: row.tonnes, records: row.districts };
      }).sort((a, b) => b.value - a.value)
    }))
  };
  return snapshots.find((snapshot) => snapshot.slug === slug);
}

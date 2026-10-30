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
    description: "Una lectura de la generación estimada de residuos por departamento para planificar diagnósticos, estudios de caracterización y seguimiento municipal.",
    period: "2014–2024 · corte del archivo: 18 de diciembre de 2025",
    source: "MINAM · SIGERSOL", sourceUrl: waste.source.datasetUrl, scope: "25 departamentos",
    findings: ["La serie contiene once años de estimaciones de generación municipal.", "La cobertura pasa de 1.851 distritos en 2014 a 1.891 en 2024; no es un panel territorial constante.", "Las capacidades declaradas de recolección y disposición se consultan por separado en DataPerú."],
    questions: ["¿Qué volumen debe atender el servicio local?", "¿Qué información falta sobre rutas, costos y disposición?", "¿Qué habría que medir antes de ampliar infraestructura?"],
    limits: ["Generación estimada no equivale a recolección ni disposición final.", "Las columnas parciales de 2023 no concilian con el total; se publica solo el total municipal.", "Las diferencias de volumen no son un ranking de desempeño municipal."],
    serviceHref: "/analisis-datos-residuos-limpieza-publica", offer: "Diagnóstico de generación, operación y capacidad de gestión de residuos."
  },
  {
    slug: "planes-territoriales", title: "Planes de acondicionamiento territorial", category: "Territorio y planeamiento",
    headline: "Planeamiento territorial, provincia por provincia.",
    description: "Una lectura provincial del estado reportado de los PAT para comenzar una revisión de instrumentos, vigencia documental y necesidades de actualización.",
    period: "Copia de trabajo con referencias RENAMU 2024 / DGPRVU 2025; sin fecha de corte única acreditada",
    source: "MVCS · INEI / RENAMU", sourceUrl: "https://www.datosabiertos.gob.pe/dataset/estado-de-planes-de-acondicionamiento-territorial", scope: "196 provincias en la copia",
    findings: ["El archivo de trabajo cubre 196 provincias.", "Contiene seis etiquetas de estado; se conservan como fueron reportadas, no como una verificación actual de vigencia.", "La categoría «Sin Registro» abre una consulta documental; no prueba por sí sola que un plan no exista."],
    questions: ["¿Qué instrumentos requieren verificación documental?", "¿Qué provincias necesitan asistencia técnica o actualización?", "¿Cómo vincular el planeamiento con inversión y servicios?"],
    limits: ["Es una copia histórica, no un registro actualizado en tiempo real.", "«Vigente Act.» y «Vigente Des.» son etiquetas de la fuente; NOAM no certifica vigencia jurídica.", "La ficha oficial no especifica licencia. Solo publicamos recuentos analíticos, no el archivo provincial original."],
    serviceHref: "/analisis-catastro-desarrollo-urbano-territorial", offer: "Revisión de instrumentos, diagnóstico territorial y agenda de actualización."
  },
  {
    slug: "registro-discapacidad", title: "Discapacidad y registro", category: "Inclusión y políticas sociales",
    headline: "Discapacidad y acceso al registro.",
    description: "Explora inscripciones reportadas a CONADIS por año y departamento para formular preguntas de acceso, articulación de servicios y calidad de información.",
    period: "2012–septiembre de 2025 · último reporte del archivo: 14 de octubre de 2025",
    source: "MIMP · CONADIS", sourceUrl: "https://www.datosabiertos.gob.pe/dataset/mimp-n%C3%BAmero-de-personas-con-discapacidad-inscritas-en-el-registro-nacional-de-la-persona-con", scope: "Agregados departamentales",
    findings: ["La copia distingue periodos anuales y un periodo parcial de enero a septiembre de 2025.", "Los registros administrativos no estiman la prevalencia de discapacidad ni identifican a toda la población desatendida.", "El dashboard conserva los registros faltantes como una limitación visible, sin convertirlos en cero."],
    questions: ["¿Qué barreras dificultan acceder al registro?", "¿Qué evidencia adicional necesita una OMAPED?", "¿Cómo articular el registro con servicios y atención accesible?"],
    limits: ["No comparar enero–septiembre de 2025 como si fuera un año completo.", "Son inscripciones reportadas en cada periodo, no un padrón acumulado de personas únicas ni una medida de atención efectiva.", "Solo se publican sumas departamentales; no hay nombres, diagnósticos individuales ni detalle distrital sensible.", "En los años con valores faltantes el total es parcial; el dashboard los identifica."],
    serviceHref: "/analisis-datos-politicas-sociales", offer: "Diagnóstico de acceso, necesidades de información y seguimiento de servicios inclusivos."
  },
  {
    slug: "apoyo-deportista", title: "Apoyo al deportista", category: "Deporte y gestión pública",
    headline: "Apoyo económico al deporte.",
    description: "Una lectura del monto reportado por modalidad de apoyo del IPD. La versión pública mantiene el análisis financiero y excluye la identificación de deportistas.",
    period: "2013–septiembre de 2025 · corte del archivo: 30 de septiembre de 2025",
    source: "Instituto Peruano del Deporte · PAD", sourceUrl: "https://www.datosabiertos.gob.pe/dataset/programa-apoyo-al-deportista-deportistas-beneficiados-instituto-peruano-del-deporte-ipd", scope: "Modalidades de apoyo",
    findings: ["La base contiene 68.938 filas de beneficios reportados; no son 68.938 personas distintas.", "Se distinguen PAD I, PAD II y PNM cuando aparecen en el periodo seleccionado.", "El monto reportado permite estudiar asignación; no demuestra impacto deportivo ni acredita ejecución presupuestal."],
    questions: ["¿Cómo se distribuye el monto entre modalidades?", "¿Qué indicadores permitirían seguir continuidad y resultados?", "¿Qué datos adicionales exige una evaluación del programa?"],
    limits: ["2025 solo incluye enero–septiembre en esta copia.", "No se publican nombres, apellidos, trayectorias individuales ni microdatos descargables.", "Los montos se suman según el archivo; no se han conciliado con la contabilidad del IPD ni ajustado por inflación.", "El lugar de nacimiento de un deportista no indica dónde se ejecuta el gasto; por eso no se presenta un mapa de inversión territorial."],
    serviceHref: "/services/estudios-diagnosticos-evaluacion", offer: "Sistema de información, seguimiento de beneficios y evaluación de programas deportivos."
  },
  {
    slug: "conteo-presidencial-2026", title: "Conteo presidencial 2026", category: "Electoral · archivo histórico",
    headline: "Conteo presidencial: un corte, no el resultado final.",
    description: "Una muestra histórica para explorar votos por organización y ámbito, con denominadores explícitos y fecha del archivo visible.",
    period: "15 de abril de 2026 · 11:58 a. m. · corte parcial histórico",
    source: "ONPE · copia histórica proporcionada para análisis", sourceUrl: "https://www.onpe.gob.pe/", scope: "84.720 filas de mesas contabilizadas",
    findings: ["La copia contiene 84.720 mesas únicas con estado «Contabilizada».", "Distingue Perú y extranjero y 36 organizaciones políticas.", "Los porcentajes del dashboard usan votos válidos de la copia; excluyen blancos y nulos y no representan el universo final."],
    questions: ["¿Cómo cambia la composición entre Perú y extranjero en este corte?", "¿Qué denominador se utiliza para cada porcentaje?", "¿Qué debe conservar un sistema de seguimiento electoral auditable?"],
    limits: ["No es el resultado final, no se actualiza en vivo y no sustituye a ONPE ni JNE.", "La hora corresponde al nombre del archivo recibido; no ha sido certificada independientemente.", "No se calcula porcentaje de avance: esta copia no acredita el universo total de actas.", "No usar este corte para proclamar resultados, predecir ganadores ni describir la situación electoral actual."],
    serviceHref: "/electoral", offer: "Arquitectura de observatorios, trazabilidad de cortes y análisis electoral territorial."
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

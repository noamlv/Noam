import {
  dataperuSources,
  getMunicipality,
  getMunicipalityContext,
  getMunicipalityProjects,
  projectSource,
  renamuSource
} from "@/lib/dataperu";
import { educationRate, educationSource, getEducationDistrict } from "@/lib/dataperu-education";
import { getWaterSanitationDistrict, waterSanitationSource } from "@/lib/dataperu-water-sanitation";

export const revalidate = 86400;

type CsvRow = {
  section: string;
  key: string;
  label: string;
  value: string | number | boolean | null;
  unit: string;
  period: string;
  source: string;
  notes?: string;
};

function escapeCsv(value: CsvRow[keyof CsvRow]) {
  const text = value === null || value === undefined ? "" : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function sourceUrl(source: string) {
  if (source === renamuSource.name) return renamuSource.datasetUrl;
  if (source === dataperuSources.population.name) return dataperuSources.population.pageUrl;
  if (source === dataperuSources.budget.name) return dataperuSources.budget.datasetUrl;
  if (source === projectSource.name) return projectSource.resourceUrl;
  if (source === waterSanitationSource.name) return waterSanitationSource.datasetUrl;
  if (source === educationSource.name) return educationSource.datasetUrl;
  return "";
}

export async function GET(_request: Request, context: { params: Promise<{ ubigeo: string }> }) {
  const { ubigeo } = await context.params;
  const municipality = getMunicipality(ubigeo);
  const municipalContext = getMunicipalityContext(ubigeo);
  const waterSanitation = getWaterSanitationDistrict(ubigeo);
  const education = getEducationDistrict(ubigeo);
  if (!municipality || !municipalContext) return new Response("Municipalidad no encontrada", { status: 404 });

  const rows: CsvRow[] = [
    { section: "territorio", key: "ubigeo", label: "Código de ubigeo", value: municipality.ubigeo, unit: "código", period: "vigente en la fuente", source: renamuSource.name },
    { section: "territorio", key: "departamento", label: "Departamento", value: municipality.department, unit: "texto", period: "2025", source: renamuSource.name },
    { section: "territorio", key: "provincia", label: "Provincia", value: municipality.province, unit: "texto", period: "2025", source: renamuSource.name },
    { section: "territorio", key: "distrito", label: "Distrito", value: municipality.district, unit: "texto", period: "2025", source: renamuSource.name },
    { section: "poblacion", key: "poblacion_proyectada_2025", label: "Población proyectada", value: municipalContext.population.projected2025, unit: "personas", period: "30-06-2025", source: dataperuSources.population.name, notes: dataperuSources.population.notes },
    { section: "poblacion", key: "variacion_poblacion_2018_2025", label: "Variación poblacional proyectada 2018-2025", value: municipalContext.population.change2018To2025Percent, unit: "porcentaje", period: "2018-2025", source: dataperuSources.population.name },
    ...(waterSanitation ? [
      { section: "agua_saneamiento", key: "viviendas_universo", label: "Viviendas particulares ocupadas con personas presentes", value: waterSanitation.occupiedHousing, unit: "viviendas", period: "2025", source: waterSanitationSource.name, notes: "Universo utilizado para los indicadores de conexión a red pública." },
      { section: "agua_saneamiento", key: "agua_red_publica_viviendas", label: "Viviendas con abastecimiento de agua por red pública", value: waterSanitation.waterNetwork.value, unit: "viviendas", period: "2025", source: waterSanitationSource.name, notes: "No acredita continuidad, potabilidad, presión ni calidad." },
      { section: "agua_saneamiento", key: "agua_red_publica_porcentaje", label: "Viviendas con abastecimiento de agua por red pública", value: waterSanitation.waterNetwork.percent, unit: "porcentaje", period: "2025", source: waterSanitationSource.name, notes: "No acredita continuidad, potabilidad, presión ni calidad." },
      { section: "agua_saneamiento", key: "saneamiento_red_publica_viviendas", label: "Viviendas con servicio higiénico conectado a red pública", value: waterSanitation.sanitationNetwork.value, unit: "viviendas", period: "2025", source: waterSanitationSource.name, notes: "No acredita tratamiento ni disposición final segura de aguas residuales." },
      { section: "agua_saneamiento", key: "saneamiento_red_publica_porcentaje", label: "Viviendas con servicio higiénico conectado a red pública", value: waterSanitation.sanitationNetwork.percent, unit: "porcentaje", period: "2025", source: waterSanitationSource.name, notes: "No acredita tratamiento ni disposición final segura de aguas residuales." }
    ] satisfies CsvRow[] : []),
    ...(education ? [
      { section: "educacion", key: "matricula_ebr", label: "Matrícula de Educación Básica Regular", value: education.enrollment.total, unit: "estudiantes", period: "2025", source: educationSource.name, notes: "Matrícula registrada; no mide asistencia, permanencia ni aprendizaje." },
      { section: "educacion", key: "servicios_programas_ebr", label: "Servicios o programas de EBR con matrícula", value: education.servicePrograms.total, unit: "códigos modulares", period: "2025", source: educationSource.name, notes: "Un código modular no equivale automáticamente a un local físico distinto." },
      { section: "educacion", key: "matricula_rural", label: "Matrícula EBR en ámbito rural", value: education.enrollment.rural, unit: "estudiantes", period: "2025", source: educationSource.name, notes: "Ámbito del centro poblado asignado por la UE-Minedu." },
      { section: "educacion", key: "matricula_rural_porcentaje", label: "Matrícula EBR en ámbito rural", value: educationRate(education.enrollment.rural, education.enrollment.total), unit: "porcentaje", period: "2025", source: educationSource.name },
      { section: "educacion", key: "matricula_gestion_publica", label: "Matrícula EBR en gestión pública", value: education.enrollment.publicManagement, unit: "estudiantes", period: "2025", source: educationSource.name, notes: "Incluye gestión pública directa y pública de gestión privada." },
      { section: "educacion", key: "matricula_gestion_publica_porcentaje", label: "Matrícula EBR en gestión pública", value: educationRate(education.enrollment.publicManagement, education.enrollment.total), unit: "porcentaje", period: "2025", source: educationSource.name },
      { section: "educacion", key: "matricula_inicial", label: "Matrícula EBR en nivel inicial", value: education.enrollment.initial, unit: "estudiantes", period: "2025", source: educationSource.name },
      { section: "educacion", key: "matricula_primaria", label: "Matrícula EBR en primaria", value: education.enrollment.primary, unit: "estudiantes", period: "2025", source: educationSource.name },
      { section: "educacion", key: "matricula_secundaria", label: "Matrícula EBR en secundaria", value: education.enrollment.secondary, unit: "estudiantes", period: "2025", source: educationSource.name },
      { section: "educacion", key: "registros_imputacion_parcial", label: "Registros con imputación parcial", value: education.provenance.partialImputationRecords, unit: "registros", period: "2025", source: educationSource.name },
      { section: "educacion", key: "registros_imputacion_total", label: "Registros con imputación total", value: education.provenance.totalImputationRecords, unit: "registros", period: "2025", source: educationSource.name }
    ] satisfies CsvRow[] : []),
    { section: "presupuesto", key: "pia", label: "Presupuesto institucional de apertura", value: municipalContext.budget.pia, unit: "PEN", period: "2025", source: dataperuSources.budget.name },
    { section: "presupuesto", key: "pim", label: "Presupuesto institucional modificado", value: municipalContext.budget.pim, unit: "PEN", period: "2025", source: dataperuSources.budget.name },
    { section: "presupuesto", key: "devengado", label: "Devengado", value: municipalContext.budget.accrued, unit: "PEN", period: "2025", source: dataperuSources.budget.name },
    { section: "presupuesto", key: "ejecucion", label: "Ejecución presupuestal", value: municipalContext.budget.executionPercent, unit: "porcentaje", period: "2025", source: dataperuSources.budget.name, notes: "Devengado dividido entre PIM; no mide calidad ni resultados." },
    { section: "inversion", key: "pim_inversion", label: "PIM de inversión", value: municipalContext.investment.pim, unit: "PEN", period: "2025", source: dataperuSources.budget.name },
    { section: "inversion", key: "devengado_inversion", label: "Devengado de inversión", value: municipalContext.investment.accrued, unit: "PEN", period: "2025", source: dataperuSources.budget.name },
    { section: "inversion", key: "ejecucion_inversion", label: "Ejecución de inversión", value: municipalContext.investment.executionPercent, unit: "porcentaje", period: "2025", source: dataperuSources.budget.name },
    { section: "inversion", key: "proyectos_con_pim", label: "Proyectos con presupuesto", value: municipalContext.investment.projectsWithBudget, unit: "proyectos", period: "2025", source: projectSource.name },
    { section: "capacidad_digital", key: "internet", label: "Servicio de internet reportado", value: municipality.digital.hasInternet, unit: "booleano", period: "2025", source: renamuSource.name },
    { section: "capacidad_digital", key: "computadoras_operativas", label: "Computadoras operativas", value: municipality.digital.operationalComputers, unit: "equipos", period: "2025", source: renamuSource.name },
    { section: "capacidad_digital", key: "computadoras_con_internet", label: "Computadoras con acceso a internet", value: municipality.digital.computersWithInternet, unit: "equipos", period: "2025", source: renamuSource.name },
    { section: "equipo", key: "personal_reportado", label: "Personal reportado", value: municipality.workforce.reportedWorkforceTotal, unit: "personas", period: "31-03-2025", source: renamuSource.name, notes: "Suma descriptiva de personal y locación u orden de servicios publicados." },
    { section: "operacion", key: "serenazgo", label: "Brinda servicio de serenazgo", value: municipality.operations.providesSerenazgo, unit: "booleano", period: "2025", source: renamuSource.name },
    { section: "operacion", key: "coel", label: "Estado del COEL", value: municipality.operations.coelStatus, unit: "texto", period: "2025", source: renamuSource.name },
    ...getMunicipalityProjects(ubigeo).map((project): CsvRow => ({ section: "proyecto", key: project.code, label: project.name, value: project.pim, unit: "PEN PIM", period: "2025", source: projectSource.name, notes: `Función: ${project.function}; ejecución financiera: ${project.executionPercent ?? "no informada"}%` }))
  ];

  const header = ["seccion", "clave", "indicador", "valor", "unidad", "periodo", "fuente", "fuente_url", "notas"];
  const body = rows.map((row) => [row.section, row.key, row.label, row.value, row.unit, row.period, row.source, sourceUrl(row.source), row.notes ?? ""].map(escapeCsv).join(","));
  const csv = `\uFEFF${[header.join(","), ...body].join("\r\n")}\r\n`;

  return new Response(csv, {
    headers: {
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      "Content-Disposition": `attachment; filename="dataperu-${ubigeo}-2025.csv"`,
      "Content-Type": "text/csv; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex"
    }
  });
}

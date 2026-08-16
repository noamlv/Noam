import {
  dataperuSources,
  getMunicipality,
  getMunicipalityContext,
  getMunicipalityProjects,
  projectSource,
  renamuSource
} from "@/lib/dataperu";

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
  return "";
}

export async function GET(_request: Request, context: { params: Promise<{ ubigeo: string }> }) {
  const { ubigeo } = await context.params;
  const municipality = getMunicipality(ubigeo);
  const municipalContext = getMunicipalityContext(ubigeo);
  if (!municipality || !municipalContext) return new Response("Municipalidad no encontrada", { status: 404 });

  const rows: CsvRow[] = [
    { section: "territorio", key: "ubigeo", label: "Código de ubigeo", value: municipality.ubigeo, unit: "código", period: "vigente en la fuente", source: renamuSource.name },
    { section: "territorio", key: "departamento", label: "Departamento", value: municipality.department, unit: "texto", period: "2025", source: renamuSource.name },
    { section: "territorio", key: "provincia", label: "Provincia", value: municipality.province, unit: "texto", period: "2025", source: renamuSource.name },
    { section: "territorio", key: "distrito", label: "Distrito", value: municipality.district, unit: "texto", period: "2025", source: renamuSource.name },
    { section: "poblacion", key: "poblacion_proyectada_2025", label: "Población proyectada", value: municipalContext.population.projected2025, unit: "personas", period: "30-06-2025", source: dataperuSources.population.name, notes: dataperuSources.population.notes },
    { section: "poblacion", key: "variacion_poblacion_2018_2025", label: "Variación poblacional proyectada 2018-2025", value: municipalContext.population.change2018To2025Percent, unit: "porcentaje", period: "2018-2025", source: dataperuSources.population.name },
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

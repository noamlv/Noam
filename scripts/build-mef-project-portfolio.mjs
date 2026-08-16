import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contextPath = path.join(root, "data/processed/dataperu-context-2025.json");
const rawDirectory = path.join(root, "data/raw/mef-2025/projects-by-department");
const outputPath = path.join(root, "data/processed/mef-2025-municipal-projects.json");
const reportPath = path.join(root, "docs/data-quality-mef-projects-2025.md");
const endpoint = "https://api.datosabiertos.mef.gob.pe/DatosAbiertos/v1/datastore_search_sql";
const resourceId = "77fc3228-fa6f-4c1f-a0ed-d32520ad11ad";
const concurrency = 4;

if (!fs.existsSync(contextPath)) {
  throw new Error("Primero ejecuta npm run data:context.");
}

const context = JSON.parse(fs.readFileSync(contextPath, "utf8"));
const contextByUbigeo = new Map(context.municipalities.map((item) => [item.ubigeo, item]));
const departmentCodes = [...new Set(context.municipalities.map((item) => item.ubigeo.slice(0, 2)))].sort();

fs.mkdirSync(rawDirectory, { recursive: true });

function queryForDepartment(code) {
  return `SELECT * FROM (SELECT "EJECUTORA" AS ubigeo, "PRODUCTO_PROYECTO" AS codigo, MAX("PRODUCTO_PROYECTO_NOMBRE") AS nombre, MAX("FUNCION_NOMBRE") AS funcion, SUM(CAST("MONTO_PIM" AS NUMERIC)) AS pim, SUM(CAST("MONTO_DEVENGADO" AS NUMERIC)) AS devengado, ROW_NUMBER() OVER (PARTITION BY "EJECUTORA" ORDER BY SUM(CAST("MONTO_PIM" AS NUMERIC)) DESC) AS orden FROM "${resourceId}" WHERE "NIVEL_GOBIERNO" = 'M' AND "TIPO_ACT_PROY" = '2' AND "EJECUTORA" LIKE '${code}%' GROUP BY "EJECUTORA", "PRODUCTO_PROYECTO") p WHERE orden <= 5 ORDER BY ubigeo, orden LIMIT 5000`;
}

async function fetchDepartment(code) {
  const cachePath = path.join(rawDirectory, `${code}.json`);
  if (fs.existsSync(cachePath)) {
    const cached = JSON.parse(fs.readFileSync(cachePath, "utf8"));
    if (String(cached.sucess ?? cached.success) === "true" && Array.isArray(cached.records)) {
      console.log(`${code}: ${cached.records.length} proyectos desde caché.`);
      return cached.records;
    }
  }

  const url = `${endpoint}?sql=${encodeURIComponent(queryForDepartment(code))}`;
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120_000);
    try {
      const response = await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } });
      const text = await response.text();
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${text.slice(0, 160)}`);
      const payload = JSON.parse(text);
      if (String(payload.sucess ?? payload.success) !== "true" || !Array.isArray(payload.records)) {
        throw new Error("La API no devolvió registros válidos.");
      }
      fs.writeFileSync(cachePath, `${JSON.stringify(payload)}\n`);
      console.log(`${code}: ${payload.records.length} proyectos descargados.`);
      return payload.records;
    } catch (error) {
      lastError = error;
      console.warn(`${code}: intento ${attempt} fallido (${error.message}).`);
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 2_000));
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error(`No se pudo descargar el departamento ${code}: ${lastError?.message}`);
}

async function mapWithConcurrency(items, worker, limit) {
  const results = new Array(items.length);
  let nextIndex = 0;
  async function run() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

const rows = (await mapWithConcurrency(departmentCodes, fetchDepartment, concurrency)).flat();
const zeroPimRows = rows.filter((row) => Number(row.pim) <= 0);
const outsideUniverseRows = rows.filter((row) => !contextByUbigeo.has(row.ubigeo));
const normalized = rows
  .filter((row) => contextByUbigeo.has(row.ubigeo) && Number(row.pim) > 0)
  .map((row) => {
    const pim = Math.round(Number(row.pim));
    const accrued = Math.round(Number(row.devengado));
    return {
      ubigeo: row.ubigeo,
      code: String(row.codigo),
      name: String(row.nombre).trim(),
      function: String(row.funcion).trim(),
      pim,
      accrued,
      executionPercent: pim > 0 ? Math.round((accrued / pim) * 1000) / 10 : null,
      order: Number(row.orden)
    };
  })
  .sort((a, b) => a.ubigeo.localeCompare(b.ubigeo) || a.order - b.order);

const projectsByUbigeo = Object.groupBy(normalized, (item) => item.ubigeo);
const municipalitiesWithProjects = Object.keys(projectsByUbigeo).length;
const expectedWithProjects = context.municipalities.filter((item) => item.investment.projectsWithBudget > 0).length;
const missing = context.municipalities.filter((item) => item.investment.projectsWithBudget > 0 && !projectsByUbigeo[item.ubigeo]);
const invalid = normalized.filter((item) => !item.code || !item.name || !item.function || item.pim <= 0 || item.accrued < 0 || item.executionPercent < 0 || item.executionPercent > 100.1 || item.order < 1 || item.order > 5);
const projectIds = normalized.map((item) => `${item.ubigeo}-${item.code}`);
const duplicateProjects = projectIds.length - new Set(projectIds).size;
const maxProjectsPerMunicipality = Math.max(...Object.values(projectsByUbigeo).map((items) => items.length));
const visiblePim = normalized.reduce((sum, item) => sum + item.pim, 0);
const visibleAccrued = normalized.reduce((sum, item) => sum + item.accrued, 0);
const visibleExecutionPercent = Math.round((visibleAccrued / visiblePim) * 1000) / 10;
const coveragePercent = Math.round((visiblePim / context.summary.totalInvestmentPim) * 1000) / 10;
const functions = new Set(normalized.map((item) => item.function)).size;
const reviewDate = new Date().toISOString().slice(0, 10);

if (departmentCodes.length !== 25 || missing.length || invalid.length || duplicateProjects || maxProjectsPerMunicipality > 5 || visiblePim > context.summary.totalInvestmentPim) {
  throw new Error(`Validación fallida: departamentos=${departmentCodes.length}, municipalidades faltantes=${missing.length}, proyectos inválidos=${invalid.length}, duplicados=${duplicateProjects}, máximo por municipalidad=${maxProjectsPerMunicipality}.`);
}

const payload = {
  source: {
    name: "Presupuesto y Ejecución de Gasto 2025 — actualización mensual",
    publisher: "Ministerio de Economía y Finanzas (MEF)",
    resourceId,
    referencePeriod: "Año fiscal 2025",
    datasetUrl: "https://datosabiertos.mef.gob.pe/dataset/presupuesto-y-ejecucion-de-gasto",
    resourceUrl: `https://datosabiertos.mef.gob.pe/dataset/presupuesto-y-ejecucion-de-gasto/resource/${resourceId}`,
    notes: "Se conservan hasta cinco proyectos por entidad, ordenados por PIM. No es la cartera completa."
  },
  summary: {
    departments: departmentCodes.length,
    municipalitiesWithProjects,
    expectedWithProjects,
    projects: normalized.length,
    functions,
    visiblePim,
    visibleAccrued,
    visibleExecutionPercent,
    totalInvestmentPim: context.summary.totalInvestmentPim,
    coveragePercent,
    maxProjectsPerMunicipality
  },
  municipalities: Object.fromEntries(Object.entries(projectsByUbigeo).sort(([a], [b]) => a.localeCompare(b)))
};

fs.writeFileSync(outputPath, `${JSON.stringify(payload)}\n`);
fs.writeFileSync(reportPath, `# Calidad de datos: principales proyectos municipales MEF 2025\n\nFecha de revisión: ${reviewDate}\n\n## Cobertura\n\n- Departamentos consultados: ${departmentCodes.length}.\n- Municipalidades con inversión registrada: ${expectedWithProjects.toLocaleString("es-PE")}.\n- Municipalidades con proyectos recuperados: ${municipalitiesWithProjects.toLocaleString("es-PE")}.\n- Proyectos publicados: ${normalized.length.toLocaleString("es-PE")}.\n- Funciones presupuestales: ${functions}.\n- PIM visible: S/ ${visiblePim.toLocaleString("es-PE")}.\n- Devengado visible: S/ ${visibleAccrued.toLocaleString("es-PE")}.\n- Ejecución financiera ponderada del extracto: ${visibleExecutionPercent.toLocaleString("es-PE")}% del PIM visible.\n- Cobertura del extracto: ${coveragePercent.toLocaleString("es-PE")}% del PIM municipal de inversión registrado.\n- Municipalidades faltantes: ${missing.length}.\n- Registros con PIM igual a cero excluidos: ${zeroPimRows.length.toLocaleString("es-PE")}.\n- Registros fuera del universo de perfiles excluidos: ${outsideUniverseRows.length.toLocaleString("es-PE")}.\n\n## Controles automatizados\n\n- Clave compuesta ubigeo + código de proyecto sin duplicados: ${duplicateProjects === 0 ? "sí" : "no"}.\n- Máximo de proyectos por municipalidad: ${maxProjectsPerMunicipality}.\n- Montos y porcentajes dentro de rangos válidos: ${invalid.length === 0 ? "sí" : "no"}.\n- PIM visible menor o igual al PIM municipal de inversión: ${visiblePim <= context.summary.totalInvestmentPim ? "sí" : "no"}.\n- Unión completa con el universo de perfiles municipales: ${missing.length === 0 ? "sí" : "no"}.\n\n## Método\n\nSe consulta el recurso mensual 2025 del MEF por departamento. Para cada entidad se agrupan registros por código de proyecto y se suman PIM y devengado. Se excluyen registros sin PIM y se conservan los cinco proyectos con mayor PIM positivo.\n\n## Límites\n\n- El extracto no representa la cartera completa: muestra hasta cinco proyectos por municipalidad.\n- El orden por PIM no implica prioridad pública, calidad ni impacto.\n- La ejecución financiera no acredita avance físico ni culminación.\n- Los nombres y funciones se reproducen desde la clasificación del MEF.\n`);

console.log(`Generados ${normalized.length} proyectos para ${municipalitiesWithProjects} municipalidades.`);

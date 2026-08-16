import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const renamu = JSON.parse(fs.readFileSync(path.join(root, "data/processed/renamu-2025-municipalities.json"), "utf8"));
const context = JSON.parse(fs.readFileSync(path.join(root, "data/processed/dataperu-context-2025.json"), "utf8"));
const projectPortfolio = JSON.parse(fs.readFileSync(path.join(root, "data/processed/mef-2025-municipal-projects.json"), "utf8"));
const departmentMap = JSON.parse(fs.readFileSync(path.join(root, "data/processed/peru-departments-map.json"), "utf8"));
const departmentGeoJson = JSON.parse(fs.readFileSync(path.join(root, "public/downloads/peru-departments-reference-2025.geojson"), "utf8"));

const expected = 1891;
assert.equal(renamu.municipalities.length, expected, "RENAMU debe conservar 1,891 municipalidades");
assert.equal(context.municipalities.length, expected, "Contexto debe cubrir 1,891 municipalidades");

const renamuIds = new Set(renamu.municipalities.map((item) => item.ubigeo));
const contextIds = new Set(context.municipalities.map((item) => item.ubigeo));
assert.equal(renamuIds.size, expected, "Ubigeo RENAMU debe ser único");
assert.equal(contextIds.size, expected, "Ubigeo de contexto debe ser único");
assert.deepEqual([...renamuIds].sort(), [...contextIds].sort(), "Ambas fuentes procesadas deben tener el mismo universo");

const totalPim = context.municipalities.reduce((sum, item) => sum + item.budget.pim, 0);
const totalAccrued = context.municipalities.reduce((sum, item) => sum + item.budget.accrued, 0);
const investmentPim = context.municipalities.reduce((sum, item) => sum + item.investment.pim, 0);
const investmentAccrued = context.municipalities.reduce((sum, item) => sum + item.investment.accrued, 0);
const round = (value) => Math.round(value * 10) / 10;

assert.equal(totalPim, context.summary.totalPim, "PIM agregado debe reconciliar");
assert.equal(totalAccrued, context.summary.totalAccrued, "Devengado agregado debe reconciliar");
assert.equal(investmentPim, context.summary.totalInvestmentPim, "PIM de inversión debe reconciliar");
assert.equal(investmentAccrued, context.summary.totalInvestmentAccrued, "Devengado de inversión debe reconciliar");
assert.equal(round((totalAccrued / totalPim) * 100), context.summary.totalExecutionPercent, "Ejecución agregada debe ponderar montos");
assert.equal(round((investmentAccrued / investmentPim) * 100), context.summary.totalInvestmentExecutionPercent, "Ejecución de inversión debe ponderar montos");

for (const item of context.municipalities) {
  assert.ok(item.population.projected2025 > 0, `${item.ubigeo}: población debe ser positiva`);
  assert.ok(item.budget.executionPercent === null || (item.budget.executionPercent >= 0 && item.budget.executionPercent <= 100.1), `${item.ubigeo}: ejecución total fuera de rango`);
  assert.ok(item.investment.executionPercent === null || (item.investment.executionPercent >= 0 && item.investment.executionPercent <= 100.1), `${item.ubigeo}: ejecución de inversión fuera de rango`);
}

const contextByUbigeo = new Map(context.municipalities.map((item) => [item.ubigeo, item]));
const typeCounts = Object.groupBy(renamu.municipalities, (item) => item.municipalityType);
assert.equal(typeCounts.Provincial?.length, context.summary.byType.Provincial.municipalities);
assert.equal(typeCounts.Distrital?.length, context.summary.byType.Distrital.municipalities);

const median = (values) => {
  const sorted = values.filter((value) => value !== null).sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle];
};

for (const type of ["Provincial", "Distrital"]) {
  const profiles = typeCounts[type];
  const contexts = profiles.map((profile) => contextByUbigeo.get(profile.ubigeo));
  assert.equal(Math.round(median(profiles.map((profile) => profile.workforce.reportedWorkforceTotal))), renamu.summary.byType[type].medianReportedWorkforce, `${type}: mediana de personal debe reconciliar`);
  assert.equal(Math.round(median(profiles.map((profile) => profile.digital.operationalComputers))), renamu.summary.byType[type].medianOperationalComputers, `${type}: mediana de computadoras debe reconciliar`);
  assert.equal(Math.round(median(contexts.map((item) => item.population.projected2025))), context.summary.byType[type].medianPopulation2025, `${type}: mediana de población debe reconciliar`);
  assert.equal(Math.round(median(contexts.map((item) => item.budget.pim))), context.summary.byType[type].medianPim, `${type}: mediana de PIM debe reconciliar`);
  assert.equal(round(median(contexts.map((item) => item.budget.executionPercent))), context.summary.byType[type].medianBudgetExecutionPercent, `${type}: mediana de ejecución debe reconciliar`);
  assert.equal(Math.round(median(contexts.map((item) => item.budget.pimPerCapita))), context.summary.byType[type].medianPimPerCapita, `${type}: mediana de PIM per cápita debe reconciliar`);
  assert.equal(round(median(contexts.map((item) => item.investment.executionPercent))), context.summary.byType[type].medianInvestmentExecutionPercent, `${type}: mediana de inversión debe reconciliar`);
}

const declaredRate = (profiles, selector, predicate = Boolean) => {
  const known = profiles.map(selector).filter((value) => value !== null && value !== "");
  return round((known.filter(predicate).length / known.length) * 100);
};

assert.equal(declaredRate(renamu.municipalities, (item) => item.digital.hasInternet), renamu.summary.internetServicePercent, "Internet declarado debe reconciliar");
assert.equal(declaredRate(renamu.municipalities, (item) => item.digital.transparencyPortal, (value) => value === "Actualizado"), renamu.summary.updatedTransparencyPercent, "Transparencia actualizada debe reconciliar");
assert.equal(declaredRate(renamu.municipalities, (item) => item.management.concertedDevelopmentPlan), renamu.summary.concertedPlanPercent, "Planes concertados deben reconciliar");
assert.equal(declaredRate(renamu.municipalities, (item) => item.operations.coelStatus, (value) => value !== "No conformado"), renamu.summary.coelFormedPercent, "COEL conformados deben reconciliar");

const departments = Object.groupBy(renamu.municipalities, (item) => item.department);
assert.equal(Object.keys(departments).length, 25, "Atlas debe conservar los 25 departamentos estadísticos");

let departmentMunicipalities = 0;
let departmentPopulation = 0;
let departmentPim = 0;
let departmentAccrued = 0;
let departmentInvestmentPim = 0;
let departmentInvestmentAccrued = 0;

for (const [department, items] of Object.entries(departments)) {
  assert.ok(items.length > 0, `${department}: debe contener municipalidades`);
  departmentMunicipalities += items.length;
  for (const item of items) {
    const municipalityContext = contextByUbigeo.get(item.ubigeo);
    assert.ok(municipalityContext, `${department}: falta contexto para ${item.ubigeo}`);
    departmentPopulation += municipalityContext.population.projected2025;
    departmentPim += municipalityContext.budget.pim;
    departmentAccrued += municipalityContext.budget.accrued;
    departmentInvestmentPim += municipalityContext.investment.pim;
    departmentInvestmentAccrued += municipalityContext.investment.accrued;
  }
}

assert.equal(departmentMunicipalities, expected, "Agregados departamentales deben preservar el universo municipal");
assert.equal(departmentPopulation, context.summary.projectedPopulation2025, "Población departamental debe reconciliar");
assert.equal(departmentPim, context.summary.totalPim, "PIM departamental debe reconciliar");
assert.equal(departmentAccrued, context.summary.totalAccrued, "Devengado departamental debe reconciliar");
assert.equal(departmentInvestmentPim, context.summary.totalInvestmentPim, "PIM de inversión departamental debe reconciliar");
assert.equal(departmentInvestmentAccrued, context.summary.totalInvestmentAccrued, "Devengado de inversión departamental debe reconciliar");

const projectEntries = Object.entries(projectPortfolio.municipalities);
const projects = projectEntries.flatMap(([ubigeo, items]) => items.map((item) => ({ ...item, ubigeo })));
const projectIds = projects.map((item) => `${item.ubigeo}-${item.code}`);
const visiblePim = projects.reduce((sum, item) => sum + item.pim, 0);
const visibleAccrued = projects.reduce((sum, item) => sum + item.accrued, 0);
const projectDepartments = new Set(projects.map((item) => item.ubigeo.slice(0, 2)));

assert.equal(projectEntries.length, expected, "El extracto debe cubrir las municipalidades con inversión registrada");
assert.equal(projectPortfolio.summary.municipalitiesWithProjects, expected, "El resumen debe reconciliar municipalidades");
assert.equal(projects.length, 9429, "El extracto controlado debe conservar 9,429 proyectos visibles");
assert.equal(projectPortfolio.summary.projects, projects.length, "El resumen debe reconciliar proyectos");
assert.equal(new Set(projectIds).size, projects.length, "Código de proyecto y ubigeo deben identificar filas únicas");
assert.equal(projectDepartments.size, 25, "La cartera visible debe cubrir 25 departamentos estadísticos");
assert.equal(visiblePim, projectPortfolio.summary.visiblePim, "PIM visible debe reconciliar");
assert.equal(visibleAccrued, projectPortfolio.summary.visibleAccrued, "Devengado visible debe reconciliar");
assert.equal(round((visibleAccrued / visiblePim) * 100), projectPortfolio.summary.visibleExecutionPercent, "Ejecución visible debe ponderar montos");
assert.equal(round((visiblePim / context.summary.totalInvestmentPim) * 100), projectPortfolio.summary.coveragePercent, "Cobertura visible debe reconciliar con el universo de inversión");

for (const [ubigeo, items] of projectEntries) {
  assert.ok(contextIds.has(ubigeo), `${ubigeo}: proyecto fuera del universo municipal`);
  assert.ok(items.length > 0 && items.length <= 5, `${ubigeo}: debe conservar entre uno y cinco proyectos`);
  for (const item of items) {
    assert.ok(item.code && item.name && item.function, `${ubigeo}: metadatos de proyecto incompletos`);
    assert.ok(item.pim > 0, `${ubigeo}-${item.code}: PIM debe ser positivo`);
    assert.ok(item.accrued >= 0, `${ubigeo}-${item.code}: devengado no puede ser negativo`);
    assert.ok(item.executionPercent >= 0 && item.executionPercent <= 100.1, `${ubigeo}-${item.code}: ejecución fuera de rango`);
    assert.ok(item.order >= 1 && item.order <= 5, `${ubigeo}-${item.code}: orden fuera del extracto`);
  }
}

const projectsByDepartment = Object.groupBy(projects, (item) => item.ubigeo.slice(0, 2));
for (const [code, items] of Object.entries(projectsByDepartment)) {
  const departmentVisiblePim = items.reduce((sum, item) => sum + item.pim, 0);
  const departmentInvestmentPim = context.municipalities
    .filter((item) => item.ubigeo.startsWith(code))
    .reduce((sum, item) => sum + item.investment.pim, 0);
  assert.ok(departmentVisiblePim <= departmentInvestmentPim, `${code}: el extracto no puede superar el PIM de inversión departamental`);
}

const expectedDepartmentCodes = Array.from({ length: 25 }, (_, index) => String(index + 1).padStart(2, "0"));
const mapCodes = departmentMap.departments.map((item) => item.code).sort();
const geoJsonCodes = departmentGeoJson.features.map((feature) => feature.properties.code).sort();
assert.deepEqual(mapCodes, expectedDepartmentCodes, "El mapa debe conservar códigos departamentales 01–25");
assert.deepEqual(geoJsonCodes, expectedDepartmentCodes, "El GeoJSON debe conservar códigos departamentales 01–25");
assert.equal(new Set(mapCodes).size, 25, "Las rutas del mapa deben ser únicas");
assert.equal(departmentGeoJson.metadata.crs, "EPSG:4326", "El GeoJSON debe declarar su sistema de referencia");
for (const item of departmentMap.departments) {
  assert.ok(item.name && item.capital && item.path.startsWith("M"), `${item.code}: ruta SVG o metadatos incompletos`);
}
for (const feature of departmentGeoJson.features) {
  assert.ok(["Polygon", "MultiPolygon"].includes(feature.geometry.type), `${feature.properties.code}: geometría inesperada`);
  assert.ok(feature.geometry.coordinates.length > 0, `${feature.properties.code}: geometría vacía`);
}

console.log(`DataPerú OK: ${expected} ubigeos, 25 geometrías departamentales, ${projects.length.toLocaleString("es-PE")} proyectos visibles y agregados reconciliados.`);

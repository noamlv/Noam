import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const renamuPath = path.join(root, "data/processed/renamu-2025-municipalities.json");
const populationPath = path.join(root, "data/raw/inei-population/population-2018-2026.csv");
const budgetPath = path.join(root, "data/raw/mef-2025/municipal-aggregate.json");
const outputPath = path.join(root, "data/processed/dataperu-context-2025.json");
const reportPath = path.join(root, "docs/data-quality-dataperu-context-2025.md");

for (const requiredPath of [renamuPath, populationPath, budgetPath]) {
  if (!fs.existsSync(requiredPath)) {
    throw new Error(`No se encontró ${path.relative(root, requiredPath)}. Consulta docs/data-sources-dataperu-context.md.`);
  }
}

function parseCsvLine(line) {
  const values = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      values.push(value);
      value = "";
    } else {
      value += character;
    }
  }

  values.push(value);
  return values;
}

const renamu = JSON.parse(fs.readFileSync(renamuPath, "utf8"));
const renamuMunicipalities = renamu.municipalities;
const renamuByUbigeo = new Map(renamuMunicipalities.map((item) => [item.ubigeo, item]));

const populationLines = fs.readFileSync(populationPath, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
const populationRows = populationLines
  .map(parseCsvLine)
  .filter((row) => /^\d{6}$/.test(row[0]) && !row[0].endsWith("00"));

const populationByUbigeo = new Map(populationRows.map((row) => [row[0], {
  projected2018: Number(row[2]),
  projected2025: Number(row[9]),
  projected2026: Number(row[10])
}]));

const budgetPayload = JSON.parse(fs.readFileSync(budgetPath, "utf8"));
if ((budgetPayload.sucess ?? budgetPayload.success) !== "true") {
  throw new Error("La consulta agregada del MEF no reporta estado exitoso.");
}

const budgetByUbigeo = new Map(budgetPayload.records.map((row) => [row.EJECUTORA, row]));
const roundPercent = (numerator, denominator) => denominator > 0 ? Math.round((numerator / denominator) * 1000) / 10 : null;
const roundCurrency = (value) => Math.round(Number(value));
const roundRate = (value) => Math.round(value * 10) / 10;

const municipalities = renamuMunicipalities.map((municipality) => {
  const population = populationByUbigeo.get(municipality.ubigeo);
  const budget = budgetByUbigeo.get(municipality.ubigeo);

  if (!population || !budget) {
    throw new Error(`Falta contexto para el ubigeo ${municipality.ubigeo}.`);
  }

  const pia = roundCurrency(budget.pia);
  const pim = roundCurrency(budget.pim);
  const accrued = roundCurrency(budget.devengado);
  const investmentPim = roundCurrency(budget.inversion_pim);
  const investmentAccrued = roundCurrency(budget.inversion_devengado);

  return {
    ubigeo: municipality.ubigeo,
    population: {
      projected2018: population.projected2018,
      projected2025: population.projected2025,
      projected2026: population.projected2026,
      change2018To2025Percent: roundRate(((population.projected2025 / population.projected2018) - 1) * 100)
    },
    budget: {
      pia,
      pim,
      accrued,
      executionPercent: roundPercent(accrued, pim),
      pimPerCapita: population.projected2025 > 0 ? Math.round(pim / population.projected2025) : null,
      accruedPerCapita: population.projected2025 > 0 ? Math.round(accrued / population.projected2025) : null
    },
    investment: {
      pim: investmentPim,
      accrued: investmentAccrued,
      executionPercent: roundPercent(investmentAccrued, investmentPim),
      projectsWithBudget: Number(budget.proyectos_con_pim)
    }
  };
});

function median(values) {
  const sorted = values.filter((value) => value !== null && Number.isFinite(value)).sort((a, b) => a - b);
  if (sorted.length === 0) return null;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle];
}

const contextByUbigeo = new Map(municipalities.map((item) => [item.ubigeo, item]));
const byType = Object.fromEntries(["Provincial", "Distrital"].map((type) => {
  const rows = renamuMunicipalities
    .filter((item) => item.municipalityType === type)
    .map((item) => contextByUbigeo.get(item.ubigeo));

  return [type, {
    municipalities: rows.length,
    medianPopulation2025: Math.round(median(rows.map((item) => item.population.projected2025))),
    medianPopulationChangePercent: roundRate(median(rows.map((item) => item.population.change2018To2025Percent))),
    medianPim: Math.round(median(rows.map((item) => item.budget.pim))),
    medianBudgetExecutionPercent: roundRate(median(rows.map((item) => item.budget.executionPercent))),
    medianPimPerCapita: Math.round(median(rows.map((item) => item.budget.pimPerCapita))),
    medianInvestmentExecutionPercent: roundRate(median(rows.map((item) => item.investment.executionPercent)))
  }];
}));

const nationalPim = municipalities.reduce((total, item) => total + item.budget.pim, 0);
const nationalAccrued = municipalities.reduce((total, item) => total + item.budget.accrued, 0);
const nationalInvestmentPim = municipalities.reduce((total, item) => total + item.investment.pim, 0);
const nationalInvestmentAccrued = municipalities.reduce((total, item) => total + item.investment.accrued, 0);

const payload = {
  sources: {
    population: {
      name: "Población total proyectada por distrito, 2018-2026",
      publisher: "Instituto Nacional de Estadística e Informática (INEI)",
      publicationDate: "2025-12-31",
      referenceDate: "2025-06-30",
      pageUrl: "https://www.gob.pe/institucion/inei/informes-publicaciones/6894980-peru-poblacion-total-proyectada-al-30-de-junio-de-cada-ano-segun-departamento-provincia-y-distrito-2018-2026",
      notes: "Proyección oficial de población total. No corresponde al conteo censal 2025."
    },
    budget: {
      name: "Presupuesto y Ejecución de Gasto 2025",
      publisher: "Ministerio de Economía y Finanzas (MEF)",
      referencePeriod: "Año fiscal 2025",
      resourceId: "35bdc5b5-017c-42c1-ba20-8820bf1248b7",
      pageUrl: "https://datosabiertos.mef.gob.pe/dataset/presupuesto-y-ejecucion-de-gasto/resource/35bdc5b5-017c-42c1-ba20-8820bf1248b7",
      datasetUrl: "https://datosabiertos.mef.gob.pe/dataset/presupuesto-y-ejecucion-de-gasto",
      notes: "PIA y PIM se registran en el periodo 0; el devengado se acumula de enero a diciembre."
    }
  },
  summary: {
    municipalities: municipalities.length,
    populationDistrictsInSource: populationRows.length,
    localEntitiesInBudgetSource: budgetPayload.records.length,
    projectedPopulation2025: municipalities.reduce((total, item) => total + item.population.projected2025, 0),
    totalPim: nationalPim,
    totalAccrued: nationalAccrued,
    totalExecutionPercent: roundPercent(nationalAccrued, nationalPim),
    totalInvestmentPim: nationalInvestmentPim,
    totalInvestmentAccrued: nationalInvestmentAccrued,
    totalInvestmentExecutionPercent: roundPercent(nationalInvestmentAccrued, nationalInvestmentPim),
    byType
  },
  municipalities
};

const missingPopulation = renamuMunicipalities.filter((item) => !populationByUbigeo.has(item.ubigeo));
const missingBudget = renamuMunicipalities.filter((item) => !budgetByUbigeo.has(item.ubigeo));
const executionAboveBudget = municipalities.filter((item) => item.budget.executionPercent !== null && item.budget.executionPercent > 100.1);
const investmentAboveBudget = municipalities.filter((item) => item.investment.executionPercent !== null && item.investment.executionPercent > 100.1);
const invalidPopulation = municipalities.filter((item) => item.population.projected2025 <= 0);

if (municipalities.length !== 1891 || missingPopulation.length || missingBudget.length || executionAboveBudget.length || investmentAboveBudget.length || invalidPopulation.length) {
  throw new Error(`Validación fallida: perfiles=${municipalities.length}, población faltante=${missingPopulation.length}, presupuesto faltante=${missingBudget.length}, ejecución > PIM=${executionAboveBudget.length}, inversión > PIM=${investmentAboveBudget.length}, población inválida=${invalidPopulation.length}.`);
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(payload)}\n`);

const newDistricts = populationRows.filter((row) => !renamuByUbigeo.has(row[0]));
const extraBudgetEntities = budgetPayload.records.filter((row) => !renamuByUbigeo.has(row.EJECUTORA));
const report = `# Calidad de datos: contexto municipal DataPerú 2025\n\nFecha de revisión: 2026-07-16\n\n## Cobertura y unión\n\n- Perfiles RENAMU esperados: ${renamuMunicipalities.length.toLocaleString("es-PE")}.\n- Distritos en la fuente de población: ${populationRows.length.toLocaleString("es-PE")}.\n- Entidades locales agregadas en la fuente presupuestal: ${budgetPayload.records.length.toLocaleString("es-PE")}.\n- Perfiles con población y presupuesto: ${municipalities.length.toLocaleString("es-PE")}.\n- Perfiles sin población: ${missingPopulation.length}.\n- Perfiles sin presupuesto: ${missingBudget.length}.\n\n## Diferencias de universo\n\n- La fuente poblacional incluye ${newDistricts.length} distrito adicional posterior al marco RENAMU 2025: ${newDistricts.map((row) => `${row[1]} (${row[0]})`).join(", ")}.\n- El agregado MEF contiene ${extraBudgetEntities.length} entidades fuera del universo RENAMU; son principalmente mancomunidades y el distrito nuevo. Se excluyen de los perfiles.\n\n## Pruebas de validez\n\n- Ubigeos RENAMU con correspondencia exacta: ${municipalities.length.toLocaleString("es-PE")}.\n- Poblaciones proyectadas menores o iguales a cero: ${invalidPopulation.length}.\n- Ejecución total superior al PIM por tolerancia de 0,1 puntos: ${executionAboveBudget.length}.\n- Ejecución de inversión superior al PIM por tolerancia de 0,1 puntos: ${investmentAboveBudget.length}.\n\n## Definiciones\n\n- **PIM:** Presupuesto Institucional Modificado al cierre del año fiscal.\n- **Devengado:** obligación de pago reconocida durante el año fiscal.\n- **Ejecución:** devengado dividido entre PIM; describe avance financiero, no calidad ni impacto.\n- **Inversión:** registros clasificados por el MEF como proyecto (TIPO_ACT_PROY = 2).\n- **Per cápita:** monto dividido entre la población proyectada al 30 de junio de 2025.\n\n## Riesgos y límites\n\n- **Medio:** la población es una proyección y no el conteo final del Censo 2025.\n- **Medio:** la ejecución financiera no mide calidad, pertinencia ni culminación física.\n- **Bajo:** los montos se redondean al sol en el extracto público; los cálculos se realizan primero con los valores originales.\n- **Bajo:** PIA/PIM aparecen en el periodo 0 y el devengado en los meses 1 a 12; la consulta agregada respeta esta estructura.\n`;

fs.writeFileSync(reportPath, report);
console.log(`Generados ${municipalities.length} contextos municipales en ${path.relative(root, outputPath)}.`);

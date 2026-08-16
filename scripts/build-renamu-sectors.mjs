import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const inputPath = path.join(root, "data/raw/renamu-2025/full.csv");
const outputPath = path.join(root, "data/processed/renamu-2025-sectors.json");
const reportPath = path.join(root, "docs/data-quality-renamu-sectors-2025.md");

if (!fs.existsSync(inputPath)) throw new Error("No se encontró la fuente RENAMU 2025.");

function parseLine(line) {
  const values = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') { value += '"'; index += 1; } else quoted = !quoted;
    } else if (character === ";" && !quoted) { values.push(value); value = ""; } else value += character;
  }
  values.push(value);
  return values;
}

const lines = fs.readFileSync(inputPath, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
const headers = parseLine(lines[0]);
const rows = lines.slice(1).map(parseLine);
const column = Object.fromEntries(headers.map((header, index) => [header, index]));
const required = [
  "Ubigeo", "Departamento", "Provincia", "Distrito", "Tipomuni",
  "P40_1", "P41_1", "P42_1", "P43_1", "P43_2", "P43_5", "P43_9", "P44_1", "P44_1_1", "P44_2", "P44_2_1", "P44_3_1", "P44_4_1", "P44_6_1",
  "P69_2", "P69_2_T", "P76A_1", "P76A_4", "P76_5_1", "P77_1", "P77_4", "P78_1", "P78_2", "P78_3",
  "P85_1", "P86_1", "P88", "P89", "P90A_2", "P90_3",
  "P94_1", "P94_2", "P94_3", "P94_4", "P94_5", "P94_6", "P94_9", "P94_8",
  "P96", "P97_1", "P97_2", "P97_3", "P97_4", "P97_5", "P97_6", "P97_7", "P97_8", "P97_9",
  "P98_1", "P98_2", "P98_3", "P98_4", "P98_5", "P98_6", "P98_7", "P98_8", "P98_9", "P98_10", "P98_11"
];
for (let index = 1; index <= 31; index += 1) required.push(`P34A_${index}`);
const missingColumns = required.filter((name) => column[name] === undefined);
if (missingColumns.length) throw new Error(`Faltan columnas RENAMU: ${missingColumns.join(", ")}`);

const nullTokens = new Set(["", "#¡NULO!", "#N/A", "NULL"]);
const raw = (row, name) => row[column[name]]?.trim() ?? "";
const numeric = (value) => {
  if (nullTokens.has(value)) return null;
  const parsed = Number(value.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
};
const yesNo12 = (value) => value === "1" ? true : value === "2" ? false : null;
const selected = (value, code) => nullTokens.has(value) ? null : value === String(code);
const sumAvailable = (values) => {
  const numbers = values.map(numeric).filter((value) => value !== null);
  return numbers.length ? numbers.reduce((total, value) => total + value, 0) : null;
};
const countSelected = (row, fields) => fields.reduce((total, [field, code]) => total + (raw(row, field) === String(code) ? 1 : 0), 0);

const frequencyLabels = { "1": "Diaria", "2": "Interdiaria", "3": "Dos veces por semana", "4": "Una vez por semana", "5": "No realizó recojo" };
const coverageLabels = { "1": "Menos de 25%", "2": "De 25% a 49%", "3": "De 50% a 74%", "4": "De 75% a 100%" };
const coelLabels = { "1": "Conformado en la estructura orgánica", "2": "Conformado fuera de la estructura orgánica", "3": "No conformado" };
const coelOperationLabels = { "1": "24 horas", "2": "Horario de oficina", "3": "Solo ante emergencia" };

const municipalities = rows.map((row) => {
  const type = raw(row, "Tipomuni") === "1" ? "Provincial" : "Distrital";
  const wastePlan = type === "Provincial" ? selected(raw(row, "P43_1"), 1) : selected(raw(row, "P43_2"), 2);
  const licenseFields = Array.from({ length: 31 }, (_, index) => raw(row, `P34A_${index + 1}`));
  return {
    ubigeo: raw(row, "Ubigeo"),
    department: raw(row, "Departamento"),
    province: raw(row, "Provincia"),
    district: raw(row, "Distrito"),
    municipalityType: type,
    waste: {
      collectionFrequency: frequencyLabels[raw(row, "P40_1")] ?? null,
      dailyCollectedKg: numeric(raw(row, "P41_1")),
      collectionCoverage: coverageLabels[raw(row, "P42_1")] ?? null,
      hasManagementPlan: wastePlan,
      hasSelectiveCollectionProgram: selected(raw(row, "P43_5"), 5),
      reportsNoManagementInstrument: selected(raw(row, "P43_9"), 9),
      usesLandfill: yesNo12(raw(row, "P44_1")),
      landfillPercent: numeric(raw(row, "P44_1_1")),
      usesDumpsite: yesNo12(raw(row, "P44_2")),
      dumpsitePercent: numeric(raw(row, "P44_2_1")),
      recycledPercent: numeric(raw(row, "P44_3_1")),
      burnedPercent: numeric(raw(row, "P44_4_1")),
      compostedPercent: numeric(raw(row, "P44_6_1"))
    },
    security: {
      providesSerenazgo: yesNo12(raw(row, "P69_2")),
      serenazgoPersonnel: numeric(raw(row, "P69_2_T")),
      committeeSessions: numeric(raw(row, "P76A_1")),
      jointOperations: numeric(raw(row, "P76A_4")),
      preparedRiskMap: yesNo12(raw(row, "P76_5_1")),
      hasRatifiedPlan: raw(row, "P77_1") === "1" ? true : raw(row, "P77_4") === "4" ? false : raw(row, "P77_1") === "0" ? false : null,
      hasCrimeMap: selected(raw(row, "P78_1"), 1),
      hasRiskMap: selected(raw(row, "P78_2"), 2),
      hasIntegratedPatrolPlan: selected(raw(row, "P78_3"), 3)
    },
    risk: {
      coelStatus: coelLabels[raw(row, "P85_1")] ?? null,
      coelOperation: coelOperationLabels[raw(row, "P86_1")] ?? null,
      hasHumanitarianWarehouse: yesNo12(raw(row, "P88")),
      hasRiskManagementOffice: yesNo12(raw(row, "P89")),
      drills: numeric(raw(row, "P90A_2")),
      identifiedRiskAreas: selected(raw(row, "P90_3"), 3)
    },
    development: {
      licensesGranted: sumAvailable(licenseFields),
      supportActions: countSelected(row, [["P94_1", 1], ["P94_2", 2], ["P94_3", 3], ["P94_4", 4], ["P94_5", 5], ["P94_6", 6], ["P94_9", 9]]),
      heldFairs: selected(raw(row, "P94_2"), 2),
      offeredTraining: selected(raw(row, "P94_4"), 4),
      simplifiedLicensing: selected(raw(row, "P94_5"), 5),
      reportsNoSupportActions: selected(raw(row, "P94_8"), 8)
    },
    environment: {
      hasEnvironmentalOffice: yesNo12(raw(row, "P96")),
      reportedPollutionSources: countSelected(row, Array.from({ length: 9 }, (_, index) => [`P97_${index + 1}`, index + 1])),
      managementInstruments: countSelected(row, Array.from({ length: 10 }, (_, index) => [`P98_${index + 1}`, index + 1])),
      hasLocalEnvironmentalPolicy: selected(raw(row, "P98_1"), 1),
      hasLocalEnvironmentalDiagnosis: selected(raw(row, "P98_2"), 2),
      hasLocalEnvironmentalActionPlan: selected(raw(row, "P98_3"), 3),
      reportsNoManagementInstrument: selected(raw(row, "P98_11"), 11)
    }
  };
});

const percent = (numerator, denominator) => denominator ? Math.round((numerator / denominator) * 1000) / 10 : null;
const rate = (selector, available) => {
  const denominator = municipalities.filter(available).length;
  return { value: percent(municipalities.filter(selector).length, denominator), denominator };
};
const summary = {
  waste: {
    frequentCollection: rate((item) => ["Diaria", "Interdiaria"].includes(item.waste.collectionFrequency), (item) => item.waste.collectionFrequency !== null),
    coverage75Plus: rate((item) => item.waste.collectionCoverage === "De 75% a 100%", (item) => item.waste.collectionCoverage !== null),
    reportsDumpsiteUse: rate((item) => item.waste.usesDumpsite === true, (item) => item.waste.usesDumpsite !== null),
    selectiveCollectionProgram: rate((item) => item.waste.hasSelectiveCollectionProgram === true, (item) => item.waste.hasSelectiveCollectionProgram !== null)
  },
  security: {
    serenazgo: rate((item) => item.security.providesSerenazgo === true, (item) => item.security.providesSerenazgo !== null),
    ratifiedPlan: rate((item) => item.security.hasRatifiedPlan === true, (item) => item.security.hasRatifiedPlan !== null),
    crimeMap: rate((item) => item.security.hasCrimeMap === true, (item) => item.security.hasCrimeMap !== null),
    integratedPatrolPlan: rate((item) => item.security.hasIntegratedPatrolPlan === true, (item) => item.security.hasIntegratedPatrolPlan !== null)
  },
  risk: {
    managementOffice: rate((item) => item.risk.hasRiskManagementOffice === true, (item) => item.risk.hasRiskManagementOffice !== null),
    formedCoel: rate((item) => item.risk.coelStatus !== null && item.risk.coelStatus !== "No conformado", (item) => item.risk.coelStatus !== null),
    identifiedRiskAreas: rate((item) => item.risk.identifiedRiskAreas === true, (item) => item.risk.identifiedRiskAreas !== null),
    humanitarianWarehouse: rate((item) => item.risk.hasHumanitarianWarehouse === true, (item) => item.risk.hasHumanitarianWarehouse !== null)
  },
  development: {
    grantedLicenses: municipalities.reduce((total, item) => total + (item.development.licensesGranted ?? 0), 0),
    municipalitiesWithLicenses: municipalities.filter((item) => (item.development.licensesGranted ?? 0) > 0).length,
    offeredTraining: rate((item) => item.development.offeredTraining === true, (item) => item.development.offeredTraining !== null),
    simplifiedLicensing: rate((item) => item.development.simplifiedLicensing === true, (item) => item.development.simplifiedLicensing !== null)
  },
  environment: {
    environmentalOffice: rate((item) => item.environment.hasEnvironmentalOffice === true, (item) => item.environment.hasEnvironmentalOffice !== null),
    localPolicy: rate((item) => item.environment.hasLocalEnvironmentalPolicy === true, (item) => item.environment.hasLocalEnvironmentalPolicy !== null),
    localDiagnosis: rate((item) => item.environment.hasLocalEnvironmentalDiagnosis === true, (item) => item.environment.hasLocalEnvironmentalDiagnosis !== null),
    localActionPlan: rate((item) => item.environment.hasLocalEnvironmentalActionPlan === true, (item) => item.environment.hasLocalEnvironmentalActionPlan !== null)
  }
};

const invalidPercentages = municipalities.flatMap((item) => [item.waste.landfillPercent, item.waste.dumpsitePercent, item.waste.recycledPercent, item.waste.burnedPercent, item.waste.compostedPercent]).filter((value) => value !== null && (value < 0 || value > 100));
const duplicateUbigeos = municipalities.length - new Set(municipalities.map((item) => item.ubigeo)).size;
if (municipalities.length !== 1891 || duplicateUbigeos || invalidPercentages.length) {
  throw new Error(`Validación fallida: filas=${municipalities.length}, duplicados=${duplicateUbigeos}, porcentajes inválidos=${invalidPercentages.length}.`);
}

const payload = {
  source: {
    name: "Registro Nacional de Municipalidades 2025 (RENAMU)",
    publisher: "Instituto Nacional de Estadística e Informática (INEI)",
    releaseDate: "2025-10-30",
    referencePeriod: "2024 y 2025, según pregunta",
    datasetUrl: "https://www.datosabiertos.gob.pe/dataset/registro-nacional-de-municipalidades-renamu-2025-instituto-nacional-de-estad%C3%ADstica-e",
    notes: "Información declarada por las municipalidades; no constituye verificación de cobertura, calidad o desempeño."
  },
  summary,
  municipalities
};
fs.writeFileSync(outputPath, `${JSON.stringify(payload)}\n`);

const missing = Object.fromEntries([
  ["Frecuencia de recojo", municipalities.filter((item) => item.waste.collectionFrequency === null).length],
  ["Cobertura de recojo", municipalities.filter((item) => item.waste.collectionCoverage === null).length],
  ["Plan de seguridad ratificado", municipalities.filter((item) => item.security.hasRatifiedPlan === null).length],
  ["Oficina de riesgos", municipalities.filter((item) => item.risk.hasRiskManagementOffice === null).length],
  ["Licencias otorgadas", municipalities.filter((item) => item.development.licensesGranted === null).length],
  ["Oficina ambiental", municipalities.filter((item) => item.environment.hasEnvironmentalOffice === null).length]
]);
const missingTable = Object.entries(missing).map(([label, count]) => `| ${label} | ${count.toLocaleString("es-PE")} | ${percent(count, municipalities.length)}% |`).join("\n");
fs.writeFileSync(reportPath, `# Calidad de datos: módulos sectoriales RENAMU 2025\n\nFecha de revisión: 2026-07-16\n\n## Grano y cobertura\n\n- Unidad: municipalidad provincial o distrital.\n- Registros: ${municipalities.length.toLocaleString("es-PE")}.\n- Ubigeos duplicados: ${duplicateUbigeos}.\n- Porcentajes fuera de 0–100: ${invalidPercentages.length}.\n\n## Faltantes\n\n| Variable | Sin valor | Tasa |\n|---|---:|---:|\n${missingTable}\n\n## Decisiones metodológicas\n\n- Las tasas nacionales usan como denominador solo respuestas no nulas y publican ese denominador.\n- Los códigos de selección múltiple se interpretan con el diccionario RENAMU, no como booleanos genéricos.\n- Las licencias suman 31 categorías declaradas para 2024; no equivalen al stock de empresas activas.\n- La cobertura de residuos se publica por banda, no se convierte a un porcentaje puntual.\n- No se construyen índices compuestos ni rankings.\n\n## Límites\n\n- **Medio:** información autodeclarada, sin auditoría independiente.\n- **Medio:** las fechas cambian por módulo entre 2024 y 2025.\n- **Medio:** presencia de instrumentos o acciones no acredita calidad ni resultados.\n- **Bajo:** los nulos se preservan y no se convierten a “No”.\n`);

console.log(`Generados ${municipalities.length} perfiles sectoriales.`);

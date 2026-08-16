import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const inputPath = path.join(root, "data/raw/renamu-2025/full.csv");
const outputPath = path.join(root, "data/processed/renamu-2025-municipalities.json");
const reportPath = path.join(root, "docs/data-quality-renamu-2025.md");

if (!fs.existsSync(inputPath)) {
  throw new Error(`No se encontró ${inputPath}. Consulta docs/data-sources-renamu-2025.md.`);
}

function parseDelimitedLine(line) {
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
    } else if (character === ";" && !quoted) {
      values.push(value);
      value = "";
    } else {
      value += character;
    }
  }

  values.push(value);
  return values;
}

const rawLines = fs.readFileSync(inputPath, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
const headers = parseDelimitedLine(rawLines[0]);
const rawRows = rawLines.slice(1).map(parseDelimitedLine);
const column = Object.fromEntries(headers.map((header, index) => [header, index]));

const requiredColumns = [
  "Ubigeo", "Departamento", "Provincia", "Distrito", "Tipomuni", "P09", "P13A_T", "P14", "P14A_1", "P18",
  "P19M_T", "P19A_2_T", "P23_1", "P23_2", "P23_3", "P23_9", "P23_10", "P23_11", "P69_2", "P69_2_T",
  "P85_1", "P86_1", "P88"
];

const missingColumns = requiredColumns.filter((name) => column[name] === undefined);
if (missingColumns.length > 0) {
  throw new Error(`El esquema RENAMU cambió. Faltan columnas: ${missingColumns.join(", ")}`);
}

const nullTokens = new Set(["", "#¡NULO!", "#N/A", "NULL"]);
const value = (row, name) => row[column[name]]?.trim() ?? "";
const numberOrNull = (raw) => (nullTokens.has(raw) ? null : Number.isFinite(Number(raw)) ? Number(raw) : null);
const yesNoOrNull = (raw) => (raw === "1" ? true : raw === "2" ? false : null);

const transparencyLabels = {
  "1": "Actualizado",
  "2": "En implementación",
  "3": "No disponible por desconocimiento",
  "4": "Desactualizado"
};

const coelLabels = {
  "1": "Conformado e incorporado en la estructura orgánica",
  "2": "Conformado, fuera de la estructura orgánica",
  "3": "No conformado"
};

const coelOperationLabels = {
  "1": "Funciona las 24 horas",
  "2": "Funciona en horario de oficina",
  "3": "Funciona solo ante una emergencia"
};

const municipalities = rawRows.map((row) => {
  const staff = numberOrNull(value(row, "P19M_T"));
  const serviceContractors = numberOrNull(value(row, "P19A_2_T"));
  const computers = numberOrNull(value(row, "P13A_T"));
  const connectedComputers = numberOrNull(value(row, "P14A_1"));
  const serenazgo = yesNoOrNull(value(row, "P69_2"));
  const serenazgoPersonnel = numberOrNull(value(row, "P69_2_T"));

  return {
    ubigeo: value(row, "Ubigeo"),
    department: value(row, "Departamento"),
    province: value(row, "Provincia"),
    district: value(row, "Distrito"),
    municipalityType: value(row, "Tipomuni") === "1" ? "Provincial" : "Distrital",
    digital: {
      operationalComputers: computers,
      hasInternet: yesNoOrNull(value(row, "P14")),
      computersWithInternet: connectedComputers,
      internetCoveragePercent: computers && connectedComputers !== null ? Math.min(100, Math.round((connectedComputers / computers) * 100)) : null,
      hasReportedWebsite: Boolean(value(row, "P09")),
      transparencyPortal: transparencyLabels[value(row, "P18")] ?? "Sin información"
    },
    workforce: {
      staffMarch2025: staff,
      serviceContractorsMarch2025: serviceContractors,
      reportedWorkforceTotal: staff === null && serviceContractors === null ? null : (staff ?? 0) + (serviceContractors ?? 0)
    },
    management: {
      concertedDevelopmentPlan: yesNoOrNull(value(row, "P23_1")),
      institutionalStrategicPlan: yesNoOrNull(value(row, "P23_2")),
      localEconomicDevelopmentPlan: yesNoOrNull(value(row, "P23_3")),
      organizationFunctionsRegulation: yesNoOrNull(value(row, "P23_9")),
      organizationFunctionsManual: yesNoOrNull(value(row, "P23_10")),
      personnelAssignmentTable: yesNoOrNull(value(row, "P23_11"))
    },
    operations: {
      providesSerenazgo: serenazgo,
      serenazgoPersonnel: serenazgo ? serenazgoPersonnel : null,
      coelStatus: coelLabels[value(row, "P85_1")] ?? "Sin información",
      coelOperation: coelOperationLabels[value(row, "P86_1")] ?? null,
      hasHumanitarianWarehouse: yesNoOrNull(value(row, "P88"))
    }
  };
});

const median = (values) => {
  const sorted = values.filter((item) => item !== null).sort((a, b) => a - b);
  if (sorted.length === 0) return null;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? Math.round((sorted[middle - 1] + sorted[middle]) / 2) : sorted[middle];
};

const percent = (count, total) => Math.round((count / total) * 1000) / 10;
const yesCount = (selector) => municipalities.filter(selector).length;
const byType = Object.fromEntries(["Provincial", "Distrital"].map((type) => {
  const rows = municipalities.filter((item) => item.municipalityType === type);
  return [type, {
    municipalities: rows.length,
    medianOperationalComputers: median(rows.map((item) => item.digital.operationalComputers)),
    medianReportedWorkforce: median(rows.map((item) => item.workforce.reportedWorkforceTotal)),
    medianSerenazgoPersonnel: median(rows.map((item) => item.operations.serenazgoPersonnel))
  }];
}));

const payload = {
  source: {
    name: "Registro Nacional de Municipalidades 2025 (RENAMU)",
    publisher: "Instituto Nacional de Estadística e Informática (INEI)",
    releaseDate: "2025-10-30",
    referencePeriod: "2024-12-31 a 2025-03-31, según variable",
    license: "Open Database License (ODbL)",
    datasetUrl: "https://www.datosabiertos.gob.pe/dataset/registro-nacional-de-municipalidades-renamu-2025-instituto-nacional-de-estad%C3%ADstica-e",
    technicalSheetUrl: "https://proyectos.inei.gob.pe/iinei/srienaho/Descarga/DocumentosMetodologicos/2025-62/Ficha_Tecnica_2025.pdf",
    notes: "Información declarada por las municipalidades. No constituye una auditoría de desempeño ni un ranking."
  },
  summary: {
    municipalities: municipalities.length,
    departments: new Set(municipalities.map((item) => item.department)).size,
    internetServicePercent: percent(yesCount((item) => item.digital.hasInternet === true), municipalities.length),
    updatedTransparencyPercent: percent(yesCount((item) => item.digital.transparencyPortal === "Actualizado"), municipalities.length),
    concertedPlanPercent: percent(yesCount((item) => item.management.concertedDevelopmentPlan === true), municipalities.length),
    coelFormedPercent: percent(yesCount((item) => !item.operations.coelStatus.startsWith("No conformado")), municipalities.length),
    serenazgoPercent: percent(yesCount((item) => item.operations.providesSerenazgo === true), municipalities.length),
    humanitarianWarehousePercent: percent(yesCount((item) => item.operations.hasHumanitarianWarehouse === true), municipalities.length),
    byType
  },
  municipalities
};

const duplicateUbigeo = municipalities.length - new Set(municipalities.map((item) => item.ubigeo)).size;
const invalidUbigeo = municipalities.filter((item) => !/^\d{6}$/.test(item.ubigeo)).length;
const missingCounts = {
  website: municipalities.filter((item) => !item.digital.hasReportedWebsite).length,
  computersWithInternet: municipalities.filter((item) => item.digital.computersWithInternet === null).length,
  staff: municipalities.filter((item) => item.workforce.staffMarch2025 === null).length,
  serviceContractors: municipalities.filter((item) => item.workforce.serviceContractorsMarch2025 === null).length,
  coelOperation: municipalities.filter((item) => item.operations.coelOperation === null).length,
  serenazgoPersonnel: municipalities.filter((item) => item.operations.serenazgoPersonnel === null).length
};

if (municipalities.length !== 1891 || duplicateUbigeo > 0 || invalidUbigeo > 0) {
  throw new Error(`Validación fallida: filas=${municipalities.length}, duplicados=${duplicateUbigeo}, ubigeos inválidos=${invalidUbigeo}`);
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(payload)}\n`);

const report = `# Calidad de datos: RENAMU 2025\n\nFecha de revisión: 2026-07-16\n\n## Grano y cobertura\n\n- Unidad: una municipalidad provincial o distrital por fila.\n- Registros: ${municipalities.length.toLocaleString("es-PE")}.\n- Columnas en el archivo fuente: ${headers.length.toLocaleString("es-PE")}.\n- Ubigeos únicos: ${new Set(municipalities.map((item) => item.ubigeo)).size.toLocaleString("es-PE")}.\n- Duplicados de ubigeo: ${duplicateUbigeo}.\n- Ubigeos con formato inválido: ${invalidUbigeo}.\n\n## Faltantes relevantes\n\n| Variable publicada | Registros sin valor | Interpretación |\n|---|---:|---|\n| Página web reportada | ${missingCounts.website} | Campo vacío; no prueba que la entidad carezca de presencia digital. |\n| Computadoras con internet | ${missingCounts.computersWithInternet} | Coincide principalmente con municipios que declararon no tener internet. |\n| Personal, marzo 2025 | ${missingCounts.staff} | Se publica como dato no informado. |\n| Locación/orden de servicios, marzo 2025 | ${missingCounts.serviceContractors} | Se publica como dato no informado. |\n| Operación del COEL | ${missingCounts.coelOperation} | No aplica cuando el COEL no fue conformado. |\n| Personal de serenazgo | ${missingCounts.serenazgoPersonnel} | No aplica cuando no se brinda serenazgo. |\n\n## Decisiones de publicación\n\n- No se publican teléfonos, correos, direcciones ni nombres de autoridades presentes en el archivo fuente.\n- No se calcula un índice compuesto ni un ranking de capacidad.\n- Los porcentajes nacionales describen respuestas declaradas, no desempeño verificado.\n- Las comparaciones usan medianas entre municipalidades del mismo tipo y no controlan por población o presupuesto.\n\n## Riesgos conocidos\n\n- **Medio:** la fuente es autodeclarada y puede contener errores de registro.\n- **Medio:** las fechas de referencia cambian según la pregunta.\n- **Bajo:** las categorías nulas se preservan como no informadas o no aplicables, evitando convertirlas en cero.\n\n## Pruebas automatizables\n\nEl script detiene la generación si cambia el número esperado de filas, aparecen ubigeos duplicados, ubigeos inválidos o faltan columnas requeridas.\n`;

fs.writeFileSync(reportPath, report);
console.log(`Generados ${municipalities.length} perfiles en ${path.relative(root, outputPath)}.`);

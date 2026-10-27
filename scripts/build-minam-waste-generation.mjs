import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DATASET_URL = "https://www.datosabiertos.gob.pe/dataset/residuos-municipales-generados-anualmente";
const RESOURCE_URL = "https://www.datosabiertos.gob.pe/sites/default/files/1%20DataSet%20Residuos%20municipales%20generados%20anualmente.csv";
const EXPECTED_SHA256 = "4f2cb77a3e94364dd0e5e6e21014438d64255b81953cb52f323d8006a492ccc3";
const OUTPUT_PATH = path.resolve("data/processed/minam-waste-generation-2014-2024.json");
const RENAMU_PATH = path.resolve("data/processed/renamu-2025-municipalities.json");
const FIRST_YEAR = 2014;
const LAST_YEAR = 2024;

function cents(value, label, rowNumber) {
  if (!/^\d+(?:\.\d{1,2})?$/.test(value)) throw new Error(`Valor invalido en ${label}, fila ${rowNumber}: ${value}`);
  const [whole, decimal = ""] = value.split(".");
  return Number(whole) * 100 + Number(decimal.padEnd(2, "0"));
}

function summary(rows) {
  return rows.map(({ year, districts, tonnesCents }) => ({
    year,
    districts,
    tonnes: tonnesCents / 100
  }));
}

function comparableName(value) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toUpperCase();
}

async function sourceBuffer() {
  const file = process.argv[2];
  if (file) return readFile(path.resolve(file));
  const response = await fetch(RESOURCE_URL, { headers: { "user-agent": "NOAM DataPeru source acquisition/1.0" } });
  if (!response.ok) throw new Error(`MINAM devolvio HTTP ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

const buffer = await sourceBuffer();
const sourceHash = createHash("sha256").update(buffer).digest("hex");
if (sourceHash !== EXPECTED_SHA256) {
  throw new Error(`El archivo oficial cambio (SHA-256: ${sourceHash}). Revisar esquema, cifras y licencia antes de actualizar la publicacion.`);
}

const lines = buffer.toString("latin1").trim().split(/\r?\n/);
const header = lines.shift()?.split(";");
assert.deepEqual(header, [
  "FECHA_CORTE", "N_SEC", "UBIGEO", "REG_NAT", "DEPARTAMENTO", "PROVINCIA", "DISTRITO",
  "POB_TOTAL", "POB_URBANA", "POB_RURAL", "GPC_DOM", "QRESIDUOS_DOM",
  "QRESIDUOS_NO_DOM", "QRESIDUOS_MUN", "PERIODO"
]);
assert.equal(lines.length, 20_650);

const national = new Map();
const departments = new Map();
const latestUbigeos = new Set();
let componentMismatch2023 = 0;

for (const [index, line] of lines.entries()) {
  const cells = line.split(";");
  assert.equal(cells.length, header.length, `Fila ${index + 2}`);
  const year = Number(cells[14].trim());
  const code = cells[2].padStart(6, "0");
  const departmentCode = code.slice(0, 2);
  const department = cells[4].trim();
  assert.ok(Number.isInteger(year) && year >= FIRST_YEAR && year <= LAST_YEAR, `Ano invalido en fila ${index + 2}`);
  assert.match(code, /^\d{6}$/);
  assert.match(departmentCode, /^\d{2}$/);
  const total = cents(cells[13], "QRESIDUOS_MUN", index + 2);
  const domestic = cents(cells[11], "QRESIDUOS_DOM", index + 2);
  const nonDomestic = cents(cells[12], "QRESIDUOS_NO_DOM", index + 2);
  if (Math.abs(domestic + nonDomestic - total) > 3) {
    if (year !== 2023) throw new Error(`Componentes inconsistentes fuera de 2023 en fila ${index + 2}`);
    componentMismatch2023++;
  }

  const annual = national.get(year) ?? { year, districts: 0, tonnesCents: 0 };
  annual.districts++;
  annual.tonnesCents += total;
  national.set(year, annual);

  const group = departments.get(departmentCode) ?? { code: departmentCode, name: department, annual: new Map() };
  assert.equal(comparableName(group.name), comparableName(department), `Nombre departamental inconsistente en fila ${index + 2}`);
  if (year === LAST_YEAR) group.name = department;
  const departmentYear = group.annual.get(year) ?? { year, districts: 0, tonnesCents: 0 };
  departmentYear.districts++;
  departmentYear.tonnesCents += total;
  group.annual.set(year, departmentYear);
  departments.set(departmentCode, group);

  if (year === LAST_YEAR) {
    assert.ok(!latestUbigeos.has(code), `Ubigeo duplicado en ${LAST_YEAR}: ${code}`);
    latestUbigeos.add(code);
  }
}

assert.equal(national.size, 11);
assert.equal(departments.size, 25);
assert.equal(latestUbigeos.size, 1_891);
assert.equal(componentMismatch2023, 1_891);

const renamu = JSON.parse(await readFile(RENAMU_PATH, "utf8"));
const renamuUbigeos = new Set(renamu.municipalities.map((municipality) => municipality.ubigeo));
assert.equal(renamuUbigeos.size, latestUbigeos.size);
for (const code of latestUbigeos) assert.ok(renamuUbigeos.has(code), `MINAM sin emparejar con RENAMU: ${code}`);

const annual = summary([...national.values()].sort((a, b) => a.year - b.year));
const departmentSeries = [...departments.values()]
  .sort((a, b) => a.name.localeCompare(b.name, "es"))
  .map(({ code, name, annual: years }) => ({ code, name, annual: summary([...years.values()].sort((a, b) => a.year - b.year)) }));

for (const { year, tonnes, districts } of annual) {
  const rows = departmentSeries.map((item) => item.annual.find((entry) => entry.year === year)).filter(Boolean);
  assert.equal(rows.reduce((sum, item) => sum + item.districts, 0), districts);
  assert.ok(Math.abs(rows.reduce((sum, item) => sum + item.tonnes, 0) - tonnes) < 0.01);
}

const output = {
  source: {
    name: "Residuos municipales generados anualmente",
    publisher: "Ministerio del Ambiente (MINAM)",
    datasetUrl: DATASET_URL,
    resourceUrl: RESOURCE_URL,
    license: "Open Data Commons Attribution License",
    sha256: sourceHash,
    referencePeriod: `${FIRST_YEAR}-${LAST_YEAR}`,
    latestCut: "2025-12-18",
    unit: "toneladas anuales estimadas",
    notes: "Estimaciones basadas en reportes municipales a SIGERSOL. Generacion no equivale a recoleccion ni disposicion final. Los componentes domiciliario/no domiciliario de 2023 no reconciliaron con el total en las 1.891 filas; solo se publica QRESIDUOS_MUN."
  },
  annual,
  departments: departmentSeries
};

await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, `${JSON.stringify(output)}\n`);
console.log(`MINAM validado: ${lines.length} registros, ${departments.size} departamentos, ${latestUbigeos.size} distritos en ${LAST_YEAR}.`);

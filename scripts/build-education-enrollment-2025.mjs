import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { createReadStream } from "node:fs";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import readline from "node:readline";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const OUTPUT_PATH = path.resolve("data/processed/minedu-education-enrollment-2025.json");
const RENAMU_PATH = path.resolve("data/processed/renamu-2025-municipalities.json");
const DATASET_URL = "https://www.datosabiertos.gob.pe/dataset/n%C3%BAmero-de-matriculados-de-educaci%C3%B3n-b%C3%A1sica-regular-ebr";
const RESOURCE_URL = "https://www.datosabiertos.gob.pe/sites/default/files/N%C3%BAmero%20de%20matriculados%20de%20Educaci%C3%B3n%20B%C3%A1sica%20Regular%20%28EBR%29%202025.csv";
const DICTIONARY_URL = "https://www.datosabiertos.gob.pe/sites/default/files/Diccionario_N%C3%BAmero%20de%20matriculados%20de%20Educaci%C3%B3n%20B%C3%A1sica%20Regular%20%28EBR%29.xlsx";
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

const expectedColumns = [
  "CODOOII", "D_DREUGEL", "D_REGION", "COD_MOD", "CODLOCAL", "CEN_EDU", "NIV_MOD", "D_NIV_MOD",
  "D_FORMA", "TIPOPROG", "D_TIPOPROG", "GESTION", "D_GESTION", "GES_DEP", "D_GES_DEP", "DIR_CEN",
  "LOCALIDAD", "CODGEO", "D_DPTO", "D_PROV", "D_DIST", "CODCP_INEI", "CODCCPP", "CEN_POB",
  "AREA_CENSO", "DAREACENSO", "NLAT_IE", "NLONG_IE", "IMPUTADO", "TALUM_HOM", "TALUM_MUJ", "TALUM"
];

const cleanName = (value) => value.normalize("NFC").replace(/\s+/g, " ").trim();

const titleCase = (value) => cleanName(value)
  .toLocaleLowerCase("es-PE")
  .replace(/(^|[\s-])\p{L}/gu, (character) => character.toLocaleUpperCase("es-PE"));

const sourceLocationOverrides = new Map([
  ["160405", { department: "Loreto", province: "Mariscal Ramón Castilla", district: "Santa Rosa de Loreto" }]
]);

const parseDelimitedLine = (line) => {
  const fields = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === ";" && !quoted) {
      fields.push(field);
      field = "";
    } else {
      field += character;
    }
  }

  fields.push(field);
  return fields;
};

const strictInteger = (value, field, rowNumber) => {
  if (!/^\d+$/.test(value)) throw new Error(`Fila ${rowNumber}: ${field} no es un entero válido`);
  return Number(value);
};

const rate = (numerator, denominator) => denominator > 0
  ? Number(((numerator / denominator) * 100).toFixed(1))
  : null;

const emptyAggregate = () => ({
  servicePrograms: { total: 0, schoolBased: 0, nonSchoolBased: 0, otherForm: 0 },
  enrollment: {
    total: 0,
    male: 0,
    female: 0,
    urban: 0,
    rural: 0,
    publicManagement: 0,
    privateManagement: 0,
    initial: 0,
    primary: 0,
    secondary: 0
  },
  provenance: { informantRecords: 0, partialImputationRecords: 0, totalImputationRecords: 0 }
});

const addAggregate = (target, row) => {
  target.servicePrograms.total += 1;
  if (row.form === "Escolarizada") target.servicePrograms.schoolBased += 1;
  else if (row.form === "No escolarizada") target.servicePrograms.nonSchoolBased += 1;
  else target.servicePrograms.otherForm += 1;

  target.enrollment.total += row.total;
  target.enrollment.male += row.male;
  target.enrollment.female += row.female;
  if (row.area === "Urbana") target.enrollment.urban += row.total;
  if (row.area === "Rural") target.enrollment.rural += row.total;
  if (row.management.startsWith("Pública")) target.enrollment.publicManagement += row.total;
  if (row.management === "Privada") target.enrollment.privateManagement += row.total;
  if (row.level.startsWith("Inicial")) target.enrollment.initial += row.total;
  if (row.level === "Primaria") target.enrollment.primary += row.total;
  if (row.level === "Secundaria") target.enrollment.secondary += row.total;

  if (row.provenance === "1") target.provenance.informantRecords += 1;
  if (row.provenance === "2") target.provenance.partialImputationRecords += 1;
  if (row.provenance === "3") target.provenance.totalImputationRecords += 1;
};

const curlHeaders = (referer, cookieJar) => [
  "-L", "--fail", "--retry", "3",
  "-c", cookieJar, "-b", cookieJar,
  "-A", USER_AGENT,
  "-H", "Accept-Language: es-PE,es;q=0.9,en;q=0.8",
  "-H", "Sec-Fetch-Dest: document",
  "-H", "Sec-Fetch-Mode: navigate",
  "-H", "Sec-Fetch-Site: same-origin",
  "-e", referer
];

async function downloadSource() {
  const directory = await mkdtemp(path.join(tmpdir(), "noam-minedu-education-"));
  const cookieJar = path.join(directory, "cookies.txt");
  const output = path.join(directory, "minedu-ebr-2025.csv");

  // The catalog WAF issues a session cookie on the landing page before allowing the public file download.
  await execFileAsync("curl", ["-L", "-sS", "-c", cookieJar, "-b", cookieJar, "-A", USER_AGENT, DATASET_URL, "-o", "/dev/null"]);
  await execFileAsync("curl", [
    ...curlHeaders(DATASET_URL, cookieJar),
    "-H", "Accept: text/csv,application/octet-stream;q=0.9,*/*;q=0.8",
    RESOURCE_URL,
    "-o", output
  ], { maxBuffer: 1024 * 1024 });

  return output;
}

async function build() {
  const sourcePath = process.env.MINEDU_EBR_CSV_PATH || await downloadSource();
  const sourceBuffer = await readFile(sourcePath);
  const sourceChecksumSha256 = createHash("sha256").update(sourceBuffer).digest("hex");
  const renamu = JSON.parse(await readFile(RENAMU_PATH, "utf8"));
  const municipalityByUbigeo = new Map(renamu.municipalities.map((item) => [item.ubigeo, item]));
  const districtsByUbigeo = new Map();
  const seenServiceCodes = new Set();
  const national = emptyAggregate();
  const input = createReadStream(sourcePath, { encoding: "utf8" });
  const lines = readline.createInterface({ input, crlfDelay: Infinity });
  let headers;
  let rowNumber = 0;

  for await (const rawLine of lines) {
    rowNumber += 1;
    const line = rowNumber === 1 ? rawLine.replace(/^\uFEFF/, "") : rawLine;
    if (!line.trim()) continue;
    const values = parseDelimitedLine(line);

    if (!headers) {
      headers = values;
      if (headers.length !== expectedColumns.length || headers.some((column, index) => column !== expectedColumns[index])) {
        throw new Error("El esquema del archivo EBR cambió; revisar antes de publicar");
      }
      continue;
    }

    if (values.length !== headers.length) throw new Error(`Fila ${rowNumber}: se esperaban ${headers.length} columnas y llegaron ${values.length}`);
    const record = Object.fromEntries(headers.map((header, index) => [header, values[index].trim()]));
    const serviceCode = record.COD_MOD.padStart(7, "0");
    const ubigeo = record.CODGEO.padStart(6, "0");
    if (!/^\d{7}$/.test(serviceCode)) throw new Error(`Fila ${rowNumber}: código modular inválido`);
    if (!/^\d{6}$/.test(ubigeo)) throw new Error(`Fila ${rowNumber}: ubigeo inválido`);
    if (seenServiceCodes.has(serviceCode)) throw new Error(`Fila ${rowNumber}: código modular duplicado ${serviceCode}`);
    seenServiceCodes.add(serviceCode);

    const male = strictInteger(record.TALUM_HOM, "TALUM_HOM", rowNumber);
    const female = strictInteger(record.TALUM_MUJ, "TALUM_MUJ", rowNumber);
    const total = strictInteger(record.TALUM, "TALUM", rowNumber);
    if (male + female !== total) throw new Error(`Fila ${rowNumber}: matrícula por sexo no reconcilia`);
    if (!['1', '2', '3'].includes(record.IMPUTADO)) throw new Error(`Fila ${rowNumber}: procedencia desconocida ${record.IMPUTADO}`);

    const row = {
      total,
      male,
      female,
      form: record.D_FORMA,
      area: record.DAREACENSO,
      management: record.D_GESTION,
      level: record.D_NIV_MOD,
      provenance: record.IMPUTADO
    };
    addAggregate(national, row);

    let district = districtsByUbigeo.get(ubigeo);
    if (!district) {
      const municipality = municipalityByUbigeo.get(ubigeo);
      const sourceLocation = sourceLocationOverrides.get(ubigeo);
      district = {
        ubigeo,
        department: municipality ? titleCase(municipality.department) : sourceLocation?.department ?? titleCase(record.D_DPTO),
        province: municipality ? titleCase(municipality.province) : sourceLocation?.province ?? titleCase(record.D_PROV),
        district: municipality ? titleCase(municipality.district) : sourceLocation?.district ?? titleCase(record.D_DIST),
        ...emptyAggregate()
      };
      districtsByUbigeo.set(ubigeo, district);
    }
    addAggregate(district, row);
  }

  const districts = [...districtsByUbigeo.values()].sort((left, right) => left.ubigeo.localeCompare(right.ubigeo));
  const sourceOnlyUbigeos = districts.filter((district) => !municipalityByUbigeo.has(district.ubigeo)).map((district) => district.ubigeo);
  const missingMunicipalities = renamu.municipalities.filter((municipality) => !districtsByUbigeo.has(municipality.ubigeo));
  if (districts.length !== 1_892) throw new Error(`Cobertura inesperada: ${districts.length} distritos`);
  if (missingMunicipalities.length !== 0) throw new Error(`${missingMunicipalities.length} municipios RENAMU sin matrícula EBR`);
  if (sourceOnlyUbigeos.join(",") !== "160405") throw new Error(`Ubigeos fuera de RENAMU inesperados: ${sourceOnlyUbigeos.join(", ")}`);

  const output = {
    source: {
      name: "Número de matriculados de Educación Básica Regular (EBR) 2025",
      publisher: "Ministerio de Educación del Perú (Minedu)",
      referencePeriod: "2025",
      resourcePublishedAt: "2026-04-27",
      retrievedAt: process.env.SOURCE_RETRIEVED_AT || new Date().toISOString(),
      datasetUrl: DATASET_URL,
      resourceUrl: RESOURCE_URL,
      dictionaryUrl: DICTIONARY_URL,
      license: "Open Data Commons Attribution License",
      sourceChecksumSha256,
      notes: "Registro por servicio o programa educativo de EBR con matrícula. La clasificación urbana o rural corresponde al centro poblado asignado por la UE-Minedu. La variable IMPUTADO distingue datos de informante, imputación parcial e imputación total."
    },
    definitions: {
      servicePrograms: "Códigos modulares únicos de servicios o programas educativos de Educación Básica Regular con matrícula en 2025.",
      enrollment: "Número de estudiantes matriculados en servicios y programas de Educación Básica Regular durante 2025.",
      schoolBased: "Servicios cuya forma de atención está registrada como escolarizada.",
      nonSchoolBased: "Programas cuya forma de atención está registrada como no escolarizada.",
      rural: "Matrícula en servicios o programas ubicados en centros poblados clasificados como rurales para las asignaciones temporales 2025 del Minedu.",
      publicManagement: "Matrícula en servicios de gestión pública directa o pública de gestión privada.",
      provenance: "Procedencia del registro censal: informante, imputación parcial o imputación total."
    },
    summary: {
      districts: districts.length,
      departments: new Set(districts.map((district) => district.department)).size,
      ...national,
      rates: {
        femaleEnrollmentPercent: rate(national.enrollment.female, national.enrollment.total),
        ruralEnrollmentPercent: rate(national.enrollment.rural, national.enrollment.total),
        publicManagementEnrollmentPercent: rate(national.enrollment.publicManagement, national.enrollment.total),
        informantRecordsPercent: rate(national.provenance.informantRecords, national.servicePrograms.total)
      }
    },
    districts
  };

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(output)}\n`);
  console.log(`Escritos ${districts.length} distritos en ${OUTPUT_PATH}`);
  console.log(JSON.stringify(output.summary, null, 2));
}

await build();

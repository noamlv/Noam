import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const API_BASE = "https://censos2025.inei.gob.pe/api/v1";
const OUTPUT_PATH = path.resolve("data/processed/census-2025-water-sanitation.json");
const CONCURRENCY = 4;

const INDICATORS = {
  occupiedHousing: { id: 550, topicId: 425 },
  waterNetwork: { id: 175, topicId: 430 },
  sanitationNetwork: { id: 176, topicId: 431 }
};

const fetchJson = async (url, attempt = 1) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45_000);

  try {
    const response = await fetch(url, {
      headers: { "user-agent": "NOAM DataPeru source acquisition/1.0" },
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const payload = await response.json();
    if (!payload.success) throw new Error(payload.message || "La fuente devolvio una respuesta no exitosa");
    return payload.data;
  } catch (error) {
    if (attempt >= 8) throw new Error(`No se pudo consultar ${url}: ${error.message}`);
    const backoff = Math.min(10_000, 700 * 2 ** attempt) + Math.floor(Math.random() * 300);
    await new Promise((resolve) => setTimeout(resolve, backoff));
    return fetchJson(url, attempt + 1);
  } finally {
    clearTimeout(timeout);
  }
};

const withQuery = (pathname, params) => {
  const url = new URL(`${API_BASE}/${pathname}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, String(value));
  return url;
};

const mapLimit = async (items, limit, worker) => {
  const results = new Array(items.length);
  let nextIndex = 0;

  const run = async () => {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await worker(items[index], index);
    }
  };

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
};

const cleanName = (value) => value.normalize("NFC").replace(/\s+/g, " ").trim();

const sourceRegionToUbigeo = (sourceRegion) => (sourceRegion === "26" || sourceRegion === "27" ? "15" : sourceRegion);

const toUbigeo = (idGeography, sourceRegion) => {
  const geographicCode = String(idGeography).slice(1);
  return `${sourceRegionToUbigeo(sourceRegion)}${geographicCode.slice(2)}`;
};

const getIndicatorMap = async (provinceId, indicator) => {
  const data = await fetchJson(withQuery("resultados/mapa-indicador", {
    idTiempo: 2025,
    idGeografia: provinceId,
    idIndicador: indicator.id,
    idAmbito: 9,
    idTema: indicator.topicId
  }));

  return new Map((data.datos ?? []).map((item) => [String(item.idGeografia), {
    value: item.valorAbsoluto == null ? null : Number(item.valorAbsoluto),
    percent: item.porcentaje == null ? null : Number(item.porcentaje)
  }]));
};

const sum = (items, selector) => items.reduce((total, item) => total + (selector(item) ?? 0), 0);

const rate = (numerator, denominator) => denominator > 0 ? Number(((numerator / denominator) * 100).toFixed(1)) : null;

const build = async () => {
  const departments = await fetchJson(`${API_BASE}/geografia/departamentos`);
  const provinceGroups = await mapLimit(departments, CONCURRENCY, async (department) => {
    const provinces = await fetchJson(withQuery("geografia/provincias", { codRegion: department.codRegion }));
    return provinces.map((province) => ({ department, province }));
  });
  const provinces = provinceGroups.flat();

  const districtGroups = await mapLimit(provinces, CONCURRENCY, async ({ department, province }, index) => {
    const [districts, occupiedHousing, waterNetwork, sanitationNetwork] = await Promise.all([
      fetchJson(withQuery("geografia/distritos", { codRegion: department.codRegion, ccpp: province.ccpp })),
      getIndicatorMap(province.idGeografia, INDICATORS.occupiedHousing),
      getIndicatorMap(province.idGeografia, INDICATORS.waterNetwork),
      getIndicatorMap(province.idGeografia, INDICATORS.sanitationNetwork)
    ]);

    if ((index + 1) % 20 === 0 || index + 1 === provinces.length) {
      console.log(`Procesadas ${index + 1} de ${provinces.length} provincias`);
    }

    return districts.map((district) => {
      const sourceId = String(district.idGeografia);
      const occupied = occupiedHousing.get(sourceId) ?? { value: null, percent: null };
      const water = waterNetwork.get(sourceId) ?? { value: null, percent: null };
      const sanitation = sanitationNetwork.get(sourceId) ?? { value: null, percent: null };
      const sourceRegion = String(department.codRegion);

      return {
        ubigeo: toUbigeo(sourceId, sourceRegion),
        sourceGeographyId: sourceId,
        sourceRegion,
        sourceRegionName: cleanName(department.nombre),
        department: sourceRegion === "26" || sourceRegion === "27" ? "Lima" : cleanName(department.nombre),
        province: cleanName(province.nombre),
        district: cleanName(district.nombre),
        occupiedHousing: occupied.value,
        waterNetwork: water,
        sanitationNetwork: sanitation
      };
    });
  });

  const districts = districtGroups.flat().sort((a, b) => a.ubigeo.localeCompare(b.ubigeo));
  const uniqueUbigeos = new Set(districts.map((district) => district.ubigeo));
  if (uniqueUbigeos.size !== districts.length) throw new Error(`Ubigeos duplicados: ${districts.length - uniqueUbigeos.size}`);

  const invalidRows = districts.filter((district) => {
    if (!/^\d{6}$/.test(district.ubigeo)) return true;
    if (district.occupiedHousing == null) return district.waterNetwork.value != null || district.sanitationNetwork.value != null;
    if (district.waterNetwork.value != null && district.waterNetwork.value > district.occupiedHousing) return true;
    if (district.sanitationNetwork.value != null && district.sanitationNetwork.value > district.occupiedHousing) return true;
    return false;
  });
  if (invalidRows.length) throw new Error(`${invalidRows.length} filas incumplen reglas de dominio`);

  const percentageMismatches = districts.filter((district) => {
    if (!district.occupiedHousing) return false;
    const waterCalculated = district.waterNetwork.value == null ? null : (district.waterNetwork.value / district.occupiedHousing) * 100;
    const sanitationCalculated = district.sanitationNetwork.value == null ? null : (district.sanitationNetwork.value / district.occupiedHousing) * 100;
    return (waterCalculated != null && district.waterNetwork.percent != null && Math.abs(waterCalculated - district.waterNetwork.percent) > 0.11)
      || (sanitationCalculated != null && district.sanitationNetwork.percent != null && Math.abs(sanitationCalculated - district.sanitationNetwork.percent) > 0.11);
  });
  if (percentageMismatches.length) throw new Error(`${percentageMismatches.length} porcentajes no reconcilian con su denominador`);

  const occupiedHousing = sum(districts, (district) => district.occupiedHousing);
  const waterHousing = sum(districts, (district) => district.waterNetwork.value);
  const sanitationHousing = sum(districts, (district) => district.sanitationNetwork.value);
  const retrievedAt = process.env.SOURCE_RETRIEVED_AT || new Date().toISOString();

  const output = {
    source: {
      name: "Censos Nacionales 2025: XIII de Población, VIII de Vivienda y IV de Comunidades Indígenas",
      publisher: "Instituto Nacional de Estadística e Informática (INEI)",
      referencePeriod: "2025",
      retrievedAt,
      datasetUrl: "https://censos2025.inei.gob.pe/",
      apiUrl: API_BASE,
      license: "Fuente oficial de consulta pública; revisar condiciones de reutilización del INEI.",
      notes: "Los porcentajes usan como denominador viviendas particulares con ocupantes presentes que viven permanentemente. Agua por red pública no acredita continuidad, potabilidad ni calidad. Servicio higiénico conectado a red pública no describe tratamiento de aguas residuales."
    },
    definitions: {
      occupiedHousing: "Viviendas particulares ocupadas con personas presentes que viven permanentemente.",
      waterNetwork: "Viviendas del universo base cuyo abastecimiento de agua procede de red pública.",
      sanitationNetwork: "Viviendas del universo base cuyo servicio higiénico está conectado a red pública, dentro o fuera de la vivienda."
    },
    summary: {
      districts: districts.length,
      departments: new Set(districts.map((district) => district.department)).size,
      sourceRegions: new Set(districts.map((district) => district.sourceRegion)).size,
      districtsWithOccupiedHousing: districts.filter((district) => district.occupiedHousing != null).length,
      districtsWithWaterData: districts.filter((district) => district.waterNetwork.value != null).length,
      districtsWithSanitationData: districts.filter((district) => district.sanitationNetwork.value != null).length,
      occupiedHousing,
      waterNetwork: { value: waterHousing, percent: rate(waterHousing, occupiedHousing) },
      sanitationNetwork: { value: sanitationHousing, percent: rate(sanitationHousing, occupiedHousing) }
    },
    districts
  };

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(output)}\n`);
  console.log(`Escritos ${districts.length} distritos en ${OUTPUT_PATH}`);
  console.log(JSON.stringify(output.summary, null, 2));
};

await build();

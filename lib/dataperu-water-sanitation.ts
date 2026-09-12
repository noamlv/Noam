import waterSanitationJson from "@/data/processed/census-2025-water-sanitation.json";

export type CoverageMetric = {
  value: number | null;
  percent: number | null;
};

export type WaterSanitationDistrict = {
  ubigeo: string;
  sourceGeographyId: string;
  sourceRegion: string;
  sourceRegionName: string;
  department: string;
  province: string;
  district: string;
  occupiedHousing: number | null;
  waterNetwork: CoverageMetric;
  sanitationNetwork: CoverageMetric;
};

type WaterSanitationData = {
  source: {
    name: string;
    publisher: string;
    referencePeriod: string;
    retrievedAt: string;
    datasetUrl: string;
    apiUrl: string;
    license: string;
    notes: string;
  };
  definitions: {
    occupiedHousing: string;
    waterNetwork: string;
    sanitationNetwork: string;
  };
  summary: {
    districts: number;
    departments: number;
    sourceRegions: number;
    districtsWithOccupiedHousing: number;
    districtsWithWaterData: number;
    districtsWithSanitationData: number;
    occupiedHousing: number;
    waterNetwork: { value: number; percent: number | null };
    sanitationNetwork: { value: number; percent: number | null };
  };
  districts: WaterSanitationDistrict[];
};

const data = waterSanitationJson as WaterSanitationData;

export const waterSanitationSource = data.source;
export const waterSanitationDefinitions = data.definitions;
export const waterSanitationSummary = data.summary;
export const waterSanitationDistricts = data.districts;

export function getWaterSanitationDistrict(ubigeo: string) {
  return waterSanitationDistricts.find((district) => district.ubigeo === ubigeo);
}

export function getCoverageGap(district: WaterSanitationDistrict, metric: "waterNetwork" | "sanitationNetwork") {
  if (district.occupiedHousing == null || district[metric].value == null) return null;
  return Math.max(0, district.occupiedHousing - district[metric].value);
}

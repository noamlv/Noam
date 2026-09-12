import educationJson from "@/data/processed/minedu-education-enrollment-2025.json";

export type EducationServicePrograms = {
  total: number;
  schoolBased: number;
  nonSchoolBased: number;
  otherForm: number;
};

export type EducationEnrollment = {
  total: number;
  male: number;
  female: number;
  urban: number;
  rural: number;
  publicManagement: number;
  privateManagement: number;
  initial: number;
  primary: number;
  secondary: number;
};

export type EducationProvenance = {
  informantRecords: number;
  partialImputationRecords: number;
  totalImputationRecords: number;
};

export type EducationDistrict = {
  ubigeo: string;
  department: string;
  province: string;
  district: string;
  servicePrograms: EducationServicePrograms;
  enrollment: EducationEnrollment;
  provenance: EducationProvenance;
};

type EducationData = {
  source: {
    name: string;
    publisher: string;
    referencePeriod: string;
    resourcePublishedAt: string;
    retrievedAt: string;
    datasetUrl: string;
    resourceUrl: string;
    dictionaryUrl: string;
    license: string;
    sourceChecksumSha256: string;
    notes: string;
  };
  definitions: {
    servicePrograms: string;
    enrollment: string;
    schoolBased: string;
    nonSchoolBased: string;
    rural: string;
    publicManagement: string;
    provenance: string;
  };
  summary: {
    districts: number;
    departments: number;
    servicePrograms: EducationServicePrograms;
    enrollment: EducationEnrollment;
    provenance: EducationProvenance;
    rates: {
      femaleEnrollmentPercent: number | null;
      ruralEnrollmentPercent: number | null;
      publicManagementEnrollmentPercent: number | null;
      informantRecordsPercent: number | null;
    };
  };
  districts: EducationDistrict[];
};

const data = educationJson as EducationData;
const districtByUbigeo = new Map(data.districts.map((district) => [district.ubigeo, district]));

export const educationSource = data.source;
export const educationDefinitions = data.definitions;
export const educationSummary = data.summary;
export const educationDistricts = data.districts;

export function getEducationDistrict(ubigeo: string) {
  return districtByUbigeo.get(ubigeo);
}

export function educationRate(numerator: number, denominator: number) {
  return denominator > 0 ? Number(((numerator / denominator) * 100).toFixed(1)) : null;
}

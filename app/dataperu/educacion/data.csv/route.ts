import { educationDistricts, educationRate, educationSource } from "@/lib/dataperu-education";

export const revalidate = 86400;

function escapeCsv(value: string | number | null) {
  const text = value == null ? "" : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function GET() {
  const header = [
    "ubigeo",
    "departamento",
    "provincia",
    "distrito",
    "servicios_programas",
    "servicios_escolarizados",
    "programas_no_escolarizados",
    "matricula_total",
    "matricula_hombres",
    "matricula_mujeres",
    "matricula_rural",
    "matricula_rural_porcentaje",
    "matricula_gestion_publica",
    "matricula_gestion_publica_porcentaje",
    "matricula_inicial",
    "matricula_primaria",
    "matricula_secundaria",
    "registros_informante",
    "registros_imputacion_parcial",
    "registros_imputacion_total",
    "registros_informante_porcentaje",
    "periodo",
    "fuente_url"
  ];
  const rows = educationDistricts.map((district) => [
    district.ubigeo,
    district.department,
    district.province,
    district.district,
    district.servicePrograms.total,
    district.servicePrograms.schoolBased,
    district.servicePrograms.nonSchoolBased,
    district.enrollment.total,
    district.enrollment.male,
    district.enrollment.female,
    district.enrollment.rural,
    educationRate(district.enrollment.rural, district.enrollment.total),
    district.enrollment.publicManagement,
    educationRate(district.enrollment.publicManagement, district.enrollment.total),
    district.enrollment.initial,
    district.enrollment.primary,
    district.enrollment.secondary,
    district.provenance.informantRecords,
    district.provenance.partialImputationRecords,
    district.provenance.totalImputationRecords,
    educationRate(district.provenance.informantRecords, district.servicePrograms.total),
    educationSource.referencePeriod,
    educationSource.datasetUrl
  ].map(escapeCsv).join(","));
  const csv = `\uFEFF${[header.join(","), ...rows].join("\r\n")}\r\n`;

  return new Response(csv, {
    headers: {
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      "Content-Disposition": 'attachment; filename="dataperu-matricula-ebr-2025.csv"',
      "Content-Type": "text/csv; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex"
    }
  });
}

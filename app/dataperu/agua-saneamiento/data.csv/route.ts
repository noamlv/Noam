import { waterSanitationDistricts, waterSanitationSource } from "@/lib/dataperu-water-sanitation";

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
    "viviendas_universo",
    "agua_red_publica_viviendas",
    "agua_red_publica_porcentaje",
    "saneamiento_red_publica_viviendas",
    "saneamiento_red_publica_porcentaje",
    "periodo",
    "fuente_url"
  ];
  const rows = waterSanitationDistricts.map((district) => [
    district.ubigeo,
    district.department,
    district.province,
    district.district,
    district.occupiedHousing,
    district.waterNetwork.value,
    district.waterNetwork.percent,
    district.sanitationNetwork.value,
    district.sanitationNetwork.percent,
    waterSanitationSource.referencePeriod,
    waterSanitationSource.datasetUrl
  ].map(escapeCsv).join(","));
  const csv = `\uFEFF${[header.join(","), ...rows].join("\r\n")}\r\n`;

  return new Response(csv, {
    headers: {
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      "Content-Disposition": 'attachment; filename="dataperu-agua-saneamiento-censos-2025.csv"',
      "Content-Type": "text/csv; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex"
    }
  });
}

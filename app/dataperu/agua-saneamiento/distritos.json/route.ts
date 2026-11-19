import type { WaterSanitationSearchItem } from "@/components/dataperu/water-sanitation-explorer";
import { getMunicipality } from "@/lib/dataperu";
import { waterSanitationDistricts } from "@/lib/dataperu-water-sanitation";

export const dynamic = "force-static";

export function GET() {
  const rows: WaterSanitationSearchItem[] = waterSanitationDistricts.map((district) => ({
    ubigeo: district.ubigeo,
    department: district.department,
    province: district.province,
    district: district.district,
    occupiedHousing: district.occupiedHousing,
    waterNetwork: district.waterNetwork,
    sanitationNetwork: district.sanitationNetwork,
    hasMunicipalProfile: Boolean(getMunicipality(district.ubigeo))
  }));

  return Response.json(rows, { headers: { "X-Robots-Tag": "noindex" } });
}

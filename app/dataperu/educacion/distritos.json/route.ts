import type { EducationSearchItem } from "@/components/dataperu/education-explorer";
import { getMunicipality } from "@/lib/dataperu";
import { educationDistricts } from "@/lib/dataperu-education";

export const dynamic = "force-static";

export function GET() {
  const rows: EducationSearchItem[] = educationDistricts.map((district) => ({
    ...district,
    hasMunicipalProfile: Boolean(getMunicipality(district.ubigeo))
  }));

  return Response.json(rows, { headers: { "X-Robots-Tag": "noindex" } });
}

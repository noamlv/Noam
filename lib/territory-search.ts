import type { SearchEntry } from "./search-core.ts";

type MunicipalitySearchSource = {
  ubigeo: string;
  department: string;
  province: string;
  district: string;
  municipalityType: "Provincial" | "Distrital";
};

type DepartmentSearchSource = {
  code: string;
  name: string;
};

type TerritoryName = {
  code: string;
  name: string;
};

function titleCase(value: string) {
  return value
    .toLocaleLowerCase("es-PE")
    .replace(/(^|[\s-])\p{L}/gu, (letter) => letter.toLocaleUpperCase("es-PE"));
}

export function buildTerritorySearchEntries(
  municipalities: MunicipalitySearchSource[],
  departments: DepartmentSearchSource[],
  territories: readonly TerritoryName[]
) {
  const departmentNames = new Map(territories.map((territory) => [territory.code, territory.name]));

  const departmentEntries: SearchEntry[] = departments.map((department) => {
    const name = departmentNames.get(department.code) ?? titleCase(department.name);
    return {
      id: `territory:department:${department.code}`,
      title: `${name}: perfil departamental`,
      description: `Problemas, oportunidades, población, presupuesto, inversión y capacidades municipales para analizar ${name}.`,
      href: `/dataperu/departamentos/${department.code}`,
      kind: "territory",
      label: "Departamento",
      topic: "gobierno",
      keywords: [name, department.name, `región ${name}`, `gobierno regional de ${name}`, "agenda territorial", "DataPerú"]
    };
  });

  const municipalityEntries: SearchEntry[] = municipalities.map((municipality) => {
    const district = titleCase(municipality.district);
    const province = titleCase(municipality.province);
    const department = departmentNames.get(municipality.ubigeo.slice(0, 2)) ?? titleCase(municipality.department);
    const type = municipality.municipalityType.toLocaleLowerCase("es-PE");
    return {
      id: `territory:municipality:${municipality.ubigeo}`,
      title: `${district}: perfil municipal`,
      description: `Datos oficiales de población, educación, agua, saneamiento, presupuesto, inversión y capacidad institucional de la municipalidad ${type} de ${district}, ${province}, ${department}.`,
      href: `/dataperu/municipios/${municipality.ubigeo}`,
      kind: "territory",
      label: `Municipalidad ${type}`,
      topic: "gobierno",
      keywords: [
        municipality.ubigeo,
        municipality.district,
        municipality.province,
        municipality.department,
        `municipalidad ${type} de ${district}`,
        `gobierno local de ${district}`,
        "perfil municipal",
        "DataPerú"
      ]
    };
  });

  return { departmentEntries, municipalityEntries };
}

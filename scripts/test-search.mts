import assert from "node:assert/strict";
import { normalizeSearchText, searchEntries, type SearchEntry } from "../lib/search-core.ts";
import { buildTerritorySearchEntries } from "../lib/territory-search.ts";

const entries: SearchEntry[] = [
  { id: "municipal", title: "Observatorio de inversión municipal", description: "Seguimiento de proyectos y presupuesto para gobiernos locales.", href: "/municipal", kind: "product", label: "Dashboard", topic: "gobierno", featured: true, keywords: ["MEF", "alcaldías"] },
  { id: "ai", title: "IA para procesos públicos", description: "Pilotos controlados con supervisión humana.", href: "/ia", kind: "solution", label: "Solución", topic: "ia", keywords: ["documentos", "automatización"] },
  { id: "survey", title: "Encuestas y escucha territorial", description: "Investigación para población, clientes y actores.", href: "/encuestas", kind: "solution", label: "Solución", topic: "gobierno", keywords: ["opinión", "muestra"] },
  { id: "data-government", title: "Plan de acción de gobierno de datos", description: "Diagnóstico, responsables e iniciativas para una entidad pública.", href: "/gobierno-datos", kind: "evidence", label: "Estudio", topic: "gobierno", keywords: ["calidad", "interoperabilidad", "cronograma"] }
];

assert.equal(normalizeSearchText("Inversión pública"), "inversion publica");
assert.equal(searchEntries(entries, { query: "inversion municipal" })[0]?.id, "municipal", "El título exacto debe dominar el ranking");
assert.equal(searchEntries(entries, { query: "automatizacion" })[0]?.id, "ai", "La búsqueda debe ignorar tildes en palabras clave");
assert.deepEqual(searchEntries(entries, { kind: "solution", topic: "gobierno" }).map((entry) => entry.id), ["survey"], "Los filtros deben combinar tipo y tema");
assert.equal(searchEntries(entries, { query: "acuicultura" }).length, 0, "Una consulta sin señal no debe inventar resultados");
assert.equal(searchEntries(entries, { query: "consulta sin coincidencia xyz" }).length, 0, "Las palabras vacías no deben producir falsos positivos");
assert.deepEqual(searchEntries(entries, { query: "plan accion gobierno datos" }).map((entry) => entry.id), ["data-government"], "Las consultas largas deben exigir coincidencia con la mayoría de sus términos");

const { municipalityEntries, departmentEntries } = buildTerritorySearchEntries(
  [
    { ubigeo: "150122", department: "LIMA", province: "LIMA", district: "MIRAFLORES", municipalityType: "Distrital" },
    { ubigeo: "240102", department: "TUMBES", province: "ZARUMILLA", district: "AGUAS VERDES", municipalityType: "Distrital" }
  ],
  [{ code: "08", name: "CUSCO" }],
  [{ code: "08", name: "Cusco" }, { code: "15", name: "Lima" }]
);
const territorialEntries = [...departmentEntries, ...municipalityEntries];

assert.equal(municipalityEntries[0]?.href, "/dataperu/municipios/150122", "El ubigeo debe generar una ruta municipal estable");
assert.equal(departmentEntries[0]?.title, "Cusco: perfil departamental", "El perfil debe conservar el nombre territorial canónico");
assert.equal(searchEntries(territorialEntries, { query: "gobierno regional de Cusco", kind: "territory" })[0]?.href, "/dataperu/departamentos/08", "Una búsqueda institucional debe encontrar su departamento");
assert.equal(searchEntries(territorialEntries, { query: "municipalidad distrital de Miraflores", kind: "territory" })[0]?.href, "/dataperu/municipios/150122", "Una búsqueda municipal nominal debe encontrar el distrito correcto");
assert.ok(!searchEntries(territorialEntries, { query: "municipalidad distrital de Miraflores", kind: "territory" }).some((entry) => entry.href === "/dataperu/municipios/240102"), "Los términos institucionales genéricos no deben introducir territorios ajenos");

console.log("Search OK: relevancia, normalización y rutas territoriales verificadas.");

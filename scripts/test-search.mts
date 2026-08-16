import assert from "node:assert/strict";
import { normalizeSearchText, searchEntries, type SearchEntry } from "../lib/search-core.ts";

const entries: SearchEntry[] = [
  { id: "municipal", title: "Observatorio de inversión municipal", description: "Seguimiento de proyectos y presupuesto para gobiernos locales.", href: "/municipal", kind: "product", label: "Dashboard", topic: "gobierno", featured: true, keywords: ["MEF", "alcaldías"] },
  { id: "ai", title: "IA para procesos públicos", description: "Pilotos controlados con supervisión humana.", href: "/ia", kind: "solution", label: "Solución", topic: "ia", keywords: ["documentos", "automatización"] },
  { id: "survey", title: "Encuestas y escucha territorial", description: "Investigación para población, clientes y actores.", href: "/encuestas", kind: "solution", label: "Solución", topic: "gobierno", keywords: ["opinión", "muestra"] }
];

assert.equal(normalizeSearchText("Inversión pública"), "inversion publica");
assert.equal(searchEntries(entries, { query: "inversion municipal" })[0]?.id, "municipal", "El título exacto debe dominar el ranking");
assert.equal(searchEntries(entries, { query: "automatizacion" })[0]?.id, "ai", "La búsqueda debe ignorar tildes en palabras clave");
assert.deepEqual(searchEntries(entries, { kind: "solution", topic: "gobierno" }).map((entry) => entry.id), ["survey"], "Los filtros deben combinar tipo y tema");
assert.equal(searchEntries(entries, { query: "acuicultura" }).length, 0, "Una consulta sin señal no debe inventar resultados");
assert.equal(searchEntries(entries, { query: "consulta sin coincidencia xyz" }).length, 0, "Las palabras vacías no deben producir falsos positivos");

console.log("Search OK: normalización, relevancia, filtros y ausencia de resultados verificados");

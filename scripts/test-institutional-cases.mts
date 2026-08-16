import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { getInstitutionalCases, getInstitutionalCasesForService } from "../lib/institutional-cases.ts";

const cases = await getInstitutionalCases();
assert.equal(cases.length, 3, "La vitrina institucional debe contener tres casos reales");

const expectedClients = new Set(["CONCYTEC", "Instituto Peruano del Deporte (IPD)", "Gobierno Regional del Cusco"]);

for (const item of cases) {
  assert.ok(item.client && expectedClients.has(item.client), `Cliente institucional inesperado: ${item.client}`);
  assert.ok(item.logo?.startsWith("/images/institutions/"), `Falta logo local para ${item.slug}`);
  assert.ok(item.logoAlt, `Falta texto alternativo para ${item.slug}`);
  assert.ok(fs.existsSync(path.join(process.cwd(), "public", item.logo!.replace(/^\//, ""))), `No existe el activo ${item.logo}`);
  assert.ok(item.disclosure, `Falta divulgación responsable para ${item.slug}`);
}

assert.equal((await getInstitutionalCasesForService("estudios-diagnosticos-evaluacion")).length, 2);
assert.equal((await getInstitutionalCasesForService("observatorios-sistemas-decision")).length, 1);
assert.equal((await getInstitutionalCasesForService("ia-transformacion-gestion")).length, 0);

console.log("Institutional cases OK: 3 casos, logos locales y relaciones de servicio verificadas");

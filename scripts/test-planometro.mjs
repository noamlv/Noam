import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const snapshot = JSON.parse(await readFile(new URL("../data/processed/planometro-2026.json", import.meta.url), "utf8"));
const partiesCsv = await readFile(new URL("../public/downloads/planometro-2026-partidos.csv", import.meta.url), "utf8");
const axesCsv = await readFile(new URL("../public/downloads/planometro-2026-ejes.csv", import.meta.url), "utf8");

assert.equal(snapshot.summary.plans, 36);
assert.equal(snapshot.summary.detectedStatements, 4_084);
assert.equal(snapshot.summary.operationalProposals, 2_742);
assert.equal(snapshot.summary.annotatedCases, 404);
assert.equal(snapshot.summary.axes, 11);
assert.equal(snapshot.parties.length, snapshot.summary.plans);
assert.equal(new Set(snapshot.parties.map((party) => party.slug)).size, snapshot.summary.plans, "Los slugs deben ser únicos");
const axisKeys = new Set(snapshot.axes.map((axis) => axis.key));
assert.equal(axisKeys.size, snapshot.summary.axes, "Los ejes deben tener claves únicas");

const sum = (items, key) => items.reduce((total, item) => total + item[key], 0);
assert.equal(sum(snapshot.parties, "detectedStatements"), snapshot.summary.detectedStatements);
assert.equal(sum(snapshot.parties, "operationalProposals"), snapshot.summary.operationalProposals);
assert.equal(sum(snapshot.axes, "proposals"), snapshot.summary.operationalProposals);
assert.equal(sum(snapshot.instruments, "proposals"), snapshot.summary.operationalProposals);
assert.equal(sum(snapshot.scoreBands, "proposals"), snapshot.summary.operationalProposals);

for (const party of snapshot.parties) {
  assert.equal(sum(party.axes, "proposals"), party.operationalProposals, `${party.name}: mezcla temática incompleta`);
  assert.ok(party.axes.every((axis) => axisKeys.has(axis.key)), `${party.name}: eje fuera de la taxonomía publicada`);
  assert.ok(party.topAxes.every((axis) => party.axes.some((candidate) => candidate.key === axis.key)), `${party.name}: eje principal desconocido`);
  for (const value of [party.operationalSharePercent, party.averageConcreteness, party.quantTargetPercent, party.timeHorizonPercent, party.costOrFundingPercent, party.fundingSourcePercent]) {
    assert.ok(value >= 0 && value <= 100, `${party.name}: indicador fuera de rango`);
  }
}

assert.deepEqual(
  [snapshot.validation.strict.precisionPercent, snapshot.validation.strict.recallPercent, snapshot.validation.strict.f1Percent],
  [70.5, 96.9, 81.6]
);
assert.ok(snapshot.validation.note.includes("anotación asistida"), "La validación debe declarar el modo de anotación");
assert.match(snapshot.source.broadSha256, /^[a-f0-9]{64}$/);
assert.match(snapshot.source.strictSha256, /^[a-f0-9]{64}$/);
assert.equal(partiesCsv.trim().split("\n").length, 37, "CSV de organizaciones debe incluir cabecera y 36 filas");
assert.equal(axesCsv.trim().split("\n").length, 12, "CSV de ejes debe incluir cabecera y 11 filas");

console.log("Planómetro OK: 36 planes, 2.742 propuestas operativas y agregados consistentes");

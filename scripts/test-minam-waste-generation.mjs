import assert from "node:assert/strict";
import data from "../data/processed/minam-waste-generation-2014-2024.json" with { type: "json" };

assert.equal(data.source.sha256, "4f2cb77a3e94364dd0e5e6e21014438d64255b81953cb52f323d8006a492ccc3");
assert.equal(data.source.referencePeriod, "2014-2024");
assert.equal(data.annual.length, 11);
assert.equal(data.departments.length, 25);
assert.deepEqual(data.annual.map((entry) => entry.year), Array.from({ length: 11 }, (_, index) => 2014 + index));
assert.equal(data.annual[0].districts, 1_851);
assert.equal(data.annual.at(-1).districts, 1_891);
assert.equal(data.annual.at(-1).tonnes, 8_994_762.83);
assert.equal(new Set(data.departments.map((item) => item.code)).size, 25);
assert.ok(data.source.notes.includes("2023"));

for (const entry of data.annual) {
  assert.ok(entry.tonnes > 0);
  const departmentRows = data.departments.map((item) => item.annual.find((row) => row.year === entry.year));
  assert.ok(departmentRows.every(Boolean));
  assert.equal(departmentRows.reduce((total, row) => total + row.districts, 0), entry.districts);
  assert.ok(Math.abs(departmentRows.reduce((total, row) => total + row.tonnes, 0) - entry.tonnes) < 0.01);
}

assert.deepEqual(Object.keys(data), ["source", "annual", "departments"]);
console.log("Residuos MINAM validados: 11 anos, 25 departamentos, 1.891 distritos en 2024.");

import assert from "node:assert/strict";
import waterSanitation from "../data/processed/census-2025-water-sanitation.json" with { type: "json" };
import renamu from "../data/processed/renamu-2025-municipalities.json" with { type: "json" };

const { districts, source, summary } = waterSanitation;

assert.equal(source.referencePeriod, "2025");
assert.equal(summary.districts, 1_892);
assert.equal(summary.departments, 25);
assert.equal(summary.sourceRegions, 26);
assert.equal(districts.length, summary.districts);
assert.equal(new Set(districts.map((district) => district.ubigeo)).size, districts.length);

for (const district of districts) {
  assert.match(district.ubigeo, /^\d{6}$/);
  assert.ok(district.occupiedHousing != null && district.occupiedHousing >= 0);
  for (const metric of [district.waterNetwork, district.sanitationNetwork]) {
    assert.ok(metric.value != null && metric.value >= 0);
    assert.ok(metric.value <= district.occupiedHousing);
    assert.ok(metric.percent != null && metric.percent >= 0 && metric.percent <= 100);
    if (district.occupiedHousing > 0) {
      const calculated = (metric.value / district.occupiedHousing) * 100;
      assert.ok(Math.abs(calculated - metric.percent) <= 0.11, `${district.ubigeo}: porcentaje inconsistente`);
    }
  }
}

const sum = (selector) => districts.reduce((total, district) => total + selector(district), 0);
assert.equal(sum((district) => district.occupiedHousing), 10_167_523);
assert.equal(sum((district) => district.waterNetwork.value), 8_062_953);
assert.equal(sum((district) => district.sanitationNetwork.value), 6_990_117);

const renamuUbigeos = new Set(renamu.municipalities.map((municipality) => municipality.ubigeo));
const joined = districts.filter((district) => renamuUbigeos.has(district.ubigeo));
const censusOnly = districts.filter((district) => !renamuUbigeos.has(district.ubigeo));
assert.equal(joined.length, 1_891);
assert.deepEqual(censusOnly.map((district) => district.ubigeo), ["160405"]);
assert.equal(censusOnly[0].district, "Santa Rosa de Loreto");

console.log("Capa de agua y saneamiento validada: 1,892 distritos, cobertura completa y empalme RENAMU controlado.");

import assert from "node:assert/strict";
import education from "../data/processed/minedu-education-enrollment-2025.json" with { type: "json" };
import renamu from "../data/processed/renamu-2025-municipalities.json" with { type: "json" };

const { districts, source, summary } = education;

assert.equal(source.referencePeriod, "2025");
assert.equal(summary.districts, 1_892);
assert.equal(summary.departments, 25);
assert.equal(districts.length, summary.districts);
assert.equal(new Set(districts.map((district) => district.ubigeo)).size, districts.length);

for (const district of districts) {
  assert.match(district.ubigeo, /^\d{6}$/);
  assert.ok(district.servicePrograms.total > 0);
  assert.equal(
    district.servicePrograms.schoolBased + district.servicePrograms.nonSchoolBased + district.servicePrograms.otherForm,
    district.servicePrograms.total
  );
  assert.equal(district.enrollment.male + district.enrollment.female, district.enrollment.total);
  assert.equal(district.enrollment.urban + district.enrollment.rural, district.enrollment.total);
  assert.equal(district.enrollment.publicManagement + district.enrollment.privateManagement, district.enrollment.total);
  assert.equal(district.enrollment.initial + district.enrollment.primary + district.enrollment.secondary, district.enrollment.total);
  assert.equal(
    district.provenance.informantRecords + district.provenance.partialImputationRecords + district.provenance.totalImputationRecords,
    district.servicePrograms.total
  );
  for (const value of Object.values(district.enrollment)) assert.ok(value >= 0);
}

assert.equal(summary.servicePrograms.total, 106_752);
assert.equal(summary.servicePrograms.schoolBased, 89_079);
assert.equal(summary.servicePrograms.nonSchoolBased, 17_668);
assert.equal(summary.servicePrograms.otherForm, 5);
assert.equal(summary.enrollment.total, 8_293_767);
assert.equal(summary.enrollment.male, 4_209_356);
assert.equal(summary.enrollment.female, 4_084_411);
assert.equal(summary.enrollment.rural, 1_920_040);
assert.equal(summary.enrollment.publicManagement, 6_225_274);
assert.equal(summary.enrollment.initial, 1_629_014);
assert.equal(summary.enrollment.primary, 3_666_690);
assert.equal(summary.enrollment.secondary, 2_998_063);
assert.equal(summary.provenance.informantRecords, 103_624);
assert.equal(summary.provenance.partialImputationRecords, 147);
assert.equal(summary.provenance.totalImputationRecords, 2_981);

const renamuUbigeos = new Set(renamu.municipalities.map((municipality) => municipality.ubigeo));
const joined = districts.filter((district) => renamuUbigeos.has(district.ubigeo));
const censusOnly = districts.filter((district) => !renamuUbigeos.has(district.ubigeo));
assert.equal(joined.length, 1_891);
assert.deepEqual(censusOnly.map((district) => district.ubigeo), ["160405"]);
assert.equal(censusOnly[0].province, "Mariscal Ramón Castilla");
assert.equal(censusOnly[0].district, "Santa Rosa de Loreto");

console.log("Matrícula EBR 2025 validada: 1,892 distritos, 106,752 servicios o programas y reconciliación completa.");

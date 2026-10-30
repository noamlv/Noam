import assert from "node:assert/strict";
import { analysisLibrary, getAnalysisSnapshot } from "../lib/analysis-library.ts";
import { platformCatalog } from "../lib/platform-catalog.ts";

assert.equal(analysisLibrary.length, 5);
assert.equal(new Set(analysisLibrary.map((entry) => entry.slug)).size, 5);
for (const entry of analysisLibrary) {
  const snapshot = getAnalysisSnapshot(entry.slug);
  assert.ok(snapshot);
  assert.match(snapshot.sha256, /^[a-f0-9]{64}$/);
  assert.equal(entry.findings.length, 3);
  assert.equal(entry.questions.length, 3);
  assert.ok(entry.limits.length >= 3);
  assert.ok(entry.sourceUrl.startsWith("https://"));
  assert.ok(platformCatalog.some((product) => product.href === `/analisis/${entry.slug}`));
  assert.equal(new Set(snapshot.slices.map((slice) => slice.period)).size, snapshot.slices.length);
  for (const slice of snapshot.slices) {
    assert.ok(slice.groups.length > 0);
    assert.ok(Number.isInteger(slice.missing) && slice.missing >= 0);
    assert.equal(new Set(slice.groups.map((group) => group.label)).size, slice.groups.length);
    for (const group of slice.groups) {
      assert.deepEqual(Object.keys(group).sort(), ["label", "records", "value"]);
      assert.ok(Number.isFinite(group.value) && group.value >= 0);
      assert.ok(Number.isInteger(group.records) && group.records > 0);
      assert.ok(!/^[=+@\-]/.test(group.label), "CSV labels must not execute formulas");
    }
  }
}

const pat = getAnalysisSnapshot("planes-territoriales")!;
assert.equal(pat.slices[0].groups.reduce((sum, group) => sum + group.value, 0), 196);
const nationalStatuses = new Map(pat.slices[0].groups.map((group) => [group.label, group.value]));
for (const [status, total] of nationalStatuses) assert.equal(pat.slices.slice(1).flatMap((slice) => slice.groups).filter((group) => group.label === status).reduce((sum, group) => sum + group.value, 0), total);
const conadis = getAnalysisSnapshot("registro-discapacidad")!;
assert.equal(conadis.slices.at(-1)!.groups.reduce((sum, group) => sum + group.value, 0), 48_783);
assert.equal(conadis.slices.find((slice) => slice.period === "2015")!.missing, 25);
assert.ok(conadis.slices.every((slice) => slice.groups.every((group) => group.value >= 10)));
const pad = getAnalysisSnapshot("apoyo-deportista")!;
assert.equal(pad.slices.at(-1)!.groups.reduce((sum, group) => sum + group.value, 0), 5_454_680.5);
assert.deepEqual([...new Set(pad.slices.flatMap((slice) => slice.groups.map((group) => group.label)))].sort(), ["PAD I", "PAD II", "PNM"]);
assert.equal(pad.slices.flatMap((slice) => slice.groups).reduce((sum, group) => sum + group.records, 0), 68_938);
const onpe = getAnalysisSnapshot("conteo-presidencial-2026")!;
assert.deepEqual(onpe.slices.map((slice) => slice.groups.length), [36, 36, 36]);
for (const group of onpe.slices[0].groups) assert.equal(group.value, onpe.slices.slice(1).reduce((sum, slice) => sum + slice.groups.find((item) => item.label === group.label)!.value, 0));
assert.equal(onpe.slices[0].groups.reduce((sum, group) => sum + group.value, 0), 15_444_537);
assert.equal(getAnalysisSnapshot("not-a-product"), undefined);
console.log("Analysis library OK: 5 products, aggregate reconciliation, privacy allowlist and historical coverage.");

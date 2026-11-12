import assert from "node:assert/strict";
import padBreakdowns from "../data/processed/pad-breakdowns.json" with { type: "json" };
import { analysisLibrary, getAnalysisSnapshot } from "../lib/analysis-library.ts";
import { platformCatalog } from "../lib/platform-catalog.ts";
import { annualObservations, athleteRelationshipRows, completeSegments, matchedChanges, reportCsv, sliceTotal } from "../lib/analysis-report.ts";

assert.equal(analysisLibrary.length, 5);
assert.equal(new Set(analysisLibrary.map((entry) => entry.slug)).size, 5);
for (const entry of analysisLibrary) {
  const snapshot = getAnalysisSnapshot(entry.slug);
  assert.ok(snapshot);
  assert.match(snapshot.sha256, /^[a-f0-9]{64}$/);
  assert.equal(entry.findings.length, 3);
  assert.equal(entry.questions.length, 3);
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

const { analysisPresentation, getAnalysisOverview } = await import("../lib/analysis-presentation.ts");
const { existsSync, readFileSync } = await import("node:fs");
assert.equal(analysisLibrary.filter((entry) => analysisPresentation[entry.slug].area === "dataperu").length, 4);
assert.equal(analysisPresentation["conteo-presidencial-2026"].area, "electoral");
for (const entry of analysisLibrary) {
  const snapshot = getAnalysisSnapshot(entry.slug)!;
  const original = JSON.stringify(snapshot);
  const overview = getAnalysisOverview(snapshot);
  const presentation = analysisPresentation[entry.slug];
  assert.ok(existsSync(`public${presentation.image}`), "Editorial illustration must exist locally");
  assert.match(presentation.accent, /^#[0-9a-f]{6}$/i);
  assert.equal(overview.total, overview.selected.groups.reduce((sum, group) => sum + group.value, 0));
  assert.equal(overview.groups.length, overview.selected.groups.length);
  assert.equal(JSON.stringify(snapshot), original, "Chart sorting must not mutate the source");
  if (presentation.originalDashboardUrl) assert.ok(new URL(presentation.originalDashboardUrl).protocol === "https:");
}
const partialHistory = getAnalysisOverview(conadis);
assert.equal(partialHistory.history.find((point) => point.period === "2015")!.missing, 25);
assert.equal(partialHistory.history.find((point) => point.period === "2015")!.total, conadis.slices.find((slice) => slice.period === "2015")!.groups.reduce((sum, group) => sum + group.value, 0), "Sum only reported values without filling missing rows");
assert.ok(partialHistory.partial, "The 2025 default must retain its partial-period warning");
assert.equal(getAnalysisOverview(onpe).total, 15_444_537, "Do not sum national votes twice across overlapping slices");
assert.equal(getAnalysisOverview(onpe).history.length, 0, "Geographic slices are not a time series");
assert.equal(getAnalysisOverview(pat).history.length, 0, "PAT department slices are not a time series");
assert.deepEqual(annualObservations(pat), []);
assert.deepEqual(annualObservations(onpe), []);
assert.deepEqual(completeSegments(annualObservations(conadis)).map((segment) => segment.map((point) => point.year)), [
  [2014], [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
], "Do not draw lines through incomplete years");
assert.deepEqual(completeSegments([{ year: 2020, partial: false }, { year: 2022, partial: false }]).map((segment) => segment.length), [1, 1]);
const athleteYears = annualObservations(pad);
assert.equal(athleteYears.find((point) => point.year === 2024)?.value, 8_450_350);
assert.equal(athleteYears.at(-1)?.partial, true);
assert.equal(athleteYears.reduce((sum, point) => sum + point.records, 0), 68_938);
assert.equal(padBreakdowns.sha256, pad.sha256);
const amountCents = athleteYears.reduce((sum, point) => sum + Math.round(point.value * 100), 0);
for (const groups of [padBreakdowns.federation, padBreakdowns.birthplace]) {
  assert.equal(groups.reduce((sum, group) => sum + group.records, 0), pad.sourceRows);
  assert.equal(groups.reduce((sum, group) => sum + Math.round(group.value * 100), 0), amountCents);
  assert.equal(new Set(groups.map((group) => group.label)).size, groups.length);
  for (const group of groups) assert.deepEqual(Object.keys(group).sort(), ["label", "records", "value"]);
}
assert.equal(padBreakdowns.federation[0].label, "ATLETISMO");
assert.equal(padBreakdowns.birthplace.find(({ label }) => label === "Exterior")?.records, 1_770);
const padRelationships = athleteRelationshipRows(pad);
assert.equal(padRelationships.length, 32);
assert.equal(padRelationships.filter(({ partial }) => partial).length, 3);
assert.equal(padRelationships.reduce((sum, row) => sum + row.records, 0), pad.sourceRows);
assert.ok(!padRelationships.some((row) => row.year < 2020 && row.modality === "PNM"));
const padTwo2024 = padRelationships.find(({ year, modality }) => year === 2024 && modality === "PAD II")!;
assert.equal(padTwo2024.mean, 2_661_450 / 590);
assert.deepEqual(athleteRelationshipRows(conadis), []);
const padChanges = matchedChanges(pad.slices.at(-3)!, pad.slices.at(-2)!);
assert.equal(padChanges.find((row) => row.label === "PAD I")?.delta, -4_264_100);
assert.equal(padChanges.reduce((sum, row) => sum + row.delta, 0), 8_450_350 - 11_235_470);
assert.equal(annualObservations(conadis).find((point) => point.year === 2024)?.value, 69_940);
assert.equal(pat.slices.slice(1).reduce((sum, slice) => sum + sliceTotal(slice), 0), 196);
assert.ok(!reportCsv(pat).includes('"Perú",'), "Exclude the overlapping national row from PAT exports");
assert.ok(reportCsv(pad).includes('"PAD I","4478212.5"'));
const landing = readFileSync("app/analisis/[slug]/page.tsx", "utf8");
assert.ok(landing.includes('<Section id="datos">') && landing.includes("<AnalysisReport"), "The landing must contain its own data and figures");
assert.match(landing, /originalDashboardUrl/, "Keep original dashboards distinct from the native explorer");
assert.ok(!landing.includes('href={`/analisis/${entry.slug}/dashboard`}'), "Do not send readers to the legacy explorer as if it were an original dashboard");
assert.ok(readFileSync("app/sitemap.ts", "utf8").includes('"/dataperu/analisis"'));
console.log("Analysis presentation OK: 4 DataPerú analyses, electoral archive, partial periods, safe aggregates and inline figures.");

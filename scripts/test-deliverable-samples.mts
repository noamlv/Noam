import assert from "node:assert/strict";
import { deliverableSamples, getDeliverableSample, getDeliverableSampleBySolution } from "../lib/deliverable-samples.ts";

assert.equal(deliverableSamples.length, 7, "La biblioteca comercial debe publicar siete muestras");
assert.equal(new Set(deliverableSamples.map((sample) => sample.slug)).size, deliverableSamples.length, "Los slugs deben ser únicos");
assert.equal(new Set(deliverableSamples.map((sample) => sample.solutionSlug)).size, deliverableSamples.length, "Cada solución debe tener una muestra propia");

for (const sample of deliverableSamples) {
  assert.equal(getDeliverableSample(sample.slug), sample, `Debe resolver ${sample.slug}`);
  assert.equal(getDeliverableSampleBySolution(sample.solutionSlug), sample, `Debe vincular la solución ${sample.solutionSlug}`);
  assert.equal(sample.questions.length, 4, `${sample.slug} debe exponer cuatro preguntas`);
  assert.equal(sample.modules.length, 4, `${sample.slug} debe exponer cuatro módulos`);
  assert.equal(sample.timeline.length, 4, `${sample.slug} debe exponer cuatro fases`);
  assert.ok(sample.preview.rows.length >= 4, `${sample.slug} debe mostrar un artefacto sustantivo`);
  assert.ok(sample.clientInputs.length >= 4, `${sample.slug} debe declarar insumos`);
  assert.ok(sample.qualityControls.length >= 4, `${sample.slug} debe declarar controles`);
  assert.ok(sample.deliverables.length >= 4, `${sample.slug} debe declarar entregables`);
  assert.ok(sample.related.length >= 3, `${sample.slug} debe conectar evidencia y solución`);
  assert.match(sample.duration, /semanas/, `${sample.slug} debe declarar un horizonte, no una fecha ficticia`);
}

assert.equal(getDeliverableSample("no-existe"), undefined);
console.log("Muestras OK: siete arquitecturas comerciales completas y diferenciadas");

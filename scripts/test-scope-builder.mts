import assert from "node:assert/strict";
import {
  buildScopeBrief,
  buildScopeContactHref,
  buildScopeRecommendation,
  buildScopeSampleSlug,
  parseScopeBuilderInput,
  scopeChallengeOptions,
  scopeEvidenceOptions,
  scopeHorizonOptions,
  scopeOrganizationOptions,
  type ScopeBuilderInput
} from "../lib/scope-builder.ts";
import { deliverableSamples } from "../lib/deliverable-samples.ts";

let combinations = 0;
const availableSampleSlugs = new Set(deliverableSamples.map((sample) => sample.slug));
const mappedSampleSlugs = new Set<string>();

for (const organization of scopeOrganizationOptions) {
  for (const challenge of scopeChallengeOptions) {
    for (const evidence of scopeEvidenceOptions) {
      for (const horizon of scopeHorizonOptions) {
        const input: ScopeBuilderInput = { organization: organization.value, challenge: challenge.value, evidence: evidence.value, horizon: horizon.value };
        const recommendation = buildScopeRecommendation(input);
        const sampleSlug = buildScopeSampleSlug(input);
        const href = buildScopeContactHref(input);
        const url = new URL(href, "https://noam.pe");
        const parsed = parseScopeBuilderInput(Object.fromEntries(url.searchParams));
        const brief = buildScopeBrief(input, new Date("2026-07-17T12:00:00Z"));

        assert.deepEqual(parsed, input, "Contacto debe reconstruir exactamente las selecciones");
        assert.equal(url.pathname, "/contact");
        assert.equal(url.searchParams.get("from"), "/diagnostico");
        assert.ok(recommendation.title.length > 10);
        assert.ok(availableSampleSlugs.has(sampleSlug), `La recomendación debe apuntar a una muestra existente: ${sampleSlug}`);
        if (input.challenge !== "transition") {
          const sample = deliverableSamples.find((item) => item.slug === sampleSlug);
          assert.equal(url.searchParams.get("interest"), sample?.solutionSlug, "Muestra, solución y clasificación comercial deben conservar el mismo contexto");
        }
        mappedSampleSlugs.add(sampleSlug);
        assert.equal(recommendation.phases.length, 3);
        assert.equal(recommendation.deliverables.length, 4);
        assert.ok(brief.includes("no una cotización ni una propuesta contractual"));
        assert.ok(brief.includes(recommendation.title));
        combinations += 1;
      }
    }
  }
}

assert.equal(combinations, 400);
assert.equal(mappedSampleSlugs.size, deliverableSamples.length, "Las 400 combinaciones deben poder recomendar las seis muestras");
assert.equal(parseScopeBuilderInput({ org: "invalid", challenge: "understand", evidence: "public", horizon: "medium" }), null);

console.log(`Scope Builder OK: ${combinations} combinaciones y briefs verificados`);

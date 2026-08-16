import assert from "node:assert/strict";
import { aiUseCases, assessmentFromUseCase, evaluateAiUseCase } from "../lib/ai-lab.ts";

function resultFor(id: string) {
  const useCase = aiUseCases.find((item) => item.id === id);
  assert.ok(useCase, `Debe existir el caso ${id}`);
  return evaluateAiUseCase(assessmentFromUseCase(useCase));
}

const documentSearch = resultFor("document-search");
assert.deepEqual(
  {
    opportunity: documentSearch.opportunity,
    exposure: documentSearch.exposure,
    controlStrength: documentSearch.controlStrength,
    status: documentSearch.status
  },
  { opportunity: 75, exposure: 41, controlStrength: 93, status: "pilot" }
);

const automaticEligibility = resultFor("benefit-eligibility");
assert.deepEqual(
  {
    opportunity: automaticEligibility.opportunity,
    exposure: automaticEligibility.exposure,
    controlStrength: automaticEligibility.controlStrength,
    status: automaticEligibility.status
  },
  { opportunity: 85, exposure: 100, controlStrength: 47, status: "stop" }
);
assert.ok(automaticEligibility.controls.some((control) => control.includes("reclamo")));
assert.ok(automaticEligibility.controls.some((control) => control.includes("Reducir autonomía")));

console.log("AI Lab OK: puntuación, reglas de detención y controles verificados");

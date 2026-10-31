import { getDepartmentResearch } from "./department-research.ts";

export type DepartmentInquiryKind = "problem" | "opportunity";

export function getDepartmentInquiry(code?: string, kind?: string, item?: string) {
  if (!code || !/^\d{2}$/.test(code) || !item || !/^[0-9]$/.test(item) || (kind !== "problem" && kind !== "opportunity")) return null;

  const research = getDepartmentResearch(code);
  if (!research) return null;

  const index = Number(item);
  const selected = kind === "problem" ? research.problems[index] : research.opportunities[index];
  if (!selected) return null;

  const premise = `Vi en la agenda territorial de ${research.department} la ${kind === "problem" ? "prioridad pública" : "oportunidad empresarial"} "${selected.title}".`;
  const caveat = `Es una síntesis preliminar revisada el ${research.researchDate}, con confianza ${research.confidence} y base ${research.evidenceBase?.scope ?? "por precisar"}; requiere validación local antes de recomendar una intervención.`;
  const focus = kind === "problem"
    ? `Decisión por precisar: ${research.problems[index].governmentDecision}\nPosible punto de partida NOAM: ${research.problems[index].noamResponse}`
    : `Hipótesis: ${research.opportunities[index].rationale}\nQué falta comprobar: ${research.opportunities[index].validation}\nNo supone un mercado garantizado.`;

  return {
    title: selected.title,
    kindLabel: kind === "problem" ? "Prioridad pública" : "Hipótesis empresarial",
    territory: research.department,
    sourcePath: `/dataperu/departamentos/${code}`,
    message: `${premise}\n\n${caveat}\n\n${focus}\n\nQuisiera conversar sobre un alcance para mi organización.\n\nContexto adicional:\n`
  };
}

import { departmentResearch } from "../lib/department-research.ts";

const expectedCodes = Array.from({ length: 25 }, (_, index) => String(index + 1).padStart(2, "0"));
const codes = departmentResearch.map((item) => item.code);
const uniqueCodes = new Set(codes);

if (uniqueCodes.size !== codes.length) throw new Error("Hay códigos departamentales duplicados en la agenda de investigación.");
if (expectedCodes.some((code) => !uniqueCodes.has(code))) throw new Error("La agenda territorial no cubre los 25 departamentos.");
if (codes.length !== expectedCodes.length) throw new Error(`Se esperaban 25 perfiles y se encontraron ${codes.length}.`);

const forbiddenDraftPatterns = [/%/, /\bCONFIRMAR\b/, /\bPOR CONFIRMAR\b/, /\bplaceholder\b/i, /\bX%\b/, /\{\{/];

for (const research of departmentResearch) {
  if (!/^\d{2}$/.test(research.code)) throw new Error(`Código inválido: ${research.code}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(research.researchDate)) throw new Error(`Fecha inválida para ${research.department}`);
  if (!research.evidenceBase) throw new Error(`${research.department} no declara su base de evidencia.`);
  if (research.problems.length < 4) throw new Error(`${research.department} necesita al menos cuatro problemas estructurados.`);
  if (research.opportunities.length < 3) throw new Error(`${research.department} necesita al menos tres hipótesis empresariales.`);
  if (research.interventions.length < 3) throw new Error(`${research.department} necesita al menos tres intervenciones NOAM.`);
  if (research.evidenceGaps.length < 3) throw new Error(`${research.department} debe declarar sus vacíos de evidencia.`);

  const publicText = JSON.stringify(research);
  const forbidden = forbiddenDraftPatterns.find((pattern) => pattern.test(publicText));
  if (forbidden) throw new Error(`${research.department} contiene una marca no publicable: ${forbidden}`);
}

const macroregionalCodes = departmentResearch.filter((item) => item.evidenceBase?.scope === "macroregional").map((item) => item.code).sort();
if (macroregionalCodes.join(",") !== "04,05") throw new Error("Solo Arequipa y Ayacucho deben permanecer con base macroregional preliminar.");

console.log(`Agendas departamentales OK: ${departmentResearch.length} perfiles curados y sin cifras no verificadas.`);

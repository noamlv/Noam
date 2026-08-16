import { getAllContent } from "./content.ts";

const casesByService: Record<string, string[]> = {
  "estudios-diagnosticos-evaluacion": [
    "gore-cusco-evaluacion-prevencion-trata",
    "concytec-prioridades-cti-seguridad"
  ],
  "observatorios-sistemas-decision": [
    "ipd-sistema-estadistico-investigacion-deportiva"
  ],
  "ia-transformacion-gestion": []
};

export async function getInstitutionalCases() {
  const cases = await getAllContent("cases");
  return cases.filter((item) => item.caseType === "institutional");
}

export async function getInstitutionalCasesForService(serviceSlug: string) {
  const requestedSlugs = casesByService[serviceSlug] ?? [];
  const cases = await getInstitutionalCases();
  return requestedSlugs
    .map((slug) => cases.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

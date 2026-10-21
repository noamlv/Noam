import {
  getMunicipality,
  getMunicipalityContext,
  getMunicipalityProjects,
  getMunicipalitySignals,
  titleCase
} from "@/lib/dataperu";

export function getMunicipalityInquiry(ubigeo?: string, signalId?: string) {
  if (!ubigeo || !/^\d{6}$/.test(ubigeo) || !signalId || !/^[a-z-]{1,40}$/.test(signalId)) return null;

  const municipality = getMunicipality(ubigeo);
  const context = getMunicipalityContext(ubigeo);
  if (!municipality || !context) return null;

  const signal = getMunicipalitySignals(municipality, context, getMunicipalityProjects(ubigeo))
    .find((item) => item.id === signalId);
  if (!signal) return null;

  const territory = `${titleCase(municipality.district)}, ${titleCase(municipality.province)}, ${titleCase(municipality.department)}`;
  const sourcePath = `/dataperu/municipios/${ubigeo}`;

  return {
    title: signal.title,
    territory,
    sourcePath,
    message: `Vi en el perfil público de ${territory} la señal "${signal.title}" (datos de referencia 2025).\n\nObservación: ${signal.observation}\nPregunta por investigar: ${signal.question}\n\nEntiendo que es una lectura descriptiva, no un diagnóstico concluido. Quisiera conversar sobre cómo validarla y qué análisis ayudaría a decidir.\n\nContexto de nuestra organización:\n`
  };
}

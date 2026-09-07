import { solutions } from "@/lib/solutions";

export const organizationTypeOptions = [
  { value: "municipality", label: "Municipalidad" },
  { value: "regional-government", label: "Gobierno regional" },
  { value: "national-government", label: "Entidad del gobierno nacional" },
  { value: "public-program", label: "Programa u organismo público" },
  { value: "company", label: "Empresa" },
  { value: "cooperation", label: "Cooperación, fundación u ONG" },
  { value: "academic", label: "Universidad o centro de investigación" },
  { value: "individual", label: "Profesional independiente" },
  { value: "other", label: "Otro tipo de organización" }
] as const;

export const timelineOptions = [
  { value: "urgent", label: "Necesitamos comenzar en menos de 30 días" },
  { value: "one-to-three-months", label: "En los próximos 1 a 3 meses" },
  { value: "three-to-six-months", label: "En los próximos 3 a 6 meses" },
  { value: "exploring", label: "Estamos explorando opciones" },
  { value: "to-define", label: "Por definir" }
] as const;

export const budgetRangeOptions = [
  { value: "estimate-help", label: "Necesitamos ayuda para estimarlo" },
  { value: "under-25k", label: "Hasta S/ 25 mil" },
  { value: "25k-60k", label: "S/ 25 mil a S/ 60 mil" },
  { value: "60k-150k", label: "S/ 60 mil a S/ 150 mil" },
  { value: "over-150k", label: "Más de S/ 150 mil" },
  { value: "to-define", label: "Aún no está definido" },
  { value: "prefer-not-to-say", label: "Prefiero conversarlo" }
] as const;

export const generalInterestOptions = [
  { value: "dataperu", label: "DataPerú o módulo territorial" },
  { value: "electoral", label: "Análisis electoral u opinión pública" },
  { value: "general-public", label: "Otra necesidad del sector público" },
  { value: "general-private", label: "Otra necesidad empresarial" },
  { value: "other", label: "Otro desafío" }
] as const;

export const solutionInterestOptions = solutions.map((solution) => ({ value: solution.slug, label: solution.title }));
export const interestOptions = [...solutionInterestOptions, ...generalInterestOptions];

export const interestAliases: Record<string, string> = {
  estudios: "diagnostico-agenda-territorial",
  "estudios-diagnosticos-evaluacion": "diagnostico-agenda-territorial",
  "diagnostico-municipal": "diagnostico-agenda-territorial",
  "diagnostico-territorial": "diagnostico-agenda-territorial",
  "ficha-municipal": "diagnostico-agenda-territorial",
  "linea-base": "linea-base-evaluacion-programas",
  evaluacion: "linea-base-evaluacion-programas",
  "evaluacion-impacto": "linea-base-evaluacion-programas",
  "evaluacion-programas": "linea-base-evaluacion-programas",
  observatorio: "observatorio-gestion-inversiones",
  "observatorios-sistemas-decision": "observatorio-gestion-inversiones",
  dashboard: "observatorio-gestion-inversiones",
  "geo-viewer": "observatorio-gestion-inversiones",
  ia: "ia-procesos-publicos",
  "ia-transformacion-gestion": "ia-procesos-publicos",
  "ai-governance": "ia-procesos-publicos",
  planometro: "electoral",
  "planometro-electoral": "electoral",
  transicion: "transferencia-gestion-100-dias",
  "transferencia-gestion": "transferencia-gestion-100-dias",
  "nueva-gestion": "transferencia-gestion-100-dias",
  "primeros-100-dias": "transferencia-gestion-100-dias",
  "sector-publico": "general-public",
  empresas: "general-private"
};

export function resolveInterest(value?: string) {
  const requested = interestAliases[value ?? ""] ?? value ?? "";
  return interestOptions.some((option) => option.value === requested) ? requested : "diagnostico-agenda-territorial";
}

function labelFrom<T extends readonly { value: string; label: string }[]>(options: T, value?: string | null) {
  return options.find((option) => option.value === value)?.label ?? value ?? "No informado";
}

export const leadLabels = {
  interest: (value?: string | null) => labelFrom(interestOptions, value),
  organizationType: (value?: string | null) => labelFrom(organizationTypeOptions, value),
  timeline: (value?: string | null) => labelFrom(timelineOptions, value),
  budgetRange: (value?: string | null) => labelFrom(budgetRangeOptions, value)
};

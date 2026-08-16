export type DepartmentMapMetricKey =
  | "investmentExecutionPercent"
  | "pimPerCapita"
  | "updatedTransparencyPercent"
  | "visiblePim"
  | "visibleCoveragePercent";

export type DepartmentMapMetric = {
  key: DepartmentMapMetricKey;
  label: string;
  shortLabel: string;
  description: string;
  source: string;
  scale: "linear" | "log";
};

export const departmentMapMetrics: DepartmentMapMetric[] = [
  {
    key: "investmentExecutionPercent",
    label: "Ejecución municipal de inversión",
    shortLabel: "Ejecución de inversión",
    description: "Devengado agregado sobre PIM de inversión municipal en 2025.",
    source: "MEF · 2025",
    scale: "linear"
  },
  {
    key: "pimPerCapita",
    label: "PIM municipal por habitante",
    shortLabel: "PIM por habitante",
    description: "PIM municipal agregado dividido por la población proyectada del departamento.",
    source: "MEF + INEI · 2025",
    scale: "log"
  },
  {
    key: "updatedTransparencyPercent",
    label: "Portal de transparencia actualizado",
    shortLabel: "Transparencia actualizada",
    description: "Porcentaje de municipalidades que declaró tener actualizado su portal.",
    source: "RENAMU · 2025",
    scale: "linear"
  },
  {
    key: "visiblePim",
    label: "PIM del extracto de proyectos",
    shortLabel: "PIM visible",
    description: "PIM de hasta cinco proyectos con mayor monto positivo por municipalidad.",
    source: "MEF · 2025",
    scale: "log"
  },
  {
    key: "visibleCoveragePercent",
    label: "Cobertura del extracto de proyectos",
    shortLabel: "Cobertura visible",
    description: "PIM visible del extracto como proporción del PIM municipal total de inversión.",
    source: "MEF · 2025",
    scale: "linear"
  }
];

export function formatDepartmentMapValue(key: DepartmentMapMetricKey, value: number) {
  if (key === "visiblePim") {
    return new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", notation: "compact", maximumFractionDigits: 1 }).format(value);
  }
  if (key === "pimPerCapita") {
    return new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", maximumFractionDigits: 0 }).format(value);
  }
  return `${new Intl.NumberFormat("es-PE", { maximumFractionDigits: 1 }).format(value)}%`;
}

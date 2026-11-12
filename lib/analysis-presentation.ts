import type { AnalysisSnapshot } from "./analysis-library.ts";

export const analysisPresentation: Record<string, {
  area: "dataperu" | "electoral";
  image: string;
  imageAlt: string;
  accent: string;
  // Only add a reviewed public URL, never a local project or a raw dataset.
  originalDashboardUrl?: string;
}> = {
  "residuos-municipales": { area: "dataperu", image: "/images/noam-urban-services.jpg", imageAlt: "Escena ilustrativa de servicios en una ciudad", accent: "#3d6857" },
  "planes-territoriales": { area: "dataperu", image: "/images/noam-regional-planning.jpg", imageAlt: "Escena ilustrativa de planificación territorial", accent: "#a85b3f" },
  "registro-discapacidad": { area: "dataperu", image: "/images/noam-public-sector.jpg", imageAlt: "Escena ilustrativa de trabajo en una entidad pública", accent: "#496b80" },
  "apoyo-deportista": { area: "dataperu", image: "/images/noam-athlete-support.webp", imageAlt: "Ilustración de atletas corriendo en una pista con montañas al fondo", accent: "#287477" },
  "conteo-presidencial-2026": { area: "electoral", image: "/images/noam-decision-room.jpg", imageAlt: "Escena ilustrativa de revisión de información", accent: "#5d6661" }
};

export function getAnalysisOverview(snapshot: AnalysisSnapshot) {
  const temporal = snapshot.slices.every((slice) => /^\d{4}$/.test(slice.period));
  const ordered = temporal ? [...snapshot.slices].sort((a, b) => Number(a.period) - Number(b.period)) : snapshot.slices;
  const selected = temporal ? ordered.at(-1)! : ordered[0];
  const history = temporal ? ordered.map((slice) => ({
    period: slice.period,
    label: slice.label,
    total: slice.groups.reduce((sum, group) => sum + group.value, 0),
    missing: slice.missing,
    partial: slice.period === "2025"
  })) : [];
  return {
    selected,
    temporal,
    partial: temporal && selected.period === "2025",
    total: selected.groups.reduce((sum, group) => sum + group.value, 0),
    groups: [...selected.groups].sort((a, b) => b.value - a.value),
    history
  };
}

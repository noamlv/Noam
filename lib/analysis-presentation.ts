import type { AnalysisSnapshot } from "./analysis-library.ts";

export type AnalysisPhotoCredit = { author: string; source: string; license: string; licenseUrl: string };

export const analysisPresentation: Record<string, {
  area: "dataperu" | "electoral";
  image: string;
  imageAlt: string;
  imagePosition?: string;
  photoCredit?: AnalysisPhotoCredit;
  accent: string;
  // Only add a reviewed public URL, never a local project or a raw dataset.
  originalDashboardUrl?: string;
}> = {
  "residuos-municipales": {
    area: "dataperu", image: "/images/dataperu-residuos-cusco.webp", imageAlt: "Bolsas y cajas de residuos junto a una calle empedrada de Cusco", imagePosition: "center 66%", accent: "#3d6857",
    photoCredit: { author: "Carlo Brescia", source: "https://commons.wikimedia.org/wiki/File:Residuos_s%C3%B3lidos_en_el_distrito_de_Cusco,_Per%C3%BA_01.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" }
  },
  "planes-territoriales": { area: "dataperu", image: "/images/dataperu-planes-relieve.webp", imageAlt: "Composición cartográfica de un valle andino imaginario con poblados, parcelas y curvas de nivel", accent: "#a85b3f" },
  "registro-discapacidad": { area: "dataperu", image: "/images/dataperu-registro-accesible.webp", imageAlt: "Escena editorial generada de una mujer en silla de ruedas que completa un formulario en un mostrador", accent: "#496b80" },
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

import { clsx, type ClassValue } from "clsx";
import type { ContentType } from "@/types/content";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(date));
}

const contentTypeLabels: Record<ContentType, string> = {
  insights: "Estudio",
  indicators: "Indicador",
  toolkits: "Guía",
  services: "Servicio",
  cases: "Caso"
};

export function contentTypeLabel(type: ContentType) {
  return contentTypeLabels[type];
}

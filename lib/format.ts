export function money(value: string | number | null | undefined, currency = "PEN") {
  const amount = typeof value === "string" ? Number(value) : value ?? 0;

  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(Number.isFinite(amount) ? amount : 0);
}

export function dateLabel(value: string | null | undefined) {
  if (!value) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

const statusLabels: Record<string, string> = {
  active: "Activo",
  approved: "Aprobado",
  archived: "Archivado",
  accepted: "Aceptado",
  cancelled: "Cancelado",
  completed: "Completado",
  delivered: "Entregado",
  draft: "Borrador",
  expired: "Expirado",
  failed: "Fallido",
  in_progress: "En progreso",
  issued: "Emitido",
  lead: "Prospecto",
  paid: "Pagado",
  paused: "Pausado",
  pending: "Pendiente",
  planned: "Planificado",
  published: "Publicado",
  refunded: "Reembolsado",
  rejected: "Rechazado",
  sent: "Enviado"
};

export function statusLabel(value: string | null | undefined) {
  if (!value) return "Sin estado";
  return statusLabels[value] ?? value;
}

"use client";

import { Printer } from "lucide-react";

export function PrintButton({ analyticsTarget }: { analyticsTarget?: string } = {}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      data-analytics-event="resource_download"
      data-analytics-target={analyticsTarget}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-accent px-5 text-sm font-medium text-accent-ink transition-all hover:-translate-y-px hover:bg-rust"
    >
      <Printer className="h-4 w-4" aria-hidden />
      Imprimir o guardar PDF
    </button>
  );
}

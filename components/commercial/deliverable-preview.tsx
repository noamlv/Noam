import { ArrowDownRight } from "lucide-react";
import type { DeliverableSample } from "@/lib/deliverable-samples";
import { cn } from "@/lib/utils";

interface DeliverablePreviewProps {
  sample: DeliverableSample;
  compact?: boolean;
  className?: string;
}

export function DeliverablePreview({ sample, compact = false, className }: DeliverablePreviewProps) {
  const modules = compact ? sample.modules.slice(0, 3) : sample.modules;
  const rows = compact ? sample.preview.rows.slice(0, 3) : sample.preview.rows;

  return (
    <div
      className={cn("relative overflow-hidden rounded-md border border-white/12 bg-[#15211d] text-white shadow-visual", compact ? "p-5" : "p-6 md:p-8", className)}
      role="img"
      aria-label={`Vista demostrativa del entregable ${sample.shortTitle}`}
    >
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="relative flex items-center justify-between border-b border-white/14 pb-4">
        <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/48">NOAM · Muestra {sample.number}</span>
        <span className="font-mono text-[9px]" style={{ color: sample.accent }}>Estructura</span>
      </div>

      <div className={cn("relative grid gap-3", compact ? "mt-6" : "mt-8 sm:grid-cols-2")}>
        {modules.map((module, index) => (
          <div key={module.title} className="min-h-[92px] rounded-sm border border-white/12 bg-white/[0.025] p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px]" style={{ color: sample.accent }}>0{index + 1}</span>
              <ArrowDownRight className="h-3.5 w-3.5 text-white/22" aria-hidden />
            </div>
            <p className="mt-5 text-xs font-medium leading-5 text-white/78">{module.title}</p>
            {!compact && <p className="mt-1 text-[10px] leading-4 text-white/55">{module.output}</p>}
          </div>
        ))}
      </div>

      <div className={cn("relative overflow-hidden rounded-sm border border-white/14", compact ? "mt-3" : "mt-5")}>
        <div className="flex items-center justify-between border-b border-white/12 px-4 py-3">
          <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-white/55">{sample.preview.title}</span>
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: sample.accent }} />
        </div>
        <div className="grid grid-cols-3 bg-white/[0.06] px-4 py-2 text-[8px] uppercase tracking-[0.1em] text-white/35">
          {sample.preview.columns.map((column) => <span key={column}>{column}</span>)}
        </div>
        {rows.map((row) => (
          <div key={row.join("")} className="grid grid-cols-3 border-t border-white/8 px-4 py-2.5 text-[9px] leading-4 text-white/52">
            {row.map((cell) => <span key={cell} className="pr-2">{cell}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

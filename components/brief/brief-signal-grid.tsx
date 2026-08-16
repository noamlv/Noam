import { ArrowDownRight } from "lucide-react";
import type { BriefSignal } from "@/lib/brief";

export function BriefSignalGrid({ signals, compact = false }: { signals: BriefSignal[]; compact?: boolean }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-md bg-white/14 md:grid-cols-3" role="img" aria-label="Tres señales de la edición">
      {signals.map((signal) => (
        <div key={signal.number} className={`flex flex-col bg-[#15211d] ${compact ? "min-h-[225px] p-6" : "min-h-[290px] p-7"}`}>
          <div className="flex items-center justify-between"><span className="font-mono text-[10px] text-[#d9a48f]">{signal.number}</span><ArrowDownRight className="h-4 w-4 text-white/28" aria-hidden /></div>
          <div className="mt-auto pt-14"><p className="text-4xl font-medium tracking-[-0.06em] text-white md:text-5xl">{signal.value}</p><p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">{signal.label}</p></div>
        </div>
      ))}
    </div>
  );
}

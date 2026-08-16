import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataVisualProps {
  className?: string;
  compact?: boolean;
}

const bars = [38, 54, 47, 68, 63, 79, 74, 88];

export function DataVisual({ className, compact = false }: DataVisualProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.25rem] border border-white/15 bg-[#16221e] text-white shadow-visual",
        className
      )}
      role="img"
      aria-label="Vista conceptual de un sistema territorial de decisión"
    >
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:52px_52px]" />
      <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-rust/35 blur-3xl" />

      <div className={cn("relative flex h-full flex-col", compact ? "p-5" : "p-6 md:p-8")}>
        <div className="flex items-start justify-between gap-6 border-b border-white/15 pb-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">Lectura territorial</p>
            <p className="mt-2 text-sm font-medium text-white/90">Panel de prioridades</p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-white/55">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b8cc9b]" />
            Actualizado
          </div>
        </div>

        <div className={cn("grid flex-1 gap-6", compact ? "mt-5" : "mt-7 md:grid-cols-[1fr_1.35fr]")}>
          <div className="flex flex-col justify-between">
            <div>
            <p className="text-xs text-white/55">Índice ilustrativo</p>
              <div className="mt-2 flex items-end gap-2">
                <span className={cn("font-medium tracking-[-0.06em]", compact ? "text-4xl" : "text-5xl md:text-6xl")}>72.4</span>
                <span className="mb-2 inline-flex items-center text-xs text-[#c8d8b1]">
                  +4.8 <ArrowUpRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </div>

            {!compact ? (
              <div className="mt-8 space-y-3">
                {["Inversión", "Servicios", "Gestión"].map((label, index) => (
                  <div key={label} className="grid grid-cols-[70px_1fr_auto] items-center gap-3 text-[11px]">
                    <span className="text-white/55">{label}</span>
                    <span className="h-px bg-white/15">
                      <span className="block h-px bg-white/65" style={{ width: `${[78, 61, 69][index]}%` }} />
                    </span>
                    <span className="text-white/75">{[78, 61, 69][index]}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className={cn("relative flex min-h-36 items-end gap-2 border-b border-l border-white/20 px-3 pt-5", !compact && "min-h-56")}>
            <span className="absolute left-4 top-3 text-[10px] uppercase tracking-[0.15em] text-white/55">Evolución</span>
            {bars.map((height, index) => (
              <span
                key={`${height}-${index}`}
                className="flex-1 rounded-t-[2px] bg-gradient-to-t from-white/15 to-white/70 transition-colors duration-220 hover:to-[#d9a48f]"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-4 text-[10px] uppercase tracking-[0.14em] text-white/55">
          <span>Vista de demostración</span>
          <span>Datos ilustrativos</span>
        </div>
      </div>
    </div>
  );
}

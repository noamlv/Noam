import { cn } from "@/lib/utils";

const stages = [
  { number: "01", label: "Territorio" },
  { number: "02", label: "Elección" },
  { number: "03", label: "Transición" },
  { number: "04", label: "Gestión" }
];

export function ErmVisual({ className }: { className?: string }) {
  return (
    <div className={cn("relative min-w-0 overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#1a2b25] p-6 text-white shadow-visual md:p-8", className)} role="img" aria-label="Ciclo ERM 2026: territorio, elección el 4 de octubre, transición y nueva gestión">
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[48px] border-[#b95337]/22" />

      <div className="relative flex min-h-[430px] flex-col">
        <div className="flex items-center justify-between gap-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/55">Elección → capacidad de gobierno</span>
          <span className="h-2 w-2 rounded-full bg-[#d9a48f] shadow-[0_0_0_6px_rgba(217,164,143,.12)]" />
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-[1fr_0.8fr] sm:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d9a48f]">Jornada electoral</p>
            <p className="mt-3 text-5xl font-medium leading-none tracking-[-0.065em] md:text-6xl">04 OCT</p>
            <p className="mt-2 font-mono text-xs text-white/55">2026 · Fuente oficial JNE</p>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/12">
            <div className="bg-[#1a2b25] p-4"><p className="text-2xl font-medium tracking-[-0.045em]">1,891</p><p className="mt-1 text-[10px] leading-4 text-white/55">perfiles municipales</p></div>
            <div className="bg-[#1a2b25] p-4"><p className="text-2xl font-medium tracking-[-0.045em]">25</p><p className="mt-1 text-[10px] leading-4 text-white/55">departamentos</p></div>
          </div>
        </div>

        <div className="relative mt-auto pt-14">
          <div className="absolute left-[7%] right-[7%] top-[4.1rem] h-px bg-white/20" />
          <div className="grid grid-cols-4 gap-2">
            {stages.map((stage, index) => (
              <div key={stage.number} className="relative pt-8">
                <span className={cn("absolute left-0 top-0 h-3 w-3 rounded-full border", index === 1 ? "border-[#d9a48f] bg-[#d9a48f] shadow-[0_0_0_6px_rgba(217,164,143,.12)]" : "border-white/35 bg-[#1a2b25]")} />
                <span className="font-mono text-[9px] text-[#d9a48f]">{stage.number}</span>
                <p className="mt-2 text-[10px] leading-4 text-white/58">{stage.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-white/12 pt-4 text-[9px] uppercase tracking-[0.14em] text-white/35">
          <span>Regional</span><span>Provincial</span><span>Distrital</span>
        </div>
      </div>
    </div>
  );
}

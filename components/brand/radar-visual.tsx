import { cn } from "@/lib/utils";

const points = [
  { left: "22%", top: "31%", size: "h-2 w-2" },
  { left: "67%", top: "19%", size: "h-1.5 w-1.5" },
  { left: "72%", top: "66%", size: "h-2.5 w-2.5" },
  { left: "31%", top: "71%", size: "h-1.5 w-1.5" },
  { left: "55%", top: "42%", size: "h-2 w-2" }
];

export function RadarVisual({ className }: { className?: string }) {
  return (
    <div className={cn("relative min-w-0 overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#192a24] p-6 text-white shadow-visual md:p-8", className)} role="img" aria-label="Visualización conceptual del Radar de gestión municipal con cobertura de 1,891 municipalidades">
      <div className="absolute inset-0 opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="relative flex min-h-[430px] flex-col">
        <div className="flex items-center justify-between gap-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/55">Radar · contexto nacional</span>
          <span className="font-mono text-[9px] text-[#d9a48f]">CORTE 2025</span>
        </div>

        <div className="mt-7 grid flex-1 gap-6 sm:grid-cols-[1fr_0.52fr] sm:items-center">
          <div className="relative mx-auto aspect-square w-full max-w-[300px]">
            {["inset-0", "inset-[13%]", "inset-[26%]", "inset-[39%]"].map((position) => <div key={position} className={`absolute ${position} rounded-full border border-white/15`} />)}
            <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
            <div className="absolute left-0 top-1/2 h-px w-full bg-white/10" />
            <div className="radar-sweep absolute left-1/2 top-1/2 h-px w-[48%] origin-left bg-gradient-to-r from-[#d9a48f] to-transparent" />
            {points.map((point, index) => <span key={index} className={`absolute ${point.size} rounded-full bg-[#d9a48f] shadow-[0_0_0_5px_rgba(217,164,143,.12)]`} style={{ left: point.left, top: point.top }} />)}
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35 bg-[#192a24]" />
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/12 sm:grid-cols-1">
            <div className="bg-[#192a24] p-4"><p className="text-3xl font-medium tracking-[-0.05em]">1,891</p><p className="mt-1 text-[10px] leading-4 text-white/55">municipalidades</p></div>
            <div className="bg-[#192a24] p-4"><p className="text-3xl font-medium tracking-[-0.05em]">25</p><p className="mt-1 text-[10px] leading-4 text-white/55">departamentos</p></div>
            <div className="col-span-2 bg-[#192a24] p-4 sm:col-span-1"><p className="text-3xl font-medium tracking-[-0.05em]">80.6%</p><p className="mt-1 text-[10px] leading-4 text-white/55">ejecución agregada</p></div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/12 pt-4 text-[8px] uppercase tracking-[0.13em] text-white/55"><span>Recursos</span><span>Inversión</span><span>Capacidades</span></div>
      </div>
    </div>
  );
}

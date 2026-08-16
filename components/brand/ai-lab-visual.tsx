import { cn } from "@/lib/utils";

const functions = [
  { number: "01", label: "Gobernar", value: 78 },
  { number: "02", label: "Mapear", value: 64 },
  { number: "03", label: "Medir", value: 52 },
  { number: "04", label: "Gestionar", value: 71 }
];

export function AiLabVisual({ className }: { className?: string }) {
  return (
    <div className={cn("relative min-w-0 overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#192a24] p-6 text-white shadow-visual md:p-8", className)} role="img" aria-label="Marco conceptual para gobernar, mapear, medir y gestionar un caso de uso de inteligencia artificial">
      <div className="absolute inset-0 opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[50px] border-[#b95337]/20" />
      <div className="relative flex min-h-[430px] flex-col">
        <div className="flex items-center justify-between gap-5"><span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/55">Caso de uso · antes del piloto</span><span className="practice-pulse h-2 w-2 rounded-full bg-[#d9a48f] shadow-[0_0_0_6px_rgba(217,164,143,.12)]" /></div>

        <div className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-sm bg-white/12">
          {[{ label: "Oportunidad", value: "80" }, { label: "Exposición", value: "45" }, { label: "Controles", value: "72" }].map((item) => <div key={item.label} className="bg-[#192a24] p-4"><p className="text-3xl font-medium tracking-[-0.05em]">{item.value}</p><p className="mt-1 text-[9px] text-white/40">{item.label}</p></div>)}
        </div>

        <div className="mt-auto pt-12">
          <div className="grid gap-5">
            {functions.map((item) => (
              <div key={item.number} className="grid grid-cols-[30px_80px_1fr] items-center gap-3">
                <span className="font-mono text-[9px] text-[#d9a48f]">{item.number}</span>
                <span className="text-[10px] text-white/58">{item.label}</span>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-[#d9a48f] to-[#b95337]" style={{ width: `${item.value}%` }} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-9 flex items-center justify-between border-t border-white/12 pt-4 text-[8px] uppercase tracking-[0.13em] text-white/32"><span>Propósito</span><span>Datos</span><span>Derechos</span><span>Operación</span></div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import type { ProductProof } from "@/lib/product-proofs";

type ProductProofVisualProps = {
  kind: ProductProof["slug"];
  className?: string;
};

export function ProductProofVisual({ kind, className }: ProductProofVisualProps) {
  if (kind === "dataperu") {
    const coverage = [42, 58, 72, 66, 48, 62, 82, 92, 75, 54, 70, 96, 100, 88, 64, 52, 78, 91, 84, 59, 44, 67, 80, 61, 49];

    return (
      <div className={cn("relative min-w-0 overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#1a2b25] p-6 text-white shadow-visual md:p-8", className)} role="img" aria-label="Cobertura de DataPerú: 1,891 municipalidades en 25 departamentos y 9,429 proyectos visibles">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[48px] border-[#b95337]/18" />
        <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:38px_38px]" />
        <div className="relative">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/55">Territorio → decisión</span>
            <span className="font-mono text-[10px] text-[#d9a48f]">PERÚ · 2025</span>
          </div>
          <div className="mt-10 grid grid-cols-[1fr_0.88fr] items-end gap-8">
            <div>
              <p className="text-5xl font-medium tracking-[-0.065em] md:text-6xl">1,891</p>
              <p className="mt-2 max-w-[13rem] text-xs leading-5 text-white/48">perfiles municipales trazables</p>
            </div>
            <div>
              <div className="grid grid-cols-5 gap-2" aria-hidden>
                {coverage.map((opacity, index) => (
                  <span key={`${opacity}-${index}`} className="aspect-square rounded-[3px] border border-white/12 bg-[#d9a48f]" style={{ opacity: opacity / 100 }} />
                ))}
              </div>
              <p className="mt-3 text-right text-[9px] uppercase tracking-[0.14em] text-white/55">25 departamentos</p>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/12">
            <div className="bg-[#1a2b25] p-4"><p className="text-2xl font-medium tracking-[-0.04em]">9,429</p><p className="mt-1 text-[10px] text-white/55">proyectos visibles</p></div>
            <div className="bg-[#1a2b25] p-4"><p className="text-2xl font-medium tracking-[-0.04em]">5</p><p className="mt-1 text-[10px] text-white/55">lecturas temáticas</p></div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "planometro") {
    return (
      <div className={cn("relative min-w-0 overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#1a2b25] p-6 text-white shadow-visual md:p-8", className)} role="img" aria-label="Flujo analítico de Planómetro">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[38px] border-[#b95337]/20" />
        <div className="relative">
          <div className="flex items-center justify-between"><span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/55">Corpus → evidencia</span><span className="font-mono text-[10px] text-[#d9a48f]">2026</span></div>
          <div className="mt-12 grid grid-cols-[0.72fr_1fr] items-end gap-5">
            <div>
              <p className="text-5xl font-medium tracking-[-0.065em] md:text-6xl">36</p>
              <p className="mt-2 text-xs text-white/48">planes completos</p>
            </div>
            <div className="flex h-52 items-end gap-4 border-b border-l border-white/15 px-5">
              <div className="flex h-[92%] flex-1 flex-col justify-end bg-[#d9a48f]/75 p-3 text-[#15211d]"><span className="text-xl font-medium">4,084</span><span className="mt-1 text-[9px] uppercase tracking-[0.1em]">amplio</span></div>
              <div className="flex h-[62%] flex-1 flex-col justify-end bg-white/80 p-3 text-[#15211d]"><span className="text-xl font-medium">2,742</span><span className="mt-1 text-[9px] uppercase tracking-[0.1em]">operativo</span></div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-2">
            {["Extraer", "Clasificar", "Comparar", "Auditar"].map((step, index) => <div key={step} className="border-t border-white/18 pt-3"><span className="font-mono text-[9px] text-[#d9a48f]">0{index + 1}</span><p className="mt-2 text-[10px] text-white/58">{step}</p></div>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative min-w-0 overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#1a2b25] p-6 text-white shadow-visual md:p-8", className)} role="img" aria-label="Arquitectura analítica del Barómetro Electoral">
      <div className="absolute -bottom-20 -right-12 h-64 w-64 rounded-full border-[48px] border-[#b95337]/18" />
      <div className="relative">
        <div className="flex items-center justify-between"><span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/55">Encuesta → lectura</span><span className="font-mono text-[10px] text-[#d9a48f]">ENE 2026</span></div>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-white/12">
          {[{ value: "1,300", label: "entrevistas" }, { value: "184", label: "variables" }].map((metric) => <div key={metric.label} className="bg-[#1a2b25] p-5"><p className="text-3xl font-medium tracking-[-0.05em]">{metric.value}</p><p className="mt-2 text-[10px] text-white/55">{metric.label}</p></div>)}
        </div>
        <div className="relative mt-8 h-44">
          <svg viewBox="0 0 500 180" className="h-full w-full" role="img" aria-label="Capas conectadas de análisis descriptivo, modelos, segmentos y territorio">
            <g fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1">
              <path d="M55 105 C150 18 240 155 340 62 S450 94 475 35" />
              <path d="M38 145 C155 110 210 35 310 108 S425 130 468 88" />
            </g>
            {[[55,105],[155,55],[255,118],[350,58],[470,35],[40,145],[190,91],[310,108],[468,88]].map(([x,y], index) => <circle key={`${x}-${y}`} cx={x} cy={y} r={index % 3 === 0 ? 7 : 4} fill={index % 2 === 0 ? "#d9a48f" : "rgba(255,255,255,.72)"} />)}
          </svg>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {["Describir", "Explicar", "Segmentar", "Territorio"].map((step, index) => <div key={step} className="border-t border-white/18 pt-3"><span className="font-mono text-[9px] text-[#d9a48f]">0{index + 1}</span><p className="mt-2 text-[10px] text-white/58">{step}</p></div>)}
        </div>
      </div>
    </div>
  );
}

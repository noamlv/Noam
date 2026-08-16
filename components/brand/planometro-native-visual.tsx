import { cn } from "@/lib/utils";

export function PlanometroNativeVisual({ className }: { className?: string }) {
  const documents = Array.from({ length: 36 }, (_, index) => index);
  return (
    <div className={cn("relative min-h-[470px] overflow-hidden rounded-[1.25rem] border border-white/14 bg-[#1a2b25] p-6 text-white md:p-8", className)} role="img" aria-label="Visualización conceptual del pipeline de Planómetro: documentos, extracción y auditoría">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="relative flex items-center justify-between border-b border-white/14 pb-5"><div><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#d9a48f]">Corpus programático</p><p className="mt-2 text-sm text-white/76">Extracción · clasificación · auditoría</p></div><span className="font-mono text-[9px] text-white/55">PE · 2026</span></div>
      <div className="relative mt-7 grid grid-cols-[0.78fr_1fr] gap-7">
        <div><p className="text-[8px] uppercase tracking-[0.14em] text-white/55">36 documentos</p><div className="mt-4 grid grid-cols-6 gap-1.5">{documents.map((document) => <span key={document} className={`planometro-doc aspect-[0.76] rounded-[1px] border ${document % 7 === 0 ? "border-[#d9a48f]/70 bg-[#d9a48f]/18" : "border-white/16 bg-white/[0.035]"}`} style={{ animationDelay: `${document * 22}ms` }}><span className="mx-auto mt-[38%] block h-px w-1/2 bg-white/20" /><span className="mx-auto mt-1 block h-px w-1/3 bg-white/12" /></span>)}</div></div>
        <div className="space-y-5"><div><div className="flex items-center justify-between text-[8px] text-white/55"><span>Enunciados detectados</span><span>4.084</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><span className="draw-line block h-full w-full rounded-full bg-[#d9a48f]/55" /></div></div><div><div className="flex items-center justify-between text-[8px] text-white/55"><span>Criterio operativo</span><span>2.742</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><span className="draw-line block h-full w-[67.1%] rounded-full bg-[#d9a48f]" /></div></div><div><div className="flex items-center justify-between text-[8px] text-white/55"><span>Muestra anotada</span><span>404</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><span className="draw-line block h-full w-[14.7%] rounded-full bg-white/55" /></div></div></div>
      </div>
      <div className="relative mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-sm bg-white/12">{[["70,5%", "precisión estricta"], ["96,9%", "recall estricto"], ["11", "ejes temáticos"]].map(([value, label]) => <div key={label} className="bg-[#1a2b25] p-4"><p className="text-2xl font-medium tracking-[-0.045em]">{value}</p><p className="mt-2 text-[8px] leading-4 text-white/55">{label}</p></div>)}</div>
      <div className="relative mt-6 flex items-center justify-between border-t border-white/14 pt-4 text-[8px] text-white/35"><span>Texto → señal → verificación</span><span>No es un ranking</span></div>
    </div>
  );
}

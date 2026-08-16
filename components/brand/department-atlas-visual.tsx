export function DepartmentAtlasVisual() {
  const values = [35, 58, 46, 76, 67, 42, 71, 54, 83, 61, 49, 74, 57, 68, 39, 79, 52, 64, 73, 45, 69, 81, 56, 63, 77];
  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-[1.25rem] border border-white/14 bg-[#1a2b25] p-6 shadow-visual md:p-8" role="img" aria-label="Representación visual de 25 departamentos comparados mediante una métrica seleccionable">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="relative flex items-center justify-between border-b border-white/14 pb-5">
        <div><p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#d9a48f]">Atlas departamental</p><p className="mt-2 text-sm font-medium text-white/84">25 lecturas territoriales</p></div>
        <span className="font-mono text-[9px] text-white/55">PE · 2025</span>
      </div>
      <div className="relative mt-8 grid grid-cols-5 gap-2">
        {values.map((value, index) => <span key={index} className="relative aspect-square overflow-hidden rounded-sm border border-white/10 bg-white/[0.035]"><span className="absolute inset-x-0 bottom-0 bg-[#d9a48f] transition-all" style={{ height: `${value}%`, opacity: 0.18 + (value / 145) }} /><span className="absolute left-2 top-2 font-mono text-[8px] text-white/36">{String(index + 1).padStart(2, "0")}</span></span>)}
      </div>
      <div className="relative mt-7 flex items-center justify-between text-[9px] uppercase tracking-[0.12em] text-white/36"><span>Menor valor observado</span><span className="h-px flex-1 bg-gradient-to-r from-white/10 via-[#d9a48f]/70 to-[#d9a48f] mx-4" /><span>Mayor valor observado</span></div>
    </div>
  );
}

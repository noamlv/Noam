export function InvestmentObservatoryVisual() {
  const bars = [84, 62, 76, 48, 91, 57, 70, 39, 66, 81, 52, 73];
  return (
    <div className="relative min-h-[440px] overflow-hidden rounded-[1.25rem] border border-white/14 bg-[#1a2b25] p-6 shadow-visual md:p-8" role="img" aria-label="Visualización conceptual de una cartera de inversión con ejecución financiera y funciones">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="relative flex items-center justify-between border-b border-white/14 pb-5"><div><p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#d9a48f]">Cartera visible</p><p className="mt-2 text-sm font-medium text-white/84">Seguimiento financiero</p></div><span className="font-mono text-[9px] text-white/55">MEF · 2025</span></div>
      <div className="relative mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-sm bg-white/12"><div className="bg-[#1a2b25] p-4"><p className="text-3xl font-medium tracking-[-0.05em]">9,429</p><p className="mt-1 text-[9px] text-white/55">proyectos visibles</p></div><div className="bg-[#1a2b25] p-4"><p className="text-3xl font-medium tracking-[-0.05em]">59.9%</p><p className="mt-1 text-[9px] text-white/55">cobertura del PIM</p></div><div className="bg-[#1a2b25] p-4"><p className="text-3xl font-medium tracking-[-0.05em]">72.9%</p><p className="mt-1 text-[9px] text-white/55">ejecución visible</p></div></div>
      <div className="relative mt-8 space-y-3">{bars.map((value, index) => <div key={index} className="grid grid-cols-[24px_1fr_34px] items-center gap-3"><span className="font-mono text-[8px] text-white/55">{String(index + 1).padStart(2, "0")}</span><span className="h-2 overflow-hidden rounded-full bg-white/8"><span className="block h-full rounded-full bg-[#d9a48f]" style={{ width: `${value}%`, opacity: 0.34 + value / 180 }} /></span><span className="text-right font-mono text-[8px] text-white/55">{value}%</span></div>)}</div>
      <div className="relative mt-8 flex items-center justify-between border-t border-white/14 pt-5 text-[8px] uppercase tracking-[0.13em] text-white/55"><span>Proyecto</span><span>Función</span><span>Territorio</span><span>Ejecución</span></div>
    </div>
  );
}

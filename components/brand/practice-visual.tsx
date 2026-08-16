import { cn } from "@/lib/utils";

export function PracticeVisual({ labels, accent, className }: { labels: string[]; accent: string; className?: string }) {
  const nodes = [[70, 118], [188, 52], [324, 103], [443, 42]];

  return (
    <div className={cn("relative min-h-[390px] overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#192923] p-6 text-white shadow-visual md:p-8", className)} role="img" aria-label="Arquitectura de decisiones y señales para esta práctica">
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="practice-orbit absolute -right-24 -top-24 h-72 w-72 rounded-full border-[48px] opacity-20" style={{ borderColor: accent }} />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between"><span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/55">Señales → decisión</span><span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} /></div>
        <svg viewBox="0 0 520 180" className="mt-10 w-full" aria-hidden>
          <path d="M35 145 C105 78 145 116 188 52 S270 48 324 103 S408 71 480 25" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1.4" strokeDasharray="5 7" className="practice-path" />
          <path d="M34 155 C142 138 207 94 278 126 S394 137 482 75" fill="none" stroke="rgba(255,255,255,.11)" strokeWidth="1" />
          {nodes.map(([cx, cy], index) => <g key={`${cx}-${cy}`}><circle cx={cx} cy={cy} r={index === 3 ? 9 : 6} fill={index === 3 ? accent : "rgba(255,255,255,.8)"} /><circle cx={cx} cy={cy} r={index === 3 ? 18 : 13} fill="none" stroke={index === 3 ? accent : "rgba(255,255,255,.2)"} className={index === 3 ? "practice-pulse" : undefined} /></g>)}
        </svg>
        <div className="mt-auto grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/12 sm:grid-cols-4">
          {labels.slice(0, 4).map((label, index) => <div key={label} className="min-h-[96px] bg-[#192923] p-3"><span className="font-mono text-[9px]" style={{ color: accent }}>0{index + 1}</span><p className="mt-3 text-[10px] leading-4 text-white/58">{label}</p></div>)}
        </div>
      </div>
    </div>
  );
}

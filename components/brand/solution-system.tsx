import { cn } from "@/lib/utils";

export function SolutionSystem({
  labels,
  accent,
  className
}: {
  labels: string[];
  accent: string;
  className?: string;
}) {
  return (
    <div className={cn("relative min-h-[390px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#192822]", className)} aria-hidden>
      <div className="absolute inset-0 opacity-[0.13]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
      <div className="absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12" />
      <div className="absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12" />
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" style={{ backgroundColor: accent }}>
        <span className="absolute inset-3 rounded-full border border-white/35" />
      </div>
      {labels.slice(0, 4).map((label, index) => {
        const positions = ["left-[7%] top-[16%]", "right-[6%] top-[28%]", "bottom-[14%] right-[11%]", "bottom-[12%] left-[8%]"];
        return (
          <div key={label} className={`absolute ${positions[index]} max-w-[145px] rounded-sm border border-white/12 bg-[#21342d]/90 px-3 py-2 backdrop-blur`}>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-white/55">0{index + 1}</span>
            <span className="mt-1 block text-[11px] leading-4 text-white/72">{label}</span>
          </div>
        );
      })}
      <span className="absolute left-1/2 top-[8%] h-16 w-px -translate-x-1/2" style={{ background: `linear-gradient(to bottom, transparent, ${accent})` }} />
      <span className="absolute bottom-[8%] left-1/2 h-16 w-px -translate-x-1/2" style={{ background: `linear-gradient(to top, transparent, ${accent})` }} />
    </div>
  );
}

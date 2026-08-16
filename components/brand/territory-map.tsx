import { cn } from "@/lib/utils";

interface TerritoryMapProps {
  className?: string;
}

export function TerritoryMap({ className }: TerritoryMapProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-[1.25rem] border border-border bg-[#e9e7de]", className)}>
      <svg viewBox="0 0 720 500" role="img" aria-label="Visualización conceptual de información territorial" className="h-full w-full">
        <defs>
          <pattern id="map-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#16302a" strokeOpacity=".08" strokeWidth="1" />
          </pattern>
          <linearGradient id="map-fill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#b95337" stopOpacity=".92" />
            <stop offset="1" stopColor="#6f7663" stopOpacity=".86" />
          </linearGradient>
        </defs>
        <rect width="720" height="500" fill="url(#map-grid)" />
        <path d="M76 363C151 298 190 203 278 174c80-27 122 31 202-4 63-28 107-77 173-84" fill="none" stroke="#1c2a26" strokeOpacity=".18" strokeWidth="54" />
        <path d="M76 363C151 298 190 203 278 174c80-27 122 31 202-4 63-28 107-77 173-84" fill="none" stroke="#f3f0e8" strokeWidth="4" />
        <path d="M128 428 191 312l96 35 41-84 98 27 44-77 104 18 72-109" fill="none" stroke="#1b2a25" strokeOpacity=".48" strokeWidth="1.4" />
        <path d="M102 118 225 82l86 68-65 91-111-19Z" fill="#d4d1c4" stroke="#f7f5ef" strokeWidth="3" />
        <path d="m311 150 112-52 88 83-41 84-142-2Z" fill="url(#map-fill)" stroke="#f7f5ef" strokeWidth="3" />
        <path d="m246 241 82 22-41 84-96-35Z" fill="#79816d" fillOpacity=".72" stroke="#f7f5ef" strokeWidth="3" />
        <path d="m470 265 104-34 72 90-92 75-119-56Z" fill="#c4a68e" stroke="#f7f5ef" strokeWidth="3" />
        <path d="m287 347 41-84 107 77-42 96-128 5Z" fill="#e1ddd1" stroke="#f7f5ef" strokeWidth="3" />
        {[
          [372, 177],
          [505, 194],
          [260, 286],
          [516, 305],
          [368, 366]
        ].map(([cx, cy], index) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r={index === 0 ? 10 : 7} fill="#15211d" />
            <circle cx={cx} cy={cy} r={index === 0 ? 18 : 13} fill="none" stroke="#15211d" strokeOpacity=".25" />
          </g>
        ))}
      </svg>
      <div className="absolute left-5 top-5 rounded-full border border-ink/10 bg-canvas/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink backdrop-blur">
        Sistema territorial
      </div>
      <div className="absolute bottom-5 right-5 grid grid-cols-3 gap-1 rounded-sm border border-ink/10 bg-canvas/85 p-2 backdrop-blur">
        <span className="h-2 w-6 bg-[#d4d1c4]" />
        <span className="h-2 w-6 bg-[#79816d]" />
        <span className="h-2 w-6 bg-rust" />
      </div>
    </div>
  );
}

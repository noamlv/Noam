import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ContentItem } from "@/types/content";

const topicStyles = {
  gobierno: { background: "#1b2d27", accent: "#d38a72", label: "Gobierno" },
  inversion: { background: "#574725", accent: "#e1bd68", label: "Inversión" },
  ia: { background: "#35474e", accent: "#afc6cd", label: "IA" }
} as const;

const typeCodes = { insights: "EST", indicators: "IND", toolkits: "GUI", services: "SER", cases: "CAS" } as const;

export function ResourceThumb({ item, compact = false, className }: { item: ContentItem; compact?: boolean; className?: string }) {
  if (item.logo) {
    return (
      <div className={cn("relative overflow-hidden bg-white", className)}>
        <div className={cn("absolute", compact ? "inset-3" : "inset-6")}>
          <Image src={item.logo} alt={item.logoAlt ?? ""} fill className="object-contain" sizes={compact ? "160px" : "360px"} />
        </div>
      </div>
    );
  }

  const style = topicStyles[item.topic];
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ backgroundColor: style.background }} aria-hidden>
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.22)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute -right-[18%] -top-[40%] h-[145%] w-[80%] rounded-full border-[18px] opacity-25" style={{ borderColor: style.accent }} />
      <div className={cn("relative flex h-full flex-col justify-between", compact ? "p-3" : "p-5")}>
        <div className="flex items-center justify-between gap-3"><span className="font-mono text-[9px] tracking-[0.14em] text-white/55">{typeCodes[item.type]}</span><span className="text-[9px] uppercase tracking-[0.13em] text-white/55">{style.label}</span></div>
        <div className="flex items-end gap-2">
          <span
            className={cn("block rounded-full border border-white/55", compact ? "h-5 w-5" : "h-8 w-8")}
            style={{ boxShadow: `inset 0 0 0 ${compact ? 5 : 8}px ${style.background}` }}
          />
          <span className={cn("mb-1 block h-px", compact ? "w-5" : "w-10")} style={{ backgroundColor: style.accent }} />
        </div>
      </div>
    </div>
  );
}

"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ShareActionsProps {
  title: string;
  path: string;
  theme?: "light" | "dark";
  className?: string;
}

export function ShareActions({ title, path, theme = "light", className }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const copyUrl = async () => {
    const url = new URL(path, window.location.origin).toString();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("textarea");
      input.value = url;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const share = async () => {
    const url = new URL(path, window.location.origin).toString();
    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => undefined);
      return;
    }
    await copyUrl();
  };

  const buttonClass = cn(
    "group inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-xs font-medium transition-colors",
    theme === "dark" ? "border-white/20 text-white/68 hover:border-white/40 hover:text-white" : "border-border text-ink/68 hover:border-border-strong hover:text-ink"
  );

  return (
    <div className={cn("flex flex-wrap gap-2", className)} aria-label="Compartir esta página">
      <button type="button" onClick={share} className={buttonClass} data-analytics-event="cta_click" data-analytics-target="share:native">
        <Share2 className="h-3.5 w-3.5" aria-hidden /> Compartir
      </button>
      <button type="button" onClick={copyUrl} className={buttonClass} aria-label={copied ? "Enlace copiado" : "Copiar enlace"} aria-live="polite" data-copied={copied} data-analytics-event="cta_click" data-analytics-target="share:copy">
        <Copy className="h-3.5 w-3.5 group-data-[copied=true]:hidden" aria-hidden />
        <Check className="hidden h-3.5 w-3.5 group-data-[copied=true]:block" aria-hidden />
        <span className="group-data-[copied=true]:hidden">Copiar enlace</span><span className="hidden group-data-[copied=true]:inline">Copiado</span>
      </button>
    </div>
  );
}

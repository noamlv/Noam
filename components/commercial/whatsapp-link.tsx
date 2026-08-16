"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface WhatsAppLinkProps {
  children?: ReactNode;
  className?: string;
  context?: string;
  analyticsTarget?: string;
  showIcon?: boolean;
}

export function WhatsAppLink({ children, className, context, analyticsTarget = "whatsapp", showIcon = true }: WhatsAppLinkProps) {
  const pathname = usePathname();

  return (
    <a
      href={buildWhatsAppUrl(pathname, context)}
      target="_blank"
      rel="noreferrer"
      className={className}
      data-analytics-event="cta_click"
      data-analytics-target={analyticsTarget}
    >
      {showIcon ? <MessageCircle className="h-4 w-4 shrink-0" aria-hidden /> : null}
      {children}
    </a>
  );
}

export function WhatsAppLauncher() {
  return (
    <WhatsAppLink
      context="una necesidad de mi institución u organización"
      analyticsTarget="whatsapp:launcher"
      className={cn(
        "fixed bottom-5 right-5 z-40 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-[#15211d] px-4 text-sm font-medium text-white shadow-visual transition-all duration-200",
        "hover:-translate-y-0.5 hover:bg-[#20372f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust print:hidden"
      )}
    >
      <span className="hidden sm:inline">Escribir por WhatsApp</span>
      <span className="sr-only sm:hidden">Escribir por WhatsApp</span>
    </WhatsAppLink>
  );
}

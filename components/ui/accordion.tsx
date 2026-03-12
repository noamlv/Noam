"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className={cn("overflow-hidden rounded-md border border-border bg-panel", className)}>
      {items.map((item, index) => {
        const open = activeIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-trigger-${index}`;

        return (
          <div key={item.title} className="border-b border-border last:border-b-0">
            <button
              id={buttonId}
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium tracking-[-0.01em] text-ink"
              onClick={() => setActiveIndex(open ? null : index)}
              aria-expanded={open}
              aria-controls={panelId}
            >
              {item.title}
              <span className={cn("text-muted transition-transform duration-220", open && "rotate-45")} aria-hidden>
                +
              </span>
            </button>
            <div className={cn("grid transition-all duration-220", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
              <div className="overflow-hidden">
                <div id={panelId} role="region" aria-labelledby={buttonId} className="px-5 pb-4 text-sm leading-relaxed text-ink/78">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

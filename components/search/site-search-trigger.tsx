"use client";

import { useId, useRef, useState, type MouseEvent } from "react";
import dynamic from "next/dynamic";
import { Search } from "lucide-react";

const SiteSearchDialog = dynamic(() => import("./site-search-dialog").then((module) => module.SiteSearchDialog));

export function SiteSearchTrigger() {
  const id = useId();
  const trigger = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);

  function show(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setOpen(true);
  }

  return (
    <>
      <a ref={trigger} href="/buscar" onClick={show} aria-haspopup="dialog" aria-controls={open ? id : undefined}
        aria-label="Buscar en NOAM"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-panel hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust lg:h-10 lg:w-10">
        <Search className="h-[18px] w-[18px]" aria-hidden />
      </a>
      {open ? <SiteSearchDialog id={id} onClose={() => {
        setOpen(false);
        trigger.current?.focus({ preventScroll: true });
      }} /> : null}
    </>
  );
}

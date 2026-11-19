"use client";

import { ArrowUpRight, Search, X } from "lucide-react";
import NextLink from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { isPublicSearchPath, normalizeSearchText, searchEntries, type SearchEntry } from "@/lib/search-core";

let indexRequest: Promise<SearchEntry[]> | undefined;

function loadIndex() {
  indexRequest ??= fetch("/buscar/indice.json").then(async (response) => {
    if (!response.ok) throw new Error("Search index unavailable");
    const entries = (await response.json()) as SearchEntry[];
    if (!Array.isArray(entries)) throw new Error("Invalid search index");
    return entries.filter((entry) => isPublicSearchPath(entry.href));
  }).catch((error: unknown) => {
    indexRequest = undefined;
    throw error;
  });
  return indexRequest;
}

const PAGE_SIZE = 8;
const MAX_RESULTS = 60;

export function SiteSearchDialog({ id, onClose }: { id: string; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const deferredQuery = useDeferredValue(query);
  const hasQuery = Boolean(normalizeSearchText(query));
  const results = useMemo(
    () => index && normalizeSearchText(deferredQuery) ? searchEntries(index, { query: deferredQuery, limit: MAX_RESULTS }) : [],
    [index, deferredQuery]
  );

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previousOverflow = document.body.style.overflow;
    if (!element.open) element.showModal();
    input.current?.focus();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  useEffect(() => {
    if (!hasQuery || index || failed) return;
    let active = true;
    void loadIndex().then(
      (entries) => { if (active) setIndex(entries); },
      () => { if (active) setFailed(true); }
    );
    return () => { active = false; };
  }, [hasQuery, index, failed, attempt]);

  const loading = hasQuery && !index && !failed;
  const updating = hasQuery && Boolean(index) && deferredQuery !== query;
  const readableResults = hasQuery && !updating && Boolean(index);
  const close = () => dialog.current?.close();

  return (
    <dialog id={id} ref={dialog} onClose={onClose} aria-labelledby={`${id}-title`}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && !event.nativeEvent.isComposing) {
          event.preventDefault();
          close();
        }
      }}
      className="fixed inset-x-0 bottom-auto top-[max(0.75rem,env(safe-area-inset-top))] m-0 mx-auto w-[calc(100%-1.5rem)] max-w-[40rem] overflow-hidden rounded-[1.25rem] border border-border bg-white p-0 text-ink shadow-visual backdrop:bg-ink/45 sm:top-[min(15vh,8rem)]">
      <div className="flex max-h-[min(43rem,calc(100dvh-2rem))] flex-col sm:max-h-[min(43rem,78dvh)]">
        <div className="shrink-0 px-5 pb-4 pt-4 sm:px-7 sm:pt-5">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 id={`${id}-title`} className="text-base font-semibold tracking-tight text-ink">Buscar en NOAM</h2>
            <button type="button" aria-label="Cerrar búsqueda" onClick={close}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-panel hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-rust">
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <label className="flex min-h-14 items-center gap-3 rounded-2xl border border-border bg-panel px-4 transition-colors focus-within:border-ink/45">
            <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden />
            <span className="sr-only">Escribe una palabra o frase</span>
            <input ref={input} type="search" enterKeyHint="search" autoComplete="off" maxLength={120}
              value={query} onChange={(event) => { setQuery(event.target.value); setVisible(PAGE_SIZE); }}
              placeholder="Escribe una palabra o frase"
              className="min-w-0 w-full bg-transparent py-3 text-base text-ink outline-none placeholder:text-muted" />
          </label>
        </div>
        <div className="min-h-0 overflow-y-auto overscroll-contain px-5 pb-5 sm:px-7 sm:pb-7" aria-busy={loading || updating}>
          <p role="status" className={readableResults && results.length ? "sr-only" : "py-2 text-sm text-muted"}>
            {loading ? "Buscando…" : updating ? "" :
              hasQuery && failed ? "No pudimos cargar la búsqueda." :
              readableResults ? (results.length ? `${results.length === MAX_RESULTS ? "Al menos " : ""}${results.length} coincidencias` : "No encontramos coincidencias. Prueba con otra palabra.") :
              "Por ejemplo: agua y saneamiento, Cajamarca o presupuesto municipal."}
          </p>
          {hasQuery && failed ? <div className="mt-2 flex flex-wrap gap-4 text-sm">
            <button type="button" onClick={() => { setFailed(false); setAttempt((value) => value + 1); }} className="font-medium text-rust underline underline-offset-4">Volver a intentar</button>
            <NextLink href={`/buscar?q=${encodeURIComponent(query.trim())}`} prefetch={false} onClick={close} className="text-ink underline underline-offset-4">Abrir el índice</NextLink>
          </div> : null}
          {readableResults && results.length > 0 ? (
            <>
              <ul className="divide-y divide-border border-t border-border">
                {results.slice(0, visible).map((entry) => (
                  <li key={entry.id}>
                    <NextLink href={entry.href} prefetch={false} onClick={(event) => { if (!(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) close(); }}
                      className="group grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 rounded-md px-2 py-3.5 transition-colors hover:bg-panel focus-visible:bg-panel focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-rust">
                      <span className="min-w-0">
                        <span className="block text-[11px] font-medium text-rust">{entry.label}</span>
                        <span className="mt-1 block break-words text-sm font-semibold leading-5 text-ink sm:text-base">{entry.title}</span>
                        <span className="mt-1 block line-clamp-2 text-xs leading-5 text-muted">{entry.description}</span>
                      </span>
                      <ArrowUpRight className="mt-1 h-4 w-4 text-muted group-hover:text-rust" aria-hidden />
                    </NextLink>
                  </li>
                ))}
              </ul>
              {visible < results.length ? <button type="button" onClick={() => setVisible((count) => count + PAGE_SIZE)}
                className="mt-3 min-h-10 rounded-full border border-border px-4 text-sm font-medium text-ink transition-colors hover:bg-panel focus-visible:outline focus-visible:outline-2 focus-visible:outline-rust">Ver más coincidencias</button> : null}
            </>
          ) : null}
        </div>
      </div>
    </dialog>
  );
}

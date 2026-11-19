"use client";

import { ArrowUp, ArrowUpRight, X } from "lucide-react";
import NextLink from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
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
const SUGGESTIONS = [
  "Buscar datos de Cajamarca",
  "Buscar agua y saneamiento",
  "Buscar presupuesto municipal",
  "Buscar análisis de encuestas",
  "Buscar planes de gobierno"
];
const dateFormat = new Intl.DateTimeFormat("es-PE", { dateStyle: "medium", timeZone: "UTC" });

export function SiteSearchDialog({ id, onClose }: { id: string; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState(0);
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const canSubmit = Boolean(normalizeSearchText(draft));
  const hasQuery = Boolean(query);
  const fieldEmpty = draft === "";
  const results = useMemo(
    () => index && query ? searchEntries(index, { query, limit: MAX_RESULTS }) : [],
    [index, query]
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
    if (!fieldEmpty) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    const timer = window.setInterval(() => {
      if (!motion.matches) setSuggestion((current) => (current + 1) % SUGGESTIONS.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [fieldEmpty]);

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
  const readableResults = hasQuery && Boolean(index);
  const close = () => dialog.current?.close();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setQuery(draft.trim());
    setDraft("");
    setVisible(PAGE_SIZE);
    setFailed(false);
  }

  return (
    <dialog id={id} ref={dialog} onClose={onClose} aria-labelledby={`${id}-title`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && !event.nativeEvent.isComposing) {
          event.preventDefault();
          close();
        }
      }}
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none overflow-y-auto overscroll-contain border-0 bg-white p-0 text-ink backdrop:bg-white">
      <header className="sticky top-0 z-10 mx-auto flex min-h-16 max-w-[var(--max-width-lg)] items-center justify-between gap-4 bg-white px-5 pt-[env(safe-area-inset-top)] sm:px-10">
        <span className="text-lg font-semibold tracking-[0.16em]">NOAM</span>
        <div className="flex items-center gap-2 sm:gap-4">
          <button type="button" aria-label="Cerrar búsqueda" onClick={close}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-panel hover:text-ink focus-visible:outline-rust">
            <X className="h-5 w-5" aria-hidden />
          </button>
          <NextLink href="/contact" prefetch={false} onClick={close}
            className="hidden min-h-10 items-center rounded-full bg-accent px-5 text-sm font-medium text-white hover:bg-ink sm:inline-flex">
            Conversemos
          </NextLink>
        </div>
      </header>

      <div className="mx-auto max-w-[48rem] px-6 pb-14 pt-[clamp(3rem,8vh,6rem)] sm:px-8 sm:pt-[clamp(4rem,10vh,7rem)]">
        <h2 id={`${id}-title`} className="sr-only">Buscar en NOAM</h2>
        <form role="search" onSubmit={submit} className="flex min-h-14 items-center gap-3 border-b border-border transition-colors focus-within:border-ink/55 sm:min-h-16">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Escribe una palabra o frase</span>
            <input ref={input} type="search" enterKeyHint="search" autoComplete="off" maxLength={120}
              value={draft} onChange={(event) => setDraft(event.target.value)}
              className="block w-full appearance-none bg-transparent py-3 text-[clamp(1.12rem,4.8vw,1.75rem)] leading-tight tracking-tight text-ink !outline-none [&::-webkit-search-cancel-button]:hidden" />
            {fieldEmpty ? <span aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-1/2 grid -translate-y-1/2 text-[clamp(1.12rem,4.8vw,1.75rem)] leading-tight tracking-tight text-muted">
              {SUGGESTIONS.map((phrase, index) => (
                <span key={phrase} className={`min-w-0 truncate [grid-area:1/1] transition-opacity duration-[240ms] ease-in-out motion-reduce:transition-none ${index === suggestion ? "opacity-100" : "opacity-0"}`}>
                  {phrase}
                </span>
              ))}
            </span> : null}
          </label>
          <button type="submit" disabled={!canSubmit} aria-label="Buscar"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white focus-visible:outline-rust">
            <span className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${canSubmit ? "bg-accent hover:bg-ink" : "bg-[#9a9d99]"}`}>
              <ArrowUp className="h-4 w-4" aria-hidden />
            </span>
          </button>
        </form>

        {hasQuery ? <section aria-labelledby={`${id}-query`} className="mt-9 sm:mt-10">
          <p className="text-sm text-muted">Tu búsqueda</p>
          <h3 id={`${id}-query`} className="mt-3 break-words text-2xl font-medium leading-tight tracking-tight sm:text-[1.75rem]">{query}</h3>
          <div className="mt-7 border-t border-border pt-5 sm:mt-9 sm:pt-6" aria-busy={loading}>
            <p role="status" className="text-sm text-muted">
              {loading ? "Buscando…" : failed ? "No pudimos cargar la búsqueda." :
                results.length ? `Coincidencias (${results.length === MAX_RESULTS ? `${MAX_RESULTS}+` : results.length})` :
                "No encontramos coincidencias. Prueba con otra palabra."}
            </p>
            {hasQuery && failed ? <div className="mt-2 flex flex-wrap gap-4 text-sm">
              <button type="button" onClick={() => { setFailed(false); setAttempt((value) => value + 1); }} className="font-medium text-rust underline underline-offset-4">Volver a intentar</button>
              <NextLink href={`/buscar?q=${encodeURIComponent(query.trim())}`} prefetch={false} onClick={close} className="text-ink underline underline-offset-4">Abrir el índice</NextLink>
            </div> : null}
            {readableResults && results.length > 0 ? (
              <>
                <ul className="mt-2 divide-y divide-border">
                  {results.slice(0, visible).map((entry) => (
                    <li key={entry.id}>
                      <NextLink href={entry.href} prefetch={false} onClick={(event) => { if (!(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) close(); }}
                        className="group grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 py-5 transition-colors focus-visible:outline-rust sm:py-6">
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-baseline gap-x-3 text-xs font-medium text-muted">{entry.label}
                            {entry.date && Number.isFinite(Date.parse(entry.date)) ? <time dateTime={entry.date}>{dateFormat.format(new Date(entry.date))}</time> : null}
                          </span>
                          <span className="mt-2 block break-words text-base font-medium leading-snug text-ink group-hover:underline group-hover:underline-offset-4 sm:text-lg">{entry.title}</span>
                          <span className="mt-2 block text-sm leading-6 text-muted">{entry.description}</span>
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
        </section> : null}
      </div>
    </dialog>
  );
}

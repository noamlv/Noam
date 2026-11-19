"use client";

import { useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { EducationSearchItem } from "./education-explorer";
import type { WaterSanitationSearchItem } from "./water-sanitation-explorer";

const loading = () => <p role="status" className="text-sm text-muted">Cargando distritos…</p>;
const EducationExplorer = dynamic(() => import("./education-explorer").then((module) => module.EducationExplorer), { loading });
const WaterSanitationExplorer = dynamic(() => import("./water-sanitation-explorer").then((module) => module.WaterSanitationExplorer), { loading });

function OnDemandExplorer<Row>({ path, children }: {
  path: string;
  children: (rows: Row[], query: string) => ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [requested, setRequested] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("q")?.slice(0, 100).trim();
    if (query) {
      setQuery(query);
      setRequested(true);
    }
  }, []);

  useEffect(() => {
    if (!requested) return;
    const controller = new AbortController();
    async function load() {
      const response = await fetch(path, { signal: controller.signal });
      if (!response.ok) throw new Error("Dataset unavailable");
      const data: unknown = await response.json();
      if (!Array.isArray(data)) throw new Error("Invalid dataset");
      if (!controller.signal.aborted) setRows(data);
    }
    void load().catch(() => {
      if (!controller.signal.aborted) setFailed(true);
    });
    return () => controller.abort();
  }, [requested, path, attempt]);

  if (rows) return children(rows, query);

  function open() {
    setFailed(false);
    if (requested) setAttempt((count) => count + 1);
    else setRequested(true);
  }

  return (
    <div className="rounded-md border border-border bg-canvas p-5 md:p-6">
      <p role="status" className="text-sm leading-7 text-ink/75">
        {failed ? "No pudimos cargar los distritos. Puedes intentarlo de nuevo o descargar los datos en CSV." :
          requested ? "Cargando distritos…" : "Busca tu distrito y compara los datos con los de otros lugares."}
      </p>
      {(!requested || failed) && (
        <button type="button" onClick={open} className="mt-4 rounded-full border border-border-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-panel focus-visible:ring-2 focus-visible:ring-rust">
          {failed ? "Volver a intentar" : "Buscar distritos"}
        </button>
      )}
    </div>
  );
}

export function OnDemandEducationExplorer() {
  return <OnDemandExplorer<EducationSearchItem> path="/dataperu/educacion/distritos.json">
    {(items, query) => <EducationExplorer items={items} initialQuery={query} />}
  </OnDemandExplorer>;
}

export function OnDemandWaterSanitationExplorer() {
  return <OnDemandExplorer<WaterSanitationSearchItem> path="/dataperu/agua-saneamiento/distritos.json">
    {(items, query) => <WaterSanitationExplorer items={items} initialQuery={query} />}
  </OnDemandExplorer>;
}

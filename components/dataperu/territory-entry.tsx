"use client";

import { ArrowRight, MapPinned } from "lucide-react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { peruTerritories } from "@/lib/peru-territories";

const preferenceKey = "noam_territory";

export function TerritoryEntry() {
  const [selectedCode, setSelectedCode] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem(preferenceKey);
    if (peruTerritories.some((territory) => territory.code === stored)) setSelectedCode(stored ?? "");
  }, []);

  function selectTerritory(code: string) {
    setSelectedCode(code);
    if (code) window.localStorage.setItem(preferenceKey, code);
  }

  const selected = peruTerritories.find((territory) => territory.code === selectedCode);

  return (
    <div className="rounded-[1.25rem] border border-ink/12 bg-white p-6 shadow-subtle md:p-8">
      <div className="flex items-center justify-between gap-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-rust">Tu territorio</p>
        <MapPinned className="h-5 w-5 text-rust" aria-hidden />
      </div>
      <h3 className="mt-8 text-3xl font-medium leading-[1.08] tracking-[-0.045em] text-ink">
        Empieza por el lugar que necesitas entender.
      </h3>
      <p className="mt-4 text-sm leading-6 text-ink/64">
        Abre un perfil departamental con problemas, capacidades municipales, inversión y preguntas para la gestión.
      </p>

      <label htmlFor="home-territory" className="mt-7 block text-xs font-medium text-ink">
        Departamento
      </label>
      <select
        id="home-territory"
        value={selectedCode}
        onChange={(event) => selectTerritory(event.target.value)}
        className="mt-2 min-h-12 w-full rounded-sm border border-border bg-canvas px-4 text-sm text-ink outline-none transition-colors focus:border-rust focus:ring-2 focus:ring-rust/15"
      >
        <option value="">Seleccionar departamento</option>
        {peruTerritories.map((territory) => (
          <option key={territory.code} value={territory.code}>{territory.name}</option>
        ))}
      </select>

      <div className="mt-5 flex flex-wrap items-center gap-5">
        {selected ? (
          <NextLink
            href={`/dataperu/departamentos/${selected.code}`}
            data-analytics-event="product_open"
            data-analytics-target={`home:territory:${selected.code}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-white transition-all hover:-translate-y-px hover:bg-[#20372f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
          >
            Explorar {selected.name} <ArrowRight className="h-4 w-4" aria-hidden />
          </NextLink>
        ) : (
          <span className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm text-muted">
            Elige un departamento
          </span>
        )}
        <NextLink href="/dataperu/departamentos" className="text-sm font-medium text-ink/62 transition-colors hover:text-ink">
          Ver todo el país
        </NextLink>
      </div>
      <p className="mt-5 text-[10px] leading-4 text-muted">La preferencia se guarda solo en este navegador. Puedes cambiarla en cualquier momento.</p>
    </div>
  );
}

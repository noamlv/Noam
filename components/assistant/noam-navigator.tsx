"use client";

import { ArrowRight, MessageCircle, RotateCcw, X } from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { peruTerritories } from "@/lib/peru-territories";

type Audience = "public" | "company" | "knowledge";
type Need = "study" | "system" | "territory" | "electoral" | "ai";

const audiences: Array<{ value: Audience; label: string }> = [
  { value: "public", label: "Gobierno o entidad pública" },
  { value: "company", label: "Empresa u organización" },
  { value: "knowledge", label: "Análisis o información abierta" }
];

const needs: Array<{ value: Need; label: string }> = [
  { value: "study", label: "Estudio, línea de base o evaluación" },
  { value: "system", label: "Dashboard, observatorio o visor" },
  { value: "territory", label: "Datos de un territorio" },
  { value: "electoral", label: "Elecciones, transición o gestión" },
  { value: "ai", label: "Automatización o IA aplicada" }
];

const needInterest: Record<Need, string> = {
  study: "diagnostico-agenda-territorial",
  system: "observatorio-gestion-inversiones",
  territory: "dataperu",
  electoral: "electoral",
  ai: "ia-procesos-publicos"
};

function recommendation(audience: Audience, need: Need, territoryCode: string) {
  const territory = peruTerritories.find((item) => item.code === territoryCode);

  if (need === "territory" && territory) {
    return {
      title: `Abrir el perfil de ${territory.name}`,
      description: "Revisa capacidades municipales, inversión, problemas priorizados y preguntas pendientes antes de definir un encargo.",
      href: `/dataperu/departamentos/${territory.code}`
    };
  }
  if (need === "territory") return { title: "Explorar DataPerú", description: "Busca municipios, departamentos, inversiones y señales de gestión con fuentes y periodos visibles.", href: "/dataperu" };
  if (need === "electoral") return { title: "Entrar al especial ERM 2026", description: "Conecta territorio, competencia electoral, transferencia y agenda de los primeros 100 días.", href: "/electoral/erm-2026" };
  if (need === "system") return { title: "Revisar sistemas de decisión", description: "Conoce cómo diseñamos indicadores, dashboards, visores, alertas y rutinas de seguimiento.", href: "/services/observatorios-sistemas-decision" };
  if (need === "ai") return { title: "Evaluar un caso de IA", description: "Parte de un proceso concreto, sus datos, riesgos y criterios de éxito antes de construir un piloto.", href: "/products/ai-governance-lab" };
  if (audience === "company") return { title: "Revisar estudios para empresas", description: "Explora inteligencia territorial, estudios de mercado, evaluación y análisis para inversión u operación.", href: "/sectors/companies" };
  return { title: "Revisar estudios y evaluación", description: "Explora diagnósticos, líneas de base, encuestas, evaluaciones y análisis aplicados a decisiones públicas.", href: "/services/estudios-diagnosticos-evaluacion" };
}

export function NoamNavigator() {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [audience, setAudience] = useState<Audience | "">("");
  const [need, setNeed] = useState<Need | "">("");
  const [territoryCode, setTerritoryCode] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("noam_territory");
    if (peruTerritories.some((territory) => territory.code === stored)) setTerritoryCode(stored ?? "");
  }, []);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const result = useMemo(() => audience && need ? recommendation(audience, need, territoryCode) : null, [audience, need, territoryCode]);
  const selectedTerritory = peruTerritories.find((territory) => territory.code === territoryCode);
  const audienceLabel = audiences.find((option) => option.value === audience)?.label;
  const needLabel = needs.find((option) => option.value === need)?.label;
  const contactHref = result
    ? `/contact?interest=${needInterest[need as Need]}${selectedTerritory ? `&territory=${encodeURIComponent(selectedTerritory.name)}` : ""}&from=${encodeURIComponent(pathname)}`
    : "/contact";

  function reset() {
    setAudience("");
    setNeed("");
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 print:hidden sm:bottom-5 sm:right-5">
      {open ? (
        <section
          role="dialog"
          aria-labelledby="noam-navigator-title"
          className="mb-3 max-h-[min(76vh,680px)] w-[min(25rem,calc(100vw-2rem))] overflow-y-auto rounded-[1.25rem] border border-white/12 bg-[#15211d] p-5 text-white shadow-visual sm:p-6"
        >
          <div className="flex items-start justify-between gap-6 border-b border-white/12 pb-5">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#d9a48f]">Orientador NOAM</p>
              <h2 id="noam-navigator-title" className="mt-2 text-2xl font-medium tracking-[-0.035em]">Encuentra un punto de partida.</h2>
            </div>
            <button ref={closeButtonRef} type="button" onClick={() => setOpen(false)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9a48f]" aria-label="Cerrar orientador">
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          {!audience ? (
            <fieldset className="mt-5">
              <legend className="text-xs font-medium text-white/72">1. ¿Desde dónde nos visitas?</legend>
              <div className="mt-3 grid gap-2">
                {audiences.map((option) => (
                  <button key={option.value} type="button" onClick={() => setAudience(option.value)} className="rounded-sm border border-white/12 px-4 py-3 text-left text-sm text-white/62 transition-colors hover:border-white/28 hover:text-white">
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : (
            <div className="mt-5 flex items-center justify-between gap-4 rounded-sm border border-white/12 px-4 py-3">
              <div><p className="text-[9px] uppercase tracking-[0.13em] text-white/38">Perfil</p><p className="mt-1 text-sm text-white/82">{audienceLabel}</p></div>
              <button type="button" onClick={() => { setAudience(""); setNeed(""); }} className="text-[10px] text-white/48 underline underline-offset-4 hover:text-white">Cambiar</button>
            </div>
          )}

          {audience && !need ? (
            <fieldset className="mt-5">
              <legend className="text-xs font-medium text-white/72">2. ¿Qué necesitas resolver?</legend>
              <div className="mt-3 grid gap-2">
                {needs.map((option) => (
                  <button key={option.value} type="button" onClick={() => setNeed(option.value)} className="rounded-sm border border-white/12 px-4 py-3 text-left text-sm text-white/62 transition-colors hover:border-white/28 hover:text-white">
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          {need ? (
            <div className="mt-3 flex items-center justify-between gap-4 rounded-sm border border-white/12 px-4 py-3">
              <div><p className="text-[9px] uppercase tracking-[0.13em] text-white/38">Necesidad</p><p className="mt-1 text-sm text-white/82">{needLabel}</p></div>
              <button type="button" onClick={() => setNeed("")} className="text-[10px] text-white/48 underline underline-offset-4 hover:text-white">Cambiar</button>
            </div>
          ) : null}

          {(need === "territory" || need === "electoral") ? (
            <label className="mt-5 block text-xs font-medium text-white/72">
              3. Territorio de interés, si ya lo sabes
              <select value={territoryCode} onChange={(event) => { setTerritoryCode(event.target.value); if (event.target.value) window.localStorage.setItem("noam_territory", event.target.value); }} className="mt-3 min-h-12 w-full rounded-sm border border-white/14 bg-[#1b2d27] px-4 text-sm text-white outline-none focus:border-[#d9a48f]">
                <option value="">Todo el Perú</option>
                {peruTerritories.map((territory) => <option key={territory.code} value={territory.code}>{territory.name}</option>)}
              </select>
            </label>
          ) : null}

          {result ? (
            <div className="mt-6 rounded-md bg-white p-5 text-ink">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-rust">Recomendación</p>
              <h3 className="mt-3 text-xl font-medium tracking-[-0.03em]">{result.title}</h3>
              <p className="mt-3 text-xs leading-5 text-ink/64">{result.description}</p>
              <NextLink href={result.href} onClick={() => setOpen(false)} className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 text-xs font-medium text-white">
                Abrir recomendación <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </NextLink>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 border-t border-border pt-4 text-xs">
                <NextLink href={contactHref} onClick={() => setOpen(false)} className="font-medium text-ink hover:text-rust">Plantear el encargo</NextLink>
                <a href={buildWhatsAppUrl(pathname, `un posible encargo sobre ${result.title.toLowerCase()}`)} target="_blank" rel="noreferrer" className="text-ink/58 hover:text-ink">Hablar por WhatsApp</a>
              </div>
            </div>
          ) : null}

          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="max-w-[15rem] text-[9px] leading-4 text-white/38">No envía respuestas ni guarda datos personales. Solo organiza las rutas públicas de NOAM.</p>
            {(audience || need) ? <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-[10px] text-white/55 hover:text-white"><RotateCcw className="h-3 w-3" aria-hidden /> Reiniciar</button> : null}
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="ml-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-[#15211d] px-4 text-sm font-medium text-white shadow-visual transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#20372f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        <span>Orientador NOAM</span>
      </button>
    </div>
  );
}

"use client";

import { ArrowRight, MessageCircle, RotateCcw, X } from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { type AssistantAnswer, answerNavigatorQuestion, buildAssistantEmailUrl, refineNavigatorAnswer } from "@/lib/assistant-routing";
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

const needProof: Record<Need, { kind: string; label: string; href: string }> = {
  study: { kind: "Consultoría institucional", label: "Evaluación regional para el GORE Cusco", href: "/cases/gore-cusco-evaluacion-prevencion-trata" },
  system: { kind: "Consultoría institucional", label: "Arquitectura estadística para el IPD", href: "/cases/ipd-sistema-estadistico-investigacion-deportiva" },
  territory: { kind: "Producto propio", label: "DataPerú territorial", href: "/cases/dataperu-platform-case" },
  electoral: { kind: "Producto propio", label: "Planómetro 2026", href: "/cases/planometro-electoral-product" },
  ai: { kind: "Muestra demostrativa", label: "Piloto de IA documental", href: "/muestras/piloto-ia-documental" }
};

function recommendation(audience: Audience, need: Need, territoryCode: string) {
  const territory = peruTerritories.find((item) => item.code === territoryCode);

  if (need === "territory" && territory) {
    return {
      title: `Abrir el perfil de ${territory.name}`,
      description: "Consulta datos de municipios, presupuesto y proyectos del departamento.",
      href: `/dataperu/departamentos/${territory.code}`
    };
  }
  if (need === "territory") return { title: "Explorar DataPerú", description: "Busca datos de municipios, departamentos y proyectos. Cada sección indica la fuente y el periodo.", href: "/dataperu" };
  if (need === "electoral") return { title: "Entrar al especial ERM 2026", description: "Consulta información territorial y preguntas para preparar el inicio de una gestión regional o municipal.", href: "/electoral/erm-2026" };
  if (need === "system") return { title: "Revisar sistemas de decisión", description: "Conoce cómo diseñamos indicadores, dashboards, visores, alertas y rutinas de seguimiento.", href: "/services/observatorios-sistemas-decision" };
  if (need === "ai") return { title: "Evaluar un caso de IA", description: "Parte de un proceso concreto, sus datos, riesgos y criterios de éxito antes de construir un piloto.", href: "/products/ai-governance-lab" };
  if (audience === "company") return { title: "Revisar estudios para empresas", description: "Explora inteligencia territorial, estudios de mercado, evaluación y análisis para inversión u operación.", href: "/sectors/companies" };
  return { title: "Revisar estudios y evaluación", description: "Explora diagnósticos, líneas de base, encuestas, evaluaciones y análisis aplicados a decisiones públicas.", href: "/services/estudios-diagnosticos-evaluacion" };
}

export function NoamNavigator() {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [audience, setAudience] = useState<Audience | "">("");
  const [need, setNeed] = useState<Need | "">("");
  const [territoryCode, setTerritoryCode] = useState("");
  const [question, setQuestion] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [submittedFollowUp, setSubmittedFollowUp] = useState("");
  const [answer, setAnswer] = useState<AssistantAnswer | "unknown" | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("noam_territory");
    if (peruTerritories.some((territory) => territory.code === stored)) setTerritoryCode(stored ?? "");
  }, []);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleButtonRef.current?.focus();
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    if (open && answer) answerRef.current?.focus();
  }, [answer, open]);

  const result = useMemo(() => audience && need ? recommendation(audience, need, territoryCode) : null, [audience, need, territoryCode]);
  const selectedTerritory = peruTerritories.find((territory) => territory.code === territoryCode);
  const answerTerritory = answer && answer !== "unknown" ? peruTerritories.find((territory) => territory.name === answer.territory) : undefined;
  const audienceLabel = audiences.find((option) => option.value === audience)?.label;
  const needLabel = needs.find((option) => option.value === need)?.label;
  const contactHref = result
    ? `/contact?interest=${needInterest[need as Need]}${selectedTerritory ? `&territory=${encodeURIComponent(selectedTerritory.name)}` : ""}&from=${encodeURIComponent(pathname)}`
    : "/contact";
  const answerContactHref = answer && answer !== "unknown"
    ? `/contact?interest=${answer.interest}${answer.territory ? `&territory=${encodeURIComponent(answer.territory)}` : ""}&from=${encodeURIComponent(pathname)}`
    : `/contact?from=${encodeURIComponent(pathname)}`;

  function ask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = question.trim().slice(0, 320);
    if (text.length < 5) return;
    setAskedQuestion(text);
    setAnswer(answerNavigatorQuestion(text) ?? "unknown");
    setQuestion("");
    setFollowUp("");
    setSubmittedFollowUp("");
  }

  function clarify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const detail = followUp.trim().slice(0, 160);
    if (detail.length < 5) return;
    setSubmittedFollowUp(detail);
    setAnswer(refineNavigatorAnswer(askedQuestion, detail) ?? "unknown");
    setFollowUp("");
  }

  function reset() {
    setAudience("");
    setNeed("");
    setAnswer(null);
    setAskedQuestion("");
    setFollowUp("");
    setSubmittedFollowUp("");
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 print:hidden sm:bottom-5 sm:right-5">
      {open ? (
        <section
          role="dialog"
          aria-labelledby="noam-navigator-title"
          id="noam-navigator-dialog"
          className="mb-3 max-h-[min(76vh,680px)] w-[min(25rem,calc(100vw-2rem))] overflow-y-auto rounded-[1.25rem] border border-white/12 bg-[#15211d] p-5 text-white shadow-visual sm:p-6"
        >
          <div className="flex items-start justify-between gap-6 border-b border-white/12 pb-5">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#d9a48f]">Orientador</p>
              <h2 id="noam-navigator-title" className="mt-2 text-2xl font-medium tracking-[-0.035em]">¿Qué estás buscando?</h2>
            </div>
            <button ref={closeButtonRef} type="button" onClick={() => { setOpen(false); toggleButtonRef.current?.focus(); }} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9a48f]" aria-label="Cerrar orientador">
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <form onSubmit={ask} className="mt-5">
            <label htmlFor="noam-navigator-question" className="block text-xs font-medium text-white/72">Escribe el tema o la información que necesitas.</label>
            <textarea id="noam-navigator-question" value={question} onChange={(event) => setQuestion(event.target.value)} minLength={5} maxLength={320} rows={2} placeholder="Ej.: Busco datos de residuos en Cajamarca" className="mt-3 w-full resize-y rounded-sm border border-white/14 bg-[#1b2d27] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/35 focus:border-[#d9a48f]" />
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-[10px] leading-4 text-white/42">La pregunta se procesa aquí; no se envía ni se guarda.</span>
              <button type="submit" data-analytics-event="cta_click" data-analytics-target="navigator:question:submit" disabled={question.trim().length < 5} className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full bg-white px-4 text-xs font-medium text-ink transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-45">Buscar contenido <ArrowRight className="h-3.5 w-3.5" aria-hidden /></button>
            </div>
          </form>

          {answer ? (
            <div ref={answerRef} tabIndex={-1} role="status" aria-live="polite" className="mt-5 rounded-md border border-white/16 bg-white p-5 text-ink outline-none focus-visible:ring-2 focus-visible:ring-[#d9a48f]">
              <p className="text-[10px] leading-5 text-muted">Tu pregunta: {askedQuestion}</p>
              {answer === "unknown" ? (
                <>
                  <h3 className="mt-4 text-lg font-medium tracking-[-0.025em]">No encontré una coincidencia.</h3>
                  <p className="mt-2 text-xs leading-6 text-ink/65">Prueba con un tema como agua, educación o presupuesto. También puedes consultar DataPerú o ver nuestros trabajos.</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium"><NextLink href="/dataperu" onClick={() => setOpen(false)} className="text-rust">Ver DataPerú</NextLink><NextLink href="/cases" onClick={() => setOpen(false)} className="text-ink/65">Ver trabajos</NextLink></div>
                  <a href={buildAssistantEmailUrl(askedQuestion, null, pathname, submittedFollowUp)} data-analytics-event="cta_click" data-analytics-target="navigator:answer:email" className="mt-5 inline-flex text-xs font-medium text-rust hover:text-ink">Enviar mi pregunta por correo <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden /></a>
                </>
              ) : (
                <>
                  <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-rust">Orientación inicial · {answer.topic}</p>
                  <h3 className="mt-2 text-lg font-medium tracking-[-0.025em]">Puedes empezar aquí.</h3>
                  <p className="mt-2 text-xs leading-6 text-ink/68">{answer.response}</p>
                  <div className="mt-5 grid gap-2">
                    <NextLink href={answer.primary.href} onClick={() => setOpen(false)} data-analytics-event="cta_click" data-analytics-target="navigator:answer:approach" className="flex min-h-10 items-center justify-between gap-3 rounded-sm border border-border px-3 text-xs font-medium text-ink hover:border-rust/45">{answer.primary.label}<ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden /></NextLink>
                    <NextLink href={answer.proof.href} onClick={() => setOpen(false)} data-analytics-event="cta_click" data-analytics-target="navigator:answer:proof" className="flex min-h-10 items-center justify-between gap-3 rounded-sm border border-border px-3 text-xs text-ink/72 hover:border-rust/45"><span><span className="block text-[9px] uppercase tracking-[0.12em] text-rust">{answer.proof.kind}</span>{answer.proof.label}</span><ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden /></NextLink>
                    {answerTerritory ? <NextLink href={`/dataperu/departamentos/${answerTerritory.code}`} onClick={() => setOpen(false)} data-analytics-event="cta_click" data-analytics-target={`navigator:answer:territory:${answerTerritory.code}`} className="flex min-h-10 items-center justify-between gap-3 rounded-sm border border-border px-3 text-xs text-ink/72 hover:border-rust/45">Ver datos de {answerTerritory.name}<ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden /></NextLink> : null}
                  </div>
                  <NextLink href={answerContactHref} onClick={() => setOpen(false)} data-analytics-event="cta_click" data-analytics-target="navigator:answer:contact" className="mt-5 inline-flex text-xs font-medium text-rust hover:text-ink">Consultar con NOAM <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden /></NextLink>
                  <a href={buildAssistantEmailUrl(askedQuestion, answer, pathname, submittedFollowUp)} data-analytics-event="cta_click" data-analytics-target="navigator:answer:email" className="mt-3 inline-flex text-xs font-medium text-ink/68 hover:text-rust">Enviar esta consulta por correo <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden /></a>
                </>
              )}
              <p className="mt-4 border-t border-border pt-3 text-[10px] leading-4 text-muted">El correo se abrirá con tu pregunta. Solo se enviará si tú confirmas el envío en tu aplicación.</p>
            </div>
          ) : null}

          {answer && !submittedFollowUp ? (
            <form onSubmit={clarify} className="mt-4 border-t border-white/12 pt-4">
              <label htmlFor="noam-navigator-follow-up" className="block text-xs font-medium text-white/72">¿De qué lugar o tema quieres saber más?</label>
              <textarea id="noam-navigator-follow-up" value={followUp} onChange={(event) => setFollowUp(event.target.value)} minLength={5} maxLength={160} rows={2} placeholder="Ej.: En Cajamarca; tenemos registros de 2025" className="mt-3 w-full resize-y rounded-sm border border-white/14 bg-[#1b2d27] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/35 focus:border-[#d9a48f]" />
              <div className="mt-3 flex items-center justify-between gap-3"><span className="text-[10px] text-white/42">Opcional · solo en esta página; no se guarda.</span><button type="submit" disabled={followUp.trim().length < 5} data-analytics-event="cta_click" data-analytics-target="navigator:follow-up:submit" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 px-4 text-xs font-medium text-white transition-colors hover:border-white/50 disabled:cursor-not-allowed disabled:opacity-45">Actualizar búsqueda <ArrowRight className="h-3.5 w-3.5" aria-hidden /></button></div>
            </form>
          ) : null}
          {answer && submittedFollowUp ? <div className="mt-4 flex items-start justify-between gap-4 border-t border-white/12 pt-4"><p className="text-xs leading-5 text-white/62">Contexto añadido: {submittedFollowUp}</p><button type="button" onClick={() => { setFollowUp(submittedFollowUp); setSubmittedFollowUp(""); }} className="shrink-0 text-[10px] text-white/62 underline underline-offset-4 hover:text-white">Editar</button></div> : null}

          {!answer ? <p className="mt-6 border-t border-white/12 pt-5 text-[10px] uppercase tracking-[0.14em] text-white/42">O elige paso a paso</p> : null}

          {!answer && !audience ? (
            <fieldset className="mt-5">
              <legend className="text-xs font-medium text-white/72">1. ¿Qué te describe mejor?</legend>
              <div className="mt-3 grid gap-2">
                {audiences.map((option) => (
                  <button key={option.value} type="button" onClick={() => setAudience(option.value)} data-analytics-event="cta_click" data-analytics-target={`navigator:audience:${option.value}`} className="rounded-sm border border-white/12 px-4 py-3 text-left text-sm text-white/62 transition-colors hover:border-white/28 hover:text-white">
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : !answer ? (
            <div className="mt-5 flex items-center justify-between gap-4 rounded-sm border border-white/12 px-4 py-3">
              <div><p className="text-[9px] uppercase tracking-[0.13em] text-white/38">Perfil</p><p className="mt-1 text-sm text-white/82">{audienceLabel}</p></div>
              <button type="button" onClick={() => { setAudience(""); setNeed(""); }} className="text-[10px] text-white/48 underline underline-offset-4 hover:text-white">Cambiar</button>
            </div>
          ) : null}

          {!answer && audience && !need ? (
            <fieldset className="mt-5">
              <legend className="text-xs font-medium text-white/72">2. ¿Qué estás buscando?</legend>
              <div className="mt-3 grid gap-2">
                {needs.map((option) => (
                  <button key={option.value} type="button" onClick={() => setNeed(option.value)} data-analytics-event="cta_click" data-analytics-target={`navigator:need:${option.value}`} className="rounded-sm border border-white/12 px-4 py-3 text-left text-sm text-white/62 transition-colors hover:border-white/28 hover:text-white">
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          {!answer && need ? (
            <div className="mt-3 flex items-center justify-between gap-4 rounded-sm border border-white/12 px-4 py-3">
              <div><p className="text-[9px] uppercase tracking-[0.13em] text-white/38">Necesidad</p><p className="mt-1 text-sm text-white/82">{needLabel}</p></div>
              <button type="button" onClick={() => setNeed("")} className="text-[10px] text-white/48 underline underline-offset-4 hover:text-white">Cambiar</button>
            </div>
          ) : null}

          {!answer && (need === "territory" || need === "electoral") ? (
            <label className="mt-5 block text-xs font-medium text-white/72">
              3. Territorio de interés, si ya lo sabes
              <select value={territoryCode} onChange={(event) => { setTerritoryCode(event.target.value); if (event.target.value) window.localStorage.setItem("noam_territory", event.target.value); }} className="mt-3 min-h-12 w-full rounded-sm border border-white/14 bg-[#1b2d27] px-4 text-sm text-white outline-none focus:border-[#d9a48f]">
                <option value="">Todo el Perú</option>
                {peruTerritories.map((territory) => <option key={territory.code} value={territory.code}>{territory.name}</option>)}
              </select>
            </label>
          ) : null}

          {!answer && result ? (
            <div className="mt-6 rounded-md bg-white p-5 text-ink">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-rust">Recomendación</p>
              <h3 className="mt-3 text-xl font-medium tracking-[-0.03em]">{result.title}</h3>
              <p className="mt-3 text-xs leading-5 text-ink/64">{result.description}</p>
              <NextLink href={result.href} onClick={() => setOpen(false)} data-analytics-event="cta_click" data-analytics-target={`navigator:recommendation:${need}`} className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 text-xs font-medium text-white">
                Ver contenido <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </NextLink>
              <NextLink href={needProof[need as Need].href} onClick={() => setOpen(false)} data-analytics-event="cta_click" data-analytics-target={`navigator:proof:${need}`} className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4 text-xs text-ink/72 hover:text-rust">
                <span><span className="block text-[9px] uppercase tracking-[0.12em] text-rust">{needProof[need as Need].kind}</span>{needProof[need as Need].label}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
              </NextLink>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 border-t border-border pt-4 text-xs">
                <NextLink href={contactHref} onClick={() => setOpen(false)} data-analytics-event="cta_click" data-analytics-target={`navigator:contact:${need}`} className="font-medium text-ink hover:text-rust">Conversar con NOAM</NextLink>
                <a href={buildWhatsAppUrl(pathname, `una consulta sobre ${result.title.toLowerCase()}`)} target="_blank" rel="noreferrer" data-analytics-event="cta_click" data-analytics-target={`navigator:whatsapp:${need}`} className="text-ink/58 hover:text-ink">Hablar por WhatsApp</a>
              </div>
            </div>
          ) : null}

          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="max-w-[15rem] text-[9px] leading-4 text-white/38">No transmite ni guarda tu pregunta. Es orientación automática inicial, no una propuesta ni asesoría definitiva.</p>
            {(audience || need || answer) ? <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-[10px] text-white/55 hover:text-white"><RotateCcw className="h-3 w-3" aria-hidden /> Reiniciar</button> : null}
          </div>
        </section>
      ) : null}

      <button
        ref={toggleButtonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        data-analytics-event="cta_click"
        data-analytics-target="navigator:toggle"
        aria-expanded={open}
        aria-controls="noam-navigator-dialog"
        className="ml-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-[#15211d] px-4 text-sm font-medium text-white shadow-visual transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#20372f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        <span>Orientador</span>
      </button>
    </div>
  );
}

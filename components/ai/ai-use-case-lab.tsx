"use client";

import { Download, RotateCcw, ShieldCheck } from "lucide-react";
import NextLink from "next/link";
import { useMemo, useState } from "react";
import {
  aiUseCases,
  assessmentCriteria,
  assessmentFromUseCase,
  evaluateAiUseCase,
  type AiAssessment,
  type ScaleValue
} from "@/lib/ai-lab";

const statusStyles = {
  pilot: { dot: "bg-[#5f796e]", panel: "border-[#5f796e]/35 bg-[#5f796e]/[0.07]", text: "text-[#476156]" },
  investigate: { dot: "bg-[#b18b45]", panel: "border-[#b18b45]/35 bg-[#b18b45]/[0.07]", text: "text-[#806326]" },
  redesign: { dot: "bg-rust", panel: "border-rust/35 bg-rust/[0.06]", text: "text-rust" },
  stop: { dot: "bg-[#16211d]", panel: "border-[#16211d]/30 bg-[#16211d]/[0.06]", text: "text-[#16211d]" }
} as const;

const groupDescriptions = {
  Oportunidad: "¿Existe una tarea útil, delimitada y medible?",
  Exposición: "¿Qué puede ocurrir si la salida es incorrecta o se usa fuera de contexto?",
  Controles: "¿La institución puede supervisar, reconstruir y detener el sistema?"
} as const;

function csvCell(value: string | number) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function AiUseCaseLab() {
  const [assessment, setAssessment] = useState<AiAssessment>(() => assessmentFromUseCase(aiUseCases[0]));
  const selectedCase = aiUseCases.find((item) => item.id === assessment.caseId) ?? aiUseCases[0];
  const result = useMemo(() => evaluateAiUseCase(assessment), [assessment]);
  const style = statusStyles[result.status];
  const contactHref = `/contact?interest=ia-procesos-publicos&case=${encodeURIComponent(selectedCase.id)}&from=/products/ai-governance-lab`;

  const selectCase = (caseId: string) => {
    const useCase = aiUseCases.find((item) => item.id === caseId);
    if (useCase) setAssessment(assessmentFromUseCase(useCase));
  };

  const updateCriterion = (key: Exclude<keyof AiAssessment, "caseId">, value: ScaleValue) => {
    setAssessment((current) => ({ ...current, [key]: value }));
  };

  const downloadAssessment = () => {
    const rows: Array<[string, string | number]> = [
      ["Caso", selectedCase.name],
      ["Metodología", "NOAM · Laboratorio de casos de uso de IA · v1.0"],
      ["Orientación inicial", result.label],
      ["Oportunidad", result.opportunity],
      ["Exposición", result.exposure],
      ["Fortaleza de controles", result.controlStrength],
      ...assessmentCriteria.map((criterion): [string, number] => [criterion.label, assessment[criterion.key]]),
      ...result.controls.map((control, index): [string, string] => [`Control ${index + 1}`, control])
    ];
    const csv = `campo,valor\n${rows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`;
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `noam-evaluacion-ia-${selectedCase.id}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const printAssessment = () => {
    const className = "printing-ai-assessment";
    const cleanup = () => document.body.classList.remove(className);
    document.body.classList.add(className);
    window.addEventListener("afterprint", cleanup, { once: true });
    window.print();
    window.setTimeout(cleanup, 1_000);
  };

  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-border bg-panel shadow-subtle">
      <div className="border-b border-border bg-canvas p-5 md:p-7">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-rust">Paso 01 · Selecciona un punto de partida</p><h2 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-ink">Caso de uso</h2></div>
          <p className="max-w-xl text-xs leading-5 text-muted">Los valores son ejemplos iniciales. Ajusta cada criterio según el proceso y la evidencia real de tu institución.</p>
        </div>
        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {aiUseCases.map((useCase, index) => {
            const active = useCase.id === selectedCase.id;
            return (
              <button key={useCase.id} type="button" onClick={() => selectCase(useCase.id)} aria-pressed={active} className={`min-h-[92px] rounded-sm border p-4 text-left transition-all ${active ? "border-rust bg-rust/[0.055]" : "border-border bg-panel hover:border-border-strong hover:bg-canvas"}`}>
                <span className={`font-mono text-[9px] ${active ? "text-rust" : "text-muted"}`}>0{index + 1}</span>
                <span className="mt-3 block text-sm font-medium leading-5 text-ink">{useCase.shortName}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-5 grid gap-3 rounded-sm border border-border bg-panel p-5 md:grid-cols-[0.7fr_1fr] md:gap-8">
          <div><p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-muted">Qué intenta resolver</p><p className="mt-2 text-sm font-medium leading-6 text-ink">{selectedCase.name}</p></div>
          <div><p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-muted">Límite operativo</p><p className="mt-2 text-sm leading-6 text-ink/64">{selectedCase.task}</p></div>
        </div>
      </div>

      <div className="grid min-w-0 lg:grid-cols-[1fr_0.78fr]">
        <div className="min-w-0 border-b border-border p-5 md:p-7 lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-rust">Paso 02 · Ajusta la evidencia</p><h2 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-ink">Diez criterios observables</h2></div>
            <button type="button" onClick={() => selectCase(selectedCase.id)} className="inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-ink"><RotateCcw className="h-3.5 w-3.5" aria-hidden /> Restaurar ejemplo</button>
          </div>

          {(["Oportunidad", "Exposición", "Controles"] as const).map((group, groupIndex) => (
            <fieldset key={group} className="mt-9 border-t border-border pt-7 first:mt-7">
              <legend className="pr-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink">0{groupIndex + 1} · {group}</legend>
              <p className="mt-1 text-xs leading-5 text-muted">{groupDescriptions[group]}</p>
              <div className="mt-6 space-y-7">
                {assessmentCriteria.filter((criterion) => criterion.group === group).map((criterion) => {
                  const value = assessment[criterion.key];
                  const inputId = `ai-${criterion.key}`;
                  return (
                    <div key={criterion.key}>
                      <div className="flex items-start justify-between gap-5"><label htmlFor={inputId} className="text-sm font-medium text-ink">{criterion.label}</label><output htmlFor={inputId} className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#16211d] px-2 font-mono text-[10px] text-white">{value}</output></div>
                      <p className="mt-1 text-[10px] leading-4 text-muted">{criterion.help}</p>
                      <input id={inputId} type="range" min="1" max="5" step="1" value={value} onChange={(event) => updateCriterion(criterion.key, Number(event.target.value) as ScaleValue)} className="ai-range mt-4 w-full" />
                      <div className="mt-2 flex justify-between gap-4 text-[9px] leading-4 text-muted"><span>{criterion.low}</span><span className="text-right">{criterion.high}</span></div>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <aside className="min-w-0 bg-[#f2efe7] p-5 md:p-7 lg:sticky lg:top-20 lg:self-start">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-rust">Paso 03 · Orientación inicial</p>
          <div className={`mt-5 rounded-md border p-5 ${style.panel}`} aria-live="polite">
            <div className="flex items-center gap-3"><span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} /><p className={`text-[10px] font-semibold uppercase tracking-[0.13em] ${style.text}`}>Resultado de la heurística</p></div>
            <h2 className="mt-4 text-2xl font-medium leading-tight tracking-[-0.035em] text-ink">{result.label}</h2>
            <p className="mt-3 text-xs leading-5 text-ink/62">{result.summary}</p>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-border bg-border">
            {[
              { label: "Oportunidad", value: result.opportunity, color: "#5f796e" },
              { label: "Exposición", value: result.exposure, color: "#b95337" },
              { label: "Controles", value: result.controlStrength, color: "#b18b45" }
            ].map((score) => (
              <div key={score.label} className="min-w-0 bg-panel p-3 text-center sm:p-4">
                <p className="text-2xl font-medium tracking-[-0.04em] text-ink">{score.value}</p>
                <p className="mt-1 truncate text-[8px] font-semibold uppercase tracking-[0.09em] text-muted">{score.label}</p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full" style={{ width: `${score.value}%`, backgroundColor: score.color }} /></div>
              </div>
            ))}
          </div>

          <div className="relative mt-5 aspect-[1.22/1] overflow-hidden rounded-md border border-border bg-panel">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 text-[8px] uppercase tracking-[0.1em] text-muted/72">
              <div className="border-b border-r border-border bg-rust/[0.035] p-3">Evitar o rediseñar</div>
              <div className="border-b border-border bg-[#b18b45]/[0.055] p-3 text-right">Control reforzado</div>
              <div className="border-r border-border p-3 self-end">Aclarar valor</div>
              <div className="bg-[#5f796e]/[0.055] p-3 text-right self-end">Piloto acotado</div>
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-[0.12em] text-muted">Oportunidad →</div>
            <div className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] uppercase tracking-[0.12em] text-muted">Exposición →</div>
            <div className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_5px_rgba(22,33,29,.13)] transition-all duration-220 ${style.dot}`} style={{ left: `${Math.min(Math.max(result.opportunity, 5), 95)}%`, top: `${100 - Math.min(Math.max(result.exposure, 5), 95)}%` }} aria-label={`Oportunidad ${result.opportunity}; exposición ${result.exposure}`} role="img" />
          </div>

          <div className="mt-7">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-rust" aria-hidden /><h3 className="text-sm font-medium text-ink">Controles por documentar</h3></div>
            <ol className="mt-4 divide-y divide-border border-y border-border">
              {result.controls.map((control, index) => <li key={control} className="grid grid-cols-[26px_1fr] gap-3 py-3 text-[10px] leading-4 text-ink/66"><span className="font-mono text-rust">0{index + 1}</span>{control}</li>)}
            </ol>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={downloadAssessment} data-analytics-event="resource_download" data-analytics-target="ai-lab:assessment-csv" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#16211d] px-5 text-sm font-medium text-white transition-transform hover:-translate-y-px"><Download className="h-4 w-4" aria-hidden /> Descargar evaluación</button>
            <button type="button" onClick={printAssessment} className="inline-flex min-h-11 items-center justify-center rounded-sm border border-border bg-panel px-5 text-sm font-medium text-ink hover:border-border-strong">Imprimir reporte</button>
            <NextLink href={contactHref} data-analytics-event="cta_click" data-analytics-target="ai-lab:selected-case-contact" className="inline-flex min-h-11 items-center justify-center rounded-sm border border-rust/30 bg-rust/[0.055] px-5 text-sm font-medium text-rust transition-colors hover:bg-rust hover:text-white">Solicitar evaluación</NextLink>
          </div>
          <p className="mt-5 text-[9px] leading-4 text-muted">Este resultado no determina la clasificación jurídica del sistema, no certifica cumplimiento y no sustituye evaluación técnica, legal, ética, de seguridad o protección de datos.</p>
        </aside>
      </div>

      <section className="ai-assessment-print hidden bg-white text-[#15211d]" aria-hidden="true">
        <header className="flex items-start justify-between border-b-2 border-[#15211d] pb-5">
          <div><p className="text-xl font-semibold tracking-[0.18em]">NOAM</p><p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-[#5f665f]">Gobierno · Datos · IA</p></div>
          <div className="text-right"><p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#b95337]">Evaluación inicial</p><p className="mt-1 text-[9px] text-[#777]">Metodología v1.0 · noam.pe</p></div>
        </header>
        <div className="mt-8 grid grid-cols-[1fr_130px] gap-8">
          <div><p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#b95337]">Caso de uso</p><h1 className="mt-2 text-3xl font-medium leading-tight tracking-[-0.035em]">{selectedCase.name}</h1><p className="mt-3 text-xs leading-5 text-[#58605b]">{selectedCase.task}</p></div>
          <div className="border-l border-[#d7d5ce] pl-5"><p className="text-[9px] uppercase tracking-[0.12em] text-[#777]">Orientación</p><p className="mt-2 text-lg font-medium leading-tight">{result.label}</p></div>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[["Oportunidad", result.opportunity], ["Exposición", result.exposure], ["Controles", result.controlStrength]].map(([label, value]) => <div key={label} className="border border-[#d7d5ce] p-4"><p className="text-3xl font-medium tracking-[-0.04em]">{value}</p><p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#777]">{label}</p></div>)}
        </div>
        <p className="mt-5 border-l-2 border-[#b95337] pl-4 text-xs leading-5 text-[#58605b]">{result.summary}</p>
        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-0">
          {assessmentCriteria.map((criterion) => <div key={criterion.key} className="grid grid-cols-[1fr_auto] gap-4 border-t border-[#d7d5ce] py-2.5"><div><p className="text-[10px] font-medium">{criterion.label}</p><p className="mt-0.5 text-[8px] text-[#777]">{criterion.group}</p></div><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#15211d] font-mono text-[9px] text-white">{assessment[criterion.key]}</span></div>)}
        </div>
        <div className="mt-8"><p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#b95337]">Controles por documentar</p><ol className="mt-3 grid grid-cols-2 gap-x-8">{result.controls.map((control, index) => <li key={control} className="grid grid-cols-[24px_1fr] gap-2 border-t border-[#d7d5ce] py-2.5 text-[9px] leading-4"><span className="font-mono text-[#b95337]">0{index + 1}</span>{control}</li>)}</ol></div>
        <footer className="mt-8 border-t border-[#15211d] pt-4 text-[8px] leading-4 text-[#777]">Herramienta heurística para conversación inicial. No determina clasificación jurídica, no certifica cumplimiento y no sustituye evaluación técnica, legal, ética, de seguridad o protección de datos.</footer>
      </section>
    </div>
  );
}

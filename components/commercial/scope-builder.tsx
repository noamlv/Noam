"use client";

import { ArrowRight, Check, Download, FileText, LockKeyhole, Route } from "lucide-react";
import NextLink from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui";
import {
  buildScopeBrief,
  buildScopeContactHref,
  buildScopeRecommendation,
  buildScopeSampleSlug,
  scopeChallengeOptions,
  scopeEvidenceOptions,
  scopeHorizonOptions,
  scopeOrganizationOptions,
  type ScopeBuilderInput,
  type ScopeChallenge,
  type ScopeEvidence,
  type ScopeHorizon,
  type ScopeOrganization
} from "@/lib/scope-builder";

type Choice = { value: string; label: string; description: string };

function ChoiceGroup({
  number,
  title,
  name,
  options,
  value,
  onChange
}: {
  number: string;
  title: string;
  name: string;
  options: readonly Choice[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="border-t border-border pt-7">
      <legend className="flex w-full items-center gap-4 text-left"><span className="font-mono text-[9px] text-rust">{number}</span><span className="text-lg font-medium tracking-[-0.02em] text-ink">{title}</span></legend>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label key={option.value} className="group relative cursor-pointer">
            <input type="radio" name={name} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} className="peer sr-only" />
            <span className="flex min-h-[118px] flex-col rounded-sm border border-border bg-panel p-4 transition-all duration-200 hover:border-border-strong peer-checked:border-rust peer-checked:bg-rust/[0.045] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rust">
              <span className="flex items-center justify-between gap-3"><span className="text-sm font-medium text-ink">{option.label}</span><span className="flex h-5 w-5 items-center justify-center rounded-full border border-border text-transparent peer-checked:border-rust"><Check className={`h-3 w-3 ${value === option.value ? "text-rust" : "text-transparent"}`} aria-hidden /></span></span>
              <span className="mt-3 text-xs leading-5 text-ink/55">{option.description}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ScopeBuilder() {
  const [input, setInput] = useState<ScopeBuilderInput>({ organization: "municipality", challenge: "understand", evidence: "public", horizon: "medium" });
  const recommendation = useMemo(() => buildScopeRecommendation(input), [input]);
  const contactHref = useMemo(() => buildScopeContactHref(input), [input]);
  const sampleHref = useMemo(() => `/muestras/${buildScopeSampleSlug(input)}`, [input]);
  const set = <Key extends keyof ScopeBuilderInput>(key: Key, value: ScopeBuilderInput[Key]) => setInput((current) => ({ ...current, [key]: value }));

  const downloadBrief = () => {
    const blob = new Blob([buildScopeBrief(input)], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `brief-noam-${input.challenge}.md`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
  };

  return (
    <div data-testid="scope-builder" className="grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-start lg:gap-12">
      <div className="space-y-8">
        <ChoiceGroup number="01" title="¿Qué tipo de organización tomará la decisión?" name="organization" options={scopeOrganizationOptions} value={input.organization} onChange={(value) => set("organization", value as ScopeOrganization)} />
        <ChoiceGroup number="02" title="¿Qué necesita mejorar primero?" name="challenge" options={scopeChallengeOptions} value={input.challenge} onChange={(value) => set("challenge", value as ScopeChallenge)} />
        <ChoiceGroup number="03" title="¿Qué evidencia está disponible?" name="evidence" options={scopeEvidenceOptions} value={input.evidence} onChange={(value) => set("evidence", value as ScopeEvidence)} />
        <ChoiceGroup number="04" title="¿Qué horizonte es realista?" name="horizon" options={scopeHorizonOptions} value={input.horizon} onChange={(value) => set("horizon", value as ScopeHorizon)} />
      </div>

      <aside className="overflow-hidden rounded-[1.25rem] border border-ink/15 bg-[#15211d] text-white shadow-visual lg:sticky lg:top-28" aria-live="polite">
        <div className="flex items-center justify-between border-b border-white/14 px-6 py-5"><span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#d9a48f]">Brief recomendado</span><span className="font-mono text-[9px] text-white/35">NOAM · 01</span></div>
        <div className="p-6 md:p-8">
          <Route className="h-5 w-5 text-[#d9a48f]" aria-hidden />
          <p className="mt-7 text-[10px] uppercase tracking-[0.14em] text-white/55">{recommendation.mode} · {recommendation.timelineLabel}</p>
          <h2 className="mt-3 text-3xl font-medium leading-tight tracking-[-0.045em] text-white">{recommendation.title}</h2>
          <p className="mt-5 text-sm leading-7 text-white/58">{recommendation.promise}</p>

          <div className="mt-8 border-y border-white/14 py-6">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#d9a48f]">Primera decisión</p>
            <p className="mt-3 text-sm font-medium leading-6 text-white/82">{recommendation.firstDecision}</p>
          </div>

          <div className="mt-7">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/55">Fases sugeridas</p>
            <ol className="mt-4 space-y-3">{recommendation.phases.map((phase, index) => <li key={phase} className="grid grid-cols-[24px_1fr] gap-3 text-xs leading-5 text-white/65"><span className="font-mono text-[9px] text-[#d9a48f]">0{index + 1}</span>{phase}</li>)}</ol>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/12">{recommendation.deliverables.slice(0, 4).map((deliverable) => <div key={deliverable} className="min-h-[105px] bg-[#15211d] p-4"><FileText className="h-3.5 w-3.5 text-[#d9a48f]" aria-hidden /><p className="mt-4 text-[10px] leading-4 text-white/55">{deliverable}</p></div>)}</div>

          <div className="mt-7 rounded-sm border border-white/14 bg-white/[0.035] p-4"><p className="text-[9px] uppercase tracking-[0.13em] text-white/35">Condición crítica</p><p className="mt-2 text-xs leading-5 text-white/58">{recommendation.dependency}</p></div>

          <NextLink href={sampleHref} data-analytics-event="cta_click" data-analytics-target={`scope-sample:${input.challenge}`} className="group mt-5 flex items-center justify-between gap-4 rounded-sm border border-[#d9a48f]/35 bg-[#d9a48f]/[0.055] p-4 transition-colors hover:border-[#d9a48f]/65">
            <span><span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#d9a48f]">Ver antes de conversar</span><span className="mt-2 block text-xs leading-5 text-white/62">Examinar una muestra del entregable recomendado.</span></span>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#d9a48f] transition-transform group-hover:translate-x-1" aria-hidden />
          </NextLink>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <button type="button" onClick={downloadBrief} data-analytics-event="resource_download" data-analytics-target={`scope-brief:${input.challenge}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-5 text-sm font-medium text-white/75 transition-colors hover:border-white/45 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><Download className="h-4 w-4" aria-hidden /> Descargar brief</button>
            <Button href={contactHref} analyticsEvent="cta_click" analyticsTarget={`scope-builder:${input.challenge}`} variant="secondary" className="min-h-12 gap-2 rounded-full border-white bg-white text-ink">Conversar sobre esto <ArrowRight className="h-4 w-4" aria-hidden /></Button>
          </div>
          <p className="mt-5 flex items-start gap-2 text-[9px] leading-4 text-white/35"><LockKeyhole className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />Tus selecciones no se almacenan. Solo se envían al abrir y completar el formulario de contacto.</p>
        </div>
      </aside>
    </div>
  );
}

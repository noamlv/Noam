import { ArrowDown, Check, Clock3, LockKeyhole, Mail } from "lucide-react";
import NextLink from "next/link";
import { submitLead } from "@/app/contact/actions";
import { WhatsAppLink } from "@/components/commercial/whatsapp-link";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import {
  budgetRangeOptions,
  generalInterestOptions,
  interestOptions,
  organizationTypeOptions,
  resolveInterest,
  solutionInterestOptions,
  timelineOptions
} from "@/lib/lead-options";
import { getSolution } from "@/lib/solutions";
import { aiUseCases } from "@/lib/ai-lab";
import { buildScopeContactMessage, buildScopeRecommendation, parseScopeBuilderInput } from "@/lib/scope-builder";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { runtimeCapabilities } from "@/lib/runtime-capabilities";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Contacto",
  description: "Cuéntanos qué decisión, estudio o sistema necesita tu organización.",
  path: "/contact"
});

interface ContactPageProps {
  searchParams: Promise<{ interest?: string; error?: string; from?: string; territory?: string; case?: string; org?: string; challenge?: string; evidence?: string; horizon?: string }>;
}

const fieldClass = "mt-2 min-h-12 w-full rounded-sm border border-border bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/65 focus:border-rust";

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const defaultInterest = resolveInterest(params.interest);
  const selectedSolution = getSolution(defaultInterest);
  const selectedInterest = params.interest ? interestOptions.find((option) => option.value === defaultInterest) : null;
  const selectedInterestTitle = selectedSolution?.title ?? selectedInterest?.label;
  const safeFrom = params.from?.startsWith("/") && !params.from.startsWith("//") ? params.from.slice(0, 300) : null;
  const defaultTerritory = params.territory?.trim().slice(0, 180) ?? "";
  const selectedAiCase = aiUseCases.find((item) => item.id === params.case);
  const scopeInput = parseScopeBuilderInput(params);
  const scopeRecommendation = scopeInput ? buildScopeRecommendation(scopeInput) : null;
  const defaultMessage = selectedAiCase ? `Queremos evaluar el siguiente caso de uso de IA: ${selectedAiCase.name}.\n\nContexto de la organización y decisión que buscamos mejorar:\n` : scopeInput ? buildScopeContactMessage(scopeInput) : "";
  const defaultOrganizationType = scopeRecommendation?.organizationType ?? "";
  const defaultTimeline = scopeRecommendation?.timeline ?? "to-define";
  const originPath = safeFrom ?? (selectedSolution ? `/solutions/${selectedSolution.slug}` : params.interest === "dataperu" ? "/dataperu" : params.interest === "electoral" ? "/electoral" : "/contact");
  const emailSubject = encodeURIComponent(selectedInterestTitle ? `Consulta: ${selectedInterestTitle}` : "Consulta para NOAM");
  const emailBody = encodeURIComponent(`Hola, quisiera conversar sobre ${selectedInterestTitle ?? "un posible encargo"}${defaultTerritory ? ` en ${defaultTerritory}` : ""}.\n\nOrganización:\nDecisión o problema:\nPlazo aproximado:\n`);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Contacto", path: "/contact" }])} />
      <Section className="pb-12 pt-14 md:pb-16 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.62fr_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow className="text-rust">Contacto</Eyebrow>
              <Heading as="h1" size="display" className="max-w-[11ch]">Comencemos por la decisión.</Heading>
              <p className="mt-6 max-w-xl text-base leading-8 text-ink/68">Describe el problema, el territorio o el resultado que necesitas. Usaremos esta información para preparar una conversación concreta.</p>

              {selectedInterestTitle && params.interest ? (
                <div className="mt-8 rounded-md border border-rust/25 bg-rust/[0.045] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-rust">Tema seleccionado</p>
                  <p className="mt-3 text-lg font-medium tracking-[-0.02em] text-ink">{selectedInterestTitle}</p>
                  <p className="mt-2 text-xs leading-5 text-ink/60">{runtimeCapabilities.leadIntake ? "Puedes cambiarla dentro del formulario si el desafío es distinto." : "La incluiremos como contexto inicial en el canal que elijas."}</p>
                </div>
              ) : null}

              <div className="mt-9 border-t border-border pt-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">Qué ocurre después</p>
                <ol className="mt-5 space-y-4">
                  {[
                    "Revisamos el contexto y la decisión principal.",
                    "Enviamos preguntas para delimitar alcance y fuentes.",
                    "Si existe encaje, proponemos un punto de partida."
                  ].map((item, index) => (
                    <li key={item} className="grid grid-cols-[28px_1fr] gap-3 text-sm leading-6 text-ink/68"><span className="font-mono text-[10px] text-rust">0{index + 1}</span>{item}</li>
                  ))}
                </ol>
              </div>

              {runtimeCapabilities.leadIntake ? <div className="mt-8 rounded-[1rem] border border-[#15211d]/12 bg-[#15211d] p-5 text-white shadow-subtle">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#d9a48f]">Respuesta directa</p>
                <p className="mt-3 text-lg font-medium tracking-[-0.025em]">¿Prefieres WhatsApp?</p>
                <p className="mt-2 text-xs leading-5 text-white/58">Escríbenos con un mensaje prellenado según la página desde la que llegaste.</p>
                <WhatsAppLink context={selectedInterestTitle ?? "una posible consultoría"} analyticsTarget="contact:whatsapp" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-ink transition-transform hover:-translate-y-px">
                  {siteConfig.phone}
                </WhatsAppLink>
              </div> : null}
            </div>

            <div>
              {!runtimeCapabilities.leadIntake ? (
                <div className="rounded-[1.25rem] border border-border bg-panel p-6 shadow-subtle md:p-8">
                  <Eyebrow>Canales disponibles</Eyebrow>
                  <Heading size="lg" className="max-w-[18ch]">Contacto directo y trazable.</Heading>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-ink/65">
                    Para no solicitar información que el sitio todavía no puede almacenar de forma persistente, atendemos las consultas por email y WhatsApp. Elige el canal que prefieras.
                  </p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <a href={`mailto:${siteConfig.email}?subject=${emailSubject}&body=${emailBody}`} className="group rounded-md border border-border bg-canvas p-5 transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-subtle">
                      <Mail className="h-4 w-4 text-rust" aria-hidden />
                      <span className="mt-5 block text-lg font-medium tracking-[-0.025em] text-ink">Escribir por email</span>
                      <span className="mt-2 block text-xs text-muted">{siteConfig.email}</span>
                    </a>
                    <WhatsAppLink context={selectedInterestTitle ?? "una posible consultoría"} analyticsTarget="contact:direct-whatsapp" className="group rounded-md border border-border bg-canvas p-5 transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-subtle">
                      <span className="mt-5 block text-lg font-medium tracking-[-0.025em] text-ink">Abrir WhatsApp</span>
                      <span className="mt-2 block text-xs text-muted">{siteConfig.phone}</span>
                    </WhatsAppLink>
                  </div>
                  <div className="mt-7 rounded-sm border border-border bg-canvas p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Para responder mejor</p>
                    <ul className="mt-4 grid gap-3 text-sm leading-6 text-ink/68 sm:grid-cols-2">
                      {["La decisión o problema principal", "La entidad, empresa o territorio", "La evidencia que ya existe", "El plazo o hito más importante"].map((item) => <li key={item} className="flex items-start gap-2"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-rust" aria-hidden />{item}</li>)}
                    </ul>
                  </div>
                  <p className="mt-5 text-xs leading-5 text-muted">El formulario seguro se habilitará automáticamente cuando la infraestructura persistente esté operativa.</p>
                </div>
              ) : (
                <>
              {params.error === "validation" ? <p role="alert" className="mb-5 rounded-sm border border-rust/30 bg-rust/5 px-4 py-3 text-sm text-ink">Revisa los campos obligatorios y confirma el uso de tus datos.</p> : null}
              {params.error === "rate" ? <p role="alert" className="mb-5 rounded-sm border border-rust/30 bg-rust/5 px-4 py-3 text-sm text-ink">Recibimos varias solicitudes seguidas. Espera unos minutos o escribe a hola@noam.pe.</p> : null}
              {params.error === "unavailable" ? <p role="alert" className="mb-5 rounded-sm border border-rust/30 bg-rust/5 px-4 py-3 text-sm leading-6 text-ink">No pudimos guardar la consulta en este momento. No la reenvíes todavía; escríbenos directamente a <a href="mailto:hola@noam.pe" className="font-medium underline underline-offset-4">hola@noam.pe</a>.</p> : null}
              <form action={submitLead} className="rounded-[1.25rem] border border-border bg-panel p-6 shadow-subtle md:p-8">
                <input type="hidden" name="originPath" value={originPath} />
                <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="website">Sitio web</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>

                <fieldset>
                  <legend className="flex w-full items-center justify-between border-b border-border pb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted"><span>01 · Contacto</span><span>Campos obligatorios *</span></legend>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-medium text-ink">Nombre *<input name="name" required minLength={2} maxLength={120} autoComplete="name" className={fieldClass} /></label>
                    <label className="text-sm font-medium text-ink">Email de trabajo *<input name="email" type="email" required maxLength={254} autoComplete="email" className={fieldClass} /></label>
                  </div>
                </fieldset>

                <fieldset className="mt-9">
                  <legend className="w-full border-b border-border pb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">02 · Organización</legend>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-medium text-ink">Organización<input name="organization" maxLength={180} autoComplete="organization" placeholder="Entidad, empresa u organización" className={fieldClass} /></label>
                    <label className="text-sm font-medium text-ink">Tipo de organización *<span className="relative block"><select name="organizationType" required defaultValue={defaultOrganizationType} className={`${fieldClass} appearance-none pr-10`}><option value="" disabled>Seleccionar</option>{organizationTypeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ArrowDown className="pointer-events-none absolute bottom-4 right-4 h-3.5 w-3.5 text-muted" aria-hidden /></span></label>
                  </div>
                </fieldset>

                <fieldset className="mt-9">
                  <legend className="w-full border-b border-border pb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">03 · Encargo</legend>
                  <label className="mt-5 block text-sm font-medium text-ink">¿En qué podemos ayudar? *<span className="relative block"><select name="interest" required defaultValue={defaultInterest} className={`${fieldClass} appearance-none pr-10`}><optgroup label="Soluciones">{solutionInterestOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</optgroup><optgroup label="Otros puntos de entrada">{generalInterestOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</optgroup></select><ArrowDown className="pointer-events-none absolute bottom-4 right-4 h-3.5 w-3.5 text-muted" aria-hidden /></span></label>
                  <label className="mt-5 block text-sm font-medium text-ink">Contexto y objetivo *<textarea name="message" rows={7} required minLength={10} maxLength={5000} defaultValue={defaultMessage} placeholder="¿Qué necesitan decidir, comprender o construir? ¿Existe un hito o restricción importante?" className={fieldClass} /></label>
                </fieldset>

                <details className="group mt-7 rounded-sm border border-border bg-canvas" open={Boolean(defaultTerritory || scopeInput || params.error === "validation")}>
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 px-4 py-3 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust">
                    <span><span className="block text-sm font-medium text-ink">Añadir detalles del proyecto</span><span className="mt-1 block text-[10px] leading-4 text-muted">Opcional · ayuda a preparar mejor la primera conversación</span></span>
                    <ArrowDown className="h-4 w-4 shrink-0 text-muted transition-transform duration-220 group-open:rotate-180" aria-hidden />
                  </summary>
                  <div className="grid gap-5 border-t border-border p-4 sm:grid-cols-2">
                    <label className="text-sm font-medium text-ink">Cargo o rol<input name="role" maxLength={140} autoComplete="organization-title" placeholder="Alcaldía, gerencia, equipo técnico..." className={fieldClass} /></label>
                    <label className="text-sm font-medium text-ink">Territorio o cobertura<input name="territory" maxLength={180} defaultValue={defaultTerritory} placeholder="Distrito, región o alcance nacional" className={fieldClass} /></label>
                    <label className="text-sm font-medium text-ink">Horizonte esperado<span className="relative block"><select name="timeline" defaultValue={defaultTimeline} className={`${fieldClass} appearance-none pr-10`}>{timelineOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><Clock3 className="pointer-events-none absolute bottom-4 right-4 h-3.5 w-3.5 text-muted" aria-hidden /></span></label>
                    <label className="text-sm font-medium text-ink">Rango referencial<span className="relative block"><select name="budgetRange" defaultValue="to-define" className={`${fieldClass} appearance-none pr-10`}>{budgetRangeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ArrowDown className="pointer-events-none absolute bottom-4 right-4 h-3.5 w-3.5 text-muted" aria-hidden /></span></label>
                  </div>
                </details>

                <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-sm border border-border bg-canvas p-4 text-xs leading-5 text-ink/66"><input name="consent" value="accepted" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-[#b95337]" /><span>He leído el <NextLink href="/privacy" className="font-medium text-ink underline decoration-border underline-offset-4">aviso de privacidad</NextLink> y acepto que NOAM use estos datos para revisar y responder esta solicitud. *</span></label>

                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex max-w-sm items-start gap-2 text-xs leading-5 text-muted"><LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />No compartiremos esta información con terceros para fines comerciales.</p>
                  <Button type="submit" className="rounded-full px-7">Enviar consulta</Button>
                </div>
              </form>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
                <p className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-rust" aria-hidden />También puedes escribir directamente a <a href="mailto:hola@noam.pe" className="font-medium text-ink underline decoration-border underline-offset-4">hola@noam.pe</a>.</p>
                <NextLink href="/como-trabajamos" className="font-medium text-ink underline decoration-border underline-offset-4">Cómo comienza un encargo</NextLink>
              </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

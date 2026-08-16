import { ArrowRight } from "lucide-react";
import NextLink from "next/link";
import { Button } from "@/components/ui";
import { subscribeNewsletterAction } from "@/app/newsletter/actions";

const interests = [
  ["gestion-publica", "Gestión pública y territorio"],
  ["electoral", "Elecciones y transición"],
  ["datos-ia", "Datos e IA aplicada"]
] as const;

export function NewsletterSignup({ sourcePath = "/newsletter" }: { sourcePath?: string }) {
  return (
    <form action={subscribeNewsletterAction} className="rounded-[1.25rem] border border-border bg-panel p-5 text-ink shadow-subtle md:p-7">
      <input type="hidden" name="sourcePath" value={sourcePath} />
      <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">Sitio web<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Nombre <span className="font-normal normal-case tracking-normal">(opcional)</span>
          <input name="name" maxLength={120} autoComplete="name" className="mt-2 min-h-12 w-full rounded-sm border border-border bg-canvas px-4 text-sm text-ink outline-none focus:border-ink" />
        </label>
        <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Email
          <input name="email" type="email" required maxLength={254} autoComplete="email" className="mt-2 min-h-12 w-full rounded-sm border border-border bg-canvas px-4 text-sm text-ink outline-none focus:border-ink" />
        </label>
      </div>
      <fieldset className="mt-6">
        <legend className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Elige al menos un tema</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {interests.map(([value, label]) => <label key={value} className="flex min-h-12 items-center gap-3 rounded-sm border border-border bg-canvas px-4 text-sm text-ink"><input type="checkbox" name="interests" value={value} className="h-4 w-4 accent-ink" /> {label}</label>)}
        </div>
      </fieldset>
      <label className="mt-6 flex items-start gap-3 text-xs leading-5 !text-ink/70">
        <input type="checkbox" name="consent" value="accepted" required className="mt-0.5 h-4 w-4 shrink-0 accent-ink" />
        <span>Acepto recibir el Brief NOAM y el tratamiento de mi email para este fin. Puedo cancelar cuando quiera. Consulta la <NextLink href="/privacy" className="font-medium !text-ink underline decoration-border underline-offset-4 hover:decoration-ink">política de privacidad</NextLink>.</span>
      </label>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-lg text-[11px] leading-5 text-muted">Enviaremos un enlace para confirmar la dirección. Sin confirmación no se activa la suscripción.</p>
        <Button type="submit" className="min-h-12 shrink-0 gap-2 rounded-full">Solicitar suscripción <ArrowRight className="h-4 w-4" /></Button>
      </div>
    </form>
  );
}

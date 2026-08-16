import { notFound, redirect } from "next/navigation";
import { ArrowLeft, CalendarClock, Send } from "lucide-react";
import { Badge, Button, Card, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { canAdminOperate, getAdminPrincipal } from "@/lib/admin-auth";
import { hasOutboundEmailConfig } from "@/lib/env";
import { getNewsletterSegmentCount } from "@/lib/newsletter";
import { getNewsletterCampaign } from "@/lib/newsletter-campaigns";
import {
  cancelNewsletterCampaignAction,
  dispatchNewsletterCampaignAction,
  retryNewsletterCampaignFailuresAction,
  scheduleNewsletterCampaignAction,
  updateNewsletterCampaignAction
} from "@/app/admin/audience/campaigns/actions";

const statusLabels = { draft: "Borrador", scheduled: "Programada", sending: "Enviando", sent: "Enviada", cancelled: "Cancelada" } as const;
const interestLabels = { "gestion-publica": "Gestión pública", electoral: "Electoral", "datos-ia": "Datos e IA" } as const;
const fieldClass = "min-h-11 w-full rounded-sm border border-border bg-canvas px-3 text-sm text-ink outline-none focus:border-ink disabled:cursor-not-allowed disabled:opacity-60";

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("es-PE", { dateStyle: "long", timeStyle: "short", timeZone: "America/Lima" }).format(new Date(value));
}

interface CampaignPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string; updated?: string; scheduled?: string; cancelled?: string; sent?: string; failed?: string; retried?: string; retryFailed?: string; skipped?: string; error?: string }>;
}

export default async function NewsletterCampaignPage({ params, searchParams }: CampaignPageProps) {
  const principal = await getAdminPrincipal();
  if (!principal || !["owner", "editor"].includes(principal.role) || !canAdminOperate(principal)) redirect("/admin/security?error=security-required");
  const { id } = await params;
  const campaign = await getNewsletterCampaign(id);
  if (!campaign) notFound();
  const [segmentSize, query] = await Promise.all([getNewsletterSegmentCount(campaign.audienceInterests), searchParams]);
  const editable = campaign.status === "draft" || campaign.status === "scheduled";
  const notice = query.sent !== undefined
    ? `Envío cerrado: ${query.sent} entregas aceptadas y ${query.failed ?? "0"} fallidas.`
    : query.retried !== undefined
      ? `Reintento cerrado: ${query.retried} recuperadas, ${query.retryFailed ?? "0"} fallidas y ${query.skipped ?? "0"} omitidas.`
    : query.error === "email"
      ? "El envío está bloqueado hasta configurar y verificar el remitente de correo."
      : query.error === "confirm"
        ? "Debes confirmar expresamente el envío."
        : query.error === "confirm-retry"
          ? "Debes confirmar expresamente el reintento."
        : query.scheduled ? "La edición quedó programada." : query.cancelled ? "La edición fue cancelada." : query.updated ? "Cambios guardados sin enviar." : query.created ? "Borrador creado. Revísalo antes de programar o enviar." : null;

  return <Section className="pt-14 md:pt-20"><Container>
    <Button href="/admin/audience/campaigns" variant="ghost" className="mb-8 gap-2"><ArrowLeft className="h-4 w-4" /> Volver a campañas</Button>
    <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end"><div><div className="mb-4 flex flex-wrap gap-2"><Badge>{statusLabels[campaign.status]}</Badge>{campaign.audienceInterests.length ? campaign.audienceInterests.map((interest) => <Badge key={interest}>{interestLabels[interest]}</Badge>) : <Badge>Todos los activos</Badge>}</div><Eyebrow>Brief NOAM · {campaign.slug}</Eyebrow><Heading as="h1" size="xl">{campaign.title}</Heading></div><p className="text-sm text-muted">Segmento actual: hasta {segmentSize} suscriptores activos</p></div>
    {notice ? <p role="status" className="mt-8 rounded-sm border border-border bg-panel px-4 py-3 text-sm text-ink/75">{notice}</p> : null}

    <div className="mt-12 grid gap-10 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-8">
        <Card><h2 className="text-xl font-medium tracking-[-0.02em] text-ink">Contenido</h2><form action={updateNewsletterCampaignAction} className="mt-7 grid gap-5"><input type="hidden" name="campaignId" value={campaign.id} />
          <label className="grid gap-2 text-sm font-medium">Slug<input name="slug" required defaultValue={campaign.slug} disabled={!editable} className={fieldClass} /></label>
          <label className="grid gap-2 text-sm font-medium">Asunto<input name="subject" required defaultValue={campaign.subject} disabled={!editable} className={fieldClass} /></label>
          <label className="grid gap-2 text-sm font-medium">Preencabezado<input name="previewText" defaultValue={campaign.previewText} disabled={!editable} className={fieldClass} /></label>
          <label className="grid gap-2 text-sm font-medium">Título<input name="title" required defaultValue={campaign.title} disabled={!editable} className={fieldClass} /></label>
          <label className="grid gap-2 text-sm font-medium">Cuerpo<textarea name="bodyText" required minLength={40} rows={12} defaultValue={campaign.bodyText} disabled={!editable} className={`${fieldClass} py-3 leading-6`} /></label>
          <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-medium">CTA<input name="ctaLabel" defaultValue={campaign.ctaLabel ?? ""} disabled={!editable} className={fieldClass} /></label><label className="grid gap-2 text-sm font-medium">URL<input name="ctaUrl" defaultValue={campaign.ctaUrl ?? ""} disabled={!editable} className={fieldClass} /></label></div>
          <fieldset disabled={!editable}><legend className="text-sm font-medium">Segmento</legend><p className="mt-1 text-xs text-muted">Sin selección: todos los suscriptores activos.</p><div className="mt-3 flex flex-wrap gap-4">{Object.entries(interestLabels).map(([value, label]) => <label key={value} className="flex items-center gap-2 text-sm"><input type="checkbox" name="audienceInterests" value={value} defaultChecked={campaign.audienceInterests.includes(value as keyof typeof interestLabels)} className="h-4 w-4 accent-ink" />{label}</label>)}</div></fieldset>
          {editable ? <Button type="submit">Guardar cambios</Button> : <p className="text-xs leading-5 text-muted">Una edición enviada o cancelada queda inmutable como evidencia operativa.</p>}
        </form></Card>

        {editable ? <Card><div className="flex items-center gap-3"><CalendarClock className="h-5 w-5 text-rust" /><h2 className="text-lg font-medium">Programación</h2></div><p className="mt-3 text-sm leading-6 text-muted">La hora se interpreta en Lima. Programar no envía hasta ejecutar el despachador.</p><form action={scheduleNewsletterCampaignAction} className="mt-5 flex flex-col gap-3 sm:flex-row"><input type="hidden" name="campaignId" value={campaign.id} /><input type="datetime-local" name="scheduledAt" required className={fieldClass} /><Button type="submit" variant="secondary">Programar</Button></form>{campaign.scheduledAt ? <p className="mt-4 text-xs text-muted">Programada para {formatDate(campaign.scheduledAt)}</p> : null}<form action={cancelNewsletterCampaignAction} className="mt-5"><input type="hidden" name="campaignId" value={campaign.id} /><Button type="submit" variant="ghost">Cancelar edición</Button></form></Card> : null}

        {editable ? <Card className="border-rust/30"><div className="flex items-center gap-3"><Send className="h-5 w-5 text-rust" /><h2 className="text-lg font-medium">Enviar ahora</h2></div><p className="mt-3 text-sm leading-6 text-muted">Acción irreversible. Sólo incluye suscriptores activos al momento del despacho y registra cada resultado.</p><p className="mt-3 text-xs font-medium text-ink">Correo saliente: {hasOutboundEmailConfig() ? "configurado" : "no configurado"}</p>{hasOutboundEmailConfig() ? <form action={dispatchNewsletterCampaignAction} className="mt-5 grid gap-4"><input type="hidden" name="campaignId" value={campaign.id} /><label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" name="confirmSend" required className="mt-1 h-4 w-4 accent-ink" />Confirmo que revisé asunto, contenido, enlaces y segmento.</label><Button type="submit">Enviar a {segmentSize} activos</Button></form> : <p className="mt-5 rounded-sm border border-border bg-canvas px-4 py-3 text-sm text-muted">Configura Resend y un remitente verificado para habilitar el despacho.</p>}</Card> : null}
      </div>

      <div className="space-y-8"><div><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Previsualización editorial</p><article className="overflow-hidden rounded-md border border-border bg-[#f2f0e9] shadow-subtle"><div className="border-b border-border bg-panel px-6 py-4"><p className="text-xs text-muted">Asunto: <span className="text-ink">{campaign.subject}</span></p><p className="mt-1 text-xs text-muted">Preencabezado: {campaign.previewText || "Sin preencabezado"}</p></div><div className="mx-auto max-w-[680px] px-7 py-12 md:px-12 md:py-16"><p className="text-sm font-semibold tracking-[0.16em] text-ink">NOAM</p><p className="mt-12 text-sm text-muted">Hola:</p><h2 className="mt-6 text-4xl font-medium leading-[1.08] tracking-[-0.04em] text-ink">{campaign.title}</h2><div className="mt-8 space-y-5">{campaign.bodyText.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index} className="whitespace-pre-line text-base leading-7 text-ink/85">{paragraph}</p>)}</div>{campaign.ctaLabel && campaign.ctaUrl ? <span className="mt-9 inline-flex rounded-sm bg-ink px-5 py-3 text-sm font-medium text-canvas">{campaign.ctaLabel}</span> : null}<div className="mt-14 border-t border-border pt-5 text-xs leading-5 text-muted"><p>Recibes este mensaje porque confirmaste tu suscripción al Brief NOAM.</p><p className="mt-2 underline">Cancelar suscripción</p></div></div></article></div>
        <Card><h2 className="text-base font-medium">Resultado</h2><dl className="mt-5 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-muted">Enviados</dt><dd className="mt-1 text-2xl font-medium">{campaign.recipientCounts.sent}</dd></div><div><dt className="text-muted">Fallidos</dt><dd className="mt-1 text-2xl font-medium">{campaign.recipientCounts.failed}</dd></div><div><dt className="text-muted">Bajas</dt><dd className="mt-1 text-2xl font-medium">{campaign.recipientCounts.unsubscribed}</dd></div><div><dt className="text-muted">Enviada</dt><dd className="mt-1 text-xs leading-5">{formatDate(campaign.sentAt)}</dd></div></dl></Card>
        {campaign.status === "sent" && campaign.recipientCounts.failed > 0 ? <Card><h2 className="text-base font-medium">Recuperar entregas fallidas</h2><p className="mt-3 text-sm leading-6 text-muted">Sólo reintenta destinatarios fallidos que continúan activos. No repite correos ya enviados.</p>{hasOutboundEmailConfig() ? <form action={retryNewsletterCampaignFailuresAction} className="mt-5 grid gap-4"><input type="hidden" name="campaignId" value={campaign.id} /><label className="flex items-start gap-3 text-sm"><input type="checkbox" name="confirmRetry" required className="mt-0.5 h-4 w-4 accent-ink" />Confirmo el reintento de {campaign.recipientCounts.failed} entregas.</label><Button type="submit" variant="secondary">Reintentar fallidos</Button></form> : <p className="mt-4 text-sm text-muted">Correo saliente no configurado.</p>}</Card> : null}
      </div>
    </div>
  </Container></Section>;
}

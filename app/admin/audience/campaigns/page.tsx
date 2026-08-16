import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, MailPlus } from "lucide-react";
import { Badge, Button, Card, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { canAdminOperate, getAdminPrincipal } from "@/lib/admin-auth";
import { getNewsletterCampaigns } from "@/lib/newsletter-campaigns";
import { createNewsletterCampaignAction } from "@/app/admin/audience/campaigns/actions";

const statusLabels = { draft: "Borrador", scheduled: "Programada", sending: "Enviando", sent: "Enviada", cancelled: "Cancelada" } as const;
const interestLabels = { "gestion-publica": "Gestión pública", electoral: "Electoral", "datos-ia": "Datos e IA" } as const;
const fieldClass = "min-h-11 w-full rounded-sm border border-border bg-canvas px-3 text-sm text-ink outline-none focus:border-ink";

function formatDate(value: string | null) {
  if (!value) return "Sin fecha";
  return new Intl.DateTimeFormat("es-PE", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Lima" }).format(new Date(value));
}

export default async function NewsletterCampaignsPage() {
  const principal = await getAdminPrincipal();
  if (!principal || !["owner", "editor"].includes(principal.role) || !canAdminOperate(principal)) redirect("/admin/security?error=security-required");
  const campaigns = await getNewsletterCampaigns();

  return <Section className="pt-14 md:pt-20"><Container>
    <Button href="/admin/audience" variant="ghost" className="mb-8 gap-2"><ArrowLeft className="h-4 w-4" /> Volver a audiencia</Button>
    <div className="grid gap-6 md:grid-cols-[1fr_0.55fr] md:items-end"><div><Eyebrow>NOAM OS · Ediciones</Eyebrow><Heading as="h1" size="xl">Campañas del Brief.</Heading></div><p className="text-sm leading-6 text-ink/65">Cada envío conserva segmento, estado y resultado por destinatario. Guardar nunca envía correo.</p></div>

    <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <Card className="h-fit"><div className="flex items-center gap-3"><MailPlus className="h-5 w-5 text-rust" /><h2 className="text-xl font-medium tracking-[-0.02em] text-ink">Nueva edición</h2></div>
        <form action={createNewsletterCampaignAction} className="mt-7 grid gap-5">
          <label className="grid gap-2 text-sm font-medium">Slug<input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="brief-noam-001" className={fieldClass} /></label>
          <label className="grid gap-2 text-sm font-medium">Asunto<input name="subject" required minLength={5} maxLength={160} placeholder="Tres señales para decidir mejor" className={fieldClass} /></label>
          <label className="grid gap-2 text-sm font-medium">Preencabezado<input name="previewText" maxLength={240} placeholder="Datos, contexto y una herramienta aplicable." className={fieldClass} /></label>
          <label className="grid gap-2 text-sm font-medium">Título<input name="title" required minLength={5} maxLength={180} className={fieldClass} /></label>
          <label className="grid gap-2 text-sm font-medium">Cuerpo<textarea name="bodyText" required minLength={40} rows={10} className={`${fieldClass} py-3 leading-6`} placeholder="Escribe párrafos breves separados por una línea en blanco." /></label>
          <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-medium">CTA<input name="ctaLabel" maxLength={80} placeholder="Explorar el análisis" className={fieldClass} /></label><label className="grid gap-2 text-sm font-medium">URL del CTA<input name="ctaUrl" maxLength={500} placeholder="/insights/..." className={fieldClass} /></label></div>
          <fieldset><legend className="text-sm font-medium">Segmento</legend><p className="mt-1 text-xs leading-5 text-muted">Sin selección: todos los suscriptores activos.</p><div className="mt-3 flex flex-wrap gap-4">{Object.entries(interestLabels).map(([value, label]) => <label key={value} className="flex items-center gap-2 text-sm"><input type="checkbox" name="audienceInterests" value={value} className="h-4 w-4 accent-ink" />{label}</label>)}</div></fieldset>
          <Button type="submit">Crear borrador</Button>
        </form>
      </Card>

      <div><h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Ediciones recientes</h2><div className="space-y-3">{campaigns.length ? campaigns.map((campaign) => <Link key={campaign.id} href={`/admin/audience/campaigns/${campaign.id}`} className="group block rounded-md border border-border bg-panel p-5 transition-colors duration-200 hover:border-border-strong"><div className="flex items-start justify-between gap-5"><div><div className="flex flex-wrap gap-2"><Badge>{statusLabels[campaign.status]}</Badge>{campaign.audienceInterests.length ? campaign.audienceInterests.map((interest) => <Badge key={interest}>{interestLabels[interest]}</Badge>) : <Badge>Todos</Badge>}</div><h3 className="mt-4 text-lg font-medium tracking-[-0.02em] text-ink">{campaign.title}</h3><p className="mt-2 text-sm text-muted">{campaign.subject}</p><p className="mt-4 text-xs text-muted">{campaign.status === "scheduled" ? `Programada: ${formatDate(campaign.scheduledAt)}` : `Actualizada: ${formatDate(campaign.updatedAt)}`} · {campaign.recipientCounts.sent} enviados · {campaign.recipientCounts.failed} fallidos</p></div><ArrowRight className="mt-1 h-4 w-4 text-muted transition-transform group-hover:translate-x-1" /></div></Link>) : <Card><p className="text-sm text-muted">Todavía no hay ediciones. Crea el primer borrador sin riesgo de envío.</p></Card>}</div></div>
    </div>
  </Container></Section>;
}

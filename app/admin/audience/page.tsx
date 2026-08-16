import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge, Button, Card, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getNewsletterAudience, getNewsletterAudienceSummary } from "@/lib/newsletter";

const interestLabels = { "gestion-publica": "Gestión pública", electoral: "Electoral", "datos-ia": "Datos e IA" } as const;
const statusLabels = { pending: "Pendiente", active: "Activo", unsubscribed: "Baja" } as const;

export default async function AudiencePage() {
  if (!(await isAdminAuthenticated(["owner", "editor"], true))) redirect("/admin/login");
  const [subscribers, summary] = await Promise.all([getNewsletterAudience(), getNewsletterAudienceSummary()]);
  return (
    <Section className="pt-14 md:pt-20"><Container>
      <div className="mb-8 flex flex-wrap gap-3"><Button href="/admin" variant="ghost" className="gap-2"><ArrowLeft className="h-4 w-4" /> Volver al panel</Button><Button href="/admin/audience/campaigns" variant="secondary">Gestionar campañas</Button></div>
      <div className="grid gap-6 md:grid-cols-[1fr_0.55fr] md:items-end"><div><Eyebrow>NOAM OS · Audiencia</Eyebrow><Heading as="h1" size="xl">Brief NOAM.</Heading></div><p className="text-sm leading-6 text-ink/65">Direcciones con consentimiento registrado. Sólo el estado activo puede recibir ediciones.</p></div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
        ["Total", summary.total], ["Activos", summary.active], ["Pendientes", summary.pending], ["Bajas", summary.unsubscribed]
      ].map(([label, value]) => <Card key={label}><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">{label}</p><p className="mt-4 text-4xl font-medium tracking-[-0.04em] text-ink">{value}</p></Card>)}</div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">{summary.byInterest.map((item) => <Card key={item.interest}><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">{interestLabels[item.interest]}</p><p className="mt-3 text-2xl font-medium text-ink">{item.count}</p><p className="mt-2 text-xs text-muted">suscriptores activos</p></Card>)}</div>
      <div className="mt-12 overflow-hidden rounded-md border border-border bg-panel"><div className="border-b border-border px-5 py-4"><h2 className="text-base font-medium text-ink">Solicitudes recientes</h2></div><div className="divide-y divide-border">{subscribers.length ? subscribers.map((subscriber) => <article key={subscriber.id} className="grid gap-4 px-5 py-5 md:grid-cols-[1fr_auto]"><div><div className="flex flex-wrap items-center gap-2"><p className="font-medium text-ink">{subscriber.name || "Sin nombre"}</p><Badge>{statusLabels[subscriber.status]}</Badge>{subscriber.interests.map((interest) => <Badge key={interest}>{interestLabels[interest]}</Badge>)}</div><p className="mt-2 text-sm text-muted">{subscriber.email}</p><p className="mt-2 font-mono text-[10px] text-muted">Origen: {subscriber.sourcePath}</p></div><time className="text-xs text-muted" dateTime={subscriber.updatedAt}>{new Intl.DateTimeFormat("es-PE", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(subscriber.updatedAt))}</time></article>) : <p className="px-5 py-8 text-sm text-muted">Todavía no hay solicitudes editoriales.</p>}</div></div>
    </Container></Section>
  );
}

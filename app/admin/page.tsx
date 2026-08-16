import { redirect } from "next/navigation";
import { Badge, Button, Card, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { canAdminOperate, getAdminPrincipal } from "@/lib/admin-auth";
import { logoutAdmin } from "@/app/admin/login/actions";
import { getCommercialSummary } from "@/lib/commercial";
import { hasDatabaseConfig, hasEmailConfig } from "@/lib/env";
import { leadLabels } from "@/lib/lead-options";
import { getLeads } from "@/lib/leads";
import { getNewsletterAudienceSummary } from "@/lib/newsletter";

export default async function AdminPage() {
  const principal = await getAdminPrincipal();

  if (!principal) {
    redirect("/admin/login");
  }

  const canOperate = (principal.role === "owner" || principal.role === "editor") && canAdminOperate(principal);
  const [leads, commercial, audience] = await Promise.all([canOperate ? getLeads() : Promise.resolve([]), getCommercialSummary(), getNewsletterAudienceSummary()]);
  const newLeads = leads.filter((lead) => lead.status === "new").length;

  return (
    <Section className="pt-16 md:pt-20">
      <Container>
        <Eyebrow>NOAM OS</Eyebrow>
        <Heading as="h1" size="xl" className="mb-4">
          Panel operativo
        </Heading>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-ink/75">
              Centro interno para monitorear demanda, operación comercial, productos, analítica y estado de infraestructura.
        </p>
        <div className="mb-8 flex flex-wrap gap-3">
          {canOperate ? <Button href="/admin/products" variant="secondary">
            Catalogo operativo
          </Button> : null}
          {canOperate ? <Button href="/admin/commercial" variant="secondary">
            Comercial
          </Button> : null}
          <Button href="/admin/analytics" variant="secondary">
            Analítica
          </Button>
          {canOperate ? <Button href="/admin/audience" variant="secondary">
            Audiencia
          </Button> : null}
          {canOperate ? <Button href="/admin/audience/campaigns" variant="secondary">
            Campañas
          </Button> : null}
          <Button href="/admin/security" variant="secondary">Seguridad</Button>
          <Button href="/products" variant="ghost">
            Ver sitio publico
          </Button>
          <form action={logoutAdmin}><Button type="submit" variant="ghost">Cerrar sesión</Button></form>
        </div>
        <p className="mb-8 text-xs text-muted">Sesión: {principal.displayName} · {principal.role} · {principal.authMode}</p>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Leads totales</p>
            <p className="mt-3 text-3xl font-medium text-ink">{leads.length}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Nuevos</p>
            <p className="mt-3 text-3xl font-medium text-ink">{newLeads}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Datos</p>
            <p className="mt-3 text-sm font-medium text-ink">
              {hasDatabaseConfig() ? "Postgres configurado" : "Fallback local activo"}
            </p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Email</p>
            <p className="mt-3 text-sm font-medium text-ink">
              {hasEmailConfig() ? "Resend activo" : "Sin notificaciones"}
            </p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Brief activo</p>
            <p className="mt-3 text-3xl font-medium text-ink">{audience.active}</p>
          </Card>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-4">
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Clientes</p>
            <p className="mt-3 text-3xl font-medium text-ink">{commercial.clients}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Propuestas</p>
            <p className="mt-3 text-3xl font-medium text-ink">{commercial.proposals}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Pipeline</p>
            <p className="mt-3 text-sm font-medium text-ink">
              {new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", maximumFractionDigits: 0 }).format(commercial.pendingRevenue)}
            </p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Cerrado</p>
            <p className="mt-3 text-sm font-medium text-ink">
              {new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", maximumFractionDigits: 0 }).format(commercial.acceptedRevenue)}
            </p>
          </Card>
        </div>

        <div className="overflow-hidden rounded-md border border-border bg-panel">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-base font-medium text-ink">Solicitudes recientes</h2>
          </div>
          <div className="divide-y divide-border">
            {leads.length ? (
              leads.map((lead) => (
                <article key={lead.id} className="grid gap-3 px-5 py-4 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <p className="font-medium text-ink">{lead.name}</p>
                      <Badge>{leadLabels.interest(lead.interest)}</Badge>
                    </div>
                    <p className="text-sm text-muted">{lead.email}</p>
                    {lead.organization ? <p className="text-sm text-muted">{lead.organization}{lead.role ? ` · ${lead.role}` : ""}</p> : null}
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
                      <span>{leadLabels.organizationType(lead.organization_type)}</span>
                      {lead.territory ? <span>Territorio: {lead.territory}</span> : null}
                      <span>Plazo: {leadLabels.timeline(lead.timeline)}</span>
                      <span>Rango: {leadLabels.budgetRange(lead.budget_range)}</span>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/80">{lead.message}</p>
                    {lead.origin_path ? <p className="mt-3 font-mono text-[10px] text-muted">Origen: {lead.origin_path}</p> : null}
                  </div>
                  <time className="text-xs text-muted" dateTime={lead.created_at}>
                    {new Intl.DateTimeFormat("es-PE", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit"
                    }).format(new Date(lead.created_at))}
                  </time>
                </article>
              ))
            ) : (
              <p className="px-5 py-8 text-sm text-muted">Todavía no hay solicitudes registradas.</p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

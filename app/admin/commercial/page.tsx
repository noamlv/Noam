import { redirect } from "next/navigation";
import { Badge, Button, Card, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { createClientAction, createProposalAction } from "@/app/admin/commercial/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getClients, getCommercialSummary, getProposals } from "@/lib/commercial";
import { platformCatalog } from "@/lib/platform-catalog";

interface AdminCommercialPageProps {
  searchParams: Promise<{ created?: string }>;
}

function money(value: number) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0
  }).format(value);
}

export default async function AdminCommercialPage({ searchParams }: AdminCommercialPageProps) {
  const authenticated = await isAdminAuthenticated(["owner", "editor"], true);

  if (!authenticated) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const [summary, clients, proposals] = await Promise.all([getCommercialSummary(), getClients(), getProposals()]);

  return (
    <Section className="pt-16 md:pt-20">
      <Container>
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>NOAM OS</Eyebrow>
            <Heading as="h1" size="xl" className="mb-4">
              Comercial
            </Heading>
            <p className="max-w-2xl text-sm leading-relaxed text-ink/75">
              Sistema interno para gestionar clientes, propuestas, cotizaciones, cobros, pagos, proyectos, entregables y accesos privados.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/admin" variant="secondary">
              Panel
            </Button>
            <Button href="/contact" variant="ghost">
              Formulario publico
            </Button>
          </div>
        </div>

        {params.created ? (
          <div className="mb-8 rounded-md border border-border bg-panel px-4 py-3 text-sm text-ink/80">
            Registro creado correctamente: <span className="font-medium text-ink">{params.created}</span>.
          </div>
        ) : null}

        <div className="mb-10 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Card className="lg:col-span-1">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Clientes</p>
            <p className="mt-3 text-3xl font-medium text-ink">{summary.clients}</p>
          </Card>
          <Card className="lg:col-span-1">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Activos</p>
            <p className="mt-3 text-3xl font-medium text-ink">{summary.activeClients}</p>
          </Card>
          <Card className="lg:col-span-1">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Propuestas</p>
            <p className="mt-3 text-3xl font-medium text-ink">{summary.proposals}</p>
          </Card>
          <Card className="lg:col-span-1">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Abiertas</p>
            <p className="mt-3 text-3xl font-medium text-ink">{summary.openProposals}</p>
          </Card>
          <Card className="lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Pipeline</p>
            <p className="mt-3 text-3xl font-medium text-ink">{money(summary.pendingRevenue)}</p>
            <p className="mt-2 text-xs text-muted">Aceptado: {money(summary.acceptedRevenue)}</p>
          </Card>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">Nuevo cliente</h2>
            <form action={createClientAction} className="mt-6 grid gap-4">
              <label className="grid gap-1 text-sm font-medium text-ink">
                Nombre
                <input name="name" required className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
              </label>
              <label className="grid gap-1 text-sm font-medium text-ink">
                Organización
                <input name="organization" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Email
                  <input name="email" type="email" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                </label>
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Teléfono
                  <input name="phone" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <label className="grid gap-1 text-sm font-medium text-ink">
                  País
                  <input name="country" defaultValue="Peru" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                </label>
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Segmento
                  <select name="segment" defaultValue="consulting" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink">
                    <option value="consulting">Consultoría</option>
                    <option value="government">Gobierno</option>
                    <option value="investment">Inversión</option>
                    <option value="media">Medios</option>
                    <option value="academic">Academia</option>
                  </select>
                </label>
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Estado
                  <select name="status" defaultValue="active" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink">
                    <option value="active">Activo</option>
                    <option value="lead">Prospecto</option>
                    <option value="paused">Pausado</option>
                    <option value="archived">Archivado</option>
                  </select>
                </label>
              </div>
              <label className="grid gap-1 text-sm font-medium text-ink">
                Notas
                <textarea name="notes" rows={3} className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
              </label>
              <Button type="submit">Crear cliente</Button>
            </form>
          </Card>

          <Card>
            <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">Nueva propuesta</h2>
            <form action={createProposalAction} className="mt-6 grid gap-4">
              <label className="grid gap-1 text-sm font-medium text-ink">
                Cliente
                <select name="clientId" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink">
                  <option value="">Sin cliente asignado</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-sm font-medium text-ink">
                Título
                <input name="title" required className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
              </label>
              <label className="grid gap-1 text-sm font-medium text-ink">
                Resumen
                <textarea name="summary" required rows={4} className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Servicio/producto
                  <select name="serviceSlug" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink">
                    <option value="">Por definir</option>
                    {platformCatalog.map((product) => (
                      <option key={product.slug} value={product.slug}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Estado
                  <select name="status" defaultValue="draft" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink">
                    <option value="draft">Borrador</option>
                    <option value="sent">Enviada</option>
                    <option value="accepted">Aceptada</option>
                    <option value="rejected">Rechazada</option>
                    <option value="expired">Expirada</option>
                  </select>
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Monto
                  <input name="amount" type="number" min="0" step="0.01" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                </label>
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Moneda
                  <input name="currency" defaultValue="PEN" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                </label>
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Válida hasta
                  <input name="validUntil" type="date" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                </label>
              </div>
              <Button type="submit">Crear propuesta</Button>
            </form>
          </Card>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="overflow-hidden rounded-md border border-border bg-panel">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-base font-medium text-ink">Clientes recientes</h2>
            </div>
            <div className="divide-y divide-border">
              {clients.length ? (
                clients.slice(0, 8).map((client) => (
                  <article key={client.id} className="px-5 py-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <p className="font-medium text-ink">{client.name}</p>
                      <Badge>{client.status}</Badge>
                    </div>
                    {client.organization ? <p className="text-sm text-muted">{client.organization}</p> : null}
                    {client.email ? <p className="text-sm text-muted">{client.email}</p> : null}
                    <div className="mt-4">
                      <Button href={`/admin/commercial/clients/${client.id}`} variant="secondary" className="px-3 py-2 text-xs">
                        Ver cliente
                      </Button>
                    </div>
                  </article>
                ))
              ) : (
                <p className="px-5 py-8 text-sm text-muted">Todavía no hay clientes.</p>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-border bg-panel">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-base font-medium text-ink">Propuestas recientes</h2>
            </div>
            <div className="divide-y divide-border">
              {proposals.length ? (
                proposals.slice(0, 8).map((proposal) => (
                  <article key={proposal.id} className="px-5 py-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <p className="font-medium text-ink">{proposal.title}</p>
                      <Badge>{proposal.status}</Badge>
                    </div>
                    <p className="text-sm text-muted">{proposal.client_name ?? "Sin cliente asignado"}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink/75">{proposal.summary}</p>
                    {proposal.amount ? <p className="mt-3 text-sm font-medium text-ink">{proposal.currency} {proposal.amount}</p> : null}
                    <div className="mt-4">
                      <Button href={`/admin/commercial/proposals/${proposal.id}`} variant="secondary" className="px-3 py-2 text-xs">
                        Operar propuesta
                      </Button>
                    </div>
                  </article>
                ))
              ) : (
                <p className="px-5 py-8 text-sm text-muted">Todavía no hay propuestas.</p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

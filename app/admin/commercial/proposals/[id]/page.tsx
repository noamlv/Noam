import { notFound, redirect } from "next/navigation";
import { Badge, Button, Card, Container, Eyebrow, Heading, Section } from "@/components/ui";
import {
  createDeliverableAction,
  createInvoiceAction,
  createManualPaymentAction,
  createProjectAction,
  createQuoteAction,
  updateProposalStatusAction
} from "@/app/admin/commercial/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getProposalOperations } from "@/lib/commercial";
import { statusLabel } from "@/lib/format";

interface ProposalOpsPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string; updated?: string }>;
}

function money(value: string | number | null, currency = "PEN") {
  const amount = typeof value === "string" ? Number(value) : value ?? 0;

  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(Number.isFinite(amount) ? amount : 0);
}

function dateLabel(value: string | null) {
  if (!value) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

export default async function ProposalOpsPage({ params, searchParams }: ProposalOpsPageProps) {
  const authenticated = await isAdminAuthenticated(["owner", "editor"], true);

  if (!authenticated) {
    redirect("/admin/login");
  }

  const [{ id }, noticeParams] = await Promise.all([params, searchParams]);
  const operations = await getProposalOperations(id);

  if (!operations) {
    notFound();
  }

  const { proposal, quotes, invoices, payments, projects, deliverables } = operations;
  const defaultAmount = proposal.amount ?? "0";
  const latestInvoice = invoices[0];

  return (
    <Section className="pt-16 md:pt-20">
      <Container>
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Operación comercial</Eyebrow>
            <Heading as="h1" size="xl" className="mb-4">
              {proposal.title}
            </Heading>
            <p className="max-w-2xl text-sm leading-relaxed text-ink/75">{proposal.summary}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/admin/commercial" variant="secondary">
              Comercial
            </Button>
            <Button href="/admin" variant="ghost">
              Panel
            </Button>
          </div>
        </div>

        {noticeParams.created || noticeParams.updated ? (
          <div className="mb-8 rounded-md border border-border bg-panel px-4 py-3 text-sm text-ink/80">
            Operación registrada: <span className="font-medium text-ink">{noticeParams.created ?? noticeParams.updated}</span>.
          </div>
        ) : null}

        <div className="mb-10 grid gap-4 md:grid-cols-4">
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Cliente</p>
            <p className="mt-3 text-sm font-medium text-ink">{proposal.client_name ?? "Sin cliente"}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Estado</p>
            <p className="mt-3 text-sm font-medium text-ink">{statusLabel(proposal.status)}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Monto</p>
            <p className="mt-3 text-sm font-medium text-ink">{money(proposal.amount, proposal.currency)}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Validez</p>
            <p className="mt-3 text-sm font-medium text-ink">{dateLabel(proposal.valid_until)}</p>
          </Card>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <Card>
              <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">Estado de propuesta</h2>
              <form action={updateProposalStatusAction} className="mt-5 grid gap-4">
                <input type="hidden" name="proposalId" value={proposal.id} />
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Estado
                  <select name="status" defaultValue={proposal.status} className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink">
                    <option value="draft">Borrador</option>
                    <option value="sent">Enviada</option>
                    <option value="accepted">Aceptada</option>
                    <option value="rejected">Rechazada</option>
                    <option value="expired">Expirada</option>
                  </select>
                </label>
                <Button type="submit">Actualizar estado</Button>
              </form>
            </Card>

            <Card>
              <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">Generar cotización</h2>
              <form action={createQuoteAction} className="mt-5 grid gap-4">
                <input type="hidden" name="proposalId" value={proposal.id} />
                <div className="grid gap-4 md:grid-cols-3">
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Subtotal
                    <input name="subtotal" type="number" min="0" step="0.01" defaultValue={defaultAmount} className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                  </label>
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Impuesto
                    <input name="tax" type="number" min="0" step="0.01" defaultValue="0" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                  </label>
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Moneda
                    <input name="currency" defaultValue={proposal.currency} className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                  </label>
                </div>
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Vence
                  <input name="dueAt" type="date" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                </label>
                <Button type="submit">Emitir cotización</Button>
              </form>
            </Card>

            <Card>
              <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">Crear documento de cobro</h2>
              <form action={createInvoiceAction} className="mt-5 grid gap-4">
                <input type="hidden" name="proposalId" value={proposal.id} />
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Número interno u oficial
                  <input name="invoiceNumber" placeholder="Opcional" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                </label>
                <div className="grid gap-4 md:grid-cols-3">
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Subtotal
                    <input name="subtotal" type="number" min="0" step="0.01" defaultValue={defaultAmount} className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                  </label>
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Impuesto
                    <input name="tax" type="number" min="0" step="0.01" defaultValue="0" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                  </label>
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Moneda
                    <input name="currency" defaultValue={proposal.currency} className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                  </label>
                </div>
                <label className="grid gap-1 text-sm font-medium text-ink">
                  URL comprobante oficial
                  <input name="officialDocumentUrl" placeholder="Opcional" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                </label>
                <Button type="submit">Crear documento</Button>
              </form>
            </Card>

            <Card>
              <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">Registrar pago manual</h2>
              {invoices.length ? (
                <form action={createManualPaymentAction} className="mt-5 grid gap-4">
                  <input type="hidden" name="proposalId" value={proposal.id} />
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Documento de cobro
                    <select name="invoiceId" defaultValue={latestInvoice?.id} className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink">
                      {invoices.map((invoice) => (
                        <option key={invoice.id} value={invoice.id}>
                          {invoice.invoice_number ?? invoice.id.slice(0, 8)} - {money(invoice.total, invoice.currency)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="grid gap-4 md:grid-cols-3">
                    <label className="grid gap-1 text-sm font-medium text-ink">
                      Monto
                      <input name="amount" type="number" min="0" step="0.01" defaultValue={latestInvoice?.total ?? defaultAmount} className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                    </label>
                    <label className="grid gap-1 text-sm font-medium text-ink">
                      Moneda
                      <input name="currency" defaultValue={latestInvoice?.currency ?? proposal.currency} className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                    </label>
                    <label className="grid gap-1 text-sm font-medium text-ink">
                      Estado
                      <select name="status" defaultValue="paid" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink">
                        <option value="paid">Pagado</option>
                        <option value="pending">Pendiente</option>
                        <option value="failed">Fallido</option>
                        <option value="refunded">Reembolsado</option>
                      </select>
                    </label>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="grid gap-1 text-sm font-medium text-ink">
                      Método
                      <input name="provider" defaultValue="manual" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                    </label>
                    <label className="grid gap-1 text-sm font-medium text-ink">
                      Referencia
                      <input name="providerReference" placeholder="Transferencia, Yape, banco, etc." className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                    </label>
                  </div>
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Fecha de pago
                    <input name="paidAt" type="datetime-local" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                  </label>
                  <Button type="submit">Registrar pago</Button>
                </form>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-muted">Crea primero un documento de cobro para poder registrar pagos.</p>
              )}
            </Card>
          </div>

          <div className="space-y-5">
            <Card>
              <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">Crear proyecto desde propuesta</h2>
              <form action={createProjectAction} className="mt-5 grid gap-4">
                <input type="hidden" name="proposalId" value={proposal.id} />
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Nombre del proyecto
                  <input name="name" defaultValue={proposal.title} className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                </label>
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Descripción
                  <textarea name="description" rows={3} defaultValue={proposal.summary} className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                </label>
                <div className="grid gap-4 md:grid-cols-3">
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Estado
                    <select name="status" defaultValue="active" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink">
                      <option value="planned">Planificado</option>
                      <option value="active">Activo</option>
                      <option value="completed">Completado</option>
                      <option value="paused">Pausado</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                  </label>
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Inicio
                    <input name="startsAt" type="date" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                  </label>
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Fin
                    <input name="endsAt" type="date" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                  </label>
                </div>
                <Button type="submit">Crear proyecto</Button>
              </form>
            </Card>

            <Card>
              <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">Agregar entregable</h2>
              {projects.length ? (
                <form action={createDeliverableAction} className="mt-5 grid gap-4">
                  <input type="hidden" name="proposalId" value={proposal.id} />
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Proyecto
                    <select name="projectId" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink">
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Entregable
                    <input name="title" required className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                  </label>
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Descripción
                    <textarea name="description" rows={3} className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                  </label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="grid gap-1 text-sm font-medium text-ink">
                      Estado
                      <select name="status" defaultValue="planned" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink">
                        <option value="planned">Planificado</option>
                        <option value="in_progress">En progreso</option>
                        <option value="delivered">Entregado</option>
                        <option value="approved">Aprobado</option>
                      </select>
                    </label>
                    <label className="grid gap-1 text-sm font-medium text-ink">
                      Fecha límite
                      <input name="dueAt" type="date" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                    </label>
                  </div>
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    URL recurso
                    <input name="resourceUrl" placeholder="Opcional" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                  </label>
                  <Button type="submit">Agregar entregable</Button>
                </form>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-muted">Crea primero un proyecto para poder cargar entregables.</p>
              )}
            </Card>

            <div className="overflow-hidden rounded-md border border-border bg-panel">
              <div className="border-b border-border px-5 py-4">
                <h2 className="text-base font-medium text-ink">Operación registrada</h2>
              </div>
              <div className="divide-y divide-border">
                {[...quotes.map((item) => ({ type: "Cotización", title: item.quote_number, status: item.status, meta: money(item.total, item.currency), href: `/admin/commercial/quotes/${item.id}/print` })),
                  ...invoices.map((item) => ({ type: "Documento de cobro", title: item.invoice_number ?? item.id.slice(0, 8), status: item.status, meta: money(item.total, item.currency), href: `/admin/commercial/invoices/${item.id}/print` })),
                  ...payments.map((item) => ({ type: "Pago", title: item.provider_reference ?? item.provider, status: item.status, meta: money(item.amount, item.currency), href: null })),
                  ...projects.map((item) => ({ type: "Proyecto", title: item.name, status: item.status, meta: dateLabel(item.starts_at), href: null })),
                  ...deliverables.map((item) => ({ type: "Entregable", title: item.title, status: item.status, meta: dateLabel(item.due_at), href: item.resource_url }))].map((item) => (
                  <article key={`${item.type}-${item.title}-${item.meta}`} className="px-5 py-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge>{item.type}</Badge>
                      <Badge>{statusLabel(item.status)}</Badge>
                    </div>
                    <p className="font-medium text-ink">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.meta}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-medium text-ink underline decoration-border underline-offset-4">
                        Abrir
                      </a>
                    ) : null}
                  </article>
                ))}
                {!quotes.length && !invoices.length && !payments.length && !projects.length && !deliverables.length ? (
                  <p className="px-5 py-8 text-sm text-muted">Aún no hay operaciones asociadas a esta propuesta.</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

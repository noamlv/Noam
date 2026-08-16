import { notFound } from "next/navigation";
import { Badge, Button, Card, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { dateLabel, money, statusLabel } from "@/lib/format";
import { getClientWorkspaceByToken } from "@/lib/commercial";

interface ClientPortalPageProps {
  params: Promise<{ token: string }>;
}

export default async function ClientPortalPage({ params }: ClientPortalPageProps) {
  const { token } = await params;
  const workspace = await getClientWorkspaceByToken(token);

  if (!workspace) {
    notFound();
  }

  const { client, resources, proposals, invoices, projects, deliverables } = workspace;

  return (
    <Section className="pt-16 md:pt-20">
      <Container>
        <div className="mb-12 grid gap-8 md:grid-cols-[1fr_0.7fr] md:items-end">
          <div>
            <Eyebrow>Espacio privado NOAM</Eyebrow>
            <Heading as="h1" size="xl" className="mb-5">
              {client.organization ?? client.name}
            </Heading>
            <p className="max-w-2xl text-sm leading-relaxed text-ink/75">
              Espacio privado para revisar análisis, productos, propuestas, entregables y el estado del trabajo con NOAM.
            </p>
          </div>
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Contacto</p>
            <p className="mt-3 text-sm font-medium text-ink">{client.name}</p>
            {client.email ? <p className="mt-1 text-sm text-muted">{client.email}</p> : null}
          </Card>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-4">
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Recursos</p>
            <p className="mt-3 text-3xl font-medium text-ink">{resources.length}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Proyectos</p>
            <p className="mt-3 text-3xl font-medium text-ink">{projects.length}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Entregables</p>
            <p className="mt-3 text-3xl font-medium text-ink">{deliverables.length}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Documentos de cobro</p>
            <p className="mt-3 text-3xl font-medium text-ink">{invoices.length}</p>
          </Card>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div className="overflow-hidden rounded-md border border-border bg-panel">
              <div className="border-b border-border px-5 py-4">
                <h2 className="text-base font-medium text-ink">Análisis y productos disponibles</h2>
              </div>
              <div className="divide-y divide-border">
                {resources.length ? (
                  resources.map((resource) => (
                    <article key={resource.id} className="px-5 py-5">
                      <div className="mb-3 flex flex-wrap gap-2">
                        <Badge>{resource.resource_type}</Badge>
                        {resource.product_slug ? <Badge>{resource.product_slug}</Badge> : null}
                      </div>
                      <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">{resource.title}</h2>
                      {resource.description ? <p className="mt-2 text-sm leading-relaxed text-ink/75">{resource.description}</p> : null}
                      {resource.url ? (
                        <Button href={resource.url} target="_blank" rel="noreferrer" variant="secondary" className="mt-5">
                          Abrir recurso
                        </Button>
                      ) : null}
                    </article>
                  ))
                ) : (
                  <p className="px-5 py-8 text-sm text-muted">Todavía no hay recursos publicados para este espacio.</p>
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-md border border-border bg-panel">
              <div className="border-b border-border px-5 py-4">
                <h2 className="text-base font-medium text-ink">Entregables</h2>
              </div>
              <div className="divide-y divide-border">
                {deliverables.length ? (
                  deliverables.map((deliverable) => (
                    <article key={deliverable.id} className="px-5 py-4">
                      <div className="mb-2 flex flex-wrap gap-2">
                        <Badge>{statusLabel(deliverable.status)}</Badge>
                        <Badge>{dateLabel(deliverable.due_at)}</Badge>
                      </div>
                      <p className="font-medium text-ink">{deliverable.title}</p>
                      {deliverable.description ? <p className="mt-2 text-sm leading-relaxed text-ink/75">{deliverable.description}</p> : null}
                      {deliverable.resource_url ? (
                        <a href={deliverable.resource_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-medium text-ink underline decoration-border underline-offset-4">
                          Ver entregable
                        </a>
                      ) : null}
                    </article>
                  ))
                ) : (
                  <p className="px-5 py-8 text-sm text-muted">Todavía no hay entregables publicados.</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="overflow-hidden rounded-md border border-border bg-panel">
              <div className="border-b border-border px-5 py-4">
                <h2 className="text-base font-medium text-ink">Proyectos</h2>
              </div>
              <div className="divide-y divide-border">
                {projects.length ? (
                  projects.map((project) => (
                    <article key={project.id} className="px-5 py-4">
                      <div className="mb-2 flex flex-wrap gap-2">
                        <Badge>{statusLabel(project.status)}</Badge>
                        <Badge>{dateLabel(project.starts_at)}</Badge>
                      </div>
                      <p className="font-medium text-ink">{project.name}</p>
                      {project.description ? <p className="mt-2 text-sm leading-relaxed text-ink/75">{project.description}</p> : null}
                    </article>
                  ))
                ) : (
                  <p className="px-5 py-8 text-sm text-muted">Todavía no hay proyectos activos.</p>
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-md border border-border bg-panel">
              <div className="border-b border-border px-5 py-4">
                <h2 className="text-base font-medium text-ink">Comercial</h2>
              </div>
              <div className="divide-y divide-border">
                {proposals.map((proposal) => (
                  <article key={proposal.id} className="px-5 py-4">
                    <div className="mb-2 flex flex-wrap gap-2">
                      <Badge>Propuesta</Badge>
                      <Badge>{statusLabel(proposal.status)}</Badge>
                    </div>
                    <p className="font-medium text-ink">{proposal.title}</p>
                    <p className="mt-1 text-sm text-muted">{money(proposal.amount, proposal.currency)}</p>
                  </article>
                ))}
                {invoices.map((invoice) => (
                  <article key={invoice.id} className="px-5 py-4">
                    <div className="mb-2 flex flex-wrap gap-2">
                      <Badge>Documento de cobro</Badge>
                      <Badge>{statusLabel(invoice.status)}</Badge>
                    </div>
                    <p className="font-medium text-ink">{invoice.invoice_number ?? invoice.id.slice(0, 8)}</p>
                    <p className="mt-1 text-sm text-muted">{money(invoice.total, invoice.currency)}</p>
                    {invoice.official_document_url ? (
                      <a href={invoice.official_document_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-medium text-ink underline decoration-border underline-offset-4">
                        Ver comprobante
                      </a>
                    ) : null}
                  </article>
                ))}
                {!proposals.length && !invoices.length ? (
                  <p className="px-5 py-8 text-sm text-muted">Todavía no hay documentos comerciales visibles.</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

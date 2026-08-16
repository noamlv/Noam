import { notFound, redirect } from "next/navigation";
import { Badge, Button, Card, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { createClientResourceAction, createPortalTokenAction, revokePortalTokenAction } from "@/app/admin/commercial/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { dateLabel, money, statusLabel } from "@/lib/format";
import { getClientWorkspace } from "@/lib/commercial";
import { platformCatalog } from "@/lib/platform-catalog";

interface ClientPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string; updated?: string; portalToken?: string }>;
}

export default async function ClientPage({ params, searchParams }: ClientPageProps) {
  const authenticated = await isAdminAuthenticated(["owner", "editor"], true);

  if (!authenticated) {
    redirect("/admin/login");
  }

  const [{ id }, noticeParams] = await Promise.all([params, searchParams]);
  const workspace = await getClientWorkspace(id);

  if (!workspace) {
    notFound();
  }

  const { client, tokens, resources, proposals, invoices, projects, deliverables } = workspace;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return (
    <Section className="pt-16 md:pt-20">
      <Container>
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Cliente</Eyebrow>
            <Heading as="h1" size="xl" className="mb-4">
              {client.name}
            </Heading>
            <p className="max-w-2xl text-sm leading-relaxed text-ink/75">
              {client.organization ?? "Sin organizacion registrada"} · {client.email ?? "Sin email"} · {client.country}
            </p>
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

        {noticeParams.portalToken ? (
          <div className="mb-8 rounded-md border border-rust/30 bg-rust/10 px-4 py-4 text-sm text-ink/80">
            <p className="font-medium text-ink">Enlace privado generado. Cópialo ahora: por seguridad no podrá recuperarse después.</p>
            <a className="mt-2 block break-all underline decoration-rust/40 underline-offset-4" href={`/portal/${noticeParams.portalToken}`} target="_blank" rel="noreferrer">
              {baseUrl}/portal/{noticeParams.portalToken}
            </a>
          </div>
        ) : null}

        <div className="mb-10 grid gap-4 md:grid-cols-4">
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Estado</p>
            <p className="mt-3 text-sm font-medium text-ink">{statusLabel(client.status)}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Propuestas</p>
            <p className="mt-3 text-3xl font-medium text-ink">{proposals.length}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Proyectos</p>
            <p className="mt-3 text-3xl font-medium text-ink">{projects.length}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Recursos</p>
            <p className="mt-3 text-3xl font-medium text-ink">{resources.length}</p>
          </Card>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <Card>
              <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">Acceso privado</h2>
              <form action={createPortalTokenAction} className="mt-5 grid gap-4">
                <input type="hidden" name="clientId" value={client.id} />
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Etiqueta
                  <input name="label" defaultValue="Acceso principal" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                </label>
                <label className="grid gap-1 text-sm font-medium text-ink">Duración
                  <select name="durationDays" defaultValue="30" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink">
                    <option value="7">7 días</option><option value="30">30 días</option><option value="60">60 días</option><option value="90">90 días</option>
                  </select>
                </label>
                <Button type="submit">Generar enlace</Button>
              </form>
              <p className="mt-3 text-xs leading-5 text-muted">El acceso vence en 30 días por defecto y nunca puede superar 90 días. Para rotarlo, genera uno nuevo y revoca el anterior.</p>

              <div className="mt-6 space-y-3">
                {tokens.length ? (
                  tokens.map((token) => {
                    const expired = Boolean(token.expires_at && new Date(token.expires_at).getTime() <= Date.now());
                    return (
                    <div key={token.id} className="rounded-sm border border-border bg-canvas p-3">
                      <div className="mb-2 flex flex-wrap gap-2">
                        <Badge>{token.is_active ? expired ? "vencido" : "activo" : "revocado"}</Badge>
                        <Badge>{token.label}</Badge>
                      </div>
                      <p className="text-sm text-muted">El secreto no se almacena. Genera un enlace nuevo si necesitas reemplazar el acceso.</p>
                      <p className="mt-2 text-xs text-muted">Último uso: {dateLabel(token.last_used_at)}</p>
                      <p className="mt-1 text-xs text-muted">Vence: {dateLabel(token.expires_at)}</p>
                      {token.revoked_at ? <p className="mt-1 text-xs text-muted">Revocado: {dateLabel(token.revoked_at)}</p> : null}
                      {token.is_active ? <form action={revokePortalTokenAction} className="mt-3"><input type="hidden" name="tokenId" value={token.id} /><input type="hidden" name="clientId" value={client.id} /><Button type="submit" variant="secondary">Revocar acceso</Button></form> : null}
                    </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted">Todavía no hay enlaces privados.</p>
                )}
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-medium tracking-[-0.02em] text-ink">Asignar recurso/producto</h2>
              <form action={createClientResourceAction} className="mt-5 grid gap-4">
                <input type="hidden" name="clientId" value={client.id} />
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Titulo
                  <input name="title" required className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                </label>
                <label className="grid gap-1 text-sm font-medium text-ink">
                  Descripción
                  <textarea name="description" rows={3} className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                </label>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Tipo
                    <select name="resourceType" defaultValue="analysis" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink">
                      <option value="analysis">Analisis</option>
                      <option value="dashboard">Dashboard</option>
                      <option value="report">Informe</option>
                      <option value="dataset">Dataset</option>
                      <option value="demo">Demo</option>
                    </select>
                  </label>
                  <label className="grid gap-1 text-sm font-medium text-ink">
                    Producto
                    <select name="productSlug" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink">
                      <option value="">Sin producto</option>
                      {platformCatalog.map((product) => (
                        <option key={product.slug} value={product.slug}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="grid gap-1 text-sm font-medium text-ink">
                  URL
                  <input name="url" placeholder="Dashboard, PDF, demo o recurso externo" className="rounded-sm border border-border bg-canvas px-3 py-2 text-sm font-normal text-ink" />
                </label>
                <Button type="submit">Asignar recurso</Button>
              </form>
            </Card>
          </div>

          <div className="space-y-5">
            <div className="overflow-hidden rounded-md border border-border bg-panel">
              <div className="border-b border-border px-5 py-4">
                <h2 className="text-base font-medium text-ink">Recursos asignados</h2>
              </div>
              <div className="divide-y divide-border">
                {resources.length ? (
                  resources.map((resource) => (
                    <article key={resource.id} className="px-5 py-4">
                      <div className="mb-2 flex flex-wrap gap-2">
                        <Badge>{resource.resource_type}</Badge>
                        <Badge>{statusLabel(resource.status)}</Badge>
                      </div>
                      <p className="font-medium text-ink">{resource.title}</p>
                      {resource.description ? <p className="mt-2 text-sm leading-relaxed text-ink/75">{resource.description}</p> : null}
                      {resource.url ? (
                        <a href={resource.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-medium text-ink underline decoration-border underline-offset-4">
                          Abrir recurso
                        </a>
                      ) : null}
                    </article>
                  ))
                ) : (
                  <p className="px-5 py-8 text-sm text-muted">Todavía no hay recursos asignados.</p>
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-md border border-border bg-panel">
              <div className="border-b border-border px-5 py-4">
                <h2 className="text-base font-medium text-ink">Operación</h2>
              </div>
              <div className="divide-y divide-border">
                {[
                  ...proposals.map((item) => ({ type: "Propuesta", title: item.title, status: item.status, meta: money(item.amount, item.currency), href: `/admin/commercial/proposals/${item.id}` })),
                  ...invoices.map((item) => ({ type: "Documento de cobro", title: item.invoice_number ?? item.id.slice(0, 8), status: item.status, meta: money(item.total, item.currency), href: null })),
                  ...projects.map((item) => ({ type: "Proyecto", title: item.name, status: item.status, meta: dateLabel(item.starts_at), href: null })),
                  ...deliverables.map((item) => ({ type: "Entregable", title: item.title, status: item.status, meta: dateLabel(item.due_at), href: item.resource_url }))
                ].map((item) => (
                  <article key={`${item.type}-${item.title}-${item.meta}`} className="px-5 py-4">
                    <div className="mb-2 flex flex-wrap gap-2">
                      <Badge>{item.type}</Badge>
                      <Badge>{statusLabel(item.status)}</Badge>
                    </div>
                    <p className="font-medium text-ink">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.meta}</p>
                    {item.href ? (
                      <a href={item.href} className="mt-3 inline-flex text-sm font-medium text-ink underline decoration-border underline-offset-4">
                        Abrir
                      </a>
                    ) : null}
                  </article>
                ))}
                {!proposals.length && !invoices.length && !projects.length && !deliverables.length ? (
                  <p className="px-5 py-8 text-sm text-muted">Todavía no hay operación asociada.</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

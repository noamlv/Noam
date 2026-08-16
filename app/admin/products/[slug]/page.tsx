import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge, Button, Card, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getManagedPlatformProduct } from "@/lib/platform-products";
import { getManagedPlatformResources } from "@/lib/platform-resources";
import type { ManagedPlatformResource } from "@/types/platform";
import { createPlatformResourceAction, seedPlatformResourcesAction, updatePlatformResourceAction } from "../resource-actions";

type PageProps = { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

const inputClass = "mt-2 min-h-11 w-full rounded-sm border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-ink";
const labelClass = "text-xs font-semibold uppercase tracking-[0.12em] text-muted";

function ResourceFields({ productSlug, resource, creating = false }: { productSlug: string; resource?: ManagedPlatformResource; creating?: boolean }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <input type="hidden" name="productSlug" value={productSlug} />
      <label className={labelClass}>Slug
        <input name="slug" required readOnly={!creating} defaultValue={resource?.slug} className={`${inputClass} ${!creating ? "bg-panel text-muted" : ""}`} placeholder="nombre-del-recurso" />
      </label>
      <label className={labelClass}>Título
        <input name="title" required minLength={3} defaultValue={resource?.title} className={inputClass} />
      </label>
      <label className={labelClass}>Tipo
        <select name="kind" defaultValue={resource?.kind ?? "dataset"} className={inputClass}>
          <option value="dataset">Dataset</option><option value="methodology">Metodología</option><option value="toolkit">Guía</option><option value="report">Informe</option><option value="template">Plantilla</option><option value="explorer">Explorador</option>
        </select>
      </label>
      <label className={labelClass}>URL
        <input name="url" required defaultValue={resource?.url ?? "/downloads/"} className={inputClass} />
      </label>
      <label className={`${labelClass} md:col-span-2`}>Descripción
        <textarea name="description" required minLength={20} defaultValue={resource?.description} rows={3} className={inputClass} />
      </label>
      <label className={labelClass}>Fuente
        <input name="sourceLabel" defaultValue={resource?.sourceLabel ?? "NOAM"} className={inputClass} />
      </label>
      <label className={labelClass}>Periodo
        <input name="period" defaultValue={resource?.period ?? ""} className={inputClass} />
      </label>
      <label className={labelClass}>Formato
        <input name="format" defaultValue={resource?.format ?? ""} className={inputClass} placeholder="CSV, PDF, Web" />
      </label>
      <label className={labelClass}>Orden
        <input name="sortOrder" type="number" min="0" max="9999" defaultValue={resource?.sortOrder ?? 100} className={inputClass} />
      </label>
      <label className="flex min-h-11 items-center gap-3 text-sm font-medium text-ink md:col-span-2">
        <input name="isPublic" type="checkbox" defaultChecked={resource?.isPublic ?? false} className="h-4 w-4 accent-ink" />
        Publicar en la biblioteca y la búsqueda
      </label>
    </div>
  );
}

export default async function AdminProductResourcesPage({ params, searchParams }: PageProps) {
  if (!(await isAdminAuthenticated(["owner", "editor"], true))) redirect("/admin/login");
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const [product, resources] = await Promise.all([
    getManagedPlatformProduct(slug, { includeUnpublished: true }),
    getManagedPlatformResources({ includeUnpublished: true, productSlug: slug })
  ]);
  if (!product) notFound();
  const message = query.created ? "Recurso creado." : query.updated ? `Recurso ${query.updated} actualizado.` : query.seeded ? `Biblioteca sincronizada: ${query.seeded} recursos incorporados.` : null;

  return (
    <Section className="pt-16 md:pt-20">
      <Container>
        <Button href="/admin/products" variant="ghost" className="mb-8 gap-2"><ArrowLeft className="h-4 w-4" /> Volver al catálogo</Button>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><Eyebrow>Recursos de producto</Eyebrow><Heading as="h1" size="xl" className="mb-4">{product.name}</Heading><p className="max-w-2xl text-sm leading-relaxed text-ink/75">Publica datasets, guías, metodologías, plantillas o exploradores que demuestren la capacidad detrás del producto.</p></div>
          <form action={seedPlatformResourcesAction}><input type="hidden" name="productSlug" value={slug} /><Button type="submit" variant="secondary">Sincronizar recursos base</Button></form>
        </div>
        {message ? <p role="status" className="mt-8 rounded-sm border border-border bg-panel px-4 py-3 text-sm text-ink">{message}</p> : null}

        <details className="mt-10 rounded-md border border-border bg-panel p-5 md:p-7">
          <summary className="cursor-pointer text-lg font-medium text-ink">Crear recurso</summary>
          <form action={createPlatformResourceAction} className="mt-7"><ResourceFields productSlug={slug} creating /><Button type="submit" className="mt-7">Crear recurso</Button></form>
        </details>

        <div className="mt-12 space-y-5">
          {resources.length ? resources.map((resource) => (
            <Card key={resource.slug} className="p-0">
              <details className="p-5 md:p-7">
                <summary className="cursor-pointer list-none">
                  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                    <div><div className="mb-3 flex flex-wrap gap-2"><Badge>{resource.kind}</Badge><Badge>{resource.isPublic ? "Publicado" : "Oculto"}</Badge><Badge>{resource.source === "database" ? "Postgres" : "Código"}</Badge>{resource.format ? <Badge>{resource.format}</Badge> : null}</div><h2 className="text-xl font-medium tracking-[-0.02em] text-ink">{resource.title}</h2><p className="mt-2 text-sm text-muted">{resource.slug}</p></div>
                    <span className="text-sm font-medium text-ink">Editar recurso</span>
                  </div>
                </summary>
                <form action={updatePlatformResourceAction} className="mt-8 border-t border-border pt-8"><ResourceFields productSlug={slug} resource={resource} /><div className="mt-7 flex flex-wrap gap-3"><Button type="submit">Guardar cambios</Button><Button href={resource.url} variant="secondary" className="gap-2">Abrir recurso <ExternalLink className="h-4 w-4" /></Button></div></form>
              </details>
            </Card>
          )) : <p className="rounded-md border border-dashed border-border p-8 text-sm text-muted">Este producto aún no tiene recursos asociados.</p>}
        </div>
      </Container>
    </Section>
  );
}

import { redirect } from "next/navigation";
import { Badge, Button, Card, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getManagedPlatformCatalog } from "@/lib/platform-products";
import type { ManagedPlatformProduct } from "@/types/platform";
import { createPlatformProductAction, seedPlatformCatalogAction, updatePlatformProductAction } from "./actions";

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const inputClass = "mt-2 min-h-11 w-full rounded-sm border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-ink";
const labelClass = "text-xs font-semibold uppercase tracking-[0.12em] text-muted";

function ProductFields({ product, creating = false }: { product?: ManagedPlatformProduct; creating?: boolean }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <label className={labelClass}>Slug
        <input name="slug" required readOnly={!creating} defaultValue={product?.slug} className={`${inputClass} ${!creating ? "bg-panel text-muted" : ""}`} placeholder="nuevo-producto" />
      </label>
      <label className={labelClass}>Nombre
        <input name="name" required minLength={3} defaultValue={product?.name} className={inputClass} />
      </label>
      <label className={labelClass}>Categoría
        <select name="category" defaultValue={product?.category ?? "product"} className={inputClass}>
          <option value="product">Producto</option><option value="dashboard">Dashboard</option><option value="viewer">Visor</option><option value="demo">Laboratorio</option><option value="service">Servicio</option>
        </select>
      </label>
      <label className={labelClass}>Estado
        <select name="status" defaultValue={product?.status ?? "prototype"} className={inputClass}>
          <option value="live">Disponible</option><option value="prototype">Prototipo</option><option value="planned">En desarrollo</option>
        </select>
      </label>
      <label className={`${labelClass} md:col-span-2`}>Descripción
        <textarea name="description" required minLength={20} defaultValue={product?.description} rows={3} className={inputClass} />
      </label>
      <label className={`${labelClass} md:col-span-2`}>Resultado para el usuario
        <textarea name="outcome" required minLength={20} defaultValue={product?.outcome} rows={3} className={inputClass} />
      </label>
      <label className={labelClass}>URL pública
        <input name="href" required defaultValue={product?.href ?? "/products/"} className={inputClass} />
      </label>
      <label className={labelClass}>URL de demo
        <input name="demoHref" defaultValue={product?.demoHref ?? ""} className={inputClass} />
      </label>
      <label className={labelClass}>Plazo o modalidad
        <input name="timeline" defaultValue={product?.timeline ?? ""} className={inputClass} />
      </label>
      <label className={labelClass}>Orden
        <input name="sortOrder" type="number" min="0" max="9999" defaultValue={product?.sortOrder ?? 100} className={inputClass} />
      </label>
      <label className={labelClass}>Audiencias, una por línea
        <textarea name="audience" defaultValue={product?.audience.join("\n")} rows={5} className={inputClass} />
      </label>
      <label className={labelClass}>Capacidades, una por línea
        <textarea name="features" defaultValue={product?.features.join("\n")} rows={5} className={inputClass} />
      </label>
      <label className={`${labelClass} md:col-span-2`}>Entregables, uno por línea
        <textarea name="deliverables" defaultValue={product?.deliverables.join("\n")} rows={5} className={inputClass} />
      </label>
      <label className="flex min-h-11 items-center gap-3 text-sm font-medium text-ink md:col-span-2">
        <input name="isPublished" type="checkbox" defaultChecked={product?.isPublished ?? false} className="h-4 w-4 accent-ink" />
        Publicar en el catálogo y la búsqueda
      </label>
    </div>
  );
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  if (!(await isAdminAuthenticated(["owner", "editor"], true))) redirect("/admin/login");
  const [products, query] = await Promise.all([getManagedPlatformCatalog({ includeUnpublished: true }), searchParams]);
  const message = query.created ? "Producto creado." : query.updated ? `Producto ${query.updated} actualizado.` : query.seeded ? `Catálogo sincronizado: ${query.seeded} fichas incorporadas.` : null;

  return (
    <Section className="pt-16 md:pt-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><Eyebrow>NOAM OS</Eyebrow><Heading as="h1" size="xl" className="mb-4">Catálogo operativo</Heading><p className="max-w-2xl text-sm leading-relaxed text-ink/75">Gestiona productos, dashboards, visores y laboratorios. Las fichas publicadas alimentan el catálogo público y la búsqueda.</p></div>
          <form action={seedPlatformCatalogAction}><Button type="submit" variant="secondary">Sincronizar catálogo base</Button></form>
        </div>
        {message ? <p role="status" className="mt-8 rounded-sm border border-border bg-panel px-4 py-3 text-sm text-ink">{message}</p> : null}

        <details className="mt-10 rounded-md border border-border bg-panel p-5 md:p-7">
          <summary className="cursor-pointer text-lg font-medium text-ink">Crear producto</summary>
          <form action={createPlatformProductAction} className="mt-7"><ProductFields creating /><Button type="submit" className="mt-7">Crear ficha</Button></form>
        </details>

        <div className="mt-12 space-y-5">
          {products.map((product) => (
            <Card key={product.slug} className="p-0">
              <details className="group p-5 md:p-7">
                <summary className="cursor-pointer list-none">
                  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                    <div><div className="mb-3 flex flex-wrap gap-2"><Badge>{product.category}</Badge><Badge>{product.status}</Badge><Badge>{product.isPublished ? "Publicado" : "Oculto"}</Badge><Badge>{product.source === "database" ? "Postgres" : "Código"}</Badge></div><h2 className="text-xl font-medium tracking-[-0.02em] text-ink">{product.name}</h2><p className="mt-2 text-sm text-muted">{product.slug}</p></div>
                    <span className="text-sm font-medium text-ink">Editar ficha</span>
                  </div>
                </summary>
                <form action={updatePlatformProductAction} className="mt-8 border-t border-border pt-8"><ProductFields product={product} /><div className="mt-7 flex flex-wrap gap-3"><Button type="submit">Guardar cambios</Button><Button href={`/admin/products/${product.slug}`} variant="secondary">Gestionar recursos</Button><Button href={product.href} variant="ghost">Ver landing</Button></div></form>
              </details>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

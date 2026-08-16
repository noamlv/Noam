import { getDb, hasDatabase } from "./db.ts";
import { platformResourceCatalog } from "./platform-resource-catalog.ts";
import type { ManagedPlatformResource, PlatformResource } from "../types/platform.ts";
import type { PlatformResourceInput } from "./platform-resource-validation.ts";

type ResourceRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  kind: PlatformResource["kind"];
  url: string;
  product_slug: string | null;
  source_label: string | null;
  period: string | null;
  format: string | null;
  sort_order: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

function fromRow(row: ResourceRow): ManagedPlatformResource {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description ?? "",
    kind: row.kind,
    url: row.url,
    productSlug: row.product_slug ?? undefined,
    sourceLabel: row.source_label ?? undefined,
    period: row.period ?? undefined,
    format: row.format ?? undefined,
    sortOrder: row.sort_order,
    isPublic: row.is_public,
    source: "database",
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function fromCode(resource: PlatformResource, index: number): ManagedPlatformResource {
  return { ...resource, sortOrder: (index + 1) * 10, isPublic: true, source: "code" };
}

async function databaseResources() {
  const db = getDb();
  if (!db) return [];
  const rows = await db<ResourceRow[]>`
    select id, slug, title, description, kind, url, product_slug, source_label,
      period, format, sort_order, is_public, created_at, updated_at
    from resources
    order by sort_order asc, updated_at desc
  `;
  return rows.map(fromRow);
}

export async function getManagedPlatformResources(options: { includeUnpublished?: boolean; productSlug?: string } = {}) {
  const codeResources = platformResourceCatalog.map(fromCode);
  let merged = codeResources;

  if (hasDatabase()) {
    let stored: ManagedPlatformResource[] = [];
    try {
      stored = await databaseResources();
    } catch (error) {
      if (options.includeUnpublished) throw error;
      console.error("Postgres no respondió; la biblioteca pública usa el catálogo versionado.", error);
    }
    if (stored.length) {
      const storedBySlug = new Map(stored.map((resource) => [resource.slug, resource]));
      const knownSlugs = new Set(codeResources.map((resource) => resource.slug));
      merged = codeResources.map((resource) => storedBySlug.get(resource.slug) ?? resource);
      merged.push(...stored.filter((resource) => !knownSlugs.has(resource.slug)));
    }
  }

  return merged
    .filter((resource) => options.includeUnpublished || resource.isPublic)
    .filter((resource) => !options.productSlug || resource.productSlug === options.productSlug)
    .sort((left, right) => left.sortOrder - right.sortOrder || left.title.localeCompare(right.title, "es"));
}

export async function createPlatformResource(input: PlatformResourceInput) {
  const db = getDb();
  if (!db) throw new Error("Postgres es obligatorio para gestionar recursos.");
  const [row] = await db<ResourceRow[]>`
    insert into resources (
      slug, title, description, kind, url, product_slug, source_label,
      period, format, sort_order, is_public
    ) values (
      ${input.slug}, ${input.title}, ${input.description}, ${input.kind}, ${input.url},
      ${input.productSlug}, ${input.sourceLabel || null}, ${input.period || null},
      ${input.format || null}, ${input.sortOrder}, ${input.isPublic}
    )
    returning id, slug, title, description, kind, url, product_slug, source_label,
      period, format, sort_order, is_public, created_at, updated_at
  `;
  return fromRow(row);
}

export async function updatePlatformResource(input: PlatformResourceInput) {
  const db = getDb();
  if (!db) throw new Error("Postgres es obligatorio para gestionar recursos.");
  const [row] = await db<ResourceRow[]>`
    insert into resources (
      slug, title, description, kind, url, product_slug, source_label,
      period, format, sort_order, is_public
    ) values (
      ${input.slug}, ${input.title}, ${input.description}, ${input.kind}, ${input.url},
      ${input.productSlug}, ${input.sourceLabel || null}, ${input.period || null},
      ${input.format || null}, ${input.sortOrder}, ${input.isPublic}
    )
    on conflict (slug) do update set
      title = excluded.title, description = excluded.description, kind = excluded.kind,
      url = excluded.url, product_slug = excluded.product_slug,
      source_label = excluded.source_label, period = excluded.period, format = excluded.format,
      sort_order = excluded.sort_order, is_public = excluded.is_public, updated_at = now()
    returning id, slug, title, description, kind, url, product_slug, source_label,
      period, format, sort_order, is_public, created_at, updated_at
  `;
  return fromRow(row);
}

export async function seedPlatformResources() {
  const db = getDb();
  if (!db) throw new Error("DATABASE_URL es obligatorio para sincronizar recursos.");
  let inserted = 0;
  for (const [index, resource] of platformResourceCatalog.entries()) {
    const rows = await db`
      insert into resources (
        slug, title, description, kind, url, product_slug, source_label,
        period, format, sort_order, is_public
      ) values (
        ${resource.slug}, ${resource.title}, ${resource.description}, ${resource.kind},
        ${resource.url}, ${resource.productSlug || null}, ${resource.sourceLabel || null},
        ${resource.period || null}, ${resource.format || null}, ${(index + 1) * 10}, true
      )
      on conflict (slug) do nothing
      returning slug
    `;
    inserted += rows.length;
  }
  return { inserted, total: platformResourceCatalog.length };
}

import { getDb, hasDatabase } from "./db.ts";
import { platformCatalog } from "./platform-catalog.ts";
import type { ManagedPlatformProduct, PlatformProduct } from "../types/platform.ts";
import type { PlatformProductInput } from "./platform-product-validation.ts";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category: PlatformProduct["category"];
  description: string;
  outcome: string;
  href: string;
  status: PlatformProduct["status"];
  audience: unknown;
  features: unknown;
  deliverables: unknown;
  demo_href: string | null;
  timeline: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

function asList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function fromRow(row: ProductRow): ManagedPlatformProduct {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    description: row.description,
    outcome: row.outcome,
    href: row.href,
    status: row.status,
    audience: asList(row.audience),
    features: asList(row.features),
    deliverables: asList(row.deliverables),
    demoHref: row.demo_href ?? undefined,
    timeline: row.timeline ?? undefined,
    sortOrder: row.sort_order,
    isPublished: row.is_published,
    source: "database",
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function fromCode(product: PlatformProduct, index: number): ManagedPlatformProduct {
  return { ...product, sortOrder: (index + 1) * 10, isPublished: true, source: "code" };
}

async function databaseProducts() {
  const db = getDb();
  if (!db) return [];
  const rows = await db<ProductRow[]>`
    select id, slug, name, category, description, outcome, href, status,
      audience, features, deliverables, demo_href, timeline, sort_order,
      is_published, created_at, updated_at
    from platform_products
    order by sort_order asc, updated_at desc
  `;
  return rows.map(fromRow);
}

export async function getManagedPlatformCatalog(options: { includeUnpublished?: boolean } = {}) {
  const codeProducts = platformCatalog.map(fromCode);
  if (!hasDatabase()) return codeProducts;

  let stored: ManagedPlatformProduct[] = [];
  try {
    stored = await databaseProducts();
  } catch (error) {
    if (options.includeUnpublished) throw error;
    console.error("Postgres no respondió; el catálogo público usa la versión del repositorio.", error);
  }
  if (!stored.length) return codeProducts;

  const storedBySlug = new Map(stored.map((product) => [product.slug, product]));
  const merged = codeProducts.map((product) => storedBySlug.get(product.slug) ?? product);
  const knownSlugs = new Set(codeProducts.map((product) => product.slug));
  merged.push(...stored.filter((product) => !knownSlugs.has(product.slug)));

  return merged
    .filter((product) => options.includeUnpublished || product.isPublished)
    .sort((left, right) => left.sortOrder - right.sortOrder || left.name.localeCompare(right.name, "es"));
}

export async function getManagedPlatformProduct(slug: string, options: { includeUnpublished?: boolean } = {}) {
  return (await getManagedPlatformCatalog(options)).find((product) => product.slug === slug);
}

export async function createPlatformProduct(input: PlatformProductInput) {
  const db = getDb();
  if (!db) throw new Error("Postgres es obligatorio para gestionar el catálogo.");
  const [row] = await db<ProductRow[]>`
    insert into platform_products (
      slug, name, category, description, outcome, href, status, audience,
      features, deliverables, demo_href, timeline, sort_order, is_published
    ) values (
      ${input.slug}, ${input.name}, ${input.category}, ${input.description}, ${input.outcome},
      ${input.href}, ${input.status}, ${db.json(input.audience)}, ${db.json(input.features)},
      ${db.json(input.deliverables)}, ${input.demoHref || null}, ${input.timeline || null},
      ${input.sortOrder}, ${input.isPublished}
    )
    returning id, slug, name, category, description, outcome, href, status,
      audience, features, deliverables, demo_href, timeline, sort_order,
      is_published, created_at, updated_at
  `;
  return fromRow(row);
}

export async function updatePlatformProduct(input: PlatformProductInput) {
  const db = getDb();
  if (!db) throw new Error("Postgres es obligatorio para gestionar el catálogo.");
  const [row] = await db<ProductRow[]>`
    insert into platform_products (
      slug, name, category, description, outcome, href, status, audience,
      features, deliverables, demo_href, timeline, sort_order, is_published
    ) values (
      ${input.slug}, ${input.name}, ${input.category}, ${input.description}, ${input.outcome},
      ${input.href}, ${input.status}, ${db.json(input.audience)}, ${db.json(input.features)},
      ${db.json(input.deliverables)}, ${input.demoHref || null}, ${input.timeline || null},
      ${input.sortOrder}, ${input.isPublished}
    )
    on conflict (slug) do update set
      name = excluded.name, category = excluded.category, description = excluded.description,
      outcome = excluded.outcome, href = excluded.href, status = excluded.status,
      audience = excluded.audience, features = excluded.features,
      deliverables = excluded.deliverables, demo_href = excluded.demo_href,
      timeline = excluded.timeline, sort_order = excluded.sort_order,
      is_published = excluded.is_published, updated_at = now()
    returning id, slug, name, category, description, outcome, href, status,
      audience, features, deliverables, demo_href, timeline, sort_order,
      is_published, created_at, updated_at
  `;
  return fromRow(row);
}

export async function seedPlatformCatalog() {
  const db = getDb();
  if (!db) throw new Error("DATABASE_URL es obligatorio para sincronizar el catálogo.");
  let inserted = 0;
  for (const [index, product] of platformCatalog.entries()) {
    const rows = await db`
      insert into platform_products (
        slug, name, category, description, outcome, href, status, audience,
        features, deliverables, demo_href, timeline, sort_order, is_published
      ) values (
        ${product.slug}, ${product.name}, ${product.category}, ${product.description},
        ${product.outcome}, ${product.href}, ${product.status}, ${db.json(product.audience)},
        ${db.json(product.features)}, ${db.json(product.deliverables)},
        ${product.demoHref || null}, ${product.timeline || null}, ${(index + 1) * 10}, true
      )
      on conflict (slug) do nothing
      returning slug
    `;
    inserted += rows.length;
  }
  return { inserted, total: platformCatalog.length };
}

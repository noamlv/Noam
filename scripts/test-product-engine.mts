import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

try {
  const raw = await fs.readFile(path.join(process.cwd(), ".env.local"), "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...parts] = trimmed.split("=");
    if (!process.env[key]) process.env[key] = parts.join("=").trim().replace(/^['"]|['"]$/g, "");
  }
} catch {}

if (!process.env.DATABASE_URL) {
  console.log("Product engine omitido: DATABASE_URL no está configurado");
  process.exit(0);
}

const products = await import("../lib/platform-products.ts");
const { getDb } = await import("../lib/db.ts");
const db = getDb();
assert.ok(db);
const slug = "qa-product-engine";

try {
  await products.createPlatformProduct({
    slug, name: "Producto QA reversible", category: "dashboard",
    description: "Ficha temporal para verificar el motor administrable de productos.",
    outcome: "Demuestra que Postgres puede publicar una ficha sin modificar el catálogo en código.",
    href: `/products/${slug}`, status: "prototype", audience: ["Equipo QA"],
    features: ["Persistencia tipada"], deliverables: ["Ficha verificable"],
    demoHref: "", timeline: "Prueba", sortOrder: 999, isPublished: true
  });
  assert.equal((await products.getManagedPlatformProduct(slug))?.source, "database");

  await products.updatePlatformProduct({
    slug, name: "Producto QA actualizado", category: "dashboard",
    description: "Ficha temporal actualizada para verificar el motor administrable de productos.",
    outcome: "Demuestra que una ficha puede retirarse de publicación sin eliminar sus referencias.",
    href: `/products/${slug}`, status: "planned", audience: ["Equipo QA"],
    features: ["Persistencia tipada"], deliverables: ["Ficha verificable"],
    demoHref: "", timeline: "Prueba", sortOrder: 999, isPublished: false
  });
  assert.equal(await products.getManagedPlatformProduct(slug), undefined);
  assert.equal((await products.getManagedPlatformProduct(slug, { includeUnpublished: true }))?.status, "planned");
} finally {
  await db`delete from platform_products where slug = ${slug}`;
  await db.end();
}

console.log("Product engine OK: alta, edición, publicación y retiro verificados sin dejar datos");

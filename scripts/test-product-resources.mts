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
  console.log("Product resources omitido: DATABASE_URL no está configurado");
  process.exit(0);
}

const resources = await import("../lib/platform-resources.ts");
const { getDb } = await import("../lib/db.ts");
const db = getDb();
assert.ok(db);
const slug = "qa-product-resource";

try {
  await resources.createPlatformResource({
    slug, title: "Recurso QA reversible", description: "Recurso temporal para verificar la biblioteca gestionable de NOAM.",
    kind: "dataset", url: "/downloads/planometro-2026-ejes.csv", productSlug: "dataperu",
    sourceLabel: "QA NOAM", period: "2026", format: "CSV", sortOrder: 999, isPublic: true
  });
  assert.equal((await resources.getManagedPlatformResources()).some((item) => item.slug === slug), true);

  await resources.updatePlatformResource({
    slug, title: "Recurso QA actualizado", description: "Recurso temporal retirado para verificar publicación sin borrado destructivo.",
    kind: "dataset", url: "/downloads/planometro-2026-ejes.csv", productSlug: "dataperu",
    sourceLabel: "QA NOAM", period: "2026", format: "CSV", sortOrder: 999, isPublic: false
  });
  assert.equal((await resources.getManagedPlatformResources()).some((item) => item.slug === slug), false);
  assert.equal((await resources.getManagedPlatformResources({ includeUnpublished: true })).find((item) => item.slug === slug)?.source, "database");
} finally {
  await db`delete from resources where slug = ${slug}`;
  await db.end();
}

console.log("Product resources OK: alta, edición, publicación y retiro verificados sin dejar datos");

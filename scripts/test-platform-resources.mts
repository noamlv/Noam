import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { platformCatalog } from "../lib/platform-catalog.ts";
import { platformResourceCatalog } from "../lib/platform-resource-catalog.ts";

assert.equal(new Set(platformResourceCatalog.map((resource) => resource.slug)).size, platformResourceCatalog.length, "Los slugs de recursos deben ser únicos");
assert.equal(new Set(platformResourceCatalog.map((resource) => resource.title)).size, platformResourceCatalog.length, "Los títulos de recursos deben ser únicos");

const productSlugs = new Set(platformCatalog.map((product) => product.slug));
for (const resource of platformResourceCatalog) {
  assert.ok(resource.description.length >= 20, `${resource.slug} necesita una descripción útil`);
  assert.ok(resource.sourceLabel, `${resource.slug} debe declarar fuente`);
  assert.ok(resource.format, `${resource.slug} debe declarar formato`);
  assert.ok(resource.productSlug && productSlugs.has(resource.productSlug), `${resource.slug} debe asociarse a un producto existente`);
  assert.ok(resource.url.startsWith("/") || resource.url.startsWith("https://"), `${resource.slug} tiene una URL insegura`);
  if (resource.url.startsWith("/downloads/")) {
    const filePath = path.join(process.cwd(), "public", resource.url);
    assert.ok(fs.existsSync(filePath), `${resource.slug} apunta a un archivo inexistente`);
    assert.ok(fs.statSync(filePath).size > 0, `${resource.slug} apunta a un archivo vacío`);
  }
}

console.log(`Platform resources OK: ${platformResourceCatalog.length} activos verificables, trazables y asociados a productos`);

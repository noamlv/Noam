import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { serviceLines } from "../lib/brand-content.ts";
import { siteConfig } from "../lib/site-config.ts";

const root = process.cwd();
const contentMinimums = {
  insights: 10,
  indicators: 4,
  toolkits: 6,
  services: 3,
  cases: 3
} as const;
const topics = new Set(["gobierno", "inversion", "ia"]);
const bannedPublicPhrases = [
  "lorem ipsum",
  "coming soon",
  "queued for v2",
  "noam in english is prepared",
  "contenido pendiente",
  "próximamente"
];

function read(relativePath: string) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function pageFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory() && !["admin", "api", "portal"].includes(entry.name)) return pageFiles(target);
    return entry.isFile() && entry.name === "page.tsx" ? [target] : [];
  });
}

for (const filePath of pageFiles(path.join(root, "app"))) {
  const source = fs.readFileSync(filePath, "utf8").toLowerCase();
  for (const phrase of bannedPublicPhrases) {
    assert.ok(!source.includes(phrase), `${path.relative(root, filePath)} contiene texto editorial pendiente: ${phrase}`);
  }
}

for (const [collection, minimum] of Object.entries(contentMinimums)) {
  const directory = path.join(root, "content", collection);
  const files = fs.readdirSync(directory).filter((file) => file.endsWith(".mdx"));
  assert.ok(files.length >= minimum, `${collection} debe mantener al menos ${minimum} publicaciones`);

  for (const file of files) {
    const relativePath = path.join("content", collection, file);
    const parsed = matter(read(relativePath));
    const data = parsed.data as Record<string, unknown>;

    for (const field of ["title", "description", "date", "tags", "topic", "readingTime", "ogImage"]) {
      assert.ok(data[field], `${relativePath} requiere frontmatter ${field}`);
    }
    assert.ok(String(data.title).length >= 12, `${relativePath} requiere un título descriptivo`);
    assert.ok(String(data.description).length >= 50, `${relativePath} requiere una descripción útil para buscadores`);
    assert.ok(!Number.isNaN(Date.parse(String(data.date))), `${relativePath} requiere una fecha válida`);
    assert.ok(Array.isArray(data.tags) && data.tags.length >= 2, `${relativePath} requiere al menos dos etiquetas`);
    assert.ok(topics.has(String(data.topic)), `${relativePath} usa un tema no permitido`);
    assert.ok(String(data.ogImage).startsWith("/"), `${relativePath} requiere una ruta OG estable`);
    assert.ok(parsed.content.trim().length >= 350, `${relativePath} necesita suficiente desarrollo editorial`);
    if (collection === "services") assert.ok(String(data.outcome ?? "").length >= 40, `${relativePath} debe declarar el resultado ofrecido`);
    if (collection === "cases" && data.caseType === "institutional") {
      for (const field of ["client", "engagement", "evidence", "disclosure"]) {
        assert.ok(String(data[field] ?? "").length >= 8, `${relativePath} requiere ${field} para trazabilidad institucional`);
      }
      assert.ok(String(data.period ?? "").length >= 4, `${relativePath} requiere period para trazabilidad institucional`);
      assert.ok(String(data.disclosure).length >= 60, `${relativePath} debe explicar los límites de divulgación`);
    }
  }
}

const institutionalCases = fs.readdirSync(path.join(root, "content", "cases"))
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => matter(read(path.join("content", "cases", file))).data)
  .filter((data) => data.caseType === "institutional");
assert.ok(institutionalCases.length >= 3, "NOAM debe publicar al menos tres casos institucionales trazables");

assert.deepEqual(siteConfig.social, {
  linkedin: "https://www.linkedin.com/in/noamlv",
  github: "https://github.com/noamlv"
}, "La identidad pública debe usar únicamente perfiles verificados");

const englishPage = read("app/en/page.tsx");
for (const section of ["What we do", "Who we work for", "Open work", "How we work", "Our standard"]) {
  assert.ok(englishPage.includes(section), `/en debe incluir la sección ${section}`);
}
assert.ok(englishPage.includes('lang="en"'), "/en debe declarar el idioma del contenido");
assert.ok(englishPage.includes('locale: "en_US"'), "/en debe declarar OpenGraph en inglés");

for (const service of serviceLines) {
  assert.match(service.imageCaption, /Escena editorial representativa/, `${service.slug} debe identificar sus imágenes representativas`);
}

const sitemap = read("app/sitemap.ts");
assert.ok(sitemap.includes('"/en"'), "El sitemap debe publicar la portada internacional");

console.log(`Editorial OK: ${Object.values(contentMinimums).reduce((total, value) => total + value, 0)}+ contenidos y portada internacional verificadas`);

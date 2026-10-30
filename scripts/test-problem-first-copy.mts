import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

function publicFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? publicFiles(file) : /\.(tsx?|mdx)$/.test(file) ? [file] : [];
  });
}

const files = ["app", "components", "lib", "content"].flatMap(publicFiles);
for (const file of files) {
  // Legacy URLs and stable resource IDs remain valid; they are not editorial copy.
  const copy = readFileSync(file, "utf8")
    .replace(/\/(?:toolkits|downloads)\/[^\s"'<>)}\]]+/g, "")
    .replace(/\btdr-[a-z0-9-]+\b/g, "");
  assert.ok(!/\bTDR\b|términos de referencia|término de referencia/i.test(copy), `${file}: remove procurement-template framing from public copy`);
  assert.ok(!/se plasma en preguntas de diseño|a Guía de trabajo ya publicados|antes de elegir una intervención un estudio/.test(copy), `${file}: review wording in context`);
}

const guides = readdirSync("content/toolkits").filter((name) => name.startsWith("tdr-") && name.endsWith(".mdx"));
assert.equal(guides.length, 19);
for (const name of guides) {
  const copy = readFileSync(path.join("content/toolkits", name), "utf8");
  const title = copy.match(/^title: "(.+)"/m)?.[1];
  assert.ok(title && title.length >= 12, `${name}: needs a descriptive title`);
  const cta = copy.match(/<CTA>([\s\S]*?)<\/CTA>/)?.[1] ?? "";
  assert.match(cta, /Si necesitas apoyo/, `${name}: assistance must be optional`);
  assert.match(cta, /\]\(\/contact(?:\?|\))/, `${name}: contact link must be usable`);
  assert.match(copy, /<Findings title="[^"]+">/, `${name}: distinguish guidance from observed findings`);
}
assert.match(readFileSync("content/cases/gore-cusco-evaluacion-prevencion-trata.mdx", "utf8"), /documentación contractual exige confidencialidad absoluta/);
console.log(`Problem-first copy OK: ${files.length} public source files and 19 guides; legacy links and confidentiality preserved.`);

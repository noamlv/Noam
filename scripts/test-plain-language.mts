import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

// These checks protect specific editorial regressions, not a machine-generated readability score.
const hubs = readdirSync("app").filter((name) => name.startsWith("analisis-")).map((name) => `app/${name}/page.tsx`);
for (const file of hubs) {
  const source = readFileSync(file, "utf8");
  const hero = source.match(/<Heading as="h1"[^>]*>([^<]+)<\/Heading>/)?.[1];
  assert.ok(hero && hero.trim().split(/\s+/).length <= 16, `${file}: keep the topic heading short`);
  assert.ok(!/Explorar preguntas y guía|Definir la necesidad|Primera definición|Diseñar un alcance/.test(source), `${file}: avoid ambiguous navigation labels`);
  assert.match(source, /href="\/toolkits\/[^"]+"[^>]*>Leer la guía</, `${file}: guide button describes its destination`);
  assert.match(source, /<Section id="decisiones">/, `${file}: analysis anchor remains available`);
}
const waste = readFileSync("app/analisis-datos-residuos-limpieza-publica/page.tsx", "utf8");
assert.match(waste, /href="\/dataperu\/temas\/residuos"[^>]*>Ver datos de residuos</);
const mdx = readFileSync("components/mdx/content-blocks.tsx", "utf8");
assert.ok(!mdx.includes('title="CTA"'), "Do not expose internal marketing labels to readers");
const resources = readFileSync("lib/platform-resource-catalog.ts", "utf8");
for (const name of readdirSync("content/toolkits").filter((name) => name.startsWith("tdr-"))) {
  const guide = readFileSync(`content/toolkits/${name}`, "utf8");
  const slug = name.replace(/\.mdx$/, "");
  if (resources.includes(`slug: "${slug}"`)) {
    const title = guide.match(/^title: "(.+)"/m)?.[1];
    assert.ok(title && resources.includes(`title: "${title}"`), `${slug}: catalog and guide should agree`);
  }
}
console.log(`Plain language OK: ${hubs.length} sector pages, direct data links, guide labels and resource titles.`);

const home = readFileSync("app/page.tsx", "utf8");
assert.ok(home.includes("Consultoría para gobiernos y empresas"));
assert.ok(!home.includes("proofSignals"), "Do not restore internal counters in the home hero");
assert.ok(!home.includes("hero.caption") && !home.includes("hero.eyebrow"), "Keep editorial slogans off the hero image");
assert.ok(!home.includes("Análisis de datos para decisiones públicas y territoriales."), "No final period in the home headline");
assert.match(home, /href="\/contact"[^>]*>Conversar sobre un problema</);
const contact = readFileSync("app/contact/page.tsx", "utf8");
assert.ok(!/Contacto directo y trazable|infraestructura persistente|almacenar de forma persistente/.test(contact), "Contact copy is for visitors, not developers");
const barometer = readFileSync("app/barometro-ciudadano/page.tsx", "utf8");
assert.ok(barometer.includes("La encuesta es de IMASEN"));
assert.ok(barometer.includes("no describen la opinión actual"));
assert.ok(readFileSync("app/sitemap.ts", "utf8").includes('"/barometro-ciudadano"'));

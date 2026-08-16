import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
const briefSource = read("lib/brief.ts");
const detailSource = read("app/brief/[slug]/page.tsx");
const archiveSource = read("app/brief/page.tsx");
const rssSource = read("app/brief/rss.xml/route.ts");
const sitemapSource = read("app/sitemap.ts");
const searchSource = read("lib/search.ts");
const renamu = JSON.parse(read("data/processed/renamu-2025-municipalities.json"));
const context = JSON.parse(read("data/processed/dataperu-context-2025.json"));

assert.equal(renamu.summary.municipalities, 1891, "La edición debe apoyarse en el universo municipal validado");
assert.equal(renamu.summary.byType.Provincial.medianReportedWorkforce, 295);
assert.equal(renamu.summary.byType.Distrital.medianReportedWorkforce, 34);
assert.equal(renamu.summary.updatedTransparencyPercent, 36.8);
assert.equal(context.summary.municipalities, 1891);
assert.ok(renamu.source.datasetUrl.startsWith("https://"));
assert.ok(context.sources.budget.pageUrl.startsWith("https://"));

assert.match(briefSource, /panoramaFindings/, "Las cifras deben derivarse del estudio fuente");
assert.match(briefSource, /const \[scaleFinding, , investmentFinding, transparencyFinding\]/, "La selección de señales debe ser explícita");
assert.match(briefSource, /renamuSummary\.byType\.Provincial\.medianReportedWorkforce/, "La escala operativa no debe duplicarse como literal");
assert.match(briefSource, /investmentFinding\.value/, "La brecha de inversión no debe duplicarse como literal");
assert.match(briefSource, /transparencyFinding\.value/, "La cifra de transparencia no debe duplicarse como literal");
assert.match(briefSource, /slug: "municipios-distintos-decisiones-distintas"/);
assert.equal((briefSource.match(/number: "0[123]"/g) ?? []).length, 3, "La edición piloto debe conservar el formato de tres señales");
assert.match(briefSource, /sourceHref: renamuSource\.datasetUrl/);
assert.match(briefSource, /sourceHref: dataperuSources\.budget\.pageUrl/);

assert.match(detailSource, /articleJsonLd/, "El detalle debe publicar schema Article");
assert.match(detailSource, /Límite de lectura/, "Cada señal debe hacer visible su límite");
assert.match(detailSource, /NewsletterSignup/, "La edición debe cerrar con captación voluntaria");
assert.match(archiveSource, /getLatestBriefEdition/, "El archivo debe resolver la edición reciente desde el modelo");
assert.match(rssSource, /briefEditions/, "El RSS debe alimentarse del mismo archivo versionado");
assert.match(sitemapSource, /briefEditions/, "Las ediciones deben entrar al sitemap");
assert.match(searchSource, /briefEntries/, "Las ediciones deben ser encontrables en la búsqueda interna");

console.log("Brief OK: edición piloto, cifras derivadas, fuentes, límites, SEO, RSS y archivo versionado");

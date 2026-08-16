import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { serviceLines } from "../lib/brand-content.ts";
import { privatePractices, publicPractices } from "../lib/sector-practices.ts";
import { solutions } from "../lib/solutions.ts";

const root = process.cwd();
const images = new Set(serviceLines.map((service) => service.image));

assert.equal(serviceLines.length, 3, "La dirección visual debe cubrir las tres capacidades");
assert.equal(images.size, 3, "Cada capacidad debe tener una escena editorial propia");

for (const service of serviceLines) {
  const filePath = path.join(root, "public", service.image.replace(/^\//, ""));
  assert.ok(fs.existsSync(filePath), `${service.image} debe existir`);
  const size = fs.statSync(filePath).size;
  assert.ok(size > 100_000 && size < 1_000_000, `${service.image} debe conservar detalle sin exceder 1 MB`);
  assert.ok(service.imageAlt.length >= 40, `${service.slug} debe tener alt descriptivo`);
  assert.match(service.imageCaption, /Escena editorial representativa/);
  assert.match(service.imageCaption, /No corresponde a un cliente/);
}

for (const solution of solutions) {
  assert.ok(serviceLines.some((service) => service.slug === solution.serviceSlug), `${solution.slug} debe resolver una escena desde su capacidad`);
}

const transparency = fs.readFileSync(path.join(root, "app/transparency/page.tsx"), "utf8");
assert.match(transparency, /Escena editorial/);
assert.match(transparency, /No documenta un cliente/);

const practices = [...publicPractices, ...privatePractices];
const practiceImages = new Set(practices.map((practice) => practice.image));
assert.ok(practiceImages.size >= 7, "Las landings sectoriales deben evitar una única fotografía repetida");
for (const practice of practices) {
  const filePath = path.join(root, "public", practice.image.replace(/^\//, ""));
  assert.ok(fs.existsSync(filePath), `${practice.image} debe existir`);
  const size = fs.statSync(filePath).size;
  assert.ok(size >= 250_000 && size <= 750_000, `${practice.image} debe conservar detalle con un peso razonable`);
}
const practicePage = fs.readFileSync(path.join(root, "components/brand/sector-practice-page.tsx"), "utf8");
assert.match(practicePage, /Imagen editorial/);
assert.match(practicePage, /no corresponde a un cliente/);

console.log(`Dirección visual OK: ${practiceImages.size + images.size} escenas originales cubren capacidades, soluciones y prácticas sectoriales`);

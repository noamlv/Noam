import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { noamProfile } from "../lib/profile.ts";

const root = process.cwd();
const sourcePath = path.join(root, "content/profile/noam-cv-public.md");
const pdfPath = path.join(root, "public/docs/noam-cv-public.pdf");
const publicCvPage = fs.readFileSync(path.join(root, "app/cv/page.tsx"), "utf8");
const source = fs.readFileSync(sourcePath, "utf8");
const forbidden = [
  /\bDNI\b/i,
  /\bpasaporte\b/i,
  /fecha de nacimiento/i,
  /c[oó]digo PUCP/i,
  /c[oó]digo UNI/i,
  /direcci[oó]n personal/i,
  /domicilio/i,
  /calle domingo el[ií]as/i
];

for (const pattern of forbidden) assert.doesNotMatch(source, pattern, `El CV público no debe contener ${pattern}`);

assert.ok(fs.existsSync(pdfPath), "El CV público generado debe existir");
assert.ok(fs.statSync(pdfPath).size < 2_000_000, "El CV público debe pesar menos de 2 MB");
assert.match(source, /hola@noam\.pe/);
assert.match(source, /Web: noam\.pe/);
assert.match(source, /Doctor en Ciencia Política y Gobierno/);
assert.doesNotMatch(source, /Candidato a Doctor/i);
assert.equal(noamProfile.email, "hola@noam.pe");
assert.match(noamProfile.headline, /Doctor en Ciencia Política y Gobierno/);
assert.doesNotMatch(noamProfile.bio.join(" "), /candidato a doctor/i);
assert.equal(noamProfile.credentials.length, 4);
assert.ok(noamProfile.researchAndTeaching.length >= 4);
assert.ok(noamProfile.publicLeadership.length >= 3);
assert.doesNotMatch(publicCvPage, /fullCvPdf|noam-cv\.pdf/, "La página pública no debe enlazar el expediente histórico");

console.log("Perfil público OK: credenciales estructuradas, PDF liviano y sin datos sensibles");

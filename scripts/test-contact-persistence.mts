import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

async function loadLocalEnv() {
  const raw = await fs.readFile(path.join(process.cwd(), ".env.local"), "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...parts] = trimmed.split("=");
    if (!process.env[key]) process.env[key] = parts.join("=").trim().replace(/^['"]|['"]$/g, "");
  }
}

await loadLocalEnv();
assert.ok(process.env.DATABASE_URL, "DATABASE_URL es obligatorio para probar persistencia");

const baseUrl = new URL(process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000");
assert.ok(["localhost", "127.0.0.1"].includes(baseUrl.hostname), "Esta prueba solo puede ejecutarse contra la web local");

const marker = crypto.randomUUID();
const email = `qa-contact+${marker}@noam.pe`;
const originPath = `/qa/contact-${marker}`;
const sql = postgres(process.env.DATABASE_URL, {
  max: 1,
  prepare: false,
  ssl: process.env.NOAM_DB_SSL === "false" ? false : "require"
});

try {
  const response = await fetch(new URL("/api/leads", baseUrl), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "Validación de contacto NOAM",
      email,
      organization: "Entidad local de prueba",
      role: "Responsable de validación",
      organizationType: "municipality",
      territory: "Perú",
      interest: "diagnostico-agenda-territorial",
      timeline: "exploring",
      budgetRange: "to-define",
      message: "Verificación automatizada y reversible de persistencia del formulario.",
      source: "automated-local-test",
      originPath,
      consent: true,
      website: ""
    })
  });

  const payload = await response.json();
  assert.equal(response.status, 201, `La API debe guardar el lead: ${JSON.stringify(payload)}`);
  assert.equal(payload.lead.email, email);

  const [storedLead] = await sql`
    select email, organization_type, interest, origin_path, consent_at
    from leads
    where email = ${email}
  `;
  assert.ok(storedLead, "El lead debe existir en Postgres");
  assert.equal(storedLead.organization_type, "municipality");
  assert.equal(storedLead.interest, "diagnostico-agenda-territorial");
  assert.equal(storedLead.origin_path, originPath);
  assert.ok(storedLead.consent_at, "El consentimiento debe conservar su fecha");

  const [event] = await sql`
    select event_name, target
    from analytics_events
    where path = ${originPath}
      and event_name = 'lead_submit'
  `;
  assert.ok(event, "La conversión debe registrarse en analítica propia");
  assert.equal(event.target, "diagnostico-agenda-territorial");
} finally {
  await sql`delete from analytics_events where path = ${originPath}`;
  await sql`delete from leads where email = ${email}`;
  await sql.end();
}

console.log("Contact persistence OK: API, Postgres, consentimiento y conversión verificados sin dejar datos");

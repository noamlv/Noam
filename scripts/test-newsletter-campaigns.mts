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

const { getDb } = await import("../lib/db.ts");
const identity = await import("../lib/admin-identity.ts");
const newsletter = await import("../lib/newsletter.ts");
const campaigns = await import("../lib/newsletter-campaigns.ts");
const { newsletterCampaignInputSchema } = await import("../lib/newsletter-campaign-validation.ts");
const db = getDb();
if (!db) throw new Error("DATABASE_URL es obligatoria para test:campaigns:db");

const stamp = Date.now();
const adminEmail = `qa-campaign-admin-${stamp}@noam.local`;
const electoralEmail = `qa-campaign-electoral-${stamp}@noam.local`;
const dataEmail = `qa-campaign-data-${stamp}@noam.local`;
const slug = `brief-qa-${stamp}`;
let actorId: string | null = null;
let campaignId: string | null = null;

try {
  const actor = await identity.createAdminUser({
    email: adminEmail,
    displayName: "QA Campaign",
    role: "owner",
    password: "Noam-QA-Campaign-2026!"
  });
  actorId = actor.id;

  const electoral = await newsletter.requestNewsletterSubscription({
    name: "Electoral QA", email: electoralEmail, interests: ["electoral"], sourcePath: "/newsletter", consent: true
  });
  const data = await newsletter.requestNewsletterSubscription({
    name: "Datos QA", email: dataEmail, interests: ["datos-ia"], sourcePath: "/newsletter", consent: true
  });
  assert.equal(electoral.status, "pending");
  assert.equal(data.status, "pending");
  await newsletter.confirmNewsletterSubscription(electoral.confirmationToken);
  await newsletter.confirmNewsletterSubscription(data.confirmationToken);

  assert.equal(newsletterCampaignInputSchema.safeParse({
    slug, subject: "Asunto QA", previewText: "Preview", title: "Edición QA",
    bodyText: "Un contenido suficientemente amplio para verificar el flujo editorial.",
    ctaLabel: "Abrir", ctaUrl: "javascript:alert(1)", audienceInterests: ["electoral"]
  }).success, false, "Debe rechazar protocolos inseguros");

  const input = newsletterCampaignInputSchema.parse({
    slug,
    subject: "Tres señales territoriales para decidir",
    previewText: "Una edición de prueba sin envío externo.",
    title: "Decisiones públicas con mejor evidencia",
    bodyText: "Primera lectura operativa para equipos públicos.\n\nSegunda lectura con una implicancia concreta para la gestión.",
    ctaLabel: "Explorar DataPerú",
    ctaUrl: "/dataperu",
    audienceInterests: ["electoral", "electoral"]
  });
  assert.deepEqual(input.audienceInterests, ["electoral"], "Debe normalizar segmentos duplicados");
  const created = await campaigns.createNewsletterCampaign(input, actor.id);
  campaignId = created.id;
  assert.equal(created.status, "draft");

  const updated = await campaigns.updateNewsletterCampaign(created.id, { ...input, subject: "Asunto actualizado y verificable" }, actor.id);
  assert.equal(updated.subject, "Asunto actualizado y verificable");
  const scheduledAt = new Date(Date.now() + 3_600_000).toISOString();
  const scheduled = await campaigns.scheduleNewsletterCampaign(created.id, scheduledAt, actor.id);
  assert.equal(scheduled.status, "scheduled");

  let capturedToken = "";
  const result = await campaigns.dispatchNewsletterCampaign(created.id, actor.id, async ({ recipient, unsubscribeToken }) => {
    assert.equal(recipient.email, electoralEmail, "El segmento no debe incluir otras preferencias");
    assert.ok(unsubscribeToken.length >= 40);
    throw new Error("Fallo simulado del proveedor");
  });
  assert.deepEqual(result, { audience: 1, sent: 0, failed: 1 });
  const sent = await campaigns.getNewsletterCampaign(created.id);
  assert.equal(sent?.status, "sent");
  assert.equal(sent?.recipientCounts.failed, 1);

  const retry = await campaigns.retryNewsletterCampaignFailures(created.id, actor.id, async ({ recipient, unsubscribeToken }) => {
    assert.equal(recipient.email, electoralEmail);
    capturedToken = unsubscribeToken;
    return { messageId: "qa-message-retry" };
  });
  assert.deepEqual(retry, { attempted: 1, sent: 1, failed: 0, skipped: 0 });
  const recovered = await campaigns.getNewsletterCampaign(created.id);
  assert.equal(recovered?.recipientCounts.sent, 1);
  assert.equal(recovered?.recipientCounts.failed, 0);
  assert.ok(capturedToken.length >= 40);
  assert.equal(await newsletter.unsubscribeNewsletter(capturedToken), true, "La baja por edición debe desactivar al suscriptor");
  assert.equal(await newsletter.unsubscribeNewsletter(capturedToken), false, "La baja por edición debe ser de un solo uso efectivo");
  const afterUnsubscribe = await campaigns.getNewsletterCampaign(created.id);
  assert.equal(afterUnsubscribe?.recipientCounts.unsubscribed, 1);

  const [audit] = await db<{ count: number }[]>`
    select count(*)::int as count from admin_audit_events
    where actor_user_id = ${actor.id}
      and event_type in ('newsletter.campaign.dispatched', 'newsletter.campaign.failures_retried')
  `;
  assert.equal(audit.count, 2, "El despacho y el reintento deben quedar auditados");
  console.log("Newsletter campaigns OK: borrador, segmento, programación, reintento, baja individual y auditoría verificados");
} finally {
  if (campaignId) await db`delete from newsletter_campaigns where id = ${campaignId}`;
  await db`delete from newsletter_subscribers where lower(email) in (lower(${electoralEmail}), lower(${dataEmail}))`;
  if (actorId) {
    await db`delete from admin_audit_events where actor_user_id = ${actorId} or entity_id = ${actorId}`;
    await db`delete from admin_users where id = ${actorId}`;
  }
  await db.end();
}

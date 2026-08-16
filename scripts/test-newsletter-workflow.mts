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
  console.log("Newsletter workflow omitido: DATABASE_URL no está configurado");
  process.exit(0);
}

const newsletter = await import("../lib/newsletter.ts");
const { newsletterSubscriptionSchema } = await import("../lib/newsletter-validation.ts");
const { getDb } = await import("../lib/db.ts");
const db = getDb();
assert.ok(db);
const email = "qa-newsletter@noam.pe";

try {
  await db`delete from newsletter_subscribers where lower(email) = lower(${email})`;
  assert.equal(newsletterSubscriptionSchema.safeParse({ name: "QA", email, interests: ["electoral", "electoral"], sourcePath: "/newsletter", consent: true }).success, false, "La validación debe rechazar preferencias duplicadas");
  const baseline = await newsletter.getNewsletterAudienceSummary();
  const request = await newsletter.requestNewsletterSubscription({
    name: "Audiencia QA", email, interests: ["gestion-publica", "datos-ia"],
    sourcePath: "/newsletter", consent: true
  });
  assert.equal(request.status, "pending");
  assert.ok(request.confirmationToken.length >= 40);
  assert.ok(request.unsubscribeToken.length >= 40);

  const [stored] = await db`
    select status, confirmation_token_hash, unsubscribe_token_hash
    from newsletter_subscribers where lower(email) = lower(${email})
  `;
  assert.equal(stored.status, "pending");
  assert.equal(stored.confirmation_token_hash.length, 64);
  assert.equal(stored.unsubscribe_token_hash.length, 64);
  assert.notEqual(stored.confirmation_token_hash, request.confirmationToken);
  assert.notEqual(stored.unsubscribe_token_hash, request.unsubscribeToken);
  const pendingSummary = await newsletter.getNewsletterAudienceSummary();
  assert.equal(pendingSummary.total, baseline.total + 1);
  assert.equal(pendingSummary.pending, baseline.pending + 1);

  assert.equal(await newsletter.confirmNewsletterSubscription(request.confirmationToken), true);
  assert.equal(await newsletter.confirmNewsletterSubscription(request.confirmationToken), false, "El token de confirmación debe ser de un solo uso");
  const activeSummary = await newsletter.getNewsletterAudienceSummary();
  assert.equal(activeSummary.active, baseline.active + 1);
  assert.equal(activeSummary.byInterest.find((item) => item.interest === "gestion-publica")?.count, (baseline.byInterest.find((item) => item.interest === "gestion-publica")?.count ?? 0) + 1);
  assert.equal(activeSummary.byInterest.find((item) => item.interest === "datos-ia")?.count, (baseline.byInterest.find((item) => item.interest === "datos-ia")?.count ?? 0) + 1);
  const known = await newsletter.requestNewsletterSubscription({ name: "QA", email, interests: ["electoral"], sourcePath: "/evidence", consent: true });
  assert.equal(known.status, "already_active", "Una dirección activa no debe rotar por una solicitud repetida");

  assert.equal(await newsletter.unsubscribeNewsletter(request.unsubscribeToken), true);
  assert.equal(await newsletter.unsubscribeNewsletter(request.unsubscribeToken), false, "La baja repetida no debe mutar de nuevo");
  const unsubscribedSummary = await newsletter.getNewsletterAudienceSummary();
  assert.equal(unsubscribedSummary.unsubscribed, baseline.unsubscribed + 1);

  const resubscribe = await newsletter.requestNewsletterSubscription({ name: "QA", email, interests: ["electoral"], sourcePath: "/evidence", consent: true });
  assert.equal(resubscribe.status, "pending");
  assert.notEqual(resubscribe.confirmationToken, request.confirmationToken);
  const [pendingAgain] = await db`select status, interests from newsletter_subscribers where lower(email) = lower(${email})`;
  assert.equal(pendingAgain.status, "pending");
  assert.deepEqual(pendingAgain.interests, ["electoral"]);
} finally {
  await db`delete from newsletter_subscribers where lower(email) = lower(${email})`;
  const [residue] = await db`select count(*)::int as count from newsletter_subscribers where lower(email) = lower(${email})`;
  assert.equal(residue.count, 0);
  await db.end();
}

console.log("Newsletter workflow OK: consentimiento, hashes, confirmación, baja y reingreso verificados sin dejar datos");

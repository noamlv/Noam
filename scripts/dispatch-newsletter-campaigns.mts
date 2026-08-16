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
const { hasOutboundEmailConfig } = await import("../lib/env.ts");
const { dispatchNewsletterCampaign, getDueNewsletterCampaigns } = await import("../lib/newsletter-campaigns.ts");
const { sendNewsletterCampaignEdition } = await import("../lib/notifications.ts");
const db = getDb();
const actorEmail = process.env.NOAM_CAMPAIGN_ACTOR_EMAIL?.trim().toLowerCase();

if (!db) throw new Error("DATABASE_URL es obligatorio para despachar campañas.");
if (!hasOutboundEmailConfig()) throw new Error("RESEND_API_KEY y LEAD_NOTIFY_FROM son obligatorios para despachar campañas.");
if (!actorEmail) throw new Error("NOAM_CAMPAIGN_ACTOR_EMAIL debe identificar al operador responsable.");

try {
  const [actor] = await db<{ id: string }[]>`
    select id from admin_users
    where lower(email) = ${actorEmail}
      and status = 'active'
      and role in ('owner', 'editor')
      and must_change_password = false
      and mfa_enabled_at is not null
  `;
  if (!actor) throw new Error("El operador de campañas debe estar activo, tener rol editor/owner, contraseña definitiva y MFA.");

  const due = await getDueNewsletterCampaigns();
  if (!due.length) {
    console.log("Campaign dispatch OK: no hay ediciones vencidas.");
  } else {
    for (const id of due) {
      const result = await dispatchNewsletterCampaign(id, actor.id, sendNewsletterCampaignEdition, { dueOnly: true });
      console.log(`Campaign ${id}: ${result.sent} enviadas, ${result.failed} fallidas.`);
    }
  }
} finally {
  await db.end();
}

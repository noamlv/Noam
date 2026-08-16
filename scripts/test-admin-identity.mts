import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
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
  console.log("Admin identity omitido: DATABASE_URL no está configurado");
  process.exit(0);
}

process.env.NOAM_AUTH_ENCRYPTION_KEY ||= randomBytes(32).toString("base64url");

const identity = await import("../lib/admin-identity.ts");
const { getDb } = await import("../lib/db.ts");
const db = getDb();
assert.ok(db);
const email = `qa-admin-${crypto.randomUUID()}@noam.pe`;
const ownerEmail = `qa-owner-${crypto.randomUUID()}@noam.pe`;
const password = "Prueba-Segura-2026!";
let userId: string | null = null;
let ownerId: string | null = null;

try {
  assert.equal(identity.validateAdminPassword("débil"), false);
  const hash = await identity.hashAdminPassword(password);
  assert.match(hash, /^scrypt\$/);
  assert.equal(await identity.verifyAdminPassword(password, hash), true);
  assert.equal(await identity.verifyAdminPassword("Incorrecta-2026!", hash), false);

  const user = await identity.createAdminUser({ email, displayName: "Operador QA", role: "editor", password });
  userId = user.id;
  assert.equal(user.mustChangePassword, true);
  assert.equal((await identity.authenticateAdminCredentials(email, "Incorrecta-2026!")), null);
  const authenticated = await identity.authenticateAdminCredentials(email.toUpperCase(), password);
  assert.ok(authenticated);
  assert.equal(authenticated.role, "editor");

  const session = await identity.createAdminSession(user.id);
  assert.ok(session.token.length >= 40);
  const [stored] = await db`select token_hash, expires_at, revoked_at from admin_sessions where id = ${session.sessionId}`;
  assert.equal(stored.token_hash.length, 64);
  assert.notEqual(stored.token_hash, session.token);
  assert.equal(stored.revoked_at, null);

  const principal = await identity.getAdminPrincipalByToken(session.token);
  assert.ok(principal);
  assert.equal(principal.userId, user.id);
  assert.equal(principal.role, "editor");
  assert.equal(principal.mustChangePassword, true);
  const otherSession = await identity.createAdminSession(user.id);
  assert.equal(await identity.changeAdminPassword({ userId: user.id, currentPassword: "Incorrecta-2026!", newPassword: "Nueva-Segura-2026!", currentSessionId: session.sessionId }), false);
  assert.equal(await identity.changeAdminPassword({ userId: user.id, currentPassword: password, newPassword: "Nueva-Segura-2026!", currentSessionId: session.sessionId }), true);
  assert.equal(await identity.authenticateAdminCredentials(email, password), null, "La contraseña anterior debe dejar de funcionar");
  assert.ok(await identity.authenticateAdminCredentials(email, "Nueva-Segura-2026!"));
  assert.equal(await identity.getAdminPrincipalByToken(otherSession.token), null, "Cambiar contraseña debe revocar otras sesiones");
  assert.ok(await identity.getAdminPrincipalByToken(session.token), "La sesión actual debe permanecer disponible");
  assert.equal((await identity.getAdminPrincipalByToken(session.token))?.mustChangePassword, false);
  const mfaSecret = await identity.startAdminMfaEnrollment(user.id);
  assert.match(mfaSecret, /^[A-Z2-7]{32}$/);
  const pendingMfa = await identity.getPendingAdminMfa(user.id);
  assert.equal(pendingMfa?.secret, mfaSecret);
  const mfaCode = identity.generateTotpCode(mfaSecret);
  const recoveryCodes = await identity.confirmAdminMfa(user.id, mfaCode, session.sessionId);
  assert.equal(recoveryCodes?.length, 8);
  assert.equal(await identity.authenticateAdminCredentials(email, "Nueva-Segura-2026!"), null, "MFA debe ser obligatorio después de activarse");
  assert.ok(await identity.authenticateAdminCredentials(email, "Nueva-Segura-2026!", mfaCode));
  assert.ok(await identity.authenticateAdminCredentials(email, "Nueva-Segura-2026!", recoveryCodes![0]));
  assert.equal(await identity.authenticateAdminCredentials(email, "Nueva-Segura-2026!", recoveryCodes![0]), null, "Un código de recuperación sólo funciona una vez");
  assert.equal((await identity.getAdminPrincipalByToken(session.token))?.mfaEnabled, true);
  assert.equal(await identity.revokeAdminSession({ sessionId: session.sessionId, actorUserId: user.id }), true);
  assert.equal(await identity.getAdminPrincipalByToken(session.token), null);

  const events = await identity.getAdminAuditEvents(20);
  assert.ok(events.some((event) => event.actorUserId === user.id && event.eventType === "admin.login.succeeded"));
  assert.ok(events.some((event) => event.actorUserId === user.id && event.eventType === "admin.session.revoked"));
  assert.ok(events.some((event) => event.actorUserId === user.id && event.eventType === "admin.password.changed"));
  const owner = await identity.createAdminUser({ email: ownerEmail, displayName: "Owner QA", role: "owner", password: "Owner-Seguro-2026!" });
  ownerId = owner.id;
  assert.equal(await identity.updateAdminUserAccess({ actorUserId: owner.id, userId: user.id, role: "analyst", status: "suspended" }), true);
  assert.equal(await identity.authenticateAdminCredentials(email, "Nueva-Segura-2026!", mfaCode), null, "Una identidad suspendida no puede autenticarse");
  await assert.rejects(identity.updateAdminUserAccess({ actorUserId: owner.id, userId: owner.id, role: "owner", status: "suspended" }), /propia identidad/);
} finally {
  const ids = [userId, ownerId].filter((id): id is string => Boolean(id));
  if (ids.length) {
    await db`delete from admin_audit_events where actor_user_id in ${db(ids)}`;
    await db`delete from admin_users where id in ${db(ids)}`;
  }
  const [residue] = await db`select count(*)::int as count from admin_users where lower(email) = lower(${email})`;
  assert.equal(residue.count, 0);
  const [ownerResidue] = await db`select count(*)::int as count from admin_users where lower(email) = lower(${ownerEmail})`;
  assert.equal(ownerResidue.count, 0);
  await db.end();
}

console.log("Admin identity OK: scrypt, login individual, sesión hasheada, revocación y auditoría verificados sin dejar datos");

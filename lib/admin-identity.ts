import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { getDb } from "./db.ts";
import type { AdminAuditEvent, AdminPrincipal, AdminRole, AdminSession, AdminUser } from "../types/admin.ts";

const passwordParameters = { cost: 16_384, blockSize: 8, parallelization: 1, keyLength: 64 } as const;

function derivePassword(password: string, salt: string, keyLength: number, options: { N: number; r: number; p: number; maxmem: number }) {
  return new Promise<Buffer>((resolve, reject) => {
    scryptCallback(password, salt, keyLength, options, (error, derived) => error ? reject(error) : resolve(derived));
  });
}

function requireDb() {
  const db = getDb();
  if (!db) throw new Error("Postgres es obligatorio para la identidad administrativa.");
  return db;
}

function sessionHash(token: string) {
  return createHash("sha256").update(`noam-admin-session:${token}`).digest("hex");
}

function encryptionKey() {
  const configured = process.env.NOAM_AUTH_ENCRYPTION_KEY ?? "";
  const key = /^[0-9a-f]{64}$/i.test(configured) ? Buffer.from(configured, "hex") : Buffer.from(configured, "base64url");
  if (key.length !== 32) throw new Error("NOAM_AUTH_ENCRYPTION_KEY debe contener 32 bytes aleatorios en base64url o hexadecimal.");
  return key;
}

function encryptSecret(secret: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(secret, "utf8"), cipher.final()]);
  return `v1.${iv.toString("base64url")}.${cipher.getAuthTag().toString("base64url")}.${ciphertext.toString("base64url")}`;
}

function decryptSecret(encoded: string) {
  const [version, iv, tag, ciphertext] = encoded.split(".");
  if (version !== "v1" || !iv || !tag || !ciphertext) throw new Error("Secreto MFA cifrado inválido.");
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(iv, "base64url"));
  decipher.setAuthTag(Buffer.from(tag, "base64url"));
  return Buffer.concat([decipher.update(Buffer.from(ciphertext, "base64url")), decipher.final()]).toString("utf8");
}

const base32Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Encode(bytes: Buffer) {
  let bits = 0; let value = 0; let output = "";
  for (const byte of bytes) {
    value = (value << 8) | byte; bits += 8;
    while (bits >= 5) { output += base32Alphabet[(value >>> (bits - 5)) & 31]; bits -= 5; }
  }
  if (bits > 0) output += base32Alphabet[(value << (5 - bits)) & 31];
  return output;
}

function base32Decode(value: string) {
  let bits = 0; let accumulator = 0; const output: number[] = [];
  for (const character of value.replace(/=+$/g, "").toUpperCase()) {
    const index = base32Alphabet.indexOf(character);
    if (index < 0) throw new Error("Secreto TOTP inválido.");
    accumulator = (accumulator << 5) | index; bits += 5;
    if (bits >= 8) { output.push((accumulator >>> (bits - 8)) & 255); bits -= 8; }
  }
  return Buffer.from(output);
}

export function generateTotpCode(secret: string, timestamp = Date.now()) {
  const counter = Math.floor(timestamp / 30_000);
  const message = Buffer.alloc(8);
  message.writeBigUInt64BE(BigInt(counter));
  const digest = createHmac("sha1", base32Decode(secret)).update(message).digest();
  const offset = digest[digest.length - 1] & 15;
  const value = (digest.readUInt32BE(offset) & 0x7fffffff) % 1_000_000;
  return value.toString().padStart(6, "0");
}

export function verifyTotpCode(secret: string, code: string, timestamp = Date.now()) {
  if (!/^\d{6}$/.test(code)) return false;
  return [-1, 0, 1].some((window) => {
    const expected = generateTotpCode(secret, timestamp + window * 30_000);
    return timingSafeEqual(Buffer.from(code), Buffer.from(expected));
  });
}

function recoveryHash(code: string) {
  return createHash("sha256").update(`noam-admin-recovery:${code.toUpperCase()}`).digest("hex");
}

export function validateAdminPassword(password: string) {
  return password.length >= 14 && password.length <= 128 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password);
}

export async function hashAdminPassword(password: string) {
  if (!validateAdminPassword(password)) throw new Error("La contraseña debe tener 14–128 caracteres, mayúscula, minúscula, número y símbolo.");
  const salt = randomBytes(16).toString("base64url");
  const derived = await derivePassword(password, salt, passwordParameters.keyLength, {
    N: passwordParameters.cost,
    r: passwordParameters.blockSize,
    p: passwordParameters.parallelization,
    maxmem: 64 * 1024 * 1024
  });
  return `scrypt$${passwordParameters.cost}$${passwordParameters.blockSize}$${passwordParameters.parallelization}$${salt}$${derived.toString("base64url")}`;
}

export async function verifyAdminPassword(password: string, encoded: string) {
  const [algorithm, cost, blockSize, parallelization, salt, digest] = encoded.split("$");
  if (algorithm !== "scrypt" || !cost || !blockSize || !parallelization || !salt || !digest) return false;
  const expected = Buffer.from(digest, "base64url");
  if (expected.length !== passwordParameters.keyLength) return false;
  const derived = await derivePassword(password, salt, expected.length, {
    N: Number(cost), r: Number(blockSize), p: Number(parallelization), maxmem: 64 * 1024 * 1024
  });
  return derived.length === expected.length && timingSafeEqual(derived, expected);
}

type UserRow = {
  id: string; email: string; display_name: string; role: AdminRole; status: "active" | "suspended";
  password_changed_at: string; last_login_at: string | null; mfa_enabled_at: string | null; must_change_password: boolean; created_at: string; updated_at: string;
};

function userFromRow(row: UserRow): AdminUser {
  return { id: row.id, email: row.email, displayName: row.display_name, role: row.role, status: row.status,
    passwordChangedAt: row.password_changed_at, lastLoginAt: row.last_login_at, mfaEnabledAt: row.mfa_enabled_at, mustChangePassword: row.must_change_password, createdAt: row.created_at, updatedAt: row.updated_at };
}

export async function createAdminUser(input: { email: string; displayName: string; role: AdminRole; password: string; actorUserId?: string }) {
  const db = requireDb();
  const passwordHash = await hashAdminPassword(input.password);
  const [row] = await db<UserRow[]>`
    insert into admin_users (email, display_name, role, password_hash)
    values (${input.email.trim().toLowerCase()}, ${input.displayName.trim()}, ${input.role}, ${passwordHash})
    returning id, email, display_name, role, status, password_changed_at, last_login_at, mfa_enabled_at, must_change_password, created_at, updated_at
  `;
  await recordAdminAudit({ actorUserId: input.actorUserId ?? row.id, eventType: "admin.user.created", entityType: "admin_user", entityId: row.id, metadata: { role: row.role } });
  return userFromRow(row);
}

export async function hasAdminUsers() {
  const db = getDb();
  if (!db) return false;
  const [row] = await db<{ count: number }[]>`select count(*)::int as count from admin_users`;
  return (row?.count ?? 0) > 0;
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  const db = requireDb();
  const rows = await db<UserRow[]>`select id, email, display_name, role, status, password_changed_at, last_login_at, mfa_enabled_at, must_change_password, created_at, updated_at from admin_users order by created_at asc`;
  return rows.map(userFromRow);
}

export async function updateAdminUserAccess(input: { actorUserId: string; userId: string; role: AdminRole; status: "active" | "suspended" }) {
  const db = requireDb();
  if (input.actorUserId === input.userId && input.status === "suspended") throw new Error("No puedes suspender tu propia identidad.");
  const [target] = await db<{ role: AdminRole; status: "active" | "suspended" }[]>`select role, status from admin_users where id = ${input.userId}`;
  if (!target) throw new Error("Identidad no encontrada.");
  if (target.role === "owner" && target.status === "active" && (input.role !== "owner" || input.status !== "active")) {
    const [owners] = await db<{ count: number }[]>`select count(*)::int as count from admin_users where role = 'owner' and status = 'active' and id <> ${input.userId}`;
    if ((owners?.count ?? 0) < 1) throw new Error("Debe permanecer al menos una identidad owner activa.");
  }
  await db.begin(async (tx) => {
    await tx`update admin_users set role = ${input.role}, status = ${input.status}, updated_at = now() where id = ${input.userId}`;
    if (input.status === "suspended") await tx`update admin_sessions set revoked_at = now() where user_id = ${input.userId} and revoked_at is null`;
  });
  await recordAdminAudit({ actorUserId: input.actorUserId, eventType: "admin.user.access_updated", entityType: "admin_user", entityId: input.userId, metadata: { role: input.role, status: input.status } });
  return true;
}

export async function revokeAllAdminUserSessions(input: { actorUserId: string; userId: string }) {
  const db = requireDb();
  const rows = await db`update admin_sessions set revoked_at = now() where user_id = ${input.userId} and revoked_at is null returning id`;
  await recordAdminAudit({ actorUserId: input.actorUserId, eventType: "admin.user.sessions_revoked", entityType: "admin_user", entityId: input.userId, metadata: { count: rows.length } });
  return rows.length;
}

export async function authenticateAdminCredentials(email: string, password: string, secondFactor?: string) {
  const db = requireDb();
  const [row] = await db<(UserRow & { password_hash: string; mfa_secret_ciphertext: string | null; mfa_recovery_code_hashes: string[] })[]>`
    select id, email, display_name, role, status, password_hash, password_changed_at, last_login_at,
      mfa_enabled_at, must_change_password, mfa_secret_ciphertext, mfa_recovery_code_hashes, created_at, updated_at
    from admin_users where lower(email) = lower(${email.trim()}) limit 1
  `;
  let valid = Boolean(row && row.status === "active" && await verifyAdminPassword(password, row.password_hash));
  let usedRecoveryHash: string | null = null;
  if (valid && row.mfa_enabled_at) {
    valid = false;
    if (secondFactor && row.mfa_secret_ciphertext) {
      const normalized = secondFactor.trim().toUpperCase();
      if (verifyTotpCode(decryptSecret(row.mfa_secret_ciphertext), normalized)) valid = true;
      else {
        const candidateHash = recoveryHash(normalized);
        const matched = row.mfa_recovery_code_hashes.find((hash) => hash.length === candidateHash.length && timingSafeEqual(Buffer.from(hash), Buffer.from(candidateHash)));
        if (matched) { valid = true; usedRecoveryHash = matched; }
      }
    }
  }
  if (!valid) {
    await recordAdminAudit({ actorUserId: row?.id ?? null, eventType: "admin.login.failed", entityType: "admin_user", entityId: row?.id ?? null });
    return null;
  }
  if (usedRecoveryHash) {
    await db`update admin_users set mfa_recovery_code_hashes = array_remove(mfa_recovery_code_hashes, ${usedRecoveryHash}), updated_at = now() where id = ${row.id}`;
    await recordAdminAudit({ actorUserId: row.id, eventType: "admin.mfa.recovery_used", entityType: "admin_user", entityId: row.id });
  }
  await db`update admin_users set last_login_at = now(), updated_at = now() where id = ${row.id}`;
  return userFromRow({ ...row, last_login_at: new Date().toISOString() });
}

export async function startAdminMfaEnrollment(userId: string) {
  const db = requireDb();
  const secret = base32Encode(randomBytes(20));
  await db`update admin_users set mfa_pending_secret_ciphertext = ${encryptSecret(secret)}, updated_at = now() where id = ${userId}`;
  await recordAdminAudit({ actorUserId: userId, eventType: "admin.mfa.enrollment_started", entityType: "admin_user", entityId: userId });
  return secret;
}

export async function getPendingAdminMfa(userId: string) {
  const db = requireDb();
  const [row] = await db<{ email: string; mfa_pending_secret_ciphertext: string | null }[]>`select email, mfa_pending_secret_ciphertext from admin_users where id = ${userId}`;
  if (!row?.mfa_pending_secret_ciphertext) return null;
  const secret = decryptSecret(row.mfa_pending_secret_ciphertext);
  return { secret, uri: `otpauth://totp/${encodeURIComponent(`NOAM:${row.email}`)}?secret=${secret}&issuer=NOAM&algorithm=SHA1&digits=6&period=30` };
}

export async function confirmAdminMfa(userId: string, code: string, currentSessionId?: string) {
  const db = requireDb();
  const [row] = await db<{ mfa_pending_secret_ciphertext: string | null }[]>`select mfa_pending_secret_ciphertext from admin_users where id = ${userId}`;
  if (!row?.mfa_pending_secret_ciphertext) return null;
  const secret = decryptSecret(row.mfa_pending_secret_ciphertext);
  if (!verifyTotpCode(secret, code.trim())) return null;
  const recoveryCodes = Array.from({ length: 8 }, () => `${randomBytes(4).toString("hex").slice(0, 4)}-${randomBytes(4).toString("hex").slice(0, 4)}`.toUpperCase());
  const hashes = recoveryCodes.map(recoveryHash);
  await db.begin(async (tx) => {
    await tx`update admin_users set mfa_secret_ciphertext = mfa_pending_secret_ciphertext,
      mfa_pending_secret_ciphertext = null, mfa_recovery_code_hashes = ${hashes}, mfa_enabled_at = now(), updated_at = now()
      where id = ${userId}`;
    if (currentSessionId) await tx`update admin_sessions set revoked_at = now() where user_id = ${userId} and id <> ${currentSessionId} and revoked_at is null`;
  });
  await recordAdminAudit({ actorUserId: userId, eventType: "admin.mfa.enabled", entityType: "admin_user", entityId: userId });
  return recoveryCodes;
}

export async function changeAdminPassword(input: { userId: string; currentPassword: string; newPassword: string; currentSessionId: string }) {
  const db = requireDb();
  const [user] = await db<{ password_hash: string }[]>`select password_hash from admin_users where id = ${input.userId} and status = 'active'`;
  if (!user || !(await verifyAdminPassword(input.currentPassword, user.password_hash))) return false;
  const passwordHash = await hashAdminPassword(input.newPassword);
  await db.begin(async (tx) => {
    await tx`update admin_users set password_hash = ${passwordHash}, password_changed_at = now(), must_change_password = false, updated_at = now() where id = ${input.userId}`;
    await tx`update admin_sessions set revoked_at = now() where user_id = ${input.userId} and id <> ${input.currentSessionId} and revoked_at is null`;
  });
  await recordAdminAudit({ actorUserId: input.userId, eventType: "admin.password.changed", entityType: "admin_user", entityId: input.userId });
  return true;
}

export async function createAdminSession(userId: string, durationHours = 8) {
  const db = requireDb();
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + durationHours * 60 * 60 * 1000).toISOString();
  const [session] = await db<{ id: string }[]>`
    insert into admin_sessions (user_id, token_hash, expires_at)
    values (${userId}, ${sessionHash(token)}, ${expiresAt}) returning id
  `;
  await recordAdminAudit({ actorUserId: userId, eventType: "admin.login.succeeded", entityType: "admin_session", entityId: session.id });
  return { token, expiresAt, sessionId: session.id };
}

export async function getAdminPrincipalByToken(token: string): Promise<AdminPrincipal | null> {
  const db = getDb();
  if (!db || token.length < 40 || token.length > 100) return null;
  const [row] = await db<{ session_id: string; user_id: string; email: string; display_name: string; role: AdminRole; mfa_enabled: boolean; must_change_password: boolean }[]>`
    with valid_session as (
      update admin_sessions set last_seen_at = now()
      where token_hash = ${sessionHash(token)} and revoked_at is null and expires_at > now()
      returning id, user_id
    )
    select valid_session.id as session_id, users.id as user_id, users.email, users.display_name, users.role,
      (users.mfa_enabled_at is not null) as mfa_enabled, users.must_change_password
    from valid_session join admin_users users on users.id = valid_session.user_id
    where users.status = 'active'
  `;
  return row ? { userId: row.user_id, sessionId: row.session_id, email: row.email, displayName: row.display_name, role: row.role, authMode: "identity", mfaEnabled: row.mfa_enabled, mustChangePassword: row.must_change_password } : null;
}

export async function revokeAdminSession(input: { sessionId: string; actorUserId: string }) {
  const db = requireDb();
  const rows = await db`update admin_sessions set revoked_at = now() where id = ${input.sessionId} and user_id = ${input.actorUserId} and revoked_at is null returning id`;
  if (rows.length) await recordAdminAudit({ actorUserId: input.actorUserId, eventType: "admin.session.revoked", entityType: "admin_session", entityId: input.sessionId });
  return rows.length === 1;
}

export async function revokeAdminSessionByToken(token: string, actorUserId: string | null) {
  const db = requireDb();
  const [row] = await db<{ id: string }[]>`update admin_sessions set revoked_at = now() where token_hash = ${sessionHash(token)} and revoked_at is null returning id`;
  if (row) await recordAdminAudit({ actorUserId, eventType: "admin.logout", entityType: "admin_session", entityId: row.id });
  return Boolean(row);
}

export async function getAdminSessions(userId: string): Promise<AdminSession[]> {
  const db = requireDb();
  const rows = await db<{ id: string; user_id: string; expires_at: string; last_seen_at: string; revoked_at: string | null; created_at: string }[]>`
    select id, user_id, expires_at, last_seen_at, revoked_at, created_at from admin_sessions
    where user_id = ${userId} order by created_at desc limit 20
  `;
  return rows.map((row) => ({ id: row.id, userId: row.user_id, expiresAt: row.expires_at, lastSeenAt: row.last_seen_at, revokedAt: row.revoked_at, createdAt: row.created_at }));
}

export async function recordAdminAudit(input: { actorUserId?: string | null; eventType: string; entityType?: string | null; entityId?: string | null; metadata?: Record<string, unknown> }) {
  const db = getDb();
  if (!db) return false;
  await db`insert into admin_audit_events (actor_user_id, event_type, entity_type, entity_id, metadata)
    values (${input.actorUserId ?? null}, ${input.eventType}, ${input.entityType ?? null}, ${input.entityId ?? null}, ${JSON.stringify(input.metadata ?? {})}::jsonb)`;
  return true;
}

export async function getAdminAuditEvents(limit = 100): Promise<AdminAuditEvent[]> {
  const db = requireDb();
  const rows = await db<{ id: string; actor_user_id: string | null; actor_name: string | null; actor_email: string | null; event_type: string; entity_type: string | null; entity_id: string | null; metadata: Record<string, unknown>; created_at: string }[]>`
    select events.id, events.actor_user_id, users.display_name as actor_name, users.email as actor_email,
      events.event_type, events.entity_type, events.entity_id, events.metadata, events.created_at
    from admin_audit_events events left join admin_users users on users.id = events.actor_user_id
    order by events.created_at desc limit ${Math.min(Math.max(limit, 1), 500)}
  `;
  return rows.map((row) => ({ id: row.id, actorUserId: row.actor_user_id, actorName: row.actor_name, actorEmail: row.actor_email,
    eventType: row.event_type, entityType: row.entity_type, entityId: row.entity_id, metadata: row.metadata, createdAt: row.created_at }));
}

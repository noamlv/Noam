import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { env } from "./env.ts";
import { getAdminPrincipalByToken, hasAdminUsers, revokeAdminSessionByToken } from "./admin-identity.ts";
import type { AdminPrincipal, AdminRole } from "../types/admin.ts";

const identityCookieName = "noam_admin_session";
const legacyCookieName = "noam_admin";

function legacySessionDigest(token: string) {
  return createHash("sha256").update(`noam-admin:${token}`).digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function hasUsableAdminToken() {
  return Boolean(env.adminToken && (process.env.NODE_ENV !== "production" || env.adminToken.length >= 32));
}

export function legacyAdminEnabled() {
  return process.env.NOAM_ALLOW_LEGACY_ADMIN === "true" && hasUsableAdminToken();
}

export async function getAdminPrincipal(): Promise<AdminPrincipal | null> {
  const cookieStore = await cookies();
  const identityToken = cookieStore.get(identityCookieName)?.value;
  if (identityToken) {
    const principal = await getAdminPrincipalByToken(identityToken).catch(() => null);
    if (principal) return principal;
  }

  if (legacyAdminEnabled()) {
    const legacySession = cookieStore.get(legacyCookieName)?.value;
    if (legacySession && safeEqual(legacySession, legacySessionDigest(env.adminToken!))) {
      return { userId: null, sessionId: null, email: "legacy@noam.local", displayName: "Acceso heredado", role: "owner", authMode: "legacy", mfaEnabled: false, mustChangePassword: false };
    }
  }

  if (process.env.NODE_ENV !== "production") {
    const usersExist = await hasAdminUsers().catch(() => false);
    if (!usersExist) return { userId: null, sessionId: null, email: "development@noam.local", displayName: "Desarrollo local", role: "owner", authMode: "development", mfaEnabled: false, mustChangePassword: false };
  }
  return null;
}

export function canAdminOperate(principal: AdminPrincipal) {
  if (principal.authMode !== "identity") return true;
  return !principal.mustChangePassword && (process.env.NODE_ENV !== "production" || principal.mfaEnabled);
}

export async function isAdminAuthenticated(roles?: AdminRole[], requireOperational = false) {
  const principal = await getAdminPrincipal();
  return Boolean(principal && (!roles?.length || roles.includes(principal.role)) && (!requireOperational || canAdminOperate(principal)));
}

export function verifyAdminToken(candidate: string) {
  return Boolean(legacyAdminEnabled() && safeEqual(candidate, env.adminToken!));
}

export async function setAdminSession() {
  if (!legacyAdminEnabled()) throw new Error("El acceso administrativo heredado no está habilitado.");
  const cookieStore = await cookies();
  cookieStore.set(legacyCookieName, legacySessionDigest(env.adminToken!), {
    httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 2
  });
}

export async function setAdminIdentitySession(token: string, expiresAt: string) {
  const cookieStore = await cookies();
  cookieStore.set(identityCookieName, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt)
  });
  cookieStore.delete(legacyCookieName);
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(identityCookieName)?.value;
  const principal = token ? await getAdminPrincipalByToken(token).catch(() => null) : null;
  if (token) await revokeAdminSessionByToken(token, principal?.userId ?? null).catch(() => false);
  cookieStore.delete(identityCookieName);
  cookieStore.delete(legacyCookieName);
}

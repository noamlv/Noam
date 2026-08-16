"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { clearAdminSession, getAdminPrincipal } from "@/lib/admin-auth";
import { changeAdminPassword, confirmAdminMfa, revokeAdminSession, startAdminMfaEnrollment } from "@/lib/admin-identity";

export async function revokeSessionAction(formData: FormData) {
  const principal = await getAdminPrincipal();
  if (!principal?.userId) redirect("/admin/login");
  const sessionId = String(formData.get("sessionId") ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(sessionId)) redirect("/admin/security?error=session");
  await revokeAdminSession({ sessionId, actorUserId: principal.userId });
  if (sessionId === principal.sessionId) {
    await clearAdminSession();
    redirect("/admin/login?loggedOut=1");
  }
  revalidatePath("/admin/security");
  redirect("/admin/security?updated=session-revoked");
}

export async function changePasswordAction(formData: FormData) {
  const principal = await getAdminPrincipal();
  if (!principal?.userId || !principal.sessionId) redirect("/admin/login");
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");
  if (newPassword !== confirmation) redirect("/admin/security?error=password-confirmation");
  const changed = await changeAdminPassword({ userId: principal.userId, currentPassword, newPassword, currentSessionId: principal.sessionId }).catch(() => false);
  if (!changed) redirect("/admin/security?error=password");
  revalidatePath("/admin/security");
  redirect("/admin/security?updated=password");
}

export async function startMfaEnrollmentAction() {
  const principal = await getAdminPrincipal();
  if (!principal?.userId) redirect("/admin/login");
  await startAdminMfaEnrollment(principal.userId);
  revalidatePath("/admin/security");
  redirect("/admin/security?updated=mfa-started");
}

export async function confirmMfaEnrollmentAction(formData: FormData) {
  const principal = await getAdminPrincipal();
  if (!principal?.userId) redirect("/admin/login");
  const code = String(formData.get("code") ?? "");
  const recoveryCodes = await confirmAdminMfa(principal.userId, code, principal.sessionId ?? undefined).catch(() => null);
  if (!recoveryCodes) redirect("/admin/security?error=mfa-code");
  const cookieStore = await cookies();
  cookieStore.set("noam_admin_recovery_codes", Buffer.from(JSON.stringify(recoveryCodes)).toString("base64url"), {
    httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/admin/security", maxAge: 10 * 60
  });
  revalidatePath("/admin/security");
  redirect("/admin/security/recovery");
}

export async function acknowledgeRecoveryCodesAction() {
  const cookieStore = await cookies();
  cookieStore.set("noam_admin_recovery_codes", "", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/admin/security", maxAge: 0 });
  redirect("/admin/security?updated=mfa-enabled");
}

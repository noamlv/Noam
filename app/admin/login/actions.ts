"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { clearAdminSession, setAdminIdentitySession, setAdminSession, verifyAdminToken } from "@/lib/admin-auth";
import { authenticateAdminCredentials, createAdminSession } from "@/lib/admin-identity";
import { allowRequest } from "@/lib/rate-limit";

export async function loginAdmin(formData: FormData) {
  const requestHeaders = await headers();
  if (!allowRequest(requestHeaders, "admin-login", 5, 15 * 60_000)) redirect("/admin/login?error=rate");

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const secondFactor = String(formData.get("secondFactor") ?? "");
  const legacyToken = String(formData.get("legacyToken") ?? "");

  if (email && password) {
    const user = await authenticateAdminCredentials(email, password, secondFactor).catch(() => null);
    if (user) {
      const session = await createAdminSession(user.id);
      await setAdminIdentitySession(session.token, session.expiresAt);
      if (user.mustChangePassword) redirect("/admin/security?required=password");
      if (process.env.NODE_ENV === "production" && !user.mfaEnabledAt) redirect("/admin/security?required=mfa");
      redirect("/admin");
    }
  }

  if (legacyToken && verifyAdminToken(legacyToken)) {
    await setAdminSession();
    redirect("/admin");
  }

  redirect("/admin/login?error=credentials");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login?loggedOut=1");
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminPrincipal } from "@/lib/admin-auth";
import { createAdminUser, revokeAllAdminUserSessions, updateAdminUserAccess } from "@/lib/admin-identity";
import { adminRoleValues } from "@/types/admin";

async function requireOwner() {
  const principal = await getAdminPrincipal();
  if (!principal?.userId || principal.role !== "owner") redirect("/admin");
  return { ...principal, userId: principal.userId as string };
}

export async function createAdminUserAction(formData: FormData) {
  const principal = await requireOwner();
  const role = String(formData.get("role") ?? "analyst");
  if (!adminRoleValues.includes(role as typeof adminRoleValues[number])) redirect("/admin/security/users?error=role");
  try {
    await createAdminUser({ email: String(formData.get("email") ?? ""), displayName: String(formData.get("displayName") ?? ""), role: role as typeof adminRoleValues[number], password: String(formData.get("temporaryPassword") ?? ""), actorUserId: principal.userId });
    await revalidatePath("/admin/security/users");
    redirect("/admin/security/users?created=1");
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    await revalidatePath("/admin/security/users");
    redirect("/admin/security/users?error=create");
  }
}

export async function updateAdminUserAction(formData: FormData) {
  const principal = await requireOwner();
  const role = String(formData.get("role") ?? "analyst") as typeof adminRoleValues[number];
  const status = String(formData.get("status") ?? "active") as "active" | "suspended";
  if (!adminRoleValues.includes(role) || !["active", "suspended"].includes(status)) redirect("/admin/security/users?error=validation");
  try {
    await updateAdminUserAccess({ actorUserId: principal.userId, userId: String(formData.get("userId") ?? ""), role, status });
    revalidatePath("/admin/security/users");
    redirect("/admin/security/users?updated=1");
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    redirect("/admin/security/users?error=owner");
  }
}

export async function revokeAdminUserSessionsAction(formData: FormData) {
  const principal = await requireOwner();
  await revokeAllAdminUserSessions({ actorUserId: principal.userId, userId: String(formData.get("userId") ?? "") });
  revalidatePath("/admin/security/users");
  redirect("/admin/security/users?updated=sessions");
}

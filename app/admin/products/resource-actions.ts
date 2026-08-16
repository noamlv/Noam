"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { canAdminOperate, getAdminPrincipal } from "@/lib/admin-auth";
import { recordAdminAudit } from "@/lib/admin-identity";
import { createPlatformResource, seedPlatformResources, updatePlatformResource } from "@/lib/platform-resources";
import { platformResourceInputSchema } from "@/lib/platform-resource-validation";

async function requireAdmin() {
  const principal = await getAdminPrincipal();
  if (!principal || !["owner", "editor"].includes(principal.role) || !canAdminOperate(principal)) redirect("/admin/security?error=security-required");
  return principal;
}

function parseResource(formData: FormData) {
  return platformResourceInputSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    description: formData.get("description"),
    kind: formData.get("kind"),
    url: formData.get("url"),
    productSlug: formData.get("productSlug"),
    sourceLabel: formData.get("sourceLabel") || "",
    period: formData.get("period") || "",
    format: formData.get("format") || "",
    sortOrder: formData.get("sortOrder") || 100,
    isPublic: formData.get("isPublic") || false
  });
}

function revalidateResources(productSlug?: string) {
  revalidatePath("/resources");
  revalidatePath("/products");
  revalidatePath("/buscar");
  revalidatePath("/admin/products");
  if (productSlug) {
    revalidatePath(`/admin/products/${productSlug}`);
    revalidatePath(`/products/${productSlug}`);
  }
}

export async function createPlatformResourceAction(formData: FormData) {
  const principal = await requireAdmin();
  const resource = parseResource(formData);
  const created = await createPlatformResource(resource);
  await recordAdminAudit({ actorUserId: principal.userId, eventType: "catalog.resource.created", entityType: "resource", entityId: created.id, metadata: { slug: resource.slug, productSlug: resource.productSlug } });
  revalidateResources(resource.productSlug);
  redirect(`/admin/products/${resource.productSlug}?created=1`);
}

export async function updatePlatformResourceAction(formData: FormData) {
  const principal = await requireAdmin();
  const resource = parseResource(formData);
  const updated = await updatePlatformResource(resource);
  await recordAdminAudit({ actorUserId: principal.userId, eventType: "catalog.resource.updated", entityType: "resource", entityId: updated.id, metadata: { slug: resource.slug, public: resource.isPublic } });
  revalidateResources(resource.productSlug);
  redirect(`/admin/products/${resource.productSlug}?updated=${encodeURIComponent(resource.slug)}`);
}

export async function seedPlatformResourcesAction(formData: FormData) {
  const principal = await requireAdmin();
  const productSlug = String(formData.get("productSlug") || "");
  const result = await seedPlatformResources();
  await recordAdminAudit({ actorUserId: principal.userId, eventType: "catalog.resources.seeded", entityType: "resource", metadata: result });
  revalidateResources(productSlug);
  redirect(`/admin/products/${productSlug}?seeded=${result.inserted}`);
}

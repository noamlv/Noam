"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { canAdminOperate, getAdminPrincipal } from "@/lib/admin-auth";
import { recordAdminAudit } from "@/lib/admin-identity";
import { createPlatformProduct, seedPlatformCatalog, updatePlatformProduct } from "@/lib/platform-products";
import { platformProductInputSchema } from "@/lib/platform-product-validation";

async function requireAdmin() {
  const principal = await getAdminPrincipal();
  if (!principal || !["owner", "editor"].includes(principal.role) || !canAdminOperate(principal)) redirect("/admin/security?error=security-required");
  return principal;
}

function parseProduct(formData: FormData) {
  return platformProductInputSchema.parse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    category: formData.get("category"),
    description: formData.get("description"),
    outcome: formData.get("outcome"),
    href: formData.get("href"),
    status: formData.get("status"),
    audience: formData.get("audience"),
    features: formData.get("features"),
    deliverables: formData.get("deliverables"),
    demoHref: formData.get("demoHref") || "",
    timeline: formData.get("timeline") || "",
    sortOrder: formData.get("sortOrder") || 100,
    isPublished: formData.get("isPublished") || false
  });
}

function revalidateProducts(slug?: string) {
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/buscar");
  if (slug) revalidatePath(`/products/${slug}`);
}

export async function createPlatformProductAction(formData: FormData) {
  const principal = await requireAdmin();
  const product = parseProduct(formData);
  const created = await createPlatformProduct(product);
  await recordAdminAudit({ actorUserId: principal.userId, eventType: "catalog.product.created", entityType: "platform_product", entityId: created.id, metadata: { slug: product.slug } });
  revalidateProducts(product.slug);
  redirect("/admin/products?created=1");
}

export async function updatePlatformProductAction(formData: FormData) {
  const principal = await requireAdmin();
  const product = parseProduct(formData);
  const updated = await updatePlatformProduct(product);
  await recordAdminAudit({ actorUserId: principal.userId, eventType: "catalog.product.updated", entityType: "platform_product", entityId: updated.id, metadata: { slug: product.slug, published: product.isPublished } });
  revalidateProducts(product.slug);
  redirect(`/admin/products?updated=${encodeURIComponent(product.slug)}`);
}

export async function seedPlatformCatalogAction() {
  const principal = await requireAdmin();
  const result = await seedPlatformCatalog();
  await recordAdminAudit({ actorUserId: principal.userId, eventType: "catalog.products.seeded", entityType: "platform_product", metadata: result });
  revalidateProducts();
  redirect(`/admin/products?seeded=${result.inserted}`);
}

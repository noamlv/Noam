"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { canAdminOperate, getAdminPrincipal } from "@/lib/admin-auth";
import {
  cancelNewsletterCampaign,
  createNewsletterCampaign,
  dispatchNewsletterCampaign,
  retryNewsletterCampaignFailures,
  scheduleNewsletterCampaign,
  updateNewsletterCampaign
} from "@/lib/newsletter-campaigns";
import { newsletterCampaignInputSchema, newsletterCampaignScheduleSchema } from "@/lib/newsletter-campaign-validation";
import { sendNewsletterCampaignEdition } from "@/lib/notifications";
import { hasOutboundEmailConfig } from "@/lib/env";

async function requireEditor() {
  const principal = await getAdminPrincipal();
  if (!principal || !principal.userId || !["owner", "editor"].includes(principal.role) || !canAdminOperate(principal)) {
    redirect("/admin/security?error=security-required");
  }
  return { ...principal, userId: principal.userId };
}

function campaignInput(formData: FormData) {
  return newsletterCampaignInputSchema.parse({
    slug: formData.get("slug"),
    subject: formData.get("subject"),
    previewText: formData.get("previewText") || "",
    title: formData.get("title"),
    bodyText: formData.get("bodyText"),
    ctaLabel: formData.get("ctaLabel") || "",
    ctaUrl: formData.get("ctaUrl") || "",
    audienceInterests: formData.getAll("audienceInterests")
  });
}

function refreshCampaigns(id?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/audience");
  revalidatePath("/admin/audience/campaigns");
  if (id) revalidatePath(`/admin/audience/campaigns/${id}`);
}

export async function createNewsletterCampaignAction(formData: FormData) {
  const principal = await requireEditor();
  const campaign = await createNewsletterCampaign(campaignInput(formData), principal.userId);
  refreshCampaigns(campaign.id);
  redirect(`/admin/audience/campaigns/${campaign.id}?created=1`);
}

export async function updateNewsletterCampaignAction(formData: FormData) {
  const principal = await requireEditor();
  const id = String(formData.get("campaignId") || "");
  await updateNewsletterCampaign(id, campaignInput(formData), principal.userId);
  refreshCampaigns(id);
  redirect(`/admin/audience/campaigns/${id}?updated=1`);
}

export async function scheduleNewsletterCampaignAction(formData: FormData) {
  const principal = await requireEditor();
  const id = String(formData.get("campaignId") || "");
  const localDate = String(formData.get("scheduledAt") || "");
  const parsed = newsletterCampaignScheduleSchema.parse({ scheduledAt: new Date(`${localDate}:00-05:00`).toISOString() });
  await scheduleNewsletterCampaign(id, parsed.scheduledAt, principal.userId);
  refreshCampaigns(id);
  redirect(`/admin/audience/campaigns/${id}?scheduled=1`);
}

export async function cancelNewsletterCampaignAction(formData: FormData) {
  const principal = await requireEditor();
  const id = String(formData.get("campaignId") || "");
  await cancelNewsletterCampaign(id, principal.userId);
  refreshCampaigns(id);
  redirect(`/admin/audience/campaigns/${id}?cancelled=1`);
}

export async function dispatchNewsletterCampaignAction(formData: FormData) {
  const principal = await requireEditor();
  const id = String(formData.get("campaignId") || "");
  if (formData.get("confirmSend") !== "on") redirect(`/admin/audience/campaigns/${id}?error=confirm`);
  if (!hasOutboundEmailConfig()) redirect(`/admin/audience/campaigns/${id}?error=email`);
  const result = await dispatchNewsletterCampaign(id, principal.userId, sendNewsletterCampaignEdition);
  refreshCampaigns(id);
  redirect(`/admin/audience/campaigns/${id}?sent=${result.sent}&failed=${result.failed}`);
}

export async function retryNewsletterCampaignFailuresAction(formData: FormData) {
  const principal = await requireEditor();
  const id = String(formData.get("campaignId") || "");
  if (formData.get("confirmRetry") !== "on") redirect(`/admin/audience/campaigns/${id}?error=confirm-retry`);
  if (!hasOutboundEmailConfig()) redirect(`/admin/audience/campaigns/${id}?error=email`);
  const result = await retryNewsletterCampaignFailures(id, principal.userId, sendNewsletterCampaignEdition);
  refreshCampaigns(id);
  redirect(`/admin/audience/campaigns/${id}?retried=${result.sent}&retryFailed=${result.failed}&skipped=${result.skipped}`);
}

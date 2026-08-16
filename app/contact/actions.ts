"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { recordAnalyticsEvent } from "@/lib/analytics";
import { createLead } from "@/lib/leads";
import { allowRequest } from "@/lib/rate-limit";
import { leadInputSchema } from "@/lib/validation";

export async function submitLead(formData: FormData) {
  if (String(formData.get("website") ?? "")) {
    redirect("/contact/thank-you");
  }

  const interest = String(formData.get("interest") ?? "");
  const requestHeaders = await headers();

  if (!allowRequest(requestHeaders, "lead-form", 6, 10 * 60_000)) {
    redirect(`/contact?interest=${encodeURIComponent(interest)}&error=rate`);
  }

  const consent = formData.get("consent") === "accepted";
  const parsed = leadInputSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    organization: formData.get("organization") || undefined,
    role: formData.get("role") || undefined,
    organizationType: formData.get("organizationType") || undefined,
    territory: formData.get("territory") || undefined,
    interest,
    timeline: formData.get("timeline") || undefined,
    budgetRange: formData.get("budgetRange") || undefined,
    message: formData.get("message"),
    source: "contact",
    originPath: formData.get("originPath") || undefined,
    consent
  });

  if (!parsed.success || !consent) {
    redirect(`/contact?interest=${encodeURIComponent(interest)}&error=validation`);
  }

  try {
    await createLead(parsed.data);
  } catch (error) {
    console.error("No se pudo persistir una consulta desde el formulario.", error);
    redirect(`/contact?interest=${encodeURIComponent(interest)}&error=unavailable`);
  }
  await recordAnalyticsEvent({
    eventName: "lead_submit",
    path: parsed.data.originPath ?? "/contact",
    target: parsed.data.interest
  }).catch(() => false);
  redirect("/contact/thank-you");
}

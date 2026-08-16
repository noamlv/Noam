"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { recordAnalyticsEvent } from "@/lib/analytics";
import { allowRequest } from "@/lib/rate-limit";
import { confirmNewsletterSubscription, markNewsletterConfirmationSent, requestNewsletterSubscription, unsubscribeNewsletter } from "@/lib/newsletter";
import { newsletterSubscriptionSchema, newsletterTokenSchema } from "@/lib/newsletter-validation";
import { sendNewsletterConfirmation } from "@/lib/notifications";

export async function subscribeNewsletterAction(formData: FormData) {
  if (String(formData.get("website") ?? "")) redirect("/newsletter/check-email");
  const requestHeaders = await headers();
  if (!allowRequest(requestHeaders, "newsletter", 4, 60 * 60_000)) redirect("/newsletter?error=rate");

  const parsed = newsletterSubscriptionSchema.safeParse({
    name: formData.get("name") || undefined,
    email: formData.get("email"),
    interests: formData.getAll("interests"),
    sourcePath: formData.get("sourcePath") || "/newsletter",
    consent: formData.get("consent") === "accepted"
  });
  if (!parsed.success) redirect("/newsletter?error=validation");

  let request;
  try {
    request = await requestNewsletterSubscription(parsed.data);
  } catch (error) {
    console.error("No se pudo registrar la solicitud editorial.", error);
    redirect("/newsletter?error=unavailable");
  }

  if (request.status === "already_active") redirect("/newsletter/check-email");
  let sent = false;
  try {
    const delivery = await sendNewsletterConfirmation({
      email: request.subscriber.email,
      name: request.subscriber.name,
      confirmationToken: request.confirmationToken,
      unsubscribeToken: request.unsubscribeToken
    });
    sent = delivery.sent;
    if (sent) await markNewsletterConfirmationSent(request.subscriber.id);
  } catch (error) {
    console.error("La solicitud quedó guardada, pero el correo de confirmación falló.", error);
  }

  await recordAnalyticsEvent({ eventName: "newsletter_signup", path: parsed.data.sourcePath, target: parsed.data.interests.join(",") }).catch(() => false);
  redirect("/newsletter/check-email");
}

export async function confirmNewsletterAction(formData: FormData) {
  const parsed = newsletterTokenSchema.safeParse(formData.get("token"));
  if (!parsed.success) redirect("/newsletter/confirm?status=invalid");
  const confirmed = await confirmNewsletterSubscription(parsed.data).catch(() => false);
  redirect(`/newsletter/confirm?status=${confirmed ? "confirmed" : "invalid"}`);
}

export async function unsubscribeNewsletterAction(formData: FormData) {
  const parsed = newsletterTokenSchema.safeParse(formData.get("token"));
  if (!parsed.success) redirect("/newsletter/unsubscribe?status=invalid");
  const unsubscribed = await unsubscribeNewsletter(parsed.data).catch(() => false);
  redirect(`/newsletter/unsubscribe?status=${unsubscribed ? "done" : "invalid"}`);
}

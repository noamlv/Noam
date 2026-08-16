import { Resend } from "resend";
import { env, hasEmailConfig, hasOutboundEmailConfig } from "./env.ts";
import { leadLabels } from "./lead-options.ts";
import type { Lead } from "../types/platform.ts";
import type { NewsletterCampaignSendInput } from "../types/newsletter.ts";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]!);
}

function absoluteSiteUrl(href: string, baseUrl: string) {
  return href.startsWith("/") ? new URL(href, baseUrl).toString() : href;
}

export async function notifyLeadCreated(lead: Lead) {
  if (!hasEmailConfig()) {
    return { sent: false, reason: "email_not_configured" as const };
  }

  const resend = new Resend(env.resendApiKey);

  const { error } = await resend.emails.send({
    from: env.leadNotifyFrom!,
    to: env.leadNotifyTo!,
    subject: `Nueva oportunidad NOAM: ${leadLabels.interest(lead.interest)}`,
    replyTo: lead.email,
    text: [
      `Nombre: ${lead.name}`,
      `Email: ${lead.email}`,
      `Organizacion: ${lead.organization ?? "-"}`,
      `Tipo: ${leadLabels.organizationType(lead.organization_type)}`,
      `Rol: ${lead.role ?? "-"}`,
      `Territorio: ${lead.territory ?? "-"}`,
      `Interes: ${leadLabels.interest(lead.interest)}`,
      `Plazo: ${leadLabels.timeline(lead.timeline)}`,
      `Rango: ${leadLabels.budgetRange(lead.budget_range)}`,
      `Fuente: ${lead.source}`,
      `Origen: ${lead.origin_path ?? "-"}`,
      "",
      lead.message
    ].join("\n")
  });
  if (error) throw new Error(`Resend rechazó la notificación del lead: ${error.message}`);

  return { sent: true as const };
}

export async function sendNewsletterConfirmation(input: { email: string; name?: string | null; confirmationToken: string; unsubscribeToken: string }) {
  if (!hasOutboundEmailConfig()) return { sent: false, reason: "email_not_configured" as const };
  const resend = new Resend(env.resendApiKey);
  const baseUrl = env.siteUrl || "https://noam.pe";
  const confirmUrl = `${baseUrl}/newsletter/confirm?token=${encodeURIComponent(input.confirmationToken)}`;
  const unsubscribeUrl = `${baseUrl}/newsletter/unsubscribe?token=${encodeURIComponent(input.unsubscribeToken)}`;
  const greeting = input.name ? `Hola, ${input.name}:` : "Hola:";

  const { error } = await resend.emails.send({
    from: env.leadNotifyFrom!,
    to: input.email,
    subject: "Confirma tu suscripción al Brief NOAM",
    text: [
      greeting,
      "",
      "Solicitaste recibir el Brief NOAM sobre gestión pública, territorio, elecciones, datos e IA aplicada.",
      "Confirma tu dirección en este enlace:",
      confirmUrl,
      "",
      "Si no realizaste esta solicitud, puedes ignorar el mensaje o cancelarla:",
      unsubscribeUrl,
      "",
      "NOAM · Lima, Perú"
    ].join("\n")
  });
  if (error) throw new Error(`Resend rechazó la confirmación editorial: ${error.message}`);
  return { sent: true as const };
}

export async function sendNewsletterCampaignEdition(input: NewsletterCampaignSendInput) {
  if (!hasOutboundEmailConfig()) throw new Error("El correo saliente no está configurado.");
  const resend = new Resend(env.resendApiKey);
  const baseUrl = env.siteUrl || "https://noam.pe";
  const unsubscribeUrl = `${baseUrl}/newsletter/unsubscribe?token=${encodeURIComponent(input.unsubscribeToken)}`;
  const greeting = input.recipient.name ? `Hola, ${input.recipient.name}:` : "Hola:";
  const ctaUrl = input.campaign.ctaUrl ? absoluteSiteUrl(input.campaign.ctaUrl, baseUrl) : null;
  const paragraphs = input.campaign.bodyText.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);

  const { data, error } = await resend.emails.send({
    from: env.leadNotifyFrom!,
    to: input.recipient.email,
    subject: input.campaign.subject,
    headers: {
      "List-Unsubscribe": `<${unsubscribeUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click"
    },
    text: [
      greeting,
      "",
      input.campaign.title,
      "",
      input.campaign.bodyText,
      ...(ctaUrl && input.campaign.ctaLabel ? ["", `${input.campaign.ctaLabel}: ${ctaUrl}`] : []),
      "",
      "Recibes este mensaje porque confirmaste tu suscripción al Brief NOAM.",
      `Cancelar suscripción: ${unsubscribeUrl}`,
      "",
      "NOAM · Gobierno · Datos · IA"
    ].join("\n"),
    html: `<!doctype html><html lang="es"><body style="margin:0;background:#f2f0e9;color:#17211d;font-family:Arial,sans-serif"><div style="display:none;max-height:0;overflow:hidden">${escapeHtml(input.campaign.previewText)}</div><main style="max-width:680px;margin:0 auto;padding:48px 24px"><p style="margin:0 0 48px;font-size:15px;font-weight:700;letter-spacing:.16em">NOAM</p><p style="margin:0 0 24px;font-size:14px;color:#5f6964">${escapeHtml(greeting)}</p><h1 style="margin:0 0 32px;font-size:38px;line-height:1.08;letter-spacing:-.035em;font-weight:500">${escapeHtml(input.campaign.title)}</h1>${paragraphs.map((paragraph) => `<p style="margin:0 0 22px;font-size:17px;line-height:1.65">${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`).join("")}${ctaUrl && input.campaign.ctaLabel ? `<p style="margin:36px 0"><a href="${escapeHtml(ctaUrl)}" style="display:inline-block;background:#17211d;color:#f7f4eb;text-decoration:none;padding:14px 22px;border-radius:4px;font-size:14px">${escapeHtml(input.campaign.ctaLabel)}</a></p>` : ""}<footer style="margin-top:56px;padding-top:22px;border-top:1px solid #ccd1cd;font-size:12px;line-height:1.6;color:#69736e"><p>Recibes este mensaje porque confirmaste tu suscripción al Brief NOAM.</p><p><a href="${escapeHtml(unsubscribeUrl)}" style="color:#4c5651">Cancelar suscripción</a></p><p>NOAM · Gobierno · Datos · IA</p></footer></main></body></html>`
  });
  if (error) throw new Error(`Resend rechazó la edición: ${error.message}`);
  return { messageId: data?.id ?? null };
}

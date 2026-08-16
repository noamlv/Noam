import { z } from "zod";
import { newsletterInterestValues } from "../types/newsletter.ts";

function interestsFromInput(value: unknown) {
  if (!Array.isArray(value)) return value ? [value] : [];
  return [...new Set(value)];
}

const safeHref = z.string().trim().max(500).refine(
  (value) => !value || value.startsWith("/") || value.startsWith("https://"),
  "La URL debe comenzar con / o https://"
);

export const newsletterCampaignInputSchema = z.object({
  slug: z.string().trim().min(3).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Usa minúsculas, números y guiones"),
  subject: z.string().trim().min(5).max(160),
  previewText: z.string().trim().max(240).default(""),
  title: z.string().trim().min(5).max(180),
  bodyText: z.string().trim().min(40).max(20_000),
  ctaLabel: z.string().trim().max(80).default(""),
  ctaUrl: safeHref.default(""),
  audienceInterests: z.preprocess(
    interestsFromInput,
    z.array(z.enum(newsletterInterestValues)).max(newsletterInterestValues.length)
  )
}).superRefine((value, context) => {
  if (Boolean(value.ctaLabel) !== Boolean(value.ctaUrl)) {
    context.addIssue({ code: "custom", path: ["ctaLabel"], message: "La etiqueta y la URL del CTA deben completarse juntas" });
  }
});

export const newsletterCampaignScheduleSchema = z.object({
  scheduledAt: z.string().datetime().refine((value) => new Date(value).getTime() > Date.now(), "La programación debe ser futura")
});

export type NewsletterCampaignInput = z.infer<typeof newsletterCampaignInputSchema>;

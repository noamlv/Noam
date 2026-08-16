import { z } from "zod";
import { newsletterInterestValues } from "../types/newsletter.ts";

export const newsletterSubscriptionSchema = z.object({
  name: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Ingresa un email válido").max(254).transform((value) => value.toLowerCase()),
  interests: z.array(z.enum(newsletterInterestValues)).min(1).max(newsletterInterestValues.length)
    .refine((values) => new Set(values).size === values.length, "No repitas una preferencia editorial"),
  sourcePath: z.string().trim().startsWith("/").max(300).default("/newsletter"),
  consent: z.literal(true)
});

export const newsletterTokenSchema = z.string().trim().min(40).max(100).regex(/^[A-Za-z0-9_-]+$/);
export type NewsletterSubscriptionInput = z.infer<typeof newsletterSubscriptionSchema>;

import { z } from "zod";
import { analyticsEventNames } from "@/types/analytics";

const cleanPath = z
  .string()
  .trim()
  .min(1)
  .max(300)
  .refine((value) => value.startsWith("/") && !value.startsWith("//") && !value.includes("?"), "Ruta inválida");

export const analyticsEventSchema = z.object({
  eventName: z.enum(analyticsEventNames),
  path: cleanPath,
  target: z.string().trim().max(300).optional(),
  referrer: z.string().trim().max(180).optional()
});

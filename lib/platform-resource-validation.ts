import { z } from "zod";

const safeHref = z.string().trim().min(1).max(500).refine(
  (value) => value.startsWith("/") || value.startsWith("https://"),
  "La URL debe comenzar con / o https://"
);

export const platformResourceInputSchema = z.object({
  slug: z.string().trim().min(3).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Usa minúsculas, números y guiones"),
  title: z.string().trim().min(3).max(180),
  description: z.string().trim().min(20).max(800),
  kind: z.enum(["dataset", "methodology", "toolkit", "report", "template", "explorer"]),
  url: safeHref,
  productSlug: z.string().trim().min(3).max(80),
  sourceLabel: z.string().trim().max(180).optional(),
  period: z.string().trim().max(120).optional(),
  format: z.string().trim().max(80).optional(),
  sortOrder: z.coerce.number().int().min(0).max(9999).default(100),
  isPublic: z.preprocess((value) => value === true || value === "true" || value === "on", z.boolean())
});

export type PlatformResourceInput = z.infer<typeof platformResourceInputSchema>;

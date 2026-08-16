import { z } from "zod";

const safeHref = z.string().trim().min(1).max(500).refine(
  (value) => value.startsWith("/") || value.startsWith("https://"),
  "La URL debe comenzar con / o https://"
);

const optionalSafeHref = z.union([safeHref, z.literal("")]).optional();

function listFromInput(value: unknown) {
  if (Array.isArray(value)) return value;
  return String(value ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export const platformProductInputSchema = z.object({
  slug: z.string().trim().min(3).max(80).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Usa minúsculas, números y guiones"),
  name: z.string().trim().min(3).max(140),
  category: z.enum(["service", "product", "dashboard", "viewer", "demo"]),
  description: z.string().trim().min(20).max(900),
  outcome: z.string().trim().min(20).max(900),
  href: safeHref,
  status: z.enum(["live", "prototype", "planned"]),
  audience: z.preprocess(listFromInput, z.array(z.string().min(2).max(160)).max(20)),
  features: z.preprocess(listFromInput, z.array(z.string().min(2).max(200)).max(30)),
  deliverables: z.preprocess(listFromInput, z.array(z.string().min(2).max(200)).max(30)),
  demoHref: optionalSafeHref,
  timeline: z.string().trim().max(120).optional(),
  sortOrder: z.coerce.number().int().min(0).max(9999).default(100),
  isPublished: z.preprocess((value) => value === true || value === "true" || value === "on", z.boolean())
});

export type PlatformProductInput = z.infer<typeof platformProductInputSchema>;

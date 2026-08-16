import { z } from "zod";

export const leadInputSchema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre").max(120),
  email: z.string().trim().email("Ingresa un email valido").max(254),
  organization: z.string().trim().max(180).optional(),
  role: z.string().trim().max(140).optional(),
  organizationType: z.enum(["municipality", "regional-government", "national-government", "public-program", "company", "cooperation", "academic", "individual", "other"]).optional(),
  territory: z.string().trim().max(180).optional(),
  interest: z.string().trim().min(2, "Selecciona un interes").max(80),
  timeline: z.enum(["urgent", "one-to-three-months", "three-to-six-months", "exploring", "to-define"]).optional(),
  budgetRange: z.enum(["estimate-help", "under-25k", "25k-60k", "60k-150k", "over-150k", "to-define", "prefer-not-to-say"]).optional(),
  message: z.string().trim().min(10, "Cuentanos un poco mas del contexto").max(5000),
  source: z.string().trim().max(80).default("contact"),
  originPath: z.string().trim().startsWith("/").max(300).optional(),
  consent: z.boolean().default(false)
});

export type LeadInput = z.infer<typeof leadInputSchema>;

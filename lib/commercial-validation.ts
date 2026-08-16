import { z } from "zod";

export const clientInputSchema = z.object({
  name: z.string().trim().min(2, "Ingresa el nombre"),
  organization: z.string().trim().optional(),
  email: z.string().trim().email("Email invalido").optional().or(z.literal("")),
  phone: z.string().trim().optional(),
  country: z.string().trim().min(2).default("Peru"),
  segment: z.string().trim().min(2).default("consulting"),
  status: z.enum(["active", "lead", "paused", "archived"]).default("active"),
  notes: z.string().trim().optional()
});

export const proposalInputSchema = z.object({
  clientId: z.string().uuid("Selecciona un cliente").optional().or(z.literal("")),
  title: z.string().trim().min(3, "Ingresa un titulo"),
  summary: z.string().trim().min(10, "Resume la oportunidad"),
  serviceSlug: z.string().trim().optional(),
  status: z.enum(["draft", "sent", "accepted", "rejected", "expired"]).default("draft"),
  amount: z.coerce.number().nonnegative().optional(),
  currency: z.string().trim().min(3).default("PEN"),
  validUntil: z.string().trim().optional()
});

export const proposalStatusSchema = z.object({
  proposalId: z.string().uuid(),
  status: z.enum(["draft", "sent", "accepted", "rejected", "expired"])
});

export const quoteInputSchema = z.object({
  proposalId: z.string().uuid(),
  subtotal: z.coerce.number().nonnegative(),
  tax: z.coerce.number().nonnegative().default(0),
  currency: z.string().trim().min(3).default("PEN"),
  dueAt: z.string().trim().optional()
});

export const invoiceInputSchema = z.object({
  proposalId: z.string().uuid(),
  invoiceNumber: z.string().trim().optional(),
  subtotal: z.coerce.number().nonnegative(),
  tax: z.coerce.number().nonnegative().default(0),
  currency: z.string().trim().min(3).default("PEN"),
  officialDocumentUrl: z.string().trim().url("URL invalida").optional().or(z.literal(""))
});

export const paymentInputSchema = z.object({
  invoiceId: z.string().uuid(),
  provider: z.string().trim().min(2).default("manual"),
  providerReference: z.string().trim().optional(),
  amount: z.coerce.number().positive(),
  currency: z.string().trim().min(3).default("PEN"),
  status: z.enum(["pending", "paid", "failed", "refunded"]).default("paid"),
  paidAt: z.string().trim().optional()
});

export const projectInputSchema = z.object({
  proposalId: z.string().uuid(),
  name: z.string().trim().min(3),
  description: z.string().trim().optional(),
  status: z.enum(["planned", "active", "completed", "paused", "cancelled"]).default("active"),
  startsAt: z.string().trim().optional(),
  endsAt: z.string().trim().optional()
});

export const deliverableInputSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().trim().min(3),
  description: z.string().trim().optional(),
  status: z.enum(["planned", "in_progress", "delivered", "approved"]).default("planned"),
  dueAt: z.string().trim().optional(),
  resourceUrl: z.string().trim().url("URL invalida").optional().or(z.literal(""))
});

export const portalTokenInputSchema = z.object({
  clientId: z.string().uuid(),
  label: z.string().trim().min(2).default("Acceso principal"),
  expiresAt: z.string().trim().optional()
});

export const portalTokenRevokeSchema = z.object({
  tokenId: z.string().uuid(),
  clientId: z.string().uuid()
});

export const portalTokenDurationSchema = z.coerce.number().refine((value) => [7, 30, 60, 90].includes(value));

export const clientResourceInputSchema = z.object({
  clientId: z.string().uuid(),
  title: z.string().trim().min(3),
  description: z.string().trim().optional(),
  resourceType: z.string().trim().min(2).default("analysis"),
  url: z.string().trim().url("URL invalida").optional().or(z.literal("")),
  productSlug: z.string().trim().optional(),
  visibility: z.string().trim().min(2).default("client"),
  status: z.string().trim().min(2).default("published")
});

export type ClientInput = z.infer<typeof clientInputSchema>;
export type ProposalInput = z.infer<typeof proposalInputSchema>;
export type ProposalStatusInput = z.infer<typeof proposalStatusSchema>;
export type QuoteInput = z.infer<typeof quoteInputSchema>;
export type InvoiceInput = z.infer<typeof invoiceInputSchema>;
export type PaymentInput = z.infer<typeof paymentInputSchema>;
export type ProjectInput = z.infer<typeof projectInputSchema>;
export type DeliverableInput = z.infer<typeof deliverableInputSchema>;
export type PortalTokenInput = z.infer<typeof portalTokenInputSchema>;
export type PortalTokenRevokeInput = z.infer<typeof portalTokenRevokeSchema>;
export type ClientResourceInput = z.infer<typeof clientResourceInputSchema>;

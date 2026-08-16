"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { canAdminOperate, getAdminPrincipal } from "@/lib/admin-auth";
import { recordAdminAudit } from "@/lib/admin-identity";
import {
  createClient,
  createClientResource,
  createDeliverable,
  createInvoice,
  createManualPayment,
  createPortalToken,
  createProject,
  createProposal,
  createQuote,
  revokePortalToken,
  updateProposalStatus
} from "@/lib/commercial";
import {
  clientResourceInputSchema,
  clientInputSchema,
  deliverableInputSchema,
  invoiceInputSchema,
  paymentInputSchema,
  portalTokenInputSchema,
  portalTokenDurationSchema,
  portalTokenRevokeSchema,
  projectInputSchema,
  proposalInputSchema,
  proposalStatusSchema,
  quoteInputSchema
} from "@/lib/commercial-validation";

async function requireAdmin() {
  const principal = await getAdminPrincipal();
  if (!principal || !["owner", "editor"].includes(principal.role) || !canAdminOperate(principal)) {
    redirect("/admin/login");
  }
  return principal;
}

export async function createClientAction(formData: FormData) {
  const principal = await requireAdmin();

  const parsed = clientInputSchema.parse({
    name: formData.get("name"),
    organization: formData.get("organization") || undefined,
    email: formData.get("email") || "",
    phone: formData.get("phone") || undefined,
    country: formData.get("country") || "Peru",
    segment: formData.get("segment") || "consulting",
    status: formData.get("status") || "active",
    notes: formData.get("notes") || undefined
  });

  const client = await createClient(parsed);
  await recordAdminAudit({ actorUserId: principal.userId, eventType: "commercial.client.created", entityType: "client", entityId: client.id });
  revalidatePath("/admin");
  revalidatePath("/admin/commercial");
  redirect("/admin/commercial?created=client");
}

export async function createProposalAction(formData: FormData) {
  const principal = await requireAdmin();

  const parsed = proposalInputSchema.parse({
    clientId: formData.get("clientId") || "",
    title: formData.get("title"),
    summary: formData.get("summary"),
    serviceSlug: formData.get("serviceSlug") || undefined,
    status: formData.get("status") || "draft",
    amount: formData.get("amount") || undefined,
    currency: formData.get("currency") || "PEN",
    validUntil: formData.get("validUntil") || undefined
  });

  const proposal = await createProposal(parsed);
  await recordAdminAudit({ actorUserId: principal.userId, eventType: "commercial.proposal.created", entityType: "proposal", entityId: proposal.id });
  revalidatePath("/admin");
  revalidatePath("/admin/commercial");
  redirect("/admin/commercial?created=proposal");
}

function revalidateProposal(proposalId: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/commercial");
  revalidatePath(`/admin/commercial/proposals/${proposalId}`);
}

export async function updateProposalStatusAction(formData: FormData) {
  const principal = await requireAdmin();

  const parsed = proposalStatusSchema.parse({
    proposalId: formData.get("proposalId"),
    status: formData.get("status")
  });

  await updateProposalStatus(parsed);
  await recordAdminAudit({ actorUserId: principal.userId, eventType: "commercial.proposal.status_changed", entityType: "proposal", entityId: parsed.proposalId, metadata: { status: parsed.status } });
  revalidateProposal(parsed.proposalId);
  redirect(`/admin/commercial/proposals/${parsed.proposalId}?updated=status`);
}

export async function createQuoteAction(formData: FormData) {
  const principal = await requireAdmin();

  const parsed = quoteInputSchema.parse({
    proposalId: formData.get("proposalId"),
    subtotal: formData.get("subtotal"),
    tax: formData.get("tax") || 0,
    currency: formData.get("currency") || "PEN",
    dueAt: formData.get("dueAt") || undefined
  });

  const quote = await createQuote(parsed);
  await recordAdminAudit({ actorUserId: principal.userId, eventType: "commercial.quote.created", entityType: "quote", entityId: quote.id, metadata: { proposalId: parsed.proposalId } });
  revalidateProposal(parsed.proposalId);
  redirect(`/admin/commercial/proposals/${parsed.proposalId}?created=quote`);
}

export async function createInvoiceAction(formData: FormData) {
  const principal = await requireAdmin();

  const parsed = invoiceInputSchema.parse({
    proposalId: formData.get("proposalId"),
    invoiceNumber: formData.get("invoiceNumber") || undefined,
    subtotal: formData.get("subtotal"),
    tax: formData.get("tax") || 0,
    currency: formData.get("currency") || "PEN",
    officialDocumentUrl: formData.get("officialDocumentUrl") || ""
  });

  const invoice = await createInvoice(parsed);
  await recordAdminAudit({ actorUserId: principal.userId, eventType: "commercial.invoice.created", entityType: "invoice", entityId: invoice.id, metadata: { proposalId: parsed.proposalId } });
  revalidateProposal(parsed.proposalId);
  redirect(`/admin/commercial/proposals/${parsed.proposalId}?created=invoice`);
}

export async function createManualPaymentAction(formData: FormData) {
  const principal = await requireAdmin();

  const proposalId = String(formData.get("proposalId"));
  const parsed = paymentInputSchema.parse({
    invoiceId: formData.get("invoiceId"),
    provider: formData.get("provider") || "manual",
    providerReference: formData.get("providerReference") || undefined,
    amount: formData.get("amount"),
    currency: formData.get("currency") || "PEN",
    status: formData.get("status") || "paid",
    paidAt: formData.get("paidAt") || undefined
  });

  const payment = await createManualPayment(parsed);
  await recordAdminAudit({ actorUserId: principal.userId, eventType: "commercial.payment.created", entityType: "payment", entityId: payment.id, metadata: { invoiceId: parsed.invoiceId, status: parsed.status } });
  revalidateProposal(proposalId);
  redirect(`/admin/commercial/proposals/${proposalId}?created=payment`);
}

export async function createProjectAction(formData: FormData) {
  const principal = await requireAdmin();

  const parsed = projectInputSchema.parse({
    proposalId: formData.get("proposalId"),
    name: formData.get("name"),
    description: formData.get("description") || undefined,
    status: formData.get("status") || "active",
    startsAt: formData.get("startsAt") || undefined,
    endsAt: formData.get("endsAt") || undefined
  });

  const project = await createProject(parsed);
  await recordAdminAudit({ actorUserId: principal.userId, eventType: "commercial.project.created", entityType: "project", entityId: project.id, metadata: { proposalId: parsed.proposalId } });
  revalidateProposal(parsed.proposalId);
  redirect(`/admin/commercial/proposals/${parsed.proposalId}?created=project`);
}

export async function createDeliverableAction(formData: FormData) {
  const principal = await requireAdmin();

  const proposalId = String(formData.get("proposalId"));
  const parsed = deliverableInputSchema.parse({
    projectId: formData.get("projectId"),
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    status: formData.get("status") || "planned",
    dueAt: formData.get("dueAt") || undefined,
    resourceUrl: formData.get("resourceUrl") || ""
  });

  const deliverable = await createDeliverable(parsed);
  await recordAdminAudit({ actorUserId: principal.userId, eventType: "commercial.deliverable.created", entityType: "deliverable", entityId: deliverable.id, metadata: { projectId: parsed.projectId } });
  revalidateProposal(proposalId);
  redirect(`/admin/commercial/proposals/${proposalId}?created=deliverable`);
}

export async function createPortalTokenAction(formData: FormData) {
  const principal = await requireAdmin();
  const durationDays = portalTokenDurationSchema.parse(formData.get("durationDays") || 30);

  const parsed = portalTokenInputSchema.parse({
    clientId: formData.get("clientId"),
    label: formData.get("label") || "Acceso principal",
    expiresAt: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString()
  });

  const portalToken = await createPortalToken(parsed);
  await recordAdminAudit({ actorUserId: principal.userId, eventType: "portal.access.created", entityType: "client_portal_token", entityId: portalToken.id, metadata: { clientId: parsed.clientId, durationDays } });
  revalidatePath("/admin");
  revalidatePath("/admin/commercial");
  revalidatePath(`/admin/commercial/clients/${parsed.clientId}`);
  redirect(`/admin/commercial/clients/${parsed.clientId}?created=portal&portalToken=${encodeURIComponent(portalToken.token ?? "")}`);
}

export async function revokePortalTokenAction(formData: FormData) {
  const principal = await requireAdmin();
  const parsed = portalTokenRevokeSchema.parse({ tokenId: formData.get("tokenId"), clientId: formData.get("clientId") });
  await revokePortalToken(parsed);
  await recordAdminAudit({ actorUserId: principal.userId, eventType: "portal.access.revoked", entityType: "client_portal_token", entityId: parsed.tokenId, metadata: { clientId: parsed.clientId } });
  revalidatePath(`/admin/commercial/clients/${parsed.clientId}`);
  redirect(`/admin/commercial/clients/${parsed.clientId}?updated=portal-revoked`);
}

export async function createClientResourceAction(formData: FormData) {
  const principal = await requireAdmin();

  const parsed = clientResourceInputSchema.parse({
    clientId: formData.get("clientId"),
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    resourceType: formData.get("resourceType") || "analysis",
    url: formData.get("url") || "",
    productSlug: formData.get("productSlug") || undefined,
    visibility: formData.get("visibility") || "client",
    status: formData.get("status") || "published"
  });

  const resource = await createClientResource(parsed);
  await recordAdminAudit({ actorUserId: principal.userId, eventType: "commercial.resource.created", entityType: "client_resource", entityId: resource.id, metadata: { clientId: parsed.clientId } });
  revalidatePath("/admin");
  revalidatePath("/admin/commercial");
  revalidatePath(`/admin/commercial/clients/${parsed.clientId}`);
  redirect(`/admin/commercial/clients/${parsed.clientId}?created=resource`);
}

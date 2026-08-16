import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

async function loadLocalEnv() {
  try {
    const raw = await fs.readFile(path.join(process.cwd(), ".env.local"), "utf8");

    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const [key, ...parts] = trimmed.split("=");
      if (!process.env[key]) process.env[key] = parts.join("=").trim().replace(/^['"]|['"]$/g, "");
    }
  } catch {
    // CI can run the regular suite without a database service.
  }
}

await loadLocalEnv();

if (!process.env.DATABASE_URL) {
  console.log("Database workflow omitido: DATABASE_URL no está configurado");
  process.exit(0);
}

const commercial = await import("../lib/commercial.ts");
const { getDb } = await import("../lib/db.ts");
const db = getDb();
assert.ok(db, "Postgres debe estar disponible");

let clientId: string | null = null;

try {
  const client = await commercial.createClient({
    name: "Validación automatizada NOAM",
    organization: "Entidad de prueba transaccional",
    email: "qa-database@noam.pe",
    phone: "",
    country: "Peru",
    segment: "public-sector",
    status: "active",
    notes: "Este registro debe eliminarse al finalizar la prueba."
  });
  clientId = client.id;

  const proposal = await commercial.createProposal({
    clientId,
    title: "Observatorio de validación",
    summary: "Prueba integral y reversible del flujo comercial de NOAM.",
    serviceSlug: "observatorios-sistemas-decision",
    status: "draft",
    amount: 1180,
    currency: "PEN",
    validUntil: ""
  });

  const quote = await commercial.createQuote({ proposalId: proposal.id, subtotal: 1000, tax: 180, currency: "PEN", dueAt: "" });
  assert.equal(Number(quote.total), 1180);
  assert.match(quote.quote_number, /^NOAM-Q-/);

  const invoice = await commercial.createInvoice({
    proposalId: proposal.id,
    invoiceNumber: "",
    subtotal: 1000,
    tax: 180,
    currency: "PEN",
    officialDocumentUrl: ""
  });

  await commercial.createManualPayment({
    invoiceId: invoice.id,
    provider: "manual",
    providerReference: "QA-PARCIAL",
    amount: 500,
    currency: "PEN",
    status: "paid",
    paidAt: ""
  });
  let [invoiceState] = await db`select status, paid_at from invoices where id = ${invoice.id}`;
  assert.equal(invoiceState.status, "issued", "Un pago parcial no debe cerrar la factura");
  assert.equal(invoiceState.paid_at, null);

  await commercial.createManualPayment({
    invoiceId: invoice.id,
    provider: "manual",
    providerReference: "QA-SALDO",
    amount: 680,
    currency: "PEN",
    status: "paid",
    paidAt: ""
  });
  [invoiceState] = await db`select status, paid_at from invoices where id = ${invoice.id}`;
  assert.equal(invoiceState.status, "paid", "El saldo completo debe cerrar la factura");
  assert.ok(invoiceState.paid_at);

  await commercial.createManualPayment({
    invoiceId: invoice.id,
    provider: "manual",
    providerReference: "QA-REEMBOLSO",
    amount: 200,
    currency: "PEN",
    status: "refunded",
    paidAt: ""
  });
  [invoiceState] = await db`select status, paid_at from invoices where id = ${invoice.id}`;
  assert.equal(invoiceState.status, "issued", "Un reembolso que deja saldo debe reabrir la factura");
  assert.equal(invoiceState.paid_at, null);

  const project = await commercial.createProject({
    proposalId: proposal.id,
    name: "Implementación de observatorio",
    description: "Proyecto reversible para validar la operación.",
    status: "active",
    startsAt: "",
    endsAt: ""
  });
  await commercial.createDeliverable({
    projectId: project.id,
    title: "Tablero inicial",
    description: "Entregable de validación.",
    status: "planned",
    dueAt: "",
    resourceUrl: ""
  });
  const portalToken = await commercial.createPortalToken({ clientId, label: "Acceso QA", expiresAt: "" });
  assert.ok(portalToken.expires_at, "Todo acceso debe tener vencimiento");
  const expiryDays = (new Date(portalToken.expires_at).getTime() - Date.now()) / 86_400_000;
  assert.ok(expiryDays > 29 && expiryDays <= 30, "El vencimiento por defecto debe ser de 30 días");
  await assert.rejects(
    commercial.createPortalToken({ clientId, label: "Acceso excesivo", expiresAt: new Date(Date.now() + 91 * 86_400_000).toISOString() }),
    /90 días/
  );
  await commercial.createClientResource({
    clientId,
    title: "Ficha territorial de prueba",
    description: "Recurso reversible del portal.",
    resourceType: "analysis",
    url: "https://noam.pe/dataperu",
    productSlug: "dataperu",
    visibility: "client",
    status: "published"
  });

  const operations = await commercial.getProposalOperations(proposal.id);
  assert.ok(operations);
  assert.equal(operations.proposal.status, "accepted");
  assert.equal(operations.quotes.length, 1);
  assert.equal(operations.invoices.length, 1);
  assert.equal(operations.payments.length, 3);
  assert.equal(operations.projects.length, 1);
  assert.equal(operations.deliverables.length, 1);

  const workspace = await commercial.getClientWorkspaceByToken(portalToken.token);
  assert.ok(workspace);
  assert.equal(workspace.client.id, clientId);
  assert.equal(workspace.resources.length, 1);
  assert.equal(workspace.projects.length, 1);
  assert.equal(workspace.deliverables.length, 1);
  const [usedToken] = await db`select token, token_hash, last_used_at from client_portal_tokens where id = ${portalToken.id}`;
  assert.equal(usedToken.token, null, "El secreto original no debe persistirse");
  assert.equal(usedToken.token_hash.length, 64);
  assert.ok(usedToken.last_used_at, "El portal debe registrar el último uso");
  assert.equal(await commercial.revokePortalToken({ tokenId: portalToken.id, clientId }), true);
  assert.equal(await commercial.revokePortalToken({ tokenId: portalToken.id, clientId }), false, "Revocar dos veces no debe mutar el acceso");
  assert.equal(await commercial.getClientWorkspaceByToken(portalToken.token), null, "Un token revocado debe dejar de funcionar inmediatamente");
  const [revokedToken] = await db`select is_active, revoked_at from client_portal_tokens where id = ${portalToken.id}`;
  assert.equal(revokedToken.is_active, false);
  assert.ok(revokedToken.revoked_at);
} finally {
  if (clientId) {
    await db`delete from payments where invoice_id in (select id from invoices where client_id = ${clientId})`;
    await db`delete from deliverables where project_id in (select id from projects where client_id = ${clientId})`;
    await db`delete from client_resources where client_id = ${clientId}`;
    await db`delete from client_portal_tokens where client_id = ${clientId}`;
    await db`delete from invoices where client_id = ${clientId}`;
    await db`delete from quotes where proposal_id in (select id from proposals where client_id = ${clientId})`;
    await db`delete from projects where client_id = ${clientId}`;
    await db`delete from proposals where client_id = ${clientId}`;
    await db`delete from clients where id = ${clientId}`;
    const [residue] = await db`select count(*)::int as count from clients where id = ${clientId}`;
    assert.equal(residue.count, 0, "La prueba no debe dejar registros comerciales");
  }
  await db.end();
}

console.log("Database workflow OK: propuesta, cotización, factura, pagos, proyecto, entregable y portal verificados sin dejar datos");

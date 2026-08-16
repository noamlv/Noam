import { createHash } from "node:crypto";
import { getDb } from "./db.ts";
import type {
  ClientInput,
  ClientResourceInput,
  DeliverableInput,
  InvoiceInput,
  PaymentInput,
  PortalTokenInput,
  PortalTokenRevokeInput,
  ProjectInput,
  ProposalInput,
  ProposalStatusInput,
  QuoteInput
} from "./commercial-validation";
import type {
  Client,
  ClientPortalToken,
  ClientResource,
  ClientWorkspace,
  CommercialSummary,
  Deliverable,
  Invoice,
  Payment,
  Project,
  Proposal,
  ProposalOperations,
  Quote
} from "../types/commercial";

function requireDb() {
  const db = getDb();

  if (!db) {
    throw new Error("DATABASE_URL no esta configurado. Activa Postgres para usar el modulo comercial.");
  }

  return db;
}

export async function getClients(): Promise<Client[]> {
  const db = getDb();

  if (!db) {
    return [];
  }

  return (await db`
    select id, name, organization, email, phone, country, segment, status, notes, created_at, updated_at
    from clients
    order by created_at desc
  `) as unknown as Client[];
}

export async function createClient(input: ClientInput): Promise<Client> {
  const db = requireDb();

  const rows = (await db`
    insert into clients (name, organization, email, phone, country, segment, status, notes)
    values (
      ${input.name},
      ${input.organization || null},
      ${input.email || null},
      ${input.phone || null},
      ${input.country},
      ${input.segment},
      ${input.status},
      ${input.notes || null}
    )
    returning id, name, organization, email, phone, country, segment, status, notes, created_at, updated_at
  `) as unknown as Client[];

  return rows[0];
}

export async function getClient(clientId: string): Promise<Client | null> {
  const db = getDb();

  if (!db) {
    return null;
  }

  const rows = (await db`
    select id, name, organization, email, phone, country, segment, status, notes, created_at, updated_at
    from clients
    where id = ${clientId}
    limit 1
  `) as unknown as Client[];

  return rows[0] ?? null;
}

export async function getProposals(): Promise<Proposal[]> {
  const db = getDb();

  if (!db) {
    return [];
  }

  return (await db`
    select
      proposals.id,
      proposals.client_id,
      clients.name as client_name,
      proposals.title,
      proposals.summary,
      proposals.service_slug,
      proposals.status,
      proposals.amount,
      proposals.currency,
      proposals.valid_until,
      proposals.created_at,
      proposals.updated_at
    from proposals
    left join clients on clients.id = proposals.client_id
    order by proposals.created_at desc
  `) as unknown as Proposal[];
}

export async function getProposal(proposalId: string): Promise<Proposal | null> {
  const db = getDb();

  if (!db) {
    return null;
  }

  const rows = (await db`
    select
      proposals.id,
      proposals.client_id,
      clients.name as client_name,
      proposals.title,
      proposals.summary,
      proposals.service_slug,
      proposals.status,
      proposals.amount,
      proposals.currency,
      proposals.valid_until,
      proposals.created_at,
      proposals.updated_at
    from proposals
    left join clients on clients.id = proposals.client_id
    where proposals.id = ${proposalId}
    limit 1
  `) as unknown as Proposal[];

  return rows[0] ?? null;
}

export async function getProposalOperations(proposalId: string): Promise<ProposalOperations | null> {
  const db = getDb();

  if (!db) {
    return null;
  }

  const proposal = await getProposal(proposalId);

  if (!proposal) {
    return null;
  }

  const [quotes, invoices, projects] = await Promise.all([
    db`
      select id, proposal_id, quote_number, subtotal, tax, total, currency, status, issued_at, due_at, created_at
      from quotes
      where proposal_id = ${proposalId}
      order by created_at desc
    `,
    db`
      select id, client_id, proposal_id, invoice_number, official_document_url, subtotal, tax, total, currency, status, issued_at, paid_at, created_at
      from invoices
      where proposal_id = ${proposalId}
      order by created_at desc
    `,
    db`
      select id, client_id, proposal_id, name, description, status, starts_at, ends_at, created_at, updated_at
      from projects
      where proposal_id = ${proposalId}
      order by created_at desc
    `
  ]);

  const invoiceIds = (invoices as unknown as Invoice[]).map((invoice) => invoice.id);
  const projectIds = (projects as unknown as Project[]).map((project) => project.id);

  const payments = invoiceIds.length
    ? await db`
        select id, invoice_id, provider, provider_reference, amount, currency, status, paid_at, created_at
        from payments
        where invoice_id in ${db(invoiceIds)}
        order by created_at desc
      `
    : [];

  const deliverables = projectIds.length
    ? await db`
        select id, project_id, title, description, status, due_at, resource_url, created_at, updated_at
        from deliverables
        where project_id in ${db(projectIds)}
        order by created_at desc
      `
    : [];

  return {
    proposal,
    quotes: quotes as unknown as Quote[],
    invoices: invoices as unknown as Invoice[],
    payments: payments as unknown as Payment[],
    projects: projects as unknown as Project[],
    deliverables: deliverables as unknown as Deliverable[]
  };
}

export async function createProposal(input: ProposalInput): Promise<Proposal> {
  const db = requireDb();

  const amount = typeof input.amount === "number" && Number.isFinite(input.amount) ? input.amount : null;

  const rows = (await db`
    insert into proposals (client_id, title, summary, service_slug, status, amount, currency, valid_until)
    values (
      ${input.clientId || null},
      ${input.title},
      ${input.summary},
      ${input.serviceSlug || null},
      ${input.status},
      ${amount},
      ${input.currency},
      ${input.validUntil || null}
    )
    returning
      id,
      client_id,
      null::text as client_name,
      title,
      summary,
      service_slug,
      status,
      amount,
      currency,
      valid_until,
      created_at,
      updated_at
  `) as unknown as Proposal[];

  return rows[0];
}

export async function updateProposalStatus(input: ProposalStatusInput): Promise<Proposal> {
  const db = requireDb();

  const rows = (await db`
    update proposals
    set status = ${input.status}, updated_at = now()
    where id = ${input.proposalId}
    returning
      id,
      client_id,
      null::text as client_name,
      title,
      summary,
      service_slug,
      status,
      amount,
      currency,
      valid_until,
      created_at,
      updated_at
  `) as unknown as Proposal[];

  return rows[0];
}

function operationNumber(prefix: string) {
  const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `${prefix}-${stamp}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export async function createQuote(input: QuoteInput): Promise<Quote> {
  const db = requireDb();
  const total = input.subtotal + input.tax;

  const rows = (await db.begin(async (tx) => {
    const quotes = await tx`
      insert into quotes (proposal_id, quote_number, subtotal, tax, total, currency, status, issued_at, due_at)
      values (
        ${input.proposalId},
        ${operationNumber("NOAM-Q")},
        ${input.subtotal},
        ${input.tax},
        ${total},
        ${input.currency},
        'issued',
        now(),
        ${input.dueAt || null}
      )
      returning id, proposal_id, quote_number, subtotal, tax, total, currency, status, issued_at, due_at, created_at
    `;

    await tx`update proposals set status = 'sent', updated_at = now() where id = ${input.proposalId}`;
    return quotes;
  })) as unknown as Quote[];

  return rows[0];
}

export async function createInvoice(input: InvoiceInput): Promise<Invoice> {
  const db = requireDb();
  const total = input.subtotal + input.tax;

  const rows = (await db.begin(async (tx) => {
    const [proposal] = await tx`select client_id from proposals where id = ${input.proposalId}`;

    return tx`
      insert into invoices (client_id, proposal_id, invoice_number, official_document_url, subtotal, tax, total, currency, status, issued_at)
      values (
        ${proposal?.client_id ?? null},
        ${input.proposalId},
        ${input.invoiceNumber || operationNumber("NOAM-I")},
        ${input.officialDocumentUrl || null},
        ${input.subtotal},
        ${input.tax},
        ${total},
        ${input.currency},
        'issued',
        now()
      )
      returning id, client_id, proposal_id, invoice_number, official_document_url, subtotal, tax, total, currency, status, issued_at, paid_at, created_at
    `;
  })) as unknown as Invoice[];

  return rows[0];
}

export async function createManualPayment(input: PaymentInput): Promise<Payment> {
  const db = requireDb();

  const rows = (await db.begin(async (tx) => {
    const payments = (await tx`
      insert into payments (invoice_id, provider, provider_reference, amount, currency, status, paid_at)
      values (
        ${input.invoiceId},
        ${input.provider},
        ${input.providerReference || null},
        ${input.amount},
        ${input.currency},
        ${input.status},
        ${input.paidAt || new Date().toISOString()}
      )
      returning id, invoice_id, provider, provider_reference, amount, currency, status, paid_at, created_at
    `) as unknown as Payment[];

    await tx`
      update invoices
      set
        status = case
          when (
            select coalesce(sum(case when status = 'paid' then amount when status = 'refunded' then -amount else 0 end), 0)
            from payments
            where invoice_id = ${input.invoiceId}
          ) >= total then 'paid'
          else 'issued'
        end,
        paid_at = case
          when (
            select coalesce(sum(case when status = 'paid' then amount when status = 'refunded' then -amount else 0 end), 0)
            from payments
            where invoice_id = ${input.invoiceId}
          ) >= total then coalesce(paid_at, now())
          else null
        end
      where id = ${input.invoiceId}
    `;

    return payments;
  })) as unknown as Payment[];

  return rows[0];
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const db = requireDb();

  const rows = (await db.begin(async (tx) => {
    const [proposal] = await tx`select client_id from proposals where id = ${input.proposalId}`;
    const projects = await tx`
      insert into projects (client_id, proposal_id, name, description, status, starts_at, ends_at)
      values (
        ${proposal?.client_id ?? null},
        ${input.proposalId},
        ${input.name},
        ${input.description || null},
        ${input.status},
        ${input.startsAt || null},
        ${input.endsAt || null}
      )
      returning id, client_id, proposal_id, name, description, status, starts_at, ends_at, created_at, updated_at
    `;

    await tx`update proposals set status = 'accepted', updated_at = now() where id = ${input.proposalId}`;
    return projects;
  })) as unknown as Project[];

  return rows[0];
}

export async function createDeliverable(input: DeliverableInput): Promise<Deliverable> {
  const db = requireDb();

  const rows = (await db`
    insert into deliverables (project_id, title, description, status, due_at, resource_url)
    values (
      ${input.projectId},
      ${input.title},
      ${input.description || null},
      ${input.status},
      ${input.dueAt || null},
      ${input.resourceUrl || null}
    )
    returning id, project_id, title, description, status, due_at, resource_url, created_at, updated_at
  `) as unknown as Deliverable[];

  return rows[0];
}

export async function createPortalToken(input: PortalTokenInput): Promise<ClientPortalToken> {
  const db = requireDb();
  const token = crypto.randomUUID().replaceAll("-", "") + crypto.randomUUID().replaceAll("-", "").slice(0, 16);
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const now = Date.now();
  const expiresAt = input.expiresAt ? new Date(input.expiresAt) : new Date(now + 30 * 24 * 60 * 60 * 1000);

  if (!Number.isFinite(expiresAt.getTime()) || expiresAt.getTime() <= now) {
    throw new Error("La expiración del portal debe ser una fecha futura.");
  }
  if (expiresAt.getTime() > now + 90 * 24 * 60 * 60 * 1000) {
    throw new Error("Un enlace del portal no puede durar más de 90 días.");
  }

  const rows = (await db`
    insert into client_portal_tokens (client_id, token, token_hash, label, expires_at)
    values (${input.clientId}, null, ${tokenHash}, ${input.label}, ${expiresAt.toISOString()})
    returning id, client_id, ${token}::text as token, label, is_active, last_used_at, expires_at, revoked_at, created_at
  `) as unknown as ClientPortalToken[];

  return rows[0];
}

export async function revokePortalToken(input: PortalTokenRevokeInput) {
  const db = requireDb();
  const rows = await db`
    update client_portal_tokens
    set is_active = false, revoked_at = now()
    where id = ${input.tokenId} and client_id = ${input.clientId} and is_active = true
    returning id
  `;
  return rows.length === 1;
}

export async function createClientResource(input: ClientResourceInput): Promise<ClientResource> {
  const db = requireDb();

  const rows = (await db`
    insert into client_resources (client_id, title, description, resource_type, url, product_slug, visibility, status)
    values (
      ${input.clientId},
      ${input.title},
      ${input.description || null},
      ${input.resourceType},
      ${input.url || null},
      ${input.productSlug || null},
      ${input.visibility},
      ${input.status}
    )
    returning id, client_id, title, description, resource_type, url, product_slug, visibility, status, created_at, updated_at
  `) as unknown as ClientResource[];

  return rows[0];
}

export async function getClientWorkspace(clientId: string): Promise<ClientWorkspace | null> {
  const db = getDb();

  if (!db) {
    return null;
  }

  const client = await getClient(clientId);

  if (!client) {
    return null;
  }

  const [tokens, resources, proposals, invoices, projects] = await Promise.all([
    db`
      select id, client_id, null::text as token, label, is_active, last_used_at, expires_at, revoked_at, created_at
      from client_portal_tokens
      where client_id = ${clientId}
      order by created_at desc
    `,
    db`
      select id, client_id, title, description, resource_type, url, product_slug, visibility, status, created_at, updated_at
      from client_resources
      where client_id = ${clientId}
      order by created_at desc
    `,
    db`
      select
        proposals.id,
        proposals.client_id,
        clients.name as client_name,
        proposals.title,
        proposals.summary,
        proposals.service_slug,
        proposals.status,
        proposals.amount,
        proposals.currency,
        proposals.valid_until,
        proposals.created_at,
        proposals.updated_at
      from proposals
      left join clients on clients.id = proposals.client_id
      where proposals.client_id = ${clientId}
      order by proposals.created_at desc
    `,
    db`
      select id, client_id, proposal_id, invoice_number, official_document_url, subtotal, tax, total, currency, status, issued_at, paid_at, created_at
      from invoices
      where client_id = ${clientId}
      order by created_at desc
    `,
    db`
      select id, client_id, proposal_id, name, description, status, starts_at, ends_at, created_at, updated_at
      from projects
      where client_id = ${clientId}
      order by created_at desc
    `
  ]);

  const projectIds = (projects as unknown as Project[]).map((project) => project.id);
  const deliverables = projectIds.length
    ? await db`
        select id, project_id, title, description, status, due_at, resource_url, created_at, updated_at
        from deliverables
        where project_id in ${db(projectIds)}
        order by created_at desc
      `
    : [];

  return {
    client,
    tokens: tokens as unknown as ClientPortalToken[],
    resources: resources as unknown as ClientResource[],
    proposals: proposals as unknown as Proposal[],
    invoices: invoices as unknown as Invoice[],
    projects: projects as unknown as Project[],
    deliverables: deliverables as unknown as Deliverable[]
  };
}

export async function getClientWorkspaceByToken(token: string): Promise<ClientWorkspace | null> {
  const db = getDb();

  if (!db) {
    return null;
  }

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const rows = (await db`
    update client_portal_tokens
    set last_used_at = now()
    where token_hash = ${tokenHash}
      and is_active = true
      and (expires_at is null or expires_at > now())
    returning client_id
  `) as unknown as Array<{ client_id: string }>;

  if (!rows[0]) {
    return null;
  }

  return getClientWorkspace(rows[0].client_id);
}

export async function getCommercialSummary(): Promise<CommercialSummary> {
  const db = getDb();

  if (!db) {
    return {
      clients: 0,
      activeClients: 0,
      proposals: 0,
      openProposals: 0,
      acceptedRevenue: 0,
      pendingRevenue: 0
    };
  }

  const [summary] = (await db`
    select
      (select count(*)::int from clients) as clients,
      (select count(*)::int from clients where status = 'active') as "activeClients",
      (select count(*)::int from proposals) as proposals,
      (select count(*)::int from proposals where status in ('draft', 'sent')) as "openProposals",
      coalesce((select sum(amount)::float from proposals where status = 'accepted'), 0) as "acceptedRevenue",
      coalesce((select sum(amount)::float from proposals where status in ('draft', 'sent')), 0) as "pendingRevenue"
  `) as unknown as CommercialSummary[];

  return summary;
}

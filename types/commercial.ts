export type ClientStatus = "active" | "lead" | "paused" | "archived";
export type ProposalStatus = "draft" | "sent" | "accepted" | "rejected" | "expired";
export type QuoteStatus = "draft" | "issued" | "accepted" | "expired" | "cancelled";
export type InvoiceStatus = "draft" | "issued" | "paid" | "void";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type ProjectStatus = "planned" | "active" | "completed" | "paused" | "cancelled";
export type DeliverableStatus = "planned" | "in_progress" | "delivered" | "approved";

export interface Client {
  id: string;
  name: string;
  organization: string | null;
  email: string | null;
  phone: string | null;
  country: string;
  segment: string;
  status: ClientStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Proposal {
  id: string;
  client_id: string | null;
  client_name: string | null;
  title: string;
  summary: string;
  service_slug: string | null;
  status: ProposalStatus;
  amount: string | null;
  currency: string;
  valid_until: string | null;
  created_at: string;
  updated_at: string;
}

export interface Quote {
  id: string;
  proposal_id: string | null;
  quote_number: string;
  subtotal: string;
  tax: string;
  total: string;
  currency: string;
  status: QuoteStatus;
  issued_at: string | null;
  due_at: string | null;
  created_at: string;
}

export interface Invoice {
  id: string;
  client_id: string | null;
  proposal_id: string | null;
  invoice_number: string | null;
  official_document_url: string | null;
  subtotal: string;
  tax: string;
  total: string;
  currency: string;
  status: InvoiceStatus;
  issued_at: string | null;
  paid_at: string | null;
  created_at: string;
}

export interface Payment {
  id: string;
  invoice_id: string | null;
  provider: string;
  provider_reference: string | null;
  amount: string;
  currency: string;
  status: PaymentStatus;
  paid_at: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  client_id: string | null;
  proposal_id: string | null;
  name: string;
  description: string | null;
  status: ProjectStatus;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Deliverable {
  id: string;
  project_id: string | null;
  title: string;
  description: string | null;
  status: DeliverableStatus;
  due_at: string | null;
  resource_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClientPortalToken {
  id: string;
  client_id: string;
  token: string | null;
  label: string;
  is_active: boolean;
  last_used_at: string | null;
  expires_at: string | null;
  revoked_at: string | null;
  created_at: string;
}

export interface ClientResource {
  id: string;
  client_id: string;
  title: string;
  description: string | null;
  resource_type: string;
  url: string | null;
  product_slug: string | null;
  visibility: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ClientWorkspace {
  client: Client;
  tokens: ClientPortalToken[];
  resources: ClientResource[];
  proposals: Proposal[];
  invoices: Invoice[];
  projects: Project[];
  deliverables: Deliverable[];
}

export interface ProposalOperations {
  proposal: Proposal;
  quotes: Quote[];
  invoices: Invoice[];
  payments: Payment[];
  projects: Project[];
  deliverables: Deliverable[];
}

export interface CommercialSummary {
  clients: number;
  activeClients: number;
  proposals: number;
  openProposals: number;
  acceptedRevenue: number;
  pendingRevenue: number;
}

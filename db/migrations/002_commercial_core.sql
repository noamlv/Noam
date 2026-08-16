create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organization text,
  email text,
  phone text,
  country text not null default 'Peru',
  segment text not null default 'consulting',
  status text not null default 'active',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clients_created_at_idx on clients (created_at desc);
create index if not exists clients_status_idx on clients (status);
create index if not exists clients_segment_idx on clients (segment);

create table if not exists proposals (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete set null,
  title text not null,
  summary text not null,
  service_slug text,
  status text not null default 'draft',
  amount numeric(14, 2),
  currency text not null default 'PEN',
  valid_until date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists proposals_created_at_idx on proposals (created_at desc);
create index if not exists proposals_status_idx on proposals (status);
create index if not exists proposals_client_id_idx on proposals (client_id);

create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid references proposals(id) on delete cascade,
  quote_number text not null unique,
  subtotal numeric(14, 2) not null default 0,
  tax numeric(14, 2) not null default 0,
  total numeric(14, 2) not null default 0,
  currency text not null default 'PEN',
  status text not null default 'draft',
  issued_at timestamptz,
  due_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists quotes_status_idx on quotes (status);
create index if not exists quotes_proposal_id_idx on quotes (proposal_id);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete set null,
  proposal_id uuid references proposals(id) on delete set null,
  invoice_number text unique,
  official_document_url text,
  subtotal numeric(14, 2) not null default 0,
  tax numeric(14, 2) not null default 0,
  total numeric(14, 2) not null default 0,
  currency text not null default 'PEN',
  status text not null default 'draft',
  issued_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists invoices_status_idx on invoices (status);
create index if not exists invoices_client_id_idx on invoices (client_id);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references invoices(id) on delete set null,
  provider text not null default 'manual',
  provider_reference text,
  amount numeric(14, 2) not null,
  currency text not null default 'PEN',
  status text not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists payments_status_idx on payments (status);
create index if not exists payments_invoice_id_idx on payments (invoice_id);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete set null,
  proposal_id uuid references proposals(id) on delete set null,
  name text not null,
  description text,
  status text not null default 'planned',
  starts_at date,
  ends_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_status_idx on projects (status);
create index if not exists projects_client_id_idx on projects (client_id);

create table if not exists deliverables (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'planned',
  due_at date,
  resource_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists deliverables_status_idx on deliverables (status);
create index if not exists deliverables_project_id_idx on deliverables (project_id);

create table if not exists client_portal_tokens (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  token text not null unique,
  label text not null default 'Acceso principal',
  is_active boolean not null default true,
  last_used_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists client_portal_tokens_client_id_idx on client_portal_tokens (client_id);
create index if not exists client_portal_tokens_token_idx on client_portal_tokens (token);

create table if not exists client_resources (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  title text not null,
  description text,
  resource_type text not null default 'analysis',
  url text,
  product_slug text,
  visibility text not null default 'client',
  status text not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists client_resources_client_id_idx on client_resources (client_id);
create index if not exists client_resources_status_idx on client_resources (status);
create index if not exists client_resources_product_slug_idx on client_resources (product_slug);

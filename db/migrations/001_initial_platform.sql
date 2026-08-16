create extension if not exists pgcrypto;

create table if not exists leads (
  id uuid primary key,
  name text not null,
  email text not null,
  organization text,
  interest text not null,
  message text not null,
  source text not null default 'contact',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_status_idx on leads (status);
create index if not exists leads_interest_idx on leads (interest);

create table if not exists platform_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  description text not null,
  outcome text not null,
  status text not null default 'prototype',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists verticals (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists demos (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  product_slug text references platform_products(slug) on delete set null,
  title text not null,
  description text not null,
  demo_type text not null default 'prototype',
  url text not null,
  status text not null default 'prototype',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  kind text not null,
  url text not null,
  product_slug text references platform_products(slug) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists datasets (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  source text,
  storage_path text,
  product_slug text references platform_products(slug) on delete set null,
  license text,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists dashboard_metrics (
  id uuid primary key default gen_random_uuid(),
  product_slug text references platform_products(slug) on delete cascade,
  metric_key text not null,
  label text not null,
  value numeric,
  unit text,
  period text,
  dimension jsonb not null default '{}'::jsonb,
  source text,
  created_at timestamptz not null default now()
);

create table if not exists map_layers (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  product_slug text references platform_products(slug) on delete set null,
  title text not null,
  description text,
  layer_type text not null default 'geojson',
  storage_path text,
  style jsonb not null default '{}'::jsonb,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists survey_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  fieldwork_start date,
  fieldwork_end date,
  sample_size integer,
  scope text,
  methodology text,
  product_slug text references platform_products(slug) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists survey_metrics (
  id uuid primary key default gen_random_uuid(),
  survey_slug text references survey_projects(slug) on delete cascade,
  metric_key text not null,
  label text not null,
  value numeric,
  segment text,
  geography text,
  created_at timestamptz not null default now()
);

create table if not exists electoral_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  cycle text,
  country text not null default 'Peru',
  product_slug text references platform_products(slug) on delete set null,
  summary text,
  status text not null default 'prototype',
  created_at timestamptz not null default now()
);

alter table resources
  add column if not exists slug text,
  add column if not exists source_label text,
  add column if not exists period text,
  add column if not exists format text,
  add column if not exists sort_order integer not null default 100,
  add column if not exists is_public boolean not null default false,
  add column if not exists updated_at timestamptz not null default now();

update resources
set slug = 'resource-' || id::text
where slug is null or btrim(slug) = '';

alter table resources alter column slug set not null;

create unique index if not exists resources_slug_unique_idx on resources (slug);
create index if not exists resources_public_product_idx
  on resources (is_public, product_slug, sort_order, created_at desc);

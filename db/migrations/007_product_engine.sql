alter table platform_products
  add column if not exists href text,
  add column if not exists audience jsonb not null default '[]'::jsonb,
  add column if not exists features jsonb not null default '[]'::jsonb,
  add column if not exists deliverables jsonb not null default '[]'::jsonb,
  add column if not exists demo_href text,
  add column if not exists timeline text,
  add column if not exists sort_order integer not null default 100,
  add column if not exists is_published boolean not null default false;

update platform_products
set href = '/products/' || slug
where href is null or btrim(href) = '';

alter table platform_products alter column href set not null;

create index if not exists platform_products_public_idx
  on platform_products (is_published, sort_order, updated_at desc);

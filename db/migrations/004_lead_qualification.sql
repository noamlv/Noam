alter table leads add column if not exists role text;
alter table leads add column if not exists organization_type text;
alter table leads add column if not exists territory text;
alter table leads add column if not exists timeline text;
alter table leads add column if not exists budget_range text;
alter table leads add column if not exists origin_path text;
alter table leads add column if not exists consent_at timestamptz;

create index if not exists leads_organization_type_idx on leads (organization_type);
create index if not exists leads_timeline_idx on leads (timeline);

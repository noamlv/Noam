create table if not exists analytics_events (
  id uuid primary key,
  event_name text not null,
  path text not null,
  target text,
  referrer text,
  created_at timestamptz not null default now(),
  constraint analytics_events_name_check check (event_name in ('page_view', 'cta_click', 'resource_download', 'lead_submit'))
);

create index if not exists analytics_events_created_at_idx on analytics_events (created_at desc);
create index if not exists analytics_events_name_idx on analytics_events (event_name, created_at desc);
create index if not exists analytics_events_path_idx on analytics_events (path, created_at desc);

comment on table analytics_events is 'Analítica agregada de primera parte, sin cookies, IP persistida ni identificadores de usuario.';

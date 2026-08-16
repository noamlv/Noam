create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  interests text[] not null default '{}'::text[],
  status text not null default 'pending',
  source_path text not null default '/newsletter',
  consent_at timestamptz not null,
  confirmation_token_hash text,
  unsubscribe_token_hash text not null,
  confirmation_sent_at timestamptz,
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint newsletter_subscribers_status_check check (status in ('pending', 'active', 'unsubscribed')),
  constraint newsletter_subscribers_interests_check check (interests <@ array['gestion-publica', 'electoral', 'datos-ia']::text[])
);

create unique index if not exists newsletter_subscribers_email_unique_idx
  on newsletter_subscribers ((lower(email)));
create index if not exists newsletter_subscribers_status_idx
  on newsletter_subscribers (status, updated_at desc);
create index if not exists newsletter_subscribers_confirmation_hash_idx
  on newsletter_subscribers (confirmation_token_hash)
  where confirmation_token_hash is not null;
create index if not exists newsletter_subscribers_unsubscribe_hash_idx
  on newsletter_subscribers (unsubscribe_token_hash);

alter table analytics_events drop constraint if exists analytics_events_name_check;
alter table analytics_events add constraint analytics_events_name_check
  check (event_name in ('page_view', 'cta_click', 'resource_download', 'lead_submit', 'newsletter_signup'));

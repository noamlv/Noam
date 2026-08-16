create table if not exists newsletter_campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  subject text not null,
  preview_text text not null default '',
  title text not null,
  body_text text not null,
  cta_label text,
  cta_url text,
  audience_interests text[] not null default '{}'::text[],
  status text not null default 'draft',
  scheduled_at timestamptz,
  sending_started_at timestamptz,
  sent_at timestamptz,
  cancelled_at timestamptz,
  created_by uuid references admin_users(id) on delete set null,
  updated_by uuid references admin_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint newsletter_campaigns_slug_check check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint newsletter_campaigns_status_check check (status in ('draft', 'scheduled', 'sending', 'sent', 'cancelled')),
  constraint newsletter_campaigns_interests_check check (
    audience_interests <@ array['gestion-publica', 'electoral', 'datos-ia']::text[]
    and cardinality(audience_interests) <= 3
  ),
  constraint newsletter_campaigns_cta_check check (
    (cta_label is null and cta_url is null) or (cta_label is not null and cta_url is not null)
  )
);

create unique index if not exists newsletter_campaigns_slug_unique_idx on newsletter_campaigns ((lower(slug)));
create index if not exists newsletter_campaigns_status_schedule_idx on newsletter_campaigns (status, scheduled_at);
create index if not exists newsletter_campaigns_updated_idx on newsletter_campaigns (updated_at desc);

create table if not exists newsletter_campaign_recipients (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references newsletter_campaigns(id) on delete cascade,
  subscriber_id uuid references newsletter_subscribers(id) on delete set null,
  email text not null,
  name text,
  delivery_status text not null default 'queued',
  unsubscribe_token_hash text not null,
  provider_message_id text,
  error_message text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint newsletter_campaign_recipients_status_check check (
    delivery_status in ('queued', 'sent', 'failed', 'skipped', 'unsubscribed')
  )
);

create unique index if not exists newsletter_campaign_recipients_campaign_subscriber_idx
  on newsletter_campaign_recipients (campaign_id, subscriber_id) where subscriber_id is not null;
create unique index if not exists newsletter_campaign_recipients_unsubscribe_hash_idx
  on newsletter_campaign_recipients (unsubscribe_token_hash);
create index if not exists newsletter_campaign_recipients_campaign_status_idx
  on newsletter_campaign_recipients (campaign_id, delivery_status);

comment on table newsletter_campaigns is 'Ediciones gestionables y auditables del Brief NOAM.';
comment on table newsletter_campaign_recipients is 'Registro por destinatario, entrega y baja individual de cada edición.';

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  display_name text not null,
  role text not null default 'analyst',
  status text not null default 'active',
  password_hash text not null,
  password_changed_at timestamptz not null default now(),
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint admin_users_role_check check (role in ('owner', 'editor', 'analyst')),
  constraint admin_users_status_check check (status in ('active', 'suspended'))
);

create unique index if not exists admin_users_email_unique_idx on admin_users ((lower(email)));
create index if not exists admin_users_status_role_idx on admin_users (status, role);

create table if not exists admin_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references admin_users(id) on delete cascade,
  token_hash text not null,
  expires_at timestamptz not null,
  last_seen_at timestamptz not null default now(),
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  constraint admin_sessions_revocation_check check (revoked_at is null or revoked_at >= created_at)
);

create unique index if not exists admin_sessions_token_hash_unique_idx on admin_sessions (token_hash);
create index if not exists admin_sessions_user_active_idx on admin_sessions (user_id, expires_at desc) where revoked_at is null;

create table if not exists admin_audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references admin_users(id) on delete set null,
  event_type text not null,
  entity_type text,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists admin_audit_events_created_idx on admin_audit_events (created_at desc);
create index if not exists admin_audit_events_actor_idx on admin_audit_events (actor_user_id, created_at desc);
create index if not exists admin_audit_events_entity_idx on admin_audit_events (entity_type, entity_id, created_at desc);

comment on table admin_users is 'Identidades individuales autorizadas para operar NOAM OS.';
comment on table admin_sessions is 'Sesiones administrativas revocables; sólo conserva hashes de los secretos.';
comment on table admin_audit_events is 'Bitácora append-only de autenticación y mutaciones administrativas relevantes.';

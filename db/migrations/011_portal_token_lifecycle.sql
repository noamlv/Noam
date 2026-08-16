alter table client_portal_tokens add column if not exists revoked_at timestamptz;

update client_portal_tokens
set revoked_at = coalesce(revoked_at, created_at)
where is_active = false;

alter table client_portal_tokens drop constraint if exists client_portal_tokens_revocation_check;
alter table client_portal_tokens add constraint client_portal_tokens_revocation_check check (
  (is_active = true and revoked_at is null)
  or (is_active = false and revoked_at is not null)
);

create index if not exists client_portal_tokens_access_idx
  on client_portal_tokens (token_hash, expires_at)
  where is_active = true;

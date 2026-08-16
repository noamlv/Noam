alter table admin_users
  add column if not exists mfa_secret_ciphertext text,
  add column if not exists mfa_pending_secret_ciphertext text,
  add column if not exists mfa_recovery_code_hashes text[] not null default '{}'::text[],
  add column if not exists mfa_enabled_at timestamptz;

alter table admin_users drop constraint if exists admin_users_mfa_state_check;
alter table admin_users add constraint admin_users_mfa_state_check check (
  (mfa_enabled_at is null and mfa_secret_ciphertext is null)
  or (mfa_enabled_at is not null and mfa_secret_ciphertext is not null)
);

comment on column admin_users.mfa_secret_ciphertext is 'Secreto TOTP cifrado con AES-256-GCM y NOAM_AUTH_ENCRYPTION_KEY.';
comment on column admin_users.mfa_recovery_code_hashes is 'Hashes SHA-256 de códigos de recuperación de un solo uso.';

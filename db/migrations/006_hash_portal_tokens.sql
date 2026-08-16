alter table client_portal_tokens add column if not exists token_hash text;

update client_portal_tokens
set token_hash = encode(digest(token, 'sha256'), 'hex')
where token_hash is null and token is not null;

alter table client_portal_tokens alter column token_hash set not null;
alter table client_portal_tokens alter column token drop not null;

create unique index if not exists client_portal_tokens_token_hash_idx on client_portal_tokens (token_hash);

update client_portal_tokens set token = null where token_hash is not null;

comment on column client_portal_tokens.token_hash is 'Hash SHA-256 del secreto de acceso. El token original solo se muestra al crearlo.';

alter table admin_users add column if not exists must_change_password boolean not null default true;

comment on column admin_users.must_change_password is 'Bloquea operaciones sensibles hasta reemplazar la contraseña inicial.';

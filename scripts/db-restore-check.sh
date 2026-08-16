#!/bin/sh
set -eu

CONTAINER="${NOAM_DB_CONTAINER:-noam-postgres}"
BACKUP_DIR="${NOAM_BACKUP_DIR:-backups/local}"
BACKUP_FILE="${1:-}"
RESTORE_DB="noam_restore_check_$$"

if [ -z "$BACKUP_FILE" ]; then
  BACKUP_FILE="$(find "$BACKUP_DIR" -type f -name 'noam-*.dump' -print 2>/dev/null | sort | tail -n 1)"
fi

if [ -z "$BACKUP_FILE" ] || [ ! -s "$BACKUP_FILE" ]; then
  echo "No se encontró un backup para verificar." >&2
  exit 1
fi

cleanup() {
  docker exec "$CONTAINER" dropdb -U noam --if-exists "$RESTORE_DB" >/dev/null 2>&1 || true
}
trap cleanup EXIT INT TERM

docker exec "$CONTAINER" createdb -U noam "$RESTORE_DB"
docker exec -i "$CONTAINER" pg_restore -U noam -d "$RESTORE_DB" --no-owner --no-privileges < "$BACKUP_FILE"

TABLE_COUNT="$(docker exec "$CONTAINER" psql -U noam -d "$RESTORE_DB" -Atc "select count(*) from pg_tables where schemaname = 'public';")"
MIGRATION_COUNT="$(docker exec "$CONTAINER" psql -U noam -d "$RESTORE_DB" -Atc "select count(*) from schema_migrations;")"

if [ "$TABLE_COUNT" -lt 10 ] || [ "$MIGRATION_COUNT" -lt 6 ]; then
  echo "La restauración no contiene el esquema esperado: $TABLE_COUNT tablas, $MIGRATION_COUNT migraciones." >&2
  exit 1
fi

echo "Restore OK: $BACKUP_FILE · $TABLE_COUNT tablas · $MIGRATION_COUNT migraciones"

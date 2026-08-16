#!/bin/sh
set -eu

CONTAINER="${NOAM_DB_CONTAINER:-noam-postgres}"
BACKUP_DIR="${NOAM_BACKUP_DIR:-backups/local}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
TARGET="$BACKUP_DIR/noam-$STAMP.dump"
TEMP_TARGET="$TARGET.tmp"

if ! docker inspect "$CONTAINER" >/dev/null 2>&1; then
  echo "El contenedor $CONTAINER no existe. Ejecuta npm run db:local." >&2
  exit 1
fi

if [ "$(docker inspect --format='{{.State.Health.Status}}' "$CONTAINER" 2>/dev/null || true)" != "healthy" ]; then
  echo "Postgres no está saludable; el backup fue cancelado." >&2
  exit 1
fi

mkdir -p "$BACKUP_DIR"
trap 'rm -f "$TEMP_TARGET"' EXIT INT TERM

docker exec "$CONTAINER" pg_dump -U noam -d noam --format=custom --no-owner --no-privileges > "$TEMP_TARGET"

if [ ! -s "$TEMP_TARGET" ]; then
  echo "pg_dump generó un archivo vacío." >&2
  exit 1
fi

mv "$TEMP_TARGET" "$TARGET"
trap - EXIT INT TERM
printf '%s\n' "$TARGET"

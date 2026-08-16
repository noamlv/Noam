#!/bin/sh
set -eu

PORT="${PORT:-3200}"
LOG_FILE="${TMPDIR:-/tmp}/noam-smoke-server.log"

# Force an unreachable database so the production fail-closed path is exercised
# even when Next.js loads a valid DATABASE_URL from .env.local.
DATABASE_URL="postgres://noam:noam@127.0.0.1:65534/noam" NOAM_DB_SSL=false \
  npm run start -- --hostname 127.0.0.1 --port "$PORT" >"$LOG_FILE" 2>&1 &
SERVER_PID=$!

cleanup() {
  kill "$SERVER_PID" 2>/dev/null || true
  wait "$SERVER_PID" 2>/dev/null || true
}

trap cleanup EXIT INT TERM
SMOKE_BASE_URL="http://127.0.0.1:$PORT" SMOKE_EXPECT_DB_UNAVAILABLE=true node scripts/smoke-test.mjs || {
  cat "$LOG_FILE"
  exit 1
}

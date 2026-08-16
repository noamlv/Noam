import assert from "node:assert/strict";
import { evaluateProductionReadiness, isProductionReady } from "../lib/production-readiness.ts";

const valid = {
  NEXT_PUBLIC_SITE_URL: "https://noam.pe",
  DATABASE_URL: "postgres://noam_app:secret-value@db.noam.pe:5432/noam",
  NOAM_DB_SSL: "true",
  NOAM_ADMIN_TOKEN: "c".repeat(48),
  NOAM_AUTH_ENCRYPTION_KEY: "a".repeat(64),
  NOAM_ALLOW_LEGACY_ADMIN: "false",
  RESEND_API_KEY: "re_production_example_key",
  LEAD_NOTIFY_TO: "oportunidades@noam.pe",
  LEAD_NOTIFY_FROM: "NOAM <hola@noam.pe>"
};

assert.equal(isProductionReady(valid), true);
assert.equal(evaluateProductionReadiness(valid).length, 8);

const local = {
  ...valid,
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  DATABASE_URL: "postgres://noam:noam@localhost:5432/noam",
  NOAM_DB_SSL: "false",
  NOAM_ADMIN_TOKEN: "short",
  NOAM_AUTH_ENCRYPTION_KEY: "short",
  NOAM_ALLOW_LEGACY_ADMIN: "true",
  LEAD_NOTIFY_FROM: "NOAM <onboarding@resend.dev>"
};

const failures = evaluateProductionReadiness(local).filter((check) => !check.ok).map((check) => check.id);
assert.deepEqual(failures, ["site", "database", "database-ssl", "auth-key", "legacy-admin", "notify-from"]);
assert.equal(isProductionReady(local), false);

console.log("Readiness OK: ocho controles de producción verificados");

import nextEnv from "@next/env";
import { evaluateProductionReadiness, isProductionReady, type ProductionEnvironment } from "../lib/production-readiness.ts";

nextEnv.loadEnvConfig(process.cwd());

const environment: ProductionEnvironment = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  NOAM_DB_SSL: process.env.NOAM_DB_SSL,
  NOAM_ADMIN_TOKEN: process.env.NOAM_ADMIN_TOKEN,
  NOAM_AUTH_ENCRYPTION_KEY: process.env.NOAM_AUTH_ENCRYPTION_KEY,
  NOAM_ALLOW_LEGACY_ADMIN: process.env.NOAM_ALLOW_LEGACY_ADMIN,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  LEAD_NOTIFY_TO: process.env.LEAD_NOTIFY_TO,
  LEAD_NOTIFY_FROM: process.env.LEAD_NOTIFY_FROM
};

const checks = evaluateProductionReadiness(environment);

for (const check of checks) {
  console.log(`${check.ok ? "OK" : "FALTA"} · ${check.label}: ${check.detail}`);
}

if (!isProductionReady(environment)) {
  console.error("\nProducción no está lista. Corrige los puntos marcados antes del despliegue.");
  process.exitCode = 1;
} else {
  console.log("\nEntorno de producción listo para la verificación de infraestructura.");
}

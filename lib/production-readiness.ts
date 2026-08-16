export type ProductionEnvironment = Partial<Record<
  | "NEXT_PUBLIC_SITE_URL"
  | "DATABASE_URL"
  | "NOAM_DB_SSL"
  | "NOAM_ADMIN_TOKEN"
  | "NOAM_AUTH_ENCRYPTION_KEY"
  | "NOAM_ALLOW_LEGACY_ADMIN"
  | "RESEND_API_KEY"
  | "LEAD_NOTIFY_TO"
  | "LEAD_NOTIFY_FROM",
  string
>>;

export interface ReadinessCheck {
  id: string;
  label: string;
  ok: boolean;
  detail: string;
}

function validEmail(value?: string) {
  return Boolean(value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
}

function databaseCheck(value?: string) {
  if (!value) return { ok: false, detail: "Falta DATABASE_URL." };
  try {
    const url = new URL(value);
    const remoteHost = !["localhost", "127.0.0.1", "::1", "postgres"].includes(url.hostname);
    const safeCredentials = !(url.username === "noam" && url.password === "noam");
    const validProtocol = ["postgres:", "postgresql:"].includes(url.protocol);
    return {
      ok: validProtocol && remoteHost && safeCredentials,
      detail: validProtocol && remoteHost && safeCredentials ? "Postgres remoto configurado." : "Usa Postgres remoto y credenciales distintas al entorno local."
    };
  } catch {
    return { ok: false, detail: "DATABASE_URL no es una URL válida." };
  }
}

function validEncryptionKey(value?: string) {
  if (!value) return false;
  if (/^[0-9a-f]{64}$/i.test(value)) return true;
  try { return Buffer.from(value, "base64url").length === 32; } catch { return false; }
}

export function evaluateProductionReadiness(environment: ProductionEnvironment): ReadinessCheck[] {
  const database = databaseCheck(environment.DATABASE_URL);
  const notifyFrom = environment.LEAD_NOTIFY_FROM ?? "";
  const fromEmail = notifyFrom.match(/<([^>]+)>/)?.[1] ?? notifyFrom;

  return [
    { id: "site", label: "Dominio canónico", ok: environment.NEXT_PUBLIC_SITE_URL === "https://noam.pe", detail: environment.NEXT_PUBLIC_SITE_URL === "https://noam.pe" ? "noam.pe configurado con HTTPS." : "Define NEXT_PUBLIC_SITE_URL=https://noam.pe." },
    { id: "database", label: "Postgres de producción", ...database },
    { id: "database-ssl", label: "SSL de base de datos", ok: environment.NOAM_DB_SSL !== "false" && Boolean(environment.NOAM_DB_SSL), detail: environment.NOAM_DB_SSL !== "false" && environment.NOAM_DB_SSL ? "SSL requerido." : "Define NOAM_DB_SSL=true en producción." },
    { id: "auth-key", label: "Cifrado de autenticación", ok: validEncryptionKey(environment.NOAM_AUTH_ENCRYPTION_KEY), detail: validEncryptionKey(environment.NOAM_AUTH_ENCRYPTION_KEY) ? "Clave AES-256 válida." : "Define NOAM_AUTH_ENCRYPTION_KEY con 32 bytes aleatorios." },
    { id: "legacy-admin", label: "Acceso heredado", ok: environment.NOAM_ALLOW_LEGACY_ADMIN !== "true", detail: environment.NOAM_ALLOW_LEGACY_ADMIN !== "true" ? "Token compartido deshabilitado." : "Deshabilita NOAM_ALLOW_LEGACY_ADMIN en producción." },
    { id: "resend", label: "Proveedor de correo", ok: Boolean(environment.RESEND_API_KEY?.startsWith("re_") && environment.RESEND_API_KEY.length > 10), detail: environment.RESEND_API_KEY?.startsWith("re_") ? "API de correo configurada." : "Falta una RESEND_API_KEY válida." },
    { id: "notify-to", label: "Destino de oportunidades", ok: validEmail(environment.LEAD_NOTIFY_TO), detail: validEmail(environment.LEAD_NOTIFY_TO) ? "Destino de notificaciones válido." : "Define LEAD_NOTIFY_TO con un email válido." },
    { id: "notify-from", label: "Remitente verificado", ok: validEmail(fromEmail) && !fromEmail.endsWith("@resend.dev"), detail: validEmail(fromEmail) && !fromEmail.endsWith("@resend.dev") ? "Remitente propio configurado." : "Usa un remitente verificado de noam.pe, no resend.dev." }
  ];
}

export function isProductionReady(environment: ProductionEnvironment) {
  return evaluateProductionReadiness(environment).every((check) => check.ok);
}

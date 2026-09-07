type RuntimeEnvironment = Partial<
  Record<"NODE_ENV" | "DATABASE_URL" | "RESEND_API_KEY" | "LEAD_NOTIFY_FROM", string>
>;

function configured(value?: string) {
  return Boolean(value?.trim());
}

export function evaluateRuntimeCapabilities(environment: RuntimeEnvironment) {
  const localDevelopment = environment.NODE_ENV !== "production";
  const database = configured(environment.DATABASE_URL);
  const outboundEmail = configured(environment.RESEND_API_KEY) && configured(environment.LEAD_NOTIFY_FROM);

  return {
    analytics: localDevelopment || database,
    leadIntake: localDevelopment || database,
    newsletter: localDevelopment || (database && outboundEmail)
  };
}

export const runtimeCapabilities = evaluateRuntimeCapabilities(process.env);

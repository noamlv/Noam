export const env = {
  databaseUrl: process.env.DATABASE_URL,
  adminToken: process.env.NOAM_ADMIN_TOKEN,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  resendApiKey: process.env.RESEND_API_KEY,
  leadNotifyTo: process.env.LEAD_NOTIFY_TO,
  leadNotifyFrom: process.env.LEAD_NOTIFY_FROM
};

export function hasDatabaseConfig() {
  return Boolean(env.databaseUrl);
}

export function hasEmailConfig() {
  return Boolean(env.resendApiKey && env.leadNotifyTo && env.leadNotifyFrom);
}

export function hasOutboundEmailConfig() {
  return Boolean(env.resendApiKey && env.leadNotifyFrom);
}

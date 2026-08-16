export const analyticsEventNames = ["page_view", "cta_click", "resource_download", "lead_submit", "newsletter_signup"] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];

export interface AnalyticsEventInput {
  eventName: AnalyticsEventName;
  path: string;
  target?: string;
  referrer?: string;
}

export interface AnalyticsEvent extends AnalyticsEventInput {
  id: string;
  createdAt: string;
}

export interface AnalyticsSummary {
  days: number;
  totalEvents: number;
  pageViews: number;
  ctaClicks: number;
  downloads: number;
  leads: number;
  newsletterSignups: number;
  topPages: Array<{ path: string; count: number }>;
  topTargets: Array<{ target: string; count: number }>;
  topLeadSources: Array<{ path: string; count: number }>;
  topLeadInterests: Array<{ target: string; count: number }>;
  topReferrers: Array<{ referrer: string; count: number }>;
}

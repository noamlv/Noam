import type { AnalyticsEvent, AnalyticsSummary } from "../types/analytics";

const internalHosts = new Set(["noam.pe", "www.noam.pe", "localhost", "127.0.0.1"]);

function countBy(values: string[]) {
  const counts = new Map<string, number>();
  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
    .slice(0, 10);
}

function externalReferrer(value?: string) {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (internalHosts.has(url.hostname.toLowerCase())) return null;
    return url.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function summarizeAnalyticsEvents(
  events: AnalyticsEvent[],
  days: number,
  now = Date.now()
): AnalyticsSummary {
  const cutoff = now - days * 86_400_000;
  const current = events.filter((event) => +new Date(event.createdAt) >= cutoff);
  const pageViews = current.filter((event) => event.eventName === "page_view");
  const ctaClicks = current.filter((event) => event.eventName === "cta_click");
  const leads = current.filter((event) => event.eventName === "lead_submit");
  const newsletterSignups = current.filter((event) => event.eventName === "newsletter_signup");
  const topPages = countBy(pageViews.map((event) => event.path));
  const topTargets = countBy(ctaClicks.flatMap((event) => event.target ? [event.target] : []));
  const topLeadSources = countBy(leads.map((event) => event.path));
  const topLeadInterests = countBy(leads.flatMap((event) => event.target ? [event.target] : []));
  const topReferrers = countBy(pageViews.flatMap((event) => {
    const referrer = externalReferrer(event.referrer);
    return referrer ? [referrer] : [];
  }));

  return {
    days,
    totalEvents: current.length,
    pageViews: pageViews.length,
    ctaClicks: ctaClicks.length,
    downloads: current.filter((event) => event.eventName === "resource_download").length,
    leads: leads.length,
    newsletterSignups: newsletterSignups.length,
    topPages: topPages.map(({ value, count }) => ({ path: value, count })),
    topTargets: topTargets.map(({ value, count }) => ({ target: value, count })),
    topLeadSources: topLeadSources.map(({ value, count }) => ({ path: value, count })),
    topLeadInterests: topLeadInterests.map(({ value, count }) => ({ target: value, count })),
    topReferrers: topReferrers.map(({ value, count }) => ({ referrer: value, count }))
  };
}

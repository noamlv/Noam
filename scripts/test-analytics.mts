import assert from "node:assert/strict";
import { summarizeAnalyticsEvents } from "../lib/analytics-summary.ts";
import type { AnalyticsEvent } from "../types/analytics.ts";

const now = +new Date("2026-07-17T12:00:00.000Z");
const events: AnalyticsEvent[] = [
  { id: "1", eventName: "page_view", path: "/services", referrer: "https://google.com/search?q=noam", createdAt: "2026-07-16T12:00:00.000Z" },
  { id: "2", eventName: "page_view", path: "/services", referrer: "https://noam.pe/", createdAt: "2026-07-16T12:01:00.000Z" },
  { id: "3", eventName: "cta_click", path: "/services", target: "estudios-evaluacion", createdAt: "2026-07-16T12:02:00.000Z" },
  { id: "4", eventName: "resource_download", path: "/evidence", target: "brief.pdf", createdAt: "2026-07-16T12:03:00.000Z" },
  { id: "5", eventName: "lead_submit", path: "/contact", target: "estudios-evaluacion", createdAt: "2026-07-16T12:04:00.000Z" },
  { id: "6", eventName: "newsletter_signup", path: "/evidence", target: "gestion-publica", createdAt: "2026-07-16T12:05:00.000Z" },
  { id: "7", eventName: "page_view", path: "/old", referrer: "https://example.com", createdAt: "2026-05-01T12:00:00.000Z" }
];

const summary = summarizeAnalyticsEvents(events, 30, now);

assert.equal(summary.totalEvents, 6);
assert.equal(summary.pageViews, 2);
assert.equal(summary.ctaClicks, 1);
assert.equal(summary.downloads, 1);
assert.equal(summary.leads, 1);
assert.equal(summary.newsletterSignups, 1);
assert.deepEqual(summary.topPages[0], { path: "/services", count: 2 });
assert.deepEqual(summary.topLeadSources[0], { path: "/contact", count: 1 });
assert.deepEqual(summary.topLeadInterests[0], { target: "estudios-evaluacion", count: 1 });
assert.deepEqual(summary.topReferrers, [{ referrer: "google.com", count: 1 }]);

console.log("Analytics OK: agregación temporal, comercial y de referencias verificada");

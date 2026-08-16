"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { AnalyticsEventInput } from "@/types/analytics";

function privacyOptOut() {
  return navigator.doNotTrack === "1" || Boolean((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl);
}

function sendEvent(event: AnalyticsEventInput) {
  if (privacyOptOut()) return;
  const body = JSON.stringify(event);

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/events", new Blob([body], { type: "application/json" }));
    return;
  }

  void fetch("/api/events", { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true });
}

function isPublicPath(pathname: string) {
  return !pathname.startsWith("/admin") && !pathname.startsWith("/portal") && !pathname.startsWith("/api");
}

export function SiteAnalytics() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!isPublicPath(pathname)) return;
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    let referrer: string | undefined;
    try {
      referrer = document.referrer ? new URL(document.referrer).hostname : undefined;
    } catch {
      referrer = undefined;
    }

    sendEvent({ eventName: "page_view", path: pathname, referrer });
  }, [pathname]);

  useEffect(() => {
    const trackClick = (event: MouseEvent) => {
      if (!isPublicPath(pathname)) return;
      const element = event.target as Element | null;
      const trackedElement = element?.closest("[data-analytics-event]") as HTMLElement | null;
      const link = element?.closest("a[href]") as HTMLAnchorElement | null;
      if (!trackedElement && !link) return;

      const explicitEvent = trackedElement?.dataset.analyticsEvent as AnalyticsEventInput["eventName"] | undefined;
      const explicitTarget = trackedElement?.dataset.analyticsTarget;
      if (explicitEvent && !link) {
        sendEvent({ eventName: explicitEvent, path: pathname, target: explicitTarget });
        return;
      }
      if (!link) return;

      const url = new URL(link.href, window.location.origin);
      const target = explicitTarget ?? (url.origin === window.location.origin ? url.pathname : url.hostname);

      if (explicitEvent) {
        sendEvent({ eventName: explicitEvent, path: pathname, target });
      } else if (url.origin === window.location.origin && url.pathname.startsWith("/downloads/")) {
        sendEvent({ eventName: "resource_download", path: pathname, target: url.pathname });
      } else if (url.origin === window.location.origin && url.pathname === "/contact") {
        sendEvent({ eventName: "cta_click", path: pathname, target: url.pathname });
      }
    };

    document.addEventListener("click", trackClick, { capture: true });
    return () => document.removeEventListener("click", trackClick, { capture: true });
  }, [pathname]);

  return null;
}

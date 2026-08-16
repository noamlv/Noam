import fs from "node:fs/promises";
import path from "node:path";
import { getDb } from "@/lib/db";
import { summarizeAnalyticsEvents } from "@/lib/analytics-summary";
import type { AnalyticsEvent, AnalyticsEventInput, AnalyticsSummary } from "@/types/analytics";

const localDataDir = path.join(process.cwd(), ".data");
const localEventsPath = path.join(localDataDir, "analytics-events.ndjson");
const allowLocalFallback = process.env.NODE_ENV !== "production";
let databaseRetryAfter = 0;

async function appendLocalEvent(event: AnalyticsEvent) {
  await fs.mkdir(localDataDir, { recursive: true });
  await fs.appendFile(localEventsPath, `${JSON.stringify(event)}\n`, "utf8");
}

async function readLocalEvents(): Promise<AnalyticsEvent[]> {
  try {
    const raw = await fs.readFile(localEventsPath, "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .slice(-20_000)
      .map((line) => JSON.parse(line) as AnalyticsEvent);
  } catch {
    return [];
  }
}

export async function recordAnalyticsEvent(input: AnalyticsEventInput) {
  const event: AnalyticsEvent = {
    ...input,
    path: input.path.split(/[?#]/, 1)[0].slice(0, 300) || "/",
    target: input.target?.slice(0, 300),
    referrer: input.referrer?.slice(0, 180),
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  const db = getDb();

  if (db && (!allowLocalFallback || Date.now() >= databaseRetryAfter)) {
    try {
      await db`
        insert into analytics_events (id, event_name, path, target, referrer, created_at)
        values (${event.id}, ${event.eventName}, ${event.path}, ${event.target ?? null}, ${event.referrer ?? null}, ${event.createdAt})
      `;
      return true;
    } catch (error) {
      if (!allowLocalFallback) throw error;
      databaseRetryAfter = Date.now() + 60_000;
      console.warn("Postgres no disponible; usando fallback local para analítica.");
    }
  }

  if (allowLocalFallback) {
    await appendLocalEvent(event);
    return true;
  }

  return false;
}

export async function getAnalyticsSummary(days = 30): Promise<AnalyticsSummary> {
  const db = getDb();

  if (db && (!allowLocalFallback || Date.now() >= databaseRetryAfter)) {
    try {
      const rows = (await db`
        select event_name as "eventName", path, target, referrer, id, created_at as "createdAt"
        from analytics_events
        where created_at >= now() - (${days}::text || ' days')::interval
        order by created_at desc
        limit 20000
      `) as unknown as AnalyticsEvent[];
      return summarizeAnalyticsEvents(rows, days);
    } catch (error) {
      if (!allowLocalFallback) throw error;
      databaseRetryAfter = Date.now() + 60_000;
      console.warn("Postgres no disponible; leyendo analítica del fallback local.");
    }
  }

  return summarizeAnalyticsEvents(await readLocalEvents(), days);
}

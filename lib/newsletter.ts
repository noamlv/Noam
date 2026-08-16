import { createHash, randomBytes } from "node:crypto";
import { getDb } from "./db.ts";
import type { NewsletterAudienceSummary, NewsletterInterest, NewsletterSubscriber, NewsletterStatus } from "../types/newsletter.ts";
import type { NewsletterSubscriptionInput } from "./newsletter-validation.ts";

type SubscriberRow = {
  id: string;
  email: string;
  name: string | null;
  interests: NewsletterInterest[];
  status: NewsletterStatus;
  source_path: string;
  consent_at: string;
  confirmation_sent_at: string | null;
  confirmed_at: string | null;
  unsubscribed_at: string | null;
  created_at: string;
  updated_at: string;
};

function token() {
  return randomBytes(32).toString("base64url");
}

export function hashNewsletterToken(value: string) {
  return createHash("sha256").update(`noam-newsletter:${value}`).digest("hex");
}

function fromRow(row: SubscriberRow): NewsletterSubscriber {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    interests: row.interests,
    status: row.status,
    sourcePath: row.source_path,
    consentAt: row.consent_at,
    confirmationSentAt: row.confirmation_sent_at,
    confirmedAt: row.confirmed_at,
    unsubscribedAt: row.unsubscribed_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

const subscriberColumns = `
  id, email, name, interests, status, source_path, consent_at,
  confirmation_sent_at, confirmed_at, unsubscribed_at, created_at, updated_at
`;

export async function requestNewsletterSubscription(input: NewsletterSubscriptionInput) {
  const db = getDb();
  if (!db) throw new Error("Postgres es obligatorio para registrar suscripciones.");

  const [existing] = await db<{ id: string; status: NewsletterStatus }[]>`
    select id, status from newsletter_subscribers where lower(email) = lower(${input.email})
  `;
  if (existing?.status === "active") return { status: "already_active" as const };

  const confirmationToken = token();
  const unsubscribeToken = token();
  const [row] = await db<SubscriberRow[]>`
    insert into newsletter_subscribers (
      email, name, interests, status, source_path, consent_at,
      confirmation_token_hash, unsubscribe_token_hash
    ) values (
      ${input.email}, ${input.name || null}, ${input.interests}, 'pending', ${input.sourcePath}, now(),
      ${hashNewsletterToken(confirmationToken)}, ${hashNewsletterToken(unsubscribeToken)}
    )
    on conflict (lower(email)) do update set
      name = excluded.name,
      interests = excluded.interests,
      status = 'pending',
      source_path = excluded.source_path,
      consent_at = excluded.consent_at,
      confirmation_token_hash = excluded.confirmation_token_hash,
      unsubscribe_token_hash = excluded.unsubscribe_token_hash,
      confirmation_sent_at = null,
      confirmed_at = null,
      unsubscribed_at = null,
      updated_at = now()
    returning ${db.unsafe(subscriberColumns)}
  `;

  return { status: "pending" as const, subscriber: fromRow(row), confirmationToken, unsubscribeToken };
}

export async function markNewsletterConfirmationSent(id: string) {
  const db = getDb();
  if (!db) return false;
  const rows = await db`update newsletter_subscribers set confirmation_sent_at = now(), updated_at = now() where id = ${id} and status = 'pending' returning id`;
  return rows.length === 1;
}

export async function confirmNewsletterSubscription(rawToken: string) {
  const db = getDb();
  if (!db) throw new Error("Postgres es obligatorio para confirmar suscripciones.");
  const rows = await db`
    update newsletter_subscribers set
      status = 'active', confirmation_token_hash = null, confirmed_at = now(),
      unsubscribed_at = null, updated_at = now()
    where confirmation_token_hash = ${hashNewsletterToken(rawToken)} and status = 'pending'
    returning id
  `;
  return rows.length === 1;
}

export async function unsubscribeNewsletter(rawToken: string) {
  const db = getDb();
  if (!db) throw new Error("Postgres es obligatorio para procesar la baja.");
  const rows = await db`
    update newsletter_subscribers set
      status = 'unsubscribed', confirmation_token_hash = null,
      unsubscribed_at = now(), updated_at = now()
    where unsubscribe_token_hash = ${hashNewsletterToken(rawToken)} and status <> 'unsubscribed'
    returning id
  `;
  if (rows.length === 1) return true;

  const [recipient] = await db<{ id: string; subscriber_id: string | null }[]>`
    select id, subscriber_id
    from newsletter_campaign_recipients
    where unsubscribe_token_hash = ${hashNewsletterToken(rawToken)}
    limit 1
  `;
  if (!recipient?.subscriber_id) return false;

  return db.begin(async (transaction) => {
    const updated = await transaction`
      update newsletter_subscribers set
        status = 'unsubscribed', confirmation_token_hash = null,
        unsubscribed_at = now(), updated_at = now()
      where id = ${recipient.subscriber_id} and status <> 'unsubscribed'
      returning id
    `;
    if (!updated.length) return false;
    await transaction`
      update newsletter_campaign_recipients set
        delivery_status = 'unsubscribed', updated_at = now()
      where id = ${recipient.id}
    `;
    return true;
  });
}

export async function getNewsletterAudience() {
  const db = getDb();
  if (!db) return [];
  const rows = await db<SubscriberRow[]>`
    select ${db.unsafe(subscriberColumns)}
    from newsletter_subscribers
    order by updated_at desc
    limit 500
  `;
  return rows.map(fromRow);
}

export async function getNewsletterAudienceSummary(): Promise<NewsletterAudienceSummary> {
  const db = getDb();
  if (!db) {
    return {
      total: 0,
      active: 0,
      pending: 0,
      unsubscribed: 0,
      byInterest: (["gestion-publica", "electoral", "datos-ia"] as NewsletterInterest[]).map((interest) => ({ interest, count: 0 }))
    };
  }

  const [totals] = await db<{ total: number; active: number; pending: number; unsubscribed: number }[]>`
    select
      count(*)::int as total,
      count(*) filter (where status = 'active')::int as active,
      count(*) filter (where status = 'pending')::int as pending,
      count(*) filter (where status = 'unsubscribed')::int as unsubscribed
    from newsletter_subscribers
  `;
  const interestRows = await db<{ interest: NewsletterInterest; count: number }[]>`
    select selected.interest::text as interest, count(*)::int as count
    from newsletter_subscribers
    cross join lateral unnest(interests) as selected(interest)
    where status = 'active'
    group by selected.interest
  `;
  const counts = new Map(interestRows.map((row) => [row.interest, row.count]));

  return {
    total: totals?.total ?? 0,
    active: totals?.active ?? 0,
    pending: totals?.pending ?? 0,
    unsubscribed: totals?.unsubscribed ?? 0,
    byInterest: (["gestion-publica", "electoral", "datos-ia"] as NewsletterInterest[]).map((interest) => ({
      interest,
      count: counts.get(interest) ?? 0
    }))
  };
}

export async function getNewsletterSegmentCount(interests: NewsletterInterest[]) {
  const db = getDb();
  if (!db) return 0;
  const [row] = await db<{ count: number }[]>`
    select count(*)::int as count
    from newsletter_subscribers
    where status = 'active'
      and (cardinality(${interests}::text[]) = 0 or newsletter_subscribers.interests && ${interests}::text[])
  `;
  return row?.count ?? 0;
}

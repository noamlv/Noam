import { randomBytes } from "node:crypto";
import { getDb } from "./db.ts";
import { recordAdminAudit } from "./admin-identity.ts";
import { hashNewsletterToken } from "./newsletter.ts";
import type {
  NewsletterCampaign,
  NewsletterCampaignSender,
  NewsletterCampaignStatus,
  NewsletterDeliveryStatus,
  NewsletterInterest
} from "../types/newsletter.ts";
import type { NewsletterCampaignInput } from "./newsletter-campaign-validation.ts";

type CampaignRow = {
  id: string;
  slug: string;
  subject: string;
  preview_text: string;
  title: string;
  body_text: string;
  cta_label: string | null;
  cta_url: string | null;
  audience_interests: NewsletterInterest[];
  status: NewsletterCampaignStatus;
  scheduled_at: string | null;
  sending_started_at: string | null;
  sent_at: string | null;
  cancelled_at: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

type RecipientCountRow = { campaign_id: string; delivery_status: NewsletterDeliveryStatus; count: number };

const campaignColumns = `
  id, slug, subject, preview_text, title, body_text, cta_label, cta_url,
  audience_interests, status, scheduled_at, sending_started_at, sent_at,
  cancelled_at, created_by, updated_by, created_at, updated_at
`;

function emptyRecipientCounts(): Record<NewsletterDeliveryStatus, number> {
  return { queued: 0, sent: 0, failed: 0, skipped: 0, unsubscribed: 0 };
}

function fromRow(row: CampaignRow, counts = emptyRecipientCounts()): NewsletterCampaign {
  return {
    id: row.id,
    slug: row.slug,
    subject: row.subject,
    previewText: row.preview_text,
    title: row.title,
    bodyText: row.body_text,
    ctaLabel: row.cta_label,
    ctaUrl: row.cta_url,
    audienceInterests: row.audience_interests,
    status: row.status,
    scheduledAt: row.scheduled_at,
    sendingStartedAt: row.sending_started_at,
    sentAt: row.sent_at,
    cancelledAt: row.cancelled_at,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    recipientCounts: counts
  };
}

async function countsByCampaign(ids: string[]) {
  const db = getDb();
  const result = new Map<string, Record<NewsletterDeliveryStatus, number>>();
  if (!db || !ids.length) return result;
  const rows = await db<RecipientCountRow[]>`
    select campaign_id, delivery_status, count(*)::int as count
    from newsletter_campaign_recipients
    where campaign_id = any(${ids}::uuid[])
    group by campaign_id, delivery_status
  `;
  for (const row of rows) {
    const counts = result.get(row.campaign_id) ?? emptyRecipientCounts();
    counts[row.delivery_status] = row.count;
    result.set(row.campaign_id, counts);
  }
  return result;
}

export async function getNewsletterCampaigns(limit = 100): Promise<NewsletterCampaign[]> {
  const db = getDb();
  if (!db) return [];
  const rows = await db<CampaignRow[]>`
    select ${db.unsafe(campaignColumns)}
    from newsletter_campaigns
    order by updated_at desc
    limit ${Math.min(Math.max(limit, 1), 500)}
  `;
  const counts = await countsByCampaign(rows.map((row) => row.id));
  return rows.map((row) => fromRow(row, counts.get(row.id)));
}

export async function getNewsletterCampaign(id: string): Promise<NewsletterCampaign | null> {
  const db = getDb();
  if (!db) return null;
  const [row] = await db<CampaignRow[]>`
    select ${db.unsafe(campaignColumns)} from newsletter_campaigns where id = ${id}
  `;
  if (!row) return null;
  const counts = await countsByCampaign([id]);
  return fromRow(row, counts.get(id));
}

export async function createNewsletterCampaign(input: NewsletterCampaignInput, actorUserId: string) {
  const db = getDb();
  if (!db) throw new Error("Postgres es obligatorio para gestionar campañas.");
  const [row] = await db<CampaignRow[]>`
    insert into newsletter_campaigns (
      slug, subject, preview_text, title, body_text, cta_label, cta_url,
      audience_interests, created_by, updated_by
    ) values (
      ${input.slug}, ${input.subject}, ${input.previewText}, ${input.title}, ${input.bodyText},
      ${input.ctaLabel || null}, ${input.ctaUrl || null}, ${input.audienceInterests},
      ${actorUserId}, ${actorUserId}
    ) returning ${db.unsafe(campaignColumns)}
  `;
  await recordAdminAudit({ actorUserId, eventType: "newsletter.campaign.created", entityType: "newsletter_campaign", entityId: row.id, metadata: { slug: row.slug } });
  return fromRow(row);
}

export async function updateNewsletterCampaign(id: string, input: NewsletterCampaignInput, actorUserId: string) {
  const db = getDb();
  if (!db) throw new Error("Postgres es obligatorio para gestionar campañas.");
  const [row] = await db<CampaignRow[]>`
    update newsletter_campaigns set
      slug = ${input.slug}, subject = ${input.subject}, preview_text = ${input.previewText},
      title = ${input.title}, body_text = ${input.bodyText}, cta_label = ${input.ctaLabel || null},
      cta_url = ${input.ctaUrl || null}, audience_interests = ${input.audienceInterests},
      updated_by = ${actorUserId}, updated_at = now()
    where id = ${id} and status in ('draft', 'scheduled')
    returning ${db.unsafe(campaignColumns)}
  `;
  if (!row) throw new Error("La edición ya no puede modificarse.");
  await recordAdminAudit({ actorUserId, eventType: "newsletter.campaign.updated", entityType: "newsletter_campaign", entityId: id, metadata: { slug: row.slug } });
  return fromRow(row);
}

export async function scheduleNewsletterCampaign(id: string, scheduledAt: string, actorUserId: string) {
  const db = getDb();
  if (!db) throw new Error("Postgres es obligatorio para programar campañas.");
  const [row] = await db<CampaignRow[]>`
    update newsletter_campaigns set
      status = 'scheduled', scheduled_at = ${scheduledAt}, cancelled_at = null,
      updated_by = ${actorUserId}, updated_at = now()
    where id = ${id} and status in ('draft', 'scheduled')
    returning ${db.unsafe(campaignColumns)}
  `;
  if (!row) throw new Error("La edición no puede programarse en su estado actual.");
  await recordAdminAudit({ actorUserId, eventType: "newsletter.campaign.scheduled", entityType: "newsletter_campaign", entityId: id, metadata: { scheduledAt } });
  return fromRow(row);
}

export async function cancelNewsletterCampaign(id: string, actorUserId: string) {
  const db = getDb();
  if (!db) throw new Error("Postgres es obligatorio para cancelar campañas.");
  const [row] = await db<CampaignRow[]>`
    update newsletter_campaigns set
      status = 'cancelled', cancelled_at = now(), scheduled_at = null,
      updated_by = ${actorUserId}, updated_at = now()
    where id = ${id} and status in ('draft', 'scheduled')
    returning ${db.unsafe(campaignColumns)}
  `;
  if (!row) throw new Error("La edición no puede cancelarse en su estado actual.");
  await recordAdminAudit({ actorUserId, eventType: "newsletter.campaign.cancelled", entityType: "newsletter_campaign", entityId: id });
  return fromRow(row);
}

export async function dispatchNewsletterCampaign(
  id: string,
  actorUserId: string,
  sender: NewsletterCampaignSender,
  options: { dueOnly?: boolean } = {}
) {
  const db = getDb();
  if (!db) throw new Error("Postgres es obligatorio para enviar campañas.");
  const [claimed] = await db<CampaignRow[]>`
    update newsletter_campaigns set
      status = 'sending', sending_started_at = now(), updated_by = ${actorUserId}, updated_at = now()
    where id = ${id}
      and status in ('draft', 'scheduled')
      and (${options.dueOnly ?? false} = false or scheduled_at <= now())
    returning ${db.unsafe(campaignColumns)}
  `;
  if (!claimed) throw new Error("La edición no está disponible para envío.");
  const campaign = fromRow(claimed);
  const subscribers = await db<{ id: string; email: string; name: string | null }[]>`
    select id, email, name
    from newsletter_subscribers
    where status = 'active'
      and (cardinality(${campaign.audienceInterests}::text[]) = 0 or interests && ${campaign.audienceInterests}::text[])
    order by confirmed_at asc, id asc
  `;
  if (!subscribers.length) {
    await db`update newsletter_campaigns set status = 'draft', sending_started_at = null, updated_at = now() where id = ${id}`;
    throw new Error("No hay suscriptores activos en el segmento seleccionado.");
  }

  let sent = 0;
  let failed = 0;
  for (const subscriber of subscribers) {
    const unsubscribeToken = randomBytes(32).toString("base64url");
    const [recipient] = await db<{ id: string }[]>`
      insert into newsletter_campaign_recipients (
        campaign_id, subscriber_id, email, name, delivery_status, unsubscribe_token_hash
      ) values (
        ${id}, ${subscriber.id}, ${subscriber.email}, ${subscriber.name}, 'queued', ${hashNewsletterToken(unsubscribeToken)}
      ) on conflict (campaign_id, subscriber_id) where subscriber_id is not null
      do update set email = excluded.email, name = excluded.name, updated_at = now()
      returning id
    `;
    try {
      const delivery = await sender({ campaign, recipient: { email: subscriber.email, name: subscriber.name }, unsubscribeToken });
      await db`
        update newsletter_campaign_recipients set
          delivery_status = 'sent', provider_message_id = ${delivery.messageId}, error_message = null,
          sent_at = now(), updated_at = now()
        where id = ${recipient.id}
      `;
      sent += 1;
    } catch (error) {
      await db`
        update newsletter_campaign_recipients set
          delivery_status = 'failed', error_message = ${error instanceof Error ? error.message.slice(0, 1000) : "Fallo de entrega"},
          updated_at = now()
        where id = ${recipient.id}
      `;
      failed += 1;
    }
  }

  await db`update newsletter_campaigns set status = 'sent', sent_at = now(), updated_at = now() where id = ${id}`;
  await recordAdminAudit({
    actorUserId,
    eventType: "newsletter.campaign.dispatched",
    entityType: "newsletter_campaign",
    entityId: id,
    metadata: { audience: subscribers.length, sent, failed }
  });
  return { audience: subscribers.length, sent, failed };
}

export async function retryNewsletterCampaignFailures(
  id: string,
  actorUserId: string,
  sender: NewsletterCampaignSender
) {
  const db = getDb();
  if (!db) throw new Error("Postgres es obligatorio para reintentar campañas.");
  const campaign = await getNewsletterCampaign(id);
  if (!campaign || campaign.status !== "sent") throw new Error("La edición no admite reintentos.");
  const recipients = await db<{ id: string; subscriber_id: string | null; email: string; name: string | null; subscriber_status: string | null }[]>`
    select r.id, r.subscriber_id, r.email, r.name, s.status as subscriber_status
    from newsletter_campaign_recipients r
    left join newsletter_subscribers s on s.id = r.subscriber_id
    where r.campaign_id = ${id} and r.delivery_status = 'failed'
    order by r.created_at asc
  `;

  let sent = 0;
  let failed = 0;
  let skipped = 0;
  for (const recipient of recipients) {
    if (recipient.subscriber_status !== "active") {
      await db`update newsletter_campaign_recipients set delivery_status = 'skipped', updated_at = now() where id = ${recipient.id}`;
      skipped += 1;
      continue;
    }
    const unsubscribeToken = randomBytes(32).toString("base64url");
    await db`
      update newsletter_campaign_recipients set
        delivery_status = 'queued', unsubscribe_token_hash = ${hashNewsletterToken(unsubscribeToken)},
        error_message = null, updated_at = now()
      where id = ${recipient.id}
    `;
    try {
      const delivery = await sender({ campaign, recipient: { email: recipient.email, name: recipient.name }, unsubscribeToken });
      await db`
        update newsletter_campaign_recipients set
          delivery_status = 'sent', provider_message_id = ${delivery.messageId}, sent_at = now(), updated_at = now()
        where id = ${recipient.id}
      `;
      sent += 1;
    } catch (error) {
      await db`
        update newsletter_campaign_recipients set
          delivery_status = 'failed', error_message = ${error instanceof Error ? error.message.slice(0, 1000) : "Fallo de entrega"}, updated_at = now()
        where id = ${recipient.id}
      `;
      failed += 1;
    }
  }
  await recordAdminAudit({ actorUserId, eventType: "newsletter.campaign.failures_retried", entityType: "newsletter_campaign", entityId: id, metadata: { attempted: recipients.length, sent, failed, skipped } });
  return { attempted: recipients.length, sent, failed, skipped };
}

export async function getDueNewsletterCampaigns() {
  const db = getDb();
  if (!db) return [];
  const rows = await db<{ id: string }[]>`
    select id from newsletter_campaigns
    where status = 'scheduled' and scheduled_at <= now()
    order by scheduled_at asc
  `;
  return rows.map((row) => row.id);
}

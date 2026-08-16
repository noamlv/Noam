export const newsletterInterestValues = ["gestion-publica", "electoral", "datos-ia"] as const;
export type NewsletterInterest = (typeof newsletterInterestValues)[number];
export type NewsletterStatus = "pending" | "active" | "unsubscribed";
export const newsletterCampaignStatusValues = ["draft", "scheduled", "sending", "sent", "cancelled"] as const;
export type NewsletterCampaignStatus = (typeof newsletterCampaignStatusValues)[number];
export type NewsletterDeliveryStatus = "queued" | "sent" | "failed" | "skipped" | "unsubscribed";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string | null;
  interests: NewsletterInterest[];
  status: NewsletterStatus;
  sourcePath: string;
  consentAt: string;
  confirmationSentAt: string | null;
  confirmedAt: string | null;
  unsubscribedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterAudienceSummary {
  total: number;
  active: number;
  pending: number;
  unsubscribed: number;
  byInterest: Array<{ interest: NewsletterInterest; count: number }>;
}

export interface NewsletterCampaign {
  id: string;
  slug: string;
  subject: string;
  previewText: string;
  title: string;
  bodyText: string;
  ctaLabel: string | null;
  ctaUrl: string | null;
  audienceInterests: NewsletterInterest[];
  status: NewsletterCampaignStatus;
  scheduledAt: string | null;
  sendingStartedAt: string | null;
  sentAt: string | null;
  cancelledAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
  recipientCounts: Record<NewsletterDeliveryStatus, number>;
}

export interface NewsletterCampaignSendInput {
  campaign: NewsletterCampaign;
  recipient: { email: string; name: string | null };
  unsubscribeToken: string;
}

export type NewsletterCampaignSender = (
  input: NewsletterCampaignSendInput
) => Promise<{ messageId: string | null }>;

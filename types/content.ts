export const CONTENT_TYPES = ["insights", "indicators", "toolkits", "services", "cases"] as const;

export type ContentType = (typeof CONTENT_TYPES)[number];

export const TOPICS = ["gobierno", "inversion", "ia"] as const;

export type Topic = (typeof TOPICS)[number];

export interface ContentFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  topic: Topic;
  featured?: boolean;
  readingTime?: string;
  ogImage?: string;
  author?: string;
  reviewedAt?: string;
  sourceCount?: number;
  outcome?: string;
  draft?: boolean;
  caseType?: "institutional" | "product" | "demonstration";
  client?: string;
  period?: string;
  engagement?: string;
  evidence?: string;
  disclosure?: string;
  logo?: string;
  logoAlt?: string;
}

export interface ContentItem extends ContentFrontmatter {
  slug: string;
  type: ContentType;
  url: string;
}

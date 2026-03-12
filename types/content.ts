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
  outcome?: string;
  draft?: boolean;
}

export interface ContentItem extends ContentFrontmatter {
  slug: string;
  type: ContentType;
  url: string;
}

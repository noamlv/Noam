export type LeadStatus = "new" | "qualified" | "contacted" | "closed" | "archived";

export interface Lead {
  id: string;
  name: string;
  email: string;
  organization?: string | null;
  role?: string | null;
  organization_type?: string | null;
  territory?: string | null;
  interest: string;
  timeline?: string | null;
  budget_range?: string | null;
  message: string;
  source: string;
  origin_path?: string | null;
  consent_at?: string | null;
  status: LeadStatus;
  created_at: string;
}

export interface PlatformProduct {
  slug: string;
  name: string;
  category: "service" | "product" | "dashboard" | "viewer" | "demo";
  description: string;
  outcome: string;
  href: string;
  status: "live" | "prototype" | "planned";
  audience: string[];
  features: string[];
  deliverables: string[];
  demoHref?: string;
  timeline?: string;
}

export interface ManagedPlatformProduct extends PlatformProduct {
  id?: string;
  sortOrder: number;
  isPublished: boolean;
  source: "database" | "code";
  createdAt?: string;
  updatedAt?: string;
}

export type PlatformResourceKind = "dataset" | "methodology" | "toolkit" | "report" | "template" | "explorer";

export interface PlatformResource {
  slug: string;
  title: string;
  description: string;
  kind: PlatformResourceKind;
  url: string;
  productSlug?: string;
  sourceLabel?: string;
  period?: string;
  format?: string;
}

export interface ManagedPlatformResource extends PlatformResource {
  id?: string;
  sortOrder: number;
  isPublic: boolean;
  source: "database" | "code";
  createdAt?: string;
  updatedAt?: string;
}

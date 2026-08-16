export const adminRoleValues = ["owner", "editor", "analyst"] as const;
export type AdminRole = (typeof adminRoleValues)[number];
export type AdminUserStatus = "active" | "suspended";

export interface AdminPrincipal {
  userId: string | null;
  sessionId: string | null;
  email: string;
  displayName: string;
  role: AdminRole;
  authMode: "identity" | "legacy" | "development";
  mfaEnabled: boolean;
  mustChangePassword: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  role: AdminRole;
  status: AdminUserStatus;
  passwordChangedAt: string;
  lastLoginAt: string | null;
  mfaEnabledAt: string | null;
  mustChangePassword: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSession {
  id: string;
  userId: string;
  expiresAt: string;
  lastSeenAt: string;
  revokedAt: string | null;
  createdAt: string;
  current?: boolean;
}

export interface AdminAuditEvent {
  id: string;
  actorUserId: string | null;
  actorName: string | null;
  actorEmail: string | null;
  eventType: string;
  entityType: string | null;
  entityId: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

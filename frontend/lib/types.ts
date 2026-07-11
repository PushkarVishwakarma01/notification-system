export type NotificationType =
  | "member_invited"
  | "new_reply"
  | "report_ready"
  | string;

export interface Notification {
  id: string;
  tenantId: string;
  userId: string | null;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  readAt: string | null;
}

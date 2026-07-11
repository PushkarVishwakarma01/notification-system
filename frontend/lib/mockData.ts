import { Notification } from "./types";

// Exact seed data from the challenge spec. Mock mode filters this the same
// way the real backend is expected to: tenant match, plus (userId === null OR userId === caller).
export const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    tenantId: "t1",
    userId: null,
    type: "member_invited",
    title: "New team member",
    body: "Sarah joined Nova Talent",
    read: false,
    createdAt: "2026-07-01T09:00:00Z",
    readAt: null,
  },
  {
    id: "n2",
    tenantId: "t1",
    userId: "u1",
    type: "new_reply",
    title: "Creator replied",
    body: "Priya Sharma replied to your outreach message",
    read: false,
    createdAt: "2026-07-02T14:30:00Z",
    readAt: null,
  },
  {
    id: "n3",
    tenantId: "t1",
    userId: "u1",
    type: "report_ready",
    title: "Report ready",
    body: "Your July campaign report is ready to view",
    read: true,
    createdAt: "2026-06-28T08:00:00Z",
    readAt: "2026-06-28T10:00:00Z",
  },
  {
    id: "n4",
    tenantId: "t2",
    userId: null,
    type: "member_invited",
    title: "New team member",
    body: "James joined Bright Star Agency",
    read: false,
    createdAt: "2026-07-01T09:05:00Z",
    readAt: null,
  },
];

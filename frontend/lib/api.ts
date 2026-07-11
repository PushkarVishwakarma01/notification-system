import { Notification } from "./types";
import { SEED_NOTIFICATIONS } from "./mockData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || "t1";
const USER_ID = process.env.NEXT_PUBLIC_USER_ID || "u1";
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

function authHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    "X-Tenant-Id": TENANT_ID,
    "X-User-Id": USER_ID,
  };
}

// In-memory mock store so read/unread state persists across polls
// during a mock-mode session (resets on page reload).
let mockStore: Notification[] = SEED_NOTIFICATIONS.map((n) => ({ ...n }));

function visibleToCaller(n: Notification) {
  return n.tenantId === TENANT_ID && (n.userId === null || n.userId === USER_ID);
}

function sortUnreadFirstThenNewest(list: Notification[]) {
  return [...list].sort((a, b) => {
    if (a.read !== b.read) return a.read ? 1 : -1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getNotifications(): Promise<Notification[]> {
  if (USE_MOCK) {
    await delay(150);
    return sortUnreadFirstThenNewest(mockStore.filter(visibleToCaller));
  }
  const res = await fetch(`${API_URL}/notifications`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch notifications (${res.status})`);
  return res.json();
}

export async function getUnreadCount(): Promise<number> {
  if (USE_MOCK) {
    await delay(100);
    return mockStore.filter((n) => visibleToCaller(n) && !n.read).length;
  }
  const res = await fetch(`${API_URL}/notifications/unread-count`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to fetch unread count (${res.status})`);
  const data = await res.json();
  return data.count;
}

export async function markAsRead(id: string): Promise<void> {
  if (USE_MOCK) {
    await delay(80);
    mockStore = mockStore.map((n) =>
      n.id === id && visibleToCaller(n)
        ? { ...n, read: true, readAt: new Date().toISOString() }
        : n
    );
    return;
  }
  const res = await fetch(`${API_URL}/notifications/${id}/read`, {
    method: "PATCH",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to mark notification read (${res.status})`);
}

export async function markAllAsRead(): Promise<void> {
  if (USE_MOCK) {
    await delay(80);
    mockStore = mockStore.map((n) =>
      visibleToCaller(n) ? { ...n, read: true, readAt: new Date().toISOString() } : n
    );
    return;
  }
  const res = await fetch(`${API_URL}/notifications/read-all`, {
    method: "PATCH",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to mark all notifications read (${res.status})`);
}

// Used by the trigger demo screen (see app/simulate/page.tsx) to prove the
// pipeline is reusable rather than hardcoded to one call site.
export async function createNotification(payload: {
  tenantId: string;
  userId: string | null;
  type: string;
  title: string;
  body: string;
}): Promise<Notification> {
  if (USE_MOCK) {
    await delay(120);
    const created: Notification = {
      id: `n${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
      readAt: null,
      ...payload,
    };
    mockStore = [created, ...mockStore];
    return created;
  }
  const res = await fetch(`${API_URL}/notifications`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to create notification (${res.status})`);
  return res.json();
}

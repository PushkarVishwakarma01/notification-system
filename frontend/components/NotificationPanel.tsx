"use client";

import { Notification } from "@/lib/types";
import NotificationItem from "./NotificationItem";
import { Inbox, Loader2 } from "lucide-react";

interface Props {
  notifications: Notification[];
  loading: boolean;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

export default function NotificationPanel({
  notifications,
  loading,
  onMarkRead,
  onMarkAllRead,
}: Props) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      role="menu"
      className="absolute right-0 top-[calc(100%+10px)] z-50 w-[360px] origin-top-right animate-slideDown overflow-hidden rounded-lg border border-line bg-paper shadow-[0_12px_32px_-8px_rgba(11,18,16,0.18)]"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div>
          <p className="text-[13px] font-semibold text-ink">Activity log</p>
          <p className="font-mono text-[10.5px] text-muted">
            {unreadCount > 0 ? `${unreadCount} unread` : "all caught up"}
          </p>
        </div>
        <button
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          className="rounded-sm px-2 py-1 text-[11.5px] font-medium text-teal transition-colors hover:bg-teal-wash disabled:cursor-not-allowed disabled:text-muted/50 disabled:hover:bg-transparent"
        >
          Mark all read
        </button>
      </div>

      <div className="max-h-[360px] overflow-y-auto">
        {loading && notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-muted">
            <Loader2 size={18} className="animate-spin" />
            <p className="text-[12px]">Loading notifications…</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
            <Inbox size={20} className="text-muted" />
            <p className="text-[12.5px] font-medium text-ink">No notifications yet</p>
            <p className="text-[11.5px] text-muted">
              Anything happening on your deals or team will show up here.
            </p>
          </div>
        ) : (
          <ul>
            {notifications.map((n) => (
              <NotificationItem key={n.id} notification={n} onMarkRead={onMarkRead} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

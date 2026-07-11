"use client";

import { Notification } from "@/lib/types";
import { relativeTime } from "@/lib/time";
import { getTypeMeta } from "@/lib/typeMeta";

interface Props {
  notification: Notification;
  onMarkRead: (id: string) => void;
}

export default function NotificationItem({ notification, onMarkRead }: Props) {
  const { label, icon: Icon } = getTypeMeta(notification.type);
  const isUnread = !notification.read;

  return (
    <li
      className={`group relative flex gap-3 border-b border-line px-4 py-3 last:border-b-0 transition-colors ${
        isUnread ? "bg-teal-wash/60" : "bg-paper"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[3px] ${
          isUnread ? "bg-teal" : "bg-transparent"
        }`}
        aria-hidden="true"
      />

      <span
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded border ${
          isUnread ? "border-teal/30 bg-paper text-teal" : "border-line bg-mist text-muted"
        }`}
      >
        <Icon size={14} strokeWidth={2} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className={`truncate text-[13.5px] leading-snug ${isUnread ? "font-semibold text-ink" : "font-medium text-ink/80"}`}>
            {notification.title}
          </p>
          <time className="shrink-0 font-mono text-[10.5px] tracking-tight text-muted">
            {relativeTime(notification.createdAt)}
          </time>
        </div>
        <p className="mt-0.5 truncate text-[12.5px] text-muted">{notification.body}</p>

        <div className="mt-1.5 flex items-center justify-between">
          <span className="font-mono text-[9.5px] tracking-wider text-muted/80">
            {label}
          </span>
          {isUnread && (
            <button
              onClick={() => onMarkRead(notification.id)}
              className="rounded-sm px-1.5 py-0.5 text-[10.5px] font-medium text-teal opacity-0 transition-opacity hover:bg-teal-wash group-hover:opacity-100"
            >
              Mark read
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

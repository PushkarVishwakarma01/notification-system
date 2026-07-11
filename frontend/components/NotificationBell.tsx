"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { getNotifications, getUnreadCount, markAllAsRead, markAsRead } from "@/lib/api";
import { Notification } from "@/lib/types";
import NotificationPanel from "./NotificationPanel";

const POLL_INTERVAL_MS = 20_000;

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [justPulsed, setJustPulsed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const refreshCount = useCallback(async () => {
    try {
      const count = await getUnreadCount();
      setUnreadCount((prev) => {
        if (count > prev) {
          setJustPulsed(true);
          setTimeout(() => setJustPulsed(false), 1800);
        }
        return count;
      });
    } catch {
      // Network hiccup on a background poll shouldn't break the UI.
    }
  }, []);

  const loadList = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getNotifications();
      setNotifications(list);
      setUnreadCount(list.filter((n) => !n.read).length);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCount();
    const id = setInterval(refreshCount, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [refreshCount]);

  useEffect(() => {
    if (open) loadList();
  }, [open, loadList]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleMarkRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true, readAt: new Date().toISOString() } : n))
    );
    setUnreadCount((c) => Math.max(0, c - 1));
    try {
      await markAsRead(id);
    } catch {
      loadList(); // reconcile with server state if the optimistic update was wrong
    }
  }

  async function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true, readAt: new Date().toISOString() })));
    setUnreadCount(0);
    try {
      await markAllAsRead();
    } catch {
      loadList();
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={open}
        className={`relative flex h-9 w-9 items-center justify-center rounded border border-line bg-paper text-ink transition-colors hover:border-teal/40 hover:text-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/50 ${
          justPulsed ? "animate-pulseRing" : ""
        }`}
      >
        <Bell size={17} strokeWidth={2} />
        {unreadCount > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-paper bg-teal px-1 font-mono text-[9.5px] font-bold leading-none text-paper">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <NotificationPanel
          notifications={notifications}
          loading={loading}
          onMarkRead={handleMarkRead}
          onMarkAllRead={handleMarkAllRead}
        />
      )}
    </div>
  );
}

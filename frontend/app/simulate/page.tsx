"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { createNotification } from "@/lib/api";

// This page is a stand-in for the team's trigger script/endpoints. It calls the
// exact same createNotification() function the real backend would expose, so it
// proves the pipeline end-to-end without needing the backend service running yet.
export default function SimulatePage() {
  const [log, setLog] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  async function fire(kind: "invite" | "reply") {
    setBusy(true);
    try {
      if (kind === "invite") {
        await createNotification({
          tenantId: "t1",
          userId: null,
          type: "member_invited",
          title: "New team member",
          body: "Alex joined Nova Talent",
        });
        setLog((l) => [`Fired: member_invited (tenant-wide)`, ...l]);
      } else {
        await createNotification({
          tenantId: "t1",
          userId: "u1",
          type: "new_reply",
          title: "Creator replied",
          body: "Marcus Reed replied to your outreach message",
        });
        setLog((l) => [`Fired: new_reply (addressed to u1)`, ...l]);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-10">
        <p className="font-mono text-[11px] tracking-wider text-teal">SIMULATE EVENTS</p>
        <h1 className="mt-1 font-display text-2xl font-medium tracking-tight text-ink">
          Trigger a notification
        </h1>
        <p className="mt-2 text-[13.5px] text-muted">
          Open the bell in the navbar, fire an event below, then check the bell again — the
          badge and list update on the next poll (or reopen the panel for an instant refresh).
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => fire("invite")}
            disabled={busy}
            className="rounded border border-line px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-teal/40 hover:text-teal disabled:opacity-50"
          >
            Simulate: member invited
          </button>
          <button
            onClick={() => fire("reply")}
            disabled={busy}
            className="rounded border border-line px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-teal/40 hover:text-teal disabled:opacity-50"
          >
            Simulate: creator replied
          </button>
        </div>

        <div className="mt-8 rounded-lg border border-line">
          <div className="border-b border-line bg-mist px-4 py-2.5 font-mono text-[10.5px] tracking-wider text-muted">
            EVENT LOG
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {log.length === 0 ? (
              <li className="px-4 py-6 text-center text-[12.5px] text-muted">
                Nothing fired yet.
              </li>
            ) : (
              log.map((entry, i) => (
                <li
                  key={i}
                  className="border-b border-line px-4 py-2.5 font-mono text-[12px] text-ink last:border-b-0"
                >
                  {entry}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}

import Navbar from "@/components/Navbar";

const DEALS = [
  { creator: "Priya Sharma", stage: "Negotiation", value: "$4,200", updated: "2h ago" },
  { creator: "Marcus Reed", stage: "Outreach sent", value: "$1,800", updated: "1d ago" },
  { creator: "Aiko Tanaka", stage: "Contract signed", value: "$6,500", updated: "3d ago" },
  { creator: "Diego Alvarez", stage: "Outreach sent", value: "$2,100", updated: "5d ago" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-wider text-teal">DASHBOARD</p>
            <h1 className="mt-1 font-display text-2xl font-medium tracking-tight text-ink">
              Good to see you back.
            </h1>
            <p className="mt-1 text-[13.5px] text-muted">
              Here&apos;s what&apos;s moving across your active deals this week.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Active deals" value="12" />
          <StatCard label="Awaiting reply" value="4" />
          <StatCard label="Signed this month" value="7" />
        </div>

        <section className="mt-8 overflow-hidden rounded-lg border border-line">
          <div className="border-b border-line bg-mist px-5 py-3">
            <p className="font-display text-[13.5px] font-medium text-ink">Pipeline</p>
          </div>
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-line text-muted">
                <th className="px-5 py-2.5 font-mono text-[10.5px] font-medium tracking-wider">CREATOR</th>
                <th className="px-5 py-2.5 font-mono text-[10.5px] font-medium tracking-wider">STAGE</th>
                <th className="px-5 py-2.5 font-mono text-[10.5px] font-medium tracking-wider">VALUE</th>
                <th className="px-5 py-2.5 font-mono text-[10.5px] font-medium tracking-wider">UPDATED</th>
              </tr>
            </thead>
            <tbody>
              {DEALS.map((d) => (
                <tr key={d.creator} className="border-b border-line last:border-b-0 hover:bg-mist/60">
                  <td className="px-5 py-3 font-medium text-ink">{d.creator}</td>
                  <td className="px-5 py-3 text-muted">{d.stage}</td>
                  <td className="px-5 py-3 font-mono text-ink">{d.value}</td>
                  <td className="px-5 py-3 font-mono text-muted">{d.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <p className="mt-6 text-[12px] text-muted">
          This dashboard content is placeholder — the real product screen isn&apos;t part of this
          scope. It exists so the notification bell in the navbar sits in context instead of
          floating in isolation.
        </p>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line px-5 py-4">
      <p className="font-mono text-[10.5px] tracking-wider text-muted">{label.toUpperCase()}</p>
      <p className="mt-1 font-display text-2xl font-medium text-ink">{value}</p>
    </div>
  );
}

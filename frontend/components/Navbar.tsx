import NotificationBell from "./NotificationBell";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-ink font-display text-[13px] font-bold text-paper">
            N
          </div>
          <span className="font-display text-[15px] font-medium tracking-tight text-ink">
            Nova Talent
          </span>
          <span className="ml-1 hidden rounded-sm border border-line px-1.5 py-0.5 font-mono text-[9.5px] text-muted sm:inline">
            t1 · u1
          </span>
        </div>

        <nav className="hidden items-center gap-6 font-body text-[13px] text-muted md:flex">
          <span className="cursor-default text-ink">Deals</span>
          <span className="cursor-default hover:text-ink">Creators</span>
          <span className="cursor-default hover:text-ink">Reports</span>
        </nav>

        <div className="flex items-center gap-3">
          <NotificationBell />
          <div className="h-8 w-8 rounded-full bg-teal-wash" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}

"use client";

import { Bell, Search } from "lucide-react";

export function DashboardTopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-white/90 px-4 backdrop-blur-xl lg:px-6">
      <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-surface/50 px-3 py-1.5 max-w-md">
        <Search className="h-3.5 w-3.5 shrink-0 text-muted" />
        <input
          type="search"
          placeholder="Search loads, trucks, drivers..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="relative rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-secondary-dark">
          OP
        </div>
      </div>
    </header>
  );
}

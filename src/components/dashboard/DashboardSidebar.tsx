"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  History,
  LayoutDashboard,
  MapPin,
  Phone,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Active Loads", href: "/dashboard/loads", icon: MapPin },
  { label: "Alerts", href: "/dashboard/alerts", icon: Bell },
  { label: "Call Logs", href: "/dashboard/calls", icon: Phone },
  { label: "Load History", href: "/dashboard/history", icon: History },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-white md:flex">
      <div className="border-b border-border px-4 py-4">
        <Logo href="/dashboard" className="scale-95 origin-left" />
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
          Operations Center
        </p>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent-soft text-secondary-dark shadow-sm"
                  : "text-muted hover:bg-surface hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive && "text-secondary-dark")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary-dark px-3 py-2.5 text-xs font-semibold text-white shadow-md shadow-secondary/20 transition-colors hover:bg-secondary"
        >
          <Zap className="h-3.5 w-3.5" />
          Run ZONIK INITIAL
        </button>
        <Link
          href="/"
          className="mt-2 block rounded-lg px-3 py-2 text-center text-xs font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
        >
          ← Back to website
        </Link>
      </div>
    </aside>
  );
}

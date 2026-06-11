"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, History, LayoutDashboard, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Loads", href: "/dashboard/loads", icon: MapPin },
  { label: "Alerts", href: "/dashboard/alerts", icon: Bell },
  { label: "Calls", href: "/dashboard/calls", icon: Phone },
  { label: "History", href: "/dashboard/history", icon: History },
];

export function DashboardMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-border bg-white px-2 py-2 md:hidden">
      {items.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-medium",
              isActive ? "text-secondary-dark" : "text-muted"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

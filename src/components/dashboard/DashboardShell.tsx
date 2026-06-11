"use client";

import { DashboardMobileNav } from "./DashboardMobileNav";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopBar } from "./DashboardTopBar";
import { DashboardPanelProvider } from "./DashboardPanelContext";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <DashboardPanelProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopBar />
          <div className="flex-1 overflow-auto pb-16 md:pb-0">{children}</div>
        </div>
      </div>
      <DashboardMobileNav />
    </DashboardPanelProvider>
  );
}

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardPageShell } from "@/components/dashboard/DashboardPageShell";
import { KpiGrid } from "@/components/dashboard/KpiGrid";
import { AttentionQueue } from "@/components/dashboard/AttentionQueue";
import {
  GpsHealthOverview,
  UpcomingCriticalStops,
} from "@/components/dashboard/DashboardSections";

export default function DashboardOverviewPage() {
  return (
    <DashboardPageShell>
      <DashboardHeader />
      <KpiGrid />
      <AttentionQueue />
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <UpcomingCriticalStops />
        </div>
        <div className="lg:col-span-1">
          <GpsHealthOverview />
        </div>
      </div>
    </DashboardPageShell>
  );
}

import { DashboardPageShell } from "@/components/dashboard/DashboardPageShell";
import { ActiveLoadsTable } from "@/components/dashboard/ActiveLoadsTable";

export default function ActiveLoadsPage() {
  return (
    <DashboardPageShell
      title="Active Loads"
      subtitle="All loads currently monitored by Zonik AI — filter, search, and review status."
    >
      <ActiveLoadsTable />
    </DashboardPageShell>
  );
}

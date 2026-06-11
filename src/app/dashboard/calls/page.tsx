import { DashboardPageShell } from "@/components/dashboard/DashboardPageShell";
import { RecentCallLogs } from "@/components/dashboard/DashboardSections";

export default function CallLogsPage() {
  return (
    <DashboardPageShell
      title="Call Logs"
      subtitle="Automated AI voice agent calls to drivers — outcomes and summaries."
    >
      <RecentCallLogs />
    </DashboardPageShell>
  );
}

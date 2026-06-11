import { DashboardPageShell } from "@/components/dashboard/DashboardPageShell";
import {
  RecentAiActions,
  ShiftHandoffSummary,
} from "@/components/dashboard/DashboardSections";

export default function LoadHistoryPage() {
  return (
    <DashboardPageShell
      title="Load History & Handoff"
      subtitle="Shift summary, AI automation log, and handoff notes for the next operator."
    >
      <ShiftHandoffSummary />
      <RecentAiActions />
    </DashboardPageShell>
  );
}

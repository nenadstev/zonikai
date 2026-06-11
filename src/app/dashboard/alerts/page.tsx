import { AlertsList } from "@/components/dashboard/AlertsList";
import { DashboardPageShell } from "@/components/dashboard/DashboardPageShell";

export default function AlertsPage() {
  return (
    <DashboardPageShell title="Alerts" subtitle="Open and resolved system alerts">
      <AlertsList />
    </DashboardPageShell>
  );
}

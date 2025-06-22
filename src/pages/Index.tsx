
import DashboardOverview from "@/components/DashboardOverview";

const Index = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground">
          Centralized dashboard for contract tracking, compliance, and audit readiness.
        </p>
      </div>
      <DashboardOverview />
    </div>
  );
};

export default Index;

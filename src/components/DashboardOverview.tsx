
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bell } from "lucide-react";

const DashboardOverview = () => {
  const alerts = [
    { type: "Critical", count: 12, message: "expiring documents this month", color: "destructive" },
    { type: "Warning", count: 5, message: "crew due for medical renewal", color: "secondary" },
    { type: "Info", count: 7, message: "pending evaluations", color: "default" },
    { type: "Warning", count: 3, message: "embarkation delays flagged", color: "secondary" },
  ];

  const crewMovements = [
    { vessel: "M/V Southern Cross", rank: "AB", etd: "Jul 2", crewName: "J. Santos", status: "Confirmed", statusColor: "default" },
    { vessel: "M/V Cool Emerald", rank: "OLR", etd: "Jun 28", crewName: "M. Rivera", status: "Pending Med", statusColor: "secondary" },
    { vessel: "M/V Nord Sunda", rank: "BSN", etd: "Jul 5", crewName: "D. Corpuz", status: "Docs Expired", statusColor: "destructive" },
  ];

  const kpiData = [
    { label: "Crew Onboard", value: 82, color: "bg-blue-500" },
    { label: "Docs Validity", value: 65, color: "bg-yellow-500" },
    { label: "Med Validity", value: 90, color: "bg-green-500" },
    { label: "Vessel Coverage", value: 70, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-4">
      {/* Alerts & Warnings Section */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-3">
          <Bell className="h-4 w-4" />
          <CardTitle className="text-lg">Alerts & Warnings</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg border">
                <div className="flex items-center gap-2">
                  <Badge variant={alert.color as any} className="text-xs">
                    {alert.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    <strong>{alert.count}</strong> {alert.message}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Crew Movement Overview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">📊 Crew Movement Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {crewMovements.map((movement, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 flex-1 text-sm">
                    <div>
                      <div className="text-xs font-medium text-muted-foreground">Vessel</div>
                      <div className="font-semibold text-sm">{movement.vessel}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground">Rank/ETD</div>
                      <div className="font-semibold text-sm">{movement.rank} - {movement.etd}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground">Crew/Status</div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{movement.crewName}</span>
                        <Badge variant={movement.statusColor as any} className="text-xs">{movement.status}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary Charts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">📈 Summary Charts</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {kpiData.map((kpi, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{kpi.label}</span>
                    <span className="text-sm font-bold">{kpi.value}%</span>
                  </div>
                  <Progress value={kpi.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;

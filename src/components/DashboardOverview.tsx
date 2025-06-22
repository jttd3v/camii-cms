
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Bell, Search, FileText, Calendar, BarChart3, RotateCcw, BookOpen, Menu } from "lucide-react";

const DashboardOverview = () => {
  const [selectedCrewId, setSelectedCrewId] = useState<string | null>(null);

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

  const quickAccessItems = [
    { icon: Search, label: "Search Crew" },
    { icon: FileText, label: "Contract Management (SEA, CBA, Extensions etc.)" },
    { icon: Calendar, label: "Monthly Crew Health Monitoring Report" },
    { icon: BarChart3, label: "Crew Performance (Promotion, Loyalty)" },
    { icon: RotateCcw, label: "Crew Change" },
    { icon: BarChart3, label: "KPI Reports" },
    { icon: BookOpen, label: "CAMII QMS Procedures" },
  ];

  const kpiData = [
    { label: "Crew Onboard", value: 82, color: "bg-blue-500" },
    { label: "Docs Validity", value: 65, color: "bg-yellow-500" },
    { label: "Med Validity", value: 90, color: "bg-green-500" },
    { label: "Vessel Coverage", value: 70, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Alerts & Warnings Section */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Bell className="h-5 w-5" />
          <CardTitle>Alerts & Warnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Badge variant={alert.color as any} className="font-semibold">
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

      {/* Crew Movement Overview */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Crew Movement Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {crewMovements.map((movement, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-1">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Vessel</div>
                    <div className="font-semibold">{movement.vessel}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Rank</div>
                    <div className="font-semibold">{movement.rank}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">ETD</div>
                    <div className="font-semibold">{movement.etd}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Crew Name</div>
                    <div className="font-semibold">{movement.crewName}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Status</div>
                    <Badge variant={movement.statusColor as any}>{movement.status}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Access */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>🚀 Quick Access</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                {quickAccessItems.map((item, index) => (
                  <DropdownMenuItem key={index} className="flex items-center gap-3 p-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Click the menu icon above to access all quick actions and tools.
            </div>
          </CardContent>
        </Card>

        {/* Summary Charts */}
        <Card>
          <CardHeader>
            <CardTitle>📈 Summary Charts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {kpiData.map((kpi, index) => (
                <div key={index} className="space-y-2">
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

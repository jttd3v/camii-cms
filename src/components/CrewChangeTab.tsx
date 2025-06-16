import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Calendar, Clock, Users, Plus, Printer } from "lucide-react";
import CrewChangeUpcoming from "./CrewChangeUpcoming";
import CrewChangeActive from "./CrewChangeActive";
import CrewChangeHistory from "./CrewChangeHistory";
import CrewChangeCompliance from "./CrewChangeCompliance";
import AddCrewChangeModal from "./AddCrewChangeModal";
import CrewChangePrintDialog from "./CrewChangePrintDialog";

// Mock data for KPIs
const mockKPIs = {
  upcoming7Days: 8,
  upcoming30Days: 23,
  activeInProgress: 5,
  overdueActions: 2
};

// Mock data for active crew changes
const mockActiveChanges = [
  {
    id: "CC-2024-001",
    vesselName: "MV Pacific Star",
    proposedDate: "2024-06-20",
    status: "In Progress",
    statusColor: "bg-yellow-500"
  },
  {
    id: "CC-2024-002", 
    vesselName: "MV Ocean Explorer",
    proposedDate: "2024-06-18",
    status: "Completed",
    statusColor: "bg-green-500"
  },
  {
    id: "CC-2024-003",
    vesselName: "MV Atlantic Voyager",
    proposedDate: "2024-06-15",
    status: "Overdue",
    statusColor: "bg-red-500"
  },
  {
    id: "CC-2024-004",
    vesselName: "MV Global Trader",
    proposedDate: "2024-06-22",
    status: "Planned",
    statusColor: "bg-blue-500"
  },
  {
    id: "CC-2024-005",
    vesselName: "MV Cebu Express",
    proposedDate: "2024-06-25",
    status: "In Progress",
    statusColor: "bg-yellow-500"
  }
];

const CrewChangeTab = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const [selectedCrewChange, setSelectedCrewChange] = useState(null);

  const handlePrintItinerary = (crewChange: any) => {
    setSelectedCrewChange(crewChange);
    setShowPrintDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next 7 Days</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockKPIs.upcoming7Days}</div>
            <p className="text-xs text-muted-foreground">Upcoming changes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next 30 Days</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockKPIs.upcoming30Days}</div>
            <p className="text-xs text-muted-foreground">Upcoming changes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Changes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockKPIs.activeInProgress}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Actions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{mockKPIs.overdueActions}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* My Active Crew Changes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>My Active Crew Changes</CardTitle>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Crew Change
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockActiveChanges.map((change) => (
              <div key={change.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  <div className="font-medium">{change.id}</div>
                  <div className="text-sm text-muted-foreground">{change.vesselName}</div>
                  <div className="text-sm">{change.proposedDate}</div>
                  <Badge className={`${change.statusColor} text-white`}>
                    {change.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handlePrintItinerary(change)}>
                    <Printer className="h-3 w-3 mr-1" />
                    Print Itinerary
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Alerts Snippet */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <AlertTriangle className="h-5 w-5" />
            Compliance Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-orange-700">
            <p>• 2 Seafarers with expiring visas (&lt; 30 days)</p>
            <p>• 1 Medical certificate expiring this week</p>
            <p>• 3 Pending document uploads for upcoming changes</p>
          </div>
          <Button variant="outline" size="sm" className="mt-3 border-orange-300 text-orange-700 hover:bg-orange-100">
            View Full Compliance Report
          </Button>
        </CardContent>
      </Card>

      {/* Sub-tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">Upcoming & Planned</TabsTrigger>
          <TabsTrigger value="active">Active & In Progress</TabsTrigger>
          <TabsTrigger value="history">History & Completed</TabsTrigger>
          <TabsTrigger value="compliance">Compliance & Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <CrewChangeUpcoming />
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <CrewChangeActive />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <CrewChangeHistory />
        </TabsContent>

        <TabsContent value="compliance" className="mt-6">
          <CrewChangeCompliance />
        </TabsContent>
      </Tabs>

      {/* Add Crew Change Modal */}
      <AddCrewChangeModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal} 
      />

      {/* Print Dialog */}
      <CrewChangePrintDialog
        open={showPrintDialog}
        onOpenChange={setShowPrintDialog}
        crewChangeData={selectedCrewChange}
      />
    </div>
  );
};

export default CrewChangeTab;

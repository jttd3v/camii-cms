
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CustomizableTable, { ColumnConfig } from "./CustomizableTable";
import { Search, RefreshCw } from "lucide-react";

// Mock data for active crew changes
const mockActiveData = [
  {
    id: "CC-2024-001",
    vessel: "MV Pacific Star",
    onSigner: "Juan Dela Cruz",
    onSignerRank: "Chief Engineer",
    offSigner: "Pedro Santos", 
    offSignerRank: "Chief Engineer",
    currentStatus: "In Transit",
    actualDeparture: "2024-06-18",
    expectedArrival: "2024-06-20",
    port: "Manila"
  },
  {
    id: "CC-2024-002",
    vessel: "MV Ocean Explorer", 
    onSigner: "Maria Garcia",
    onSignerRank: "2nd Officer",
    offSigner: "Carlos Reyes",
    offSignerRank: "2nd Officer",
    currentStatus: "Arrived Port",
    actualDeparture: "2024-06-17",
    expectedArrival: "2024-06-18",
    port: "Cebu"
  },
  {
    id: "CC-2024-005",
    vessel: "MV Cebu Express",
    onSigner: "Roberto Cruz", 
    onSignerRank: "Bosun",
    offSigner: "Miguel Torres",
    offSignerRank: "Bosun", 
    currentStatus: "Departed Home",
    actualDeparture: "2024-06-19",
    expectedArrival: "2024-06-25",
    port: "Davao"
  }
];

const CrewChangeActive = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const columns: ColumnConfig[] = [
    {
      key: "id",
      label: "Crew Change ID",
      visible: true,
      sortable: true,
      minWidth: 120
    },
    {
      key: "vessel",
      label: "Vessel", 
      visible: true,
      sortable: true,
      minWidth: 150
    },
    {
      key: "onSigner",
      label: "On-Signer",
      visible: true,
      sortable: true,
      minWidth: 200,
      render: (value, row) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.onSignerRank}</div>
        </div>
      )
    },
    {
      key: "currentStatus",
      label: "Current Status",
      visible: true,
      sortable: true,
      minWidth: 150,
      render: (value) => {
        const statusColors = {
          "Departed Home": "bg-blue-500",
          "In Transit": "bg-yellow-500",
          "Arrived Port": "bg-green-500",
          "Onboard Vessel": "bg-purple-500"
        };
        return (
          <Badge className={`${statusColors[value as keyof typeof statusColors]} text-white`}>
            {value}
          </Badge>
        );
      }
    },
    {
      key: "actualDeparture",
      label: "Actual Departure",
      visible: true,
      sortable: true,
      minWidth: 130
    },
    {
      key: "expectedArrival", 
      label: "Expected Arrival",
      visible: true,
      sortable: true,
      minWidth: 130
    },
    {
      key: "port",
      label: "Port",
      visible: true,
      sortable: true,
      minWidth: 100
    },
    {
      key: "actions",
      label: "Quick Actions",
      visible: true,
      sortable: false,
      minWidth: 150,
      render: () => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-3 w-3 mr-1" />
            Update Status
          </Button>
        </div>
      )
    }
  ];

  const [tableColumns, setTableColumns] = useState(columns);

  // Filter data based on search
  const filteredData = mockActiveData.filter(item => {
    return searchTerm === "" || 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vessel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.onSigner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.currentStatus.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active & In Progress Crew Changes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="flex items-center space-x-2 max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by ID, vessel, seafarer, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <CustomizableTable
          data={filteredData}
          columns={tableColumns}
          onColumnsChange={setTableColumns}
          emptyMessage="No active crew changes found."
        />
      </CardContent>
    </Card>
  );
};

export default CrewChangeActive;

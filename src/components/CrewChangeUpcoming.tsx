
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import CustomizableTable, { ColumnConfig } from "./CustomizableTable";
import { Search, Filter, Plus, Eye, Edit, Check } from "lucide-react";

// Mock data for upcoming crew changes
const mockUpcomingData = [
  {
    id: "CC-2024-006",
    vessel: "MV Pacific Star",
    onSigner: "Juan Dela Cruz",
    onSignerRank: "Chief Engineer",
    offSigner: "Pedro Santos",
    offSignerRank: "Chief Engineer", 
    plannedDate: "2024-06-25",
    port: "Manila",
    status: "Planned"
  },
  {
    id: "CC-2024-007",
    vessel: "MV Ocean Explorer",
    onSigner: "Maria Garcia",
    onSignerRank: "2nd Officer",
    offSigner: "Carlos Reyes",
    offSignerRank: "2nd Officer",
    plannedDate: "2024-06-28",
    port: "Cebu",
    status: "Approved"
  },
  {
    id: "CC-2024-008",
    vessel: "MV Atlantic Voyager", 
    onSigner: "Roberto Cruz",
    onSignerRank: "Bosun",
    offSigner: "Miguel Torres",
    offSignerRank: "Bosun",
    plannedDate: "2024-07-02",
    port: "Davao",
    status: "Travel Arranged"
  }
];

const CrewChangeUpcoming = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [vesselFilter, setVesselFilter] = useState("all");

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
      key: "offSigner",
      label: "Off-Signer", 
      visible: true,
      sortable: true,
      minWidth: 200,
      render: (value, row) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.offSignerRank}</div>
        </div>
      )
    },
    {
      key: "plannedDate",
      label: "Planned Date",
      visible: true,
      sortable: true,
      minWidth: 120
    },
    {
      key: "port",
      label: "Port",
      visible: true,
      sortable: true,
      minWidth: 100
    },
    {
      key: "status",
      label: "Status",
      visible: true,
      sortable: true,
      minWidth: 120,
      render: (value) => {
        const statusColors = {
          "Planned": "bg-blue-500",
          "Approved": "bg-green-500", 
          "Travel Arranged": "bg-purple-500"
        };
        return (
          <Badge className={`${statusColors[value as keyof typeof statusColors]} text-white`}>
            {value}
          </Badge>
        );
      }
    },
    {
      key: "actions",
      label: "Actions",
      visible: true,
      sortable: false,
      minWidth: 200,
      render: () => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Check className="h-3 w-3 mr-1" />
            Approve
          </Button>
        </div>
      )
    }
  ];

  const [tableColumns, setTableColumns] = useState(columns);

  // Filter data based on search and filters
  const filteredData = mockUpcomingData.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vessel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.onSigner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.offSigner.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesVessel = vesselFilter === "all" || item.vessel === vesselFilter;

    return matchesSearch && matchesStatus && matchesVessel;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Upcoming & Planned Crew Changes</CardTitle>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Crew Change
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2 flex-1 min-w-[200px]">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, vessel, or seafarer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
          
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="7days">Next 7 Days</SelectItem>
              <SelectItem value="30days">Next 30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Planned">Planned</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Travel Arranged">Travel Arranged</SelectItem>
            </SelectContent>
          </Select>

          <Select value={vesselFilter} onValueChange={setVesselFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Vessel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vessels</SelectItem>
              <SelectItem value="MV Pacific Star">MV Pacific Star</SelectItem>
              <SelectItem value="MV Ocean Explorer">MV Ocean Explorer</SelectItem>
              <SelectItem value="MV Atlantic Voyager">MV Atlantic Voyager</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <CustomizableTable
          data={filteredData}
          columns={tableColumns}
          onColumnsChange={setTableColumns}
          emptyMessage="No upcoming crew changes found."
        />
      </CardContent>
    </Card>
  );
};

export default CrewChangeUpcoming;

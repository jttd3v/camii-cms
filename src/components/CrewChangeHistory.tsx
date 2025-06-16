
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import CustomizableTable, { ColumnConfig } from "./CustomizableTable";
import { Search, Download, Calendar } from "lucide-react";

// Mock data for completed crew changes
const mockHistoryData = [
  {
    id: "CC-2024-001",
    vessel: "MV Pacific Star",
    onSigner: "Juan Dela Cruz",
    onSignerRank: "Chief Engineer", 
    offSigner: "Pedro Santos",
    offSignerRank: "Chief Engineer",
    completedDate: "2024-06-15",
    port: "Manila",
    status: "Completed",
    duration: "3 days"
  },
  {
    id: "CC-2024-002",
    vessel: "MV Ocean Explorer",
    onSigner: "Maria Garcia", 
    onSignerRank: "2nd Officer",
    offSigner: "Carlos Reyes",
    offSignerRank: "2nd Officer",
    completedDate: "2024-06-10",
    port: "Cebu", 
    status: "Completed",
    duration: "2 days"
  },
  {
    id: "CC-2024-003",
    vessel: "MV Atlantic Voyager",
    onSigner: "Roberto Cruz",
    onSignerRank: "Bosun",
    offSigner: "Miguel Torres", 
    offSignerRank: "Bosun",
    completedDate: "2024-06-05",
    port: "Davao",
    status: "Cancelled",
    duration: "N/A"
  }
];

const CrewChangeHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [vesselFilter, setVesselFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

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
      key: "completedDate",
      label: "Completed Date",
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
      key: "status",
      label: "Status",
      visible: true,
      sortable: true,
      minWidth: 120,
      render: (value) => {
        const statusColors = {
          "Completed": "bg-green-500",
          "Cancelled": "bg-red-500"
        };
        return (
          <Badge className={`${statusColors[value as keyof typeof statusColors]} text-white`}>
            {value}
          </Badge>
        );
      }
    },
    {
      key: "duration",
      label: "Duration",
      visible: true,
      sortable: true,
      minWidth: 100
    }
  ];

  const [tableColumns, setTableColumns] = useState(columns);

  // Filter data based on search and filters
  const filteredData = mockHistoryData.filter(item => {
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
          <CardTitle>History & Completed Crew Changes</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
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
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last90days">Last 90 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
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
          emptyMessage="No completed crew changes found."
        />
      </CardContent>
    </Card>
  );
};

export default CrewChangeHistory;

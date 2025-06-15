
import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Label } from "@/components/ui/label";

// Demo data, mirrors contract summary from ContractTable/CrewCard
const contracts = [
  {
    id: "c001",
    crewName: "Antonio Reyes",
    vessel: "MV Horizon",
    rank: "Chief Engineer",
    signOn: "2024-03-01",
    signOff: "2025-01-10",
    status: "EXTENDED",
    compliance: "WARNING",
    extensionReason: "Trade route delay",
  },
  {
    id: "c002",
    crewName: "Julia Tan",
    vessel: "MV Liberty",
    rank: "Captain",
    signOn: "2023-08-15",
    signOff: "2024-07-01",
    status: "ACTIVE",
    compliance: "OK",
  },
  {
    id: "c003",
    crewName: "Gleb Ivanov",
    vessel: "MT Aurora",
    rank: "AB",
    signOn: "2022-12-01",
    signOff: "2023-11-28",
    status: "OVERDUE",
    compliance: "VIOLATION",
  },
  {
    id: "c004",
    crewName: "Jorge Cruz",
    vessel: "MV Pacific",
    rank: "CO",
    signOn: "2024-01-20",
    signOff: "2024-07-19",
    status: "EXPIRED",
    compliance: "VIOLATION",
  },
];

// Only show seafarers who are currently onboard, i.e., status is ACTIVE or EXTENDED
const baseOnboardContracts = contracts.filter(
  (c) => c.status === "ACTIVE" || c.status === "EXTENDED"
);

function statusBadge(status: string) {
  switch (status) {
    case "ACTIVE":
      return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 px-2 py-0.5">{status}</Badge>;
    case "EXTENDED":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200 px-2 py-0.5">{status}</Badge>;
    default:
      return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200 px-2 py-0.5">{status}</Badge>;
  }
}

function complianceBadge(compliance: string) {
  switch (compliance) {
    case "OK":
      return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 px-2 py-0.5">{compliance}</Badge>;
    case "WARNING":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200 px-2 py-0.5">{compliance}</Badge>;
    default:
      return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200 px-2 py-0.5">{compliance}</Badge>;
  }
}

export default function OnboardSeafarersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    rank: "",
    vessel: "",
    status: "",
  });

  const uniqueRanks = useMemo(() => [...new Set(baseOnboardContracts.map((c) => c.rank))], []);
  const uniqueVessels = useMemo(() => [...new Set(baseOnboardContracts.map((c) => c.vessel))], []);
  const uniqueStatuses = useMemo(() => [...new Set(baseOnboardContracts.map((c) => c.status))], []);

  const filteredData = useMemo(() => {
    return baseOnboardContracts.filter((c) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        c.crewName.toLowerCase().includes(searchLower) ||
        c.rank.toLowerCase().includes(searchLower) ||
        c.vessel.toLowerCase().includes(searchLower);

      const matchesFilters =
        (filters.rank ? c.rank === filters.rank : true) &&
        (filters.vessel ? c.vessel === filters.vessel : true) &&
        (filters.status ? c.status === filters.status : true);
      
      return matchesSearch && matchesFilters;
    });
  }, [searchTerm, filters]);

  const handleFilterChange = (filterType: 'rank' | 'vessel' | 'status', value: string) => {
    setFilters(prev => ({...prev, [filterType]: value === 'all' ? '' : value }));
  };
  
  const clearFilters = () => {
      setFilters({ rank: "", vessel: "", status: "" });
  };

  return (
    <section className="px-2 sm:px-4">
      <h2 className="font-semibold text-lg sm:text-xl mb-1 mt-2">Seafarers Currently Onboard</h2>
      
      <div className="flex items-center justify-between gap-4 py-4">
        <Input
          placeholder="Search by name, rank, or vessel..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="ml-auto text-orange-500 border-orange-500 hover:text-orange-600 hover:border-orange-600 focus-visible:ring-orange-500">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="font-medium leading-none">Filter Results</h4>
                <p className="text-sm text-muted-foreground">
                  Refine the list of seafarers.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Rank</Label>
                <Select value={filters.rank} onValueChange={(value) => handleFilterChange('rank', value)}>
                  <SelectTrigger><SelectValue placeholder="All Ranks" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ranks</SelectItem>
                    {uniqueRanks.map(rank => <SelectItem key={rank} value={rank}>{rank}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Vessel</Label>
                <Select value={filters.vessel} onValueChange={(value) => handleFilterChange('vessel', value)}>
                  <SelectTrigger><SelectValue placeholder="All Vessels" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vessels</SelectItem>
                    {uniqueVessels.map(vessel => <SelectItem key={vessel} value={vessel}>{vessel}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                  <SelectTrigger><SelectValue placeholder="All Statuses" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {uniqueStatuses.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="ghost" onClick={clearFilters} className="w-full justify-center">Clear Filters</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="rounded-lg border shadow bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="h-10">
              <TableHead className="px-3 py-2">Name</TableHead>
              <TableHead className="px-3 py-2">Rank</TableHead>
              <TableHead className="px-3 py-2">Vessel</TableHead>
              <TableHead className="px-3 py-2">Sign On</TableHead>
              <TableHead className="px-3 py-2">Sign Off</TableHead>
              <TableHead className="px-3 py-2">Status</TableHead>
              <TableHead className="px-3 py-2">Compliance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-5 text-muted-foreground">
                  No seafarers found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((c) => (
                <TableRow key={c.id} className="h-10 hover:bg-muted/40">
                  <TableCell className="px-3 py-2">{c.crewName}</TableCell>
                  <TableCell className="px-3 py-2">{c.rank}</TableCell>
                  <TableCell className="px-3 py-2">{c.vessel}</TableCell>
                  <TableCell className="px-3 py-2">{c.signOn}</TableCell>
                  <TableCell className="px-3 py-2">{c.signOff}</TableCell>
                  <TableCell className="px-3 py-2">{statusBadge(c.status)}</TableCell>
                  <TableCell className="px-3 py-2">{complianceBadge(c.compliance)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-xs text-muted-foreground mt-1 mb-2">
        Only seafarers with an active or extended contract are shown here.
      </div>
    </section>
  );
}

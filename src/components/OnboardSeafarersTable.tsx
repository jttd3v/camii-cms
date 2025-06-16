import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Filter } from "lucide-react";
import { Label } from "@/components/ui/label";
import allCrews from "@/data/dummyCrews";
import { isAfter } from "date-fns";

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

function complianceBadge(compliance: string, onClick?: () => void) {
  const badgeClass = compliance === "OK" 
    ? "bg-green-100 text-green-800 border-green-200 px-2 py-0.5"
    : compliance === "WARNING"
    ? "bg-yellow-100 text-yellow-800 border-yellow-200 px-2 py-0.5 cursor-pointer hover:bg-yellow-200"
    : "bg-red-100 text-red-800 border-red-200 px-2 py-0.5 cursor-pointer hover:bg-red-200";

  const variant = compliance === "OK" ? "secondary" : "destructive";

  return (
    <Badge 
      variant={variant} 
      className={badgeClass}
      onClick={onClick}
    >
      {compliance}
    </Badge>
  );
}

// Function to generate compliance details based on status
function getComplianceDetails(compliance: string, crewName: string) {
  if (compliance === "OK") {
    return {
      title: "Compliance Status: OK",
      details: [
        "All certifications are current and valid",
        "Medical certificates are up to date",
        "No outstanding compliance issues"
      ]
    };
  } else if (compliance === "WARNING") {
    return {
      title: "Compliance Warning",
      details: [
        "STCW certificate expires in 30 days",
        "Medical certificate expires in 45 days",
        "Recommend scheduling renewal soon"
      ]
    };
  } else {
    return {
      title: "Compliance Violation",
      details: [
        "STCW certificate has expired",
        "Medical certificate expired 15 days ago",
        "Immediate action required - crew member should be relieved"
      ]
    };
  }
}

export default function OnboardSeafarersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    rank: "",
    vessel: "",
    status: "",
  });
  const [selectedCompliance, setSelectedCompliance] = useState<{crewName: string, compliance: string} | null>(null);

  // Only show seafarers who are currently onboard, i.e., status is ACTIVE or EXTENDED
  const baseOnboardContracts = useMemo(() => {
    const today = new Date();
    return allCrews
      .map(crew => {
        const endDate = new Date(crew.estimatedReplacementDate);
        // Crew is considered "onboard" if their contract has not ended yet.
        const isOnboard = !isAfter(today, endDate);

        if (!isOnboard) {
          return null;
        }

        // To add some data variety for demonstration
        const isExtended = Math.random() > 0.8; // 20% chance
        const status = isExtended ? "EXTENDED" : "ACTIVE";
        const compliance = Math.random() > 0.9 ? "WARNING" : "OK"; // 10% chance

        return {
          id: crew.id,
          crewName: `${crew.firstName} ${crew.lastName}`,
          vessel: crew.vesselName,
          rank: crew.rank,
          signOn: crew.boardedVessel.split(' ')[0],
          signOff: crew.estimatedReplacementDate,
          status,
          compliance,
          extensionReason: status === "EXTENDED" ? "Operational requirement" : "",
        };
      })
      .filter((c): c is NonNullable<typeof c> => c !== null);
  }, []);

  const uniqueRanks = useMemo(() => [...new Set(baseOnboardContracts.map((c) => c.rank))], [baseOnboardContracts]);
  const uniqueVessels = useMemo(() => [...new Set(baseOnboardContracts.map((c) => c.vessel))], [baseOnboardContracts]);
  const uniqueStatuses = useMemo(() => [...new Set(baseOnboardContracts.map((c) => c.status))], [baseOnboardContracts]);

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
  }, [searchTerm, filters, baseOnboardContracts]);

  const handleFilterChange = (filterType: 'rank' | 'vessel' | 'status', value: string) => {
    setFilters(prev => ({...prev, [filterType]: value === 'all' ? '' : value }));
  };
  
  const clearFilters = () => {
      setFilters({ rank: "", vessel: "", status: "" });
  };

  const handleComplianceClick = (crewName: string, compliance: string) => {
    if (compliance !== "OK") {
      setSelectedCompliance({ crewName, compliance });
    }
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
                  <TableCell className="px-3 py-2">
                    {complianceBadge(c.compliance, () => handleComplianceClick(c.crewName, c.compliance))}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-xs text-muted-foreground mt-1 mb-2">
        Showing all seafarers with an active or extended contract.
      </div>

      {/* Compliance Details Dialog */}
      <Dialog open={!!selectedCompliance} onOpenChange={() => setSelectedCompliance(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedCompliance && getComplianceDetails(selectedCompliance.compliance, selectedCompliance.crewName).title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Crew Member: {selectedCompliance?.crewName}</h4>
              <div className="space-y-2">
                {selectedCompliance && getComplianceDetails(selectedCompliance.compliance, selectedCompliance.crewName).details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      selectedCompliance.compliance === "WARNING" ? "bg-yellow-500" : "bg-red-500"
                    }`} />
                    <p className="text-sm text-muted-foreground">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <Button onClick={() => setSelectedCompliance(null)} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}


import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Label } from "@/components/ui/label";
import allCrews from "@/data/dummyCrews";
import { isAfter, format, subMonths, intervalToDuration } from "date-fns";

function statusBadge(status: string) {
  switch (status) {
    case "Available":
      return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 px-2 py-0.5">{status}</Badge>;
    case "Requested":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200 px-2 py-0.5">{status}</Badge>;
    case "On Hold":
    default:
      return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200 px-2 py-0.5">{status}</Badge>;
  }
}

export default function VacationSeafarersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    rank: "",
    vessel: "",
    status: "",
  });

  const vacationers = useMemo(() => {
    const today = new Date();
    return allCrews
      .map(crew => {
        const endDate = new Date(crew.estimatedReplacementDate);
        const isOnboard = !isAfter(today, endDate);

        if (isOnboard) {
          return null;
        }
        
        const lastContractEnd = new Date(crew.estimatedReplacementDate);
        // The contract start is not directly in the data, but we know it's 9 months before end.
        const lastContractStart = subMonths(lastContractEnd, 9);
        
        const statuses = ["Available", "Requested", "On Hold"];
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        const vacationDuration = intervalToDuration({ start: lastContractEnd, end: today });
        const years = vacationDuration.years || 0;
        const months = (years * 12) + (vacationDuration.months || 0);
        const days = vacationDuration.days || 0;
        const formattedDuration = `${months} Mos. ${days} Days`;

        return {
            id: crew.id,
            name: `${crew.firstName} ${crew.lastName}`,
            rank: crew.rank,
            vessel: crew.vesselName, // this is their last vessel
            vacationSince: formattedDuration,
            lastContract: `${format(lastContractStart, "yyyy-MM-dd")} to ${format(lastContractEnd, "yyyy-MM-dd")}`,
            status: status,
        };
      })
      .filter((c): c is NonNullable<typeof c> => c !== null);
  }, []);

  const uniqueRanks = useMemo(() => [...new Set(vacationers.map((v) => v.rank))], [vacationers]);
  const uniqueVessels = useMemo(() => [...new Set(vacationers.map((v) => v.vessel))], [vacationers]);
  const uniqueStatuses = useMemo(() => [...new Set(vacationers.map((v) => v.status))], [vacationers]);

  const filteredData = useMemo(() => {
    return vacationers.filter((v) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        v.name.toLowerCase().includes(searchLower) ||
        v.rank.toLowerCase().includes(searchLower) ||
        v.vessel.toLowerCase().includes(searchLower);

      const matchesFilters =
        (filters.rank ? v.rank === filters.rank : true) &&
        (filters.vessel ? v.vessel === filters.vessel : true) &&
        (filters.status ? v.status === filters.status : true);
      
      return matchesSearch && matchesFilters;
    });
  }, [searchTerm, filters, vacationers]);

  const handleFilterChange = (filterType: 'rank' | 'vessel' | 'status', value: string) => {
    setFilters(prev => ({...prev, [filterType]: value === 'all' ? '' : value }));
  };
  
  const clearFilters = () => {
    setFilters({ rank: "", vessel: "", status: "" });
  };

  return (
    <section className="px-2 sm:px-4">
      <h2 className="font-semibold text-lg sm:text-xl mb-1 mt-2">Seafarers on Vacation</h2>

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
                <Label>Last Vessel</Label>
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
              <TableHead className="px-3 py-2">Last Vessel</TableHead>
              <TableHead className="px-3 py-2">Vacation Duration</TableHead>
              <TableHead className="px-3 py-2">Last Contract</TableHead>
              <TableHead className="px-3 py-2">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((v) => (
                <TableRow key={v.id} className="h-10 hover:bg-muted/40">
                  <TableCell className="px-3 py-2">{v.name}</TableCell>
                  <TableCell className="px-3 py-2">{v.rank}</TableCell>
                  <TableCell className="px-3 py-2">{v.vessel}</TableCell>
                  <TableCell className="px-3 py-2">{v.vacationSince}</TableCell>
                  <TableCell className="px-3 py-2">{v.lastContract}</TableCell>
                  <TableCell className="px-3 py-2">{statusBadge(v.status)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-5 text-muted-foreground">
                  No seafarers found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-xs text-muted-foreground mt-1 mb-2">
        Seafarers are listed here during their vacation/standby between contracts.
      </div>
    </section>
  );
}

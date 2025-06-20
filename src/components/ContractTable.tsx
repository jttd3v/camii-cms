
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { FileText, QrCode, ArrowUp } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import ContractTableFilters from "@/components/ContractTableFilters";
import SortableTableHeader from "@/components/SortableTableHeader";
import ContractPreviewTooltip from "@/components/ContractPreviewTooltip";

type Contract = {
  id: string;
  crewName: string;
  vessel: string;
  rank: string;
  signOn: string; // ISO date
  signOff: string; // ISO date
  status: "ACTIVE" | "EXPIRED" | "EXTENDED" | "OVERDUE";
  compliance: "OK" | "WARNING" | "VIOLATION";
  extensionReason?: string;
};

const contracts: Contract[] = [
  // Example demo data
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

type Props = {
  onSelect: (crewId: string, contractId: string) => void;
  highlightContractId: string | null;
};

export default function ContractTable({ onSelect, highlightContractId }: Props) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
  const [selectedVessels, setSelectedVessels] = useState<string[]>([]);
  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  // Extract unique values for filters
  const uniqueVessels = [...new Set(contracts.map(c => c.vessel))];
  const uniqueRanks = [...new Set(contracts.map(c => c.rank))];
  const uniqueStatuses = [...new Set(contracts.map(c => c.status))];

  // Initialize filters to show all items
  const vesselsToShow = selectedVessels.length > 0 ? selectedVessels : uniqueVessels;
  const ranksToShow = selectedRanks.length > 0 ? selectedRanks : uniqueRanks;
  const statusesToShow = selectedStatuses.length > 0 ? selectedStatuses : uniqueStatuses;

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc");
      if (sortDirection === "desc") setSortKey(null);
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedContracts = useMemo(() => {
    let filtered = contracts.filter(contract => 
      vesselsToShow.includes(contract.vessel) &&
      ranksToShow.includes(contract.rank) &&
      statusesToShow.includes(contract.status)
    );

    if (sortKey && sortDirection) {
      filtered.sort((a, b) => {
        const aValue = a[sortKey as keyof Contract];
        const bValue = b[sortKey as keyof Contract];
        
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [contracts, vesselsToShow, ranksToShow, statusesToShow, sortKey, sortDirection]);

  return (
    <section>
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-semibold text-xl">Contracts</h2>
        <Button variant="secondary" className="px-3 py-1 text-xs">
          <ArrowUp className="w-4 h-4 mr-1" /> Latest Contracts
        </Button>
      </div>
      
      <ContractTableFilters
        vessels={uniqueVessels}
        ranks={uniqueRanks}
        statuses={uniqueStatuses}
        selectedVessels={selectedVessels}
        selectedRanks={selectedRanks}
        selectedStatuses={selectedStatuses}
        onVesselChange={setSelectedVessels}
        onRankChange={setSelectedRanks}
        onStatusChange={setSelectedStatuses}
      />

      <div className="rounded-lg overflow-auto border shadow max-h-96">
        <table className="min-w-full bg-background text-left">
          <thead className="bg-muted/80 sticky top-0 z-10">
            <tr className="text-sm text-foreground">
              <th className="px-3 py-2">Crew</th>
              <th className="px-3 py-2">Vessel</th>
              <th className="px-3 py-2">Rank</th>
              <th className="px-3 py-2">Sign On</th>
              <SortableTableHeader
                sortKey="signOff"
                currentSort={sortKey}
                sortDirection={sortDirection}
                onSort={handleSort}
              >
                Sign Off
              </SortableTableHeader>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Compliance</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedContracts.map((c) => {
              const highlight = highlightContractId === c.id;
              return (
                <ContractPreviewTooltip key={c.id} contract={c}>
                  <tr
                    className={
                      "border-b text-sm transition " +
                      (highlight
                        ? "bg-accent/60 hover:bg-accent"
                        : "hover:bg-accent/20")
                    }
                    onClick={() => onSelect(c.crewName, c.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="px-3 py-2">{c.crewName}</td>
                    <td className="px-3 py-2">{c.vessel}</td>
                    <td className="px-3 py-2">{c.rank}</td>
                    <td className="px-3 py-2">{c.signOn}</td>
                    <td className="px-3 py-2">{c.signOff}</td>
                    <td className="px-3 py-2">
                      <StatusBadge type="status" value={c.status} />
                    </td>
                    <td className="px-3 py-2">
                      <StatusBadge type="compliance" value={c.compliance} />
                    </td>
                    <td className="px-3 py-2 flex gap-2 justify-center">
                      <Button size="icon" variant="ghost" title="Export PDF">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" title="QR Export">
                        <QrCode className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                </ContractPreviewTooltip>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-muted-foreground mt-2">
        <strong>Note:</strong> Red = overdue/violation, Yellow = extended (check MLC), Green = within limits.
      </div>
    </section>
  );
}

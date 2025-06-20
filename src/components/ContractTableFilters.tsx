
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, ChevronDown } from "lucide-react";

interface FilterProps {
  vessels: string[];
  ranks: string[];
  statuses: string[];
  selectedVessels: string[];
  selectedRanks: string[];
  selectedStatuses: string[];
  onVesselChange: (vessels: string[]) => void;
  onRankChange: (ranks: string[]) => void;
  onStatusChange: (statuses: string[]) => void;
}

const ContractTableFilters = ({
  vessels,
  ranks,
  statuses,
  selectedVessels,
  selectedRanks,
  selectedStatuses,
  onVesselChange,
  onRankChange,
  onStatusChange,
}: FilterProps) => {
  const handleVesselToggle = (vessel: string) => {
    const updated = selectedVessels.includes(vessel)
      ? selectedVessels.filter(v => v !== vessel)
      : [...selectedVessels, vessel];
    onVesselChange(updated);
  };

  const handleRankToggle = (rank: string) => {
    const updated = selectedRanks.includes(rank)
      ? selectedRanks.filter(r => r !== rank)
      : [...selectedRanks, rank];
    onRankChange(updated);
  };

  const handleStatusToggle = (status: string) => {
    const updated = selectedStatuses.includes(status)
      ? selectedStatuses.filter(s => s !== status)
      : [...selectedStatuses, status];
    onStatusChange(updated);
  };

  return (
    <div className="flex gap-2 mb-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Vessel ({selectedVessels.length})
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-background">
          {vessels.map((vessel) => (
            <DropdownMenuCheckboxItem
              key={vessel}
              checked={selectedVessels.includes(vessel)}
              onCheckedChange={() => handleVesselToggle(vessel)}
            >
              {vessel}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Rank ({selectedRanks.length})
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-background">
          {ranks.map((rank) => (
            <DropdownMenuCheckboxItem
              key={rank}
              checked={selectedRanks.includes(rank)}
              onCheckedChange={() => handleRankToggle(rank)}
            >
              {rank}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Status ({selectedStatuses.length})
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-background">
          {statuses.map((status) => (
            <DropdownMenuCheckboxItem
              key={status}
              checked={selectedStatuses.includes(status)}
              onCheckedChange={() => handleStatusToggle(status)}
            >
              {status}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ContractTableFilters;

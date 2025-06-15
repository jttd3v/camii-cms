
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import allCrews, { type CrewMember } from "@/data/dummyCrews";

interface CrewSearchProps {
  value: string;
  onSelect: (crew: CrewMember) => void;
}

export function CrewSearch({ value, onSelect }: CrewSearchProps) {
  const [open, setOpen] = React.useState(false);

  const selectedCrew = React.useMemo(() => 
    allCrews.find(
      (crew) => `${crew.firstName} ${crew.lastName}` === value
    ),
    [value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value && selectedCrew
            ? `${selectedCrew.firstName} ${selectedCrew.lastName} (${selectedCrew.rank})`
            : "Select crew member..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search crew member..." />
          <CommandList>
            <CommandEmpty>No crew member found.</CommandEmpty>
            <CommandGroup>
              {allCrews.map((crew) => {
                const fullName = `${crew.firstName} ${crew.lastName}`;
                return (
                  <CommandItem
                    key={crew.id}
                    value={fullName}
                    onSelect={(currentValue) => {
                      const selected = allCrews.find(c => `${c.firstName} ${c.lastName}`.toLowerCase() === currentValue.toLowerCase());
                      if (selected) {
                        onSelect(selected);
                      }
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === fullName ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {fullName} ({crew.rank})
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

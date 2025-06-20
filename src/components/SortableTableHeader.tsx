
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

interface SortableTableHeaderProps {
  children: React.ReactNode;
  sortKey: string;
  currentSort: string | null;
  sortDirection: "asc" | "desc" | null;
  onSort: (key: string) => void;
  className?: string;
}

const SortableTableHeader = ({
  children,
  sortKey,
  currentSort,
  sortDirection,
  onSort,
  className,
}: SortableTableHeaderProps) => {
  const isActive = currentSort === sortKey;

  return (
    <th className={`px-3 py-2 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onSort(sortKey)}
        className="h-auto p-0 font-bold text-[9px] hover:bg-transparent"
      >
        {children}
        {isActive && (
          <>
            {sortDirection === "asc" ? (
              <ChevronUp className="ml-1 h-3 w-3" />
            ) : (
              <ChevronDown className="ml-1 h-3 w-3" />
            )}
          </>
        )}
      </Button>
    </th>
  );
};

export default SortableTableHeader;

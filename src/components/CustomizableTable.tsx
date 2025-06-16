
import { useState, useMemo, useRef, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuCheckboxItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type ColumnConfig = {
  key: string;
  label: string;
  visible: boolean;
  sortable?: boolean;
  width?: number;
  minWidth?: number;
  render?: (value: any, row: any) => React.ReactNode;
};

export type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
} | null;

type CustomizableTableProps = {
  data: any[];
  columns: ColumnConfig[];
  onColumnsChange: (columns: ColumnConfig[]) => void;
  className?: string;
  emptyMessage?: string;
};

export default function CustomizableTable({ 
  data, 
  columns, 
  onColumnsChange, 
  className,
  emptyMessage = "No data found."
}: CustomizableTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const visibleColumns = columns.filter(col => col.visible);

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;
      
      const comparison = aValue < bValue ? -1 : 1;
      return sortConfig.direction === 'desc' ? comparison * -1 : comparison;
    });
  }, [data, sortConfig]);

  const handleSort = (columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    setSortConfig(current => {
      if (current?.key === columnKey) {
        if (current.direction === 'asc') {
          return { key: columnKey, direction: 'desc' };
        } else {
          return null; // Remove sort
        }
      } else {
        return { key: columnKey, direction: 'asc' };
      }
    });
  };

  const toggleColumnVisibility = (columnKey: string) => {
    const updatedColumns = columns.map(col => 
      col.key === columnKey ? { ...col, visible: !col.visible } : col
    );
    onColumnsChange(updatedColumns);
  };

  const autoSizeColumn = (columnKey: string) => {
    // Simple auto-sizing logic - in a real implementation, you'd measure text width
    const updatedColumns = columns.map(col => 
      col.key === columnKey ? { ...col, width: undefined } : col
    );
    onColumnsChange(updatedColumns);
  };

  const autoSizeAllColumns = () => {
    const updatedColumns = columns.map(col => ({ ...col, width: undefined }));
    onColumnsChange(updatedColumns);
  };

  if (visibleColumns.length === 0) {
    return (
      <div className="rounded-lg border shadow bg-white p-8 text-center text-muted-foreground">
        No columns are visible. Right-click to show columns.
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg border shadow bg-white overflow-x-auto", className)} ref={tableRef}>
      <Table>
        <TableHeader>
          <TableRow className="h-10">
            {visibleColumns.map((column) => (
              <ContextMenu key={column.key}>
                <ContextMenuTrigger asChild>
                  <TableHead 
                    className={cn(
                      "px-3 py-2 select-none",
                      column.sortable && "cursor-pointer hover:bg-muted/50"
                    )}
                    style={{ width: column.width, minWidth: column.minWidth }}
                    onClick={() => handleSort(column.key)}
                  >
                    <div className="flex items-center gap-1">
                      <span>{column.label}</span>
                      {column.sortable && sortConfig?.key === column.key && (
                        sortConfig.direction === 'asc' ? 
                          <ChevronUp className="h-3 w-3" /> : 
                          <ChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </TableHead>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-48">
                  {column.sortable && (
                    <>
                      <ContextMenuItem onClick={() => setSortConfig({ key: column.key, direction: 'asc' })}>
                        Sort Ascending
                      </ContextMenuItem>
                      <ContextMenuItem onClick={() => setSortConfig({ key: column.key, direction: 'desc' })}>
                        Sort Descending
                      </ContextMenuItem>
                      <ContextMenuItem onClick={() => setSortConfig(null)}>
                        Remove Sort
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                    </>
                  )}
                  <ContextMenuItem onClick={() => autoSizeColumn(column.key)}>
                    Auto-size This Column
                  </ContextMenuItem>
                  <ContextMenuItem onClick={autoSizeAllColumns}>
                    Auto-size All Columns
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  {columns.map((col) => (
                    <ContextMenuCheckboxItem
                      key={col.key}
                      checked={col.visible}
                      onCheckedChange={() => toggleColumnVisibility(col.key)}
                    >
                      {col.label}
                    </ContextMenuCheckboxItem>
                  ))}
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={visibleColumns.length} className="text-center py-5 text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map((row, index) => (
              <TableRow key={index} className="h-10 hover:bg-muted/40">
                {visibleColumns.map((column) => (
                  <TableCell key={column.key} className="px-3 py-2">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

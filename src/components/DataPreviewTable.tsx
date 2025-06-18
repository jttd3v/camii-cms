
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataPreviewTableProps {
  data: any[];
}

const DataPreviewTable = ({ data }: DataPreviewTableProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No preview data available
      </div>
    );
  }

  // Get column headers from the first row
  const headers = Object.keys(data[0]);
  
  // Show only first 10 rows for preview
  const previewData = data.slice(0, 10);

  return (
    <div className="border rounded-lg">
      <ScrollArea className="h-80">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="font-semibold">#</TableCell>
              {headers.map((header) => (
                <TableHead key={header} className="font-semibold">
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {previewData.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                {headers.map((header) => (
                  <TableCell key={header}>
                    {row[header]?.toString() || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      
      {data.length > 10 && (
        <div className="p-3 bg-muted/50 text-sm text-muted-foreground text-center border-t">
          Showing first 10 of {data.length} records
        </div>
      )}
    </div>
  );
};

export default DataPreviewTable;

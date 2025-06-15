
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { vessels } from "@/data/dummyVessels";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LayoutGrid, LayoutList } from "lucide-react";

const fields = [
  { label: "Vessel Name", key: "name" },
  { label: "IMO Number", key: "imo" },
  { label: "Flag", key: "flag" },
  { label: "Type", key: "type" },
  { label: "DWT", key: "dwt" },
  { label: "Built", key: "built" },
  { label: "Owner", key: "owner" }
];

const cardFields = fields.filter(f => !['name', 'imo', 'type'].includes(f.key));

export default function AllVesselsTab() {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  const handleRowClick = (imo: string) => {
    navigate(`/vessel/${imo}`);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-end mb-4">
        <ToggleGroup
          type="single"
          value={layout}
          onValueChange={(value) => {
            if (value) setLayout(value as 'grid' | 'list');
          }}
          aria-label="Layout mode"
        >
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <LayoutList className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {layout === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {vessels.map(vessel => (
            <Link 
              key={vessel.imo} 
              to={`/vessel/${vessel.imo}`} 
              className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Card className="h-full transition-colors group-hover:border-primary">
                <CardHeader>
                  <CardTitle className="group-hover:underline">{vessel.name}</CardTitle>
                  <CardDescription>{vessel.type} &mdash; IMO: {vessel.imo}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    {cardFields.map(field => (
                      <li key={field.key}>
                        <span className="font-medium">{field.label}: </span>
                        <span>{(vessel as any)[field.key]}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                {fields.map(field => (
                  <TableHead key={field.key}>{field.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {vessels.map(vessel => (
                <TableRow 
                  key={vessel.imo} 
                  onClick={() => handleRowClick(vessel.imo)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleRowClick(vessel.imo) }}
                  className="cursor-pointer"
                  tabIndex={0}
                >
                  {fields.map(field => (
                    <TableCell key={field.key}>
                      {(vessel as any)[field.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

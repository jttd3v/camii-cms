
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePenLine, Trash2 } from "lucide-react";

// Dummy data for P&I cases
const piCases = [
  {
    id: "PNI-001",
    vessel: "MV Horizon",
    crewMember: "John Doe",
    incidentDate: "2024-05-20",
    status: "Open",
    description: "Minor injury during mooring operations.",
  },
  {
    id: "PNI-002",
    vessel: "MV Liberty",
    crewMember: "Jane Smith",
    incidentDate: "2024-04-15",
    status: "Under Investigation",
    description: "Cargo damage claim.",
  },
  {
    id: "PNI-003",
    vessel: "MT Aurora",
    crewMember: "Peter Jones",
    incidentDate: "2024-03-10",
    status: "Closed",
    description: "Stowaway found on board.",
  },
  {
    id: "PNI-004",
    vessel: "MV Pacific",
    crewMember: "Chen Wang",
    incidentDate: "2024-06-01",
    status: "Open",
    description: "Illness requiring shore-based medical treatment.",
  },
];

const statusVariant = (status: string): "default" | "secondary" | "outline" | "destructive" | null | undefined => {
  switch (status) {
    case "Open":
      return "default";
    case "Under Investigation":
      return "secondary";
    case "Closed":
      return "outline";
    default:
      return "default";
  }
};

const PIModule = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>P&I Case Management</CardTitle>
        <Button>+ New Case</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Vessel</TableHead>
              <TableHead>Crew Member</TableHead>
              <TableHead>Incident Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {piCases.map((caseItem) => (
              <TableRow key={caseItem.id}>
                <TableCell className="font-medium">{caseItem.id}</TableCell>
                <TableCell>{caseItem.vessel}</TableCell>
                <TableCell>{caseItem.crewMember}</TableCell>
                <TableCell>{caseItem.incidentDate}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(caseItem.status)}>{caseItem.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="mr-2">
                        <FilePenLine className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PIModule;

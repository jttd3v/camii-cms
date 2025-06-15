import React, { useState } from "react";
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
import { FilePenLine } from "lucide-react";
import { PICase, PICaseStatus } from "@/types/pni";
import PICaseForm from "./PICaseForm";
import AuthModal from "./AuthModal";
import { format } from "date-fns";
import { toast } from "sonner";

// Dummy data for P&I cases
const initialPiCases: PICase[] = [
  {
    id: "PNI-001",
    vessel: "MV Horizon",
    crewMember: "John Doe",
    crewRank: "Able Seaman",
    incidentDate: new Date("2024-05-20"),
    location: "At sea, Pacific Ocean",
    incidentType: "Injury",
    description: "Minor injury during mooring operations.",
    actionTaken: "First aid administered onboard.",
    notificationDate: new Date("2024-05-21"),
    status: "Open",
    reportedBy: "Capt. Smith",
    submittedOn: new Date("2024-05-21"),
    editHistory: [],
  },
  {
    id: "PNI-002",
    vessel: "MV Liberty",
    crewMember: "Jane Smith",
    crewRank: "Chief Engineer",
    incidentDate: new Date("2024-04-15"),
    location: "Port of Rotterdam",
    incidentType: "Cargo Damage",
    description: "Cargo damage claim due to heavy weather.",
    actionTaken: "Surveyor appointed.",
    notificationDate: new Date("2024-04-16"),
    status: "Under Investigation",
    reportedBy: "Capt. Ahab",
    submittedOn: new Date("2024-04-16"),
    editHistory: [],
  },
  {
    id: "PNI-003",
    vessel: "MT Aurora",
    crewMember: "Peter Jones",
    crewRank: "Oiler",
    incidentDate: new Date("2024-03-10"),
    location: "Suez Canal",
    incidentType: "Stowaway",
    description: "Stowaway found on board.",
    actionTaken: "Handed over to local authorities at Port Said.",
    notificationDate: new Date("2024-03-10"),
    status: "Closed",
    reportedBy: "Chief Officer",
    submittedOn: new Date("2024-03-11"),
    editHistory: [],
  },
  {
    id: "PNI-004",
    vessel: "MV Pacific",
    crewMember: "Chen Wang",
    crewRank: "Cook",
    incidentDate: new Date("2024-06-01"),
    location: "Off coast of Vietnam",
    incidentType: "Illness",
    description: "Illness requiring shore-based medical treatment.",
    actionTaken: "Medevac arranged.",
    notificationDate: new Date("2024-06-01"),
    status: "Open",
    reportedBy: "Master",
    submittedOn: new Date("2024-06-02"),
    editHistory: [],
  },
];

const statusVariant = (status: PICaseStatus): "default" | "secondary" | "outline" | "destructive" | null | undefined => {
  switch (status) {
    case "Open":
    case "Draft":
      return "default";
    case "Under Investigation":
    case "Under Review":
      return "secondary";
    case "Closed":
    case "Rejected":
      return "destructive";
    case "Paid":
      return "default"; // Using default style for 'Paid'
    default:
      return "default";
  }
};

const PIModule = () => {
  const [cases, setCases] = useState<PICase[]>(initialPiCases);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<PICase | null>(null);
  const [authedUser, setAuthedUser] = useState<string | null>(null);

  const handleNewCase = () => {
    setEditingCase(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (caseItem: PICase) => {
    setEditingCase(caseItem);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (username: string) => {
    setAuthedUser(username);
    setIsAuthOpen(false);
    setIsFormOpen(true);
    toast.success(`Authenticated as ${username}. You can now edit the case.`);
  };

  const handleFormSubmit = (data: Omit<PICase, 'id' | 'submittedOn' | 'editHistory'> & { reasonForEdit?: string }) => {
    if (editingCase && authedUser) {
      // Edit existing case
      const updatedCases = cases.map((c) =>
        c.id === editingCase.id
          ? {
              ...c,
              ...data,
              editHistory: [
                ...c.editHistory,
                { user: authedUser, timestamp: new Date(), reason: data.reasonForEdit },
              ],
            }
          : c
      );
      setCases(updatedCases);
      toast.success(`Case ${editingCase.id} updated successfully.`);
    } else {
      // Create new case
      const newCase: PICase = {
        ...data,
        id: `PNI-${String(cases.length + 1).padStart(3, '0')}`,
        submittedOn: new Date(),
        editHistory: [],
      };
      setCases([newCase, ...cases]);
      toast.success(`New case ${newCase.id} created.`);
    }

    setIsFormOpen(false);
    setEditingCase(null);
    setAuthedUser(null);
  };

  const handleCloseModals = () => {
    setIsFormOpen(false);
    setIsAuthOpen(false);
    setEditingCase(null);
    setAuthedUser(null);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>P&I Case Management</CardTitle>
          <Button onClick={handleNewCase}>+ New Case</Button>
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
              {cases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell className="font-medium">{caseItem.id}</TableCell>
                  <TableCell>{caseItem.vessel}</TableCell>
                  <TableCell>{caseItem.crewMember}</TableCell>
                  <TableCell>{format(caseItem.incidentDate, "yyyy-MM-dd")}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(caseItem.status)}>{caseItem.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEditClick(caseItem)}>
                          <FilePenLine className="h-4 w-4" />
                      </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <PICaseForm
        open={isFormOpen}
        onClose={handleCloseModals}
        onSubmit={handleFormSubmit}
        caseData={editingCase}
      />
      
      <AuthModal
        open={isAuthOpen}
        onClose={handleCloseModals}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default PIModule;

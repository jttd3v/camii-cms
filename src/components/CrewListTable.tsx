
import { CrewMember } from "@/data/dummyCrews";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Printer } from "lucide-react";

interface CrewListTableProps {
  crew: CrewMember[];
}

const columns: { key: keyof CrewMember; label: string; className?: string }[] = [
    { key: 'rank', label: 'Rank', className: 'w-[150px]' },
    { key: 'lastName', label: 'Last Name', className: 'w-[150px]' },
    { key: 'firstName', label: 'First Name', className: 'w-[150px]' },
    { key: 'middleName', label: 'Middle Name', className: 'w-[150px]' },
    { key: 'suffix', label: 'Suffix', className: 'w-[80px]' },
    { key: 'higherLicense', label: 'Higher License', className: 'w-[150px]' },
    { key: 'birthDate', label: 'Birthdate', className: 'w-[120px]' },
    { key: 'age', label: 'Age', className: 'w-[80px]' },
    { key: 'address', label: 'Address', className: 'w-[250px]' },
    { key: 'passportNumber', label: 'Passport No.', className: 'w-[150px]' },
    { key: 'passportExpiry', label: 'Passport Expiry', className: 'w-[120px]' },
    { key: 'seamanBookNumber', label: 'Seaman\'s Book No.', className: 'w-[150px]' },
    { key: 'seamanBookExpiry', label: 'Seaman\'s Book Expiry', className: 'w-[120px]' },
    { key: 'joinedPort', label: 'Joined Port', className: 'w-[150px]' },
    { key: 'departedCebu', label: 'Departed Cebu (Date/Time)', className: 'w-[200px]' },
    { key: 'boardedVessel', label: 'Boarded Vessel (Date/Time)', className: 'w-[200px]' },
    { key: 'timeOnboard', label: 'Time Onboard', className: 'w-[150px]' },
    { key: 'contractDuration', label: 'Contract Duration', className: 'w-[150px]' },
    { key: 'estimatedReplacementDate', label: 'Est. Replacement Date', className: 'w-[180px]' },
    { key: 'candidateToReplace', label: 'Candidate to Replace', className: 'w-[200px]' },
];

export default function CrewListTable({ crew }: CrewListTableProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="mb-6 print:border-none print:shadow-none">
      <CardHeader className="flex flex-row items-center justify-between print:hidden">
        <CardTitle>Crew List</CardTitle>
        <Button onClick={handlePrint} variant="outline">
          <Printer className="mr-2 h-4 w-4" />
          Print / Save as PDF
        </Button>
      </CardHeader>
      <CardContent className="print:p-0">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">No.</TableHead>
                {columns.map((col) => (
                  <TableHead key={col.key} className={col.className}>
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {crew.map((member, index) => (
                <TableRow key={member.id}>
                  <TableCell className="whitespace-nowrap">{index + 1}</TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.key} className="whitespace-nowrap">
                      {String(member[col.key])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

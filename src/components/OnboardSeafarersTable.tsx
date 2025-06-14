
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Demo data, mirrors contract summary from ContractTable/CrewCard
const contracts = [
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

// Only show seafarers who are currently onboard, i.e., status is ACTIVE or EXTENDED
const onboardContracts = contracts.filter(
  (c) => c.status === "ACTIVE" || c.status === "EXTENDED"
);

function statusBadge(status: string) {
  switch (status) {
    case "ACTIVE":
      return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 px-2 py-0.5">{status}</Badge>;
    case "EXTENDED":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200 px-2 py-0.5">{status}</Badge>;
    default:
      return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200 px-2 py-0.5">{status}</Badge>;
  }
}

function complianceBadge(compliance: string) {
  switch (compliance) {
    case "OK":
      return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 px-2 py-0.5">{compliance}</Badge>;
    case "WARNING":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200 px-2 py-0.5">{compliance}</Badge>;
    default:
      return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200 px-2 py-0.5">{compliance}</Badge>;
  }
}

export default function OnboardSeafarersTable() {
  return (
    <section className="px-2 sm:px-4">
      <h2 className="font-semibold text-lg sm:text-xl mb-1 mt-2">Seafarers Currently Onboard</h2>
      <div className="rounded-lg border shadow bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="h-10">
              <TableHead className="px-3 py-2">Name</TableHead>
              <TableHead className="px-3 py-2">Rank</TableHead>
              <TableHead className="px-3 py-2">Vessel</TableHead>
              <TableHead className="px-3 py-2">Sign On</TableHead>
              <TableHead className="px-3 py-2">Sign Off</TableHead>
              <TableHead className="px-3 py-2">Status</TableHead>
              <TableHead className="px-3 py-2">Compliance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {onboardContracts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-5 text-muted-foreground">
                  No current onboard seafarers.
                </TableCell>
              </TableRow>
            ) : (
              onboardContracts.map((c) => (
                <TableRow key={c.id} className="h-10 hover:bg-muted/40">
                  <TableCell className="px-3 py-2">{c.crewName}</TableCell>
                  <TableCell className="px-3 py-2">{c.rank}</TableCell>
                  <TableCell className="px-3 py-2">{c.vessel}</TableCell>
                  <TableCell className="px-3 py-2">{c.signOn}</TableCell>
                  <TableCell className="px-3 py-2">{c.signOff}</TableCell>
                  <TableCell className="px-3 py-2">{statusBadge(c.status)}</TableCell>
                  <TableCell className="px-3 py-2">{complianceBadge(c.compliance)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-xs text-muted-foreground mt-1 mb-2">
        Only seafarers with an active or extended contract are shown here.
      </div>
    </section>
  );
}

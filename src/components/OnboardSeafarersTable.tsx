
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

export default function OnboardSeafarersTable() {
  return (
    <section>
      <h2 className="font-semibold text-xl mb-2">Seafarers Currently Onboard</h2>
      <div className="rounded-lg overflow-auto border shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead>Vessel</TableHead>
              <TableHead>Sign On</TableHead>
              <TableHead>Sign Off</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Compliance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {onboardContracts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No current onboard seafarers.
                </TableCell>
              </TableRow>
            ) : (
              onboardContracts.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.crewName}</TableCell>
                  <TableCell>{c.rank}</TableCell>
                  <TableCell>{c.vessel}</TableCell>
                  <TableCell>{c.signOn}</TableCell>
                  <TableCell>{c.signOff}</TableCell>
                  <TableCell>
                    <span
                      className={
                        "px-2 py-0.5 rounded-full text-xs " +
                        (c.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800")
                      }
                    >
                      {c.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        "px-2 py-0.5 rounded-full text-xs " +
                        (c.compliance === "OK"
                          ? "bg-green-100 text-green-900"
                          : c.compliance === "WARNING"
                          ? "bg-amber-100 text-amber-900"
                          : "bg-red-200 text-red-900")
                      }
                    >
                      {c.compliance}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-xs text-muted-foreground mt-2">
        Only seafarers with an active or extended contract are shown here.
      </div>
    </section>
  );
}


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Dummy vacation seafarer data
const vacationers = [
  {
    name: "Maria Santos",
    rank: "2nd Officer",
    vessel: "MT Pearl of Cebu",
    vacationSince: "2024-05-10",
    lastContract: "2023-10-01 to 2024-05-01",
    status: "Available"
  },
  {
    name: "Jose Dela Cruz",
    rank: "Chief Cook",
    vessel: "MV Carabao Spirit",
    vacationSince: "2024-04-15",
    lastContract: "2023-09-01 to 2024-04-04",
    status: "Available"
  },
  {
    name: "Lina Rosales",
    rank: "3rd Engineer",
    vessel: "MT Pacific Eagle",
    vacationSince: "2024-03-28",
    lastContract: "2023-08-10 to 2024-03-21",
    status: "Requested"
  },
  {
    name: "Jonathan Perez",
    rank: "Bosun",
    vessel: "MV Southern Phoenix",
    vacationSince: "2024-06-01",
    lastContract: "2023-11-14 to 2024-05-28",
    status: "Available"
  },
  {
    name: "Erika Gonzales",
    rank: "Deck Cadet",
    vessel: "MV Cherry Queen",
    vacationSince: "2024-05-20",
    lastContract: "2023-12-01 to 2024-05-16",
    status: "On Hold"
  }
  // ... (add as many as needed for your app)
];

function statusBadge(status: string) {
  switch (status) {
    case "Available":
      return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 px-2 py-0.5">{status}</Badge>;
    case "Requested":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200 px-2 py-0.5">{status}</Badge>;
    case "On Hold":
    default:
      return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200 px-2 py-0.5">{status}</Badge>;
  }
}

export default function VacationSeafarersTable() {
  return (
    <section className="px-2 sm:px-4">
      <h2 className="font-semibold text-lg sm:text-xl mb-1 mt-2">Seafarers on Vacation</h2>
      <div className="rounded-lg border shadow bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="h-10">
              <TableHead className="px-3 py-2">Name</TableHead>
              <TableHead className="px-3 py-2">Rank</TableHead>
              <TableHead className="px-3 py-2">Last Vessel</TableHead>
              <TableHead className="px-3 py-2">Vacation Since</TableHead>
              <TableHead className="px-3 py-2">Last Contract</TableHead>
              <TableHead className="px-3 py-2">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vacationers.map((v) => (
              <TableRow key={v.name} className="h-10 hover:bg-muted/40">
                <TableCell className="px-3 py-2">{v.name}</TableCell>
                <TableCell className="px-3 py-2">{v.rank}</TableCell>
                <TableCell className="px-3 py-2">{v.vessel}</TableCell>
                <TableCell className="px-3 py-2">{v.vacationSince}</TableCell>
                <TableCell className="px-3 py-2">{v.lastContract}</TableCell>
                <TableCell className="px-3 py-2">{statusBadge(v.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="text-xs text-muted-foreground mt-1 mb-2">
        Seafarers are listed here during their vacation/standby between contracts.
      </div>
    </section>
  );
}

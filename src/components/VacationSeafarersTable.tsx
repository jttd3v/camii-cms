
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

export default function VacationSeafarersTable() {
  return (
    <section>
      <h2 className="font-semibold text-xl mb-2">Seafarers on Vacation</h2>
      <div className="rounded-lg overflow-auto border shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead>Last Vessel</TableHead>
              <TableHead>Vacation Since</TableHead>
              <TableHead>Last Contract</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vacationers.map((v) => (
              <TableRow key={v.name}>
                <TableCell>{v.name}</TableCell>
                <TableCell>{v.rank}</TableCell>
                <TableCell>{v.vessel}</TableCell>
                <TableCell>{v.vacationSince}</TableCell>
                <TableCell>{v.lastContract}</TableCell>
                <TableCell>
                  <span
                    className={
                      "px-2 py-0.5 rounded-full text-xs " +
                      (v.status === "Available"
                        ? "bg-green-100 text-green-900"
                        : v.status === "Requested"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-200 text-red-900")
                    }
                  >
                    {v.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="text-xs text-muted-foreground mt-2">
        Seafarers are listed here during their vacation/standby between contracts.
      </div>
    </section>
  );
}

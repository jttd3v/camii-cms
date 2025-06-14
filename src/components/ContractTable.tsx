
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, QrCode, ArrowUp } from "lucide-react";

type Contract = {
  id: string;
  crewName: string;
  vessel: string;
  rank: string;
  signOn: string; // ISO date
  signOff: string; // ISO date
  status: "ACTIVE" | "EXPIRED" | "EXTENDED" | "OVERDUE";
  compliance: "OK" | "WARNING" | "VIOLATION";
  extensionReason?: string;
};

const contracts: Contract[] = [
  // Example demo data
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

type Props = {
  onSelect: (crewId: string, contractId: string) => void;
  highlightContractId: string | null;
};

export default function ContractTable({ onSelect, highlightContractId }: Props) {
  return (
    <section>
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-semibold text-xl">Contracts</h2>
        <Button variant="secondary" className="px-3 py-1 text-xs">
          <ArrowUp className="w-4 h-4 mr-1" /> Latest Contracts
        </Button>
      </div>
      <div className="rounded-lg overflow-auto border shadow">
        <table className="min-w-full bg-background text-left">
          <thead className="bg-muted/80">
            <tr className="text-sm text-foreground">
              <th className="px-3 py-2">Crew</th>
              <th className="px-3 py-2">Vessel</th>
              <th className="px-3 py-2">Rank</th>
              <th className="px-3 py-2">Sign On</th>
              <th className="px-3 py-2">Sign Off</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Compliance</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c) => {
              const highlight = highlightContractId === c.id;
              return (
                <tr
                  key={c.id}
                  className={
                    "border-b text-sm transition " +
                    (highlight
                      ? "bg-accent/60 hover:bg-accent"
                      : "hover:bg-accent/20")
                  }
                  onClick={() => onSelect(c.crewName, c.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td className="px-3 py-2">{c.crewName}</td>
                  <td className="px-3 py-2">{c.vessel}</td>
                  <td className="px-3 py-2">{c.rank}</td>
                  <td className="px-3 py-2">{c.signOn}</td>
                  <td className="px-3 py-2">{c.signOff}</td>
                  <td className="px-3 py-2">
                    <span
                      className={
                        "px-2 py-0.5 rounded-full text-xs " +
                        (c.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : c.status === "EXPIRED"
                          ? "bg-destructive text-destructive-foreground"
                          : c.status === "EXTENDED"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-200 text-red-900")
                      }
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
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
                  </td>
                  <td className="px-3 py-2 flex gap-2 justify-center">
                    <Button size="icon" variant="ghost" title="Export PDF">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" title="QR Export">
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-muted-foreground mt-2">
        <strong>Note:</strong> Red = overdue/violation, Yellow = extended (check MLC), Green = within limits.
      </div>
    </section>
  );
}

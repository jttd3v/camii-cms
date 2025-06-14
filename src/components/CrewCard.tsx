
import { useState } from "react";
import { FileText, QrCode, FileX } from "lucide-react";
import AuditTrailPanel from "./AuditTrailPanel";
import { Button } from "@/components/ui/button";

type CrewDemoProfile = {
  id: string;
  name: string;
  rank: string;
  vessel: string;
  nationality: string;
  contracts: {
    id: string;
    signOn: string;
    signOff: string;
    status: string;
    compliance: string;
    extensionReason?: string;
    closed?: boolean;
  }[];
  docs: {
    type: string;
    expiry: string;
    valid: boolean;
  }[];
};

const demoCrewList: CrewDemoProfile[] = [
  {
    id: "antonio_reyes",
    name: "Antonio Reyes",
    rank: "Chief Engineer",
    vessel: "MV Horizon",
    nationality: "Filipino",
    contracts: [
      {
        id: "c001",
        signOn: "2024-03-01",
        signOff: "2025-01-10",
        status: "EXTENDED",
        compliance: "WARNING",
        extensionReason: "Trade route delay",
      },
      {
        id: "c001-old",
        signOn: "2023-04-01",
        signOff: "2024-02-01",
        status: "EXPIRED",
        compliance: "OK",
        closed: true,
      },
    ],
    docs: [
      { type: "Passport", expiry: "2026-03-01", valid: true },
      { type: "Medical", expiry: "2025-01-15", valid: true },
      { type: "US Visa", expiry: "2024-07-12", valid: false },
    ],
  },
  {
    id: "julia_tan",
    name: "Julia Tan",
    rank: "Captain",
    vessel: "MV Liberty",
    nationality: "Singaporean",
    contracts: [
      {
        id: "c002",
        signOn: "2023-08-15",
        signOff: "2024-07-01",
        status: "ACTIVE",
        compliance: "OK",
      },
    ],
    docs: [
      { type: "Passport", expiry: "2027-02-21", valid: true },
      { type: "Medical", expiry: "2025-03-01", valid: true },
    ],
  },
  {
    id: "gleb_ivanov",
    name: "Gleb Ivanov",
    rank: "AB",
    vessel: "MT Aurora",
    nationality: "Russian",
    contracts: [
      {
        id: "c003",
        signOn: "2022-12-01",
        signOff: "2023-11-28",
        status: "OVERDUE",
        compliance: "VIOLATION",
      },
    ],
    docs: [
      { type: "Passport", expiry: "2023-10-01", valid: false },
      { type: "Medical", expiry: "2023-09-01", valid: false },
    ],
  },
  {
    id: "jorge_cruz",
    name: "Jorge Cruz",
    rank: "CO",
    vessel: "MV Pacific",
    nationality: "Filipino",
    contracts: [
      {
        id: "c004",
        signOn: "2024-01-20",
        signOff: "2024-07-19",
        status: "EXPIRED",
        compliance: "VIOLATION",
      },
    ],
    docs: [
      { type: "Passport", expiry: "2028-07-21", valid: true },
      { type: "Medical", expiry: "2025-04-05", valid: true },
    ],
  },
];

type Props = {
  crewId: string;
  selectedContractId?: string | null;
};

export default function CrewCard({ crewId, selectedContractId }: Props) {
  const crew = demoCrewList.find((c) => c.id === crewId);
  const [showAudit, setShowAudit] = useState(false);

  if (!crew) return null;
  const currContract = crew.contracts.find(
    (c) => c.id === selectedContractId
  ) || crew.contracts[0];

  return (
    <section className="bg-card border shadow rounded-2xl p-6 flex flex-col relative h-full min-h-[350px]">
      <div className="flex gap-4 items-start">
        <div>
          <div className="text-lg font-bold mb-1">{crew.name}</div>
          <div className="text-sm text-muted-foreground">
            {crew.rank} — {crew.nationality}
          </div>
          <div className="text-xs text-muted-foreground">
            <span>Vessel:</span> <span>{crew.vessel}</span>
          </div>
        </div>
        <div className="flex-1 self-end flex gap-2 justify-end">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-1" /> Contract PDF
          </Button>
          <Button variant="outline" size="sm">
            <QrCode className="w-4 h-4 mr-1" /> QR Export
          </Button>
        </div>
      </div>
      <div className="border-t my-2"></div>
      <div className="flex flex-row gap-5">
        {/* Contract details */}
        <div className="flex-1">
          <div className="font-medium text-sm mb-1">Current Contract</div>
          <div className="text-xs">
            <div>
              <span className="font-semibold">Sign On:</span> {currContract.signOn}
            </div>
            <div>
              <span className="font-semibold">Sign Off:</span> {currContract.signOff}
            </div>
            <div>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={
                  "px-2 py-0.5 rounded-full text-xs " +
                  (currContract.status === "ACTIVE"
                    ? "bg-green-100 text-green-800"
                    : currContract.status === "EXPIRED"
                    ? "bg-destructive text-destructive-foreground"
                    : currContract.status === "EXTENDED"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-200 text-red-900")
                }
              >
                {currContract.status}
              </span>
            </div>
            <div>
              <span className="font-semibold">Compliance:</span>{" "}
              <span
                className={
                  "px-2 py-0.5 rounded-full text-xs " +
                  (currContract.compliance === "OK"
                    ? "bg-green-100 text-green-900"
                    : currContract.compliance === "WARNING"
                    ? "bg-amber-100 text-amber-900"
                    : "bg-red-200 text-red-900")
                }
              >
                {currContract.compliance}
              </span>
            </div>
            {currContract.extensionReason && (
              <div>
                <span className="font-semibold">Ext. Reason:</span> {currContract.extensionReason}
              </div>
            )}
          </div>
          <div className="mt-3">
            <Button size="sm" variant="secondary" className="mr-1">Extend</Button>
            <Button size="sm" variant="destructive" className="mr-1">
              Terminate
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowAudit(!showAudit)}>
              {showAudit ? "Hide Audit Trail" : "Show Audit Trail"}
            </Button>
          </div>
        </div>
        {/* Documents */}
        <div className="w-52">
          <div className="font-medium text-sm mb-1">Linked Documents</div>
          <ul className="space-y-1">
            {crew.docs.map((doc) => (
              <li
                key={doc.type}
                className={
                  "flex items-center gap-2 px-2 py-1 rounded " +
                  (doc.valid
                    ? "bg-green-100 text-green-900"
                    : "bg-red-200 text-red-900")
                }
              >
                {doc.valid ? (
                  <FileText className="w-4 h-4" />
                ) : (
                  <FileX className="w-4 h-4" />
                )}
                <span className="w-20">{doc.type}</span>
                <span className="ml-auto text-xs">{doc.expiry}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showAudit && (
        <div className="mt-4">
          <AuditTrailPanel crewId={crew.id} contractId={currContract.id} />
        </div>
      )}
    </section>
  );
}

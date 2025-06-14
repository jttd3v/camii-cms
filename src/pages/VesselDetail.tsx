
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { vessels } from "@/data/dummyVessels";
import EditableSection from "@/components/EditableSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Add type for the particulars state.
interface Particulars {
  name: string;
  imo: string;
  callSign: string;
  flag: string;
  type: string;
  classSociety: string;
  gt: string;
  dwt: string;
  nt: string;
  loa: string;
  // ... add any other fields as needed
}

const SECTIONS = [
  { key: "name", label: "Vessel Name" },
  { key: "imo", label: "IMO Number" },
  { key: "callSign", label: "Call Sign" },
  { key: "flag", label: "Flag" },
  { key: "type", label: "Ship Type" },
  { key: "classSociety", label: "Class Society" },
  { key: "gt", label: "Gross Tonnage (GT)" },
  { key: "dwt", label: "Deadweight Tonnage (DWT)" },
  { key: "nt", label: "Net Tonnage" },
  { key: "loa", label: "Length Overall (LOA)" },
  // Add more as needed...
];

function getInitialParticulars(vessel: any): Particulars {
  return {
    name: vessel.name,
    imo: vessel.imo,
    callSign: "[Not Set]",
    flag: vessel.flag,
    type: vessel.type,
    classSociety: "[Not Set]",
    gt: "[Not Set]",
    dwt: vessel.dwt.toString(),
    nt: "[Not Set]",
    loa: "[Not Set]",
    // ...other fields
  };
}

export default function VesselDetail() {
  const { imo } = useParams<{ imo: string }>();
  const vessel = vessels.find(v => v.imo === imo);

  const [particulars, setParticulars] = useState<Particulars>(
    vessel ? getInitialParticulars(vessel) : {
      name: "",
      imo: "",
      callSign: "",
      flag: "",
      type: "",
      classSociety: "",
      gt: "",
      dwt: "",
      nt: "",
      loa: ""
    }
  );
  const [audit, setAudit] = useState<Record<string, { user: string; date: string }>>({});

  if (!vessel) {
    return (
      <div className="p-8">
        <p>Vessel not found.</p>
        <Link to="/" className="text-primary underline">Go back</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Link to="/" className="text-sm text-muted-foreground hover:underline">&larr; Back to Dashboard</Link>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">{particulars.name}</CardTitle>
          <div className="text-muted-foreground">IMO: {particulars.imo}</div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div><span className="font-medium">Flag:</span> {particulars.flag}</div>
            <div><span className="font-medium">Ship Type:</span> {particulars.type}</div>
            <div><span className="font-medium">DWT:</span> {particulars.dwt}</div>
            <div><span className="font-medium">Year Built:</span> {vessel.built}</div>
            <div><span className="font-medium">Owner:</span> {vessel.owner}</div>
          </div>
        </CardContent>
      </Card>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">I. Basic Vessel Particulars</h2>
        <div className="grid md:grid-cols-2 gap-2">
          {SECTIONS.map(({ key, label }) => (
            <EditableSection
              key={key}
              label={label}
              value={particulars[key] ?? ""}
              onSave={(newVal, editHist) => {
                setParticulars(p => ({ ...p, [key]: newVal }));
                setAudit(a => ({ ...a, [key]: editHist }));
              }}
              lastEditedBy={audit[key]?.user}
              lastEditedAt={audit[key]?.date}
            />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">II. Ownership and Management</h2>
        <div className="bg-muted/40 rounded-lg p-5">
          <div className="grid md:grid-cols-2 gap-2">
            <div><strong>Ship Owner Name:</strong> {vessel.owner}</div>
            <div><strong>Ship Manager Name:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Commercial Operator:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Technical Superintendent:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>ISM Manager:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>DOC Issuer:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>P&I Club:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Hull & Machinery Insurer:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">III. Navigation and Bridge Equipment</h2>
        <div className="bg-muted/40 rounded-lg p-5">
          <div className="grid md:grid-cols-2 gap-2">
            <div><strong>Radar Type:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>ECDIS (Make & Model):</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>AIS (Make & Model):</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>VDR (Voyage Data Recorder):</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Gyro Compass:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Magnetic Compass:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Autopilot System:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>GMDSS Equipment:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>BNWAS:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Bridge Console Brand:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">IV. Main Engine and Auxiliary Systems</h2>
        <div className="bg-muted/40 rounded-lg p-5">
          <div className="grid md:grid-cols-2 gap-2">
            <div><strong>Main Engine Maker:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Model and Type:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Power Output (kW):</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Propeller Type:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Shaft Generator:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Number of Auxiliary Engines / Generators:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Auxiliary Engine Maker and Model:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Boiler Type and Maker:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">V. Pollution Prevention and Environmental Equipment</h2>
        <div className="bg-muted/40 rounded-lg p-5">
          <div className="grid md:grid-cols-2 gap-2">
            <div><strong>Ballast Water Treatment System:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Sewage Treatment Plant:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Oily Water Separator:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Incinerator:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Scrubber System:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">VI. Cargo Handling Equipment (if applicable)</h2>
        <div className="bg-muted/40 rounded-lg p-5">
          <div className="grid md:grid-cols-2 gap-2">
            <div><strong>Cargo Pump Type:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Crane/Grab Details:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>Hatch Cover Type:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
            <div><strong>CO2 System:</strong> <span className="italic text-muted-foreground">[Not Set]</span></div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">VII. Certifications</h2>
        <div className="bg-muted/40 rounded-lg p-5">
          <ul className="list-disc ml-8 text-sm">
            <li>SMC <span className="italic text-muted-foreground">[Not Set]</span></li>
            <li>DOC <span className="italic text-muted-foreground">[Not Set]</span></li>
            <li>ISSC <span className="italic text-muted-foreground">[Not Set]</span></li>
            <li>MLC <span className="italic text-muted-foreground">[Not Set]</span></li>
            <li>IOPP <span className="italic text-muted-foreground">[Not Set]</span></li>
            <li>BWM Certificate <span className="italic text-muted-foreground">[Not Set]</span></li>
            <li>Safety Equipment Certificate <span className="italic text-muted-foreground">[Not Set]</span></li>
            <li>Class Certificate <span className="italic text-muted-foreground">[Not Set]</span></li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">VIII. Crew Complement</h2>
        <div className="bg-muted/40 rounded-lg p-5">
          <div>
            <strong>Minimum Safe Manning Certificate Data:</strong> <span className="italic text-muted-foreground">[Not Set]</span>
          </div>
          <div>
            <strong>Crew Matrix (Officer Nationality, Experience):</strong> <span className="italic text-muted-foreground">[Not Set]</span>
          </div>
          <div>
            <strong>Rotation Plan:</strong> <span className="italic text-muted-foreground">[Not Set]</span>
          </div>
          <div>
            <strong>Last Change Date:</strong> <span className="italic text-muted-foreground">[Not Set]</span>
          </div>
          <div>
            <strong>Next Planned Crew Change:</strong> <span className="italic text-muted-foreground">[Not Set]</span>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">IX. Dry Docking and Maintenance History</h2>
        <div className="bg-muted/40 rounded-lg p-5">
          <div>
            <strong>Last Dry Dock Date:</strong> <span className="italic text-muted-foreground">[Not Set]</span>
          </div>
          <div>
            <strong>Next Scheduled Docking:</strong> <span className="italic text-muted-foreground">[Not Set]</span>
          </div>
          <div>
            <strong>Last Major Repair Summary:</strong> <span className="italic text-muted-foreground">[Not Set]</span>
          </div>
          <div>
            <strong>Planned Maintenance System (PMS) link:</strong> <span className="italic text-muted-foreground">[Not Set]</span>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">X. Documents & Attachments</h2>
        <div className="bg-muted/40 rounded-lg p-5">
          <div>
            <strong>Ship Plans:</strong> <span className="italic text-muted-foreground">[Not Set]</span>
          </div>
          <div>
            <strong>Manuals (SMS, Bridge Procedures, etc.):</strong> <span className="italic text-muted-foreground">[Not Set]</span>
          </div>
          <div>
            <strong>Certificates (Upload Area):</strong> <span className="italic text-muted-foreground">[Not Set]</span>
          </div>
          <div>
            <strong>Owner's Instructions:</strong> <span className="italic text-muted-foreground">[Not Set]</span>
          </div>
          <div>
            <strong>Crew Familiarization Checklists:</strong> <span className="italic text-muted-foreground">[Not Set]</span>
          </div>
        </div>
      </section>
    </div>
  );
}


import { useParams, Link } from "react-router-dom";
import { vessels } from "@/data/dummyVessels";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditableSection from "@/components/EditableSection";

// Dummy fallback text for unset fields
const dummy = (label: string) => <span className="italic text-muted-foreground">[Not Set]</span>;

export default function VesselDetail() {
  const { imo } = useParams<{ imo: string }>();
  const vessel = vessels.find(v => v.imo === imo);

  if (!vessel) {
    return (
      <div className="p-8">
        <p>Vessel not found.</p>
        <Link to="/" className="text-primary underline">Go back</Link>
      </div>
    );
  }

  // Helper to safely cast any value to string or empty string if falsy/undefined/null
  const s = (v: unknown) => (v !== null && v !== undefined ? String(v) : "");

  // Top summary section fields (these match the fields in your screenshot)
  const summaryFields = [
    { label: "Vessel Name", value: s(vessel.name), key: "name" },
    { label: "IMO", value: s(vessel.imo), key: "imo" },
    { label: "Flag", value: s(vessel.flag), key: "flag" },
    { label: "Ship Type", value: s(vessel.type), key: "type" },
    { label: "DWT", value: s(vessel.dwt), key: "dwt" },
    { label: "Year Built", value: s(vessel.built), key: "built" },
    { label: "Owner", value: s(vessel.owner), key: "owner" },
  ];

  // I. Basic Vessel Particulars
  const basicFields = [
    { label: "Vessel Name:", value: s(vessel.name), key: "name" },
    { label: "IMO Number:", value: s(vessel.imo), key: "imo" },
    { label: "Call Sign:", value: "", key: "callsign" },
    { label: "Flag:", value: s(vessel.flag), key: "flag" },
    { label: "Ship Type:", value: s(vessel.type), key: "type" },
    { label: "Class Society:", value: "", key: "class" },
    { label: "Gross Tonnage (GT):", value: "", key: "gt" },
    { label: "Deadweight Tonnage (DWT):", value: s(vessel.dwt), key: "dwt" },
    { label: "Net Tonnage:", value: "", key: "nt" },
    { label: "Length Overall (LOA):", value: "", key: "loa" },
    { label: "Beam:", value: "", key: "beam" },
    { label: "Draft:", value: "", key: "draft" },
    { label: "Year Built:", value: s(vessel.built), key: "built" },
    { label: "Keel Laid Date:", value: "", key: "keeldate" },
    { label: "Delivery Date:", value: "", key: "delivery" },
    { label: "Builder / Shipyard:", value: "", key: "builder" },
    { label: "Hull Number:", value: "", key: "hullno" },
  ];

  // II. Ownership and Management — already implemented as EditableSection previously

  const ownerFields = [
    { label: "Ship Owner Name:", value: s(vessel.owner), key: "owner" },
    { label: "Ship Manager Name:", value: "", key: "mgr" },
    { label: "Commercial Operator:", value: "", key: "operator" },
    { label: "Technical Superintendent:", value: "", key: "tsuper" },
    { label: "ISM Manager:", value: "", key: "ism" },
    { label: "DOC Issuer:", value: "", key: "doc" },
    { label: "P&I Club:", value: "", key: "pi" },
    { label: "Hull & Machinery Insurer:", value: "", key: "insurer" },
  ];

  // III. Navigation and Bridge Equipment
  const navFields = [
    { label: "Radar Type:", value: "", key: "radar" },
    { label: "ECDIS (Make & Model):", value: "", key: "ecdis" },
    { label: "AIS (Make & Model):", value: "", key: "ais" },
    { label: "VDR (Voyage Data Recorder):", value: "", key: "vdr" },
    { label: "Gyro Compass:", value: "", key: "gyro" },
    { label: "Magnetic Compass:", value: "", key: "magcompass" },
    { label: "Autopilot System:", value: "", key: "autopilot" },
    { label: "GMDSS Equipment:", value: "", key: "gmdss" },
    { label: "BNWAS:", value: "", key: "bnwas" },
    { label: "Bridge Console Brand:", value: "", key: "console" },
  ];

  // IV. Main Engine and Auxiliary Systems
  const engineFields = [
    { label: "Main Engine Maker:", value: "", key: "mainengine" },
    { label: "Model and Type:", value: "", key: "enginemodel" },
    { label: "Power Output (kW):", value: "", key: "enginepower" },
    { label: "Propeller Type:", value: "", key: "propeller" },
    { label: "Shaft Generator:", value: "", key: "shaftgen" },
    { label: "Number of Auxiliary Engines / Generators:", value: "", key: "auxnum" },
    { label: "Auxiliary Engine Maker and Model:", value: "", key: "auxmaker" },
    { label: "Boiler Type and Maker:", value: "", key: "boiler" },
  ];

  // V. Pollution Prevention and Environmental Equipment
  const pollutionFields = [
    { label: "Ballast Water Treatment System:", value: "", key: "bwts" },
    { label: "Sewage Treatment Plant:", value: "", key: "sewage" },
    { label: "Oily Water Separator:", value: "", key: "ows" },
    { label: "Incinerator:", value: "", key: "incinerator" },
    { label: "Scrubber System:", value: "", key: "scrubber" },
  ];

  // VI. Cargo Handling Equipment (if applicable)
  const cargoFields = [
    { label: "Cargo Pump Type:", value: "", key: "pump" },
    { label: "Crane/Grab Details:", value: "", key: "crane" },
    { label: "Hatch Cover Type:", value: "", key: "hatch" },
    { label: "CO2 System:", value: "", key: "co2" },
  ];

  // VII. Certifications
  const certFields = [
    { label: "SMC:", value: "", key: "smc" },
    { label: "DOC:", value: "", key: "doccert" },
    { label: "ISSC:", value: "", key: "issc" },
    { label: "MLC:", value: "", key: "mlc" },
    { label: "IOPP:", value: "", key: "iopp" },
    { label: "BWM Certificate:", value: "", key: "bwm" },
    { label: "Safety Equipment Certificate:", value: "", key: "safeequip" },
    { label: "Class Certificate:", value: "", key: "classcert" },
  ];

  // VIII. Crew Complement
  const crewFields = [
    { label: "Minimum Safe Manning Certificate Data:", value: "", key: "safemanning" },
    { label: "Crew Matrix (Officer Nationality, Experience):", value: "", key: "crewmatrix" },
    { label: "Rotation Plan:", value: "", key: "rotation" },
    { label: "Last Change Date:", value: "", key: "lastchange" },
    { label: "Next Planned Crew Change:", value: "", key: "nextcrew" },
  ];

  // IX. Dry Docking and Maintenance History
  const dockingFields = [
    { label: "Last Dry Dock Date:", value: "", key: "lastdock" },
    { label: "Next Scheduled Docking:", value: "", key: "nextdock" },
    { label: "Last Major Repair Summary:", value: "", key: "majorrepair" },
    { label: "Planned Maintenance System (PMS) link:", value: "", key: "pmslink" },
  ];

  // X. Documents & Attachments
  const docFields = [
    { label: "Ship Plans:", value: "", key: "plans" },
    { label: "Manuals (SMS, Bridge Procedures, etc.):", value: "", key: "manuals" },
    { label: "Certificates (Upload Area):", value: "", key: "certupload" },
    { label: "Owner’s Instructions:", value: "", key: "ownerinstruct" },
    { label: "Crew Familiarization Checklists:", value: "", key: "familiar" },
  ];

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Link to="/" className="text-sm text-muted-foreground hover:underline">&larr; Back to Dashboard</Link>

      {/* Editable summary card section at the very top */}
      <Card className="mb-6">
        <CardHeader>
          <EditableSection
            title=""
            fields={summaryFields}
          />
        </CardHeader>
        {/* The old summary layout below is removed; it's replaced by EditableSection now. */}
      </Card>

      <EditableSection
        title="I. Basic Vessel Particulars"
        fields={basicFields}
      />

      <EditableSection
        title="II. Ownership and Management"
        fields={ownerFields}
      />

      <EditableSection
        title="III. Navigation and Bridge Equipment"
        fields={navFields}
      />

      <EditableSection
        title="IV. Main Engine and Auxiliary Systems"
        fields={engineFields}
      />

      <EditableSection
        title="V. Pollution Prevention and Environmental Equipment"
        fields={pollutionFields}
      />

      <EditableSection
        title="VI. Cargo Handling Equipment (if applicable)"
        fields={cargoFields}
      />

      <EditableSection
        title="VII. Certifications"
        fields={certFields}
      />

      <EditableSection
        title="VIII. Crew Complement"
        fields={crewFields}
      />

      <EditableSection
        title="IX. Dry Docking and Maintenance History"
        fields={dockingFields}
      />

      <EditableSection
        title="X. Documents & Attachments"
        fields={docFields}
      />
    </div>
  );
}

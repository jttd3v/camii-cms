
import { useParams, Link } from "react-router-dom";
import { vessels } from "@/data/dummyVessels";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Section headers for organization
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-bold mb-3">{title}</h2>
    <div className="bg-muted/40 rounded-lg p-5">{children}</div>
  </section>
);
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

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Link to="/" className="text-sm text-muted-foreground hover:underline">&larr; Back to Dashboard</Link>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">{vessel.name}</CardTitle>
          <div className="text-muted-foreground">IMO: {vessel.imo}</div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div><span className="font-medium">Flag:</span> {vessel.flag}</div>
            <div><span className="font-medium">Ship Type:</span> {vessel.type}</div>
            <div><span className="font-medium">DWT:</span> {vessel.dwt}</div>
            <div><span className="font-medium">Year Built:</span> {vessel.built}</div>
            <div><span className="font-medium">Owner:</span> {vessel.owner}</div>
          </div>
        </CardContent>
      </Card>

      <Section title="I. Basic Vessel Particulars">
        <div className="grid md:grid-cols-2 gap-2">
          <div><strong>Vessel Name:</strong> {vessel.name}</div>
          <div><strong>IMO Number:</strong> {vessel.imo}</div>
          <div><strong>Call Sign:</strong> {dummy("Call Sign")}</div>
          <div><strong>Flag:</strong> {vessel.flag}</div>
          <div><strong>Ship Type:</strong> {vessel.type}</div>
          <div><strong>Class Society:</strong> {dummy("Class Society")}</div>
          <div><strong>Gross Tonnage (GT):</strong> {dummy("Gross Tonnage")}</div>
          <div><strong>Deadweight Tonnage (DWT):</strong> {vessel.dwt}</div>
          <div><strong>Net Tonnage:</strong> {dummy("Net Tonnage")}</div>
          <div><strong>Length Overall (LOA):</strong> {dummy("Length Overall")}</div>
          <div><strong>Beam:</strong> {dummy("Beam")}</div>
          <div><strong>Draft:</strong> {dummy("Draft")}</div>
          <div><strong>Year Built:</strong> {vessel.built}</div>
          <div><strong>Keel Laid Date:</strong> {dummy("Keel Laid Date")}</div>
          <div><strong>Delivery Date:</strong> {dummy("Delivery Date")}</div>
          <div><strong>Builder / Shipyard:</strong> {dummy("Shipyard")}</div>
          <div><strong>Hull Number:</strong> {dummy("Hull Number")}</div>
        </div>
      </Section>

      <Section title="II. Ownership and Management">
        <div className="grid md:grid-cols-2 gap-2">
          <div><strong>Ship Owner Name:</strong> {vessel.owner}</div>
          <div><strong>Ship Manager Name:</strong> {dummy("Ship Manager Name")}</div>
          <div><strong>Commercial Operator:</strong> {dummy("Commercial Operator")}</div>
          <div><strong>Technical Superintendent:</strong> {dummy("Technical Superintendent")}</div>
          <div><strong>ISM Manager:</strong> {dummy("ISM Manager")}</div>
          <div><strong>DOC Issuer:</strong> {dummy("DOC Issuer")}</div>
          <div><strong>P&I Club:</strong> {dummy("P&I Club")}</div>
          <div><strong>Hull & Machinery Insurer:</strong> {dummy("Insurer")}</div>
        </div>
      </Section>

      <Section title="III. Navigation and Bridge Equipment">
        <div className="grid md:grid-cols-2 gap-2">
          <div><strong>Radar Type:</strong> {dummy("Radar Type")}</div>
          <div><strong>ECDIS (Make & Model):</strong> {dummy("ECDIS")}</div>
          <div><strong>AIS (Make & Model):</strong> {dummy("AIS")}</div>
          <div><strong>VDR (Voyage Data Recorder):</strong> {dummy("VDR")}</div>
          <div><strong>Gyro Compass:</strong> {dummy("Gyro Compass")}</div>
          <div><strong>Magnetic Compass:</strong> {dummy("Magnetic Compass")}</div>
          <div><strong>Autopilot System:</strong> {dummy("Autopilot")}</div>
          <div><strong>GMDSS Equipment:</strong> {dummy("GMDSS")}</div>
          <div><strong>BNWAS:</strong> {dummy("BNWAS")}</div>
          <div><strong>Bridge Console Brand:</strong> {dummy("Bridge Console")}</div>
        </div>
      </Section>

      <Section title="IV. Main Engine and Auxiliary Systems">
        <div className="grid md:grid-cols-2 gap-2">
          <div><strong>Main Engine Maker:</strong> {dummy("Engine Maker")}</div>
          <div><strong>Model and Type:</strong> {dummy("Model & Type")}</div>
          <div><strong>Power Output (kW):</strong> {dummy("Power Output")}</div>
          <div><strong>Propeller Type:</strong> {dummy("Propeller Type")}</div>
          <div><strong>Shaft Generator:</strong> {dummy("Shaft Generator")}</div>
          <div><strong>Number of Auxiliary Engines / Generators:</strong> {dummy("Aux Engines")}</div>
          <div><strong>Auxiliary Engine Maker and Model:</strong> {dummy("Aux Maker/Model")}</div>
          <div><strong>Boiler Type and Maker:</strong> {dummy("Boiler")}</div>
        </div>
      </Section>

      <Section title="V. Pollution Prevention and Environmental Equipment">
        <div className="grid md:grid-cols-2 gap-2">
          <div><strong>Ballast Water Treatment System:</strong> {dummy("BWTS")}</div>
          <div><strong>Sewage Treatment Plant:</strong> {dummy("Sewage")}</div>
          <div><strong>Oily Water Separator:</strong> {dummy("OWS")}</div>
          <div><strong>Incinerator:</strong> {dummy("Incinerator")}</div>
          <div><strong>Scrubber System:</strong> {dummy("Scrubber")}</div>
        </div>
      </Section>

      <Section title="VI. Cargo Handling Equipment (if applicable)">
        <div className="grid md:grid-cols-2 gap-2">
          <div><strong>Cargo Pump Type:</strong> {dummy("Pump")}</div>
          <div><strong>Crane/Grab Details:</strong> {dummy("Crane")}</div>
          <div><strong>Hatch Cover Type:</strong> {dummy("Hatch Cover")}</div>
          <div><strong>CO2 System:</strong> {dummy("CO2")}</div>
        </div>
      </Section>

      <Section title="VII. Certifications">
        <ul className="list-disc ml-8 text-sm">
          <li>SMC {dummy("SMC")}</li>
          <li>DOC {dummy("DOC")}</li>
          <li>ISSC {dummy("ISSC")}</li>
          <li>MLC {dummy("MLC")}</li>
          <li>IOPP {dummy("IOPP")}</li>
          <li>BWM Certificate {dummy("BWM")}</li>
          <li>Safety Equipment Certificate {dummy("Safety Equipment")}</li>
          <li>Class Certificate {dummy("Class Certificate")}</li>
        </ul>
      </Section>

      <Section title="VIII. Crew Complement">
        <div>
          <strong>Minimum Safe Manning Certificate Data:</strong> {dummy("Safe Manning")}
        </div>
        <div>
          <strong>Crew Matrix (Officer Nationality, Experience):</strong> {dummy("Matrix")}
        </div>
        <div>
          <strong>Rotation Plan:</strong> {dummy("Rotation Plan")}
        </div>
        <div>
          <strong>Last Change Date:</strong> {dummy("Last Change")}
        </div>
        <div>
          <strong>Next Planned Crew Change:</strong> {dummy("Next Crew Change")}
        </div>
      </Section>

      <Section title="IX. Dry Docking and Maintenance History">
        <div>
          <strong>Last Dry Dock Date:</strong> {dummy("Last Dry Dock")}
        </div>
        <div>
          <strong>Next Scheduled Docking:</strong> {dummy("Next Dock")}
        </div>
        <div>
          <strong>Last Major Repair Summary:</strong> {dummy("Major Repair")}
        </div>
        <div>
          <strong>Planned Maintenance System (PMS) link:</strong> {dummy("PMS Link")}
        </div>
      </Section>

      <Section title="X. Documents & Attachments">
        <div>
          <strong>Ship Plans:</strong> {dummy("Ship Plans")}
        </div>
        <div>
          <strong>Manuals (SMS, Bridge Procedures, etc.):</strong> {dummy("Manuals")}
        </div>
        <div>
          <strong>Certificates (Upload Area):</strong> {dummy("Certificates")}
        </div>
        <div>
          <strong>Owner’s Instructions:</strong> {dummy("Owner's Instructions")}
        </div>
        <div>
          <strong>Crew Familiarization Checklists:</strong> {dummy("Familiarization")}
        </div>
      </Section>
    </div>
  );
}

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { vessels } from "@/data/dummyVessels";
import allCrews from "@/data/dummyCrews";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditableSection from "@/components/EditableSection";
import VesselSummaryCard from "@/components/VesselSummaryCard";
import VesselDetailSection from "@/components/VesselDetailSection";
import CrewListTable from "@/components/CrewListTable";
import { useToast } from "@/hooks/use-toast";

// Dummy fallback text for unset fields
const dummy = (label: string) => <span className="italic text-muted-foreground">[Not Set]</span>;

export default function VesselDetail() {
  const { imo } = useParams<{ imo: string }>();
  const initialVessel = vessels.find(v => v.imo === imo);
  const [showCrewList, setShowCrewList] = useState(false);
  const { toast } = useToast();

  // State to hold current vessel data with all fields
  const [vesselData, setVesselData] = useState(() => {
    if (!initialVessel) return null;
    
    return {
      // Basic vessel data from dummyVessels
      ...initialVessel,
      // Extended fields for all sections
      callsign: "",
      class: "",
      gt: "",
      nt: "",
      loa: "",
      beam: "",
      draft: "",
      keeldate: "",
      delivery: "",
      builder: "",
      hullno: "",
      mgr: "",
      operator: "",
      tsuper: "",
      ism: "",
      doc: "",
      pi: "",
      insurer: "",
      radar: "",
      ecdis: "",
      ais: "",
      vdr: "",
      gyro: "",
      magcompass: "",
      autopilot: "",
      gmdss: "",
      bnwas: "",
      console: "",
      mainengine: "",
      enginemodel: "",
      enginepower: "",
      propeller: "",
      shaftgen: "",
      auxnum: "",
      auxmaker: "",
      boiler: "",
      bwts: "",
      sewage: "",
      ows: "",
      incinerator: "",
      scrubber: "",
      pump: "",
      crane: "",
      hatch: "",
      co2: "",
      smc: "",
      doccert: "",
      issc: "",
      mlc: "",
      iopp: "",
      bwm: "",
      safeequip: "",
      classcert: "",
      safemanning: "",
      crewmatrix: "",
      rotation: "",
      lastchange: "",
      nextcrew: "",
      lastdock: "",
      nextdock: "",
      majorrepair: "",
      pmslink: "",
      plans: "",
      manuals: "",
      certupload: "",
      ownerinstruct: "",
      familiar: "",
    };
  });

  if (!vesselData) {
    return (
      <div className="p-8">
        <p>Vessel not found.</p>
        <Link to="/" className="text-primary underline">Go back</Link>
      </div>
    );
  }

  const vesselCrew = allCrews.filter(c => c.vesselName === vesselData.name);

  // Helper to safely cast any value to string or empty string if falsy/undefined/null
  const s = (v: unknown) => (v !== null && v !== undefined ? String(v) : "");

  // Generic save handler that updates vessel data and shows success message
  const createSaveHandler = (sectionName: string) => (fields: { [key: string]: string }) => {
    setVesselData(prev => prev ? { ...prev, ...fields } : null);
    toast({
      title: "Changes Saved",
      description: `${sectionName} has been updated successfully.`,
    });
  };

  // Top summary section fields
  const summaryFields = [
    { label: "Vessel Name", value: s(vesselData.name), key: "name" },
    { label: "IMO", value: s(vesselData.imo), key: "imo" },
    { label: "Flag", value: s(vesselData.flag), key: "flag" },
    { label: "Ship Type", value: s(vesselData.type), key: "type" },
    { label: "DWT", value: s(vesselData.dwt), key: "dwt" },
    { label: "Year Built", value: s(vesselData.built), key: "built" },
    { label: "Owner", value: s(vesselData.owner), key: "owner" },
  ];

  // I. Basic Vessel Particulars
  const basicFields = [
    { label: "Vessel Name:", value: s(vesselData.name), key: "name" },
    { label: "IMO Number:", value: s(vesselData.imo), key: "imo" },
    { label: "Call Sign:", value: s(vesselData.callsign), key: "callsign" },
    { label: "Flag:", value: s(vesselData.flag), key: "flag" },
    { label: "Ship Type:", value: s(vesselData.type), key: "type" },
    { label: "Class Society:", value: s(vesselData.class), key: "class" },
    { label: "Gross Tonnage (GT):", value: s(vesselData.gt), key: "gt" },
    { label: "Deadweight Tonnage (DWT):", value: s(vesselData.dwt), key: "dwt" },
    { label: "Net Tonnage:", value: s(vesselData.nt), key: "nt" },
    { label: "Length Overall (LOA):", value: s(vesselData.loa), key: "loa" },
    { label: "Beam:", value: s(vesselData.beam), key: "beam" },
    { label: "Draft:", value: s(vesselData.draft), key: "draft" },
    { label: "Year Built:", value: s(vesselData.built), key: "built" },
    { label: "Keel Laid Date:", value: s(vesselData.keeldate), key: "keeldate" },
    { label: "Delivery Date:", value: s(vesselData.delivery), key: "delivery" },
    { label: "Builder / Shipyard:", value: s(vesselData.builder), key: "builder" },
    { label: "Hull Number:", value: s(vesselData.hullno), key: "hullno" },
  ];

  // II. Ownership and Management
  const ownerFields = [
    { label: "Ship Owner Name:", value: s(vesselData.owner), key: "owner" },
    { label: "Ship Manager Name:", value: s(vesselData.mgr), key: "mgr" },
    { label: "Commercial Operator:", value: s(vesselData.operator), key: "operator" },
    { label: "Technical Superintendent:", value: s(vesselData.tsuper), key: "tsuper" },
    { label: "ISM Manager:", value: s(vesselData.ism), key: "ism" },
    { label: "DOC Issuer:", value: s(vesselData.doc), key: "doc" },
    { label: "P&I Club:", value: s(vesselData.pi), key: "pi" },
    { label: "Hull & Machinery Insurer:", value: s(vesselData.insurer), key: "insurer" },
  ];

  // III. Navigation and Bridge Equipment
  const navFields = [
    { label: "Radar Type:", value: s(vesselData.radar), key: "radar" },
    { label: "ECDIS (Make & Model):", value: s(vesselData.ecdis), key: "ecdis" },
    { label: "AIS (Make & Model):", value: s(vesselData.ais), key: "ais" },
    { label: "VDR (Voyage Data Recorder):", value: s(vesselData.vdr), key: "vdr" },
    { label: "Gyro Compass:", value: s(vesselData.gyro), key: "gyro" },
    { label: "Magnetic Compass:", value: s(vesselData.magcompass), key: "magcompass" },
    { label: "Autopilot System:", value: s(vesselData.autopilot), key: "autopilot" },
    { label: "GMDSS Equipment:", value: s(vesselData.gmdss), key: "gmdss" },
    { label: "BNWAS:", value: s(vesselData.bnwas), key: "bnwas" },
    { label: "Bridge Console Brand:", value: s(vesselData.console), key: "console" },
  ];

  // IV. Main Engine and Auxiliary Systems
  const engineFields = [
    { label: "Main Engine Maker:", value: s(vesselData.mainengine), key: "mainengine" },
    { label: "Model and Type:", value: s(vesselData.enginemodel), key: "enginemodel" },
    { label: "Power Output (kW):", value: s(vesselData.enginepower), key: "enginepower" },
    { label: "Propeller Type:", value: s(vesselData.propeller), key: "propeller" },
    { label: "Shaft Generator:", value: s(vesselData.shaftgen), key: "shaftgen" },
    { label: "Number of Auxiliary Engines / Generators:", value: s(vesselData.auxnum), key: "auxnum" },
    { label: "Auxiliary Engine Maker and Model:", value: s(vesselData.auxmaker), key: "auxmaker" },
    { label: "Boiler Type and Maker:", value: s(vesselData.boiler), key: "boiler" },
  ];

  // V. Pollution Prevention and Environmental Equipment
  const pollutionFields = [
    { label: "Ballast Water Treatment System:", value: s(vesselData.bwts), key: "bwts" },
    { label: "Sewage Treatment Plant:", value: s(vesselData.sewage), key: "sewage" },
    { label: "Oily Water Separator:", value: s(vesselData.ows), key: "ows" },
    { label: "Incinerator:", value: s(vesselData.incinerator), key: "incinerator" },
    { label: "Scrubber System:", value: s(vesselData.scrubber), key: "scrubber" },
  ];

  // VI. Cargo Handling Equipment (if applicable)
  const cargoFields = [
    { label: "Cargo Pump Type:", value: s(vesselData.pump), key: "pump" },
    { label: "Crane/Grab Details:", value: s(vesselData.crane), key: "crane" },
    { label: "Hatch Cover Type:", value: s(vesselData.hatch), key: "hatch" },
    { label: "CO2 System:", value: s(vesselData.co2), key: "co2" },
  ];

  // VII. Certifications
  const certFields = [
    { label: "SMC:", value: s(vesselData.smc), key: "smc" },
    { label: "DOC:", value: s(vesselData.doccert), key: "doccert" },
    { label: "ISSC:", value: s(vesselData.issc), key: "issc" },
    { label: "MLC:", value: s(vesselData.mlc), key: "mlc" },
    { label: "IOPP:", value: s(vesselData.iopp), key: "iopp" },
    { label: "BWM Certificate:", value: s(vesselData.bwm), key: "bwm" },
    { label: "Safety Equipment Certificate:", value: s(vesselData.safeequip), key: "safeequip" },
    { label: "Class Certificate:", value: s(vesselData.classcert), key: "classcert" },
  ];

  // VIII. Crew Complement
  const crewFields = [
    { label: "Minimum Safe Manning Certificate Data:", value: s(vesselData.safemanning), key: "safemanning" },
    { label: "Crew Matrix (Officer Nationality, Experience):", value: s(vesselData.crewmatrix), key: "crewmatrix" },
    { label: "Rotation Plan:", value: s(vesselData.rotation), key: "rotation" },
    { label: "Last Change Date:", value: s(vesselData.lastchange), key: "lastchange" },
    { label: "Next Planned Crew Change:", value: s(vesselData.nextcrew), key: "nextcrew" },
  ];

  // IX. Dry Docking and Maintenance History
  const dockingFields = [
    { label: "Last Dry Dock Date:", value: s(vesselData.lastdock), key: "lastdock" },
    { label: "Next Scheduled Docking:", value: s(vesselData.nextdock), key: "nextdock" },
    { label: "Last Major Repair Summary:", value: s(vesselData.majorrepair), key: "majorrepair" },
    { label: "Planned Maintenance System (PMS) link:", value: s(vesselData.pmslink), key: "pmslink" },
  ];

  // X. Documents & Attachments
  const docFields = [
    { label: "Ship Plans:", value: s(vesselData.plans), key: "plans" },
    { label: "Manuals (SMS, Bridge Procedures, etc.):", value: s(vesselData.manuals), key: "manuals" },
    { label: "Certificates (Upload Area):", value: s(vesselData.certupload), key: "certupload" },
    { label: "Owner's Instructions:", value: s(vesselData.ownerinstruct), key: "ownerinstruct" },
    { label: "Crew Familiarization Checklists:", value: s(vesselData.familiar), key: "familiar" },
  ];

  const vesselInfoForCrewList = {
    name: s(vesselData.name),
    flag: s(vesselData.flag),
    owner: s(vesselData.owner),
    manager: s(vesselData.mgr),
  };

  return (
    <div className="max-w-full mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="print:hidden">
        <Link to="/" className="text-sm text-muted-foreground hover:underline">&larr; Back to Dashboard</Link>

        {/* Summary card section */}
        <VesselSummaryCard
          fields={summaryFields}
          onViewCrewClick={() => setShowCrewList(s => !s)}
          isCrewListVisible={showCrewList}
          onSave={createSaveHandler("Vessel Summary")}
        />
      </div>

      {showCrewList && <CrewListTable crew={vesselCrew} vessel={vesselInfoForCrewList} />}

      <div className="print:hidden">
        <VesselDetailSection title="I. Basic Vessel Particulars" fields={basicFields} onSave={createSaveHandler("Basic Vessel Particulars")} />
        <VesselDetailSection title="II. Ownership and Management" fields={ownerFields} onSave={createSaveHandler("Ownership and Management")} />
        <VesselDetailSection title="III. Navigation and Bridge Equipment" fields={navFields} onSave={createSaveHandler("Navigation and Bridge Equipment")} />
        <VesselDetailSection title="IV. Main Engine and Auxiliary Systems" fields={engineFields} onSave={createSaveHandler("Main Engine and Auxiliary Systems")} />
        <VesselDetailSection title="V. Pollution Prevention and Environmental Equipment" fields={pollutionFields} onSave={createSaveHandler("Pollution Prevention and Environmental Equipment")} />
        <VesselDetailSection title="VI. Cargo Handling Equipment (if applicable)" fields={cargoFields} onSave={createSaveHandler("Cargo Handling Equipment")} />
        <VesselDetailSection title="VII. Certifications" fields={certFields} onSave={createSaveHandler("Certifications")} />
        <VesselDetailSection title="VIII. Crew Complement" fields={crewFields} onSave={createSaveHandler("Crew Complement")} />
        <VesselDetailSection title="IX. Dry Docking and Maintenance History" fields={dockingFields} onSave={createSaveHandler("Dry Docking and Maintenance History")} />
        <VesselDetailSection title="X. Documents & Attachments" fields={docFields} onSave={createSaveHandler("Documents & Attachments")} />
      </div>
    </div>
  );
}

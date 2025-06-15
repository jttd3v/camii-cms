
import { useState } from "react";
import ContractPlanner from "@/components/ContractPlanner";
import CrewCard from "@/components/CrewCard";
import { ArrowDown } from "lucide-react";

const CrewRotationTab = () => {
  const [selectedCrewId, setSelectedCrewId] = useState<string | null>(null);
  const [selectedContractId, setSelectedContractId] = useState<string | null>(
    null
  );

  return (
    <div className="flex gap-8">
      <div className="flex-1">
        <ContractPlanner
          onBarClick={(crewId, contractId) => {
            setSelectedCrewId(crewId);
            setSelectedContractId(contractId);
          }}
        />
      </div>
      <div className="flex-1 min-w-[380px] max-w-lg">
        {selectedCrewId ? (
          <CrewCard
            crewId={selectedCrewId}
            selectedContractId={selectedContractId}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[340px] bg-muted/30 rounded-xl border shadow-inner text-muted-foreground text-lg text-center p-4">
            <ArrowDown className="mb-2 mt-3 h-7 w-7 animate-bounce" />
            <span>
              Select a crew member from the timeline to view their full details,
              readiness, and audit logs.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrewRotationTab;

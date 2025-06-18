
import ContractTable from "@/components/ContractTable";
import CrewCard from "@/components/CrewCard";
import VacationSeafarersTable from "@/components/VacationSeafarersTable";
import OnboardSeafarersTable from "@/components/OnboardSeafarersTable";
import AllVesselsTab from "@/components/AllVesselsTab";
import SeafarerApplicationForm from "@/components/SeafarerApplicationForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, QrCode, ArrowDown, Download, Upload } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PIModule from "@/components/PIModule";
import CrewChangeTab from "@/components/CrewChangeTab";
import CrewRotationTab from "@/components/CrewRotationTab";
import DatabaseMigrationButtons from "@/components/DatabaseMigrationButtons";

const Index = () => {
  const [selectedCrewId, setSelectedCrewId] = useState<string | null>(null);
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col px-0 pt-8">
      <header className="flex items-center justify-between mb-6 px-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Contract & Crew Management</h1>
          <p className="text-muted-foreground mt-1">
            Centralized dashboard for contract tracking, compliance, and audit readiness.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline"><FileText className="mr-2 h-4 w-4" /> Export PDF </Button>
          <Button variant="outline"><QrCode className="mr-2 h-4 w-4" /> QR Export</Button>
          <DatabaseMigrationButtons />
        </div>
      </header>
      <main className="flex flex-col gap-8 px-12">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="crew-rotation">Crew Rotation</TabsTrigger>
            <TabsTrigger value="onboard">Onboard Seafarers</TabsTrigger>
            <TabsTrigger value="vacation">Vacation Seafarers</TabsTrigger>
            <TabsTrigger value="vessels">All Vessels</TabsTrigger>
            <TabsTrigger value="crew-change">Crew Change</TabsTrigger>
            <TabsTrigger value="application">Seafarer Application</TabsTrigger>
            <TabsTrigger value="pni">P&I</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <div className="flex gap-8">
              {/* Left: contract table */}
              <div className="flex flex-col gap-6 w-3/5">
                <ContractTable
                  onSelect={(crewId, contractId) => {
                    setSelectedCrewId(crewId);
                    setSelectedContractId(contractId);
                  }}
                  highlightContractId={selectedContractId}
                />
              </div>
              {/* Right: dynamic crew card or placeholder */}
              <div className="flex-1 min-w-[380px] max-w-lg">
                {selectedCrewId ? (
                  <CrewCard crewId={selectedCrewId} selectedContractId={selectedContractId} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full min-h-[340px] bg-muted/30 rounded-xl border shadow-inner text-muted-foreground text-lg text-center p-4">
                    <ArrowDown className="mb-2 mt-3 h-7 w-7 animate-bounce" />
                    <span>
                      Select a crew member or contract to view full details, readiness, and audit logs.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="crew-rotation">
            <CrewRotationTab />
          </TabsContent>
          <TabsContent value="onboard">
            <OnboardSeafarersTable />
          </TabsContent>
          <TabsContent value="vacation">
            <VacationSeafarersTable />
          </TabsContent>
          <TabsContent value="vessels">
            <AllVesselsTab />
          </TabsContent>
          <TabsContent value="crew-change">
            <CrewChangeTab />
          </TabsContent>
          <TabsContent value="application">
            <SeafarerApplicationForm />
          </TabsContent>
          <TabsContent value="pni">
            <PIModule />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;

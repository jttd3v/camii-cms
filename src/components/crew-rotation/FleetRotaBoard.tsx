
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, AlertTriangle, CheckCircle, Plus } from "lucide-react";
import { useFleetRotaBoard } from "@/hooks/useCrewRotation";
import CreateLineupModal from "./CreateLineupModal";
import { getContractStatus } from "@/utils/maritimeDateUtils";
import { addMonths, format, addDays } from "date-fns";

// Generate realistic contract end dates for current crew
const generateRealisticBerths = () => {
  const now = new Date();
  
  return [
    {
      id: "mv-pacific-star",
      name: "MV Pacific Star",
      berths: [
        { 
          position: "Master", 
          current: "Capt. Rodriguez", 
          endDate: format(addMonths(now, 2), "yyyy-MM-dd"), 
          status: getContractStatus(addMonths(now, 2)),
          position_id: "pos-master" 
        },
        { 
          position: "Chief Officer", 
          current: "C/O Martinez", 
          endDate: format(addDays(now, 20), "yyyy-MM-dd"), 
          status: getContractStatus(addDays(now, 20)),
          position_id: "pos-chief-officer" 
        },
        { 
          position: "Chief Engineer", 
          current: "C/E Santos", 
          endDate: format(addMonths(now, 4), "yyyy-MM-dd"), 
          status: getContractStatus(addMonths(now, 4)),
          position_id: "pos-chief-engineer" 
        },
        { 
          position: "2nd Officer", 
          current: "2/O Garcia", 
          endDate: format(addDays(now, 45), "yyyy-MM-dd"), 
          status: getContractStatus(addDays(now, 45)),
          position_id: "pos-2nd-officer" 
        }
      ]
    },
    {
      id: "mv-ocean-explorer",
      name: "MV Ocean Explorer", 
      berths: [
        { 
          position: "Master", 
          current: "Capt. Johnson", 
          endDate: format(addMonths(now, 5), "yyyy-MM-dd"), 
          status: getContractStatus(addMonths(now, 5)),
          position_id: "pos-master" 
        },
        { 
          position: "Chief Officer", 
          current: "C/O Thompson", 
          endDate: format(addDays(now, 35), "yyyy-MM-dd"), 
          status: getContractStatus(addDays(now, 35)),
          position_id: "pos-chief-officer" 
        },
        { 
          position: "Chief Engineer", 
          current: "C/E Wilson", 
          endDate: format(addDays(now, 15), "yyyy-MM-dd"), 
          status: getContractStatus(addDays(now, 15)),
          position_id: "pos-chief-engineer" 
        }
      ]
    }
  ];
};

const FleetRotaBoard = () => {
  const { vessels, loading } = useFleetRotaBoard();
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [showCreateLineup, setShowCreateLineup] = useState(false);
  const [selectedVessel, setSelectedVessel] = useState<string>("");
  const [selectedPositionId, setSelectedPositionId] = useState<string>("");

  // Use realistic berths with current dates
  const mockVessels = generateRealisticBerths();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe": return "bg-green-500";
      case "warning": return "bg-yellow-500"; 
      case "critical": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe": return <CheckCircle className="h-4 w-4" />;
      case "warning": return <Calendar className="h-4 w-4" />;
      case "critical": return <AlertTriangle className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const handleCreateLineup = (vesselId: string, positionId: string) => {
    setSelectedVessel(vesselId);
    setSelectedPositionId(positionId);
    setShowCreateLineup(true);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Fleet Rotation Board - Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Fleet Rotation Board - Safe Manning Heat Map</CardTitle>
          <div className="flex gap-2">
            <Badge className="bg-green-500 text-white">Safe Manning</Badge>
            <Badge className="bg-yellow-500 text-white">Attention Needed</Badge>
            <Badge className="bg-red-500 text-white">Critical</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockVessels.map((vessel) => (
            <div key={vessel.id} className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-4">{vessel.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {vessel.berths.map((berth, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedPosition === `${vessel.id}-${berth.position}` 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedPosition(`${vessel.id}-${berth.position}`)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{berth.position}</span>
                      <Badge className={`${getStatusColor(berth.status)} text-white text-xs`}>
                        {getStatusIcon(berth.status)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">{berth.current}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Contract ends: {berth.endDate}
                    </div>
                    {berth.status === 'critical' && (
                      <Button 
                        size="sm" 
                        className="mt-2 w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCreateLineup(vessel.id, berth.position_id);
                        }}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Create Lineup
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {selectedPosition && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium mb-2">Position Actions</h4>
            <div className="flex gap-2">
              <Button size="sm">Find Replacement</Button>
              <Button size="sm" variant="outline">Extend Contract</Button>
              <Button size="sm" variant="outline">View Candidates</Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  const [vesselId, position] = selectedPosition.split('-');
                  const vessel = mockVessels.find(v => v.id === vesselId);
                  const berth = vessel?.berths.find(b => b.position === position.replace(vesselId + '-', ''));
                  if (berth) {
                    handleCreateLineup(vesselId, berth.position_id);
                  }
                }}
              >
                <Plus className="h-3 w-3 mr-1" />
                Create Lineup
              </Button>
            </div>
          </div>
        )}

        <CreateLineupModal
          open={showCreateLineup}
          onOpenChange={setShowCreateLineup}
          positionId={selectedPositionId}
        />
      </CardContent>
    </Card>
  );
};

export default FleetRotaBoard;

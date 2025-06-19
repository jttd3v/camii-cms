
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, AlertTriangle, CheckCircle } from "lucide-react";

// Mock data for fleet rotation
const mockVessels = [
  {
    id: "mv-pacific-star",
    name: "MV Pacific Star",
    berths: [
      { position: "Master", current: "Capt. Rodriguez", endDate: "2024-07-15", status: "safe" },
      { position: "Chief Officer", current: "C/O Martinez", endDate: "2024-06-25", status: "critical" },
      { position: "Chief Engineer", current: "C/E Santos", endDate: "2024-08-10", status: "safe" },
      { position: "2nd Officer", current: "2/O Garcia", endDate: "2024-07-01", status: "warning" }
    ]
  },
  {
    id: "mv-ocean-explorer", 
    name: "MV Ocean Explorer",
    berths: [
      { position: "Master", current: "Capt. Johnson", endDate: "2024-08-20", status: "safe" },
      { position: "Chief Officer", current: "C/O Thompson", endDate: "2024-06-30", status: "warning" },
      { position: "Chief Engineer", current: "C/E Wilson", endDate: "2024-07-05", status: "critical" }
    ]
  }
];

const FleetRotaBoard = () => {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

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
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FleetRotaBoard;

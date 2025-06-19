
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plane, Hotel, FileCheck, Clock } from "lucide-react";
import { generateRealisticMobilisationDate } from "@/utils/maritimeDateUtils";
import { format, addDays, subDays } from "date-fns";

// Generate realistic mobilisation data
const generateMockMobilisations = () => {
  const mob1Dates = generateRealisticMobilisationDate();
  const mob2Dates = generateRealisticMobilisationDate();
  
  return [
    {
      id: "MOB-2024-001",
      seafarer: "C/O Antonio Reyes",
      vessel: "MV Pacific Star",
      departure: mob1Dates.departure,
      joinDate: mob1Dates.joinDate,
      homePort: "Manila",
      joinPort: "Singapore",
      status: "In Progress",
      travel: {
        flight: `PR508 - Manila to Singapore (${format(new Date(mob1Dates.departure), 'dd-MMM')} 14:30)`,
        hotel: `Marina Bay Hotel (${format(subDays(new Date(mob1Dates.joinDate), 1), 'dd-MMM')} night)`,
        visa: "Singapore Visa - Valid",
        okToBoard: "Pending Medical"
      },
      restHours: {
        lastWorkPeriod: format(subDays(new Date(), 10), 'yyyy-MM-dd HH:mm'),
        minimumRest: "72 hours",
        actualRest: "240 hours",
        status: "Compliant"
      }
    },
    {
      id: "MOB-2024-002",
      seafarer: "2/E Maria Santos", 
      vessel: "MV Ocean Explorer",
      departure: mob2Dates.departure,
      joinDate: mob2Dates.joinDate,
      homePort: "Cebu",
      joinPort: "Dubai",
      status: "Planning",
      travel: {
        flight: "To be booked",
        hotel: "To be arranged",
        visa: "UAE Visa - In Process",
        okToBoard: "Documents Complete"
      },
      restHours: {
        lastWorkPeriod: format(subDays(new Date(), 18), 'yyyy-MM-dd HH:mm'),
        minimumRest: "72 hours", 
        actualRest: "432 hours",
        status: "Compliant"
      }
    }
  ];
};

const MobilisationHub = () => {
  const [selectedMob, setSelectedMob] = useState<string | null>(null);
  const mockMobilisations = generateMockMobilisations();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "compliant": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "non-compliant": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mobilisation & Travel Hub</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockMobilisations.map((mob) => (
            <div key={mob.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-lg">{mob.id}</h3>
                  <p className="text-sm text-gray-600">
                    {mob.seafarer} → {mob.vessel}
                  </p>
                </div>
                <Badge className={`${getStatusColor(mob.status)} text-white`}>
                  {mob.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <span className="font-medium">From:</span> {mob.homePort}
                </div>
                <div>
                  <span className="font-medium">To:</span> {mob.joinPort}
                </div>
                <div>
                  <span className="font-medium">Departure:</span> {mob.departure}
                </div>
                <div>
                  <span className="font-medium">Join Date:</span> {mob.joinDate}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* Travel Details */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    Travel Arrangements
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Plane className="h-3 w-3 text-gray-400" />
                      <span>{mob.travel.flight}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Hotel className="h-3 w-3 text-gray-400" />
                      <span>{mob.travel.hotel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-3 w-3 text-gray-400" />
                      <span>{mob.travel.visa}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={mob.travel.okToBoard.includes("Pending") ? "bg-yellow-500" : "bg-green-500"}
                      >
                        {mob.travel.okToBoard}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Rest Hours Calculator */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Rest Hours Analysis
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Last Work Period:</span> {mob.restHours.lastWorkPeriod}
                    </div>
                    <div>
                      <span className="font-medium">Minimum Required:</span> {mob.restHours.minimumRest}
                    </div>
                    <div>
                      <span className="font-medium">Actual Rest:</span> {mob.restHours.actualRest}
                    </div>
                    <Badge className={`${getStatusColor(mob.restHours.status)} text-white`}>
                      {mob.restHours.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm">
                  <Plane className="h-4 w-4 mr-2" />
                  Book Flight
                </Button>
                <Button size="sm" variant="outline">
                  <Hotel className="h-4 w-4 mr-2" />
                  Reserve Hotel
                </Button>
                <Button size="sm" variant="outline">
                  Update Travel
                </Button>
                <Button size="sm" variant="outline">
                  Send Itinerary
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MobilisationHub;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plane } from "lucide-react";

interface CrewChangeTravelLogisticsProps {
  formData: {
    flightDetails: string;
    accommodation: string;
    transportation: string;
    travelAgent: string;
  };
  onFormDataChange: (updates: Partial<typeof formData>) => void;
}

const CrewChangeTravelLogistics = ({ formData, onFormDataChange }: CrewChangeTravelLogisticsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className="h-4 w-4" />
          Travel Logistics
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="flightDetails">Flight Details</Label>
          <Textarea
            id="flightDetails"
            placeholder="Flight numbers, departure/arrival times, etc."
            value={formData.flightDetails}
            onChange={(e) => onFormDataChange({ flightDetails: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="accommodation">Accommodation</Label>
          <Textarea
            id="accommodation"
            placeholder="Hotel details, addresses, contact information"
            value={formData.accommodation}
            onChange={(e) => onFormDataChange({ accommodation: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="transportation">Local Transportation</Label>
          <Textarea
            id="transportation"
            placeholder="Airport transfers, local transport arrangements"
            value={formData.transportation}
            onChange={(e) => onFormDataChange({ transportation: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="travelAgent">Travel Agent</Label>
          <Input
            id="travelAgent"
            placeholder="Travel agent contact details"
            value={formData.travelAgent}
            onChange={(e) => onFormDataChange({ travelAgent: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CrewChangeTravelLogistics;

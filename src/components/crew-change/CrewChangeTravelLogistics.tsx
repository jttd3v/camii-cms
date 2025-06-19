
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CrewChangeTravelLogisticsProps {
  formData: any;
  setFormData: (data: any) => void;
}

const CrewChangeTravelLogistics = ({ formData, setFormData }: CrewChangeTravelLogisticsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Travel Logistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="flightDetails">Flight Details</Label>
            <Textarea
              id="flightDetails"
              placeholder="Enter flight information..."
              value={formData.flightDetails || ''}
              onChange={(e) => setFormData({...formData, flightDetails: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="accommodation">Accommodation</Label>
            <Textarea
              id="accommodation"
              placeholder="Enter accommodation details..."
              value={formData.accommodation || ''}
              onChange={(e) => setFormData({...formData, accommodation: e.target.value})}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="transport">Local Transport</Label>
          <Input
            id="transport"
            placeholder="Transportation arrangements..."
            value={formData.transport || ''}
            onChange={(e) => setFormData({...formData, transport: e.target.value})}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CrewChangeTravelLogistics;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CrewChangeBasicInfoProps {
  formData: any;
  setFormData: (data: any) => void;
}

const CrewChangeBasicInfo = ({ formData, setFormData }: CrewChangeBasicInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="vessel">Vessel</Label>
            <Select 
              value={formData.vessel} 
              onValueChange={(value) => setFormData({...formData, vessel: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select vessel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mv-pacific-star">MV Pacific Star</SelectItem>
                <SelectItem value="mv-ocean-explorer">MV Ocean Explorer</SelectItem>
                <SelectItem value="mv-atlantic-voyager">MV Atlantic Voyager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="proposedDate">Proposed Date</Label>
            <Input
              id="proposedDate"
              type="date"
              value={formData.proposedDate}
              onChange={(e) => setFormData({...formData, proposedDate: e.target.value})}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="port">Port</Label>
          <Select 
            value={formData.port} 
            onValueChange={(value) => setFormData({...formData, port: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select port" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manila">Manila</SelectItem>
              <SelectItem value="singapore">Singapore</SelectItem>
              <SelectItem value="dubai">Dubai</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrewChangeBasicInfo;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ship } from "lucide-react";

interface CrewChangeBasicInfoProps {
  formData: {
    vessel: string;
    proposedDate: string;
    port: string;
  };
  onFormDataChange: (updates: Partial<typeof formData>) => void;
}

const CrewChangeBasicInfo = ({ formData, onFormDataChange }: CrewChangeBasicInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ship className="h-4 w-4" />
          Basic Information
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="vessel">Vessel</Label>
          <Select 
            value={formData.vessel} 
            onValueChange={(value) => onFormDataChange({ vessel: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select vessel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MV Pacific Star">MV Pacific Star</SelectItem>
              <SelectItem value="MV Ocean Explorer">MV Ocean Explorer</SelectItem>
              <SelectItem value="MV Atlantic Voyager">MV Atlantic Voyager</SelectItem>
              <SelectItem value="MV Global Trader">MV Global Trader</SelectItem>
              <SelectItem value="MV Cebu Express">MV Cebu Express</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="proposedDate">Proposed Date</Label>
          <Input
            id="proposedDate"
            type="date"
            value={formData.proposedDate}
            onChange={(e) => onFormDataChange({ proposedDate: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="port">Port/Location</Label>
          <Select 
            value={formData.port} 
            onValueChange={(value) => onFormDataChange({ port: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select port" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Manila">Manila</SelectItem>
              <SelectItem value="Cebu">Cebu</SelectItem>
              <SelectItem value="Davao">Davao</SelectItem>
              <SelectItem value="Subic">Subic</SelectItem>
              <SelectItem value="Batangas">Batangas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrewChangeBasicInfo;

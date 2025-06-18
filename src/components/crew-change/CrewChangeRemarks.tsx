
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface CrewChangeRemarksProps {
  remarks: string;
  onRemarksChange: (remarks: string) => void;
}

const CrewChangeRemarks = ({ remarks, onRemarksChange }: CrewChangeRemarksProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Remarks/Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Additional notes, special requirements, or instructions"
          value={remarks}
          onChange={(e) => onRemarksChange(e.target.value)}
          rows={4}
        />
      </CardContent>
    </Card>
  );
};

export default CrewChangeRemarks;

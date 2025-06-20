
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import EditableSection from "./EditableSection";
import { Button } from "./ui/button";

type Field = {
  label: string;
  value: string;
  key: string;
};

interface VesselSummaryCardProps {
  fields: Field[];
  onViewCrewClick: () => void;
  isCrewListVisible: boolean;
  onSave?: (fields: { [key: string]: string }) => void;
}

export default function VesselSummaryCard({ fields, onViewCrewClick, isCrewListVisible, onSave }: VesselSummaryCardProps) {
  return (
    <Card id="VesselCard" className="mb-6">
      <CardHeader>
        <EditableSection title="" fields={fields} onSave={onSave} />
      </CardHeader>
      <CardFooter>
        <Button onClick={onViewCrewClick} variant="secondary">
          {isCrewListVisible ? 'Hide Crew List' : 'View Crew List'}
        </Button>
      </CardFooter>
    </Card>
  );
}


import { Card, CardHeader } from "@/components/ui/card";
import EditableSection from "./EditableSection";

type Field = {
  label: string;
  value: string;
  key: string;
};

interface VesselSummaryCardProps {
  fields: Field[];
}

export default function VesselSummaryCard({ fields }: VesselSummaryCardProps) {
  return (
    <Card id="VesselCard" className="mb-6">
      <CardHeader>
        <EditableSection title="" fields={fields} />
      </CardHeader>
    </Card>
  );
}

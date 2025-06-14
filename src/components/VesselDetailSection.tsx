
import EditableSection from "./EditableSection";

type Field = {
  label: string;
  value: string;
  key: string;
};

interface VesselDetailSectionProps {
  title: string;
  fields: Field[];
}

export default function VesselDetailSection({ title, fields }: VesselDetailSectionProps) {
  return (
    <EditableSection title={title} fields={fields} />
  );
}

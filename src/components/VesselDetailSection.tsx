
import EditableSection from "./EditableSection";

type Field = {
  label: string;
  value: string;
  key: string;
};

interface VesselDetailSectionProps {
  title: string;
  fields: Field[];
  onSave?: (fields: { [key: string]: string }) => void;
}

export default function VesselDetailSection({ title, fields, onSave }: VesselDetailSectionProps) {
  return (
    <EditableSection title={title} fields={fields} onSave={onSave} />
  );
}

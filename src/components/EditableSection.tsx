
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Field = {
  label: string;
  value: string;
  key: string;
};

interface EditableSectionProps {
  title: string;
  fields: Field[];
  onSave?: (fields: { [key: string]: string }) => void;
  lastEditor?: string;
  lastEditedAt?: Date | null;
}

export default function EditableSection({
  title,
  fields,
  onSave,
  lastEditor,
  lastEditedAt,
}: EditableSectionProps) {
  const [editing, setEditing] = useState(false);
  const [fieldState, setFieldState] = useState(
    () =>
      Object.fromEntries(fields.map(f => [f.key, f.value])) as {
        [key: string]: string;
      }
  );
  const [editor, setEditor] = useState(lastEditor || "Admin");
  const [editedAt, setEditedAt] = useState<Date | null>(
    lastEditedAt || null
  );

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setFieldState({ ...fieldState, [key]: e.target.value });
  };

  const handleEdit = () => setEditing(true);

  const handleSave = () => {
    setEditing(false);
    setEditor("Admin");
    setEditedAt(new Date());
    onSave && onSave(fieldState);
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex items-center gap-2">
          {editing ? (
            <Button size="sm" className="border-green-600 text-green-800" variant="outline" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button
              size="sm"
              className="border-red-600 text-red-800"
              variant="outline"
              onClick={handleEdit}
            >
              Edit
            </Button>
          )}
          <span
            className="text-xs px-3 py-1 border rounded-lg ml-1"
            style={{
              borderColor: "green",
              color: "#127035",
              background: "#f3faf3",
              fontWeight: "500",
              minWidth: 180,
              textAlign: "center",
            }}
          >
            Edited by ({editor}){" "}
            {editedAt
              ? "(" +
                editedAt
                  .toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }) +
                ")"
              : ""}
          </span>
        </div>
      </div>
      <div className="bg-muted/40 rounded-lg p-5 grid md:grid-cols-2 gap-2">
        {fields.map(({ label, key }) => (
          <div key={key}>
            <strong>{label}</strong>{" "}
            {editing ? (
              <Input
                value={fieldState[key]}
                onChange={e => handleFieldChange(e, key)}
                className="inline w-[70%] max-w-sm"
                placeholder="Enter value"
              />
            ) : fieldState[key] ? (
              fieldState[key]
            ) : (
              <span className="italic text-muted-foreground">[Not Set]</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

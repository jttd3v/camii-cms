
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditHistory {
  user: string;
  date: string; // ISO string
}

interface EditableSectionProps {
  label: string;
  value: string;
  type?: "text" | "textarea";
  onSave: (newValue: string, editHistory: EditHistory) => void;
  lastEditedBy?: string;
  lastEditedAt?: string;
}

export default function EditableSection({
  label,
  value,
  type = "text",
  onSave,
  lastEditedBy,
  lastEditedAt,
}: EditableSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [newValue, setNewValue] = useState(value);

  const handleEditClick = () => {
    // If not authenticated, open auth modal
    if (!authSuccess) {
      setAuthOpen(true);
    } else {
      setIsEditing(true);
      setNewValue(value);
    }
  };

  const handleAuthSuccess = (userId: string) => {
    setAuthSuccess(userId);
    setIsEditing(true);
    setAuthOpen(false);
    setNewValue(value);
  };

  const handleSave = () => {
    onSave(newValue, {
      user: authSuccess || "unknown",
      date: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewValue(value);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border p-4 mb-2 shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="font-semibold">{label}:</label>
        {isEditing ? null : (
          <Button size="sm" variant="outline" onClick={handleEditClick}>
            Edit
          </Button>
        )}
      </div>
      {isEditing ? (
        <div className="flex flex-col gap-2">
          {type === "textarea" ? (
            <Textarea
              value={newValue}
              onChange={e => setNewValue(e.target.value)}
              rows={3}
            />
          ) : (
            <Input
              value={newValue}
              onChange={e => setNewValue(e.target.value)}
            />
          )}
          <div className="flex gap-2 justify-end">
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-muted-foreground break-words min-h-[24px]">
          {value}
        </div>
      )}
      <div className="mt-2 text-xs text-gray-500">
        {lastEditedBy && lastEditedAt ? (
          <>Last edited by <b>{lastEditedBy}</b> at {new Date(lastEditedAt).toLocaleString()}</>
        ) : (
          <>Not yet edited</>
        )}
      </div>
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}

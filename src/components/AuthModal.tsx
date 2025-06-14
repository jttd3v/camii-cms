
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (username: string) => void;
}

const DUMMY_ID = "admin";
const DUMMY_PW = "adminedit";

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, onSuccess }) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (id === DUMMY_ID && pw === DUMMY_PW) {
      setError("");
      onSuccess(id);
      setId("");
      setPw("");
    } else {
      setError("Invalid credentials.");
    }
  }

  function handleClose() {
    setId("");
    setPw("");
    setError("");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={v => !v && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Authentication Required
          </DialogTitle>
        </DialogHeader>
        <div className="mb-2 text-sm text-red-600 font-semibold">
          Editing the data is very serious! Please authenticate to proceed.
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-medium">ID</label>
            <Input
              type="text"
              value={id}
              onChange={e => setId(e.target.value)}
              required
              autoFocus
              data-testid="login-id"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              required
              data-testid="login-pw"
            />
          </div>
          {error && (
            <div className="text-xs text-red-600">{error}</div>
          )}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Authenticate
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

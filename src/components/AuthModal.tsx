
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuthSuccess: (userId: string) => void;
}

const DUMMY_ID = "admin";
const DUMMY_PW = "adminedit";

export default function AuthModal({ open, onClose, onAuthSuccess }: AuthModalProps) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === DUMMY_ID && pw === DUMMY_PW) {
      onAuthSuccess(id);
      setId("");
      setPw("");
      setError(null);
      onClose();
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <Dialog open={open} onOpenChange={open ? onClose : undefined}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Admin Authentication</DialogTitle>
          <DialogDescription>
            Please enter your admin ID and password to proceed.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4 mt-2">
          <Input
            placeholder="Admin ID"
            value={id}
            onChange={e => setId(e.target.value)}
            autoFocus
          />
          <Input
            placeholder="Password"
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
          />
          {error && <div className="text-sm text-red-500">{error}</div>}
          <DialogFooter>
            <Button type="submit">Log in</Button>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

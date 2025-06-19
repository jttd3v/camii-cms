
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLineupApprovals } from "@/hooks/useCrewRotation";

interface CreateLineupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seafarerId?: string;
  positionId?: string;
}

const CreateLineupModal = ({ open, onOpenChange, seafarerId, positionId }: CreateLineupModalProps) => {
  const { createLineup } = useLineupApprovals();
  const [formData, setFormData] = useState({
    vessel_id: "",
    position_id: positionId || "",
    seafarer_id: seafarerId || "",
    requested_by: "current-user", // In real app, get from auth context
    request_date: new Date().toISOString().split('T')[0],
    proposed_join_date: "",
    priority: "medium" as const,
    comments: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLineup({
        vessel_id: formData.vessel_id,
        position_id: formData.position_id,
        seafarer_id: formData.seafarer_id,
        requested_by: formData.requested_by,
        request_date: formData.request_date,
        proposed_join_date: formData.proposed_join_date,
        status: "pending",
        priority: formData.priority
      });
      console.log("Lineup request created successfully");
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating lineup request:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Lineup Request</DialogTitle>
          <DialogDescription>
            Submit a new crew lineup request for approval.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="vessel">Vessel</Label>
            <Select 
              value={formData.vessel_id} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, vessel_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select vessel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vessel-1">MV Pacific Star</SelectItem>
                <SelectItem value="vessel-2">MV Ocean Explorer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="position">Position</Label>
            <Select 
              value={formData.position_id} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, position_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pos-master">Master</SelectItem>
                <SelectItem value="pos-chief-officer">Chief Officer</SelectItem>
                <SelectItem value="pos-chief-engineer">Chief Engineer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="seafarer">Seafarer</Label>
            <Select 
              value={formData.seafarer_id} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, seafarer_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select seafarer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seafarer-1">Antonio Reyes</SelectItem>
                <SelectItem value="seafarer-2">Maria Santos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="joinDate">Proposed Join Date</Label>
            <Input
              id="joinDate"
              type="date"
              value={formData.proposed_join_date}
              onChange={(e) => setFormData(prev => ({ ...prev, proposed_join_date: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select 
              value={formData.priority} 
              onValueChange={(value: "low" | "medium" | "high" | "critical") => 
                setFormData(prev => ({ ...prev, priority: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="comments">Comments</Label>
            <Textarea
              id="comments"
              placeholder="Additional comments or requirements..."
              value={formData.comments}
              onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Lineup Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLineupModal;


import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CrewChangeBasicInfo from "./crew-change/CrewChangeBasicInfo";
import CrewChangeSeafarerSelection from "./crew-change/CrewChangeSeafarerSelection";
import CrewChangeTravelLogistics from "./crew-change/CrewChangeTravelLogistics";
import CrewChangeDocumentUpload from "./crew-change/CrewChangeDocumentUpload";
import CrewChangeRemarks from "./crew-change/CrewChangeRemarks";

interface AddCrewChangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SeafarerEntry {
  id: string;
  selectedSeafarer: any;
  searchValue: string;
}

const AddCrewChangeModal = ({ open, onOpenChange }: AddCrewChangeModalProps) => {
  const [formData, setFormData] = useState({
    vessel: "",
    proposedDate: "",
    port: "",
    flightDetails: "",
    accommodation: "",
    transportation: "",
    travelAgent: "",
    remarks: ""
  });

  const [onSigners, setOnSigners] = useState<SeafarerEntry[]>([
    { id: "on-1", selectedSeafarer: null, searchValue: "" }
  ]);
  
  const [offSigners, setOffSigners] = useState<SeafarerEntry[]>([
    { id: "off-1", selectedSeafarer: null, searchValue: "" }
  ]);

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const addOnSigner = () => {
    const newId = `on-${Date.now()}`;
    setOnSigners([...onSigners, { id: newId, selectedSeafarer: null, searchValue: "" }]);
  };

  const addOffSigner = () => {
    const newId = `off-${Date.now()}`;
    setOffSigners([...offSigners, { id: newId, selectedSeafarer: null, searchValue: "" }]);
  };

  const removeOnSigner = (id: string) => {
    if (onSigners.length > 1) {
      setOnSigners(onSigners.filter(signer => signer.id !== id));
    }
  };

  const removeOffSigner = (id: string) => {
    if (offSigners.length > 1) {
      setOffSigners(offSigners.filter(signer => signer.id !== id));
    }
  };

  const updateOnSigner = (id: string, crew: any) => {
    setOnSigners(onSigners.map(signer => 
      signer.id === id 
        ? { ...signer, selectedSeafarer: crew, searchValue: `${crew.firstName} ${crew.lastName}` }
        : signer
    ));
  };

  const updateOffSigner = (id: string, crew: any) => {
    setOffSigners(offSigners.map(signer => 
      signer.id === id 
        ? { ...signer, selectedSeafarer: crew, searchValue: `${crew.firstName} ${crew.lastName}` }
        : signer
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", {
      formData,
      onSigners: onSigners.filter(s => s.selectedSeafarer),
      offSigners: offSigners.filter(s => s.selectedSeafarer)
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Crew Change</DialogTitle>
          <DialogDescription>
            Create a new crew change request with all necessary details and documentation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <CrewChangeBasicInfo 
            formData={formData}
            onFormDataChange={handleFormDataChange}
          />

          <CrewChangeSeafarerSelection
            onSigners={onSigners}
            offSigners={offSigners}
            onAddOnSigner={addOnSigner}
            onAddOffSigner={addOffSigner}
            onRemoveOnSigner={removeOnSigner}
            onRemoveOffSigner={removeOffSigner}
            onUpdateOnSigner={updateOnSigner}
            onUpdateOffSigner={updateOffSigner}
          />

          <CrewChangeTravelLogistics 
            formData={formData}
            onFormDataChange={handleFormDataChange}
          />

          <CrewChangeDocumentUpload />

          <CrewChangeRemarks 
            remarks={formData.remarks}
            onRemarksChange={(remarks) => handleFormDataChange({ remarks })}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Crew Change
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCrewChangeModal;

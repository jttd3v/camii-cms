
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CrewSearch } from "./CrewSearch";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Ship, MapPin, Plane, Upload, AlertTriangle, Plus, X } from "lucide-react";

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

  const renderSeafarerDetails = (seafarer: any, type: "on" | "off") => {
    if (!seafarer) return null;

    const mockDocuments = {
      passport: { expiry: "2025-12-15", status: "valid" },
      visa: { expiry: "2024-08-30", status: "warning" },
      medical: { expiry: "2024-07-20", status: "warning" },
      stcw: { expiry: "2025-03-10", status: "valid" }
    };

    return (
      <Card className="mt-3">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Seafarer Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Name:</span> {seafarer.firstName} {seafarer.lastName}
            </div>
            <div>
              <span className="font-medium">Rank:</span> {seafarer.rank}
            </div>
            <div>
              <span className="font-medium">Nationality:</span> {seafarer.nationality}
            </div>
            <div>
              <span className="font-medium">Experience:</span> {seafarer.experience}
            </div>
          </div>
          
          <div>
            <div className="font-medium text-sm mb-2">Document Status:</div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(mockDocuments).map(([doc, info]) => (
                <div key={doc} className="flex items-center justify-between text-xs">
                  <span className="capitalize">{doc}:</span>
                  <div className="flex items-center gap-1">
                    <span>{info.expiry}</span>
                    {info.status === "valid" ? (
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                    ) : (
                      <AlertTriangle className="h-3 w-3 text-orange-500 cursor-pointer" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
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
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ship className="h-4 w-4" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="vessel">Vessel</Label>
                <Select value={formData.vessel} onValueChange={(value) => setFormData(prev => ({...prev, vessel: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vessel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MV Pacific Star">MV Pacific Star</SelectItem>
                    <SelectItem value="MV Ocean Explorer">MV Ocean Explorer</SelectItem>
                    <SelectItem value="MV Atlantic Voyager">MV Atlantic Voyager</SelectItem>
                    <SelectItem value="MV Global Trader">MV Global Trader</SelectItem>
                    <SelectItem value="MV Cebu Express">MV Cebu Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="proposedDate">Proposed Date</Label>
                <Input
                  id="proposedDate"
                  type="date"
                  value={formData.proposedDate}
                  onChange={(e) => setFormData(prev => ({...prev, proposedDate: e.target.value}))}
                />
              </div>

              <div>
                <Label htmlFor="port">Port/Location</Label>
                <Select value={formData.port} onValueChange={(value) => setFormData(prev => ({...prev, port: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select port" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manila">Manila</SelectItem>
                    <SelectItem value="Cebu">Cebu</SelectItem>
                    <SelectItem value="Davao">Davao</SelectItem>
                    <SelectItem value="Subic">Subic</SelectItem>
                    <SelectItem value="Batangas">Batangas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Seafarer Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Seafarer Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* On-Signers Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">On-Signers (Joining)</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addOnSigner}>
                      <Plus className="h-3 w-3 mr-1" />
                      Add On-Signer
                    </Button>
                  </div>
                  
                  {onSigners.map((signer, index) => (
                    <div key={signer.id} className="relative border rounded-lg p-4 space-y-3">
                      {onSigners.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0"
                          onClick={() => removeOnSigner(signer.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                      
                      <Label>On-Signer {index + 1}</Label>
                      <CrewSearch
                        value={signer.searchValue}
                        onSelect={(crew) => updateOnSigner(signer.id, crew)}
                      />
                      {renderSeafarerDetails(signer.selectedSeafarer, "on")}
                    </div>
                  ))}
                </div>

                {/* Off-Signers Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Off-Signers (Leaving)</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addOffSigner}>
                      <Plus className="h-3 w-3 mr-1" />
                      Add Off-Signer
                    </Button>
                  </div>
                  
                  {offSigners.map((signer, index) => (
                    <div key={signer.id} className="relative border rounded-lg p-4 space-y-3">
                      {offSigners.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0"
                          onClick={() => removeOffSigner(signer.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                      
                      <Label>Off-Signer {index + 1}</Label>
                      <CrewSearch
                        value={signer.searchValue}
                        onSelect={(crew) => updateOffSigner(signer.id, crew)}
                      />
                      {renderSeafarerDetails(signer.selectedSeafarer, "off")}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Travel Logistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-4 w-4" />
                Travel Logistics
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="flightDetails">Flight Details</Label>
                <Textarea
                  id="flightDetails"
                  placeholder="Flight numbers, departure/arrival times, etc."
                  value={formData.flightDetails}
                  onChange={(e) => setFormData(prev => ({...prev, flightDetails: e.target.value}))}
                />
              </div>

              <div>
                <Label htmlFor="accommodation">Accommodation</Label>
                <Textarea
                  id="accommodation"
                  placeholder="Hotel details, addresses, contact information"
                  value={formData.accommodation}
                  onChange={(e) => setFormData(prev => ({...prev, accommodation: e.target.value}))}
                />
              </div>

              <div>
                <Label htmlFor="transportation">Local Transportation</Label>
                <Textarea
                  id="transportation"
                  placeholder="Airport transfers, local transport arrangements"
                  value={formData.transportation}
                  onChange={(e) => setFormData(prev => ({...prev, transportation: e.target.value}))}
                />
              </div>

              <div>
                <Label htmlFor="travelAgent">Travel Agent</Label>
                <Input
                  id="travelAgent"
                  placeholder="Travel agent contact details"
                  value={formData.travelAgent}
                  onChange={(e) => setFormData(prev => ({...prev, travelAgent: e.target.value}))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Document Uploads */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Document Uploads
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drop files here or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Flight itineraries, visa approvals, etc.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Remarks */}
          <Card>
            <CardHeader>
              <CardTitle>Remarks/Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Additional notes, special requirements, or instructions"
                value={formData.remarks}
                onChange={(e) => setFormData(prev => ({...prev, remarks: e.target.value}))}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
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

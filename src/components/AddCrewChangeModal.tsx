
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
import { CalendarDays, Ship, MapPin, Plane, Upload, AlertTriangle } from "lucide-react";

interface AddCrewChangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddCrewChangeModal = ({ open, onOpenChange }: AddCrewChangeModalProps) => {
  const [formData, setFormData] = useState({
    vessel: "",
    proposedDate: "",
    port: "",
    onSigner: "",
    offSigner: "",
    flightDetails: "",
    accommodation: "",
    transportation: "",
    travelAgent: "",
    remarks: ""
  });

  const [selectedOnSigner, setSelectedOnSigner] = useState(null);
  const [selectedOffSigner, setSelectedOffSigner] = useState(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    onOpenChange(false);
  };

  const renderSeafarerDetails = (seafarer: any, type: "on" | "off") => {
    if (!seafarer) return null;

    // Mock document data for demonstration
    const mockDocuments = {
      passport: { expiry: "2025-12-15", status: "valid" },
      visa: { expiry: "2024-08-30", status: "warning" },
      medical: { expiry: "2024-07-20", status: "warning" },
      stcw: { expiry: "2025-03-10", status: "valid" }
    };

    return (
      <Card className="mt-3">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">{type === "on" ? "On-Signer" : "Off-Signer"} Details</CardTitle>
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
                    {info.status === "warning" && <AlertTriangle className="h-3 w-3 text-orange-500" />}
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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

          {/* Seafarer Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Seafarer Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>On-Signer (Joining)</Label>
                  <CrewSearch
                    value={formData.onSigner}
                    onSelect={(crew) => {
                      setSelectedOnSigner(crew);
                      setFormData(prev => ({...prev, onSigner: `${crew.firstName} ${crew.lastName}`}));
                    }}
                  />
                  {renderSeafarerDetails(selectedOnSigner, "on")}
                </div>

                <div>
                  <Label>Off-Signer (Leaving)</Label>
                  <CrewSearch
                    value={formData.offSigner}
                    onSelect={(crew) => {
                      setSelectedOffSigner(crew);
                      setFormData(prev => ({...prev, offSigner: `${crew.firstName} ${crew.lastName}`}));
                    }}
                  />
                  {renderSeafarerDetails(selectedOffSigner, "off")}
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

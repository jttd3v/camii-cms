
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarDays, Plus, X } from "lucide-react";
import { CrewSearch } from "@/components/CrewSearch";
import SeafarerDetailsCard from "./SeafarerDetailsCard";

interface SeafarerEntry {
  id: string;
  selectedSeafarer: any;
  searchValue: string;
}

interface CrewChangeSeafarerSelectionProps {
  onSigners: SeafarerEntry[];
  offSigners: SeafarerEntry[];
  onAddOnSigner: () => void;
  onAddOffSigner: () => void;
  onRemoveOnSigner: (id: string) => void;
  onRemoveOffSigner: (id: string) => void;
  onUpdateOnSigner: (id: string, crew: any) => void;
  onUpdateOffSigner: (id: string, crew: any) => void;
}

const CrewChangeSeafarerSelection = ({
  onSigners,
  offSigners,
  onAddOnSigner,
  onAddOffSigner,
  onRemoveOnSigner,
  onRemoveOffSigner,
  onUpdateOnSigner,
  onUpdateOffSigner
}: CrewChangeSeafarerSelectionProps) => {
  return (
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
              <Button type="button" variant="outline" size="sm" onClick={onAddOnSigner}>
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
                    onClick={() => onRemoveOnSigner(signer.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
                
                <Label>On-Signer {index + 1}</Label>
                <CrewSearch
                  value={signer.searchValue}
                  onSelect={(crew) => onUpdateOnSigner(signer.id, crew)}
                />
                <SeafarerDetailsCard seafarer={signer.selectedSeafarer} />
              </div>
            ))}
          </div>

          {/* Off-Signers Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Off-Signers (Leaving)</Label>
              <Button type="button" variant="outline" size="sm" onClick={onAddOffSigner}>
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
                    onClick={() => onRemoveOffSigner(signer.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
                
                <Label>Off-Signer {index + 1}</Label>
                <CrewSearch
                  value={signer.searchValue}
                  onSelect={(crew) => onUpdateOffSigner(signer.id, crew)}
                />
                <SeafarerDetailsCard seafarer={signer.selectedSeafarer} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrewChangeSeafarerSelection;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface SeafarerDetailsCardProps {
  seafarer: any;
}

const SeafarerDetailsCard = ({ seafarer }: SeafarerDetailsCardProps) => {
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

export default SeafarerDetailsCard;

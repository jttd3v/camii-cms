
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, XCircle, ExternalLink } from "lucide-react";

// Mock compliance data
const mockComplianceData = {
  expiringDocuments: [
    {
      seafarer: "Juan Dela Cruz",
      rank: "Chief Engineer",
      document: "Passport",
      expiryDate: "2024-07-15",
      urgency: "30-60 days",
      vessel: "MV Pacific Star"
    },
    {
      seafarer: "Maria Garcia", 
      rank: "2nd Officer",
      document: "Medical Certificate",
      expiryDate: "2024-06-25",
      urgency: "<30 days",
      vessel: "MV Ocean Explorer"
    },
    {
      seafarer: "Pedro Santos",
      rank: "Chief Engineer", 
      document: "STCW Certificate",
      expiryDate: "2024-06-20",
      urgency: "Overdue",
      vessel: "MV Atlantic Voyager"
    }
  ],
  pendingVisas: [
    {
      seafarer: "Roberto Cruz",
      rank: "Bosun",
      nationality: "Filipino",
      route: "USA - Philippines",
      requirement: "US Transit Visa",
      status: "Application Submitted",
      vessel: "MV Global Trader"
    },
    {
      seafarer: "Miguel Torres",
      rank: "Bosun", 
      nationality: "Filipino",
      route: "Europe - Philippines",
      requirement: "Schengen Visa", 
      status: "Documents Required",
      vessel: "MV Cebu Express"
    }
  ],
  predepartureChecklist: [
    {
      crewChangeId: "CC-2024-006",
      seafarer: "Carlos Reyes",
      rank: "2nd Officer",
      vessel: "MV Pacific Star",
      checklistItems: {
        medicalCheckup: "Completed",
        visaVerification: "Pending",
        travelInsurance: "Completed", 
        flightBooking: "Pending",
        briefing: "Not Started"
      }
    }
  ]
};

const CrewChangeCompliance = () => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Overdue": return "bg-red-500";
      case "<30 days": return "bg-orange-500";
      case "30-60 days": return "bg-yellow-500";
      default: return "bg-blue-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500";
      case "Pending": return "bg-yellow-500";
      case "Not Started": return "bg-gray-500";
      case "Application Submitted": return "bg-blue-500";
      case "Documents Required": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Expiring Documents */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <AlertTriangle className="h-5 w-5" />
            Expiring Seafarer Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockComplianceData.expiringDocuments.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-orange-50">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium">{item.seafarer}</div>
                      <div className="text-sm text-muted-foreground">{item.rank} - {item.vessel}</div>
                    </div>
                    <Badge className={`${getUrgencyColor(item.urgency)} text-white`}>
                      {item.urgency}
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">{item.document}</span> expires on {item.expiryDate}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Profile
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Visa Requirements */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Clock className="h-5 w-5" />
            Pending Visa Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockComplianceData.pendingVisas.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium">{item.seafarer}</div>
                      <div className="text-sm text-muted-foreground">{item.rank} - {item.vessel}</div>
                    </div>
                    <Badge className={`${getStatusColor(item.status)} text-white`}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">{item.requirement}</span> required for {item.route}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Process Visa
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pre-Departure Checklist */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <XCircle className="h-5 w-5" />
            Mandatory Pre-Departure Checklist Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockComplianceData.predepartureChecklist.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg bg-purple-50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">{item.seafarer} ({item.crewChangeId})</div>
                    <div className="text-sm text-muted-foreground">{item.rank} - {item.vessel}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {Object.entries(item.checklistItems).map(([key, status]) => (
                    <div key={key} className="text-center">
                      <div className="text-xs text-muted-foreground capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <Badge className={`${getStatusColor(status)} text-white text-xs`}>
                        {status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrewChangeCompliance;

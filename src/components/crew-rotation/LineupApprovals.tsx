
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Clock, CheckCircle, Send, Download } from "lucide-react";
import { useLineupApprovals } from "@/hooks/useCrewRotation";

// Mock lineup data - will be replaced by real data from the service
const mockLineups = [
  {
    id: "LU-2024-001",
    vessel: "MV Pacific Star",
    position: "Chief Officer",
    candidate: "C/O Antonio Reyes",
    submittedBy: "Fleet Manager",
    submittedDate: "2024-06-19",
    status: "Pending Master Approval",
    documents: ["Bio-data", "Appraisal History", "Medical Certificate", "SID/Visa", "Rest Hours Log"],
    approvers: [
      { role: "Master", name: "Capt. Rodriguez", status: "pending" },
      { role: "Fleet Manager", name: "John Smith", status: "approved" }
    ]
  },
  {
    id: "LU-2024-002", 
    vessel: "MV Ocean Explorer",
    position: "Second Engineer",
    candidate: "2/E Maria Santos",
    submittedBy: "Technical Manager",
    submittedDate: "2024-06-18",
    status: "Approved",
    documents: ["Bio-data", "Appraisal History", "Medical Certificate", "COC"],
    approvers: [
      { role: "Chief Engineer", name: "C/E Wilson", status: "approved" },
      { role: "Technical Manager", name: "Sarah Johnson", status: "approved" }
    ]
  }
];

const LineupApprovals = () => {
  const { lineupRequests, loading } = useLineupApprovals();
  const [selectedLineup, setSelectedLineup] = useState<string | null>(null);
  const [comments, setComments] = useState("");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "rejected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getApprovalIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleApproval = async (lineupId: string, approve: boolean) => {
    try {
      console.log(`${approve ? 'Approving' : 'Rejecting'} lineup ${lineupId} with comments: ${comments}`);
      // In real implementation, this would call the approval service
      setComments("");
    } catch (error) {
      console.error('Error processing approval:', error);
    }
  };

  const generatePDF = (lineupId: string) => {
    console.log(`Generating PDF for lineup ${lineupId}`);
    // In real implementation, this would generate and download the lineup packet
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Lineup Approvals - Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lineup Approvals - Digital Routing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockLineups.map((lineup) => (
            <div key={lineup.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-lg">{lineup.id}</h3>
                  <p className="text-sm text-gray-600">
                    {lineup.vessel} - {lineup.position}
                  </p>
                </div>
                <Badge className={`${getStatusColor(lineup.status)} text-white`}>
                  {lineup.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="font-medium">Candidate:</span> {lineup.candidate}
                </div>
                <div>
                  <span className="font-medium">Submitted:</span> {lineup.submittedDate}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Included Documents:</h4>
                <div className="flex flex-wrap gap-2">
                  {lineup.documents.map((doc, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Approval Chain:</h4>
                <div className="space-y-2">
                  {lineup.approvers.map((approver, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        {getApprovalIcon(approver.status)}
                        <span className="font-medium">{approver.role}</span>
                        <span className="text-sm text-gray-600">({approver.name})</span>
                      </div>
                      <Badge className={`${getStatusColor(approver.status)} text-white text-xs`}>
                        {approver.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {lineup.status.includes("Pending") && (
                <div className="space-y-3">
                  <Textarea
                    placeholder="Add comments for approval/rejection..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproval(lineup.id, true)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Lineup
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleApproval(lineup.id, false)}
                    >
                      Reject Lineup
                    </Button>
                    <Button variant="outline">
                      <Send className="h-4 w-4 mr-2" />
                      Request Changes
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  View Complete Packet
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => generatePDF(lineup.id)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LineupApprovals;

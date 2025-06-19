
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Smartphone, Play, FileSignature, AlertTriangle } from "lucide-react";

// Mock handover data
const mockHandovers = [
  {
    id: "HO-2024-001",
    seafarer: "C/O Antonio Reyes",
    vessel: "MV Pacific Star",
    joinDate: "2024-06-20",
    status: "In Progress",
    completionPercentage: 65,
    checklist: [
      { item: "Ship Specific Familiarisation", completed: true, required: true },
      { item: "Safety Orientation", completed: true, required: true },
      { item: "Bridge Equipment Training", completed: true, required: true },
      { item: "Emergency Procedures", completed: false, required: true },
      { item: "PDOS Video Stream", completed: false, required: true },
      { item: "Digital Signature Collection", completed: false, required: true },
      { item: "Watch Handover", completed: false, required: false }
    ],
    issues: [
      { id: 1, description: "GPS navigation system showing intermittent errors", severity: "Medium", loggedTo: "QHSE" },
      { id: 2, description: "Port anchor light requires maintenance", severity: "Low", loggedTo: "Technical" }
    ]
  },
  {
    id: "HO-2024-002",
    seafarer: "2/E Maria Santos",
    vessel: "MV Ocean Explorer", 
    joinDate: "2024-06-18",
    status: "Completed",
    completionPercentage: 100,
    checklist: [
      { item: "Engine Room Familiarisation", completed: true, required: true },
      { item: "Safety Orientation", completed: true, required: true },
      { item: "Machinery Operation Training", completed: true, required: true },
      { item: "Emergency Procedures", completed: true, required: true },
      { item: "PDOS Video Stream", completed: true, required: true },
      { item: "Digital Signature Collection", completed: true, required: true }
    ],
    issues: []
  }
];

const OnboardHandover = () => {
  const [selectedHandover, setSelectedHandover] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-green-500";
      case "in progress": return "bg-yellow-500";
      case "pending": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboard Handover & Digital Checklist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockHandovers.map((handover) => (
            <div key={handover.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-lg">{handover.id}</h3>
                  <p className="text-sm text-gray-600">
                    {handover.seafarer} - {handover.vessel}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(handover.status)} text-white`}>
                    {handover.status}
                  </Badge>
                  <div className="text-sm font-medium">
                    {handover.completionPercentage}%
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Completion Progress</span>
                  <span className="text-sm text-gray-600">
                    {handover.checklist.filter(item => item.completed).length} of {handover.checklist.length}
                  </span>
                </div>
                <Progress value={handover.completionPercentage} className="h-2" />
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Digital Checklist
                </h4>
                <div className="space-y-2">
                  {handover.checklist.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50">
                      <Checkbox 
                        checked={item.completed}
                        disabled={handover.status === "Completed"}
                      />
                      <div className="flex-1">
                        <span className={item.completed ? "line-through text-gray-500" : ""}>
                          {item.item}
                        </span>
                        {item.required && (
                          <Badge variant="outline" className="ml-2 text-xs">Required</Badge>
                        )}
                      </div>
                      {item.item.includes("PDOS") && (
                        <Button size="sm" variant="outline">
                          <Play className="h-3 w-3 mr-1" />
                          Watch
                        </Button>
                      )}
                      {item.item.includes("Signature") && (
                        <Button size="sm" variant="outline">
                          <FileSignature className="h-3 w-3 mr-1" />
                          Sign
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {handover.issues.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Issues Logged to QHSE
                  </h4>
                  <div className="space-y-2">
                    {handover.issues.map((issue) => (
                      <div key={issue.id} className="p-3 bg-orange-50 border border-orange-200 rounded">
                        <div className="flex items-center justify-between mb-1">
                          <Badge className={`${getSeverityColor(issue.severity)} text-white text-xs`}>
                            {issue.severity}
                          </Badge>
                          <span className="text-xs text-gray-600">Logged to: {issue.loggedTo}</span>
                        </div>
                        <p className="text-sm">{issue.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile App
                </Button>
                <Button size="sm" variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  PDOS Videos
                </Button>
                <Button size="sm" variant="outline">
                  Update Progress
                </Button>
                <Button size="sm" variant="outline">
                  Generate Report
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardHandover;

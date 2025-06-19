
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, AlertTriangle, XCircle, Search } from "lucide-react";

// Mock candidate data
const mockCandidates = [
  {
    id: "001",
    name: "C/O Antonio Reyes",
    rank: "Chief Officer",
    certificates: ["COC Class 1", "STCW Basic Safety", "ARPA"],
    seaTime: "48 months",
    age: 35,
    promotionReady: true,
    trainingExpiry: "2024-12-15",
    availability: "Available",
    matchScore: 95,
    gaps: []
  },
  {
    id: "002", 
    name: "2/O Maria Santos",
    rank: "Second Officer",
    certificates: ["COC Class 2", "STCW Basic Safety", "ECDIS"],
    seaTime: "32 months",
    age: 29,
    promotionReady: true,
    trainingExpiry: "2024-08-20",
    availability: "Available",
    matchScore: 87,
    gaps: ["ARPA Course"]
  },
  {
    id: "003",
    name: "3/O Jose Garcia",
    rank: "Third Officer", 
    certificates: ["COC Class 3", "STCW Basic Safety"],
    seaTime: "18 months",
    age: 26,
    promotionReady: false,
    trainingExpiry: "2024-06-30",
    availability: "On Leave",
    matchScore: 65,
    gaps: ["ECDIS", "Medical Certificate Expiring"]
  }
];

const TalentMatrix = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");

  const getMatchColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusIcon = (candidate: any) => {
    if (candidate.gaps.length === 0 && candidate.promotionReady) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (candidate.gaps.length > 0) {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
    return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  };

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.rank.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === "all" || candidate.rank.toLowerCase().includes(positionFilter.toLowerCase());
    return matchesSearch && matchesPosition;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-time Talent Matrix</CardTitle>
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search candidates..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              <SelectItem value="officer">Officers</SelectItem>
              <SelectItem value="engineer">Engineers</SelectItem>
              <SelectItem value="rating">Ratings</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(candidate)}
                  <div>
                    <h3 className="font-medium">{candidate.name}</h3>
                    <p className="text-sm text-gray-600">{candidate.rank}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getMatchColor(candidate.matchScore)} text-white`}>
                    {candidate.matchScore}% Match
                  </Badge>
                  <Badge variant={candidate.availability === "Available" ? "default" : "secondary"}>
                    {candidate.availability}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Sea Time:</span> {candidate.seaTime}
                </div>
                <div>
                  <span className="font-medium">Age:</span> {candidate.age}
                </div>
                <div>
                  <span className="font-medium">Training Expiry:</span> {candidate.trainingExpiry}
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex flex-wrap gap-1">
                  {candidate.certificates.map((cert, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {candidate.gaps.length > 0 && (
                <div className="mt-3 p-2 bg-red-50 rounded border border-red-200">
                  <span className="text-sm font-medium text-red-700">Gaps:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {candidate.gaps.map((gap, index) => (
                      <Badge key={index} className="bg-red-500 text-white text-xs">
                        {gap}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 mt-3">
                <Button size="sm">View Profile</Button>
                <Button size="sm" variant="outline">Schedule Interview</Button>
                <Button size="sm" variant="outline">Add to Lineup</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentMatrix;

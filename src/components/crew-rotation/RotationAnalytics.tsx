
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Star, TrendingUp, Award, MessageSquare } from "lucide-react";

// Mock analytics data
const mockAnalytics = [
  {
    id: "EVAL-2024-001",
    seafarer: "C/O Antonio Reyes",
    vessel: "MV Pacific Star",
    completedTour: "2024-06-15",
    contractDuration: "8 months",
    overallRating: 4.2,
    categories: [
      { name: "Technical Competence", score: 4.5 },
      { name: "Leadership", score: 4.0 },
      { name: "Communication", score: 4.3 },
      { name: "Safety Compliance", score: 4.8 },
      { name: "Teamwork", score: 3.9 }
    ],
    trainingNeeds: ["Advanced Bridge Management", "Leadership Development"],
    promotionReadiness: 85,
    crewSuggestions: "Excellent officer with strong technical skills. Recommended for Chief Officer promotion.",
    mlRanking: 2
  },
  {
    id: "EVAL-2024-002",
    seafarer: "2/E Maria Santos",
    vessel: "MV Ocean Explorer",
    completedTour: "2024-06-10", 
    contractDuration: "6 months",
    overallRating: 4.6,
    categories: [
      { name: "Technical Competence", score: 4.8 },
      { name: "Problem Solving", score: 4.5 },
      { name: "Communication", score: 4.4 },
      { name: "Safety Compliance", score: 4.9 },
      { name: "Initiative", score: 4.2 }
    ],
    trainingNeeds: ["Chief Engineer Preparation Course"],
    promotionReadiness: 92,
    crewSuggestions: "Outstanding engineer with exceptional technical abilities. Ready for Chief Engineer role.",
    mlRanking: 1
  }
];

const RotationAnalytics = () => {
  const getPromotionColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getRankingColor = (rank: number) => {
    if (rank <= 3) return "bg-gold-500";
    if (rank <= 10) return "bg-silver-500";
    return "bg-bronze-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post-Tour Analytics & ML Promotion Ranking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockAnalytics.map((evaluation) => (
            <div key={evaluation.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-lg">{evaluation.seafarer}</h3>
                  <p className="text-sm text-gray-600">
                    {evaluation.vessel} - {evaluation.contractDuration} tour completed {evaluation.completedTour}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500 text-white flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {evaluation.overallRating}/5.0
                  </Badge>
                  <Badge className={`${getRankingColor(evaluation.mlRanking)} text-white flex items-center gap-1`}>
                    <Award className="h-3 w-3" />
                    ML Rank #{evaluation.mlRanking}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* Performance Categories */}
                <div>
                  <h4 className="font-medium mb-3">Performance Breakdown</h4>
                  <div className="space-y-2">
                    {evaluation.categories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{category.name}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={category.score * 20} className="w-20 h-2" />
                          <span className="text-sm font-medium w-8">{category.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Promotion Readiness */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Promotion Analysis
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Promotion Readiness</span>
                        <span className="text-sm font-medium">{evaluation.promotionReadiness}%</span>
                      </div>
                      <Progress value={evaluation.promotionReadiness} className="h-2" />
                      <Badge className={`${getPromotionColor(evaluation.promotionReadiness)} text-white mt-1 text-xs`}>
                        {evaluation.promotionReadiness >= 90 ? "Ready" : 
                         evaluation.promotionReadiness >= 75 ? "Nearly Ready" : "Needs Development"}
                      </Badge>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium">Training Needs:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {evaluation.trainingNeeds.map((need, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {need}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crew Suggestions */}
              <div className="mb-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Crew Feedback & Suggestions
                </h4>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm">{evaluation.crewSuggestions}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  View Full Appraisal
                </Button>
                <Button size="sm" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Promotion Timeline
                </Button>
                <Button size="sm" variant="outline">
                  Schedule Training
                </Button>
                <Button size="sm" variant="outline">
                  Add to High Potential List
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RotationAnalytics;

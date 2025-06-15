
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const CrewChangeTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crew Change Management</CardTitle>
        <CardDescription>
          Plan, track, and manage all upcoming and ongoing crew changes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">Crew change features will be implemented here.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrewChangeTab;

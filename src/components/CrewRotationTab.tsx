
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, TrendingUp, Ship, UserCheck, Plane } from "lucide-react";
import FleetRotaBoard from "./crew-rotation/FleetRotaBoard";
import TalentMatrix from "./crew-rotation/TalentMatrix";
import LineupApprovals from "./crew-rotation/LineupApprovals";
import MobilisationHub from "./crew-rotation/MobilisationHub";
import OnboardHandover from "./crew-rotation/OnboardHandover";
import RotationAnalytics from "./crew-rotation/RotationAnalytics";

// Mock KPI data
const mockRotationKPIs = {
  totalPositions: 156,
  openPositions: 12,
  criticalPositions: 3,
  avgRotationTime: "8.2 months",
  promotionsPending: 5,
  mobilisationsActive: 8
};

const CrewRotationTab = () => {
  return (
    <div className="space-y-6">
      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Positions</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRotationKPIs.totalPositions}</div>
            <p className="text-xs text-muted-foreground">Fleet-wide berths</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <Users className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{mockRotationKPIs.openPositions}</div>
            <p className="text-xs text-muted-foreground">Need filling</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <Users className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{mockRotationKPIs.criticalPositions}</div>
            <p className="text-xs text-muted-foreground">Urgent attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rotation</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRotationKPIs.avgRotationTime}</div>
            <p className="text-xs text-muted-foreground">Tour length</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promotions</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mockRotationKPIs.promotionsPending}</div>
            <p className="text-xs text-muted-foreground">Pending approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mobilising</CardTitle>
            <Plane className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{mockRotationKPIs.mobilisationsActive}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="forecast" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="forecast">A. Forecast & Plan</TabsTrigger>
          <TabsTrigger value="candidates">B. Candidate Match</TabsTrigger>
          <TabsTrigger value="approvals">C. Approvals</TabsTrigger>
          <TabsTrigger value="mobilisation">D. Mobilisation</TabsTrigger>
          <TabsTrigger value="handover">E. Handover</TabsTrigger>
          <TabsTrigger value="analytics">F. Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="mt-6">
          <FleetRotaBoard />
        </TabsContent>

        <TabsContent value="candidates" className="mt-6">
          <TalentMatrix />
        </TabsContent>

        <TabsContent value="approvals" className="mt-6">
          <LineupApprovals />
        </TabsContent>

        <TabsContent value="mobilisation" className="mt-6">
          <MobilisationHub />
        </TabsContent>

        <TabsContent value="handover" className="mt-6">
          <OnboardHandover />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <RotationAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CrewRotationTab;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VesselDetail from "./pages/VesselDetail";
import CrewRotationTab from "./components/CrewRotationTab";
import OnboardSeafarersTable from "./components/OnboardSeafarersTable";
import VacationSeafarersTable from "./components/VacationSeafarersTable";
import AllVesselsTab from "./components/AllVesselsTab";
import CrewChangeTab from "./components/CrewChangeTab";
import SeafarerApplicationForm from "./components/SeafarerApplicationForm";
import PIModule from "./components/PIModule";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-12 flex items-center border-b px-4">
                <SidebarTrigger />
                <h1 className="ml-4 text-lg font-semibold">Contract & Crew Management</h1>
              </header>
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/crew-rotation" element={<CrewRotationTab />} />
                  <Route path="/onboard" element={<OnboardSeafarersTable />} />
                  <Route path="/vacation" element={<VacationSeafarersTable />} />
                  <Route path="/vessels" element={<AllVesselsTab />} />
                  <Route path="/crew-change" element={<CrewChangeTab />} />
                  <Route path="/application" element={<SeafarerApplicationForm />} />
                  <Route path="/pni" element={<PIModule />} />
                  <Route path="/vessel/:imo" element={<VesselDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInput,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  RotateCcw,
  Users,
  Umbrella,
  Ship,
  ArrowLeftRight,
  FileText,
  Shield,
  Search,
  Calendar,
  BarChart3,
  BookOpen,
  Menu,
  Download,
  Upload,
  QrCode,
  ChevronDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DatabaseUploadModal from "./DatabaseUploadModal";

// Navigation items organized by logical workflow
const crewManagementItems = [
  { 
    title: "Crew Rotation", 
    url: "/crew-rotation", 
    icon: RotateCcw,
    tooltip: "Manage crew rotation schedules and planning"
  },
  { 
    title: "Crew Change", 
    url: "/crew-change", 
    icon: ArrowLeftRight,
    tooltip: "Handle crew changes and transfers"
  },
  { 
    title: "Onboard Seafarers", 
    url: "/onboard", 
    icon: Users,
    tooltip: "View currently onboard crew members"
  },
  { 
    title: "Vacation Seafarers", 
    url: "/vacation", 
    icon: Umbrella,
    tooltip: "Manage seafarers on vacation or leave"
  },
];

const fleetItems = [
  { 
    title: "All Vessels", 
    url: "/vessels", 
    icon: Ship,
    tooltip: "View and manage fleet vessels"
  },
];

const seafarerItems = [
  { 
    title: "Seafarer Application", 
    url: "/application", 
    icon: FileText,
    tooltip: "Process new seafarer applications"
  },
  { 
    title: "P&I", 
    url: "/pni", 
    icon: Shield,
    tooltip: "Protection & Indemnity Insurance Records"
  },
];

const quickAccessItems = [
  { icon: Search, label: "Search Crew", tooltip: "Quick crew member search" },
  { icon: FileText, label: "Contract Management (SEA, CBA, Extensions etc.)", tooltip: "Manage contracts and extensions" },
  { icon: Calendar, label: "Monthly Crew Health Monitoring Report", tooltip: "Health monitoring reports" },
  { icon: BarChart3, label: "Crew Performance (Promotion, Loyalty)", tooltip: "Performance analytics" },
  { icon: RotateCcw, label: "Crew Change", tooltip: "Quick crew change access" },
  { icon: BarChart3, label: "KPI Reports", tooltip: "Key performance indicators" },
  { icon: BookOpen, label: "CAMII QMS Procedures", tooltip: "Quality management procedures" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { toast } = useToast();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    return currentPath.startsWith(path) && path !== "/";
  };

  const handleDownloadTemplate = async () => {
    try {
      toast({
        title: "Template Download",
        description: "Database migration template will be downloaded when backend is connected.",
      });
      console.log("Template download initiated");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Unable to download migration template. Please try again.",
      });
    }
  };

  const handleExportPDF = () => {
    toast({
      title: "Export PDF",
      description: "PDF export functionality will be available when backend is connected.",
    });
  };

  const handleQRExport = () => {
    toast({
      title: "QR Export",
      description: "QR export functionality will be available when backend is connected.",
    });
  };

  // Filter items based on search query
  const filteredQuickAccess = quickAccessItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCrewManagement = crewManagementItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFleet = fleetItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSeafarer = seafarerItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarContent>
          {/* Search/Filter */}
          {!isCollapsed && (
            <div className="p-2">
              <SidebarInput
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9"
              />
            </div>
          )}

          {/* Dashboard */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={currentPath === "/"}
                    tooltip="Main dashboard overview"
                    className="data-[active=true]:bg-blue-100 data-[active=true]:border-l-4 data-[active=true]:border-l-blue-600 data-[active=true]:font-semibold data-[active=true]:text-blue-900"
                  >
                    <NavLink to="/">
                      <BarChart3 />
                      {!isCollapsed && <span>Dashboard</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Crew Management Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Crew Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredCrewManagement.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive(item.url)}
                      tooltip={item.tooltip}
                      className="data-[active=true]:bg-blue-100 data-[active=true]:border-l-4 data-[active=true]:border-l-blue-600 data-[active=true]:font-semibold data-[active=true]:text-blue-900"
                    >
                      <NavLink to={item.url}>
                        <item.icon />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Fleet Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Fleet</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredFleet.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive(item.url)}
                      tooltip={item.tooltip}
                      className="data-[active=true]:bg-blue-100 data-[active=true]:border-l-4 data-[active=true]:border-l-blue-600 data-[active=true]:font-semibold data-[active=true]:text-blue-900"
                    >
                      <NavLink to={item.url}>
                        <item.icon />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Seafarers Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Seafarers</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredSeafarer.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive(item.url)}
                      tooltip={item.tooltip}
                      className="data-[active=true]:bg-blue-100 data-[active=true]:border-l-4 data-[active=true]:border-l-blue-600 data-[active=true]:font-semibold data-[active=true]:text-blue-900"
                    >
                      <NavLink to={item.url}>
                        <item.icon />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Utilities Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Utilities</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Quick Actions */}
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton tooltip="Quick access to common actions">
                        <Menu />
                        {!isCollapsed && <span>Quick Actions</span>}
                        {!isCollapsed && <ChevronDown className="ml-auto h-4 w-4" />}
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" className="w-80">
                      {filteredQuickAccess.map((item, index) => (
                        <DropdownMenuItem key={index} className="flex items-center gap-3 p-3">
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>

                {/* Export Tools */}
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton tooltip="Download reports and logs">
                        <Download />
                        {!isCollapsed && <span>Export Tools</span>}
                        {!isCollapsed && <ChevronDown className="ml-auto h-4 w-4" />}
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" className="w-48">
                      <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer">
                        <FileText className="mr-2 h-4 w-4" />
                        Export PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleQRExport} className="cursor-pointer">
                        <QrCode className="mr-2 h-4 w-4" />
                        QR Export
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleDownloadTemplate} className="cursor-pointer">
                        <Download className="mr-2 h-4 w-4" />
                        Download DB Template
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>

                {/* Upload Database */}
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setIsUploadModalOpen(true)}
                    tooltip="Upload database files and backups"
                  >
                    <Upload />
                    {!isCollapsed && <span>Upload Database</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      
      <DatabaseUploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </>
  );
}

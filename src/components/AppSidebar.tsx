
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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

const navigationItems = [
  { title: "Crew Rotation", url: "/crew-rotation", icon: RotateCcw },
  { title: "Onboard Seafarers", url: "/onboard", icon: Users },
  { title: "Vacation Seafarers", url: "/vacation", icon: Umbrella },
  { title: "All Vessels", url: "/vessels", icon: Ship },
  { title: "Crew Change", url: "/crew-change", icon: ArrowLeftRight },
  { title: "Seafarer Application", url: "/application", icon: FileText },
  { title: "P&I", url: "/pni", icon: Shield },
];

const quickAccessItems = [
  { icon: Search, label: "Search Crew" },
  { icon: FileText, label: "Contract Management (SEA, CBA, Extensions etc.)" },
  { icon: Calendar, label: "Monthly Crew Health Monitoring Report" },
  { icon: BarChart3, label: "Crew Performance (Promotion, Loyalty)" },
  { icon: RotateCcw, label: "Crew Change" },
  { icon: BarChart3, label: "KPI Reports" },
  { icon: BookOpen, label: "CAMII QMS Procedures" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { toast } = useToast();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
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

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarContent>
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={currentPath === "/"}>
                    <NavLink to="/">
                      <BarChart3 />
                      {!isCollapsed && <span>Dashboard</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
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

          {/* Quick Access */}
          <SidebarGroup>
            <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        <Menu />
                        {!isCollapsed && <span>Quick Actions</span>}
                        {!isCollapsed && <ChevronDown className="ml-auto h-4 w-4" />}
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" className="w-80">
                      {quickAccessItems.map((item, index) => (
                        <DropdownMenuItem key={index} className="flex items-center gap-3 p-3">
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Tools & Export */}
          <SidebarGroup>
            <SidebarGroupLabel>Tools & Export</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
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
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setIsUploadModalOpen(true)}>
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

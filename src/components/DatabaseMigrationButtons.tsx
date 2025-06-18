
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DatabaseUploadModal from "./DatabaseUploadModal";

const DatabaseMigrationButtons = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { toast } = useToast();

  const handleDownloadTemplate = async () => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch('/api/migration/template', {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${userToken}`,
      //   },
      // });
      
      // Mock implementation for now
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

  return (
    <>
      <Button 
        variant="outline" 
        onClick={handleDownloadTemplate}
        className="whitespace-nowrap"
      >
        <Download className="mr-2 h-4 w-4" /> 
        Download DB Template
      </Button>
      <Button 
        variant="outline" 
        onClick={() => setIsUploadModalOpen(true)}
        className="whitespace-nowrap"
      >
        <Upload className="mr-2 h-4 w-4" /> 
        Upload Database
      </Button>
      
      <DatabaseUploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </>
  );
};

export default DatabaseMigrationButtons;

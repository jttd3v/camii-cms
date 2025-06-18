
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Upload, AlertTriangle, CheckCircle, X } from "lucide-react";
import FileUploadZone from "./FileUploadZone";
import DataPreviewTable from "./DataPreviewTable";

interface DatabaseUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DatabaseUploadModal = ({ isOpen, onClose }: DatabaseUploadModalProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // TODO: Parse file and set preview data when backend is ready
    // For now, set mock preview data
    setPreviewData([
      { name: "John Doe", rank: "Captain", vessel: "MV Test Ship" },
      { name: "Jane Smith", rank: "Chief Engineer", vessel: "MV Test Ship" }
    ]);
  };

  const handleUploadConfirm = async () => {
    if (!uploadedFile) return;

    setIsUploading(true);
    try {
      // TODO: Replace with actual API call when backend is ready
      // const formData = new FormData();
      // formData.append('file', uploadedFile);
      // const response = await fetch('/api/migration/upload', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${userToken}`,
      //   },
      //   body: formData,
      // });

      // Mock success for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadStatus('success');
      toast({
        title: "Upload Successful",
        description: `Successfully processed ${previewData.length} records.`,
      });
      
      setTimeout(() => {
        onClose();
        resetModal();
      }, 2000);
    } catch (error) {
      setUploadStatus('error');
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Failed to upload database. Please check your file and try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetModal = () => {
    setUploadedFile(null);
    setPreviewData([]);
    setUploadStatus('idle');
    setIsUploading(false);
  };

  const handleClose = () => {
    if (!isUploading) {
      onClose();
      resetModal();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Database Migration File
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {uploadStatus === 'idle' && (
            <>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Only upload verified .xlsx or .csv files. This action will modify the database and cannot be easily undone.
                </AlertDescription>
              </Alert>

              <FileUploadZone 
                onFileUpload={handleFileUpload}
                acceptedFileTypes=".xlsx,.csv"
                disabled={isUploading}
              />

              {uploadedFile && previewData.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Data Preview</h3>
                    <span className="text-sm text-muted-foreground">
                      {previewData.length} records found
                    </span>
                  </div>
                  
                  <DataPreviewTable data={previewData} />

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleUploadConfirm}
                      disabled={isUploading}
                    >
                      {isUploading ? "Processing..." : "Confirm Upload"}
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {uploadStatus === 'success' && (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-700">Upload Successful</h3>
              <p className="text-muted-foreground">
                Database has been updated successfully. Closing automatically...
              </p>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="text-center py-8">
              <X className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-700">Upload Failed</h3>
              <p className="text-muted-foreground mb-4">
                There was an error processing your file. Please check the format and try again.
              </p>
              <Button onClick={() => setUploadStatus('idle')}>
                Try Again
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DatabaseUploadModal;

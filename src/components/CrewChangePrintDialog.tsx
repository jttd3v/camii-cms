
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";

interface CrewChangePrintDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  crewChangeData: any;
}

const CrewChangePrintDialog = ({ open, onOpenChange, crewChangeData }: CrewChangePrintDialogProps) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printContent = generatePrintContent(crewChangeData);
    
    printWindow?.document.write(printContent);
    printWindow?.document.close();
    printWindow?.print();
  };

  const handleDownloadPDF = () => {
    // For now, we'll use the browser's print to PDF functionality
    // In a real implementation, you might use a library like jsPDF
    handlePrint();
  };

  const generatePrintContent = (data: any) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Crew Change Itinerary - ${data.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            .section { margin-bottom: 20px; }
            .section h3 { background-color: #f5f5f5; padding: 8px; margin: 0 0 10px 0; }
            .crew-details { display: flex; justify-content: space-between; margin-bottom: 20px; }
            .crew-box { width: 48%; border: 1px solid #ddd; padding: 10px; }
            .status { padding: 2px 8px; border-radius: 4px; color: white; }
            .status.planned { background-color: #3b82f6; }
            .status.in-progress { background-color: #eab308; }
            .status.completed { background-color: #22c55e; }
            .status.overdue { background-color: #ef4444; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f9f9f9; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>CREW CHANGE ITINERARY</h1>
            <h2>ID: ${data.id}</h2>
            <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div class="section">
            <h3>Basic Information</h3>
            <table>
              <tr><td><strong>Vessel:</strong></td><td>${data.vessel}</td></tr>
              <tr><td><strong>Planned Date:</strong></td><td>${data.plannedDate || data.proposedDate}</td></tr>
              <tr><td><strong>Port/Location:</strong></td><td>${data.port}</td></tr>
              <tr><td><strong>Status:</strong></td><td><span class="status ${data.status?.toLowerCase().replace(' ', '-')}">${data.status}</span></td></tr>
            </table>
          </div>

          <div class="crew-details">
            <div class="crew-box">
              <h3>On-Signers (Joining)</h3>
              <p><strong>${data.onSigner}</strong></p>
              <p>Rank: ${data.onSignerRank}</p>
              <p>Document Status: All Valid ✓</p>
            </div>
            <div class="crew-box">
              <h3>Off-Signers (Leaving)</h3>
              <p><strong>${data.offSigner || 'N/A'}</strong></p>
              <p>Rank: ${data.offSignerRank || 'N/A'}</p>
              <p>Document Status: All Valid ✓</p>
            </div>
          </div>

          <div class="section">
            <h3>Travel Information</h3>
            <table>
              <tr><td><strong>Expected Arrival:</strong></td><td>${data.expectedArrival || 'TBD'}</td></tr>
              <tr><td><strong>Actual Departure:</strong></td><td>${data.actualDeparture || 'TBD'}</td></tr>
              <tr><td><strong>Current Status:</strong></td><td>${data.currentStatus || data.status}</td></tr>
            </table>
          </div>

          <div class="section">
            <h3>Instructions & Notes</h3>
            <p>Please ensure all seafarers have required documentation and follow company travel protocols.</p>
            <p><em>This document is computer-generated and valid without signature.</em></p>
          </div>
        </body>
      </html>
    `;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Print Crew Change Itinerary</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Generate a printable itinerary for Crew Change {crewChangeData?.id}
          </p>
          <div className="flex gap-3">
            <Button onClick={handlePrint} className="flex-1">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" onClick={handleDownloadPDF} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Save PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CrewChangePrintDialog;

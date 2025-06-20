
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";

interface Contract {
  id: string;
  crewName: string;
  vessel: string;
  rank: string;
  signOn: string;
  signOff: string;
  status: "ACTIVE" | "EXPIRED" | "EXTENDED" | "OVERDUE";
  compliance: "OK" | "WARNING" | "VIOLATION";
  extensionReason?: string;
}

interface ContractPreviewTooltipProps {
  contract: Contract;
  children: React.ReactNode;
}

const ContractPreviewTooltip = ({ contract, children }: ContractPreviewTooltipProps) => {
  const getDaysRemaining = () => {
    const today = new Date();
    const signOffDate = new Date(contract.signOff);
    const diffTime = signOffDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side="right" className="p-0">
          <Card className="w-64 border shadow-lg">
            <CardContent className="p-3">
              <div className="space-y-2">
                <div className="font-medium text-sm">{contract.crewName}</div>
                <div className="text-xs text-muted-foreground">
                  {contract.rank} • {contract.vessel}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-medium">Days Remaining:</span>
                    <div className={`font-bold ${daysRemaining < 30 ? 'text-red-600' : daysRemaining < 60 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {daysRemaining > 0 ? daysRemaining : 'Overdue'}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>
                    <div className="font-bold">{contract.status}</div>
                  </div>
                </div>
                <div className="text-xs">
                  <span className="font-medium">Sign Off:</span> {contract.signOff}
                </div>
                {contract.extensionReason && (
                  <div className="text-xs text-amber-600">
                    <span className="font-medium">Extension:</span> {contract.extensionReason}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ContractPreviewTooltip;

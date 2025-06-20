
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

type StatusType = "ACTIVE" | "EXPIRED" | "EXTENDED" | "OVERDUE";
type ComplianceType = "OK" | "WARNING" | "VIOLATION";

interface StatusBadgeProps {
  type: "status" | "compliance";
  value: StatusType | ComplianceType;
  className?: string;
}

const StatusBadge = ({ type, value, className }: StatusBadgeProps) => {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case "ACTIVE":
        return {
          icon: CheckCircle,
          className: "bg-green-600 text-white hover:bg-green-700",
        };
      case "EXPIRED":
        return {
          icon: XCircle,
          className: "bg-red-600 text-white hover:bg-red-700",
        };
      case "EXTENDED":
        return {
          icon: AlertTriangle,
          className: "bg-yellow-600 text-white hover:bg-yellow-700",
        };
      case "OVERDUE":
        return {
          icon: XCircle,
          className: "bg-red-700 text-white hover:bg-red-800",
        };
      default:
        return {
          icon: AlertTriangle,
          className: "bg-gray-600 text-white hover:bg-gray-700",
        };
    }
  };

  const getComplianceConfig = (compliance: ComplianceType) => {
    switch (compliance) {
      case "OK":
        return {
          icon: CheckCircle,
          className: "bg-green-600 text-white hover:bg-green-700",
        };
      case "WARNING":
        return {
          icon: AlertTriangle,
          className: "bg-yellow-600 text-white hover:bg-yellow-700",
        };
      case "VIOLATION":
        return {
          icon: XCircle,
          className: "bg-red-600 text-white hover:bg-red-700",
        };
      default:
        return {
          icon: AlertTriangle,
          className: "bg-gray-600 text-white hover:bg-gray-700",
        };
    }
  };

  const config = type === "status" 
    ? getStatusConfig(value as StatusType)
    : getComplianceConfig(value as ComplianceType);

  const Icon = config.icon;

  return (
    <Badge className={`${config.className} ${className} flex items-center gap-1`}>
      <Icon className="h-3 w-3" />
      {value}
    </Badge>
  );
};

export default StatusBadge;

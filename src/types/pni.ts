
export type PICaseStatus = "Open" | "Under Investigation" | "Closed" | "Draft" | "Under Review" | "Paid" | "Rejected";

export type PICase = {
  id: string;
  vessel: string;
  crewMember: string;
  crewRank: string;
  incidentDate: Date;
  timeOfIncident?: string;
  location: string;
  incidentType: string;
  description: string;
  actionTaken: string;
  notificationDate: Date;
  status: PICaseStatus;
  attachments?: FileList;
  remarks?: string;
  reportedBy: string;
  submittedOn: Date;
  editHistory: { user: string; timestamp: Date; reason?: string }[];

  // Costs & Expenses
  estimatedTotalCost?: number;
  medicalBills?: number;
  crewWageContinuation?: number;
  legalFees?: number;
  surveyorFees?: number;

  // Document Tracking
  mastersReport?: FileList;
  medicalReports?: FileList;
  surveyReport?: FileList;
};

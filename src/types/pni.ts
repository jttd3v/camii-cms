
export type PICaseStatus = "Open" | "Under Investigation" | "Closed";

export type PICase = {
  id: string;
  vessel: string;
  crewMember: string;
  crewRank: string;
  incidentDate: Date;
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
};

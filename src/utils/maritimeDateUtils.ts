
import { addMonths, subMonths, addDays, subDays, format, differenceInDays, differenceInMonths } from 'date-fns';

export interface ContractPeriod {
  startDate: Date;
  endDate: Date;
  boardedDate: Date;
  timeOnboard: string;
  estimatedReplacementDate: Date;
}

export const generateRealisticContractPeriod = (vesselIndex: number, crewIndex: number): ContractPeriod => {
  const now = new Date();
  
  // Stagger contract periods to avoid all crew changing at once
  // Contract lengths: 6-12 months (9 months average)
  const contractLengthMonths = 6 + Math.floor(Math.random() * 7); // 6-12 months
  
  // Current onboard time: 1-10 months into contract
  const monthsOnboard = 1 + Math.floor(Math.random() * Math.min(contractLengthMonths - 1, 10));
  
  // Calculate start date (months ago)
  const startDate = subMonths(now, monthsOnboard);
  
  // Boarding typically 1-3 days after contract start
  const boardedDate = addDays(startDate, 1 + Math.floor(Math.random() * 3));
  
  // Contract end date
  const endDate = addMonths(startDate, contractLengthMonths);
  
  // Replacement planning starts 30-90 days before contract end
  const replacementLeadDays = 30 + Math.floor(Math.random() * 60);
  const estimatedReplacementDate = subDays(endDate, replacementLeadDays);
  
  // Calculate time onboard
  const timeOnboardMonths = differenceInMonths(now, boardedDate);
  const timeOnboardDays = differenceInDays(now, addMonths(boardedDate, timeOnboardMonths));
  const timeOnboard = `${timeOnboardMonths}m ${timeOnboardDays}d`;
  
  return {
    startDate,
    endDate,
    boardedDate,
    timeOnboard,
    estimatedReplacementDate
  };
};

export const generateDocumentExpiry = (minMonths: number = 6, maxYears: number = 5): string => {
  const now = new Date();
  const minDate = addMonths(now, minMonths);
  const maxDate = addMonths(now, maxYears * 12);
  
  const randomTime = minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime());
  return format(new Date(randomTime), 'yyyy-MM-dd');
};

export const getContractStatus = (endDate: Date): 'safe' | 'warning' | 'critical' => {
  const now = new Date();
  const daysUntilEnd = differenceInDays(endDate, now);
  
  if (daysUntilEnd < 30) return 'critical';
  if (daysUntilEnd < 60) return 'warning';
  return 'safe';
};

export const generateRealisticMobilisationDate = (): { departure: string; joinDate: string } => {
  const now = new Date();
  
  // Mobilisations typically planned 5-30 days in advance
  const daysAdvance = 5 + Math.floor(Math.random() * 25);
  const departureDate = addDays(now, daysAdvance);
  
  // Join date is typically 1-3 days after departure
  const joinDate = addDays(departureDate, 1 + Math.floor(Math.random() * 3));
  
  return {
    departure: format(departureDate, 'yyyy-MM-dd'),
    joinDate: format(joinDate, 'yyyy-MM-dd')
  };
};

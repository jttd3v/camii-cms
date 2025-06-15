
import { vessels } from "./dummyVessels";
import { filipinoNames } from "./dummyFilipinoNames";
import { format, addMonths, differenceInDays, differenceInMonths, subYears, addDays, addYears, subDays } from "date-fns";

export type CrewMember = {
  id: string;
  vesselName: string;
  rank: string;
  lastName: string;
  middleName: string;
  firstName: string;
  suffix: string;
  higherLicense: string;
  birthDate: string; // YYYY-MM-DD
  age: number;
  address: string;
  passportNumber: string;
  passportExpiry: string; // YYYY-MM-DD
  seamanBookNumber: string;
  seamanBookExpiry: string; // YYYY-MM-DD
  joinedPort: string;
  departedCebu: string; // YYYY-MM-DD HH:mm
  boardedVessel: string; // YYYY-MM-DD HH:mm
  timeOnboard: string; // "Xm Yd"
  contractDuration: string; // "9 months"
  estimatedReplacementDate: string; // YYYY-MM-DD
  candidateToReplace: string;
};

const possibleRanks = [
  "Master", "Chief Officer", "2nd Officer", "3rd Officer", "Chief Engineer",
  "2nd Engineer", "3rd Engineer", "Bosun", "Able Seaman", "Ordinary Seaman",
  "Oiler", "Cook", "Messman", "Deck Cadet", "Engine Cadet", "Pumpman",
  "Electrician", "Fitter", "Wiper", "Chief Cook", "Steward", "Welder"
];

const licenses = ["OIC-NW", "OIC-EW", "Master Mariner", "Chief Mate", "Management Level", "Support Level"];
const ports = ["Manila, PH", "Cebu, PH", "Singapore, SG", "Hong Kong, HK", "Kaohsiung, TW"];

const randomDate = (start: Date, end: Date) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const allCrews: CrewMember[] = [];
let crewIdx = 0;

for (const vessel of vessels) {
  for (let i = 0; i < 22; i++) {
    const fullName = filipinoNames[crewIdx % filipinoNames.length];
    const nameParts = fullName.split(' ');
    const lastName = nameParts.length > 1 ? nameParts.pop()! : '';
    const firstName = nameParts.join(' ');

    const birthDate = randomDate(new Date(1970, 0, 1), new Date(2004, 0, 1));
    const age = differenceInDays(new Date(), birthDate) / 365.25 | 0;

    const boardedVesselDate = randomDate(new Date(2024, 0, 1), new Date());
    const timeOnboardMonths = differenceInMonths(new Date(), boardedVesselDate);
    const timeOnboardDays = differenceInDays(new Date(), addMonths(boardedVesselDate, timeOnboardMonths));
    
    const candidateIdx = Math.floor(Math.random() * filipinoNames.length);

    allCrews.push({
      id: `${vessel.imo}_c${i + 1}`,
      vesselName: vessel.name,
      rank: getRandomItem(possibleRanks),
      lastName,
      firstName,
      middleName: "", // simplified
      suffix: "", // simplified
      higherLicense: getRandomItem(licenses),
      birthDate: format(birthDate, "yyyy-MM-dd"),
      age,
      address: "Cebu City, Philippines", // simplified
      passportNumber: `PH${Math.random().toString().slice(2, 10)}`,
      passportExpiry: format(addYears(new Date(), Math.ceil(Math.random() * 5) + 1), "yyyy-MM-dd"),
      seamanBookNumber: `SB${Math.random().toString().slice(2, 10)}`,
      seamanBookExpiry: format(addYears(new Date(), Math.ceil(Math.random() * 5) + 1), "yyyy-MM-dd"),
      joinedPort: getRandomItem(ports),
      departedCebu: format(subDays(boardedVesselDate, 2), "yyyy-MM-dd HH:mm"),
      boardedVessel: format(boardedVesselDate, "yyyy-MM-dd HH:mm"),
      timeOnboard: `${timeOnboardMonths}m ${timeOnboardDays}d`,
      contractDuration: "9 months",
      estimatedReplacementDate: format(addMonths(boardedVesselDate, 9), "yyyy-MM-dd"),
      candidateToReplace: filipinoNames[candidateIdx],
    });
    crewIdx++;
  }
}

export default allCrews;

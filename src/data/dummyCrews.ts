
import { vessels } from "./dummyVessels";
import { filipinoNames } from "./dummyFilipinoNames";
import { format, differenceInDays, subYears } from "date-fns";
import { generateRealisticContractPeriod, generateDocumentExpiry } from "@/utils/maritimeDateUtils";

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

    // Generate realistic contract period for current crew
    const contractPeriod = generateRealisticContractPeriod(vessels.indexOf(vessel), i);
    
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
      passportExpiry: generateDocumentExpiry(6, 5), // 6 months to 5 years
      seamanBookNumber: `SB${Math.random().toString().slice(2, 10)}`,
      seamanBookExpiry: generateDocumentExpiry(12, 5), // 1 to 5 years
      joinedPort: getRandomItem(ports),
      departedCebu: format(new Date(contractPeriod.boardedDate.getTime() - 2 * 24 * 60 * 60 * 1000), "yyyy-MM-dd HH:mm"),
      boardedVessel: format(contractPeriod.boardedDate, "yyyy-MM-dd HH:mm"),
      timeOnboard: contractPeriod.timeOnboard,
      contractDuration: "9 months", // Standard contract length
      estimatedReplacementDate: format(contractPeriod.estimatedReplacementDate, "yyyy-MM-dd"),
      candidateToReplace: filipinoNames[candidateIdx],
    });
    crewIdx++;
  }
}

export default allCrews;

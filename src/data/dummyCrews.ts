
import { vessels } from "./dummyVessels";
import filipinoNames from "./dummyFilipinoNames";

// Generating a crew array for each vessel (22 crew per vessel)
export type CrewMember = {
  id: string;
  name: string;
  rank: string;
  vesselName: string;
};

const possibleRanks = [
  "Master",
  "Chief Officer",
  "2nd Officer",
  "3rd Officer",
  "Chief Engineer",
  "2nd Engineer",
  "3rd Engineer",
  "Bosun",
  "Able Seaman",
  "Ordinary Seaman",
  "Oiler",
  "Cook",
  "Messman",
  "Deck Cadet",
  "Engine Cadet",
  "Pumpman",
  "Electrician",
  "Fitter",
  "Wiper",
  "Chief Cook",
  "Steward",
  "Welder"
];

const allCrews: CrewMember[] = [];

let crewIdx = 0;
for (const vessel of vessels) {
  for (let i = 0; i < 22; i++) {
    const crewName = filipinoNames[crewIdx % filipinoNames.length]; // wrap around if >200
    const rank = possibleRanks[i % possibleRanks.length];
    allCrews.push({
      id: `${vessel.imo}_c${i+1}`,
      name: crewName,
      rank,
      vesselName: vessel.name,
    });
    crewIdx++;
  }
}

export default allCrews;

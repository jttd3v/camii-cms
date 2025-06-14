
import { vessels } from "@/data/dummyVessels";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

const fields = [
  { label: "Vessel Name", key: "name" },
  { label: "IMO Number", key: "imo" },
  { label: "Flag", key: "flag" },
  { label: "Type", key: "type" },
  { label: "DWT", key: "dwt" },
  { label: "Built", key: "built" },
  { label: "Owner", key: "owner" }
];

export default function AllVesselsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
      {vessels.map(vessel => (
        <Card key={vessel.imo} className="flex flex-col h-full">
          <Link
            className="hover:underline focus:ring-2 ring-primary"
            to={`/vessel/${vessel.imo}`}
          >
            <CardHeader>
              <CardTitle>{vessel.name}</CardTitle>
              <CardDescription>{vessel.type} &mdash; IMO: {vessel.imo}</CardDescription>
            </CardHeader>
          </Link>
          <CardContent>
            <ul className="text-sm space-y-1">
              {fields.map(field => (
                <li key={field.key}>
                  <span className="font-medium">{field.label}: </span>
                  <span>{(vessel as any)[field.key]}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <Link
                to={`/vessel/${vessel.imo}`}
                className="text-primary font-semibold hover:underline"
              >
                View Full Particulars &rarr;
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

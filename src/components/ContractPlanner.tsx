
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LabelList } from "recharts";

type CrewBar = {
  crewId: string;
  crewName: string;
  signOn: string;
  signOff: string;
  status: "ACTIVE" | "EXPIRED" | "EXTENDED" | "OVERDUE";
};

const demoBars: CrewBar[] = [
  {
    crewId: "antonio_reyes",
    crewName: "Antonio Reyes",
    signOn: "2024-03-01",
    signOff: "2025-01-10",
    status: "EXTENDED",
  },
  {
    crewId: "julia_tan",
    crewName: "Julia Tan",
    signOn: "2023-08-15",
    signOff: "2024-07-01",
    status: "ACTIVE",
  },
  {
    crewId: "gleb_ivanov",
    crewName: "Gleb Ivanov",
    signOn: "2022-12-01",
    signOff: "2023-11-28",
    status: "OVERDUE",
  },
  {
    crewId: "jorge_cruz",
    crewName: "Jorge Cruz",
    signOn: "2024-01-20",
    signOff: "2024-07-19",
    status: "EXPIRED",
  },
];

function statusBarColor(status: CrewBar["status"]) {
  switch (status) {
    case "ACTIVE":
      return "#22c55e"; // green-500
    case "EXPIRED":
      return "#ef4444"; // red-500
    case "OVERDUE":
      return "#e11d48"; // rose-600
    case "EXTENDED":
      return "#fbbf24"; // yellow-400
    default:
      return "#888";
  }
}

type Props = {
  onBarClick?: (crewId: string) => void;
};

export default function ContractPlanner({ onBarClick }: Props) {
  // Map sign-on/off to number of months (X axis is months for demo)
  // In real impl, would show date axis
  return (
    <section className="bg-card rounded-lg p-4 mb-3 shadow border">
      <div className="flex items-center mb-2">
        <h2 className="font-semibold text-xl">Crew Rotation Timeline</h2>
        <span className="ml-3 text-xs text-muted-foreground">
          Gantt-style view of current contracts & rotations
        </span>
      </div>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={demoBars}
            margin={{ left: 32, right: 16, top: 8, bottom: 8 }}
            barSize={26}
          >
            <YAxis dataKey="crewName" type="category" axisLine={false} tickLine={false} width={140} />
            <XAxis type="number" hide />
            <Tooltip
              contentStyle={{ fontSize: 14, background: "#fff" }}
              formatter={(value, key, { payload }) => [
                `${payload.signOn} → ${payload.signOff}`,
                "Contract Duration"
              ]}
            />
            <Bar
              dataKey={() => {
                // demo: each bar = 1, real: duration
                return 1;
              }}
              fill="#888"
              isAnimationActive={false}
              onClick={(data) => onBarClick?.(data.crewId)}
            >
              {demoBars.map((entry, idx) => (
                <Cell
                  key={`cell-${entry.crewId}`}
                  fill={statusBarColor(entry.status)}
                  cursor="pointer"
                />
              ))}
              <LabelList
                dataKey="crewName"
                position="insideLeft"
                style={{
                  fill: "#222",
                  fontSize: 13,
                  fontWeight: 600,
                  pointerEvents: "none",
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

// hack for recharts
function Cell(props: any) {
  // @ts-ignore
  return <g {...props} />;
}

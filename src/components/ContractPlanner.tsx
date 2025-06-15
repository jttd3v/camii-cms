import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LabelList, Cell } from "recharts";

type CrewBar = {
  crewId: string;
  contractId: string;
  crewName: string;
  rank: string;
  vesselName: string;
  signOn: string;
  signOff: string;
  status: "ACTIVE" | "EXPIRED" | "EXTENDED" | "OVERDUE";
};

const demoBars: CrewBar[] = [
  {
    crewId: "antonio_reyes",
    contractId: "C-AR-01",
    crewName: "Antonio Reyes",
    rank: "Master",
    vesselName: "MV Starship",
    signOn: "2024-03-01",
    signOff: "2025-01-10",
    status: "EXTENDED",
  },
  {
    crewId: "julia_tan",
    contractId: "C-JT-02",
    crewName: "Julia Tan",
    rank: "Chief Officer",
    vesselName: "MV Neptune",
    signOn: "2023-08-15",
    signOff: "2024-07-01",
    status: "ACTIVE",
  },
  {
    crewId: "gleb_ivanov",
    contractId: "C-GI-03",
    crewName: "Gleb Ivanov",
    rank: "Chief Engineer",
    vesselName: "MV Voyager",
    signOn: "2022-12-01",
    signOff: "2023-11-28",
    status: "OVERDUE",
  },
  {
    crewId: "jorge_cruz",
    contractId: "C-JC-04",
    crewName: "Jorge Cruz",
    rank: "AB Seaman",
    vesselName: "MV Starship",
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

const CustomYAxisTick = (props: any) => {
    const { x, y, index } = props;
    const data = demoBars[index];
    if (!data) return null;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={-10} y={0} dy={4} textAnchor="end" fill="#333" fontSize={13} fontWeight={600}>
                {data.crewName}
            </text>
            <text x={-10} y={0} dy={18} textAnchor="end" fill="#777" fontSize={11}>
                {data.rank}
            </text>
        </g>
    );
};

const renderCustomBarLabel = (props: any) => {
  const { x, y, width, index } = props;
  const data = demoBars[index];
  if (!data) return null;

  return (
    <g>
      <text x={x + 10} y={y + 16} textAnchor="start" fill="#fff" fontSize={12} fontWeight="500">
        {data.vesselName}
      </text>
    </g>
  );
};

type Props = {
  onBarClick?: (crewId: string, contractId: string) => void;
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
            barSize={32}
          >
            <YAxis dataKey="crewName" type="category" axisLine={false} tickLine={false} width={180} tick={<CustomYAxisTick />} />
            <XAxis type="number" hide />
            <Tooltip
              contentStyle={{ fontSize: 14, background: "#fff", border: "1px solid #ddd", borderRadius: "0.5rem" }}
              labelStyle={{ fontWeight: "bold", color: "#333" }}
              formatter={(value, key, { payload }) => [
                `${payload.signOn} → ${payload.signOff}`,
                `Contract (${payload.vesselName})`
              ]}
              labelFormatter={(label, payload) => payload[0]?.payload.crewName}
            />
            <Bar
              dataKey={() => {
                // demo: each bar = 1, real: duration
                return 1;
              }}
              fill="#888"
              isAnimationActive={false}
              onClick={(data) => onBarClick?.(data.crewId, data.contractId)}
            >
              {demoBars.map((entry) => (
                <Cell
                  key={`cell-${entry.crewId}`}
                  fill={statusBarColor(entry.status)}
                  cursor="pointer"
                />
              ))}
              <LabelList
                content={renderCustomBarLabel}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

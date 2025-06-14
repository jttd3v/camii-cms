
type AuditEvent = {
  time: string;
  action: string;
  user: string;
  details?: string;
};

const demoAudit: Record<string, AuditEvent[]> = {
  // Mapping by contractId for demo
  c001: [
    {
      time: "2024-01-10 10:05",
      action: "Contract created",
      user: "J. Rosales",
      details: "Initial contract (POEA)",
    },
    {
      time: "2024-03-05 12:22",
      action: "Extension approved",
      user: "Fleet Manager",
      details: "Reason: trade route delay, new sign-off: 2025-01-10",
    },
    {
      time: "2024-03-05 14:09",
      action: "Digital Signature",
      user: "A. Reyes",
    },
  ],
  c002: [
    {
      time: "2023-08-11 09:23",
      action: "Contract created",
      user: "HR",
      details: "MLC contract signed (digital)",
    },
  ],
  c003: [
    {
      time: "2022-12-01 08:00",
      action: "Contract created",
      user: "HR",
    },
    {
      time: "2023-11-29 17:15",
      action: "Overstay warning",
      user: "System",
      details: "Exceeded contract duration (MLC).",
    },
  ],
};

type Props = {
  crewId: string;
  contractId: string;
};

export default function AuditTrailPanel({ crewId, contractId }: Props) {
  const list = demoAudit[contractId] || [];

  return (
    <section className="bg-popover p-4 rounded-lg border">
      <div className="font-semibold mb-2 text-sm">Audit Trail</div>
      <ul className="text-xs">
        {list.length === 0 ? (
          <li className="text-muted-foreground">No events found.</li>
        ) : (
          list.map((evt, idx) => (
            <li key={idx} className="mb-1 border-l-2 border-muted pl-2">
              <span className="font-medium">{evt.time}</span>: {evt.action} by <span className="font-semibold">{evt.user}</span>
              {evt.details ? (
                <div className="pl-2 text-muted-foreground">{evt.details}</div>
              ) : null}
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

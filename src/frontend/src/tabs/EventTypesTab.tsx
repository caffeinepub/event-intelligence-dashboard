import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const typesData = [
  {
    year: "2022",
    Conference: 5,
    Hackathon: 0,
    "Meetup / Community": 42,
    "Office / Hosted": 0,
    "VIP / Exclusive": 0,
  },
  {
    year: "2023",
    Conference: 95,
    Hackathon: 86,
    "Meetup / Community": 53,
    "Office / Hosted": 9,
    "VIP / Exclusive": 9,
  },
  {
    year: "2024",
    Conference: 90,
    Hackathon: 7,
    "Meetup / Community": 39,
    "Office / Hosted": 6,
    "VIP / Exclusive": 11,
  },
  {
    year: "2025",
    Conference: 25,
    Hackathon: 12,
    "Meetup / Community": 13,
    "Office / Hosted": 5,
    "VIP / Exclusive": 1,
  },
];

const typeColors: Record<string, string> = {
  Conference: "rgba(59,130,246,0.82)",
  Hackathon: "rgba(245,158,11,0.82)",
  "Meetup / Community": "rgba(16,185,129,0.82)",
  "Office / Hosted": "rgba(167,139,250,0.82)",
  "VIP / Exclusive": "rgba(239,68,68,0.72)",
};

const tableData = [
  {
    format: "Conference",
    y2022: 5,
    y2023: 95,
    y2024: 90,
    y2025: 25,
    total: 215,
  },
  { format: "Hackathon", y2022: 0, y2023: 86, y2024: 7, y2025: 12, total: 105 },
  {
    format: "Meetup / Community",
    y2022: 42,
    y2023: 53,
    y2024: 39,
    y2025: 13,
    total: 147,
  },
  {
    format: "Office / Hosted",
    y2022: 0,
    y2023: 9,
    y2024: 6,
    y2025: 5,
    total: 20,
  },
  {
    format: "VIP / Exclusive",
    y2022: 0,
    y2023: 9,
    y2024: 11,
    y2025: 1,
    total: 21,
  },
];

const yearKeys = [
  { key: "y2022", label: "2022" },
  { key: "y2023", label: "2023" },
  { key: "y2024", label: "2024" },
  { key: "y2025", label: "2025" },
] as const;

const tooltipStyle = {
  backgroundColor: "#1a1d27",
  border: "1px solid #2d3148",
  borderRadius: 8,
  padding: 12,
};

export function EventTypesTab() {
  return (
    <section>
      <div style={{ marginBottom: 24 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "-0.3px",
            color: "var(--text)",
          }}
        >
          Event Types
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>
          Format mix evolution — 2022 to 2025
        </p>
      </div>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          padding: 24,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            marginBottom: 4,
            color: "var(--text)",
          }}
        >
          Event Type Mix by Year
        </div>
        <div
          style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 20 }}
        >
          Top 5 formats — grouped by year
        </div>
        <div style={{ height: 380 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={typesData}
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
              barCategoryGap="25%"
              barGap={3}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />
              <XAxis
                dataKey="year"
                tick={{ fill: "#8b90a8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#8b90a8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: "#e8eaf0", fontWeight: 600, fontSize: 13 }}
                itemStyle={{ color: "#8b90a8", fontSize: 12 }}
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
              />
              <Legend
                wrapperStyle={{
                  color: "#8b90a8",
                  fontSize: 12,
                  paddingTop: 16,
                }}
                iconType="rect"
                iconSize={12}
              />
              {Object.keys(typeColors).map((type) => (
                <Bar
                  key={type}
                  dataKey={type}
                  fill={typeColors[type]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            background: "var(--surface2)",
            borderLeft: "3px solid var(--blue)",
            borderRadius: "0 6px 6px 0",
            color: "var(--text-muted)",
            fontSize: 12.5,
            lineHeight: 1.6,
            marginTop: 16,
            padding: "12px 16px",
          }}
        >
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>
            Hackathon spike in 2023
          </strong>{" "}
          (86 events) was driven by ICP Hub activations across India, Africa,
          and LATAM — a volume play that collapsed sharply in 2024 (7 events) as
          the hub model was discontinued. Hackathons are recovering more
          selectively in 2025 (12 events), with a focus on developer-quality
          over geographic reach.{" "}
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>
            Meetup / Community
          </strong>{" "}
          events have been the most consistent format across all years, forming
          the backbone of the programme.
        </div>
      </div>

      {/* Reference Table */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          padding: 24,
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            marginBottom: 4,
            color: "var(--text)",
          }}
        >
          Format Breakdown — Reference
        </div>
        <div
          style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 16 }}
        >
          Raw counts by type and year
        </div>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr>
                {["Format", "2022", "2023", "2024", "2025", "Total"].map(
                  (h, i) => (
                    <th
                      key={h}
                      style={{
                        background: "var(--surface2)",
                        color: "var(--text-muted)",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                        padding: "10px 14px",
                        textAlign: i === 0 ? "left" : "right",
                        textTransform: "uppercase",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={row.format}>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom:
                        i < tableData.length - 1
                          ? "1px solid var(--border)"
                          : "none",
                      color: "var(--text)",
                    }}
                  >
                    {row.format}
                  </td>
                  {yearKeys.map(({ key, label }) => (
                    <td
                      key={label}
                      style={{
                        padding: "10px 14px",
                        borderBottom:
                          i < tableData.length - 1
                            ? "1px solid var(--border)"
                            : "none",
                        color: "var(--text)",
                        textAlign: "right",
                      }}
                    >
                      {row[key]}
                    </td>
                  ))}
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom:
                        i < tableData.length - 1
                          ? "1px solid var(--border)"
                          : "none",
                      textAlign: "right",
                    }}
                  >
                    <strong style={{ color: "var(--text)" }}>
                      {row.total}
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

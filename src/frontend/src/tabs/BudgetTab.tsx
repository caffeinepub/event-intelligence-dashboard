import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const budgetData = [
  {
    name: "Major Flagship",
    full: "Major flagship (own format)",
    midpoint: 85000,
    range: "CHF 50k – 120k",
    notes: "Full production, venue, AV, catering",
    color: "rgba(59,130,246,0.88)",
  },
  {
    name: "Major External Conf.",
    full: "Major external conference",
    midpoint: 67500,
    range: "CHF 50k – 85k",
    notes: "Sponsorship + side event + team travel",
    color: "rgba(59,130,246,0.82)",
  },
  {
    name: "Mid-size Swiss Conf.",
    full: "Mid-size Swiss conference",
    midpoint: 35000,
    range: "CHF 15k – 55k",
    notes: "Sponsorship tier + activations",
    color: "rgba(59,130,246,0.72)",
  },
  {
    name: "Hackathon (External)",
    full: "Hackathon (external)",
    midpoint: 19000,
    range: "CHF 8k – 30k",
    notes: "Prize pool + logistics + team",
    color: "rgba(59,130,246,0.60)",
  },
  {
    name: "Side Event / Evening",
    full: "Side event / hosted evening",
    midpoint: 8000,
    range: "CHF 1k – 15k",
    notes: "Venue hire, catering, AV basics",
    color: "rgba(59,130,246,0.48)",
  },
  {
    name: "Office / Internal",
    full: "Office / internal event",
    midpoint: 1850,
    range: "CHF 700 – 3k",
    notes: "Catering, basic setup only",
    color: "rgba(59,130,246,0.38)",
  },
];

const tooltipStyle = {
  backgroundColor: "#1a1d27",
  border: "1px solid #2d3148",
  borderRadius: 8,
  padding: 12,
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={tooltipStyle}>
      <div
        style={{
          color: "#e8eaf0",
          fontWeight: 600,
          fontSize: 13,
          marginBottom: 6,
        }}
      >
        {d.full}
      </div>
      <div style={{ color: "#8b90a8", fontSize: 12 }}>
        Midpoint: CHF {d.midpoint.toLocaleString()}
      </div>
      <div style={{ color: "#8b90a8", fontSize: 12 }}>Range: {d.range}</div>
      <div style={{ color: "#8b90a8", fontSize: 11, marginTop: 4 }}>
        {d.notes}
      </div>
    </div>
  );
};

const RangeLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  return (
    <text
      x={x + width + 8}
      y={y + height / 2}
      fill="#8b90a8"
      fontSize={11}
      dominantBaseline="middle"
    >
      {value}
    </text>
  );
};

const xTickFormatter = (v: number) => {
  if (v >= 1000) return `CHF ${(v / 1000).toFixed(0)}k`;
  return `CHF ${v}`;
};

const CustomYTick = ({ x, y, payload }: any) => {
  return (
    <text x={x} y={y} dy={4} textAnchor="end" fill="#e8eaf0" fontSize={12}>
      {payload.value}
    </text>
  );
};

const tableRows = [
  {
    format: "Major flagship (own format)",
    low: "50,000",
    high: "120,000",
    mid: "85,000",
    notes: "Full production, venue, AV, catering",
  },
  {
    format: "Major external conference",
    low: "50,000",
    high: "85,000",
    mid: "67,500",
    notes: "Sponsorship + side event + team travel",
  },
  {
    format: "Mid-size Swiss conference",
    low: "15,000",
    high: "55,000",
    mid: "35,000",
    notes: "Sponsorship tier + activations",
  },
  {
    format: "Hackathon (external)",
    low: "8,000",
    high: "30,000",
    mid: "19,000",
    notes: "Prize pool + logistics + team",
  },
  {
    format: "Side event / hosted evening",
    low: "1,000",
    high: "15,000",
    mid: "8,000",
    notes: "Venue hire, catering, AV basics",
  },
  {
    format: "Office / internal event",
    low: "700",
    high: "3,000",
    mid: "1,850",
    notes: "Catering, basic setup only",
  },
];

export function BudgetTab() {
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
          Budget Benchmarks
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>
          Typical investment ranges by event format — all figures in CHF
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
          Budget Range by Format
        </div>
        <div
          style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 20 }}
        >
          Bar shows midpoint · label shows full range · currency: CHF
        </div>
        <div style={{ height: 380 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={budgetData}
              margin={{ top: 5, right: 160, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fill: "#8b90a8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={xTickFormatter}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tick={<CustomYTick />}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
              />
              <Bar dataKey="midpoint" radius={[0, 5, 5, 0]}>
                {budgetData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
                <LabelList dataKey="range" content={<RangeLabel />} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            background: "var(--surface2)",
            borderLeft: "3px solid var(--green)",
            borderRadius: "0 6px 6px 0",
            color: "var(--text-muted)",
            fontSize: 12.5,
            lineHeight: 1.6,
            marginTop: 16,
            padding: "12px 16px",
          }}
        >
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>
            How to use these benchmarks:
          </strong>{" "}
          Midpoints are useful for initial planning and leadership asks. Always
          present ranges in concept notes. Add a{" "}
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>
            10% contingency
          </strong>{" "}
          as a separate line item. Flag clearly when figures are assumptions vs.
          real quotes.
        </div>
      </div>

      {/* Detailed Table */}
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
          Detailed Budget Reference
        </div>
        <div
          style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 16 }}
        >
          Use these ranges for concept notes and budget proposals
        </div>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr>
                {["Format", "Low (CHF)", "High (CHF)", "Midpoint", "Notes"].map(
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
                        textAlign: i === 0 ? "left" : i < 4 ? "right" : "left",
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
              {tableRows.map((row, i) => (
                <tr key={row.format}>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom:
                        i < tableRows.length - 1
                          ? "1px solid var(--border)"
                          : "none",
                      color: "var(--text)",
                    }}
                  >
                    <strong>{row.format}</strong>
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom:
                        i < tableRows.length - 1
                          ? "1px solid var(--border)"
                          : "none",
                      color: "var(--text-muted)",
                      textAlign: "right",
                    }}
                  >
                    {row.low}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom:
                        i < tableRows.length - 1
                          ? "1px solid var(--border)"
                          : "none",
                      color: "var(--text-muted)",
                      textAlign: "right",
                    }}
                  >
                    {row.high}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom:
                        i < tableRows.length - 1
                          ? "1px solid var(--border)"
                          : "none",
                      textAlign: "right",
                    }}
                  >
                    <strong style={{ color: "var(--blue)" }}>{row.mid}</strong>
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom:
                        i < tableRows.length - 1
                          ? "1px solid var(--border)"
                          : "none",
                      color: "var(--text-muted)",
                      fontSize: 12,
                    }}
                  >
                    {row.notes}
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

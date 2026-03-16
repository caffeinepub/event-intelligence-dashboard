import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "#1a1d27",
  border: "1px solid #2d3148",
  borderRadius: 8,
  padding: 12,
};
const tooltipLabelStyle = { color: "#e8eaf0", fontWeight: 600, fontSize: 13 };
const tooltipItemStyle = { color: "#8b90a8", fontSize: 12 };

const years = ["2022", "2023", "2024", "2025"];

const hackYearData = years.map((year, i) => ({
  year,
  "DFINITY Organising": [1, 3, 4, 1][i],
  Sponsoring: [0, 3, 16, 9][i],
}));

const hackInvestData = years.map((year, i) => ({
  year,
  "Cash Prizes": [765000, 48000, 187250, 32250][i],
  "Dev Grants": [765000, 180000, 435000, 60000][i],
}));

const hackFunnelData = years.map((year, i) => ({
  year,
  Registrants: [3565, 516, 1651, 1741][i],
  Submissions: [368, 54, 294, 126][i],
}));

const convData = years.map((year, i) => ({
  year,
  rate: [10.3, 10.5, 17.8, 7.2][i],
}));

const partnerData = [
  { name: "Encode Club", value: 14, color: "#3b82f6" },
  { name: "Knowledge Foundation", value: 4, color: "#60a5fa" },
  { name: "ETH Denver", value: 2, color: "#818cf8" },
  { name: "Bitcoin Startup Lab", value: 2, color: "#f59e0b" },
  { name: "AI Agents", value: 2, color: "#34d399" },
  { name: "ETH Global", value: 1, color: "#a78bfa" },
  { name: "Others", value: 12, color: "#475569" },
];

const pipelineData = [
  { name: "Done", value: 4, color: "#34d399" },
  { name: "Confirmed", value: 5, color: "#3b82f6" },
  { name: "Declined", value: 15, color: "#f87171" },
  { name: "New", value: 1, color: "#f59e0b" },
];

const kpis = [
  {
    color: "var(--blue)",
    label: "Total Hackathons",
    value: "37",
    sub: "2022 – 2025 (Growth Team data)",
  },
  {
    color: "var(--green)",
    label: "Total Registrants",
    value: "7,473",
    sub: "Across all tracked hackathons",
  },
  {
    color: "var(--amber)",
    label: "Total Submissions",
    value: "842",
    sub: "11.3% conversion rate",
  },
  {
    color: "var(--purple)",
    label: "Total Investment",
    value: "$2.47M",
    sub: "Cash prizes + dev grants",
  },
];

const prizeStats = [
  { label: "Total prize records", value: "138" },
  { label: "Cash prizes tracked (shown batch)", value: "$124,000" },
  { label: "Dev grants tracked (shown batch)", value: "$195,000" },
  { label: "Distributed", value: "14 of 41", green: true },
  { label: "Pending distribution", value: "27 of 41", amber: true },
];

export function HackathonsTab() {
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
          Hackathons
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>
          Developer engagement, investment, and hackathon pipeline
        </p>
      </div>

      {/* KPI cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "20px 22px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: kpi.color,
              }}
            />
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.6px",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {kpi.label}
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: "-0.5px",
                lineHeight: 1.1,
                color: kpi.color,
              }}
            >
              {kpi.value}
            </div>
            <div
              style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 6 }}
            >
              {kpi.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Year + Investment */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
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
            Hackathons by Year
          </div>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 12,
              marginBottom: 20,
            }}
          >
            Volume and category split (DFINITY-organised vs. sponsored)
          </div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={hackYearData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
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
                  labelStyle={tooltipLabelStyle}
                  itemStyle={tooltipItemStyle}
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
                <Bar
                  dataKey="DFINITY Organising"
                  stackId="a"
                  fill="rgba(59,130,246,0.85)"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="Sponsoring"
                  stackId="a"
                  fill="rgba(129,140,248,0.85)"
                  radius={[5, 5, 0, 0]}
                />
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
            2022 was a single flagship event (Supernova). Volume peaked in 2024
            with 20 hackathons – mostly sponsored. 2025 shows a deliberate shift
            back toward fewer, more strategic engagements.
          </div>
        </div>

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
            Investment by Year
          </div>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 12,
              marginBottom: 20,
            }}
          >
            Cash prizes vs. developer grants (USD)
          </div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={hackInvestData}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
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
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={tooltipLabelStyle}
                  itemStyle={tooltipItemStyle}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, ""]}
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
                <Bar
                  dataKey="Cash Prizes"
                  fill="rgba(245,158,11,0.85)"
                  radius={[5, 5, 0, 0]}
                />
                <Bar
                  dataKey="Dev Grants"
                  fill="rgba(59,130,246,0.85)"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div
            style={{
              background: "var(--surface2)",
              borderLeft: "3px solid var(--amber)",
              borderRadius: "0 6px 6px 0",
              color: "var(--text-muted)",
              fontSize: 12.5,
              lineHeight: 1.6,
              marginTop: 16,
              padding: "12px 16px",
            }}
          >
            2022&apos;s $1.53M was almost entirely Supernova (the flagship
            hackathon with $765k in prizes + $765k in grants). Since then, dev
            grants consistently outweigh cash prizes.
          </div>
        </div>
      </div>

      {/* Funnel + Conversion */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
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
            Registrants &amp; Submissions
          </div>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 12,
              marginBottom: 20,
            }}
          >
            Developer engagement funnel by year
          </div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={hackFunnelData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
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
                  labelStyle={tooltipLabelStyle}
                  itemStyle={tooltipItemStyle}
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
                <Bar
                  dataKey="Registrants"
                  fill="rgba(59,130,246,0.85)"
                  radius={[5, 5, 0, 0]}
                />
                <Bar
                  dataKey="Submissions"
                  fill="rgba(52,211,153,0.85)"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

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
            Conversion Rate
          </div>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 12,
              marginBottom: 20,
            }}
          >
            Submissions as % of registrants
          </div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={convData}
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
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
                  domain={[0, 25]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={tooltipLabelStyle}
                  itemStyle={tooltipItemStyle}
                  formatter={(v) => [`${v}%`, "Conversion rate"]}
                />
                <Line
                  dataKey="rate"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ fill: "#f59e0b", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div
            style={{
              background: "var(--surface2)",
              borderLeft: "3px solid var(--amber)",
              borderRadius: "0 6px 6px 0",
              color: "var(--text-muted)",
              fontSize: 12.5,
              lineHeight: 1.6,
              marginTop: 16,
              padding: "12px 16px",
            }}
          >
            Conversion dropped in 2024–2025 as hackathon formats shifted to
            larger-reach, lower-barrier events. Supernova (2022) set the
            benchmark at 10.3%.
          </div>
        </div>
      </div>

      {/* Partners */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          padding: 24,
          marginBottom: 20,
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
          Top Organiser Partners
        </div>
        <div
          style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 20 }}
        >
          Number of hackathons by partner (all time)
        </div>
        <div style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={partnerData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
              />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tick={{ fill: "#e8eaf0", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
              />
              <Bar dataKey="value" radius={[0, 5, 5, 0]}>
                {partnerData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    fillOpacity={0.85}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pipeline + Prize distribution */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
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
            2025–26 Hackathon Pipeline
          </div>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 12,
              marginBottom: 16,
            }}
          >
            Growth team&apos;s current plan status
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pipelineData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {pipelineData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={tooltipLabelStyle}
                  itemStyle={tooltipItemStyle}
                />
                <Legend
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{ color: "#8b90a8", fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

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
            Prize Distribution Status
          </div>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 12,
              marginBottom: 16,
            }}
          >
            Of 138 total prize records in Airtable
          </div>
          <div>
            {prizeStats.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "11px 0",
                  borderBottom:
                    i < prizeStats.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                }}
              >
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  {stat.label}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: stat.green
                      ? "#34d399"
                      : stat.amber
                        ? "#f59e0b"
                        : "var(--text)",
                  }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
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
            Only 34% of tracked prizes have been distributed. This is a
            potential follow-up item for the growth team.
          </div>
        </div>
      </div>
    </section>
  );
}

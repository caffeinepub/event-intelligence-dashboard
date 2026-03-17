import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { type SourceKey, quarterlyLabels, srcData } from "../data/srcData";

const tooltipStyle = {
  backgroundColor: "#1a1d27",
  border: "1px solid #2d3148",
  borderRadius: 8,
  padding: 12,
};
const tooltipLabelStyle = { color: "#e8eaf0", fontWeight: 600, fontSize: 13 };
const tooltipItemStyle = { color: "#8b90a8", fontSize: 12 };

const sourceDonut = [
  { name: "DFINITY Direct", value: 267, color: "#3b82f6" },
  { name: "ICP Hubs", value: 204, color: "#818cf8" },
  { name: "Community Grantees", value: 80, color: "#34d399" },
  { name: "External", value: 12, color: "#475569" },
];

const modeDonut = [
  { name: "In-Person (IRL)", value: 576, color: "#3b82f6" },
  { name: "Virtual", value: 69, color: "#818cf8" },
  { name: "Hybrid", value: 64, color: "#34d399" },
];

const costRegion = [
  { name: "Europe", value: 409513, color: "#3b82f6" },
  { name: "Asia", value: 210150, color: "#818cf8" },
  { name: "Middle East", value: 182200, color: "#f59e0b" },
  { name: "N. America", value: 132050, color: "#34d399" },
  { name: "Africa", value: 54000, color: "#f87171" },
  { name: "S. America", value: 15000, color: "#a78bfa" },
  { name: "Online", value: 6000, color: "#475569" },
];

const kpis = [
  {
    color: "var(--blue)",
    label: "Total Spend",
    value: "CHF 1.27M",
    sub: "Across 171 events with cost data",
  },
  {
    color: "var(--green)",
    label: "Median Cost",
    value: "CHF 2k",
    sub: "Per event",
  },
  {
    color: "var(--amber)",
    label: "IRL Events",
    value: "576",
    sub: "73% of all events",
  },
  {
    color: "var(--purple)",
    label: "Attending vs Organizing",
    value: "68%",
    sub: "365 attending, 170 organizing",
  },
];

interface Props {
  source: SourceKey;
}

export function ParticipationTab({ source }: Props) {
  const isAll = source === "all";

  const quarterlyChartData = quarterlyLabels.map((label, i) => ({
    label,
    ...(isAll
      ? {
          DFINITY: srcData.quarterly.dfinity[i],
          "ICP Hub": srcData.quarterly.hub[i],
          Community: srcData.quarterly.community[i],
        }
      : { [srcData.labels[source]]: srcData.quarterly[source][i] }),
  }));

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
          Participation
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>
          Event sourcing, format modes, quarterly trends, and cost distribution
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

      {/* Donuts row */}
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
            Event Source
          </div>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 12,
              marginBottom: 16,
            }}
          >
            Who sourced or drove the event
          </div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceDonut}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={2}
                >
                  {sourceDonut.map((entry) => (
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
            DFINITY-direct events make up 47% of all completed activity. ICP
            Hubs contributed 36% (primarily 2023) and Web3 Community Grantees
            14%.
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
            Event Mode
          </div>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 12,
              marginBottom: 16,
            }}
          >
            In-person, virtual, or hybrid
          </div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={modeDonut}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={2}
                >
                  {modeDonut.map((entry) => (
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
      </div>

      {/* Quarterly chart */}
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
          Quarterly Volume
        </div>
        <div
          style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 20 }}
        >
          Completed events per quarter
        </div>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              key={source}
              data={quarterlyChartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fill: "#8b90a8", fontSize: 10 }}
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
              {isAll ? (
                <Legend
                  wrapperStyle={{
                    color: "#8b90a8",
                    fontSize: 12,
                    paddingTop: 16,
                  }}
                  iconType="rect"
                  iconSize={12}
                />
              ) : null}
              {isAll ? (
                <>
                  <Bar
                    dataKey="DFINITY"
                    stackId="a"
                    fill="rgba(59,130,246,0.85)"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="ICP Hub"
                    stackId="a"
                    fill="rgba(129,140,248,0.85)"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="Community"
                    stackId="a"
                    fill="rgba(52,211,153,0.85)"
                    radius={[5, 5, 0, 0]}
                  />
                </>
              ) : (
                <Bar
                  dataKey={srcData.labels[source]}
                  fill={srcData.colors[source]}
                  radius={[5, 5, 0, 0]}
                />
              )}
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
          Q4 2023 was the absolute peak (176 completed events in a single
          quarter), driven by the ICP Hub expansion. Since then, volume has
          normalised to 15–40 events per quarter with an increasingly selective
          approach.
        </div>
      </div>

      {/* Cost by region */}
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
          Cost by Region
        </div>
        <div
          style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 20 }}
        >
          Total estimated cost where data is available
        </div>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={costRegion}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fill: "#8b90a8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#8b90a8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `CHF ${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
                formatter={(v: number) => [
                  `CHF ${v.toLocaleString()}`,
                  "Total Cost",
                ]}
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
              />
              <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                {costRegion.map((entry) => (
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
    </section>
  );
}

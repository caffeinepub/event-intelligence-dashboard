import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { type SourceKey, srcData } from "../data/srcData";

const years = ["2022", "2023", "2024", "2025"];

const selectionData = [
  { year: "2022", rate: 100 },
  { year: "2023", rate: 81 },
  { year: "2024", rate: 62 },
  { year: "2025", rate: 54 },
];

const tooltipStyle = {
  backgroundColor: "#1a1d27",
  border: "1px solid #2d3148",
  borderRadius: 8,
  padding: 12,
};
const tooltipLabelStyle = { color: "#e8eaf0", fontWeight: 600, fontSize: 13 };
const tooltipItemStyle = { color: "#8b90a8", fontSize: 12 };

interface Props {
  source: SourceKey;
}

export function OverviewTab({ source }: Props) {
  const total = (srcData.yoy[source] as unknown as number[]).reduce(
    (a, b) => a + b,
    0,
  );

  const yoyChartData = years.map((year, i) => {
    if (source === "all") {
      return {
        year,
        DFINITY: srcData.yoy.dfinity[i],
        "ICP Hub": srcData.yoy.hub[i],
        Community: srcData.yoy.community[i],
      };
    }
    return { year, [srcData.labels[source]]: srcData.yoy[source][i] };
  });

  const color = srcData.colors[source];

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
          Overview
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>
          Aggregate performance across the full event history (2022–2026)
        </p>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {[
          {
            color: "var(--blue)",
            label: "Total Events",
            value: total.toString(),
            sub:
              source === "all"
                ? "Completed 2022 – 2026"
                : `${srcData.labels[source]} events`,
          },
          {
            color: "var(--green)",
            label: "Countries Reached",
            value: "30+",
            sub: "Across full history",
          },
          {
            color: "var(--amber)",
            label: "Peak Year",
            value: "2023",
            sub: "280 events completed",
          },
          {
            color: "var(--purple)",
            label: "Current Selection Rate",
            value: "54%",
            sub: "↓ from 100% in 2022",
          },
        ].map((kpi) => (
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
                fontSize: 36,
                fontWeight: 800,
                letterSpacing: "-1px",
                lineHeight: 1,
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

      {/* YoY Chart */}
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
          Events by Year
        </div>
        <div
          style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 20 }}
        >
          Completed vs. declined — 2022 to 2025
        </div>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={yoyChartData}
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
              barCategoryGap="30%"
              barGap={4}
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
                tickCount={7}
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
              {source === "all" ? (
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
                  fill={color}
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
          Selection rate has dropped from 100% in 2022 to ~54% in 2025 —
          reflecting a deliberate, criteria-driven approach to event investment
          post-ICP Hub era.
        </div>
      </div>

      {/* Selection Rate */}
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
          Selection Rate Trend
        </div>
        <div
          style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 20 }}
        >
          % of evaluated events actually attended
        </div>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={selectionData}
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
                domain={[0, 110]}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
                formatter={(v) => [`${v}%`, "Selection rate"]}
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
      </div>
    </section>
  );
}

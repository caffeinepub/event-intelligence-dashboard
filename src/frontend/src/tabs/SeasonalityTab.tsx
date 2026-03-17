import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { type SourceKey, srcData } from "../data/srcData";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const peakMonths = [8, 9, 10];

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

export function SeasonalityTab({ source }: Props) {
  const isAll = source === "all";

  const chartData = months.map((m, i) => ({
    month: m,
    ...(isAll
      ? {
          DFINITY: srcData.month.dfinity[i],
          "ICP Hub": srcData.month.hub[i],
          Community: srcData.month.community[i],
        }
      : { [srcData.labels[source]]: srcData.month[source][i] }),
    peak: peakMonths.includes(i),
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
          Seasonality
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>
          Monthly distribution of completed events — all time
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
          Events by Month
        </div>
        <div
          style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 20 }}
        >
          All completed events across full history (2022–2026)
        </div>
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              key={source}
              data={chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
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
                <Bar dataKey={srcData.labels[source]} radius={[5, 5, 0, 0]}>
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.month}
                      fill={
                        entry.peak
                          ? "rgba(245,158,11,0.85)"
                          : `${srcData.colors[source]}cc`
                      }
                    />
                  ))}
                </Bar>
              )}
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
          <strong style={{ color: "#f59e0b" }}>
            October–November is peak season.
          </strong>{" "}
          Plan 3–4 months ahead for anything in this window — budget approvals,
          venue bookings, and speaker outreach all need to happen in summer.
          January–May is the quietest window and the best time for internal
          planning.
        </div>
      </div>
    </section>
  );
}

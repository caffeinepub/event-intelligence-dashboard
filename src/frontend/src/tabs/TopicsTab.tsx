import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const topicData = [
  { name: "Blockchain", value: 142, color: "#3b82f6" },
  { name: "Web3", value: 58, color: "#818cf8" },
  { name: "ETH", value: 26, color: "#6366f1" },
  { name: "BTC", value: 21, color: "#f59e0b" },
  { name: "Mainstream", value: 19, color: "#34d399" },
  { name: "AI", value: 19, color: "#f87171" },
  { name: "Tech", value: 16, color: "#a78bfa" },
  { name: "DeFi", value: 10, color: "#fb923c" },
  { name: "Sustainability", value: 9, color: "#2dd4bf" },
  { name: "NFT", value: 10, color: "#c084fc" },
];

const activationData = [
  { name: "Panel", value: 49, color: "#3b82f6" },
  { name: "Keynote", value: 35, color: "#60a5fa" },
  { name: "Workshop", value: 27, color: "#818cf8" },
  { name: "Side Event", value: 20, color: "#34d399" },
  { name: "Networking", value: 19, color: "#f59e0b" },
  { name: "Pitch Event", value: 6, color: "#a78bfa" },
  { name: "Booth", value: 5, color: "#f87171" },
];

const tooltipStyle = {
  backgroundColor: "#1a1d27",
  border: "1px solid #2d3148",
  borderRadius: 8,
  padding: 12,
};
const tooltipLabelStyle = { color: "#e8eaf0", fontWeight: 600, fontSize: 13 };
const tooltipItemStyle = { color: "#8b90a8", fontSize: 12 };

const kpis = [
  {
    color: "var(--blue)",
    label: "Top Topic",
    value: "Blockchain",
    sub: "142 completed events",
  },
  {
    color: "var(--green)",
    label: "Fastest Growing Topic",
    value: "AI",
    sub: "Rising since 2024",
  },
  {
    color: "var(--amber)",
    label: "Top Activation",
    value: "Panel",
    sub: "49 events (excl. hackathons)",
  },
  {
    color: "var(--purple)",
    label: "Keynote Appearances",
    value: "35",
    sub: "Across all events",
  },
];

export function TopicsTab() {
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
          Topics &amp; Activations
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>
          Primary topic distribution and activation formats across all events
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Topics chart */}
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
            Event Topics
          </div>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 12,
              marginBottom: 20,
            }}
          >
            Primary topic tag on completed events
          </div>
          <div style={{ height: 340 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={topicData}
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
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
                  width={90}
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
                  {topicData.map((entry) => (
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

        {/* Activation chart */}
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
            Activation Types
          </div>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 12,
              marginBottom: 20,
            }}
          >
            How DFINITY participates at events
          </div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={activationData}
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
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
                  width={90}
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
                  {activationData.map((entry) => (
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
            Panels are the most common activation format (49), followed by
            keynotes (35) and workshops (27). Booth presence is relatively rare
            (5) – DFINITY favours content-led participation over exhibition.
          </div>
        </div>
      </div>
    </section>
  );
}

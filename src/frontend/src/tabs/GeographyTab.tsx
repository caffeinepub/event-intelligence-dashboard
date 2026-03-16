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

const geoData = [
  {
    year: "2022",
    Europe: 10,
    Asia: 35,
    "North America": 2,
    "Middle East": 0,
    Africa: 1,
    "South America": 0,
  },
  {
    year: "2023",
    Europe: 58,
    Asia: 128,
    "North America": 21,
    "Middle East": 20,
    Africa: 21,
    "South America": 12,
  },
  {
    year: "2024",
    Europe: 68,
    Asia: 36,
    "North America": 12,
    "Middle East": 11,
    Africa: 1,
    "South America": 4,
  },
  {
    year: "2025",
    Europe: 17,
    Asia: 3,
    "North America": 5,
    "Middle East": 0,
    Africa: 0,
    "South America": 0,
  },
];

const regionColors: Record<string, string> = {
  Europe: "rgba(59,130,246,0.85)",
  Asia: "rgba(167,139,250,0.85)",
  "North America": "rgba(16,185,129,0.85)",
  "Middle East": "rgba(245,158,11,0.85)",
  Africa: "rgba(239,68,68,0.78)",
  "South America": "rgba(20,184,166,0.85)",
};

const countryRows = [
  { rank: "1", country: "Switzerland 🇨🇭", events: 16, share: "47%" },
  { rank: "2", country: "Online 🌐", events: 4, share: "12%" },
  { rank: "2", country: "France 🇫🇷", events: 4, share: "12%" },
  { rank: "4", country: "USA 🇺🇸", events: 7, share: "21%" },
  { rank: "5", country: "UAE 🇦🇪", events: 3, share: "9%" },
];

const eraBlocks = [
  {
    era: "2022–2023",
    text: "Asia-dominant, ICP Hub-driven. 128 events in Asia (2023), primarily India, Africa, LATAM activations.",
  },
  {
    era: "2024",
    text: "Sharp pivot to Europe (68 events). Asia collapses to 36. Signals move toward institutional and developer audiences.",
  },
  {
    era: "2025",
    text: "Europe leads (17), Asia minimal (3). Switzerland home-base strategy: 47% of Mareen's events are in-country.",
  },
];

const tooltipStyle = {
  backgroundColor: "#1a1d27",
  border: "1px solid #2d3148",
  borderRadius: 8,
  padding: 12,
};

export function GeographyTab() {
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
          Geography
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>
          Regional mix by year — showing the strategic shift from Asia-heavy to
          Europe-led
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
          Events by Region per Year
        </div>
        <div
          style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 20 }}
        >
          Stacked view — 2022 to 2025
        </div>
        <div style={{ height: 380 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={geoData}
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
                tickCount={7}
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
              {Object.keys(regionColors).map((region) => (
                <Bar
                  key={region}
                  dataKey={region}
                  stackId="a"
                  fill={regionColors[region]}
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
            Asia (2023):
          </strong>{" "}
          128 events — driven by ICP Hub activations across India, Southeast
          Asia, and East Asia. Volume collapsed in 2024 as the hub model wound
          down.{" "}
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>
            Europe
          </strong>{" "}
          has become the dominant region from 2024 onward, reflecting a
          strategic refocus on institutional and developer audiences.
        </div>
      </div>

      {/* Two-col */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
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
            Top 5 Countries
          </div>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 12,
              marginBottom: 16,
            }}
          >
            Mareen&apos;s period: March 2025 – January 2026
          </div>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr>
                {["Rank", "Country / Format", "Events", "Share"].map((h) => (
                  <th
                    key={h}
                    style={{
                      background: "var(--surface2)",
                      color: "var(--text-muted)",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      padding: "10px 14px",
                      textAlign: "left",
                      textTransform: "uppercase",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {countryRows.map((row, i) => (
                <tr key={row.country}>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom: i < 4 ? "1px solid var(--border)" : "none",
                      color: "var(--text)",
                    }}
                  >
                    <span
                      style={{
                        background: "var(--blue-dim)",
                        border: "1px solid var(--blue)",
                        borderRadius: 4,
                        color: "var(--blue)",
                        display: "inline-block",
                        fontSize: 11,
                        fontWeight: 700,
                        minWidth: 22,
                        padding: "1px 6px",
                        textAlign: "center",
                      }}
                    >
                      {row.rank}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom: i < 4 ? "1px solid var(--border)" : "none",
                      color: "var(--text)",
                    }}
                  >
                    {row.country}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom: i < 4 ? "1px solid var(--border)" : "none",
                      color: "var(--text)",
                    }}
                  >
                    <strong>{row.events}</strong>
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom: i < 4 ? "1px solid var(--border)" : "none",
                      color: "var(--text-muted)",
                    }}
                  >
                    {row.share}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            Regional Shift Summary
          </div>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: 12,
              marginBottom: 16,
            }}
          >
            Key takeaways from the geographic data
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {eraBlocks.map((item) => (
              <div
                key={item.era}
                style={{
                  background: "var(--surface2)",
                  borderRadius: 8,
                  padding: "14px 16px",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-muted)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    marginBottom: 4,
                  }}
                >
                  {item.era}
                </div>
                <div style={{ fontSize: 13, color: "var(--text)" }}>
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

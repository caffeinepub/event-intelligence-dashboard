import { useState } from "react";
import {
  type Event2026,
  type EventBrand,
  type EventPillar,
  events2026,
  quarterMeta,
} from "../data/events2026";

type BrandFilter = "all" | EventBrand;
type PillarFilter = "all" | EventPillar;

const pillarColors: Record<EventPillar, string> = {
  flagship: "#3b82f6",
  community: "#10b981",
  openhouse: "#a78bfa",
  external: "#f59e0b",
};

function matchesFilter(
  ev: Event2026,
  brand: BrandFilter,
  pillar: PillarFilter,
  showPast: boolean,
): boolean {
  const brandOk =
    brand === "all" ||
    ev.brands.includes(brand as EventBrand) ||
    ev.brands.length === 0;
  const pillarOk = pillar === "all" || ev.pillar === pillar;
  const pastOk = showPast || ev.status !== "past";
  return brandOk && pillarOk && pastOk;
}

const qBorderColors: Record<number, string> = {
  1: "rgba(59,130,246,0.3)",
  2: "rgba(16,185,129,0.3)",
  3: "rgba(245,158,11,0.3)",
  4: "rgba(167,139,250,0.3)",
};

const qGradients: Record<number, string> = {
  1: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(59,130,246,0.06))",
  2: "linear-gradient(135deg, rgba(16,185,129,0.18), rgba(16,185,129,0.06))",
  3: "linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.06))",
  4: "linear-gradient(135deg, rgba(167,139,250,0.18), rgba(167,139,250,0.06))",
};

const qLabelColors: Record<number, string> = {
  1: "#3b82f6",
  2: "#10b981",
  3: "#f59e0b",
  4: "#a78bfa",
};

const brandFilterChips: { val: BrandFilter; label: string }[] = [
  { val: "all", label: "All" },
  { val: "caffeine", label: "caffeine.ai" },
  { val: "icp", label: "DFINITY / ICP" },
];

const pillarFilterChips: { val: PillarFilter; label: string }[] = [
  { val: "all", label: "All" },
  { val: "flagship", label: "Flagship" },
  { val: "community", label: "Community" },
  { val: "openhouse", label: "Open House" },
  { val: "external", label: "External" },
];

const brandChipActive: Record<BrandFilter, React.CSSProperties> = {
  all: { background: "#3b3f52", color: "var(--text)" },
  caffeine: {
    background: "rgba(212,240,66,0.18)",
    borderColor: "#d4f042",
    color: "#d4f042",
  },
  icp: {
    background: "var(--blue-dim)",
    borderColor: "var(--blue)",
    color: "var(--blue)",
  },
};

const pillarChipActive: Record<PillarFilter, React.CSSProperties> = {
  all: { background: "#3b3f52", color: "var(--text)" },
  flagship: {
    background: "rgba(59,130,246,0.2)",
    borderColor: "var(--blue)",
    color: "var(--blue)",
  },
  community: {
    background: "rgba(16,185,129,0.18)",
    borderColor: "#10b981",
    color: "#10b981",
  },
  openhouse: {
    background: "rgba(167,139,250,0.18)",
    borderColor: "#a78bfa",
    color: "#a78bfa",
  },
  external: {
    background: "rgba(245,158,11,0.18)",
    borderColor: "var(--amber)",
    color: "var(--amber)",
  },
};

export function RoadmapTab() {
  const [brandFilter, setBrandFilter] = useState<BrandFilter>("all");
  const [pillarFilter, setPillarFilter] = useState<PillarFilter>("all");
  const [showPast, setShowPast] = useState(true);

  const total = events2026.length;
  const caffCount = events2026.filter((e) =>
    e.brands.includes("caffeine"),
  ).length;
  const icpCount = events2026.filter((e) => e.brands.includes("icp")).length;
  const flagshipCount = events2026.filter(
    (e) => e.pillar === "flagship",
  ).length;
  const upcomingCount = events2026.filter((e) => e.status !== "past").length;

  const kpis = [
    { val: total, label: "Total events planned 2026", color: "#3b82f6" },
    { val: caffCount, label: "caffeine.ai activations", color: "#d4f042" },
    { val: icpCount, label: "DFINITY / ICP appearances", color: "#93c5fd" },
    { val: flagshipCount, label: "Flagship anchors", color: "#a78bfa" },
    { val: upcomingCount, label: "Events still ahead", color: "#10b981" },
  ];

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
          2026 Roadmap
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>
          Planned events mapped to the 4-pillar framework · Caffeine &amp;
          DFINITY/ICP · Today: 16 March 2026
        </p>
      </div>

      {/* KPI mini cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {kpis.map((k) => (
          <div
            key={k.label}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "14px 16px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: "-1px",
                lineHeight: 1,
                color: k.color,
              }}
            >
              {k.val}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                marginTop: 5,
                lineHeight: 1.3,
              }}
            >
              {k.label}
            </div>
          </div>
        ))}
      </div>

      {/* Pillar legend */}
      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          marginBottom: 20,
          padding: "12px 16px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        {(
          [
            { color: "#3b82f6", label: "Quarterly Flagship" },
            { color: "#10b981", label: "Community & Building" },
            { color: "#a78bfa", label: "Open House / Feedback" },
            { color: "#f59e0b", label: "Selective External" },
          ] as const
        ).map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: "var(--text-muted)",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: item.color,
                flexShrink: 0,
              }}
            />
            {item.label}
          </div>
        ))}
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#d4f042",
              }}
            />
            <span style={{ color: "#d4f042", fontWeight: 600 }}>
              caffeine.ai
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#3b82f6",
              }}
            />
            <span style={{ color: "#93c5fd", fontWeight: 600 }}>
              DFINITY / ICP
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        {/* Brand filter */}
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "4px 6px",
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              color: "var(--text-muted)",
              padding: "0 4px",
            }}
          >
            Brand
          </span>
          {brandFilterChips.map((chip) => (
            <button
              key={chip.val}
              type="button"
              data-ocid="roadmap.brand_filter.tab"
              onClick={() => setBrandFilter(chip.val)}
              style={{
                background: "transparent",
                border: "1px solid transparent",
                borderRadius: 6,
                color:
                  brandFilter === chip.val ? undefined : "var(--text-muted)",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 12,
                fontWeight: 500,
                padding: "4px 10px",
                transition: "all 0.15s",
                ...(brandFilter === chip.val ? brandChipActive[chip.val] : {}),
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Pillar filter */}
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "4px 6px",
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              color: "var(--text-muted)",
              padding: "0 4px",
            }}
          >
            Pillar
          </span>
          {pillarFilterChips.map((chip) => (
            <button
              key={chip.val}
              type="button"
              data-ocid="roadmap.pillar_filter.tab"
              onClick={() => setPillarFilter(chip.val)}
              style={{
                background: "transparent",
                border: "1px solid transparent",
                borderRadius: 6,
                color:
                  pillarFilter === chip.val ? undefined : "var(--text-muted)",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 12,
                fontWeight: 500,
                padding: "4px 10px",
                transition: "all 0.15s",
                ...(pillarFilter === chip.val
                  ? pillarChipActive[chip.val]
                  : {}),
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Show past toggle */}
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "4px 6px",
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              color: "var(--text-muted)",
              padding: "0 4px",
            }}
          >
            Show
          </span>
          <button
            type="button"
            data-ocid="roadmap.past_toggle.toggle"
            onClick={() => setShowPast((p) => !p)}
            style={{
              background: showPast ? "#3b3f52" : "transparent",
              border: "1px solid transparent",
              borderRadius: 6,
              color: showPast ? "var(--text)" : "var(--text-muted)",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 12,
              fontWeight: 500,
              padding: "4px 10px",
              transition: "all 0.15s",
            }}
          >
            {showPast ? "Incl. past" : "Upcoming only"}
          </button>
        </div>
      </div>

      {/* Quarters grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          alignItems: "start",
        }}
      >
        {([1, 2, 3, 4] as const).map((q) => {
          const meta = quarterMeta[q];
          const allQ = events2026.filter((e) => e.q === q);
          const filtered = allQ.filter((e) =>
            matchesFilter(e, brandFilter, pillarFilter, showPast),
          );

          return (
            <div
              key={q}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              {/* Quarter header */}
              <div
                style={{
                  borderRadius: 8,
                  padding: "14px 16px",
                  position: "relative",
                  overflow: "hidden",
                  background: qGradients[q],
                  border: `1px solid ${qBorderColors[q]}`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    fontSize: 22,
                    fontWeight: 800,
                    opacity: 0.2,
                    color: qLabelColors[q],
                  }}
                >
                  {allQ.length}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    letterSpacing: "-0.5px",
                    color: qLabelColors[q],
                  }}
                >
                  {meta.label}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "var(--text-muted)",
                    marginTop: 2,
                  }}
                >
                  {meta.theme}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    marginTop: 6,
                  }}
                >
                  {meta.months}
                </div>
                {q === 1 && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      background: "rgba(239,68,68,0.15)",
                      border: "1px solid rgba(239,68,68,0.4)",
                      borderRadius: 4,
                      color: "#f87171",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.4px",
                      marginTop: 6,
                      padding: "2px 6px",
                      textTransform: "uppercase",
                    }}
                  >
                    <span
                      className="pulse-dot"
                      style={{
                        width: 5,
                        height: 5,
                        background: "#ef4444",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    />
                    You are here
                  </div>
                )}
              </div>

              {/* Event cards */}
              {filtered.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: "var(--text-muted)",
                    fontSize: 12,
                    padding: "20px 0",
                    background: "var(--surface2)",
                    borderRadius: 6,
                  }}
                >
                  No matching events
                </div>
              ) : (
                filtered.map((ev, idx) => (
                  <div
                    key={`${ev.name}-${idx}`}
                    data-ocid={`roadmap.event.item.${idx + 1}`}
                    style={{
                      background: "var(--surface)",
                      border:
                        ev.status === "active"
                          ? "1px solid #ef4444"
                          : "1px solid var(--border)",
                      borderRadius: 8,
                      padding: "10px 12px",
                      cursor: "default",
                      opacity: ev.status === "past" ? 0.45 : 1,
                      boxShadow:
                        ev.status === "active"
                          ? "0 0 0 1px rgba(239,68,68,0.2)"
                          : "none",
                      transition: "border-color 0.15s",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 6,
                        marginBottom: 6,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12.5,
                          fontWeight: 600,
                          color:
                            ev.status === "active" ? "#f87171" : "var(--text)",
                          lineHeight: 1.3,
                          flex: 1,
                        }}
                      >
                        {ev.name}
                        {ev.status === "active" && (
                          <span
                            style={{
                              fontSize: 10,
                              color: "#f87171",
                              marginLeft: 4,
                            }}
                          >
                            ● NOW
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: pillarColors[ev.pillar],
                          flexShrink: 0,
                          marginTop: 3,
                        }}
                        title={ev.pillar}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        marginBottom: 7,
                        lineHeight: 1.4,
                      }}
                    >
                      {ev.date} · {ev.location}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 4,
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      {ev.brands.map((b) => (
                        <span
                          key={b}
                          style={{
                            borderRadius: 3,
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "0.3px",
                            padding: "1px 5px",
                            textTransform: "uppercase",
                            background:
                              b === "caffeine"
                                ? "rgba(212,240,66,0.15)"
                                : "var(--blue-dim)",
                            color: b === "caffeine" ? "#d4f042" : "#93c5fd",
                            border:
                              b === "caffeine"
                                ? "1px solid rgba(212,240,66,0.3)"
                                : "1px solid rgba(59,130,246,0.25)",
                          }}
                        >
                          {b === "icp" ? "ICP" : "caffeine"}
                        </span>
                      ))}
                      {ev.champion && (
                        <span
                          style={{
                            fontSize: 10,
                            color: "var(--text-muted)",
                            padding: "1px 5px",
                            background: "var(--surface2)",
                            borderRadius: 3,
                          }}
                        >
                          {ev.champion}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          background: "var(--surface2)",
          borderLeft: "3px solid var(--blue)",
          borderRadius: "0 6px 6px 0",
          color: "var(--text-muted)",
          fontSize: 12.5,
          lineHeight: 1.6,
          marginTop: 24,
          padding: "12px 16px",
        }}
      >
        <strong style={{ color: "var(--text)", fontWeight: 600 }}>
          Framework:
        </strong>{" "}
        Each quarter has one clear flagship anchor, 1–2 community/building
        activations, recurring open houses (ZRH + SF), and selective external
        appearances only where an existing story can be amplified. This applies
        equally to Caffeine and DFINITY/ICP.
      </div>
    </section>
  );
}

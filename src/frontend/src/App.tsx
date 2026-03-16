import { useState } from "react";
import type { SourceKey } from "./data/srcData";
import { BudgetTab } from "./tabs/BudgetTab";
import { EventTypesTab } from "./tabs/EventTypesTab";
import { GeographyTab } from "./tabs/GeographyTab";
import { HackathonsTab } from "./tabs/HackathonsTab";
import { OverviewTab } from "./tabs/OverviewTab";
import { ParticipationTab } from "./tabs/ParticipationTab";
import { SeasonalityTab } from "./tabs/SeasonalityTab";
import { TopicsTab } from "./tabs/TopicsTab";

type Tab =
  | "overview"
  | "seasonality"
  | "geography"
  | "types"
  | "budget"
  | "topics"
  | "participation"
  | "hackathons";

const tabs: { id: Tab; label: string; ocid: string }[] = [
  { id: "overview", label: "Overview", ocid: "nav.overview.tab" },
  { id: "seasonality", label: "Seasonality", ocid: "nav.seasonality.tab" },
  { id: "geography", label: "Geography", ocid: "nav.geography.tab" },
  { id: "types", label: "Event Types", ocid: "nav.types.tab" },
  { id: "budget", label: "Budget & Anchors", ocid: "nav.budget.tab" },
  { id: "topics", label: "Topics & Activations", ocid: "nav.topics.tab" },
  {
    id: "participation",
    label: "Participation",
    ocid: "nav.participation.tab",
  },
  { id: "hackathons", label: "Hackathons", ocid: "nav.hackathons.tab" },
];

const sourceBtns: { key: SourceKey; label: string; color?: string }[] = [
  { key: "all", label: "All Sources" },
  { key: "dfinity", label: "DFINITY Direct", color: "#3b82f6" },
  { key: "hub", label: "ICP Hub", color: "#818cf8" },
  { key: "community", label: "Community Grantees", color: "#34d399" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [source, setSource] = useState<SourceKey>("all");
  const currentYear = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* Header */}
      <header
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "18px 32px 0",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="DFINITY / ICP logo"
              role="img"
            >
              <title>DFINITY / ICP logo</title>
              <circle
                cx="16"
                cy="16"
                r="15"
                stroke="#3b82f6"
                strokeWidth="1.5"
                fill="none"
              />
              <ellipse
                cx="16"
                cy="16"
                rx="6"
                ry="15"
                stroke="#3b82f6"
                strokeWidth="1.5"
                fill="none"
                transform="rotate(-30 16 16)"
              />
              <ellipse
                cx="16"
                cy="16"
                rx="6"
                ry="15"
                stroke="#3b82f6"
                strokeWidth="1.5"
                fill="none"
                transform="rotate(30 16 16)"
              />
              <circle cx="16" cy="16" r="3" fill="#3b82f6" />
            </svg>
            <div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: "-0.2px",
                  color: "var(--text)",
                }}
              >
                DFINITY &amp; caffeine.ai Event Intelligence
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  marginTop: 1,
                }}
              >
                Global event footprint · 2022 – 2026
              </div>
            </div>
          </div>
          <span
            style={{
              background: "var(--blue-dim)",
              border: "1px solid var(--blue)",
              color: "var(--blue)",
              fontSize: 11,
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: 20,
              letterSpacing: "0.3px",
            }}
          >
            564 events tracked
          </span>
        </div>

        {/* Tab nav */}
        <nav role="tablist">
          <ul
            style={{
              display: "flex",
              gap: 0,
              listStyle: "none",
              margin: 0,
              padding: 0,
              overflowX: "auto",
            }}
          >
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  data-ocid={tab.ocid}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: "none",
                    border: "none",
                    borderBottom:
                      activeTab === tab.id
                        ? "2px solid var(--blue)"
                        : "2px solid transparent",
                    color:
                      activeTab === tab.id
                        ? "var(--blue)"
                        : "var(--text-muted)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 13,
                    fontWeight: 500,
                    padding: "10px 16px",
                    position: "relative",
                    transition: "color 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Source Filter Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 32px",
          background: "#131720",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#475569",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            marginRight: 4,
          }}
        >
          Source Filter
        </span>
        {sourceBtns.map((btn) => (
          <button
            key={btn.key}
            type="button"
            data-ocid={`filter.${btn.key}.button`}
            onClick={() => setSource(btn.key)}
            style={{
              background: source === btn.key ? "#1e3a5f" : "var(--surface)",
              border: `1px solid ${source === btn.key ? "#3b82f6" : "var(--border)"}`,
              color: source === btn.key ? "#60a5fa" : "#64748b",
              fontSize: 12,
              fontWeight: 500,
              padding: "5px 14px",
              borderRadius: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.15s",
            }}
          >
            {btn.color && (
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: btn.color,
                }}
              />
            )}
            {btn.label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <main
        style={{
          padding: "28px 32px",
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
          flex: 1,
        }}
      >
        {activeTab === "overview" && <OverviewTab source={source} />}
        {activeTab === "seasonality" && <SeasonalityTab source={source} />}
        {activeTab === "geography" && <GeographyTab />}
        {activeTab === "types" && <EventTypesTab />}
        {activeTab === "budget" && <BudgetTab />}
        {activeTab === "topics" && <TopicsTab />}
        {activeTab === "participation" && <ParticipationTab source={source} />}
        {activeTab === "hackathons" && <HackathonsTab />}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          color: "var(--text-muted)",
          fontSize: 11.5,
          marginTop: 40,
          padding: "16px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 6 }}>
          Source: DFINITY internal Airtable export &nbsp;·&nbsp; Processed March
          2026 &nbsp;·&nbsp; Events &amp; Experience, DFINITY Foundation
        </div>
        <div>
          © {currentYear}. Built with ♥ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            style={{ color: "var(--blue)", textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}

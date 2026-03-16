export type SourceKey = "all" | "dfinity" | "hub" | "community";

export const srcData = {
  yoy: {
    all: [48, 280, 174, 64],
    dfinity: [6, 94, 126, 41],
    hub: [0, 152, 41, 11],
    community: [42, 34, 4, 0],
  },
  month: {
    all: [36, 28, 29, 32, 28, 44, 42, 30, 67, 116, 79, 33],
    dfinity: [23, 12, 19, 24, 17, 26, 32, 13, 28, 34, 24, 15],
    hub: [10, 13, 4, 6, 1, 2, 3, 10, 28, 74, 41, 12],
    community: [2, 3, 4, 2, 9, 15, 6, 5, 9, 7, 12, 6],
  },
  quarterly: {
    all: [22, 13, 13, 13, 23, 68, 176, 58, 41, 42, 33, 22, 18, 16, 6],
    dfinity: [3, 2, 1, 3, 9, 23, 59, 33, 26, 36, 31, 18, 14, 7, 2],
    hub: [0, 0, 0, 0, 4, 38, 110, 16, 12, 6, 7, 4, 3, 4, 0],
    community: [19, 11, 12, 10, 10, 6, 6, 9, 3, 0, 0, 0, 0, 0, 0],
  },
  labels: {
    all: "All Sources",
    dfinity: "DFINITY Direct",
    hub: "ICP Hub",
    community: "Community Grantees",
  },
  colors: {
    all: "#3b82f6",
    dfinity: "#3b82f6",
    hub: "#818cf8",
    community: "#34d399",
  },
} as const;

export const quarterlyLabels = [
  "Q2 22",
  "Q3 22",
  "Q4 22",
  "Q1 23",
  "Q2 23",
  "Q3 23",
  "Q4 23",
  "Q1 24",
  "Q2 24",
  "Q3 24",
  "Q4 24",
  "Q1 25",
  "Q2 25",
  "Q3 25",
  "Q4 25",
];

import type { ProblemSite } from "../types/problemContext";

export interface HintEvent {
  site: ProblemSite;
  problemId: string;
  difficulty: string;
  timestamp: string;
}

export interface AnalyticsSummary {
  total: number;
  byDifficulty: Record<string, number>;
  recent: HintEvent[];
}

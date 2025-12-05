export type ProblemSite = "leetcode" | "gfg" | "other";

export interface ProblemContext {
  site: ProblemSite;
  problemId: string;
  title: string;
  difficulty: string;
  description: string;
}

export const MESSAGE_TYPES = {
  PROBLEM_CONTEXT: "CM_PROBLEM_CONTEXT",
  GET_LATEST_CONTEXT: "CM_GET_LATEST_CONTEXT",
  LATEST_CONTEXT_RESPONSE: "CM_LATEST_CONTEXT_RESPONSE",
} as const;

export interface ProblemContextMessage {
  type: typeof MESSAGE_TYPES.PROBLEM_CONTEXT;
  payload: ProblemContext;
}

export interface GetLatestContextMessage {
  type: typeof MESSAGE_TYPES.GET_LATEST_CONTEXT;
}

export interface LatestContextResponseMessage {
  type: typeof MESSAGE_TYPES.LATEST_CONTEXT_RESPONSE;
  payload: ProblemContext | null;
}

export type ExtensionMessage = 
  | ProblemContextMessage 
  | GetLatestContextMessage 
  | LatestContextResponseMessage;

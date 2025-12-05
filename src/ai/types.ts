import type { ProblemContext } from "../types/problemContext";

export interface IAIProvider {
  generateHint(context: ProblemContext, userNotes?: string): Promise<string>;
}

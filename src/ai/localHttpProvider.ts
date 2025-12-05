import type { IAIProvider } from "./types";
import type { ProblemContext } from "../types/problemContext";

interface LocalAIResponse {
  hint: string;
}

export class LocalHttpAIProvider implements IAIProvider {
  private readonly endpoint: string;

  constructor(endpoint: string = "http://localhost:11434/api/generate") {
    this.endpoint = endpoint;
  }

  async generateHint(context: ProblemContext, userNotes?: string): Promise<string> {
    const prompt = this.buildPrompt(context, userNotes);

    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          context: {
            site: context.site,
            problemId: context.problemId,
            title: context.title,
            difficulty: context.difficulty,
            description: context.description,
          },
          userNotes: userNotes || "",
        }),
      });

      if (!response.ok) {
        throw new Error(`AI server responded with status ${response.status}`);
      }

      const data: LocalAIResponse = await response.json();

      if (!data.hint) {
        throw new Error("No hint received from AI server");
      }

      return data.hint;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error(
          "Cannot connect to local AI server. Please ensure the server is running at " +
            this.endpoint
        );
      }
      throw error;
    }
  }

  private buildPrompt(context: ProblemContext, userNotes?: string): string {
    let prompt = `You are a helpful coding mentor. The user is working on a ${context.difficulty} difficulty problem from ${context.site}.

Problem: ${context.title}

Description:
${context.description}
`;

    if (userNotes && userNotes.trim()) {
      prompt += `
User's notes/partial solution:
${userNotes}
`;
    }

    prompt += `
Please provide a helpful hint that guides the user toward the solution without giving away the answer directly. Focus on:
1. Key algorithmic concepts or data structures that might help
2. Edge cases to consider
3. A small nudge in the right direction

Keep your response concise and educational.`;

    return prompt;
  }
}

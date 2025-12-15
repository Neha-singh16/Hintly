import type { IAIProvider } from "./types";
import type { ProblemContext } from "../types/problemContext";
import { buildPromptFromProblemContext } from "./promptBuilder";

interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

export class LocalHttpAIProvider implements IAIProvider {
  private readonly endpoint: string;
  private readonly model: string;

  constructor(
    endpoint: string = "http://localhost:11434/api/generate",
    model: string = "deepseek-coder:latest"
  ) {
    this.endpoint = endpoint;
    this.model = model;
  }

  async generateHint(
    context: ProblemContext, 
    userNotes?: string, 
    hintLevel: "basic" | "intermediate" | "advanced" = "basic"
  ): Promise<string> {
    const prompt = buildPromptFromProblemContext(context, userNotes || "", hintLevel);

    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.model,
          prompt: prompt,
          stream: false,
          options: {
            temperature: 0.5,
            num_predict: 500,
            top_k: 40,
            top_p: 0.9,
            stop: ["\n---", "User:", "Problem:"],
          }
        }),
      });

      if (!response.ok) {
        let errorDetails = "";
        try {
          // Try to parse as JSON first (Ollama often returns JSON errors)
          const errorJson = await response.json();
          errorDetails = JSON.stringify(errorJson, null, 2);
        } catch {
          // If not JSON, get as text
          try {
            errorDetails = await response.text();
          } catch {
            errorDetails = "(no error details available)";
          }
        }
        throw new Error(
          `AI server responded with status ${response.status} (${response.statusText}):\n${errorDetails}`
        );
      }

      const data: OllamaResponse = await response.json();

      if (!data.response) {
        throw new Error("No response received from AI server. Response data: " + JSON.stringify(data));
      }

      return data.response.trim();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error(
          `Cannot connect to local AI server at ${this.endpoint}. Please ensure:\n` +
          `1. Ollama is running (try: ollama serve)\n` +
          `2. CORS is enabled (set OLLAMA_ORIGINS=*)\n` +
          `3. The server is accessible at ${this.endpoint}\n` +
          `Original error: ${error.message}`
        );
      }
      // Re-throw the error with its full message
      throw error;
    }
  }
}

import { useState } from "react";
import type { ProblemContext } from "../../types/problemContext";
import { MESSAGE_TYPES } from "../../types/problemContext";
import { ProblemContextCard } from "./ProblemContextCard";
import { EmptyState } from "./EmptyState";
import { LoadingIndicator } from "./LoadingIndicator";
import { ErrorMessage } from "./ErrorMessage";
import { HintResponse } from "./HintResponse";
import { logHintEvent } from "../../analytics/storage";

interface HintsTabProps {
  context: ProblemContext | null;
}

export function HintsTab({ context }: HintsTabProps) {
  const [userNotes, setUserNotes] = useState("");
  const [hintLevel, setHintLevel] = useState<"basic" | "intermediate" | "advanced">("basic");
  const [isLoading, setIsLoading] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAskForHint = async () => {
    if (!context) return;

    setIsLoading(true);
    setError(null);
    setHint(null);

    try {
      // Send message to background service worker to generate hint
      const response = await chrome.runtime.sendMessage({
        type: MESSAGE_TYPES.GENERATE_HINT,
        payload: {
          context,
          userNotes: userNotes || undefined,
          hintLevel,
        },
      });

      if (response.payload.error) {
        throw new Error(response.payload.error);
      }

      setHint(response.payload.hint);

      await logHintEvent({
        site: context.site,
        problemId: context.problemId,
        difficulty: context.difficulty,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to get hint. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!context) {
    return <EmptyState />;
  }

  return (
    <div className="content">
      <ProblemContextCard context={context} />

      <div>
        <label className="section-label">🎯 Hint Level</label>
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          <button
            className={`level-button ${hintLevel === "basic" ? "active" : ""}`}
            onClick={() => setHintLevel("basic")}
            style={{
              flex: 1,
              padding: "8px 12px",
              border: hintLevel === "basic" ? "2px solid var(--accent-blue)" : "1px solid var(--border-default)",
              background: hintLevel === "basic" ? "var(--accent-blue)" : "var(--bg-elevated)",
              color: hintLevel === "basic" ? "white" : "var(--text-primary)",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            🌱 Basic
            <div style={{ fontSize: "10px", opacity: 0.8, marginTop: "2px" }}>
              Explain like I'm 5
            </div>
          </button>
          <button
            className={`level-button ${hintLevel === "intermediate" ? "active" : ""}`}
            onClick={() => setHintLevel("intermediate")}
            style={{
              flex: 1,
              padding: "8px 12px",
              border: hintLevel === "intermediate" ? "2px solid var(--accent-blue)" : "1px solid var(--border-default)",
              background: hintLevel === "intermediate" ? "var(--accent-blue)" : "var(--bg-elevated)",
              color: hintLevel === "intermediate" ? "white" : "var(--text-primary)",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            🚀 Intermediate
            <div style={{ fontSize: "10px", opacity: 0.8, marginTop: "2px" }}>
              Quick hints
            </div>
          </button>
          <button
            className={`level-button ${hintLevel === "advanced" ? "active" : ""}`}
            onClick={() => setHintLevel("advanced")}
            style={{
              flex: 1,
              padding: "8px 12px",
              border: hintLevel === "advanced" ? "2px solid var(--accent-blue)" : "1px solid var(--border-default)",
              background: hintLevel === "advanced" ? "var(--accent-blue)" : "var(--bg-elevated)",
              color: hintLevel === "advanced" ? "white" : "var(--text-primary)",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            🔥 Advanced
            <div style={{ fontSize: "10px", opacity: 0.8, marginTop: "2px" }}>
              Just the concept
            </div>
          </button>
        </div>
      </div>

      <div>
        <label className="section-label">Your notes or partial solution</label>
        <textarea
          className="notes-textarea"
          placeholder="Describe your approach or paste your partial solution here..."
          value={userNotes}
          onChange={(e) => setUserNotes(e.target.value)}
          data-testid="input-notes"
        />
      </div>

      <button
        className="hint-button"
        onClick={handleAskForHint}
        disabled={isLoading}
        data-testid="button-ask-hint"
      >
        {isLoading ? (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ animation: "spin 1s linear infinite" }}
            >
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
            Thinking...
          </>
        ) : (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Ask for hint
          </>
        )}
      </button>

      {isLoading && <LoadingIndicator />}
      {error && <ErrorMessage message={error} />}
      {hint && <HintResponse hint={hint} />}
    </div>
  );
}

import { useState } from "react";

type ProblemSite = "leetcode" | "gfg" | "other";

interface ProblemContext {
  site: ProblemSite;
  problemId: string;
  title: string;
  difficulty: string;
  description: string;
}

interface HintEvent {
  site: ProblemSite;
  problemId: string;
  difficulty: string;
  timestamp: string;
}

interface AnalyticsSummary {
  total: number;
  byDifficulty: Record<string, number>;
  recent: HintEvent[];
}

const mockContext: ProblemContext = {
  site: "leetcode",
  problemId: "two-sum",
  title: "Two Sum",
  difficulty: "easy",
  description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
};

const mockAnalytics: AnalyticsSummary = {
  total: 42,
  byDifficulty: {
    easy: 15,
    medium: 20,
    hard: 5,
    unknown: 2,
  },
  recent: [
    { site: "leetcode", problemId: "two-sum", difficulty: "easy", timestamp: new Date().toISOString() },
    { site: "gfg", problemId: "binary-search", difficulty: "medium", timestamp: new Date(Date.now() - 3600000).toISOString() },
    { site: "leetcode", problemId: "merge-sort", difficulty: "medium", timestamp: new Date(Date.now() - 7200000).toISOString() },
    { site: "leetcode", problemId: "lru-cache", difficulty: "hard", timestamp: new Date(Date.now() - 10800000).toISOString() },
    { site: "gfg", problemId: "linked-list-cycle", difficulty: "easy", timestamp: new Date(Date.now() - 14400000).toISOString() },
  ],
};

function Header() {
  return (
    <header className="flex items-center gap-2.5 p-4 border-b border-[#333333] sticky top-0 z-50 bg-[#1a1a1a]">
      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-md flex items-center justify-center">
        <svg
          className="w-3.5 h-3.5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <h1 className="text-lg font-semibold tracking-tight text-[#e0e0e0]">Code Mentor AI</h1>
    </header>
  );
}

function TabNavigation({ activeTab, onTabChange }: { activeTab: "hints" | "analytics"; onTabChange: (tab: "hints" | "analytics") => void }) {
  return (
    <nav className="flex gap-2 px-4 py-3 border-b border-[#2a2a2a] bg-[#1a1a1a]">
      <button
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
          activeTab === "hints" ? "bg-[#252525] text-[#e0e0e0]" : "text-[#999999] hover:bg-[#2d2d2d] hover:text-[#e0e0e0]"
        }`}
        onClick={() => onTabChange("hints")}
        data-testid="tab-hints"
      >
        Hints
      </button>
      <button
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
          activeTab === "analytics" ? "bg-[#252525] text-[#e0e0e0]" : "text-[#999999] hover:bg-[#2d2d2d] hover:text-[#e0e0e0]"
        }`}
        onClick={() => onTabChange("analytics")}
        data-testid="tab-analytics"
      >
        Analytics
      </button>
    </nav>
  );
}

function ProblemContextCard({ context }: { context: ProblemContext }) {
  const getSiteBadgeClass = () => {
    if (context.site === "leetcode") return "bg-[rgba(255,161,22,0.15)] text-[#ffa116]";
    if (context.site === "gfg") return "bg-[rgba(46,125,50,0.15)] text-[#4caf50]";
    return "bg-[#333333] text-[#999999]";
  };

  const getSiteLabel = () => {
    if (context.site === "leetcode") return "LeetCode";
    if (context.site === "gfg") return "GeeksforGeeks";
    return context.site;
  };

  const getDifficultyClass = () => {
    const diff = context.difficulty.toLowerCase();
    if (diff === "easy") return "bg-[rgba(34,197,94,0.15)] text-[#22c55e]";
    if (diff === "medium") return "bg-[rgba(234,179,8,0.15)] text-[#eab308]";
    if (diff === "hard") return "bg-[rgba(239,68,68,0.15)] text-[#ef4444]";
    return "bg-[#333333] text-[#999999]";
  };

  return (
    <div className="bg-[#252525] rounded-lg p-3 flex flex-col gap-2" data-testid="context-card">
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${getSiteBadgeClass()}`} data-testid="site-badge">
          {getSiteLabel()}
        </span>
        <span className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${getDifficultyClass()}`} data-testid="difficulty-badge">
          {context.difficulty}
        </span>
      </div>
      <h2 className="text-base font-semibold leading-snug text-[#e0e0e0] line-clamp-2" data-testid="problem-title">
        {context.title}
      </h2>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center" data-testid="empty-state">
      <svg
        className="w-12 h-12 text-[#666666] mb-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="9" x2="15" y2="15" />
        <line x1="15" y1="9" x2="9" y2="15" />
      </svg>
      <p className="text-sm text-[#999999] max-w-[280px]">
        Open a LeetCode or GeeksforGeeks problem page to use the assistant.
      </p>
    </div>
  );
}

function LoadingIndicator() {
  return (
    <div className="flex items-center gap-2 p-3 text-[#999999] text-sm" data-testid="loading-indicator">
      <span>Thinking</span>
      <span className="inline-flex gap-1">
        <span className="w-1 h-1 bg-[#999999] rounded-full animate-pulse"></span>
        <span className="w-1 h-1 bg-[#999999] rounded-full animate-pulse delay-100"></span>
        <span className="w-1 h-1 bg-[#999999] rounded-full animate-pulse delay-200"></span>
      </span>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2 px-3 py-2 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded" data-testid="error-message">
      <svg
        className="w-4 h-4 text-[#f87171] flex-shrink-0 mt-0.5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span className="text-xs text-[#f87171] leading-snug">{message}</span>
    </div>
  );
}

function HintResponse({ hint }: { hint: string }) {
  return (
    <div className="bg-[#252525] border-l-[3px] border-blue-500 rounded-md p-3 max-h-[300px] overflow-y-auto" data-testid="hint-response">
      <p className="text-sm leading-relaxed text-[#e0e0e0] whitespace-pre-wrap">{hint}</p>
    </div>
  );
}

function HintsTab({ context, showEmpty = false }: { context: ProblemContext | null; showEmpty?: boolean }) {
  const [userNotes, setUserNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAskForHint = async () => {
    if (!context) return;

    setIsLoading(true);
    setError(null);
    setHint(null);

    setTimeout(() => {
      setIsLoading(false);
      setHint(`Great question! For the "${context.title}" problem, here are some hints:

1. Think about the time complexity - can you do better than O(n^2)?

2. Consider using a hash map to store values you've seen before.

3. For each element, calculate what value you need to find to reach the target.

4. Remember: you can look up values in a hash map in O(1) time!

This approach will give you an O(n) solution. Try implementing it and see if you can get it working!`);
    }, 1500);
  };

  if (showEmpty || !context) {
    return <EmptyState />;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <ProblemContextCard context={context} />

      <div>
        <label className="text-xs font-medium text-[#999999] mb-1.5 block">Your notes or partial solution</label>
        <textarea
          className="w-full min-h-[80px] p-3 border border-[#333333] rounded-md bg-[#252525] text-[#e0e0e0] font-mono text-sm leading-normal resize-y focus:outline-none focus:border-blue-500 transition-colors placeholder:text-[#666666]"
          placeholder="Describe your approach or paste your partial solution here..."
          value={userNotes}
          onChange={(e) => setUserNotes(e.target.value)}
          data-testid="input-notes"
        />
      </div>

      <button
        className="w-full h-9 px-4 rounded-md bg-blue-500 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:bg-blue-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleAskForHint}
        disabled={isLoading}
        data-testid="button-ask-hint"
      >
        {isLoading ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
            Thinking...
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
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

function AnalyticsTab({ analytics }: { analytics: AnalyticsSummary }) {
  const difficulties = ["easy", "medium", "hard", "unknown"];

  const getSiteClass = (site: string) => {
    if (site === "leetcode") return "bg-[rgba(255,161,22,0.15)] text-[#ffa116]";
    if (site === "gfg") return "bg-[rgba(46,125,50,0.15)] text-[#4caf50]";
    return "bg-[#333333] text-[#999999]";
  };

  const getSiteLabel = (site: string) => {
    if (site === "leetcode") return "LC";
    if (site === "gfg") return "GFG";
    return site.toUpperCase();
  };

  const getDifficultyClass = (diff: string) => {
    const d = diff.toLowerCase();
    if (d === "easy") return "bg-[rgba(34,197,94,0.15)] text-[#22c55e]";
    if (d === "medium") return "bg-[rgba(234,179,8,0.15)] text-[#eab308]";
    if (d === "hard") return "bg-[rgba(239,68,68,0.15)] text-[#ef4444]";
    return "bg-[#333333] text-[#999999]";
  };

  const getDifficultyLabelClass = (diff: string) => {
    if (diff === "easy") return "text-[#22c55e]";
    if (diff === "medium") return "text-[#eab308]";
    if (diff === "hard") return "text-[#ef4444]";
    return "text-[#999999]";
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="bg-[#252525] rounded-lg p-4" data-testid="analytics-total">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#999999] mb-3">Total Hints</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-[#e0e0e0]" data-testid="text-total-hints">
            {analytics.total}
          </span>
          <span className="text-sm text-[#999999]">hint requests</span>
        </div>
      </div>

      <div className="bg-[#252525] rounded-lg p-4" data-testid="analytics-difficulty">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#999999] mb-3">By Difficulty</h3>
        <div className="flex flex-col gap-0.5 rounded overflow-hidden">
          {difficulties.map((diff, i) => (
            <div
              className={`flex justify-between items-center px-3 py-2 ${i % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#2d2d2d]"}`}
              key={diff}
              data-testid={`row-difficulty-${diff}`}
            >
              <span className={`text-sm font-medium capitalize ${getDifficultyLabelClass(diff)}`}>{diff}</span>
              <span className="text-sm font-semibold text-[#e0e0e0]">
                {analytics.byDifficulty[diff] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#252525] rounded-lg p-4" data-testid="analytics-recent">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#999999] mb-3">Recent Problems</h3>
        {analytics.recent.length === 0 ? (
          <p className="text-sm text-[#999999]" data-testid="text-no-recent">
            No hint requests yet.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {analytics.recent.slice(0, 5).map((event, index) => (
              <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] rounded" key={index} data-testid={`recent-item-${index}`}>
                <span className={`text-[11px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${getSiteClass(event.site)}`}>
                  {getSiteLabel(event.site)}
                </span>
                <span className="flex-1 text-xs text-[#e0e0e0] overflow-hidden text-ellipsis whitespace-nowrap">{event.problemId}</span>
                <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${getDifficultyClass(event.difficulty)}`}>
                  {event.difficulty}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExtensionPreview() {
  const [activeTab, setActiveTab] = useState<"hints" | "analytics">("hints");
  const [showEmpty, setShowEmpty] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Code Mentor AI</h1>
          <p className="text-[#999999] text-lg">Chrome Extension Preview</p>
        </div>

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setShowEmpty(false)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              !showEmpty ? "bg-blue-500 text-white" : "bg-[#252525] text-[#999999] hover:bg-[#333333]"
            }`}
          >
            With Problem Context
          </button>
          <button
            onClick={() => setShowEmpty(true)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              showEmpty ? "bg-blue-500 text-white" : "bg-[#252525] text-[#999999] hover:bg-[#333333]"
            }`}
          >
            Empty State
          </button>
        </div>

        <div className="w-[400px] max-h-[600px] bg-[#1a1a1a] rounded-lg shadow-2xl overflow-hidden border border-[#333333]">
          <div className="overflow-y-auto max-h-[600px]">
            <Header />
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === "hints" ? (
              <HintsTab context={showEmpty ? null : mockContext} showEmpty={showEmpty} />
            ) : (
              <AnalyticsTab analytics={mockAnalytics} />
            )}
          </div>
        </div>

        <div className="bg-[#252525] rounded-lg p-6 max-w-xl text-center">
          <h2 className="text-lg font-semibold text-white mb-3">How to Install the Extension</h2>
          <ol className="text-sm text-[#999999] text-left space-y-2">
            <li>1. Run <code className="bg-[#1a1a1a] px-2 py-0.5 rounded text-blue-400">npx tsx scripts/build-extension.ts</code> to build the extension</li>
            <li>2. Open Chrome and go to <code className="bg-[#1a1a1a] px-2 py-0.5 rounded text-blue-400">chrome://extensions/</code></li>
            <li>3. Enable "Developer mode" in the top right corner</li>
            <li>4. Click "Load unpacked" and select the <code className="bg-[#1a1a1a] px-2 py-0.5 rounded text-blue-400">dist-extension</code> folder</li>
            <li>5. Navigate to LeetCode or GeeksforGeeks to start using the assistant!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

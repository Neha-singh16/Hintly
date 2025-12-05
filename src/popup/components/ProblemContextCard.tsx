import type { ProblemContext } from "../../types/problemContext";

interface ProblemContextCardProps {
  context: ProblemContext;
}

export function ProblemContextCard({ context }: ProblemContextCardProps) {
  const getSiteBadgeClass = () => {
    if (context.site === "leetcode") return "site-badge leetcode";
    if (context.site === "gfg") return "site-badge gfg";
    return "site-badge";
  };

  const getSiteLabel = () => {
    if (context.site === "leetcode") return "LeetCode";
    if (context.site === "gfg") return "GeeksforGeeks";
    return context.site;
  };

  const getDifficultyClass = () => {
    const diff = context.difficulty.toLowerCase();
    if (diff === "easy") return "difficulty-badge easy";
    if (diff === "medium") return "difficulty-badge medium";
    if (diff === "hard") return "difficulty-badge hard";
    return "difficulty-badge unknown";
  };

  return (
    <div className="context-card" data-testid="context-card">
      <div className="context-header">
        <span className={getSiteBadgeClass()} data-testid="site-badge">
          {getSiteLabel()}
        </span>
        <span className={getDifficultyClass()} data-testid="difficulty-badge">
          {context.difficulty}
        </span>
      </div>
      <h2 className="problem-title" data-testid="problem-title">
        {context.title}
      </h2>
    </div>
  );
}

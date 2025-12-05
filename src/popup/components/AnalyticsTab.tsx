import { useState, useEffect } from "react";
import type { AnalyticsSummary } from "../../analytics/types";
import { getAnalyticsSummary } from "../../analytics/storage";

export function AnalyticsTab() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      const summary = await getAnalyticsSummary();
      setAnalytics(summary);
      setIsLoading(false);
    };

    loadAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="content">
        <div className="loading-indicator">Loading analytics...</div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="content">
        <div className="empty-state">
          <p className="empty-state-text">Unable to load analytics.</p>
        </div>
      </div>
    );
  }

  const difficulties = ["easy", "medium", "hard", "unknown"];

  const getSiteClass = (site: string) => {
    if (site === "leetcode") return "recent-site leetcode";
    if (site === "gfg") return "recent-site gfg";
    return "recent-site";
  };

  const getSiteLabel = (site: string) => {
    if (site === "leetcode") return "LC";
    if (site === "gfg") return "GFG";
    return site.toUpperCase();
  };

  return (
    <div className="content analytics-section">
      <div className="analytics-card" data-testid="analytics-total">
        <h3 className="analytics-card-title">Total Hints</h3>
        <div className="total-hints">
          <span className="total-number" data-testid="text-total-hints">
            {analytics.total}
          </span>
          <span className="total-label">hint requests</span>
        </div>
      </div>

      <div className="analytics-card" data-testid="analytics-difficulty">
        <h3 className="analytics-card-title">By Difficulty</h3>
        <div className="difficulty-table">
          {difficulties.map((diff) => (
            <div className="difficulty-row" key={diff} data-testid={`row-difficulty-${diff}`}>
              <span className={`difficulty-label ${diff}`}>{diff}</span>
              <span className="difficulty-count">
                {analytics.byDifficulty[diff] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="analytics-card" data-testid="analytics-recent">
        <h3 className="analytics-card-title">Recent Problems</h3>
        {analytics.recent.length === 0 ? (
          <p
            style={{ color: "var(--text-secondary)", fontSize: "13px" }}
            data-testid="text-no-recent"
          >
            No hint requests yet.
          </p>
        ) : (
          <div className="recent-list">
            {analytics.recent.slice(0, 5).map((event, index) => (
              <div className="recent-item" key={index} data-testid={`recent-item-${index}`}>
                <span className={getSiteClass(event.site)}>
                  {getSiteLabel(event.site)}
                </span>
                <span className="recent-problem">{event.problemId}</span>
                <span className={`recent-difficulty ${event.difficulty.toLowerCase()}`}>
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

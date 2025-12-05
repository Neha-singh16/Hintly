interface TabNavigationProps {
  activeTab: "hints" | "analytics";
  onTabChange: (tab: "hints" | "analytics") => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="tab-navigation">
      <button
        className={`tab-button ${activeTab === "hints" ? "active" : ""}`}
        onClick={() => onTabChange("hints")}
        data-testid="tab-hints"
      >
        Hints
      </button>
      <button
        className={`tab-button ${activeTab === "analytics" ? "active" : ""}`}
        onClick={() => onTabChange("analytics")}
        data-testid="tab-analytics"
      >
        Analytics
      </button>
    </nav>
  );
}

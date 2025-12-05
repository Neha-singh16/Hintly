import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { TabNavigation } from "./components/TabNavigation";
import { HintsTab } from "./components/HintsTab";
import { AnalyticsTab } from "./components/AnalyticsTab";
import type { ProblemContext } from "../types/problemContext";
import { MESSAGE_TYPES } from "../types/problemContext";
import "./styles.css";

type TabType = "hints" | "analytics";

export function PopupApp() {
  const [activeTab, setActiveTab] = useState<TabType>("hints");
  const [context, setContext] = useState<ProblemContext | null>(null);

  useEffect(() => {
    chrome.runtime.sendMessage(
      { type: MESSAGE_TYPES.GET_LATEST_CONTEXT },
      (response) => {
        if (response && response.type === MESSAGE_TYPES.LATEST_CONTEXT_RESPONSE) {
          setContext(response.payload);
        }
      }
    );

    const listener = (message: { type: string; payload?: ProblemContext }) => {
      if (message.type === MESSAGE_TYPES.PROBLEM_CONTEXT && message.payload) {
        setContext(message.payload);
      }
    };

    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, []);

  return (
    <div className="popup-container scrollbar">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "hints" ? (
        <HintsTab context={context} />
      ) : (
        <AnalyticsTab />
      )}
    </div>
  );
}

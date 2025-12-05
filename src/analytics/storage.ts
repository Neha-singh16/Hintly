import type { HintEvent, AnalyticsSummary } from "./types";

const STORAGE_KEY = "cm-ai-analytics";

interface StorageData {
  events: HintEvent[];
}

export async function logHintEvent(event: HintEvent): Promise<void> {
  try {
    const result = await chrome.storage.sync.get(STORAGE_KEY);
    const data: StorageData = result[STORAGE_KEY] || { events: [] };
    data.events.push(event);
    
    if (data.events.length > 100) {
      data.events = data.events.slice(-100);
    }
    
    await chrome.storage.sync.set({ [STORAGE_KEY]: data });
  } catch (error) {
    console.error("Failed to log hint event:", error);
  }
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  try {
    const result = await chrome.storage.sync.get(STORAGE_KEY);
    const data: StorageData = result[STORAGE_KEY] || { events: [] };
    const events = data.events;

    const byDifficulty: Record<string, number> = {};
    for (const event of events) {
      const diff = event.difficulty.toLowerCase();
      byDifficulty[diff] = (byDifficulty[diff] || 0) + 1;
    }

    const sortedEvents = [...events].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return {
      total: events.length,
      byDifficulty,
      recent: sortedEvents.slice(0, 10),
    };
  } catch (error) {
    console.error("Failed to get analytics summary:", error);
    return {
      total: 0,
      byDifficulty: {},
      recent: [],
    };
  }
}

export async function clearAnalytics(): Promise<void> {
  try {
    await chrome.storage.sync.remove(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear analytics:", error);
  }
}

import { MESSAGE_TYPES, type ProblemContext, type ExtensionMessage } from "../types/problemContext";

let latestContext: ProblemContext | null = null;

chrome.runtime.onMessage.addListener(
  (message: ExtensionMessage, _sender, sendResponse) => {
    if (message.type === MESSAGE_TYPES.PROBLEM_CONTEXT) {
      latestContext = message.payload;
      chrome.storage.local.set({ latestContext: message.payload });
      return true;
    }

    if (message.type === MESSAGE_TYPES.GET_LATEST_CONTEXT) {
      if (latestContext) {
        sendResponse({
          type: MESSAGE_TYPES.LATEST_CONTEXT_RESPONSE,
          payload: latestContext,
        });
      } else {
        chrome.storage.local.get("latestContext", (result) => {
          sendResponse({
            type: MESSAGE_TYPES.LATEST_CONTEXT_RESPONSE,
            payload: result.latestContext || null,
          });
        });
        return true;
      }
    }

    return true;
  }
);

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url && (tab.url.includes("leetcode.com") || tab.url.includes("geeksforgeeks.org"))) {
      await chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        files: ["content.js"],
      });
    }
  } catch (error) {
    console.log("Could not inject content script:", error);
  }
});

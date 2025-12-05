import { MESSAGE_TYPES, type ProblemContext } from "../types/problemContext";
import { extractProblemContextFromDocument as extractLeetCode } from "./leetcodeExtractor";
import { extractProblemContextFromDocument as extractGFG } from "./gfgExtractor";

function detectSiteAndExtract(): ProblemContext | null {
  const hostname = window.location.hostname;

  if (hostname.includes("leetcode.com")) {
    return extractLeetCode(document);
  }

  if (hostname.includes("geeksforgeeks.org")) {
    return extractGFG(document);
  }

  return null;
}

function sendContextToBackground(context: ProblemContext): void {
  chrome.runtime.sendMessage({
    type: MESSAGE_TYPES.PROBLEM_CONTEXT,
    payload: context,
  });
}

function init(): void {
  let lastContext = detectSiteAndExtract();
  
  if (lastContext) {
    sendContextToBackground(lastContext);
  }

  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  const observer = new MutationObserver(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    debounceTimer = setTimeout(() => {
      const newContext = detectSiteAndExtract();
      if (newContext && JSON.stringify(newContext) !== JSON.stringify(lastContext)) {
        lastContext = newContext;
        sendContextToBackground(newContext);
      }
    }, 300);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

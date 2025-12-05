import type { ProblemContext } from "../types/problemContext";

export function extractProblemContextFromDocument(
  doc: Document
): ProblemContext | null {
  try {
    const url = doc.location.href;
    const problemIdMatch = url.match(/\/problems\/([^/]+)/);
    if (!problemIdMatch) {
      return null;
    }
    const problemId = problemIdMatch[1];

    let title = "";
    const titleSelectors = [
      '[data-cy="question-title"]',
      ".text-title-large",
      'div[class*="text-title"]',
      "h1",
      '[class*="title"]',
    ];

    for (const selector of titleSelectors) {
      const el = doc.querySelector(selector);
      if (el && el.textContent) {
        title = el.textContent.trim();
        if (title && !title.includes("LeetCode")) {
          break;
        }
      }
    }

    if (!title) {
      title = problemId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    let difficulty = "unknown";
    const difficultySelectors = [
      '[class*="difficulty"]',
      '[class*="Difficulty"]',
      'div[class*="text-difficulty"]',
      ".text-olive",
      ".text-yellow",
      ".text-pink",
      '[class*="text-easy"]',
      '[class*="text-medium"]',
      '[class*="text-hard"]',
    ];

    for (const selector of difficultySelectors) {
      const el = doc.querySelector(selector);
      if (el && el.textContent) {
        const text = el.textContent.toLowerCase().trim();
        if (text.includes("easy")) {
          difficulty = "easy";
          break;
        } else if (text.includes("medium")) {
          difficulty = "medium";
          break;
        } else if (text.includes("hard")) {
          difficulty = "hard";
          break;
        }
      }
    }

    let description = "";
    const descriptionSelectors = [
      '[data-track-load="description_content"]',
      '[class*="elfjS"]',
      ".question-content",
      '[class*="content__"]',
      '[class*="description"]',
      ".xFUwe",
    ];

    for (const selector of descriptionSelectors) {
      const el = doc.querySelector(selector);
      if (el && el.textContent) {
        description = el.textContent.trim();
        if (description.length > 50) {
          break;
        }
      }
    }

    description = description.replace(/\s+/g, " ").trim();
    if (description.length > 2000) {
      description = description.substring(0, 2000) + "...";
    }

    return {
      site: "leetcode",
      problemId,
      title,
      difficulty,
      description,
    };
  } catch (error) {
    console.error("LeetCode extractor error:", error);
    return null;
  }
}

import type { ProblemContext } from "../types/problemContext";

export function extractProblemContextFromDocument(
  doc: Document
): ProblemContext | null {
  try {
    const url = doc.location.href;
    
    const problemIdMatch = url.match(/problems\/([^/?#]+)/);
    if (!problemIdMatch) {
      return null;
    }
    const problemId = problemIdMatch[1];

    let title = "";
    const titleSelectors = [
      ".problems_header_content__title__L2cB2",
      ".problem-tab h3",
      "h1.problem-title",
      ".problems_header_content h3",
      "h3",
      ".head--title",
    ];

    for (const selector of titleSelectors) {
      const el = doc.querySelector(selector);
      if (el && el.textContent) {
        title = el.textContent.trim();
        if (title && title.length > 3) {
          break;
        }
      }
    }

    if (!title) {
      title = problemId
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    let difficulty = "unknown";
    const difficultySelectors = [
      ".problems_header_content__difficulty__dV6HS",
      ".difficulty-badge",
      '[class*="difficulty"]',
      ".badge",
      ".problem-difficulty",
    ];

    for (const selector of difficultySelectors) {
      const el = doc.querySelector(selector);
      if (el && el.textContent) {
        const text = el.textContent.toLowerCase().trim();
        if (text.includes("easy") || text.includes("basic") || text.includes("school")) {
          difficulty = "easy";
          break;
        } else if (text.includes("medium")) {
          difficulty = "medium";
          break;
        } else if (text.includes("hard") || text.includes("difficult")) {
          difficulty = "hard";
          break;
        }
      }
    }

    let description = "";
    const descriptionSelectors = [
      ".problems_problem_content__Xm_eO",
      ".problem-statement",
      ".problem_content",
      ".problem-tab__problem-content",
      '[class*="problem-content"]',
      ".content",
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
      site: "gfg",
      problemId,
      title,
      difficulty,
      description,
    };
  } catch (error) {
    console.error("GFG extractor error:", error);
    return null;
  }
}

# Code Mentor AI - Chrome Extension

## Overview
Code Mentor AI is a Chrome Extension (Manifest V3) that provides AI-powered coding hints for problem-solving sites like LeetCode and GeeksforGeeks. The extension extracts problem context from supported sites and allows users to request hints from a local AI model.

## Project Structure

```
├── src/                          # Chrome Extension source code
│   ├── ai/                       # AI provider abstraction
│   │   ├── localHttpProvider.ts  # Local HTTP AI provider implementation
│   │   └── types.ts              # IAIProvider interface
│   ├── analytics/                # Analytics utilities
│   │   ├── storage.ts            # Chrome storage-based analytics logging
│   │   └── types.ts              # HintEvent, AnalyticsSummary types
│   ├── background/               # Background service worker
│   │   └── index.ts              # Message handling, context storage
│   ├── content/                  # Content scripts
│   │   ├── gfgExtractor.ts       # GeeksforGeeks problem extractor
│   │   ├── index.ts              # Content script entry point
│   │   └── leetcodeExtractor.ts  # LeetCode problem extractor
│   ├── popup/                    # React popup UI
│   │   ├── components/           # React components
│   │   ├── index.tsx             # Popup entry point
│   │   ├── popup.html            # Popup HTML template
│   │   ├── PopupApp.tsx          # Main popup component
│   │   └── styles.css            # Dark theme styles
│   └── types/                    # Shared TypeScript types
│       └── problemContext.ts     # ProblemContext, message types
├── client/                       # Web preview app (for development)
│   └── src/pages/extension-preview.tsx
├── manifest.json                 # Chrome Extension manifest (v3)
├── scripts/
│   └── build-extension.ts        # Build script for extension
└── extension.vite.config.ts      # Vite config for extension build
```

## Key Technologies

- **Build System**: Vite + React + TypeScript
- **Target**: Chrome Extension Manifest V3
- **UI**: React 18 with custom dark theme CSS (no Tailwind in extension)
- **Storage**: Chrome Storage Sync API for analytics

## Supported Sites

- **LeetCode** (leetcode.com/problems/*)
- **GeeksforGeeks** (geeksforgeeks.org/problems/*)

## Key Types

### ProblemContext
```typescript
interface ProblemContext {
  site: "leetcode" | "gfg" | "other";
  problemId: string;
  title: string;
  difficulty: string;
  description: string;
}
```

### HintEvent (Analytics)
```typescript
interface HintEvent {
  site: ProblemSite;
  problemId: string;
  difficulty: string;
  timestamp: string; // ISO string
}
```

## AI Integration

The extension uses a `LocalHttpAIProvider` that POSTs to `http://localhost:11434/api/generate` (a local AI model server like Ollama). The request includes problem context and user notes, expecting a response with `{ hint: string }`.

## Building the Extension

```bash
npx tsx scripts/build-extension.ts
```

This outputs to `dist-extension/` folder which can be loaded as an unpacked extension in Chrome.

## Installing the Extension

1. Run the build script
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `dist-extension` folder

## Development

The web app at `/` shows a live preview of the extension UI for development purposes. Run `npm run dev` to start the development server.

## Permissions

- **activeTab**: Access to current tab information
- **scripting**: Execute content scripts
- **storage**: Store analytics data

## Recent Changes

- Initial project setup with full Chrome Extension structure
- Implemented content script extractors for LeetCode and GeeksforGeeks
- Created React popup UI with dark theme
- Set up background service worker for message handling
- Implemented analytics storage with Chrome Storage API
- Created web preview for development testing

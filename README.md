# Hintly - Chrome Extension Creator

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![React](https://img.shields.io/badge/React-18.x-blue)
![Vite](https://img.shields.io/badge/Vite-5.x-purple)

**An AI-powered Chrome extension for LeetCode and GeeksforGeeks that provides intelligent hints without spoiling solutions**

[Quick Start](#-quick-start) • [Features](#-features) • [Architecture](#-architecture) • [Development](#-development) • [Documentation](#-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Development](#-development)
- [Building](#-building)
- [Testing](#-testing)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Hintly** is a Chrome extension designed to help developers learn problem-solving skills by providing AI-powered hints for coding challenges on LeetCode and GeeksforGeeks. Instead of showing complete solutions, it guides users with contextual hints based on the problem's difficulty and the user's approach.

### Key Capabilities

- **Smart Context Extraction**: Automatically extracts problem details from LeetCode and GFG pages
- **AI-Powered Hints**: Generates progressive hints using local Ollama AI models
- **Privacy-First**: All AI processing happens locally on your machine
- **Analytics Dashboard**: Track your progress and hint usage patterns
- **Multi-Platform Support**: Works seamlessly on LeetCode and GeeksforGeeks

---

## ✨ Features

### Core Features

- 🤖 **Local AI Integration**: Uses Ollama for privacy-preserving AI hint generation
- 🎯 **Context-Aware Hints**: Understands problem difficulty and provides appropriate guidance
- 📊 **Progress Analytics**: Track hints requested, difficulty distribution, and recent problems
- 💾 **Persistent Storage**: Saves your analytics data locally using Chrome Storage API
- 🔄 **Real-Time Extraction**: Automatically detects and extracts problem context from supported sites
- 🎨 **Modern UI**: Built with React, Tailwind CSS, and shadcn/ui components

### Extension Components

1. **Popup Interface**
   - Problem context display
   - Hint request interface
   - Analytics dashboard
   - User notes input

2. **Content Scripts**
   - LeetCode problem extractor
   - GeeksforGeeks problem extractor
   - Automatic context detection

3. **Background Service Worker**
   - Message routing
   - State management
   - AI provider communication

4. **Analytics Engine**
   - Local storage management
   - Usage statistics
   - Difficulty tracking

---

## 🛠️ Tech Stack

### Frontend

- **React 18.x**: UI framework
- **TypeScript 5.x**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **Radix UI**: Accessible component primitives

### Backend & Server

- **Express.js**: Web server framework
- **Node.js**: Server runtime
- **Drizzle ORM**: TypeScript ORM
- **PostgreSQL**: Database (for web app version)

### AI Integration

- **Ollama**: Local AI model server
- **Llama 3**: Default AI model
- Support for: deepseek-coder, llama2, gemma3

### Build Tools

- **TSX**: TypeScript execution
- **Vite**: Module bundler
- **PostCSS**: CSS processing
- **ESBuild**: Fast JavaScript bundler

### Development Tools

- **TypeScript**: Static typing
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **React Query**: Data fetching and caching

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Chrome Browser (version 88+)
- Ollama installed and running

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/chrome-extension-creator.git
cd chrome-extension-creator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Ollama

Download from [ollama.ai](https://ollama.ai) and install the required model:

```bash
ollama pull llama3
```

### 4. Start Ollama with CORS

**Windows:**
```bash
.\start-ollama-with-cors.bat
```

**Linux/Mac:**
```bash
OLLAMA_ORIGINS="*" ollama serve
```

### 5. Build the Extension

```bash
npm run build:extension
```

### 6. Load in Chrome

1. Navigate to `chrome://extensions/`
2. Enable **Developer Mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the `dist-extension` folder

### 7. Test It

1. Visit [leetcode.com/problems/two-sum](https://leetcode.com/problems/two-sum/)
2. Click the extension icon
3. Click "Ask for Hint"
4. Receive AI-generated guidance!

---

## 📦 Installation

### For End Users

See [QUICKSTART.md](QUICKSTART.md) for a simplified installation guide.

### For Developers

1. **Clone and Setup**
   ```bash
   git clone <repo-url>
   cd chrome-extension-creator
   npm install
   ```

2. **Environment Setup**
   - Ensure Ollama is installed and running on port 11434
   - Verify CORS is enabled for localhost

3. **Development Mode**
   ```bash
   npm run dev  # Start web app dev server
   ```

4. **Build Extension**
   ```bash
   npm run build:extension
   ```

5. **Verify Build**
   ```bash
   .\check-extension.bat  # Windows
   ```

---

## 📁 Project Structure

```
chrome-extension-creator/
├── client/                     # Web app client (React)
│   ├── public/                # Static assets
│   └── src/
│       ├── components/        # Reusable UI components (shadcn/ui)
│       ├── hooks/             # Custom React hooks
│       ├── lib/               # Utilities and query client
│       └── pages/             # Page components
│
├── server/                    # Express backend
│   ├── index.ts              # Server entry point
│   ├── routes.ts             # API routes
│   ├── storage.ts            # Data storage logic
│   └── vite.ts               # Vite middleware
│
├── src/                       # Chrome Extension Source
│   ├── ai/                   # AI integration
│   │   ├── localHttpProvider.ts   # Ollama HTTP client
│   │   ├── promptBuilder.ts       # Prompt generation
│   │   └── types.ts               # AI interfaces
│   │
│   ├── analytics/            # Analytics engine
│   │   ├── storage.ts        # Chrome storage wrapper
│   │   └── types.ts          # Analytics types
│   │
│   ├── background/           # Service worker
│   │   └── index.ts          # Background script entry
│   │
│   ├── content/              # Content scripts
│   │   ├── index.ts          # Content script entry
│   │   ├── leetcodeExtractor.ts   # LeetCode parser
│   │   └── gfgExtractor.ts        # GFG parser
│   │
│   ├── popup/                # Extension popup
│   │   ├── index.tsx         # Popup entry
│   │   ├── PopupApp.tsx      # Main popup component
│   │   ├── popup.html        # Popup HTML
│   │   └── components/       # Popup UI components
│   │
│   └── types/                # Shared types
│       └── problemContext.ts # Problem context interface
│
├── dist-extension/            # Built extension (output)
│   ├── background.js
│   ├── content.js
│   ├── popup.html
│   ├── popup.js
│   ├── manifest.json
│   └── icons/
│
├── scripts/                   # Build scripts
│   └── build-extension.ts    # Extension build script
│
├── shared/                    # Shared schemas
│   └── schema.ts
│
├── manifest.json              # Extension manifest template
├── extension.vite.config.ts   # Vite config for extension
├── vite.config.ts            # Vite config for web app
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS config
└── drizzle.config.ts         # Database config
```

### Key Directories Explained

- **`src/`**: Core extension logic separated by concern
- **`client/`**: React web application (optional dashboard)
- **`server/`**: Express backend for web app
- **`dist-extension/`**: Compiled extension ready for Chrome
- **`scripts/`**: Build automation scripts

---

## 🏗️ Architecture

### Extension Architecture

```
┌─────────────────────────────────────────────────┐
│                  User Interface                 │
│  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Popup     │  │   Content Scripts       │  │
│  │   (React)   │  │  (DOM Extractors)       │  │
│  └──────┬──────┘  └───────────┬─────────────┘  │
│         │                     │                 │
│         └─────────┬───────────┘                 │
│                   │                             │
│         ┌─────────▼──────────┐                  │
│         │ Background Worker  │                  │
│         │  (Message Router)  │                  │
│         └─────────┬──────────┘                  │
│                   │                             │
└───────────────────┼─────────────────────────────┘
                    │
        ┌───────────▼───────────┐
        │   AI Provider         │
        │  (Ollama HTTP API)    │
        └───────────────────────┘
```

### Component Communication

1. **Content Script** → Extracts problem data from webpage
2. **Background Worker** → Receives and stores context
3. **Popup** → Requests context and displays UI
4. **AI Provider** → Generates hints based on context
5. **Analytics** → Tracks usage in Chrome Storage

### Data Flow

```
Web Page → Content Script → Background → Popup
                                ↓
                          AI Provider
                                ↓
                          User Hint
                                ↓
                           Analytics
```

---

## 💻 Development

### Available Scripts

```bash
# Start web app development server
npm run dev

# Build web application
npm run build

# Build Chrome extension
npm run build:extension

# Type checking
npm run check

# Database operations
npm run db:push
```

### Development Workflow

1. **Make Changes**: Edit files in `src/`
2. **Build**: Run `npm run build:extension`
3. **Reload Extension**: 
   - Go to `chrome://extensions/`
   - Click reload icon on your extension
4. **Test**: Visit LeetCode/GFG and test functionality
5. **Debug**: Use Chrome DevTools
   - Popup: Right-click extension icon → Inspect
   - Background: Extensions page → Service worker → Inspect
   - Content: Regular DevTools on webpage

### Hot Reload (Web App Only)

```bash
npm run dev
# Visit http://localhost:5000
```

Note: Extension requires manual reload in Chrome after rebuild.

### Adding a New Site Extractor

1. Create extractor in `src/content/yoursite.ts`:
   ```typescript
   export function extractYourSite(): ProblemContext | null {
     // Extract problem details
     return {
       title: "...",
       difficulty: "medium",
       description: "...",
       // ...
     };
   }
   ```

2. Register in `src/content/index.ts`:
   ```typescript
   import { extractYourSite } from './yoursite';
   
   const extractors = [
     extractLeetCode,
     extractGFG,
     extractYourSite  // Add here
   ];
   ```

3. Update `manifest.json`:
   ```json
   "content_scripts": [{
     "matches": [
       "https://yoursite.com/problems/*"
     ],
     "js": ["content.js"]
   }]
   ```

---

## 🔨 Building

### Build Extension

```bash
npm run build:extension
```

This creates optimized files in `dist-extension/`:
- `popup.html`, `popup.js`, `popup.css`
- `background.js`
- `content.js`
- `manifest.json`
- `icons/`

### Build Process

The build script (`scripts/build-extension.ts`) uses Vite to:
1. Bundle TypeScript → JavaScript
2. Compile React components
3. Process CSS with Tailwind
4. Copy static assets (manifest, icons)
5. Optimize for production

### Verify Build

```bash
.\check-extension.bat
```

Expected output:
```
[SUCCESS] Extension is ready to load!
```

---

## 🧪 Testing

### Manual Testing

1. **Load Extension** in Chrome
2. **Navigate** to test problem:
   - LeetCode: https://leetcode.com/problems/two-sum/
   - GFG: https://www.geeksforgeeks.org/problems/...
3. **Open Popup** and verify context extraction
4. **Request Hint** and check AI response
5. **Check Analytics** tab for tracking

### Debugging

**Popup Debugging:**
```
Right-click extension icon → Inspect popup
```

**Background Worker:**
```
chrome://extensions/ → Service worker → inspect
```

**Content Script:**
```
Open DevTools on webpage → Console
```

**Check Messages:**
```javascript
// In any component console
chrome.runtime.onMessage.addListener((msg) => console.log(msg));
```

---

## ⚙️ Configuration

### Manifest Configuration

Edit `manifest.json` for extension settings:

```json
{
  "name": "Your Extension Name",
  "version": "1.0.0",
  "permissions": ["activeTab", "storage"],
  "host_permissions": [
    "https://leetcode.com/*",
    "http://localhost:11434/*"
  ]
}
```

### Vite Configuration

`extension.vite.config.ts`: Extension build settings
`vite.config.ts`: Web app build settings

### Tailwind Configuration

`tailwind.config.ts`: Customize theme, colors, and components

### TypeScript Configuration

`tsconfig.json`: TypeScript compiler options

### Ollama Models

Change the AI model in `src/ai/localHttpProvider.ts`:

```typescript
const response = await fetch(`${this.baseUrl}/api/generate`, {
  body: JSON.stringify({
    model: "llama3",  // Change to: deepseek-coder, gemma3, etc.
    prompt: prompt
  })
});
```

---

## 📚 API Documentation

### Message Types

Defined in `src/types/problemContext.ts`:

```typescript
MESSAGE_TYPES = {
  PROBLEM_CONTEXT: "PROBLEM_CONTEXT",
  GET_LATEST_CONTEXT: "GET_LATEST_CONTEXT",
  LATEST_CONTEXT_RESPONSE: "LATEST_CONTEXT_RESPONSE",
  GENERATE_HINT: "GENERATE_HINT",
  HINT_RESPONSE: "HINT_RESPONSE"
}
```

### ProblemContext Interface

```typescript
interface ProblemContext {
  title: string;
  difficulty: "easy" | "medium" | "hard";
  description: string;
  topics?: string[];
  constraints?: string[];
  examples?: string[];
  url: string;
  platform: "leetcode" | "geeksforgeeks";
}
```

### AI Provider Interface

```typescript
interface IAIProvider {
  generateHint(
    context: ProblemContext,
    userNotes?: string,
    hintLevel?: "basic" | "intermediate" | "advanced"
  ): Promise<string>;
}
```

### Analytics Storage

```typescript
interface AnalyticsData {
  totalHints: number;
  byDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  recentProblems: Array<{
    title: string;
    difficulty: string;
    timestamp: number;
  }>;
}
```

---

## 🐛 Troubleshooting

### Common Issues

#### Extension Not Loading

**Problem**: Extension fails to load in Chrome

**Solution**:
1. Run `.\check-extension.bat` to verify files
2. Check `chrome://extensions/` for errors
3. Rebuild: `npm run build:extension`
4. Ensure all files exist in `dist-extension/`

#### Ollama Connection Error

**Problem**: "Failed to connect to Ollama"

**Solution**:
1. Verify Ollama is running: `curl http://localhost:11434`
2. Start with CORS: `.\start-ollama-with-cors.bat`
3. Check `OLLAMA_ORIGINS="*"` environment variable
4. Ensure firewall isn't blocking port 11434

#### Content Script Not Extracting

**Problem**: Popup shows "No problem detected"

**Solution**:
1. Refresh the problem page
2. Check URL matches pattern in manifest
3. Open DevTools console for errors
4. Verify content script injected: `chrome://extensions/`

#### Build Errors

**Problem**: TypeScript or build errors

**Solution**:
```bash
# Clean and reinstall
rm -rf node_modules dist-extension
npm install
npm run build:extension
```

#### Hints Not Generating

**Problem**: Clicking "Ask for Hint" shows error

**Solution**:
1. Check Ollama is running and accessible
2. Verify model is pulled: `ollama list`
3. Check browser console for errors
4. Test Ollama directly: `curl http://localhost:11434/api/generate -d '{"model":"llama3","prompt":"test"}'`

---

## 📖 Documentation

- **[QUICKSTART.md](QUICKSTART.md)**: Quick installation guide for end users
- **[EXTENSION_GUIDE.md](EXTENSION_GUIDE.md)**: Detailed installation and usage guide
- **[ISSUES_RESOLVED.md](ISSUES_RESOLVED.md)**: Changelog of resolved issues
- **[ERROR_HANDLING_CHANGES.md](ERROR_HANDLING_CHANGES.md)**: Error handling documentation
- **[design_guidelines.md](design_guidelines.md)**: UI/UX design principles

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow existing code formatting
- Add types for all functions and variables
- Write descriptive commit messages

### Testing Checklist

- [ ] Extension builds without errors
- [ ] Popup displays correctly
- [ ] Content scripts extract data properly
- [ ] AI hints generate successfully
- [ ] Analytics track correctly
- [ ] No console errors

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 Hintly

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **[Ollama](https://ollama.ai)**: Local AI model hosting
- **[shadcn/ui](https://ui.shadcn.com/)**: Beautiful UI components
- **[Radix UI](https://www.radix-ui.com/)**: Accessible component primitives
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Vite](https://vitejs.dev/)**: Fast build tool

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/chrome-extension-creator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/chrome-extension-creator/discussions)
- **Email**: your-email@example.com

---

## 🗺️ Roadmap

### Version 1.1 (Planned)
- [ ] Support for more coding platforms (HackerRank, Codeforces)
- [ ] Multiple hint levels (basic, intermediate, advanced)
- [ ] Hint history and favorites
- [ ] Export analytics data

### Version 1.2 (Planned)
- [ ] Cloud sync for analytics
- [ ] Team sharing features
- [ ] Custom AI model selection UI
- [ ] Dark/Light theme toggle

### Version 2.0 (Future)
- [ ] Code snippet analysis
- [ ] Time tracking for problems
- [ ] Gamification and achievements
- [ ] Community hint sharing

---

<div align="center">


</div>

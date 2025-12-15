# Code Mentor AI Chrome Extension - Installation & Usage Guide

## 🎯 Overview
This Chrome extension provides AI-powered hints for coding problems on LeetCode and GeeksforGeeks. It uses a local Ollama AI server to generate contextual hints without giving away solutions.

## ✅ Build Status
The extension has been successfully built and is ready to install!

## 📋 Prerequisites

### 1. Install Ollama (Local AI Server)
Download and install Ollama from: https://ollama.ai

After installation, pull the required model:
```bash
ollama pull llama3
```

### 2. Start Ollama Server with CORS
The extension needs CORS enabled to communicate with Ollama. 

**Windows:**
Use the provided batch file:
```bash
start-ollama-with-cors.bat
```

Or manually set the environment variable:
```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

**Linux/Mac:**
```bash
OLLAMA_ORIGINS="*" ollama serve
```

The server will run at `http://localhost:11434`

## 🚀 Installing the Extension

### Step 1: Build the Extension (Already Done!)
The extension has been built. Files are in the `dist-extension` folder.

To rebuild if needed:
```bash
npm run build:extension
```

### Step 2: Load in Chrome

1. Open Chrome and navigate to: `chrome://extensions/`

2. Enable **Developer Mode** (toggle in top-right corner)

3. Click **"Load unpacked"**

4. Select the `dist-extension` folder from this project

5. The extension icon should appear in your Chrome toolbar

## 💡 How to Use

### 1. Navigate to a Problem
Go to a coding problem on either:
- LeetCode: https://leetcode.com/problems/
- GeeksforGeeks: https://www.geeksforgeeks.org/problems/

### 2. Open the Extension
Click the extension icon in your toolbar

### 3. View Problem Context
The extension automatically extracts:
- Problem title
- Difficulty level
- Problem description

### 4. Get AI Hints
1. Optionally, add notes about your approach
2. Click "Ask for Hint"
3. Wait for the AI to generate a helpful hint
4. Review the hint without seeing the full solution

### 5. Track Your Progress
Switch to the **Analytics** tab to see:
- Total hints requested
- Breakdown by difficulty
- Recent problems worked on

## 🔧 Troubleshooting

### Extension Won't Load
- Make sure all files exist in `dist-extension`:
  - `popup.html`, `popup.js`, `popup.css`
  - `background.js`, `content.js`
  - `manifest.json`
  - `icons/` folder with icon files
- Check Chrome's error console in `chrome://extensions/`

### "Cannot connect to AI server" Error
- Ensure Ollama is running: `ollama list` should show installed models
- Verify CORS is enabled (use the batch file on Windows)
- Check that the server is at `http://localhost:11434`
- Test with: `curl http://localhost:11434/api/tags`

### Content Script Not Working
- Refresh the LeetCode/GFG page after installing the extension
- Check if you're on a problem page (not the homepage)
- Check the Console tab in Chrome DevTools for errors

### Popup Shows "No Problem Context"
- Make sure you're on a problem page, not the problem list
- Wait a moment for the page to fully load
- Try refreshing the page

## 🛠️ Development

### Project Structure
```
dist-extension/          # Built extension files (load this in Chrome)
src/
  ├── background/        # Background service worker
  ├── content/          # Content scripts (LeetCode & GFG extractors)
  ├── popup/            # Extension popup UI
  ├── ai/               # AI provider (Ollama integration)
  ├── analytics/        # Usage tracking
  └── types/            # TypeScript types
```

### Rebuild the Extension
```bash
npm run build:extension
```

After rebuilding, click the refresh icon in `chrome://extensions/` for your extension.

### View Logs
- **Background Script**: `chrome://extensions/` → Click "service worker" under the extension
- **Content Script**: Open DevTools on the problem page → Console
- **Popup**: Right-click extension icon → Inspect popup → Console

## 📝 Features

✅ Multi-site support (LeetCode & GeeksforGeeks)
✅ Automatic problem context extraction
✅ AI-powered hints (local, private)
✅ Progress tracking and analytics
✅ Clean, dark-themed UI
✅ No data sent to external servers

## 🔒 Privacy
- All AI processing happens locally on your machine
- No data is sent to external servers
- Analytics stored locally in Chrome storage

## 🆘 Getting Help

If you encounter issues:
1. Check the console logs (see "View Logs" section above)
2. Ensure Ollama is running with CORS enabled
3. Verify you're on a supported problem page
4. Try rebuilding the extension

## ✨ Tips

- Add notes about your approach before asking for hints
- The AI provides conceptual guidance, not full solutions
- Use the analytics tab to track your progress
- The extension works offline (after initial model download)

---

**Ready to code smarter? Install the extension and start solving problems with AI assistance!** 🚀

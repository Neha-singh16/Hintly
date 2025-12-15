@echo off
echo.
echo ========================================
echo Chrome Extension Health Check
echo ========================================
echo.

REM Check if dist-extension folder exists
if exist "dist-extension" (
    echo [OK] dist-extension folder exists
) else (
    echo [ERROR] dist-extension folder not found
    echo Run: npm run build:extension
    goto :error
)

REM Check critical files
set "files_ok=1"

if exist "dist-extension\manifest.json" (
    echo [OK] manifest.json exists
) else (
    echo [ERROR] manifest.json missing
    set "files_ok=0"
)

if exist "dist-extension\popup.html" (
    echo [OK] popup.html exists
) else (
    echo [ERROR] popup.html missing
    set "files_ok=0"
)

if exist "dist-extension\popup.js" (
    echo [OK] popup.js exists
) else (
    echo [ERROR] popup.js missing
    set "files_ok=0"
)

if exist "dist-extension\background.js" (
    echo [OK] background.js exists
) else (
    echo [ERROR] background.js missing
    set "files_ok=0"
)

if exist "dist-extension\content.js" (
    echo [OK] content.js exists
) else (
    echo [ERROR] content.js missing
    set "files_ok=0"
)

if exist "dist-extension\icons" (
    echo [OK] icons folder exists
) else (
    echo [ERROR] icons folder missing
    set "files_ok=0"
)

if "%files_ok%"=="0" (
    echo.
    echo [ERROR] Some files are missing. Run: npm run build:extension
    goto :error
)

echo.
echo ========================================
echo Checking Ollama Server...
echo ========================================
echo.

REM Check if Ollama is running
curl -s http://localhost:11434/api/tags >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Ollama server is running
    echo.
    echo Installed models:
    curl -s http://localhost:11434/api/tags
) else (
    echo [WARNING] Ollama server not responding
    echo Please start Ollama with CORS enabled:
    echo   - Run: start-ollama-with-cors.bat
    echo   - Or: set OLLAMA_ORIGINS=* ^&^& ollama serve
)

echo.
echo ========================================
echo Extension Status
echo ========================================
echo.
echo [SUCCESS] Extension is ready to load!
echo.
echo Next steps:
echo 1. Open Chrome and go to: chrome://extensions/
echo 2. Enable "Developer mode" (top-right toggle)
echo 3. Click "Load unpacked"
echo 4. Select the "dist-extension" folder
echo 5. Navigate to LeetCode or GeeksforGeeks
echo 6. Click the extension icon to use it
echo.
echo Full guide: See EXTENSION_GUIDE.md
echo.
pause
exit /b 0

:error
echo.
echo ========================================
echo [ERROR] Extension has issues
echo ========================================
echo.
echo Please fix the errors above and try again.
echo.
pause
exit /b 1

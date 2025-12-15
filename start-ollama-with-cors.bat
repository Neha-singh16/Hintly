@echo off
echo ========================================
echo Starting Ollama with CORS enabled
echo ========================================
echo.
echo CORS Policy: Allow all origins (*)
echo This allows Chrome extensions to access Ollama
echo.
set OLLAMA_ORIGINS=*
set OLLAMA_HOST=127.0.0.1:11434
echo Starting Ollama server...
ollama serve

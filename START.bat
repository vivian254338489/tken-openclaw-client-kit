@echo off
setlocal
cd /d "%~dp0"
node preflight.mjs
if errorlevel 1 goto failed
echo Generating TKEN OpenClaw config...
node install.mjs
if errorlevel 1 goto failed
echo.
echo Generated: generated\openclaw.tken.json
echo Next: set TKEN_API_KEY in your environment and copy the generated config into your OpenClaw-style client.
pause
goto end

:failed
echo.
echo Setup failed. Make sure Node.js 20+ is installed.
pause

:end

@echo off
setlocal
cd /d "%~dp0"
echo Generating TKEN OpenClaw client support report...
node support-report.mjs
if errorlevel 1 goto failed
echo.
echo Generated: generated\support-report.json
echo Send this file with your support request. It does not include raw API keys.
pause
goto end

:failed
echo.
echo Support report failed. Make sure Node.js 20+ is installed.
pause

:end

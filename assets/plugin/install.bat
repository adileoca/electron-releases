@echo off
setlocal

REM Get the plugin path from the first argument
set "PLUGIN_PATH=%~1"

REM macOS not supported in batch script
REM Check if running on Windows
REM Install plugin using Adobe UnifiedPluginInstallerAgent

set "AGENT_DIR=C:\Program Files\Common Files\Adobe\Adobe Desktop Common\RemoteComponents\UPI\UnifiedPluginInstallerAgent"
set "AGENT_EXE=UnifiedPluginInstallerAgent.exe"

if exist "%AGENT_DIR%\%AGENT_EXE%" (
    pushd "%AGENT_DIR%"
    "%AGENT_EXE%" /install "%PLUGIN_PATH%"
    REM echo Installed plugin. Listing installed plugins...
    REM "%AGENT_EXE%" /list all
    popd
) else (
    echo Adobe UnifiedPluginInstallerAgent not found in "%AGENT_DIR%"
    exit /b 1
)

endlocal

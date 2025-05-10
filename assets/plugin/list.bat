@echo off
setlocal

REM List installed plugins using Adobe UnifiedPluginInstallerAgent

set "AGENT_DIR=C:\Program Files\Common Files\Adobe\Adobe Desktop Common\RemoteComponents\UPI\UnifiedPluginInstallerAgent"
set "AGENT_EXE=UnifiedPluginInstallerAgent.exe"

if exist "%AGENT_DIR%\%AGENT_EXE%" (
    pushd "%AGENT_DIR%"
    "%AGENT_EXE%" /list all
    popd
) else (
    echo Adobe UnifiedPluginInstallerAgent not found in "%AGENT_DIR%"
    exit /b 1
)

endlocal

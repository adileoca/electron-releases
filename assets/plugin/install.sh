#!/bin/bash

PLUGIN_PATH=$1

# Determine the operating system
OS=$(uname)

if [[ "$OS" == "Darwin" ]]; then
  # macOS
  cd "/Library/Application Support/Adobe/Adobe Desktop Common/RemoteComponents/UPI/UnifiedPluginInstallerAgent/UnifiedPluginInstallerAgent.app/Contents/MacOS"
  ./UnifiedPluginInstallerAgent --install "$PLUGIN_PATH"
elif [[ "$OS" == "Linux" ]]; then
  # Linux (assuming WSL for Windows)
  cd "/mnt/c/Program Files/Common Files/Adobe/Adobe Desktop Common/RemoteComponents/UPI/UnifiedPluginInstallerAgent"
  ./UnifiedPluginInstallerAgent.exe /install "$PLUGIN_PATH"
else
  echo "Unsupported OS: $OS"
  exit 1
fi

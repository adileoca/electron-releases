const { BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const { autoUpdater } = require("electron-updater");

function createWindow() {
  let window = new BrowserWindow({
    width: 1200,
    height: 740,
    minWidth: 1200,
    minHeight: 740,
    hasShadow: true,
    frame: false,
    vibrancy: "sidebar",
    titleBarStyle: "hidden",
    trafficLightPosition: { x: 20, y: 16 },
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  window.setWindowButtonVisibility(true);

  window.loadURL(
    isDev
      ? "http://localhost:3001"
      : `file://${path.join(__dirname, "../../../build/index.html")}`
  );

  if (isDev) {
    window.webContents.openDevTools({ mode: "detach" });
  }

  window.once("ready-to-show", () => {
    autoUpdater.checkForUpdatesAndNotify();
  });

  autoUpdater.on("update-available", () => {
    window.webContents.send("update_available");
  });
  autoUpdater.on("update-downloaded", () => {
    window.webContents.send("update_downloaded");
  });

  return window;
}

module.exports = createWindow;

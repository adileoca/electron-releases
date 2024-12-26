const { BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

function createWindow() {
  let window = new BrowserWindow({
    width: 1200,
    height: 740,
    minWidth: 1200,
    minHeight: 740,
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

  return window
}

module.exports = createWindow;

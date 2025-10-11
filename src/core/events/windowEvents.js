const { app, BrowserWindow, dialog, pushNotifications } = require("electron");
const packageJson = require("../../../package.json");
const { autoUpdater } = require("electron-updater");
const { exec } = require("child_process");
const isDev = require("electron-is-dev");
const { platform } = require("os");
const path = require("path");
const url = require("url");
const { installPlugin } = require("./../utils/installPlugin.js");
const { log } = require("../logger");
console.log("installPlugin: ", installPlugin);

function createWindow() {
  log.info("Creating main BrowserWindow");
  let window = new BrowserWindow({
    width: 1200,
    height: 777,
    minWidth: 1200,
    minHeight: 777,
    hasShadow: true,
    frame: false,
    vibrancy: "sidebar",
    titleBarStyle: "hidden",
    backgroundMaterial: "acrylic",
    darkTheme: true,
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  window.isMainWindow = true;

  if (platform() === "darwin") {
    window.setWindowButtonVisibility(true);
  }

  window.loadURL(
    isDev
      ? "http://localhost:3005"
      : url.format({
          pathname: path.join(__dirname, "../../../build/index.html"),
          protocol: "file:",
          slashes: true,
        })
  );

  if (isDev) {
    window.webContents.openDevTools({ mode: "detach" });
    // dialog.showMessageBox({
    //   type: "info",
    //   title: "Update available",
    //   message:
    //     "A new version of the application is available. It will be downloaded in the background.",
    // });
  }

  window.webContents.on(
    "console-message",
    (event, level, message, line, sourceId) => {
      const levelMap = {
        0: "info",
        1: "warn",
        2: "error",
        3: "info",
        4: "debug",
      };

      const logLevel = levelMap[level] || "info";
      const location = sourceId ? `${sourceId}:${line}` : "renderer";
      const formattedMessage = `[${location}] ${message}`;

      if (typeof log[logLevel] === "function") {
        log[logLevel](formattedMessage);
      } else {
        log.info(formattedMessage);
      }
    }
  );

  window.once("ready-to-show", () => {
    autoUpdater.checkForUpdatesAndNotify();
    installPlugin({ force: false, window });
  });

  autoUpdater.on("checking-for-update", () => {
    window.webContents.send("checking-for-update");
  });

  autoUpdater.on("update-available", () => {
    window.webContents.send("update-available");
  });

  autoUpdater.on("update-downloaded", () => {
    window.webContents.send("update-downloaded");
  });

  autoUpdater.on("update-not-available", () => {
    window.webContents.send("update-not-available");
  });

  autoUpdater.on("download-progress", (event) => {
    window.webContents.send("download-progress", event);
  });

  autoUpdater.on("error", (error) => {
    window.webContents.send("update-error", event);
  });

  return window;
}

module.exports = createWindow;

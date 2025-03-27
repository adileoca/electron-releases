const { BrowserWindow, dialog, pushNotifications } = require("electron");
const { autoUpdater } = require("electron-updater");
const { exec } = require("child_process");
const isDev = require("electron-is-dev");
const path = require("path");

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
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  window.setWindowButtonVisibility(true);

  window.loadURL(
    isDev
      ? "http://localhost:3005"
      : `file://${path.join(__dirname, "../../../build/index.html")}`
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

  window.once("ready-to-show", () => {
    autoUpdater.checkForUpdatesAndNotify();

    // todo: have the plugin send its version via ws and compare with latest available version
    // todo: if there's a new plugin version available, install it, and show some notice in the plugin
    installPlugin(window);
  });

  // setInterval(() => {
  //   autoUpdater.checkForUpdatesAndNotify();
  // }, 60 * 60 * 1000); // 1 hour

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

const installPlugin = (window) => {
  const scriptPath = path.join(
    __dirname,
    "../../../../assets/plugin/install.sh"
  );
  const pluginPath = path.join(
    __dirname,
    "../../../../assets/plugin/package_PS.ccx"
  );

  window.webContents.send("plugin-message", {
    message: "Installing plugin...",
  });
  window.webContents.send("plugin-message", {
    message: `script path: ${scriptPath}`,
  });
  window.webContents.send("plugin-message", {
    message: `plugin path: ${pluginPath}`,
  });
  exec(`bash ${scriptPath} ${pluginPath}`, (error, stdout, stderr) => {
    if (error) {
      const message = `Error executing script: ${error.message}`;
      window.webContents.send("plugin-message", { message });
      return;
    }
    if (stderr) {
      const message = `Script stderr: ${stderr}`;
      window.webContents.send("plugin-message", { message });
      return;
    }
    const message = `Script output: ${stdout}`;
    window.webContents.send("plugin-message", { message });
    console.log(message);
  });
};

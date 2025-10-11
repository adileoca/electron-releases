const { app, BrowserWindow } = require("electron");
const { setupLogging, log } = require("./logger");
const { logFile } = setupLogging();
const { setupIpcEvents } = require("./events/ipcEvents");
const createWindow = require("./events/windowEvents");
const setupServer = require("./server/index");
log.info(`Writing Electron logs to ${logFile}`);

// ! make sure to apply changes to electron.js as well
app.whenReady().then(() => {
  createWindow();
  setupIpcEvents();
  setupServer();
  log.info("Main process initialised");
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const { app, BrowserWindow, ipcMain, dialog, session } = require("electron");
const { exec } = require("child_process");
const path = require("path");

const { setupIpcEvents } = require("../src/core/events/ipcEvents");
const createWindow = require("../src/core/events/windowEvents");
const setupServer = require("../src/core/server/index");
const { installPlugin } = require("../src/core/utils/installPlugin");

// todo: this is electron.js
app.whenReady().then(() => {
  createWindow();
  setupIpcEvents();
  setupServer();
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

const { app, BrowserWindow, ipcMain, dialog, session } = require("electron");
const { exec } = require("child_process");
const path = require("path");

const { installPlugin } = require("./utils/installPlugin");
const { setupIpcEvents } = require("./events/ipcEvents");
const createWindow = require("./events/windowEvents");
const setupServer = require("./server/index");

// ! make sure to apply changes to electron.js as well
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

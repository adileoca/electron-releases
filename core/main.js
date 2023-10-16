// 1. Import Dependencies
const { app, BrowserWindow } = require("electron");

const createWindow = require("./events/windowEvents");
const { setupIpcEvents } = require("./events/ipcEvents");
const registerFileProtocol = require("./utils/fileProtocol");

app.whenReady().then(() => {
  registerFileProtocol();
  createWindow();
  setupIpcEvents();
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

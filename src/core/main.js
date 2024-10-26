const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");

const { setupIpcEvents } = require("./events/ipcEvents");
const createWindow = require("./events/windowEvents");

app.whenReady().then(async () => {
  createWindow();
  setupIpcEvents();

  try {
    const expressServerModule = await import("./expressServer.mjs");
    expressServerModule.app.listen();
  } catch (error) {
    console.error("Error importing expressServer:", error);
  }
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

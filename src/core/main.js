const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
const { simpleParser } = require("mailparser");
const createWindow = require("./events/windowEvents");
const { setupIpcEvents } = require("./events/ipcEvents");
const { setToken } = require("./tokenManager");
const expressServer = require("./expressServer");

app.whenReady().then(() => {
  createWindow();
  setupIpcEvents();

  expressServer.listen();
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

ipcMain.on("set-token", (_, token) => {
  setToken(token);
  console.log("Token received and stored in main process");
});

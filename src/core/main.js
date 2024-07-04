const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = require("./events/windowEvents");
const { setupIpcEvents } = require("./events/ipcEvents");
const registerFileProtocol = require("./utils/fileProtocol");
const expressServer = require("./expressServer");
const { setToken } = require("./tokenManager");

app.whenReady().then(() => {
  registerFileProtocol(); // todo: check if needed
  createWindow();
  // setupIpcEvents();
  expressServer.listen();
});

ipcMain.on("set-token", (_, token) => {
  setToken(token);
  console.log("Token received and stored in main process");
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

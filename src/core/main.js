const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { simpleParser } = require("mailparser");
const createWindow = require("./events/windowEvents");
const { setupIpcEvents } = require("./events/ipcEvents");
const registerFileProtocol = require("./utils/fileProtocol");
const expressServer = require("./expressServer");
const { setToken } = require("./tokenManager");

app.whenReady().then(() => {
  registerFileProtocol(); // todo: check if needed
  createWindow();
  setupIpcEvents();
  expressServer.listen();

  ipcMain.handle("parse-email", async (_, { data }) => {

    try {
      const mail = await simpleParser(data); // Use an async/await pattern
      console.log("mail", mail);
      return mail; // Resolve with parsed mail
    } catch (err) {
      console.error("Error parsing the email:", err);
      throw err; // Throw errors to send to the renderer
    }
  });
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

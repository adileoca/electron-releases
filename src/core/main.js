const { app, BrowserWindow, ipcMain, dialog, session } = require("electron");
const { exec } = require("child_process");
const path = require("path");

const { setupIpcEvents } = require("./events/ipcEvents");
const createWindow = require("./events/windowEvents");
const setupServer = require("./server/index.js");
const { getWindow } = require("./getWindow.js");

app.whenReady().then(() => {
  const mainWindow = getWindow();
   setupServer();
  setupIpcEvents();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    getWindow();
  }
});

// // const filter = { urls: ["*://*.adipan.eu/*"] };
// const filter = { urls: ["http://localhost:*/*", "https://localhost:*/*"] };

// session.defaultSession.webRequest.onBeforeSendHeaders(
//   filter,
//   (details, callback) => {
//     callback({ requestHeaders: details.requestHeaders });
//   }
// );

// // Add CORS headers to responses
// session.defaultSession.webRequest.onHeadersReceived(
//   filter,
//   (details, callback) => {
//     if (!details.responseHeaders) {
//       details.responseHeaders = {};
//     }

//     details.responseHeaders["Access-Control-Allow-Origin"] = [
//       "http://localhost:3005",
//     ];
//     details.responseHeaders["Access-Control-Allow-Methods"] = [
//       "GET, POST, PUT, DELETE, OPTIONS",
//     ];
//     details.responseHeaders["Access-Control-Allow-Headers"] = [
//       "Content-Type, Authorization",
//     ];

//     callback({ responseHeaders: details.responseHeaders });
//   }
// );

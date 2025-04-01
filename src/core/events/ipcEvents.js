const { ipcMain, BrowserWindow } = require("electron");
const { autoUpdater } = require("electron-updater");

const { handleReadFile } = require("./handlers/read-file.js");
const { handleDeleteCachedFile } = require("./handlers/delete-cache-file.js");
const { handleCacheFile } = require("./handlers/cache-file.js");
const { handleCacheFileFromUrl } = require("./handlers/cache-file-from-url.js");
const { handleParseEmail } = require("./handlers/parse-email.js");
const { onOpenLink } = require("./handlers/open-link.js");
const { onOpenLinkInBrowser } = require("./handlers/open-link-in-browser.js");
const { handleUploadFile } = require("./handlers/upload-file.js");
const {
  handleGetCachedFilenames,
} = require("./handlers/get-cached-filenames.js");
const {
  handleReadAndStreamFile,
} = require("./handlers/read-and-stream-file.js");


function setupIpcEvents(broadcast) {
  // Set up IPC event handlers
  ipcMain.handle("read-file", handleReadFile);
  ipcMain.handle("upload-file", handleUploadFile);
  ipcMain.handle("delete-cache-file", handleDeleteCachedFile);
  ipcMain.handle("get-cached-filenames", handleGetCachedFilenames);
  ipcMain.handle("read-and-stream-file", handleReadAndStreamFile);
  ipcMain.handle("cache-file", handleCacheFile);
  // ipcMain.handle("cache-file-from-url", handleCacheFileFromUrl);
  ipcMain.handle("parse-email", handleParseEmail);

  // Set up IPC event listeners


  ipcMain.on("check-updates", (event, data) => {
    console.log("checking for updates");
    autoUpdater.checkForUpdatesAndNotify();
  });

  ipcMain.on("restart-app", () => {
    autoUpdater.quitAndInstall();
  });

  ipcMain.on("open-link", onOpenLink);

  ipcMain.on("print-label", async (event, url) => {
    console.log("print-label fired");
    const printWindow = new BrowserWindow({
      show: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
    await printWindow.loadURL(url);

    // Open print dialog when content is loaded
    printWindow.webContents.on("did-finish-load", () => {
      console.log("Content loaded successfully");
      setTimeout(() => {
        printWindow.webContents.print({}, (success, reason) => {
          console.log(
            `Print ${success ? "successful" : "failed"}`,
            reason || ""
          );
          printWindow.close();
        });
      }, 500); // Small delay to ensure content is fully rendered
    });

    // Add error handling
    printWindow.webContents.on(
      "did-fail-load",
      (event, errorCode, errorDescription) => {
        console.error("Failed to load content:", errorCode, errorDescription);
        printWindow.close();
      }
    );
  });

  ipcMain.on("open-link-in-browser", onOpenLinkInBrowser);
}

module.exports = { setupIpcEvents };

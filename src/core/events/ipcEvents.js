const { ipcMain } = require("electron");
const {autoUpdater} = require("electron-updater");

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

/**
 * Sets up IPC event handlers.
 *
 * @param {BrowserWindow} window - The Electron BrowserWindow instance.
 */
function setupIpcEvents(window, setSession) {
  // Set up IPC event handlers
  ipcMain.handle("read-file", handleReadFile);
  ipcMain.handle("upload-file", handleUploadFile);
  ipcMain.handle("delete-cache-file", handleDeleteCachedFile);
  ipcMain.handle("get-cached-filenames", handleGetCachedFilenames);
  ipcMain.handle("read-and-stream-file", handleReadAndStreamFile);
  ipcMain.handle("cache-file", handleCacheFile);
  ipcMain.handle("cache-file-from-url", handleCacheFileFromUrl);
  ipcMain.handle("parse-email", handleParseEmail);

  // Set up IPC event listeners
  ipcMain.on("set-session", async (_, session) => {
    setSession(session);
  });
  ipcMain.on("restart_app", () => {
    autoUpdater.quitAndInstall();
  });
  ipcMain.on("open-link", onOpenLink);
  ipcMain.on("open-link-in-browser", onOpenLinkInBrowser);
}

module.exports = { setupIpcEvents };

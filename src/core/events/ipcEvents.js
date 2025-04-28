const { ipcMain, BrowserWindow, session } = require("electron");
const { autoUpdater } = require("electron-updater");
const { handleReadFile } = require("./handlers/read-file.js");
const { handleDeleteCachedFile } = require("./handlers/delete-cache-file.js");
const { handleCacheFile } = require("./handlers/cache-file.js");
const { handleCacheFileFromUrl } = require("./handlers/cache-file-from-url.js");
const { handleParseEmail } = require("./handlers/parse-email.js");
const { onOpenLink } = require("./handlers/open-link.js");
const { onOpenLinkInBrowser } = require("./handlers/open-link-in-browser.js");
const { handleUploadFile } = require("./handlers/upload-file.js");
const axios = require("axios");
const {
  handleGetCachedFilenames,
} = require("./handlers/get-cached-filenames.js");
const { handleDownloadFile } = require("./handlers/download-file.js");

const { installPlugin } = require("../utils/installPlugin.js");
function setupIpcEvents(broadcast) {
  // Set up IPC event handlers
  ipcMain.handle("read-file", handleReadFile);
  ipcMain.handle("upload-file", handleUploadFile);
  ipcMain.handle("delete-cache-file", handleDeleteCachedFile);
  ipcMain.handle("get-cached-filenames", handleGetCachedFilenames);
  ipcMain.handle("download-file", handleDownloadFile);
  ipcMain.handle("cache-file", handleCacheFile);
  // ipcMain.handle("cache-file-from-url", handleCacheFileFromUrl);
  ipcMain.handle("parse-email", handleParseEmail);

  // Set up IPC event listeners
  ipcMain.on("install-plugin", (event, data) => {
    console.log("install-plugin fired");
    installPlugin();
  });

  ipcMain.on("check-updates", (event, data) => {
    console.log("checking for updates");
    autoUpdater.checkForUpdatesAndNotify();
  });

  ipcMain.on("restart-app", () => {
    autoUpdater.quitAndInstall();
  });

  ipcMain.on("open-link", onOpenLink);

  ipcMain.handle("create-shipment", async (event, { order_id, session }) => {
    try {
      console.log("creating shipment in ipc...", { order_id, session });
      const sessionJson = JSON.stringify(session);
      const base64Session = Buffer.from(sessionJson).toString("base64");
      const encodedSession = `base64-${base64Session}`;

      const response = await axios.post(
        "https://adipan.eu/api/ups/create-shipping",
        { orderId: order_id },
        { headers: { "sb-vrdaoudvtphptybaljqq-auth-token": encodedSession } }
      );
      console.log("shipment response", response.data.data);
      return { url: response.data.data.url, error: null };
    } catch (err) {
      return { error: err.message, url: null };
    }
  });

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
      console.log("print content loaded successfully");
      printWindow.show();
      printWindow.focus();

      setTimeout(() => {
        printWindow.webContents.print(
          {
            silent: false,
            printBackground: true,
            color: true,
            landscape: false, // Add explicit landscape setting
            margins: {
              marginType: "default",
            },
            pageSize: "A4", // Explicitly set page size
          },
          (success, reason) => {
            console.log(
              `Print ${success ? "successful" : "failed"}`,
              reason || ""
            );
            printWindow.close();
          }
        );
      }, 2000); // Small delay to ensure content is fully rendered
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

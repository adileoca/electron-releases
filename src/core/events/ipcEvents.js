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
const { platform } = require("os");
const { installPlugin } = require("../utils/installPlugin.js");
const { getWindow } = require("../getWindow.js");

function setupIpcEvents(broadcast) {
  const mainWindow = getWindow();
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
    installPlugin({ force: true, window: mainWindow });
  });

  ipcMain.on("check-updates", (event, data) => {
    console.log("checking for updates");
    autoUpdater.checkForUpdatesAndNotify();
  });

  ipcMain.on("restart-app", () => {
    autoUpdater.quitAndInstall();
  });

  ipcMain.on("window-minimize", () => {
    if (mainWindow && !mainWindow.isMinimized()) {
      mainWindow.minimize();
    }
  });

  ipcMain.on("window-maximize", () => {
    if (!mainWindow) return;

    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on("window-close", () => {
    if (mainWindow) {
      mainWindow.close();
    }
  });

  ipcMain.on("open-link", onOpenLink);

  ipcMain.handle("get-platform", () => platform());

  ipcMain.handle("api-request", async (_, config = {}) => {
    try {
      const {
        method = "GET",
        url,
        data,
        params,
        headers = {},
        baseURL = "http://localhost:3000",
        timeout,
        session: authSession,
        sessionHeader = "sb-vrdaoudvtphptybaljqq-auth-token",
      } = config;

      if (!url) {
        throw new Error("URL is required for api-request");
      }

      const requestHeaders = { ...headers };

      if (authSession) {
        const sessionJson = JSON.stringify(authSession);
        const base64Session = Buffer.from(sessionJson).toString("base64");
        requestHeaders[sessionHeader] = `base64-${base64Session}`;
      }

      const isAbsoluteUrl = /^https?:\/\//i.test(url);
      const axiosConfig = {
        method,
        data,
        params,
        headers: requestHeaders,
        timeout,
      };

      if (isAbsoluteUrl) {
        axiosConfig.url = url;
      } else {
        axiosConfig.baseURL = baseURL;
        axiosConfig.url = url;
      }

      const response = await axios(axiosConfig);

      return {
        data: response.data,
        status: response.status,
        headers: response.headers,
        error: null,
      };
    } catch (error) {
      if (error.response) {
        return {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers,
          error: error.message,
        };
      }

      return {
        data: null,
        status: null,
        headers: null,
        error: error.message,
      };
    }
  });

  ipcMain.handle("create-shipment", async (_, { order_id, session }) => {
    try {
      console.log("creating shipment in ipc...", { order_id, session });
      const sessionJson = JSON.stringify(session);
      const base64Session = Buffer.from(sessionJson).toString("base64");
      const encodedSession = `base64-${base64Session}`;

      const response = await axios.post(
        "http://localhost:3000/api/shipment/create",
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

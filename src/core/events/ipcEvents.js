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
const { createLogger } = require("../utils/logging.js");

function setupIpcEvents(broadcast) {
  const mainWindow = getWindow();
  const logger = createLogger("ipc-main", {
    windowId: mainWindow?.id,
  });
  const ipcLogger = logger.child("ipc");
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
    ipcLogger.info("install-plugin", {
      windowId: mainWindow?.id,
      requestId: data?.requestId,
    });
    installPlugin({ force: true, window: mainWindow });
  });

  ipcMain.on("check-updates", (event, data) => {
    ipcLogger.info("check-updates", {
      autoInstallOnAppQuit: autoUpdater.autoInstallOnAppQuit,
      requestId: data?.requestId,
    });
    autoUpdater.checkForUpdatesAndNotify();
  });

  ipcMain.on("restart-app", () => {
    ipcLogger.warn("restart-app");
    autoUpdater.quitAndInstall();
  });

  ipcMain.on("window-minimize", () => {
    if (mainWindow && !mainWindow.isMinimized()) {
      ipcLogger.debug("window-minimize", { windowId: mainWindow.id });
      mainWindow.minimize();
    }
  });

  ipcMain.on("window-maximize", () => {
    if (!mainWindow) return;

    if (mainWindow.isMaximized()) {
      ipcLogger.debug("window-unmaximize", { windowId: mainWindow.id });
      mainWindow.unmaximize();
    } else {
      ipcLogger.debug("window-maximize", { windowId: mainWindow.id });
      mainWindow.maximize();
    }
  });

  ipcMain.on("window-close", () => {
    if (mainWindow) {
      ipcLogger.warn("window-close", { windowId: mainWindow.id });
      mainWindow.close();
    }
  });

  ipcMain.on("open-link", onOpenLink);

  ipcMain.handle("get-platform", () => platform());

  ipcMain.handle("api-request", async (_, config = {}) => {
    const requestLogger = ipcLogger.child("api-request");
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

      requestLogger.info("send", {
        method,
        url: isAbsoluteUrl ? url : `${baseURL}${url}`,
        hasData: Boolean(data),
        hasParams: Boolean(params),
      });

      const response = await axios(axiosConfig);

      requestLogger.debug("success", {
        status: response.status,
        headerCount: Object.keys(response.headers || {}).length,
      });

      return {
        data: response.data,
        status: response.status,
        headers: response.headers,
        error: null,
      };
    } catch (error) {
      if (error.response) {
        requestLogger.warn("error-response", {
          status: error.response.status,
          url,
        });
        return {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers,
          error: error.message,
        };
      }

      requestLogger.error("error-network", error);
      return {
        data: null,
        status: null,
        headers: null,
        error: error.message,
      };
    }
  });

  ipcMain.handle("create-shipment", async (_, { order_id, session }) => {
    const shipmentLogger = ipcLogger.child("create-shipment", { order_id });
    try {
      shipmentLogger.info("start");
      const sessionJson = JSON.stringify(session);
      const base64Session = Buffer.from(sessionJson).toString("base64");
      const encodedSession = `base64-${base64Session}`;

      const response = await axios.post(
        "https://adipan.eu/api/shipment/create",
        { orderId: order_id },
        { headers: { "sb-vrdaoudvtphptybaljqq-auth-token": encodedSession } }
      );
      shipmentLogger.info("success", {
        responseStatus: response.status,
      });
      return { url: response.data.data.url, error: null };
    } catch (err) {
      shipmentLogger.error("error", err);
      return { error: err.message, url: null };
    }
  });

  ipcMain.on("print-label", async (event, url) => {
    const printLogger = ipcLogger.child("print-label", { url });
    printLogger.info("start");
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
      printLogger.debug("content-loaded");
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
            if (success) {
              printLogger.info("print-success");
            } else {
              printLogger.warn("print-failed", { reason });
            }
            printWindow.close();
          }
        );
      }, 2000); // Small delay to ensure content is fully rendered
    });

    // Add error handling
    printWindow.webContents.on(
      "did-fail-load",
      (event, errorCode, errorDescription) => {
        printLogger.error("load-failed", {
          errorCode,
          errorDescription,
        });
        printWindow.close();
      }
    );
  });

  ipcMain.on("open-link-in-browser", onOpenLinkInBrowser);
}

module.exports = { setupIpcEvents };

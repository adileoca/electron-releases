const { app, BrowserWindow, ipcMain, dialog, session } = require("electron");
const { exec } = require("child_process");
const path = require("path");

const setupExpressServer = require("./server/expressServer.js");
const { setupIpcEvents } = require("./events/ipcEvents");
const createWindow = require("./events/windowEvents");

app.whenReady().then(async () => {
  const mainWindow = createWindow();
  const { app, setSession } = setupExpressServer(mainWindow);
  setupIpcEvents(mainWindow, setSession);
  // const filter = { urls: ["*://*.adipan.eu/*"] };
  const filter = { urls: ["http://localhost:*/*", "https://localhost:*/*"] };


  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    callback({ requestHeaders: details.requestHeaders });
  });

  // Add CORS headers to responses
  session.defaultSession.webRequest.onHeadersReceived(filter, (details, callback) => {
    if (!details.responseHeaders) {
      details.responseHeaders = {};
    }

    details.responseHeaders["Access-Control-Allow-Origin"] = ["http://localhost:3005"];
    details.responseHeaders["Access-Control-Allow-Methods"] = ["GET, POST, PUT, DELETE, OPTIONS"];
    details.responseHeaders["Access-Control-Allow-Headers"] = ["Content-Type, Authorization"];

    callback({ responseHeaders: details.responseHeaders });
  });
  // dialog.showOpenDialog({
  //   properties: ['openDirectory'],
  //   title: 'Select Photoshop Plugins Directory',
  // }).then(result => {
  //   if (!result.canceled) {
  //     const photoshopPluginsDir = result.filePaths[0];
  //     console.log("selected directory:", photoshopPluginsDir);
  //     // const pluginSourcePath = path.join(__dirname, 'resources', 'my-plugin');

  //     // Copy plugin files to the selected directory
  //     // fs.copy(pluginSourcePath, photoshopPluginsDir, (err) => {
  //     //   if (err) {
  //     //     console.error('Error copying plugin files:', err);
  //     //   } else {
  //     //     console.log('Plugin installed successfully!');
  //     //   }
  //     // });
  //   }
  // }).catch(err => {
  //   console.error('Error selecting directory:', err);
  // });
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

// app.on("ready", () => {
//   installPlugin();
// });

// app.on("before-quit-for-update", () => {
//   // Call the bash script and pass variables
//   installPlugin();
// });

// app.on("before-quit", () => {
//   // Perform any other actions before the application quits
//   installPlugin();
//   console.log("Application is about to quit.");
// });

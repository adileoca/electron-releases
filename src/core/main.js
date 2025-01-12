const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

const { setupIpcEvents } = require("./events/ipcEvents");
const setupExpressServer = require("./server/expressServer.js");

const createWindow = require("./events/windowEvents");


app.whenReady().then(async () => {
  const mainWindow = createWindow();
  const { app, setSession } = setupExpressServer(mainWindow);
  setupIpcEvents(mainWindow, setSession);

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

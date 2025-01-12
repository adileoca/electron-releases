const { BrowserWindow } = require("electron");

/**
 * Opens a link in a new window.
 * @param {Electron.IpcMainEvent} event - The IPC event.
 * @param {string} url - The URL to open.
 */
const onOpenLink = (event, url) => {
  console.log("Opening link in new window:", url);
  const newWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { contextIsolation: true },
  });
  newWindow.loadURL(url);
};

module.exports = { onOpenLink };

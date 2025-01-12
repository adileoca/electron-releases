const { shell } = require("electron");

/**
 * Opens a link in the default browser.
 * @param {Electron.IpcMainEvent} event - The IPC event.
 * @param {string} url - The URL to open.
 */
const onOpenLinkInBrowser = (event, url) => {
  console.log("opening url in browser", url);
  shell.openExternal(url);
};

module.exports = { onOpenLinkInBrowser };

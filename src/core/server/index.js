const { app: electronApp } = require("electron");

const { manageSession } = require("./helpers/manageSession");
const { createApp } = require("./helpers/createApp");

/**
 * Sets up the Express server.
 *
 * @param {BrowserWindow} window - The Electron BrowserWindow instance.
 */
function setupServer(getWindow) {
  const { broadcast, setSession } = createApp(getWindow);

  electronApp.on("before-quit", () => {
    broadcast({ type: "app", data: { isOpen: false } });
  });

  electronApp.on("ready", () => {
    broadcast({ type: "app", data: { isOpen: true } });
  });

  return { setSession };
}

module.exports = setupServer;

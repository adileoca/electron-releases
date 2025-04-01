const { app: electronApp } = require("electron");

const { manageSession } = require("./helpers/manageSession");
const { createApp } = require("./helpers/createApp");

function setupServer() {
  const { broadcast } = createApp();

  electronApp.on("before-quit", () => {
    broadcast({ type: "app", data: { isOpen: false } });
  });

  electronApp.on("ready", () => {
    broadcast({ type: "app", data: { isOpen: true } });
  });

  return broadcast;
}

module.exports = setupServer;

const { readMessage } = require("./crypto");

const handleWsConnection = (
  ws,
  req,
  clients,
  broadcast,
  getWindow,
  getSession
) => {
  console.log("New WebSocket connection");
  clients.push(ws);
  broadcast({ type: "session", data: getSession() });

  ws.on("close", () => {
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }
    console.log("WebSocket connection closed");
  });

  ws.on("message", async (message) => {
    const decryptedMessage = readMessage(message);
    const { type, data } = decryptedMessage;

    console.log("Received message of type ", type);
    if (type === "session") {
      const receviedSession = data;

      console.log("ws::sending new session to rendeder");
      getWindow().webContents.send("session-update", receviedSession);
    }

    if (type === "pluginVersion") {
      console.log("ws::Sending plugin version to renderer");
      getWindow().webContents.send("current-plugin-version", version);
    }
  });
};

module.exports = { handleWsConnection };

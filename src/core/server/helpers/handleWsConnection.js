const { readMessage } = require("./crypto");
const { getWindow } = require("../../getWindow");

const handleWsConnection = (ws, req) => {
  ws.on("message", (message) => {
    const decryptedMessage = readMessage(message);
    const { type, data } = decryptedMessage;

    const window = getWindow();
    // window.webContents.send("log", {
    //   info: "Received message from websocket client",
    //   message: decryptedMessage,
    // });
    if (type === "session") {
      const receviedSession = data;
      window.webContents.send("update-session", receviedSession);
    }

    if (type === "pluginVersion") {
      window.webContents.send("current-plugin-version", data.version);
    }
  });
};

module.exports = { handleWsConnection };

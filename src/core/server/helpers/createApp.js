const { WebSocketServer, WebSocket } = require("ws");
const { createServer } = require("http");
const express = require("express");
const cors = require("cors");

const { getCachedFilenames } = require("../routes/cached-filenames");
const { openOrder } = require("../routes/open-order");
const { uploadHandler } = require("../routes/upload");
const { getMedia } = require("../routes/media");
const { upload } = require("../../storage");

const { handleWsConnection } = require("./handleWsConnection");
const { manageSession } = require("./manageSession");
const { encryptMessage } = require("./crypto");

function createApp(getWindow) {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.post("/upload", upload.single("file"), uploadHandler);
  app.get("/cached-filenames", getCachedFilenames);
  app.post("/media", getMedia);
  app.post("/open-order", (req, res) => openOrder(req, res, getWindow));

  const server = createServer(app);
  const ws = new WebSocketServer({ server, maxPayload: 1024 * 1024 * 1024 });
  const clients = [];

  function broadcast(message) {
    clients.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        console.log("Broadcasting message of type ", message.type);
        const encryptedMessage = encryptMessage(message);
        ws.send(encryptedMessage);
      }
    });
  }

  const { setSession, getSession } = manageSession(broadcast);

  ws.on("connection", (ws, req) =>
    handleWsConnection(ws, req, clients, broadcast, getWindow, getSession)
  );

  server.listen(4500, () => {
    console.log(`Server listening at http://localhost:${4500}`);
  });
  return { broadcast, setSession };
}

module.exports = { createApp };

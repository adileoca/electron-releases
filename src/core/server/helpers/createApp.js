const { WebSocketServer, WebSocket } = require("ws");
const { createServer } = require("http");
const express = require("express");
const cors = require("cors");
const { ipcMain } = require("electron");

const { getCachedFilenames } = require("../routes/cached-filenames");
const { openOrder } = require("../routes/open-order");
const { uploadHandler } = require("../routes/upload");
const { getMedia } = require("../routes/media");
const { upload } = require("../../storage");

const { handleWsConnection } = require("./handleWsConnection");
const { manageSession } = require("./manageSession");
const { encryptMessage } = require("./crypto");
const { getWindow } = require("../../getWindow");

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.get("/cached-filenames", getCachedFilenames);
  app.post("/upload", upload.single("file"), uploadHandler);
  app.post("/media", getMedia);
  app.post("/open-order", (req, res) => openOrder(req, res));

  const server = createServer(app);
  const ws = new WebSocketServer({ server, maxPayload: 1024 * 1024 * 1024 });
  const clients = [];
  const window = getWindow();

  let sessionData = null;
  function broadcast(message) {
    clients.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        window.webContents.send(
          "log",
          JSON.stringify({
            info: "broadcasting message over websocket",
            message,
          })
        );
        if (message.type === "session") {
          sessionData = message.data;
        }
        const encryptedMessage = encryptMessage(message);
        ws.send(encryptedMessage);
      }
    });
  }

  ipcMain.on("set-session", (_, session) => {

    broadcast({ type: "session", data: session });
    // window.webContents.send(
    //   "log",
    //   JSON.stringify({
    //     info: "IPC event set-session got called...",
    //     message: { session },
    //   })
    // );
  });

  ws.on("connection", (ws, req) => {
    clients.push(ws);

    const window = getWindow();
    if (sessionData) {
      broadcast({ type: "session", data: sessionData });
    } else {
      window.webContents.send(
        "log",
        JSON.stringify({
          info: "no session data on connection...",
          message: { sessionData },
        })
      );
    }

    window.webContents.send(
      "log",
      JSON.stringify({
        info: "New websocket connection, sending session data...",
        message: { sessionData },
      })
    );

    ws.on("close", () => {
      const index = clients.indexOf(ws);
      if (index !== -1) {
        clients.splice(index, 1);
      }
      console.log("WebSocket connection closed");
    });

    handleWsConnection(ws, req);
  });

  server.listen(4500, () => {
    console.log(`Server listening at http://localhost:${4500}`);
  });

  return { broadcast };
}

module.exports = { createApp };

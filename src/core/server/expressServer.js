const express = require("express");
const cors = require("cors");

const { createServer } = require("http");
const { WebSocketServer, WebSocket } = require("ws");
const { app: electronApp } = require("electron");

const { getMedia } = require("./routes/media");
const { uploadHandler } = require("./routes/upload");
const { storageDir, upload } = require("../storage");
const { getCachedFilenames } = require("./routes/cached-filenames");
const { handleOpenOrder } = require("./routes/open-order");

const SHARED_SECRET = "your-secure-shared-secret"; // not implemented yet
const PORT = 4500;

/**
 * Sets up the Express server.
 *
 * @param {BrowserWindow} window - The Electron BrowserWindow instance.
 */
function setupExpressServer(window) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.post("/upload", upload.single("file"), uploadHandler);
  app.get("/cached-filenames", getCachedFilenames);
  app.post("/media", getMedia);
  app.post("/open-order", (req, res) => handleOpenOrder(req, res, window));

  // Create an HTTP server and pass the Express app to it
  const server = createServer(app);
  // Create a WebSocket server using the same HTTP server
  const wss = new WebSocketServer({ server, maxPayload: 1024 * 1024 * 1024 });
  // Keep track of connected clients
  const clients = [];
  // Variable to hold the session data
  let sessionData = null;

  // Function to update the session data and broadcast to clients
  function setSession(session) {
    sessionData = session;
    // Broadcast the session data to all connected clients
    const message = JSON.stringify({
      type: "session",
      data: sessionData,
    });
    clients.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    });
  }

  // Handle WebSocket connections
  wss.on("connection", (ws, req) => {
    console.log("New WebSocket connection");
    // Add the new client to the list
    clients.push(ws);
    // Remove the client when they disconnect
    ws.on("close", () => {
      const index = clients.indexOf(ws);
      if (index !== -1) {
        clients.splice(index, 1);
      }
      console.log("WebSocket connection closed");
    });

    // todo: instead of sending the session data, send the JWT, then use that to authenticate with the api in the plugin
    if (sessionData) {
      const message = JSON.stringify({
        type: "session",
        data: sessionData,
      });
      ws.send(message);
    }

    // Handle incoming messages from the client
    ws.on("message", async (message) => {
      console.log(`Received message: ${message}`);
      // Handle incoming messages if needed
    });
  });

  // Start the server
  server.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });

  // Example endpoint to trigger IPC event
  app.post("/trigger-ipc", (req, res) => {
    // Send an IPC message to the main process
    window.electron.send("focus-window");
    res.send("IPC event triggered");
  });

  return { app, setSession };
}

module.exports = setupExpressServer;

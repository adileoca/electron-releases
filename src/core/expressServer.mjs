import express from "express";
import path from "path";
import cors from "cors";
import fs from "fs";

import WebSocket, { WebSocketServer } from "ws";
import { app as electronApp } from "electron";
import { createServer } from "http";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

const app = express();

const port = 4500;
const sharedSecret = "your-secure-shared-secret"; // Shared secret

app.use(cors());
app.use(express.json());

// Define the media directory
const storageDir = path.join(electronApp.getPath("userData"), "storage");
// Ensure the storage directory exists
fs.mkdirSync(storageDir, { recursive: true });

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storageDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using UUID
    const generatedFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, generatedFilename);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
});

app.post("/media", (req, res) => {
  const { filename } = req.body;

  if (!filename) {
    console.log("1");
    return res.status(400).json({ message: "Filename is required" });
  }

  // Resolve the full path of the file
  const filePath = path.join(storageDir, filename);
  // Security check to prevent directory traversal attacks
  const resolvedPath = path.resolve(filePath);
  if (!resolvedPath.startsWith(path.resolve(storageDir))) {
    console.log("2");
    return res.status(403).json({ message: "Access denied" });
  }

  // Check if the file exists and is a file
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      console.log("3", err);
      return res.status(404).json({ message: "File not found" });
    }

    // Create a read stream and pipe it to the response
    const readStream = fs.createReadStream(filePath);

    // Handle errors during streaming
    readStream.on("error", (streamErr) => {
      console.error("Error reading file:", streamErr);
      res.status(500).json({ message: "Error reading file" });
    });

    // Set appropriate headers
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${path.basename(filePath)}"`
    );

    // Pipe the read stream to the response
    readStream.pipe(res);
  });
});

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

  // Send the current session data to the new client
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
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Export the app and the setSession function
export { app, setSession };

// Middleware to check the custom header
// app.use((req, res, next) => {
//   const secret = req.headers["x-shared-secret"];
//   if (secret && secret === sharedSecret) {
//     next();
//   } else {
//     res.status(403).json({ message: "Forbidden" });
//   }
// });

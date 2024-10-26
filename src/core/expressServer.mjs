import bodyParser from "body-parser";
import express from "express";
import path from "path";
import cors from "cors";
import fs from "fs";

import WebSocket, { WebSocketServer } from "ws";
import { app as electronApp } from "electron";
import { BrowserWindow } from "electron";
import { createServer } from "http";

import * as Supabase from "@supabase/supabase-js";
const { createClient, SupabaseClient, Session } = Supabase;

// compile, remove commonjs exports, add export default Database.
// todo: have a script do this on startup
import Database from "../lib/supabase/database.mjs";

const app = express();

const port = 4500;
const sharedSecret = "your-secure-shared-secret"; // Shared secret

app.use(cors());
app.use(bodyParser.json());

// Middleware to check the custom header
// app.use((req, res, next) => {
//   const secret = req.headers["x-shared-secret"];
//   if (secret && secret === sharedSecret) {
//     next();
//   } else {
//     res.status(403).json({ message: "Forbidden" });
//   }
// });

// Endpoint to get the encrypted token

app.get("/db", async (req, res) => {
  const db = new Database(supabase);
  const { data, error } = await db.get.order.summary.all();
  if (data) {
    res.json({ data });
  } else {
    res.json({ message: "error" });
  }
});

app.get("/media", (req, res) => {
  // const { filename } = req.query
  const filename = "408f79d5-345a-4b83-8930-7f90f41ac3f5";
  if (!filename) {
    return res.status(400).json({ message: "Filename is required" });
  }

  // Use Electron app to get the user data path
  const mediaDir = path.join(electronApp.getPath("userData"), "storage");

  fs.readdir(mediaDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res
        .status(500)
        .json({ message: "Error reading storage directory" });
    }
    console.log("Files in storage directory:", files);
  });

  // Resolve the full path of the file
  const filePath = path.join(mediaDir, filename);

  // Security check to prevent directory traversal attacks
  const resolvedPath = path.resolve(filePath);
  if (!resolvedPath.startsWith(path.resolve(mediaDir))) {
    return res.status(403).json({ message: "Access denied" });
  }

  // Check if the file exists and is a file
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
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

app.get("/api/token", (_, res) => {
  console.log("Received request for /api/token");
  const token = "";
  if (token) {
    // const encryptedToken = encryptToken(token);
    res.json({ token });
  } else {
    res.status(404).json({ message: "Token not found" });
  }
});

// Create an HTTP server and pass the Express app to it
const server = createServer(app);

// Create a WebSocket server using the same HTTP server
const wss = new WebSocketServer({ server, maxPayload: 1024 * 1024 * 1024 });

// Keep track of connected clients
const clients = [];

// Variable to hold the session data
let sessionData = null;
let supabase = null;

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

  createSupabaseClient(session);
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
    const mainWindow = BrowserWindow.getAllWindows()[0];
    if (mainWindow) {
      const fileStream = await mainWindow.webContents.send(
        "read-and-stream-file",
        { filename, content }
      );
    }
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Export the app and the setSession function
export { app, setSession };
function createSupabaseClient(session) {
  // Initialize the Supabase client for the first time
  const SUPABASE_URL =
    process.env.REACT_APP_SUPABASE_URL ||
    "https://vrdaoudvtphptybaljqq.supabase.co";
  const SUPABASE_ANON_KEY =
    process.env.REACT_APP_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZGFvdWR2dHBocHR5YmFsanFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyNjcxNTEsImV4cCI6MjA0MDg0MzE1MX0.8lxO8TS_CRbWZKafWfKWwRKTOJ15RyaXjmmUIUl0ZJ0";

  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    },
  });
}

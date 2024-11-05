const { ipcMain, shell, BrowserWindow, app } = require("electron");

const { simpleParser } = require("mailparser");

const mime = require("mime-types");
const https = require("https");
const path = require("path");
const fs = require("fs");

const cacheDir = path.join(app.getPath("userData"), "storage");
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

function setupIpcEvents() {
  ipcMain.handle("read-file", async (_, filename) => {
    try {
      if (!filename) {
        throw new Error("Filename is required.");
      }

      // Prevent directory traversal attacks
      if (filename.includes("..") || path.isAbsolute(filename)) {
        throw new Error("Invalid filename.");
      }

      // Resolve the absolute path within the allowed directory
      const filePath = path.join(cacheDir, filename);

      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filename}`);
      }

      // Read the file content as a Buffer
      const content = await fs.promises.readFile(filePath);
      
      return content.toString("base64");
    } catch (error) {
      console.error("Error reading file:", error);
      // Send a generic error message to the renderer
      throw new Error("Failed to read the file.");
    }
  });

  ipcMain.handle("delete-cache-file", async (_, { filename }) => {
    try {
      const filePath = path.join(cacheDir, filename);
      // Check if the file exists
      if (fs.existsSync(filePath)) {
        // Delete the file
        await fs.promises.unlink(filePath);
        console.log(`File ${filename} deleted from cache.`);
      } else {
        console.warn(`File ${filename} does not exist in the cache.`);
      }
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  });

  ipcMain.handle("get-cached-filenames", async (_) => {
    try {
      return fs.readdirSync(cacheDir);
    } catch (err) {
      console.error("Error fetching cached files:", err);
      throw err; // Throw errors to send to the renderer
    }
  });

  ipcMain.handle("read-and-stream-file", async (_, filename) => {
    try {
      const filePath = path.join(cacheDir, filename);

      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filename}`);
      }

      // Read and stream the file content
      const fileContent = fs.readFileSync(filePath, "utf8");
      return fileContent; // Send back the file content
    } catch (err) {
      console.error("Error reading file:", err);
      throw err;
    }
  });

  ipcMain.handle("cache-file", async (_, { filename, content }) => {
    try {
      const filePath = path.join(cacheDir, filename);
      await fs.promises.writeFile(filePath, content);
    } catch (err) {
      console.error("Error caching file:", err);
    }
  });

  ipcMain.handle("cache-file-from-url", async (event, { url, filename }) => {
    return new Promise((resolve, reject) => {
      https
        .get(url, (response) => {
          if (response.statusCode === 200) {
            // Check the Content-Type header for file type
            const contentType = response.headers["content-type"];
            const extension = mimeToExtension(contentType); // Function to map MIME type to an extension

            const completeFilename = extension
              ? `${filename}.${extension}`
              : filename;
            const filePath = path.join(cacheDir, completeFilename);

            const file = fs.createWriteStream(filePath);
            // Pipe the response directly to the file
            response.pipe(file);
            file.on("finish", () => {
              file.close(() => {
                console.log("Caching successful");
                resolve({
                  message: `File ${completeFilename} cached successfully.`,
                });
              });
            });
            file.on("error", (err) => {
              fs.unlink(filePath, () =>
                reject(new Error(`File write error: ${err.message}`))
              );
            });
          } else {
            reject(
              new Error(
                `Failed to download file. Status Code: ${response.statusCode}`
              )
            );
          }
        })
        .on("error", (err) => {
          reject(new Error(`Error fetching file from URL: ${err.message}`));
        });
    });
  });

  ipcMain.handle("parse-email", async (_, { data }) => {
    try {
      const mail = await simpleParser(data); // Use an async/await pattern
      console.log("mail", mail);
      return mail; // Resolve with parsed mail
    } catch (err) {
      console.error("Error parsing the email:", err);
      throw err; // Throw errors to send to the renderer
    }
  });

  ipcMain.on("set-session", async (_, session) => {
    const { setSession } = await import("../expressServer.mjs");
    // console.log("Received session data from renderer process:", session);
    setSession(session); // Update the session data in expressServer
  });

  ipcMain.on("open-link", (_, url) => {
    const newWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        contextIsolation: true,
      },
    });
    newWindow.loadURL(url);
  });

  ipcMain.on("open-link-in-browser", (_, url) => {
    console.log("opening url in browser", url);
    shell.openExternal(url);
  });
}

module.exports = { setupIpcEvents };

function mimeToExtension(mimeType) {
  const mimeTypes = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    // Add more MIME types and their corresponding extensions as needed
    "application/pdf": "pdf",
    "text/html": "html",
    "application/json": "json",
    // Add more as needed
  };

  return mimeTypes[mimeType] || null;
}

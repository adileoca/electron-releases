const { ipcMain, shell, BrowserWindow, app } = require("electron");

const { simpleParser } = require("mailparser");

const https = require("https");
const path = require("path");
const fs = require("fs");

function setupIpcEvents() {
  ipcMain.handle("get-cached-filenames", async () => {
    try {
      const cacheDir = path.join(app.getPath("userData"), "storage");
      console.log("cacheDir", cacheDir);
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
        return [];
      }

      return fs.readdirSync(cacheDir);
    } catch (err) {
      console.error("Error fetching cached files:", err);
      throw err; // Throw errors to send to the renderer
    }
  });

  ipcMain.handle("read-and-stream-file", async (_, filename) => {
    try {
      const cacheDir = path.join(app.getPath("userData"), "storage");
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

  ipcMain.handle("cache-file", async (event, { filename, content }) => {
    try {
      const cacheDir = path.join(app.getPath("userData"), "storage");
      console.log("cacheDir", cacheDir);
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }

      const filePath = path.join(cacheDir, filename);
      await fs.promises.writeFile(filePath, content);

      // Optional: Respond back with success acknowledgment
      event.reply("cache-file-success", {
        message: `File ${filename} cached successfully.`,
      });
    } catch (err) {
      console.error("Error caching file:", err);
      // Optional: Respond back with error
      event.reply("cache-file-error", {
        message: `Failed to cache file ${filename}.`,
      });
    }
  });

  ipcMain.handle("cache-file-from-url", async (event, { url, filename }) => {
    return new Promise((resolve, reject) => {
      const cacheDir = path.join(app.getPath("userData"), "storage");
      console.log("cacheDir", cacheDir);
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }

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

const getCachedFiles = () => {
  const cacheDir = path.join(app.getPath("userData"), "cache");
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
    return [];
  }
  return fs.readdirSync(cacheDir);
};

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

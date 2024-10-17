const { ipcMain, shell, BrowserWindow } = require("electron");
const { simpleParser } = require("mailparser");

const path = require("path");
const fs = require("fs");

function setupIpcEvents() {
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

  ipcMain.on('open-link', (event, url) => {
    const newWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        contextIsolation: true
      }
    });
    newWindow.loadURL(url);
  });

  // ipcMain.on('open-link', (event, url) => {
  //   console.log("caca")
  //   shell.openExternal(url);
  // });

  ipcMain.on("download-and-open-in-photoshop", async (_, arg) => {
    const tempPath = path.join(__dirname, "../temp");
    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath);
    }
    const downloadImage = require("../utils/downloadImage");
    const runExtendScript = require("../utils/runExtendScript");
    const { image, background } = arg;

    const imagePath = path.join(tempPath, "Image.jpg");
    const backgroundPath = path.join(tempPath, "Background.jpg");

    await downloadImage(image, imagePath);

    if (background) {
      await downloadImage(background, backgroundPath);
      runExtendScript(imagePath, backgroundPath);
    } else {
      runExtendScript(imagePath);
    }
  });
}

module.exports = { setupIpcEvents };

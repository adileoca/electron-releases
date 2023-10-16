const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const downloadImage = require("../utils/downloadImage");
const runExtendScript = require("../utils/runExtendScript");

const tempPath = path.join(__dirname, "../temp");
if (!fs.existsSync(tempPath)) {
  fs.mkdirSync(tempPath);
}

function setupIpcEvents() {
  ipcMain.on("download-and-open-in-photoshop", async (event, arg) => {
    const { image, background } = arg;
    const imagePath = path.join(tempPath, "Image.jpg");
    const backgroundPath = path.join(tempPath, "Background.jpg");

    await downloadImage(image, imagePath);
    await downloadImage(background, backgroundPath);

    runExtendScript(imagePath, backgroundPath);
  });
}

module.exports = { setupIpcEvents };

const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

function setupIpcEvents() {
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

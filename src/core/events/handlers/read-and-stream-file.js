const path = require("path");
const fs = require("fs");
const { storageDir: cacheDir } = require("../../storage.js");

/**
 * IPC handler for reading a file.
 *
 * @param {Electron.IpcMainInvokeEvent} event - The IPC event.
 * @param {string} filename - The name of the file to read
 * @returns {Promise<string>} - The content of the file.
 * @throws {Error} - If the filename is invalid or the file cannot be read.
 */
const handleReadAndStreamFile = async (event, filename) => {
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
};

module.exports = { handleReadAndStreamFile };

const fs = require("fs");
const path = require("path");

const { storageDir: cacheDir } = require("../../storage.js");

/**
 * IPC handler for caching a file.
 * @param {Electron.IpcMainInvokeEvent} event - The IPC event.
 * @param {{ filename: string, content: string }} body - The filename and content to cache.
 * @returns {Promise<void>}
 */
const handleCacheFile = async (_, { filename, content }) => {
  try {
    const filePath = path.join(cacheDir, filename);
    await fs.promises.writeFile(filePath, content);
  } catch (err) {
    console.error("Error caching file:", err);
  }
};

module.exports = { handleCacheFile };
